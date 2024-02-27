from django.urls import path
from .views import AppUser, AppUserUsername

urlpatterns = [
    path('users/', AppUser.as_view(), name='appuser-username'),
    path('users/<str:username>/', AppUserUsername.as_view(), name='appuser-username-detail'),
]