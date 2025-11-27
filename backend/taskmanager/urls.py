# taskmanager/urls.py (FINAL VERSION)

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/auth/', include('users.urls')),
    path('api/projects/', include('projects.urls')),
    
    # Tasks includes nested comments route already
    path('api/tasks/', include('tasks.urls')),
    # Attachments are nested under tasks
    path('api/tasks/', include('attachments.urls')),
    
    # Standalone endpoints for querying by task
    path('api/comments/', include('comments.urls')),
    path('api/attachments/', include('attachments.urls')),
    
    path('api/subtasks/', include('subtasks.urls')),
]

# REQUIRED for serving media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)