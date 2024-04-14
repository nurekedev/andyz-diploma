from rest_framework.permissions import BasePermission
from rest_framework import viewsets

class IsOwnerOrAdminPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.is_staff
    

class IsAdminOrAuthorPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_superuser or obj.author == request.user