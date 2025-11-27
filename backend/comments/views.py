# comments/views.py

from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied, NotFound
from django.shortcuts import get_object_or_404
from .models import Comment
from tasks.models import Task
from .serializers import CommentSerializer
from .permissions import IsOwnerOrReadOnly


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        # Support both nested (/api/tasks/<task_id>/comments/) and 
        # standalone (/api/comments/?task=<task_id>) routes
        task_id = self.kwargs.get("task_id") or self.request.query_params.get("task")
        
        if task_id:
            return Comment.objects.filter(
                task__id=task_id,
                task__project__owner=self.request.user
            ).select_related('task', 'owner')
        
        # If no task_id, return all comments for user's tasks
        return Comment.objects.filter(
            task__project__owner=self.request.user
        ).select_related('task', 'owner')

    def perform_create(self, serializer):
        task_id = self.kwargs.get("task_id") or self.request.data.get("task")
        
        if not task_id:
            raise NotFound(detail="Task ID is required")

        try:
            task = Task.objects.get(id=task_id, project__owner=self.request.user)
        except Task.DoesNotExist:
            raise NotFound(detail="Task not found or you don't have permission")

        serializer.save(owner=self.request.user, task=task)
