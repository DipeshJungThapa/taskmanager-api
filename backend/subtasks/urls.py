from rest_framework.routers import DefaultRouter
from .views import SubTaskViewSet

router = DefaultRouter()
# Empty string since main urls.py already has 'api/subtasks/' prefix
router.register(r'', SubTaskViewSet, basename='subtask')

urlpatterns = router.urls