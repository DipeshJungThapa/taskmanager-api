# comments/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied  # <--- ADD THIS IMPORT
from django.shortcuts import get_object_or_404
from .models import Comment
from tasks.models import Task
from .serializers import CommentSerializer
from tasks.permissions import IsOwnerOrReadOnly


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        # 1. Get the task_id from the URL (set by comments/urls.py)
        task_id = self.kwargs.get("task_id")

        # 2. Filter to only show comments for the requested task ID
        # AND only if that task belongs to the requesting user (security filter).
        return Comment.objects.filter(
            task__id=task_id,
            task__owner=self.request.user
        )

def perform_create(self, serializer):
        task_id = self.kwargs.get("task_id")
        
        # 1. Retrieve the Task instance (must exist)
        task = get_object_or_404(Task, id=task_id)
        
        # 2. EXPLICITLY check ownership (Guardrail)
        if task.owner != self.request.user:
            # Raise a specific exception if the user doesn't own the task
            raise PermissionDenied("You can only comment on tasks you own.")

        # 3. Save the comment, forcing the owner and the task relationship.
        serializer.save(owner=self.request.user, task=task)