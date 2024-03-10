from django.urls import path
from .views import *

urlpatterns = [
     path('get-enrollment-courses/<slug:course_slug>/', get_user_progress_by_course),
     path('track-started/<slug:course_slug>/<slug:lesson_slug>/', track_started),
     path('mark-as-done/<slug:course_slug>/<slug:lesson_slug>/', marks_as_done),
]


