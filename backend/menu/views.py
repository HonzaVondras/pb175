from django.shortcuts import render

# Create your views here.

from rest_framework import generics
from .models import FoodItem, Restaurant
from .serializers import FoodItemSerializer, RestaurantSerializer

class FoodList(generics.ListAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer

class RestaurantList(generics.ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer