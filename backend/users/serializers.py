from djoser.serializers import UserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser

user = get_user_model()


class DoctorHideSerializer(UserSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta(UserSerializer.Meta):
        fields = ('full_name',)

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class PatientSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ['email',
                  'first_name',
                  'last_name',
                  'identifier_number',
                  'gender',
                  'blood_group',
                  'address_line',
                  'date_of_birth',
                  'phone_number']



