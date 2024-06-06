from django.shortcuts import render
from django.conf import settings
from django.db.models import Count, Case, When, IntegerField, F, Sum
from django.contrib.auth import get_user_model


from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework import status


from course.serializers import CourseListSerializer, LessonSlugSerializer
from course.models import Course, Section, Lesson
from progress.models import Progress, Enrollment
from progress.serializers import ProgressSerializer, EnrollmentSerializer

import math 

User = get_user_model()

def calculate_by_lesson_type(lesson_type):
    lesson_weights = {
        Lesson.ARTICLE: Lesson.ARTICLE_WEIGHT,
        Lesson.VIDEO: Lesson.VIDEO_WEIGHT
    }
    return lesson_weights[lesson_type]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_progress_by_course(request, course_slug):

    lesson_weights = {
        Lesson.ARTICLE: Lesson.ARTICLE_WEIGHT,
        Lesson.VIDEO: Lesson.VIDEO_WEIGHT
    }

    # Получение определенного курса по подписке пользователя
    enrollments = Enrollment.objects.filter(user=request.user)
    course = Course.objects.filter(
        progress__in=enrollments,
        status=Course.PUBLISHED,
        slug=course_slug
    ).first()
    
    # Получение макимального количества баллов в курсе
    sections = course.sections.all()
    lessons = Lesson.objects.filter(section__in=sections)
    
    total_points = lessons.aggregate(
        total_points=(Sum(Case(When(lesson_type=Lesson.VIDEO, then=Lesson.VIDEO_WEIGHT), default=0, output_field=IntegerField())) + Sum(Case(When(lesson_type=Lesson.ARTICLE, then=Lesson.ARTICLE_WEIGHT), default=0, output_field=IntegerField())))
    )['total_points'] or 0

    print(total_points)

    coefficient = 100 / total_points if total_points != 0 else 0
    
    print(coefficient)


    activities = Progress.objects.filter(created_by=request.user, course=course)
    if not course:
        return Response({"detail": "Course not found"}, status=status.HTTP_404_NOT_FOUND)
    
    
    # print(activities.filter(status=Progress.DONE).aggregate(total_points_done=Sum(Case(When(lesson__lesson_type=Lesson.VIDEO, then=Lesson.VIDEO_WEIGHT), default=0, output_field=IntegerField())) + Sum(Case(When(lesson__lesson_type=Lesson.ARTICLE, then=Lesson.ARTICLE_WEIGHT), default=0, output_field=IntegerField())))['total_points_done'] or 0)

    return Response({"score": total_points}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_patient_progress_by_course(request, course_slug, patient_id):

    patient = User.objects.get(id=patient_id)

    lesson_weights = {
        Lesson.ARTICLE: Lesson.ARTICLE_WEIGHT,
        Lesson.VIDEO: Lesson.VIDEO_WEIGHT
    }

    # Получение определенного курса по подписке пользователя
    enrollments = Enrollment.objects.filter(user=patient)
    course = Course.objects.filter(
        progress__in=enrollments,
        status=Course.PUBLISHED,
        slug=course_slug
    ).first()
    
    # Получение макимального количества баллов в курсе
    sections = course.sections.all()
    lessons = Lesson.objects.filter(section__in=sections)
    
    total_points = lessons.aggregate(
        total_points=(Sum(Case(When(lesson_type=Lesson.VIDEO, then=Lesson.VIDEO_WEIGHT), default=0, output_field=IntegerField())) + Sum(Case(When(lesson_type=Lesson.ARTICLE, then=Lesson.ARTICLE_WEIGHT), default=0, output_field=IntegerField())))
    )['total_points'] or 0

    print(total_points)

    coefficient = 100 / total_points if total_points != 0 else 0
    
    print(coefficient)


    activities = Progress.objects.filter(created_by=patient, course=course)
    if not course:
        return Response({"detail": "Course not found"}, status=status.HTTP_404_NOT_FOUND)
    
    return Response({"score": total_points}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_enrollment_data(request, course_slug):
    enrollments = Enrollment.objects.filter(user=request.user)
    courses = Course.objects.filter(
        progress__in=enrollments,
        status=Course.PUBLISHED
    ).distinct()

    course = courses.get(slug=course_slug)
    enrollments = enrollments.get(course=course)


    serializer = EnrollmentSerializer(enrollments)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def track_started(request, course_slug, section_slug, lesson_slug):
    course = Course.objects.get(slug=course_slug)
    section = Section.objects.get(slug=section_slug)
    lesson = Lesson.objects.get(slug=lesson_slug)

    if Progress.objects.filter(created_by=request.user, course=course, section=section, lesson=lesson).exists():
        Progress.objects.create(
            course=course, 
            lesson=lesson, 
            section=section, 
            created_by=request.user,
            status=Progress.STARTED
        )
    
    activity = Progress.objects.get(created_by=request.user, course=course, section=section, lesson=lesson)
    serializer = ProgressSerializer(activity)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def marks_as_done(request, course_slug, section_slug, lesson_slug):
    course = Course.objects.get(slug=course_slug)
    section = Section.objects.get(slug=section_slug)
    lesson = Lesson.objects.get(slug=lesson_slug)

    try:
        activity = Progress.objects.get(
            created_by=request.user, 
            course=course, 
            section=section, 
            lesson=lesson
        )
        activity.status = Progress.DONE
        activity.save()
    except Progress.DoesNotExist:
        return Response({"detail": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = ProgressSerializer(activity)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_marked_lessons_by_user_and_course(request, course_slug):
    course = Course.objects.get(slug=course_slug)
    activities = Progress.objects.filter(created_by=request.user, course=course, status=Progress.DONE)
    lessons = Lesson.objects.filter(activities__in=activities)
    serializer = LessonSlugSerializer(lessons, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)