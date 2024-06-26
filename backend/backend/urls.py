"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from AppUsers.views import create_person, AppUser, AppUserUsername, get_specific_email


urlpatterns = [
    #path('api/users/<str:username>/', AppUserUsername.as_view(), name='appuser-username-detail'),
    #path('api/users/', AppUserUsername.as_view(), name='appuser-list'),
    path('api/', include('AppUsers.urls')),
    path('api/create-person/', create_person, name='create_person'),
    path('admin/', admin.site.urls),
    path('api/', include('menu.urls')),
    path('api/users/emails/<str:email>/', get_specific_email, name='get_specific_email'),
]
