from django.shortcuts import render, get_object_or_404
from django.core.exceptions import PermissionDenied
from django.db.models import Count, Avg


from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.viewsets import ModelViewSet, ViewSet, GenericViewSet
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin, RetrieveModelMixin
from rest_framework.permissions import BasePermission
from django.contrib.auth import get_user_model


from course.models import Category, Rating, Comment
from course.serializers import (CategorySerializer, 
                                CourseListSerializer, 
                                LessonSerializer,
                                CourseDetailSerializer,  
                                RatingSerializer, 
                                SectionSerializer, 
                                SectionListSerializer, 
                                LessonListSerializer,
                                CourseLockSerializer, 
                                CourseCommentSerializer, 
                                LessonCommentSerializer,
                                )
from progress.serializers import EnrollmentSerializer, EnrollmentCreateSerializer
from course.services import *
from progress.models import Enrollment
from course.permissons import IsOwnerOrAdminPermission, IsAdminOrAuthorPermission
from course.throttling import CommentThrottling

from pprint import pprint
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from rest_framework.throttling import UserRateThrottle

User = get_user_model()


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
        course_serializer = CourseDetailSerializer(
            instance=course, context=serializer_context).data
    else:
        course_serializer = CourseLockSerializer(
            instance=course, context=serializer_context).data

    return Response({
        'course': course_serializer,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_lesson_by_section(request, slug):
    lesson = get_detailed_lesson(
        objects=Lesson.objects, status=Lesson.PUBLISHED, slug=slug)
    serializer_context = {'request': request}
    lesson_serializer = LessonSerializer(
        instance=lesson, context=serializer_context)
    lesssons_data = lesson_serializer.data if request.user.is_authenticated else {}
    return Response({'lessons': lesssons_data})


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_sections(request, course_slug):
    course = get_detailed_course(
        objects=Course.objects, status=Course.PUBLISHED, slug=course_slug)
    sections = course.sections.all()

    serializer_context = {'request': request}
    section_serializer = SectionListSerializer(
        instance=sections, context=serializer_context, many=True)

    print("REQUEST IS LIVE")

    return Response({
        'sections': section_serializer.data
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_section(request, course_slug, slug):
    course = get_detailed_course(
        objects=Course.objects, status=Course.PUBLISHED, slug=course_slug)
    section = course.sections.get(slug=slug)

    serializer_context = {'request': request}
    section_serializer = SectionSerializer(
        instance=section, context=serializer_context)

    if request.user.is_authenticated:
        section_data = section_serializer.data
    else:
        section_data = {"key": 0}

    return Response({
        'section': section_data
    })


class CourseCommentAPIView(ListCreateAPIView):
    serializer_class = CourseCommentSerializer
    permission_classes = [IsAuthenticated]
    throttle_classes = [CommentThrottling]

    def get_queryset(self):
        course_slug = self.kwargs["course_slug"]
        queryset = Comment.objects.filter(course__slug=course_slug, lesson__slug=None, active=True)
        return queryset

    def get_serializer_context(self):
        user_id = self.request.user.id
        course_slug = self.kwargs["course_slug"]
        return {"user_id": user_id, "course_slug": course_slug}

class CourseCommentUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = CourseCommentSerializer
    permission_classes = [IsAuthenticated, IsAdminOrAuthorPermission]

    def get_queryset(self):
        course_slug = self.kwargs["course_slug"]
        return Comment.objects.filter(course__slug=course_slug, active=True)

    def get_serializer_context(self):
        user_id = self.request.user.id
        course_slug = self.kwargs["course_slug"]
        return {"user_id": user_id, "course_slug": course_slug}

class LessonCommentAPIView(ListCreateAPIView):
    serializer_class = LessonCommentSerializer
    permission_classes = [IsAuthenticated]
    throttle_classes = [CommentThrottling]

    def get_queryset(self):
        course_slug = self.kwargs["course_slug"]
        lesson_slug = self.kwargs["lesson_slug"]
        return Comment.objects.filter(course__slug=course_slug, lesson__slug=lesson_slug, active=True)

    def get_serializer_context(self):
        user_id = self.request.user.id
        course_slug = self.kwargs["course_slug"]
        lesson_slug = self.kwargs["lesson_slug"]
        return {"user_id": user_id, "lesson_slug": lesson_slug, "course_slug": course_slug}
    
class LessonCommentUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = LessonCommentSerializer
    permission_classes = [IsAuthenticated, IsAdminOrAuthorPermission]

    def get_queryset(self):
        lesson_slug = self.kwargs["lesson_slug"]
        return Comment.objects.filter(lesson__slug=lesson_slug, active=True)

    def get_serializer_context(self):
        user_id = self.request.user.id
        lesson_slug = self.kwargs["lesson_slug"]
        return {"user_id": user_id, "lesson_slug": lesson_slug}

class RatingAPIView(ListCreateAPIView):
    """
    Получение и создание рейтинга для курса.

    Позволяет получить список рейтингов для определенного курса или создать новый рейтинг.

    Параметры запроса:
    - course_slug (str): Уникальный идентификатор курса.

    Методы:
    - GET: Получить список рейтингов для курса.
    - POST: Создать новый рейтинг для курса.

    Разрешения:
    - Только аутентифицированным пользователям разрешено получать и создавать рейтинги.

    """

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

    def create(self, request, *args, **kwargs):
        course_slug = self.kwargs["course_slug"]
        user_id = request.user.id

        existing_rating = Rating.objects.filter(
            course__slug=course_slug, user_id=user_id).first()
        if existing_rating:
            return Response({"detail": "You have already rated this course."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class RatingUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    Обновление и удаление рейтинга для курса.

    Позволяет обновить или удалить существующий рейтинг для определенного курса.

    Параметры запроса:
    - course_slug (str): Уникальный идентификатор курса.
    - rating_id (int): Идентификатор рейтинга.

    Методы:
    - GET: Получить информацию о конкретном рейтинге.
    - PUT: Обновить информацию о рейтинге.
    - PATCH: Частично обновить информацию о рейтинге.
    - DELETE: Удалить рейтинг.

    Разрешения:
    - Только аутентифицированным пользователям разрешено обновлять и удалять рейтинги.
    - Только владельцы рейтинга или администраторы могут обновлять и удалять рейтинги.

    """

    serializer_class = RatingSerializer

    def get_queryset(self):
        course_slug = self.kwargs["course_slug"]
        return Rating.objects.filter(course__slug=course_slug)

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            self.permission_classes = [
                IsAuthenticated, IsOwnerOrAdminPermission]
        return super().get_permissions()


class CourseList(ListAPIView):
    serializer_class = CourseListSerializer
    queryset = Course.objects.filter(status=Course.PUBLISHED)
    permission_classes = [AllowAny]


@api_view(['GET'])
@permission_classes([AllowAny])
def get_average_rating(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)
    average_rating = Rating.objects.filter(course=course).aggregate(Avg('rating'))
    rating_by_star = Rating.objects.filter(course=course).values('rating').annotate(rating_count=Count('rating')) 
    

    return Response({'average_rating': average_rating, 'rating_by_star': rating_by_star})



rating_api_view = RatingAPIView.as_view()
rating_api_destroy_update_view = RatingUpdateDestroyAPIView.as_view()
rating_api_view = RatingAPIView.as_view()
rating_api_destroy_update_view = RatingUpdateDestroyAPIView.as_view()
course_comment_api_view = CourseCommentAPIView.as_view()
course_api_destroy_update_view = CourseCommentUpdateDestroyAPIView.as_view()
lesson_comment_api_view = LessonCommentAPIView.as_view()
lesson_api_destroy_update_view = LessonCommentUpdateDestroyAPIView.as_view()
course_list = CourseList.as_view()
