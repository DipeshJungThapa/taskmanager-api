# taskmanager/urls.py (FINAL VERSION)

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/auth/', include('users.urls')),
    
    path('api/projects/', include('projects.urls')),
    
    # 🚨 FIX: The 'tasks' app must include both its own routes AND the comments routes,
    # as comments are a sub-resource of tasks.
    path('api/tasks/', include('tasks.urls')),
    path('api/tasks/', include('comments.urls')), # <-- Now included under /api/tasks/
    
    # The subtasks line can stay separate or be merged, depending on its structure.
    path('api/subtasks/', include('subtasks.urls')),
    # Remove the old 'api/comments/' include entirely.
]