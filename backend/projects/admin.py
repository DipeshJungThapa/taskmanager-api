# projects/admin.py

from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'owner', 'created_at')
    list_filter = ('owner',)
    search_fields = ('title', 'description', 'owner__username')