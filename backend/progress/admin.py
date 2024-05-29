from django.contrib import admin
from .models import Enrollment, Progress

# Register your models here.
@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
     list_display = ('course', 'user', 'progress', 'created_at')
     fieldsets = [
        (
            "Perform enrollment",
            {
                "classes": ["wide"],
                "fields": ["course", "user", 'progress'],
            },
        ),
    ]
     
@admin.register(Progress)
class ProgressAdmin(admin.ModelAdmin):
     list_display = ('course', 'lesson', 'status', 'created_by','created_at')
