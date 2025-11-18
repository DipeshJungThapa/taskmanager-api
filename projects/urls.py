# projects/urls.py

from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet

router = DefaultRouter()
# The 'r' defines the base route for the ViewSet: /api/projects/
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = router.urls