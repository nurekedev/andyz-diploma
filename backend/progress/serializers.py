from rest_framework import serializers

from .models import Progress, Enrollment
# from course.serializers import CourseListSerializer


class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = ('id', 'course', 'lesson', 'status')


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ('id', 'course', 'user', 'progress')

class EnrollmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ('course', 'user')
