from django.urls import path, re_path, include
from django.views.generic import TemplateView


from rest_framework.routers import DefaultRouter

from users import views

router = DefaultRouter()
router.register(r'custom-users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('records/<int:patient_id>', views.RecordAPIView.as_view(), name='records')
]


