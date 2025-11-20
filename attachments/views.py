from rest_framework import generics, permissions
from .models import Attachment
from .serializers import AttachmentSerializer

class AttachmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AttachmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    # GET: Show only attachments for THIS specific task ID
    def get_queryset(self):
        task_id = self.kwargs["task_id"]
        return Attachment.objects.filter(task_id=task_id)

    # POST: Automatically link the uploaded file to THIS task ID
    def perform_create(self, serializer):
        task_id = self.kwargs["task_id"]
        # Note: The file data is handled automatically by the serializer
        serializer.save(task_id=task_id)