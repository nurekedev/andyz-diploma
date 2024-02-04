from django.contrib import admin
from course.models import Category, Course, Lesson, Comment


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'short_description', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('title', 'slug', 'short_description',)
    prepopulated_fields = {'slug': ['title', ]}


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    fields = ('categories', 'title', 'slug', 'short_description', 'long_description', 'created_by', 'image', 'status')
    list_filter = ('created_at', 'categories')
    search_fields = ('title', 'slug', 'short_description',)
    prepopulated_fields = {'slug': ['title', ]}


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['title', ]}


admin.site.register(Comment)
