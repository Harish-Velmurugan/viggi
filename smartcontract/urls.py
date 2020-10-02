from django.urls import path
from . import views

urlpatterns = [
    path('create-contract/<str:pk>/', views.CreateContract, name="create-contract"),
    path('get-contracts/', views.ContractView, name="get-contracts"),
    path('create-description/', views.CreateDescription, name="create-description"),
    path('view-description/<str:pk>/', views.DescriptionView, name="view-description"),
    path('agree/<str:pk>/<str:sk>/', views.agree, name="agree"),
    path('seekerCollaboration/<str:ci>/<str:re>/', views.seekerCollaboration, name="seekerCollaboration"),
    path('seekerAgree/<str:sk>/', views.seekerAgree, name="seekerAgree"),

    path('CreateSolverContract/<str:pk>/<str:sk>/', views.CreateSolverContract),
    path('CreateSolverDescription/', views.CreateSolverDescription),
    path('solverCollaboration/<str:ci>/<str:re>/', views.solverCollaboration, name="seekerCollaboration"),
    path('SolverDescriptionView/<str:pk>/', views.SolverDescriptionView, name="view-description"),
    path('solveragree/<str:pk>/<str:sk>/', views.solveragree, name="solveragree"),

    path('share/<str:pk>/', views.share, name="share"),
]