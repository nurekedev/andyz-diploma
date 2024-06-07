from django.urls import path
from .views import *

urlpatterns = [
     path('get-enrollment-courses/<slug:course_slug>/', get_user_progress_by_course),
     path('get-patient-enrollment-data/<slug:course_slug>/<int:patient_id>', get_patient_progress_by_course, name='get-enrollment-data-p'),
     path('track-started/<slug:course_slug>/<slug:section_slug>/<slug:lesson_slug>/', track_started),
     path('mark-as-done/<slug:course_slug>/<slug:section_slug>/<slug:lesson_slug>/', marks_as_done),

     path('get-done-lessons/<slug:course_slug>/', get_marked_lessons_by_user_and_course),
]


