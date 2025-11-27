from django.db import models
from django.contrib.auth.models import User
from tasks.models import Task

class SubTask(models.Model):
    parent_task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name='subtasks'
    )

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='subtasks'
    )

    title = models.CharField(max_length=200)
    is_completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Subtask: {self.title}"
