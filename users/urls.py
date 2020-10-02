from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.UserListView.as_view()),
    path('profile/<str:un>/', views.userProfileView),
    path('solverDetails/<str:un>/', views.solverDetails),
    path('seekerDetails/<str:pi>/', views.seekerDetails),
    path('mode/<str:un>/', views.mode),
    path('setMode/<str:un>/', views.setMode),
]
