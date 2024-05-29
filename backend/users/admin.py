from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Record, Marker
from .forms import CustomUserChangeForm, CustomUserCreationForm


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ("email", "is_staff", "is_active", )
    list_filter = ("is_staff", "is_active",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": (
            "first_name", "last_name", "gender", "identifier_number", "address_line", "date_of_birth", "blood_group",
            "phone_number", "avatar")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2", "first_name", "last_name", "gender", "identifier_number",
                "blood_group", "address_line", "date_of_birth", "phone_number", "is_staff", "is_active",
                "groups", "user_permissions"
            )}
         ),
    )
    search_fields = ("email",)
    ordering = ("email",)


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Marker)


@admin.register(Record)
class RecordAdmin(admin.ModelAdmin):
    list_display = ('date', 'title', 'description')
