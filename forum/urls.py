from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [  
    path('postSubmission/', views.postSubmission, name="Post-Submission"),
    path('answerSubmission/', views.answerSubmission, name='Answer-Submission'),
    path('getPost/', views.getPost, name='Get-Post'),
    path('getAnswer/<str:pid>/', views.getAnswer, name='get-Answer'),
    path('postRefining/<str:un>/', views.postRefining, name='postRefining-display'),
    path('answerFound/<str:pid>/', views.answerFound),
    path('upvote/<str:aid>/<str:un>/', views.upvote), 
    path('downvote/<str:aid>/<str:un>/', views.downvote), 
    path('getaPost/<str:pi>/', views.getaPost, name='Get-a-Post'),
    path('gettingPost/<str:un>/', views.gettingPost, name='Get-Post'),
 
 
  ]