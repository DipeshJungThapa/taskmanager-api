# comments/views.py (Debugging Version)

import sys  # <-- Ensure this import is at the top
from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied, NotFound
from django.shortcuts import get_object_or_404
from .models import Comment
from tasks.models import Task
from .serializers import CommentSerializer
from .permissions import IsOwnerOrReadOnly
from django.conf import settings
import os
import sys
from django.db import connection  # <-- Ensure this import is at the top


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        task_id = self.kwargs.get("task_id")
        return Comment.objects.filter(
            task__id=task_id,
            task__owner=self.request.user
        )

    def perform_create(self, serializer):
        task_id = self.kwargs.get("task_id")

        # --- DEBUG BLOCK START ---
        print(
            f"\n🔎 DEBUG: Attempting to find Task ID: {task_id} (Type: {type(task_id)})", file=sys.stderr)

        # 1. Check what IDs actually exist
        all_ids = list(Task.objects.values_list('id', flat=True))
        print(f"🔎 DEBUG: Current Task IDs in DB: {all_ids}", file=sys.stderr)

        # 2. Check if casting helps
        try:
            t_id_int = int(task_id)
            print(
                f"🔎 DEBUG: Is {t_id_int} in {all_ids}? {t_id_int in all_ids}", file=sys.stderr)
        except:
            print("🔎 DEBUG: Could not cast task_id to int", file=sys.stderr)

        # 3. Check connection vendor
        print(f"🔎 DEBUG: DB Vendor: {connection.vendor}", file=sys.stderr)
        # --- DEBUG BLOCK END ---

        # Original Logic (now inside try/except)
        try:
            task = Task.objects.get(id=task_id)
            print("✅ DEBUG: Task Found!", file=sys.stderr)
        except Task.DoesNotExist:
            print("❌ DEBUG: Task.DoesNotExist caught.", file=sys.stderr)
            print(f"📂 SERVER DB PATH: {settings.DATABASES['default']['NAME']}", file=sys.stderr)
            print(f"📍 ABSOLUTE PATH: {os.path.abspath(settings.DATABASES['default']['NAME'])}", file=sys.stderr)
            raise NotFound(detail="No Task matches the given query.")

        if task.owner != self.request.user:
            raise PermissionDenied("You can only comment on tasks you own.")

        serializer.save(owner=self.request.user, task=task)
