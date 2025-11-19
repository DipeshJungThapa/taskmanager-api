# tasks/urls.py

from rest_framework.routers import DefaultRouter
from .views import TaskViewSet
from comments.views import CommentViewSet # <--- NEW IMPORT

router = DefaultRouter()

# 1. Register TaskViewSet (Your existing code)
router.register(r'tasks', TaskViewSet, basename='task')

# 2. NESTED ROUTE: Register the CommentViewSet under the Task route.
# This creates the pattern: /api/tasks/<task_pk>/comments/
router.register(
    r'tasks/(?P<task_pk>\d+)/comments', 
    CommentViewSet, 
    basename='task-comment' # Unique basename for the nested view
)

urlpatterns = router.urls