# comments/permissions.py (NEW FILE)

from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of a comment to edit or delete it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any authenticated user.
        if request.method in SAFE_METHODS:
            return True
            
        # Write permissions are only allowed to the owner of the comment.
        return obj.owner == request.user