from django.urls import path
from dashboard import views

urlpatterns = [
    path('dashboard-piv-view/<str:un>/',
         views.dashboardPIView, name="dashboard-piv-view"),
    path('dashboard-ppp-view/<str:pk>/',
         views.dashboardPPView, name="dashboard-ppp-view"),
    path('ppo-view/<str:pk>/<str:un>/',
         views.postedProblemView, name="dashboard-ppo-view"),
    # path('feed/<str:un>/',views.feedview,name="feedview"),
    path('feed/<str:un>/<str:st>/', views.feedview, name="feedview"),
    path('expired/<str:pk>/', views.dashboardExpired, name="expired"),
    path('topsolver/<str:pk>/', views.topSolverExpired, name="topsolver"),
    path('topSolvercheck/<str:pk>/', views.topSolvercheck, name="topSolvercheck"),
    path('deadlineExtension/<str:pk>/<str:date>/', views.deadlineExtension),


    path('toprankerNav/<str:un>/', views.topRankerNavBar, name="topsolver"),
    path('toprankerHomepage/', views.topRankerHomepage, name="topsolver"),
    path('problemDescription/<str:pk>/',
         views.problemDescription, name="problemDescription"),
    path('problemDeadline/<str:pk>/',
         views.problemDeadline, name="problemDeadline"),
    path('topChallangesHomePage/',
         views.topChallangesHomePage, name="topchallanges"),
    path('domainSearch/<str:domain>/<str:nation>/', views.domainSearch),
    path('topsolverRequest/<str:pi>/<str:re>/', views.topSolverRequest),
    path('sol/<str:pid>/<str:un>/', views.sol),
    path('solUpdate/<str:sid>/', views.solUpdate),
    path('mySolutionEdit/<str:un>/<str:pid>/', views.mySolutionEdit),
    path('extendDaysView/', views.extendDaysView),
    path('extendTimeAccepted/<str:pid>/<str:days>/<str:nid>/',
         views.extendTimeAccepted),
    path('extendTimeRejected/<str:pid>/<str:uid>/<str:nid>/',
         views.extendTimeRejected),
    path('requestCollabView/<str:ms>/<str:s>/', views.requestCollabView),
    path('removeRequested/<str:pi>/<str:re>/', views.removeRequested),

    path('usersList/', views.usersList),
]
