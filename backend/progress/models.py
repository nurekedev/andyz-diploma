from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator



from course.models import Course, Lesson


class Enrollment(models.Model):
    course = models.ForeignKey(Course,related_name='progress', on_delete=models.CASCADE) 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='progress', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    progress = models.FloatField(null=True, blank=True, verbose_name='Progress', default=0.0)

    def __str__(self):
        return f"{self.user} - {self.course.title} - {self.created_at}"
    




# Create your models here.
class Progress(models.Model):
    STARTED = 'started'
    DONE = 'done'

    STATUS_CHOISES = (
        (STARTED, 'Started'),
        (DONE, 'Done'),
    )


    course = models.ForeignKey(Course, related_name='activities', on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='activities', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOISES, default=STARTED)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='activities', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    

    def __str__(self):
        return f"{self.created_by} - {self.course.title}"
