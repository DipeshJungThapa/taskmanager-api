# tasks/views.py

from rest_framework import viewsets, permissions, filters
from django.utils import timezone  # Needed for the 'overdue' custom filter
from .models import Task
from .serializers import TaskSerializer
from .permissions import IsOwnerOrReadOnly

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    # --- DRF Built-in Filters ---
    filter_backends = [
        filters.SearchFilter, 
        filters.OrderingFilter
    ]
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'due_date', 'title']

    # --- Custom Queryset Filtering ---
    def get_queryset(self):
        # 1. Start with the base queryset: only tasks owned by the current user
        user = self.request.user
        queryset = Task.objects.filter(owner=user)

        # 2) Filter by project ID (?project=X)
        project_id = self.request.query_params.get('project')
        if project_id:
            queryset = queryset.filter(project_id=project_id)

        # 3) Filter by is_completed status (?is_completed=true/false)
        is_completed = self.request.query_params.get('is_completed')
        if is_completed is not None:
            if is_completed.lower() == "true":
                queryset = queryset.filter(is_completed=True)
            elif is_completed.lower() == "false":
                queryset = queryset.filter(is_completed=False)

        # 4) Custom filter: overdue (?overdue=true)
        overdue = self.request.query_params.get('overdue')
        if overdue and overdue.lower() == "true":
            # Check for tasks with a due date in the past AND are not completed
            today = timezone.now().date()
            queryset = queryset.filter(
                due_date__lt=today,
                is_completed=False
            )

        # Return the final, filtered queryset
        return queryset

    def perform_create(self, serializer):
        # Keeps the auto-assignment logic from Phase 4
        serializer.save(owner=self.request.user)