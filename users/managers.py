from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):

    def create_user(self, email, first_name, last_name, phone_number, date_of_birth, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            date_of_birth=date_of_birth,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, phone_number, date_of_birth, password=None):
        user = self.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            date_of_birth=date_of_birth,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

