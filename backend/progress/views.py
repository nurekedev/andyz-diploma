from django.shortcuts import render
from django.conf import settings
from django.db.models import Count, Case, When, IntegerField, F, Sum


from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


from course.serializers import CourseListSerializer, LessonSerializer
from course.models import Course, Section, Lesson
from progress.models import Progress, Enrollment
from progress.serializers import ProgressSerializer, EnrollmentSerializer

import math 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_progress_by_course(request, course_slug):

    enrollments = Enrollment.objects.filter(user=request.user)
    activities = Progress.objects.filter(created_by=request.user)

    course = Course.objects.filter(
        progress__in=enrollments,
        status=Course.PUBLISHED,
        slug=course_slug
    ).distinct().first()


    if not course:
        return Response({"detail": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

    lessons = Lesson.objects.filter(
        course=course, 
        status=Lesson.PUBLISHED
    )

    enrollment, created = enrollments.get_or_create(course=course, defaults={'progress': 0})

    lesson_weights = {
        Lesson.ARTICLE: Lesson.ARTICLE_WEIGHT,
        Lesson.VIDEO: Lesson.VIDEO_WEIGHT
    }

    current_user_progress = 0


    for lesson in lessons.filter(activities__in=activities):
        print(f"LESSON GOT! {lesson}")
        first_activity = lesson.activities.first()
        if first_activity and first_activity.status == Progress.DONE:
            current_user_progress += lesson_weights.get(lesson.lesson_type, 0)

    total_points = lessons.aggregate(
        total_points=(Sum(Case(When(lesson_type=Lesson.VIDEO, then=Lesson.VIDEO_WEIGHT), default=0, output_field=IntegerField())) + 
                      Sum(Case(When(lesson_type=Lesson.ARTICLE, then=Lesson.ARTICLE_WEIGHT), default=0, output_field=IntegerField())))
    )['total_points'] or 0

    if total_points == 0:
        custom_keff_of_course = 0
    else:
        custom_keff_of_course = 100 / total_points

    enrollment.progress = custom_keff_of_course * current_user_progress
    enrollment.save()

    serializer = EnrollmentSerializer(enrollment)

    return Response(serializer.data)


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

    print(enrollments)


    serializer = EnrollmentSerializer(enrollments)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def track_started(request, course_slug, section_slug, lesson_slug):
    course = Course.objects.get(slug=course_slug)
    section = Section.objects.get(slug=section_slug)
    lesson = Lesson.objects.get(slug=lesson_slug)

    if Progress.objects.filter(created_by=request.user, course=course, section=section, lesson=lesson).count() == 0:
        Progress.objects.create(course=course, lesson=lesson, section=section, created_by=request.user)
    
    activity = Progress.objects.get(created_by=request.user, course=course, section=section, lesson=lesson)

    serializer = ProgressSerializer(activity)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def marks_as_done(request, course_slug, section_slug, lesson_slug):
    course = Course.objects.get(slug=course_slug)
    section = Section.objects.get(slug=section_slug)
    lesson = Lesson.objects.get(slug=lesson_slug)

    activity = Progress.objects.get(created_by=request.user, course=course, section=section, lesson=lesson)
    activity.status = Progress.DONE
    activity.save()

    serializer = ProgressSerializer(activity)

    return Response(serializer.data)


