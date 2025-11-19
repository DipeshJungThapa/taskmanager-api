# comments/urls.py

from django.urls import path
from .views import CommentViewSet

# List/Create View: /api/tasks/<task_id>/comments/
comment_list = CommentViewSet.as_view({
    "get": "list",
    "post": "create"
})

# Detail View: /api/tasks/<task_id>/comments/<comment_pk>/
comment_detail = CommentViewSet.as_view({
    "patch": "partial_update",
    "delete": "destroy"
})

urlpatterns = [
    # Route for listing/creating comments for a specific task
    path("tasks/<int:task_id>/comments/", comment_list, name="comment-list"),
    
    # Route for updating/deleting a specific comment under a specific task
    path("tasks/<int:task_id>/comments/<int:pk>/", comment_detail, name="comment-detail"),
]