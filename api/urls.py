from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet, WalletDashboardViewSet
from . import views

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('walletdashboard', WalletDashboardViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('walletdetails/<str:un>/', views.getDetails),
    path('walletupdate/<str:un>/<str:c>/', views.updateDetails),
    path('walletwithdraw/<str:un>/<str:c>/', views.updateWithdraw),
    path('transactionDetails/<str:un>/', views.getTransactions),
    path('transactionUpdate/<str:un>/<str:orderId>/<str:time>/<str:email>/<str:amt>/', views.updateTransactions),
]
