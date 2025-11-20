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

    # The 'tasks' app must include its own routes, comments, and attachments
    path('api/tasks/', include('tasks.urls')),
    path('api/tasks/', include('comments.urls')),
    path('api/tasks/', include('attachments.urls')),  # New Attachments Router

    # The subtasks line can stay separate or be merged, depending on its structure.
    path('api/subtasks/', include('subtasks.urls')),
    # Remove the old 'api/comments/' include entirely.
]

# REQUIRED for serving media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)