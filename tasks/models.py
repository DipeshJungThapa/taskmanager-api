# tasks/models.py
from django.db import models
from django.contrib.auth.models import User # Correctly imported the User model
from projects.models import Project        # Correctly imported the Project model

class Task(models.Model):
    # Foreign Key 1: Links task to its parent project
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='tasks'
    )

    # Foreign Key 2: Links task to its owner (User)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='tasks' # Note: This reuses the 'tasks' related_name from Project, 
                             # which is fine as they link to different models.
    )

    # Core fields... (rest of the model is standard)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    is_completed = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title