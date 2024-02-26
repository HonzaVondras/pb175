from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User
import json

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
