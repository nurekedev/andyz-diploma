from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.status import HTTP_200_OK

from .models import Category
from .serializers import CategorySerializer, CourseListSerializer, LessonSerializer
from .services import *


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
    try:
        category_id = request.data.get('category_id', '')
    except KeyError:
        raise Http404("Category parameter is missing")

    courses = courses_by_category(objects=Course.objects, category=category_id)
    serializer = CourseListSerializer(courses, many=True)
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
    courses = courses_newest(objects=Course.objects, status=Course.PUBLISHED)
    if len(courses):
        serializer = CourseListSerializer(courses, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    else:
        return Response([], status=HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_course(request, slug):
    course = Course.objects.filter(status=Course.PUBLISHED).get(slug=slug)
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