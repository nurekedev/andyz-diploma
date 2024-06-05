from django.contrib.auth import get_user_model

from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView
from rest_framework.mixins import DestroyModelMixin
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from djoser.serializers import UserCreateSerializer



from users.serializers import UserListSerializer, RecordSerializer, RecordCreateSerializer
from users.models import Record

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.filter(is_active=False, is_staff=False, is_superuser=False)
    permission_classes = [permissions.IsAdminUser]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserListSerializer

class RecordAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, patient_id):
        records = Record.objects.filter(user=patient_id)
        serializer = RecordSerializer(records, many=True)
        return Response(serializer.data)
    
    def post(self, request, patient_id):
        user = User.objects.get(id=patient_id)
        serializer = RecordCreateSerializer(data=request.data)
    
        if user and serializer.is_valid():
            Record.objects.create(user=user, **serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def patch(self, request, patient_id):
    #     record = Record.objects.get(user__id=patient_id)
    #     serializer = RecordCreateSerializer(record, data=request.data)
        
    #     if record and serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
