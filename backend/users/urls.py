from django.urls import path
from .views import RegisterView, UserDetailView
from rest_framework_simplejwt.views import (
    TokenObtainPairView, # Built-in view for login (obtaining tokens)
    TokenRefreshView,    # Built-in view for refreshing tokens
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserDetailView.as_view(), name='user_detail'),
]