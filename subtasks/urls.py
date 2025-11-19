from rest_framework.routers import DefaultRouter
from .views import SubTaskViewSet

router = DefaultRouter()
# Add basename='subtask' because the ViewSet uses get_queryset instead of a static queryset attribute.
router.register(r'subtasks', SubTaskViewSet, basename='subtask')

urlpatterns = router.urls