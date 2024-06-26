from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory

from .models import Category, Course, Lesson, Rating, Section, Comment, ArticleСontent, VideoContent
from users.serializers import DoctorHideSerializer
from progress.serializers import EnrollmentSerializer
from django.urls import reverse

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('title',)

class CourseCommentSerializer(serializers.ModelSerializer):
    created_by = DoctorHideSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'body', 'created', 'updated', 'created_by']

    def create(self, validated_data):
        course_slug = self.context.get("course_slug")
        user_id = self.context.get("user_id")

        course = Course.objects.get(slug=course_slug)
        user = User.objects.get(id=user_id)

        comment = Comment.objects.create(
            course=course, created_by=user, **validated_data)
        return comment
    




class LessonCommentSerializer(serializers.ModelSerializer):
    created_by = DoctorHideSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'body', 'created', 'updated', 'created_by']

    def create(self, validated_data):
        course_slug = self.context.get("course_slug")
        lesson_slug = self.context.get("lesson_slug")
        user_id = self.context.get("user_id")
        
        course = Course.objects.get(slug=course_slug)
        lesson = Lesson.objects.get(slug=lesson_slug)
        user = User.objects.get(id=user_id)

        comment = Comment.objects.create(
            course=course,
            lesson=lesson, 
            created_by=user, **validated_data)
        return comment
    

class CourseListSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(read_only=True, many=True)
    created_by = DoctorHideSerializer(read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='course-detail',
        lookup_field='slug',
    )

    class Meta:
        model = Course
        fields = ('title', 'slug', 'url', 'short_description',
                  'created_by', 'image', 'categories')


class LessonSlugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['slug']

class ArticleContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleСontent
        fields = ('__all__')

class VideoContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoContent
        fields = ('__all__')



class LessonSerializer(serializers.ModelSerializer):
    contents = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ('__all__')
        
    def get_contents(self, obj):
        return (
            ArticleContentSerializer(obj.contents.all(), many=True).data + 
            VideoContentSerializer(obj.videos.all(), many=True).data
        )


class LessonListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='lesson-detail',
        lookup_field='slug',
    )

    class Meta:
        model = Lesson
        fields = ('title', 'slug', 'lesson_type', 'url')



class SectionListSerializer(serializers.ModelSerializer):
    lessons = LessonListSerializer(many=True, read_only=True)
    class Meta:
        model = Section
        fields = ['title', 'slug', 'lessons']



class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['title', 'slug']


class CourseDetailSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(read_only=True, many=True)
    created_by = DoctorHideSerializer(read_only=True)
    sections = SectionListSerializer(many=True, read_only=True)
    comments = CourseCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['title', 'slug', 'short_description', 'long_description', 'created_at', 'created_by', 'image', 'categories', 'comments', 'sections']


class CourseLockSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(read_only=True, many=True)
    created_by = DoctorHideSerializer(read_only=True)
    comments = CourseCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['title', 'slug', 'short_description', 'long_description', 'created_at', 'created_by', 'image', 'categories', 'comments']



class RatingSerializer(serializers.ModelSerializer):
    user = DoctorHideSerializer(read_only=True)

    class Meta:
        model = Rating
        fields = ['id', 'rating', 'description', 'user', ]


    def create(self, validated_data):
        course_slug = self.context.get("course_slug")
        user_id = self.context.get("user_id")

        course = Course.objects.get(slug=course_slug)
        user = User.objects.get(id=user_id)

        rating = Rating.objects.create(
            course=course, user=user, **validated_data)
        return rating
