# projects/models.py

from django.db import models
from django.conf import settings

class Project(models.Model):
    # Core fields for the project data
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    
    # Relationship: Links Project to its creator (owner)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='projects',
        on_delete=models.CASCADE
    )
    
    # Auditing fields: Tracks creation and last update time
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # A human-readable representation for debugging and admin
        return f"{self.title} ({self.owner.username})"
      
