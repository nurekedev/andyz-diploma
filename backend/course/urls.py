from django.urls import path
from .views import *

urlpatterns = [
    path('', get_courses),
    path('get-newest-courses/', get_newest_courses),
    # path('/', get_categories),
    # path('create/', views.create_course),
    path('<slug:slug>/', get_course, name='course-detail'),
    # path('get-author-course/<int:user_id>/', views.get_author_courses),
    # path('<slug:course_slug>/<slug:lesson_slug>/', views.add_comment),
    # path('<slug:course_slug>/<slug:lesson_slug>/get-comments/', views.get_comments),
    # path('<slug:course_slug>/<slug:lesson_slug>/get-quiz/', views.get_quizes),

]
