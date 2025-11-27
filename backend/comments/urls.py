# comments/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommentViewSet

router = DefaultRouter()
router.register(r'', CommentViewSet, basename='comment')

# For nested routes under tasks
comment_list = CommentViewSet.as_view({
    "get": "list",
    "post": "create"
})

comment_detail = CommentViewSet.as_view({
    "patch": "partial_update",
    "delete": "destroy"
})

urlpatterns = [
    path('', include(router.urls)),
    path("<int:task_id>/comments/", comment_list, name="comment-list"),
    path("<int:task_id>/comments/<int:pk>/", comment_detail, name="comment-detail"),
]