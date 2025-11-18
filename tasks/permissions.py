# tasks/permissions.py

from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        # Allow Read actions (GET, HEAD, OPTIONS) for any authenticated user
        if request.method in SAFE_METHODS:
            return True

        # Only the object's owner can modify/delete it
        return obj.owner == request.user