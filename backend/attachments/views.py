from rest_framework import generics, permissions
from .models import Attachment
from .serializers import AttachmentSerializer


class AttachmentListView(generics.ListCreateAPIView):
    """Standalone endpoint for querying attachments with ?task=<id>"""
    serializer_class = AttachmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        task_id = self.request.query_params.get("task")
        if task_id:
            return Attachment.objects.filter(
                task_id=task_id,
                task__project__owner=self.request.user
            )
        return Attachment.objects.filter(
            task__project__owner=self.request.user
        )

    def perform_create(self, serializer):
        task_id = self.request.data.get("task")
        serializer.save(task_id=task_id)


class AttachmentListCreateView(generics.ListCreateAPIView):
    """Nested endpoint under /api/tasks/<task_id>/attachments/"""
    serializer_class = AttachmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        task_id = self.kwargs["task_id"]
        return Attachment.objects.filter(
            task_id=task_id,
            task__project__owner=self.request.user
        )

    def perform_create(self, serializer):
        task_id = self.kwargs["task_id"]
        serializer.save(task_id=task_id)