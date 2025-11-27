# tasks/urls.py

from rest_framework.routers import DefaultRouter
from .views import TaskViewSet
from comments.views import CommentViewSet # <--- NEW IMPORT

router = DefaultRouter()

# Empty string since main urls.py already has 'api/tasks/' prefix
router.register(r'', TaskViewSet, basename='task')

# NESTED ROUTE: Comments under tasks
# This creates: /api/tasks/<task_pk>/comments/
router.register(
    r'(?P<task_pk>\d+)/comments', 
    CommentViewSet, 
    basename='task-comment'
)

urlpatterns = router.urls