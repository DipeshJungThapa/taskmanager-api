# core/views.py

from django.http import JsonResponse

def api_home(request):
    """
    Test endpoint to confirm the core app and URL routing is working.
    """
    return JsonResponse({"message": "API is working!"})