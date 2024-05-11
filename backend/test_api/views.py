from django.shortcuts import render
from rest_framework.views import APIView



class TestAPIView(APIView):
    def get(self, request):
        return Response({"message": "Hello, world!"})
    