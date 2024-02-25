from django.urls import path
from .views import FoodList, RestaurantList

urlpatterns = [
    path('food/', FoodList.as_view(), name='food-list'),
    path('restaurants/', RestaurantList.as_view(), name='restaurant-list'),
]
