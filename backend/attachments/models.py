from django.db import models
from tasks.models import Task

# This function dynamically creates a path: media/tasks/10/my_file.png
def task_attachment_path(instance, filename):
    return f"tasks/{instance.task.id}/{filename}"

class Attachment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="attachments")
    file = models.FileField(upload_to=task_attachment_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attachment {self.id} for Task {self.task.id}"