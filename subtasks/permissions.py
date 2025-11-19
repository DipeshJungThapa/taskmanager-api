# subtasks/permissions.py

from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit or delete it.
    Read permissions are allowed for all authenticated users.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any authenticated request.
        if request.method in SAFE_METHODS:
            return True
            
        # Write permissions are only allowed to the owner of the subtask.
        return obj.owner == request.user