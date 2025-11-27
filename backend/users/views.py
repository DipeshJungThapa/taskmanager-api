from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class RegisterView(generics.CreateAPIView):
    """
    Endpoint for user registration (Signup).
    Uses RegisterSerializer to create and validate the user.
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class UserDetailView(APIView):
    """
    Protected endpoint to return details of the currently logged-in user.
    Requires a valid JWT Access Token.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user # request.user is available because of JWTAuthentication
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })