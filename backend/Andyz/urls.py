from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_swagger.views import get_swagger_view
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

from users.views import question_contact

schema_view = get_swagger_view(title='Andyz API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('submit_contact/', question_contact, name='submit_contact'),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls.jwt')),
    path('api/v1/course/', include('course.urls')),
    path('api/v1/progress/', include('progress.urls')),
    path('api/v1/cm-users/', include('users.urls')),

    path('api/v1/schema/', SpectacularAPIView.as_view(), name="schema"),
    path("api/v1/schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
