from django.urls import path, include
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter, SimpleRouter


urlpatterns = [
    path('my-courses/', get_my_courses),
    path('<slug:slug>/', get_course, name='course-detail'),
    path('lessons/<slug:slug>/', get_lesson_by_section, name='lesson-detail'),
    
    path('<slug:course_slug>/review/', rating_api_view),
    path('<slug:course_slug>/review/<int:pk>/', rating_api_destroy_update_view, name='rating-detail'),
         
    path('<slug:course_slug>/comments/', course_comment_api_view),
    path('<slug:course_slug>/comments/<int:pk>/', course_api_destroy_update_view),
    path('<slug:course_slug>/<slug:lesson_slug>/comments/', lesson_comment_api_view),
    path('<slug:course_slug>/<slug:lesson_slug>/comments/<int:pk>/', lesson_api_destroy_update_view)
]
    