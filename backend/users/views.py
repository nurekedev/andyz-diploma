from django.contrib.auth import get_user_model

from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView
from rest_framework.mixins import DestroyModelMixin
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.filters import SearchFilter
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.translation import gettext as _
import os


from djoser.serializers import UserCreateSerializer

from users.models import Record, Marker
from progress.models import Enrollment
from course.models import Course
from users.serializers import (
    UserListSerializer, 
    RecordSerializer, 
    RecordCreateSerializer, 
    MarkerSerializer, 
    MarkerCreateSerializer,
    CustomCourseListSerializer,
    QuestionContactSerializer)
from progress.serializers import  EnrollmentCreateSerializer

User = get_user_model()

class UserViewSet(ModelViewSet):
    queryset = User.objects.filter(is_staff=False, is_superuser=False)
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [SearchFilter]

    search_fields = ['email', 'first_name', 'last_name', 'phone_number', 'username']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserListSerializer

class RecordAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, patient_id):
        records = Record.objects.filter(user=patient_id)
        serializer = RecordSerializer(records, many=True)
        return Response(serializer.data)
    
    def post(self, request, patient_id):
        user = User.objects.get(id=patient_id)
        serializer = RecordCreateSerializer(data=request.data)
    
        if user and serializer.is_valid():
            Record.objects.create(user=user, **serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, patient_id):
        record_id = request.data['record_id']
        user = User.objects.get(id=patient_id)

        if not user or not record_id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        record = Record.objects.get(id=record_id, user=user)
        record.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class MarkerAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, patient_id):
        markers = Marker.objects.filter(user=patient_id)
        serializer = MarkerSerializer(markers, many=True)
        return Response(serializer.data)
    
    def post(self, request, patient_id):
        user = User.objects.get(id=patient_id)
        serializer = MarkerCreateSerializer(data=request.data)
    
        if user and serializer.is_valid():
            Marker.objects.create(user=user, **serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, patient_id):
        marker_id = request.data['marker_id']
        user = User.objects.get(id=patient_id)

        if not user or not marker_id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        marker = Marker.objects.get(id=marker_id, user=user)
        marker.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SubscriptionAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, patient_id):
        patient = User.objects.filter( id=patient_id).first()
        if not patient:
            return Response(status=status.HTTP_404_NOT_FOUND)
        enrollments = Enrollment.objects.filter(user=patient)
        courses = Course.objects.filter(
            progress__in=enrollments,
            status=Course.PUBLISHED,
        )
        serializer = CustomCourseListSerializer(courses, many=True)
        return Response(serializer.data)
    
    def post(self, request, patient_id):
        course_slug = request.data.get("course_slug")
        course = Course.objects.filter(status=Course.PUBLISHED, slug=course_slug).first()
        user = User.objects.filter(is_active=True, id=patient_id).first()
        
        if course and user and Enrollment.objects.filter(course=course, user=user).exists():
            return Response({"detail": "You have already subscribed to this course."}, status=status.HTTP_400_BAD_REQUEST)
        enrollment = Enrollment.objects.create(course=course, user=user)
        serializer = EnrollmentCreateSerializer(enrollment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class QuestionContactView(APIView):
    """
    Отправка вопроса на почту:
    - name: имя (str)
    - email: почта (str)
    - question_text: текст вопроса (str)
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            serializer = QuestionContactSerializer(data=request.data)
            if serializer.is_valid():
                applicant_name = serializer.validated_data['name']
                applicant_email = serializer.validated_data['email']
                applicant_question_text = serializer.validated_data['question_text']


                html = render_to_string('main/question.html', {
                    'name': applicant_name,
                    'email': applicant_email,
                    'question': applicant_question_text
                })

                email = EmailMessage(
                    subject=_(f'Вопрос от {applicant_name} на сайте'),
                    body=html,
                    from_email=os.getenv('EMAIL_HOST_USER'),
                    to=[os.getenv('CUSTOMER_SUPPORT_EMAIL')]
                )
                email.content_subtype = 'html'
                email.send()

                message = _('Сообщение успешно отправлено')
                return Response({'message': message}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

record_get_post_delete = RecordAPIView.as_view()
marker_get_post_delete = MarkerAPIView.as_view()
enrollment_list_create = SubscriptionAPIView.as_view()
question_contact = QuestionContactView.as_view()


