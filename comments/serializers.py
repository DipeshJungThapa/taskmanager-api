# comments/serializers.py

from rest_framework import serializers
from .models import Comment
from tasks.models import Task # <--- Added this import for explicit field

class CommentSerializer(serializers.ModelSerializer):
    owner_username = serializers.ReadOnlyField(source='owner.username') 
    
    # 🚨 FIX: Explicitly define the task field and mark it NOT required (required=False).
    # This prevents the 400 Bad Request error because the ViewSet will set it later.
    task = serializers.PrimaryKeyRelatedField(
        queryset=Task.objects.all(),
        required=False  # <--- CRITICAL FIX
    )

    class Meta:
        model = Comment
        fields = ["id", "task", "owner", "owner_username", "message", "created_at"]
        read_only_fields = ["id", "owner", "owner_username", "created_at"]