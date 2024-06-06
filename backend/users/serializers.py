from django.contrib.auth import get_user_model
from django.conf import settings

from djoser.serializers import UserSerializer
from rest_framework import serializers



from users.models import CustomUser, Marker, Record
from course.models import Course

user = get_user_model()

class QuestionContactSerializer(serializers.Serializer):
    name = serializers.CharField(
        max_length=100, write_only=True, help_text=("Имя"))
    email = serializers.EmailField(max_length=100, help_text=("Электронная почта"))
    question_text = serializers.CharField(max_length=255, help_text=("Текст вопроса"))

class MarkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marker
        fields = '__all__'

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = '__all__'

class RecordCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('date', 'title', 'description')

class MarkerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marker
        fields = ('date', 'title', 'description')

class UserListSerializer(UserSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('id', 'first_name', 'last_name','email', 'avatar', 'blood_group', 'gender', 'is_active')

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    
    def get_avatar(self, obj):
        return f"{settings.DOMAIN_URL}{obj.avatar.url}"
    
class DoctorHideSerializer(UserSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta(UserSerializer.Meta):
        fields = ('id', 'full_name', 'avatar')

    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'
    
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
                  'is_staff', 
                  ]

class CustomCourseListSerializer(serializers.ModelSerializer):
    created_by = DoctorHideSerializer(read_only=True)

    class Meta:
        model = Course
        fields = ('title', 'slug', 'short_description',
                  'created_by', 'image',)


