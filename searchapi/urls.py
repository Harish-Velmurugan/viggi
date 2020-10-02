from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [                        path('<str:un>/',views.get_querylist)
]