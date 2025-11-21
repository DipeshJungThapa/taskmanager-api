from django.urls import path
from .views import AttachmentListCreateView, AttachmentListView

urlpatterns = [
    # Standalone endpoint for querying attachments
    path('', AttachmentListView.as_view(), name='attachments-list'),
    
    # Nested endpoint: /api/tasks/<task_id>/attachments/
    path('<int:task_id>/attachments/', AttachmentListCreateView.as_view(), name='task-attachments'),
]