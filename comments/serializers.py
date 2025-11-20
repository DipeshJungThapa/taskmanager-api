# comments/serializers.py

from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    owner_username = serializers.ReadOnlyField(source='owner.username') 
    
    class Meta:
        model = Comment
        fields = ["id", "task", "owner", "owner_username", "message", "created_at"]
        
        extra_kwargs = {
            'task': {'required': False} # <--- MUST BE INCLUDED
        }
        read_only_fields = ["id", "owner", "owner_username", "created_at"]