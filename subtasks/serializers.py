# subtasks/serializers.py

from rest_framework import serializers
from .models import SubTask

class SubTaskSerializer(serializers.ModelSerializer):
    owner_username = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = SubTask
        fields = [
            'id',
            'parent_task',
            'owner',
            'owner_username',
            'title',
            'is_completed',
            'created_at',
            'updated_at',
        ]
        # We ensure users cannot change the ID, Owner, Timestamps, 
        # OR the Parent Task after creation.
        read_only_fields = [
            'id', 
            'owner', 
            'owner_username', 
            'created_at', 
            'updated_at',
            'parent_task' # <--- ADDED THIS FOR STABILITY
        ]