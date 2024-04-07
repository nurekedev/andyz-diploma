from django.shortcuts import render, get_object_or_404
from django.core.exceptions import PermissionDenied
from django.db.models import Count, Avg


from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin
from rest_framework.permissions import BasePermission


from course.models import Category, Rating
from course.serializers import (CategorySerializer, CourseListSerializer, LessonSerializer,
                                CourseDetailSerializer,  RatingSerializer, SectionSerializer, SectionListSerializer, LessonListSerializer,
                                CourseLockSerializer)
from course.services import *
from progress.models import Enrollment
from course.permissons import IsOwnerOrAdminPermission

from pprint import pprint


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
    
    serializer_context = {'request': request}

    courses = active_courses(objects=Course.objects)
    serializer = CourseListSerializer(
        instance=courses, context=serializer_context, many=True)
    return Response(serializer.data)



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
    serializer = CourseListSerializer(
        instance=courses, context=serializer_context, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_course(request, slug):
    """
    Получает информацию о курсе по его slug.

    Args:
        request (HttpRequest): Объект запроса.
        slug (str): Уникальный идентификатор курса.

    Returns:
        Response: Ответ с сериализованными данными курса.
    """
    course = get_detailed_course(
        objects=Course.objects, status=Course.PUBLISHED, slug=slug)
    
    serializer_context = {'request': request}

    if request.user.is_authenticated and Enrollment.objects.filter(user=request.user, course=course).exists():
        course_serializer = CourseDetailSerializer(instance=course, context=serializer_context).data
    else:
        course_serializer = CourseLockSerializer(instance=course, context=serializer_context).data

    return Response({
        'course': course_serializer,
    })



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_lesson_by_section(request, slug):
    lesson = get_detailed_lesson(objects=Lesson.objects, status=Lesson.PUBLISHED, slug=slug)
    serializer_context = {'request': request}
    lesson_serializer = LessonSerializer(instance=lesson, context=serializer_context)
    lesssons_data = lesson_serializer.data if request.user.is_authenticated else {}
    return Response({'lessons': lesssons_data})



class RatingAPIView(ListCreateAPIView):
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        course_slug = self.kwargs["course_slug"]
        queryset = Rating.objects.filter(course__slug=course_slug)
        return queryset

    def get_serializer_context(self):
        user_id = self.request.user.id
        course_slug = self.kwargs["course_slug"]
        return {"user_id": user_id, "course_slug": course_slug}


class RatingUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = RatingSerializer

    def get_queryset(self):
        course_slug = self.kwargs["course_slug"]
        return Rating.objects.filter(course__slug=course_slug)

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            self.permission_classes = [
                IsAuthenticated, IsOwnerOrAdminPermission]
        return super().get_permissions()


# queryset = queryset.annotate(total_ratings=Count('id'))
# queryset = queryset.annotate(avg_rating=Avg('rating'))


rating_api_view = RatingAPIView.as_view()
rating_api_destroy_update_view = RatingUpdateDestroyAPIView.as_view()





@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_sections(request, course_slug):
    course = get_detailed_course(objects=Course.objects, status=Course.PUBLISHED, slug=course_slug)
    sections = course.sections.all()

    serializer_context = {'request': request}
    section_serializer = SectionListSerializer(instance=sections, context=serializer_context, many=True)

    print("REQUEST IS LIVE")


    return Response({
        'sections': section_serializer.data
    })



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_section(request, course_slug, slug):
    course = get_detailed_course(objects=Course.objects, status=Course.PUBLISHED, slug=course_slug)
    section = course.sections.get(slug=slug)

    print("SECTION SLUG IS WORKS")

    serializer_context = {'request': request}
    section_serializer = SectionSerializer(instance=section, context=serializer_context)


    if request.user.is_authenticated:
        section_data = section_serializer.data
    else:
        section_data = {"key":0}


    return Response({
        'section': section_data
    })
