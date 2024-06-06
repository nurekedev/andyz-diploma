from django.urls import path, include

from rest_framework.routers import DefaultRouter

from users import views

router = DefaultRouter()
router.register(r'custom-users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('records/<int:patient_id>', views.record_get_post_delete, name='records'),
    path('markers/<int:patient_id>', views.marker_get_post_delete, name='markers'),
    path('enrollments/<int:patient_id>', views.enrollment_list_create, name='enrollments')
]


