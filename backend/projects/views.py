# projects/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Project
from .serializers import ProjectSerializer
from .permissions import IsOwnerOrReadOnly

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsOwnerOrReadOnly]  # Enforces auth and owner-only editing

    def get_queryset(self):
        # CRITICAL: Restricts list, retrieve, update, delete to *only* the current user's projects.
        return Project.objects.filter(owner=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # CRITICAL: Automatically sets the project owner to the logged-in user upon creation.
        serializer.save(owner=self.request.user)