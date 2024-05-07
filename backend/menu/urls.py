from django.urls import path
from .views import FoodList, RestaurantList, RestaurantUpdateAPIView, RestaurantDeleteAPIView, OrderDeleteAPIView, OrderUpdateAPIView

urlpatterns = [
    path('food/', FoodList.as_view(), name='food-list'),
    path('restaurants/', RestaurantList.as_view(), name='restaurant-list'),
    path('restaurantss/<int:pk>/', RestaurantUpdateAPIView.as_view(), name='restaurant_update_api'),
    path('restaurants/delete/<int:pk>/', RestaurantDeleteAPIView.as_view(), name='restaurant_delete_api'),
    path('order/delete/<int:pk>/', OrderDeleteAPIView.as_view(), name='order_delete_api'),
    path('order/<int:pk>/', OrderUpdateAPIView.as_view(), name='order_update_api'),
]
