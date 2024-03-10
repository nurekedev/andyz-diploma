from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.status import HTTP_200_OK
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory

from .models import Category
from .serializers import (CategorySerializer, CourseListSerializer, LessonSerializer, CourseDetailSerializer)
from .services import *
from progress.models import Enrollment


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_categories(request):
    """
    :param request:
    :return: список категорий
    """
    categories = all_objects(Category.objects)
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_courses(request):
    """
       Получение список курсов.
       :param request: Запрос.
       :return: Список курсов по категориям.
    """
    # try:
    #     category_id = request.data.get('category_id', '')
    # except KeyError:
    #     raise Http404("Category parameter is missing")

    serializer_context = {'request': request}

    courses = active_courses(objects=Course.objects)
    serializer = CourseListSerializer(instance=courses, context=serializer_context, many=True)
    return Response(serializer.data, status=HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_newest_courses(request):
    """
    Получить список  новых курсов [4].
    :param request: Запрос.
    :return: Список самых новых курсов или пустой список.
    """

    serializer_context = {'request': request}
    courses = courses_newest(objects=Course.objects, status=Course.PUBLISHED)
    if len(courses):
        serializer = CourseListSerializer(courses, context=serializer_context, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    else:
        return Response([], status=HTTP_200_OK)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_courses(request):
    """Получить список курсов пользователя который он имеет доступ"""
    enrollments = Enrollment.objects.filter(user=request.user)
    courses = Course.objects.filter(
        progress__in=enrollments,
        status=Course.PUBLISHED,
    )
    
    serializer_context = {'request': request}
    serializer = CourseListSerializer(instance=courses, context=serializer_context, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_course(request, slug):
    course = get_detailed_course(objects=Course.objects, status=Course.PUBLISHED, slug=slug)
    course_serializer = CourseDetailSerializer(course)
    lesson_serializer = LessonSerializer(course.lessons.all(), many=True)

    if request.user.is_authenticated:
        course_data = course_serializer.data
    else:
        course_data = {}


    return Response({
        'course': course_data,
        'lessons': lesson_serializer.data
    })
