from django.db import models
from django.conf import settings
from django.utils.text import slugify


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
        settings.AUTH_USER_MODEL, related_name='courses', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads', blank=True, null=True)
    status = models.CharField(max_length=25, choices=STATUS_CHOICES, default=DRAFT)

    class Meta:
        verbose_name = 'Courses'
        verbose_name_plural = 'Courses'
        db_table = 'courses'
        ordering: '-created_at'

    def __str__(self):
        return f"{self.title} - {self.slug}"

    def get_image(self):
        if self.image:
            return settings.WEBSITE_URL + self.image.url
        else:
            return 'https://bulma.io/images/placeholders/1280x960.png'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Lesson(models.Model):
    DRAFT = 'draft'
    PUBLISHED = 'published'

    CHOICES_STATUS = (
        (DRAFT, 'Draft'),
        (PUBLISHED, 'Published')
    )

    ARTICLE = 'article'
    VIDEO = 'video'

    CHOICES_TYPE_LESSON = (
        (ARTICLE, 'Article'),
        (VIDEO, 'Video'),
    )

    course = models.ForeignKey(
        Course, related_name='lessons', on_delete=models.CASCADE)

    title = models.CharField(max_length=255)
    slug = models.SlugField(null=False, unique=True)
    short_description = models.TextField(blank=True, null=True)
    long_description = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20, choices=CHOICES_STATUS, default=PUBLISHED)
    lesson_type = models.CharField(
        max_length=20, choices=CHOICES_TYPE_LESSON, default=ARTICLE)
    yt_id = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        verbose_name = 'Lessons'
        verbose_name_plural = 'Lessons'
        db_table = 'lessons'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)


class Comment(models.Model):
    course = models.ForeignKey(
        Course, related_name='comments', on_delete=models.CASCADE)
    lesson = models.ForeignKey(
        Lesson, related_name='comments', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.CASCADE)
