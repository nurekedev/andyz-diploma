from djoser.serializers import UserSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from users.models import CustomUser, Marker, Record

user = get_user_model()



class MarkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marker
        fields = '__all__'

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = '__all__'


class DoctorHideSerializer(UserSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta(UserSerializer.Meta):
        fields = ('id', 'full_name', 'avatar')

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class PatientSerializer(UserSerializer):
    records = RecordSerializer(many=True, read_only=True)
    markers = MarkerSerializer(many=True, read_only=True)

    class Meta(UserSerializer.Meta):
        fields = ['id',
                  'avatar',
                  'email',
                  'first_name',
                  'last_name',
                  'identifier_number',
                  'gender',
                  'blood_group',
                  'address_line',
                  'date_of_birth',
                  'phone_number',
                  'records',
                  'markers',
                  ]



