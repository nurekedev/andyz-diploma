from rest_framework import serializers
from .models import Category, Course, Lesson
from django.contrib.auth.models import User

from .models import *

import sys

# from backend.users.serializers import UserSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CourseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class CourseDetailSerializer(serializers.ModelSerializer):
    # created_by = customserializer.UserSerializer(many=False)

    class Meta:
        model = Course
        fields = '__all__'
