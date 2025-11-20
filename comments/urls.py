# comments/urls.py (ADJUSTED FOR NESTED INCLUSION)

from django.urls import path
from .views import CommentViewSet

comment_list = CommentViewSet.as_view({
    "get": "list",
    "post": "create"
})

comment_detail = CommentViewSet.as_view({
    "patch": "partial_update",
    "delete": "destroy"
})

urlpatterns = [
    # 🚨 FIX 1: Remove the redundant 'tasks/' prefix. 
    # The path is now relative to where it will be included (tasks/urls.py).
    path("<int:task_id>/comments/", comment_list, name="comment-list"),
    
    path("<int:task_id>/comments/<int:pk>/", comment_detail, name="comment-detail"),
]