# projects/permissions.py

from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Allow read-only access (GET, HEAD, OPTIONS) for any authenticated user.
    Allow write access (POST, PUT, DELETE) only to the owner of the object.
    """

    def has_permission(self, request, view):
        # Rule 1: All actions (list, create, etc.) require the user to be authenticated.
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Rule 2: Read permissions are allowed to any authenticated user
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Rule 3: Write permissions are only allowed to the owner
        return obj.owner == request.user