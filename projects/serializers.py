# projects/serializers.py

from rest_framework import serializers
from .models import Project 

class ProjectSerializer(serializers.ModelSerializer):
    # This read-only field shows the owner's username for better API output
    owner_username = serializers.CharField(source='owner.username', read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'owner', 'owner_username', 'created_at', 'updated_at']
        
        # Protect server-managed fields from client input
        read_only_fields = ['id', 'owner', 'owner_username', 'created_at', 'updated_at']