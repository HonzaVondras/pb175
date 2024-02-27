from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User
import json

from rest_framework.generics import RetrieveAPIView
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .serializers import AppUserSerializer

@csrf_exempt
def create_person(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        user = User(
            firstname=data.get('firstname', ''),
            surname=data.get('surname', ''),
            email=data.get('email', ''),
            password=data.get('password', ''),
            username=data.get('username', ''),
            is_admin=data.get('is_admin', False)
        )

        # Save the user instance
        user.save()

        return JsonResponse({'message': 'Person created successfully'})
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=400)


class AppUser(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = AppUserSerializer


class AppUserUsername(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = AppUserSerializer

    def get_object(self):
        username = self.kwargs.get('username')
        obj = get_object_or_404(User, username=username)
        return obj