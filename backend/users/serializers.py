from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model

user = get_user_model()


# creating new users


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'email', 'password', 'first_name', 'last_name',
                  'email', 'phone_number']

    # you can grab the created user and do something with them here
    def create(self, validated_data):
        user = super().create(validated_data)


        return user


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'first_name', 'last_name', 'email', 'is_active', 'is_deactivated']

    # this is where we send a request to slash me/ or auth/users
    def validate(self, attrs):
        validated_attr = super().validate(attrs)
        username = validated_attr.get('username')

        user = user.objects.get(username=username)

        if user.is_deactivated:
            raise ValidationError(
                'Account deactivated')

        if not user.is_active:
            raise ValidationError(
                'Account not activated')

        return validated_attr


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        obj = self.user

        # you can do all sort of things here !!!
        # let me try something crazy if a user's last login is less than 2-minutes we deny
        # them access to the system 🤣🤣🤣🥲
        '''
        current_time = datetime.now()
        two_minutes_ago = current_time - timedelta(minutes=2)
        if obj.last_login > two_minutes_ago :
            raise ValidationError(
                'You are not allowed to login at this time wait for 2 minutes ')


        '''
        # if obj.is_deactivated:
        #     raise ValidationError(
        #         'Account deactivated. Account deactivated!!')

        # if not obj.is_active:
        #     raise ValidationError(
        #         'Account not activated. go to your email and activate your account')

        data.update({
            'id': obj.id, 'first_name': obj.first_name,
            'last_name': obj.last_name, 'email': obj.email,
            'username': obj.username,
            'is_active': obj.is_active,
            'is_deactivated': obj.is_deactivated,
        })

        return data

# from rest_framework import serializers
# from djoser.serializers import UserCreateSerializer
# from django.contrib.auth import get_user_model
#
# CustomUser = get_user_model()
#
#
# class UserSerializer(UserCreateSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ('id', 'email', 'first_name', 'last_name', 'phone_number', 'password', 'date_of_birth')
#
#     # def create(self, validated_data):
#     #     user = CustomUser.objects.create(
#     #         email=validated_data['email'],
#     #         first_name=validated_data['first_name'],
#     #         last_name=validated_data['last_name'],
#     #         phone_number=validated_data['phone_number'],
#     #         date_of_birth=validated_data['date_of_birth']
#     #     )
#     #
#     #     user.set_password(validated_data['password'])
#     #     user.save()
#     #
#     #     return user
