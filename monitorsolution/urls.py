from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('addmetrics/',
         views.createSolutionMonitorApi, name="addmetrics"),
    path('getstatics/<str:pk>/', views.monitorApiGet, name="getStatics"),
    path('addLog/', views.monitorApiAdd, name="addLog"),
    path('del/', views.dele),
    path('monitorapiget/', views.monitorApiGet, name="monitorApiGet"),
    path('getparameterlog/<str:parameter>/',
         views.getParameterLog, name="getParameterLog")
]
