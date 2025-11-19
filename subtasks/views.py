# subtasks/views.py

from rest_framework import viewsets, permissions
from .models import SubTask
from .serializers import SubTaskSerializer
from .permissions import IsOwnerOrReadOnly

class SubTaskViewSet(viewsets.ModelViewSet):
    serializer_class = SubTaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        # CRITICAL: Ensures a user only sees subtasks they own.
        return SubTask.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # CRITICAL: Automatically sets the logged-in user as the owner before saving.
        serializer.save(owner=self.request.user)