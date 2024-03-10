from django.contrib.auth.models import User

from rest_framework import serializers
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory

from .models import Category, Course, Lesson
from users.serializers import DoctorHideSerializer
from progress.serializers import EnrollmentSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('title',)


class CourseListSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(read_only=True, many=True)
    created_by = DoctorHideSerializer(read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='course-detail',
        lookup_field='slug',
    )

    class Meta:
        model = Course
        fields = ('title', 'slug', 'url', 'short_description', 'created_by', 'image', 'categories')


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class CourseDetailSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(read_only=True, many=True)
    created_by = DoctorHideSerializer(read_only=True)

    class Meta:
        model = Course
        fields = '__all__'
