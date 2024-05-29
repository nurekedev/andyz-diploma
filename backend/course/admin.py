from django.contrib import admin

from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin

from course.models import *


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

class LessonInlineAdmin(SortableInlineAdminMixin, admin.TabularInline):
    model = ArticleСontent
    extra = 0

class VideoInlineAdmin(SortableInlineAdminMixin, admin.TabularInline):
    model = VideoContent
    extra = 0


@admin.register(Lesson)
class LessonAdmin(SortableAdminMixin, admin.ModelAdmin):
    prepopulated_fields = {'slug': ['title', ]}
    inlines = [LessonInlineAdmin, VideoInlineAdmin]



@admin.register(Section)
class SectionAdmin(SortableAdminMixin, admin.ModelAdmin):
    prepopulated_fields = {'slug': ['title', ]}




admin.site.register(Comment)
admin.site.register(Rating)



