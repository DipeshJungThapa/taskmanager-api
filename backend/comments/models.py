# comments/models.py

from django.db import models
from django.contrib.auth.models import User
from tasks.models import Task

class Comment(models.Model):
    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name="comments"
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="comments"
    )
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.owner.username} on Task {self.task.id}"