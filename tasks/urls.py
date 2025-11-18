# tasks/urls.py

from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

router = DefaultRouter()

# CORRECT: Register the ViewSet ONCE and provide the 'basename'
# The router needs a unique name since the ViewSet uses get_queryset() instead of a fixed .queryset attribute.
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = router.urls