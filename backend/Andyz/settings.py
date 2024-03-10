from pathlib import Path
from datetime import timedelta

import os

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-^$#0yk%xkkf0$u9cn5cm(n1ris#nu1d&1u#kx=o*vk*^g8&1$i'
SETTINGS_PATH = os.path.dirname(os.path.dirname(__file__))

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.admin',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'corsheaders',
    'djoser',
    'drf_spectacular',

    'course',
    'users',
    'progress'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Andyz.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(SETTINGS_PATH, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Andyz.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# STATICFILES CONFIGURATIONS

STATIC_URL = '/static/'
# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'build/static')
# ]
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

AUTH_USER_MODEL = 'users.CustomUser'

REST_FRAMEWORK = {

    'DATETIME_FORMAT': '%d.%m.%y %H:%M',

    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema'

    # 'DEFAULT_THROTTLE_RATES': {
    #     'contact_form': '5/min'
    # },

}

SPECTACULAR_SETTINGS = {
    "TITLE": "Andyz API Project",
    "VERSION": "v1",
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=59),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('JWT',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}

DJOSER = {
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    # 'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    # 'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    # 'SET_USERNAME_RETYPE': True,
    # 'SET_PASSWORD_RETYPE': True,
    'SEND_ACTIVATION_EMAIL': True,
    # 'SEND_CONFIRMATION_EMAIL': True,

    # 'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',
    "ACTIVATION_URL": "activate/?uid={uid}&token={token}",
    'PASSWORD_RESET_CONFIRM_URL': 'auth/reset-password/?uid={uid}&token={token}',
    'PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND': True,

    'SERIALIZERS': {
        'current_user': 'users.serializers.PatientSerializer',
        # 'user_create': 'users.serializers.UserCreationSerializer'
    },

    'EMAIL': {
        'activation': 'users.email.ActivationEmail',

    }

}

DOMAIN = 'localhost:3000'


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'snurekeee03@gmail.com'
EMAIL_HOST_PASSWORD = 'ckdzmasobwtcqjej'

CORS_ALLOW_ALL_ORIGINS = True
