from django.urls import path
from . import views

urlpatterns = [
    path('user-personal-view/', views.userPersonalView, name="user-personal-get-view"),
    path('user-personal-get-view/<str:pk>/', views.userPersonalGetView, name="user-personal-get-view"),
    path('user-professional-view/', views.userProfessionalView, name="user-professional-view"),
    path('user-professional-get-view/<str:pk>/', views.userProfessionalGetView, name="user-professional-get-view"),
	path('user-personal-create/', views.userPersonalCreateView, name="user-personal-create"),
    path('user-professional-create/', views.userProfessionalCreateView, name="user-professional-create"),
	path('user-personal-update/<str:pk>/', views.userPersonalUpdateView, name="user-personal-update"),
	path('user-professional-update/<str:pk>/', views.userProfessionalUpdateView, name="user-professional-update"),

    path('company-apply/', views.companyApplyView, name="companyapplied"),
    path('companyrequest/<str:un>/<str:code>/', views.companyRequest, name="companyapplied"),
    path('companyAccepted/<str:un>/<str:code>/', views.companyAccepted, name="companyaccepted"),
    path('companyDeclined/<str:un>/<str:code>/', views.companyDeclined, name="companydeclined"),


    path('user-profile-view/', views.userProfileCreateView, name='user-profile-create'),
    path('notifyCount/<str:pk>/<str:c>/', views.notifyCount, name='notifyCount'),
    path('notifyCountGet/<str:pk>/', views.notifyCountGet, name='notifyCountGet'),

    path('expertApply/', views.expertApply, name='expertApply'),
    path('expertCheck/<str:un>/', views.expertCheck, name='expertCheck'),
    path('expertList/<str:buc>/<str:choice>/', views.expertList, name='expertList'),
    path('expertRequest/', views.expertRequest, name='expertRequest'),
    path('expertAccept/<str:nid>/', views.expertAccept, name='expertAccept'),
    path('expertPayProblem/<str:nid>/', views.expertPayProblem, name='expertPayProblem'),
    path('expertChat/<str:uid>/', views.expertChat, name='expertChat'),
    path('expertDash/<str:uid>/', views.expertDash, name='expertDash'),

    path('getmode/<str:uid>/',views.getMode)
]