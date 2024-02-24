from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import requests
from rest_framework_simplejwt.views import TokenObtainPairView


User = get_user_model()


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def check_username_exists(request):
#     if not request.data.get('email'):
#         return Response({'error': 'Bad_request'}, status=status.HTTP_400_BAD_REQUEST)
#
#     username = request.data.get('email')
#     try:
#         User.objects.get(username=username)
#         return Response({'email_exists': True}, status=status.HTTP_200_OK)
#
#     except User.DoesNotExist:
#         return Response({'email_exists': False}, status=status.HTTP_404_NOT_FOUND)
#
#
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def home(request):
#     return Response({'detail': 'Welcome to the tutorial'}, status=status.HTTP_200_OK)
#
