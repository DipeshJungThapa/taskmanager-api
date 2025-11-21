# projects/urls.py

from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet

router = DefaultRouter()
# Empty string since the main urls.py already has 'api/projects/' prefix
router.register(r'', ProjectViewSet, basename='project')

urlpatterns = router.urls