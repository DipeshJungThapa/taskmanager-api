"""
URL configuration for taskmanager project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# taskmanager/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),         # existing: /api/
    path('api/auth/', include('users.urls')),   # existing: /api/auth/
    
    # ADD THIS LINE: Routes for projects
    path('api/', include('projects.urls')),     # Projects routes: /api/projects/
    path("api/", include("tasks.urls")),
    path("api/", include("subtasks.urls")),
    path("api/", include("comments.urls")), # <--- ADD THIS LINE# <- ADD THIS LINE
]

