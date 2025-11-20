from django.urls import path
from .views import AttachmentListCreateView

urlpatterns = [
    # The full URL will be: /api/tasks/<task_id>/attachments/
    path('<int:task_id>/attachments/', AttachmentListCreateView.as_view(), name='task-attachments'),
]