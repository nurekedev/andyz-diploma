from django.conf import settings
from django.utils.text import slugify
from django.urls import reverse
from django.db import models

User = settings.AUTH_USER_MODEL


class Category(models.Model):
    title = models.CharField(verbose_name='Title', max_length=255)
    slug = models.SlugField(null=False, unique=True)
    short_description = models.TextField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = 'Categories'
        verbose_name_plural = 'Categories'
        db_table = 'categories'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)


class Course(models.Model):
    DRAFT = 'draft'
    PUBLISHED = 'published'

    STATUS_CHOICES = (
        (DRAFT, 'Draft'),
        (PUBLISHED, 'Published')
    )

    categories = models.ManyToManyField(Category)
    title = models.CharField(verbose_name='Title', max_length=255)
    slug = models.SlugField(null=False, unique=True)
    short_description = models.TextField(blank=True, null=True)
    long_description = models.TextField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='course', on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to='uploads/courses', blank=True, null=True)
    status = models.CharField(
        max_length=25, choices=STATUS_CHOICES, default=DRAFT)

    class Meta:
        verbose_name = 'Courses'
        verbose_name_plural = 'Courses'
        db_table = 'courses'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.slug}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_image(self):
        if self.image:
            return settings.WEBSITE_URL + self.image.url
        else:
            return 'https://bulma.io/images/placeholders/1280x960.png'

    def get_absolute_url(self):
        return reverse('course-detail', kwargs={'slug': self.slug})


class Section(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(null=False, unique=True)
    course = models.ForeignKey(
        Course, related_name='sections', on_delete=models.CASCADE)

    my_order = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
    )

    class Meta:
        verbose_name = 'Sections'
        verbose_name_plural = 'Sections'
        db_table = 'sections'
        ordering = ['my_order']

    def __str__(self):
        return self.title


class Lesson(models.Model):
    DRAFT = 'draft'
    PUBLISHED = 'published'

    CHOICES_STATUS = (
        (DRAFT, 'Draft'),
        (PUBLISHED, 'Published')
    )

    ARTICLE = 'article'
    VIDEO = 'video'

    ARTICLE_WEIGHT = 10
    VIDEO_WEIGHT = 20

    CHOICES_TYPE_LESSON = (
        (ARTICLE, 'Article'),
        (VIDEO, 'Video')
    )

    section = models.ForeignKey(
        Section, related_name='lessons', on_delete=models.CASCADE)

    title = models.CharField(max_length=255)
    short_description = models.CharField(max_length=255, blank=True)
    lesson_type = models.CharField(
        max_length=20, choices=CHOICES_TYPE_LESSON, default=ARTICLE)
    slug = models.SlugField(null=False, unique=True)
    status = models.CharField(
        max_length=20, choices=CHOICES_STATUS, default=PUBLISHED)

    my_order = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
    )

    class Meta:
        verbose_name = 'Lessons'
        verbose_name_plural = 'Lessons'
        db_table = 'lessons'
        ordering = ['my_order']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('lesson-detail', kwargs={'slug': self.slug})


class VideoContent(models.Model):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name='videos')
    yt_id = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    my_order = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
    )

    class Meta:
        ordering = ['my_order']

    def __str__(self):
        return 'Video for {}'.format(self.lesson.title)


class ArticleСontent(models.Model):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name='contents')
    text = models.TextField(blank=True)
    photo = models.ImageField(upload_to='article_photos/', blank=True)
    my_order = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
    )

    class Meta:
        ordering = ['my_order']

    def __str__(self):
        return 'Content for {}'.format(self.lesson.title)


class Comment(models.Model):
    course = models.ForeignKey(
        Course, related_name='comments', on_delete=models.CASCADE)

    lesson = models.ForeignKey(
        Lesson, related_name='comments', on_delete=models.CASCADE, blank=True, null=True)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.CASCADE)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return 'Comment by {} on {}'.format(self.body, self.course or self.lesson)


class Rating(models.Model):

    RATING_CHOICES = (
        (1, '1_STAR'),
        (2, '2_STAR'),
        (3, '3_STAR'),
        (4, '4_STAR'),
        (5, '5_STAR')
    )

    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='rating')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    rating = models.PositiveIntegerField(choices=RATING_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('course', 'user')

    def __str__(self) -> str:
        return f"{self.user} {self.rating} for {self.course}"