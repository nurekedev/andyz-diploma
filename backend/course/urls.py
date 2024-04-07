from django.urls import path, include
from .views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('my-courses/', get_my_courses),
    path('<slug:slug>/', get_course, name='course-detail'),
    path('lessons/<slug:slug>/', get_lesson_by_section, name='lesson-detail'),
    path('<slug:course_slug>/review/', rating_api_view),
    path('<slug:course_slug>/review/<int:pk>/',
         rating_api_destroy_update_view, name='rating-detail')


    # path('get-author-course/<int:user_id>/', views.get_author_courses),
    # path('<slug:course_slug>/<slug:lesson_slug>/get-comments/', views.get_comments),
    # path('<slug:course_slug>/<slug:lesson_slug>/get-quiz/', views.get_quizes),
]