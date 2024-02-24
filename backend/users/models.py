from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.core.validators import RegexValidator

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    MALE = 'male'
    FEMALE = 'female'
    NOT_SPECIFIED = 'not_specified'

    GENDER = (
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (NOT_SPECIFIED, 'Not Specified')
    )

    BLOOD_GROUP_I_POSITIVE = 'I+'
    BLOOD_GROUP_I_NEGATIVE = 'I-'
    BLOOD_GROUP_II_POSITIVE = 'II+'
    BLOOD_GROUP_II_NEGATIVE = 'II-'
    BLOOD_GROUP_III_POSITIVE = 'III+'
    BLOOD_GROUP_III_NEGATIVE = 'III-'
    BLOOD_GROUP_IV_POSITIVE = 'IV+'
    BLOOD_GROUP_IV_NEGATIVE = 'IV-'
    BLOOD_GROUP_NOT_SPECIFIED = 'not_specified'

    BLOOD_GROUP_CHOICES = (
        (BLOOD_GROUP_I_POSITIVE, 'I Positive'),
        (BLOOD_GROUP_I_NEGATIVE, 'I Negative'),
        (BLOOD_GROUP_II_POSITIVE, 'II Positive'),
        (BLOOD_GROUP_II_NEGATIVE, 'II Negative'),
        (BLOOD_GROUP_III_POSITIVE, 'III Positive'),
        (BLOOD_GROUP_III_NEGATIVE, 'III Negative'),
        (BLOOD_GROUP_IV_POSITIVE, 'IV Positive'),
        (BLOOD_GROUP_IV_NEGATIVE, 'IV Negative'),
        (BLOOD_GROUP_NOT_SPECIFIED, 'Not specified')
    )

    username = None
    email = models.EmailField(_("email address"), max_length=255, unique=True)
    first_name = models.CharField(_("first name"), max_length=255)
    last_name = models.CharField(_("last name"), max_length=255)
    identifier_number = models.CharField(_("Identifier ID"), max_length=15)
    gender = models.CharField(_("gender"), max_length=15, choices=GENDER, default=NOT_SPECIFIED)
    blood_group = models.CharField(_("blood_group"), max_length=15, choices=BLOOD_GROUP_CHOICES,
                                   default=BLOOD_GROUP_NOT_SPECIFIED)
    address_line = models.CharField(_("address_line"), max_length=255, blank=True)
    date_of_birth = models.DateField(_("birthday"))
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="Phone number must be entered in the format: '+7XXXXXXXXXX'. Up to 15 digits "
                                         "allowed.")
    phone_number = models.CharField(_("phone number"), validators=[phone_regex], max_length=17, blank=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "phone_number", "date_of_birth", "identifier_number"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"


class Record(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='records')
    date = models.DateField(_("birthday"))
    title = models.CharField(_("record title"), max_length=255)
    description = models.TextField(_("record text"))

    def __str__(self):
        return f"{self.date} / {self.title}"