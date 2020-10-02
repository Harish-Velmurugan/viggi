from django.urls import path,include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('',views.PostView)
urlpatterns = [
    path('',include(router.urls)),
    path('bookmarks/<str:un>/<str:pid>/',views.bookmarks),
    path('solver_expired/<str:un>/', views.solverExpired),
    path('seeker_expired/<str:un>/', views.seekerExpired),
    path('trendings/<str:un>/', views.trendingProblem),
    path('viewProblem/<str:un>/<str:pid>/',views.viewProblem),
    path('bookmarkCheck/<str:un>/<str:pid>/',views.bookmarkCheck),
    path('checkPaid/<str:pid>/',views.checkPaid),

    
    
    
]