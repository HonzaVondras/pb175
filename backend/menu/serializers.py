from rest_framework import serializers
from .models import FoodItem, Restaurant

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = '__all__'

class RestaurantSerializer(serializers.ModelSerializer):
    food_items = FoodItemSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = '__all__'
