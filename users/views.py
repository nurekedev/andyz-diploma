from django.shortcuts import render
from django.contrib.auth import get_user_model

from rest_framework import mixins, viewsets, generics, permissions

from .serializers import UserSerializer
from .models import CustomUser


# Create your views here.
class SignUpAPIView(generics.CreateAPIView):
    model = get_user_model()
    serializer_class = UserSerializer


sign_up_view = SignUpAPIView.as_view()
