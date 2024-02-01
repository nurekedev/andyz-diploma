from django.urls import path
from .views import sign_up_view


urlpatterns = [
    path('sign-up/', sign_up_view)
]
