from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import Lesson
from .serializers import LessonSerializer

class LessonViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.lesson = Lesson.objects.create(title='Test Lesson', slug='test-lesson', status=Lesson.PUBLISHED)

    def test_get_lesson_by_section_authenticated(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('get_lesson_by_section', args=['test-lesson'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['lessons']['title'], 'Test Lesson')
        self.assertEqual(response.data['lessons']['slug'], 'test-lesson')

    def test_get_lesson_by_section_unauthenticated(self):
        url = reverse('get_lesson_by_section', args=['test-lesson'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['lessons'], {})