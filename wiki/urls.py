from django.urls import path
from . import views

urlpatterns = [
    path('createWiki/<str:pk>/',views.createWiki),
    path('editWiki/<str:wid>/',views.editWiki),
    path('draft/<str:pk>/',views.draft),
    path('published/<str:pk>/',views.published),
    path('publish/<str:wid>/',views.publish),
    path('reeditWiki/<str:wid>/',views.reeditWiki),
    path('allWiki/',views.allWiki),
    path('viewWiki/<str:wid>/',views.viewWiki),

    path('like/<str:wid>/<str:uid>/',views.like),
    path('dislike/<str:wid>/<str:uid>/',views.dislike),

    path('reEditPublish/<str:wid>/<str:uid>/',views.reEditPublish),

    path('editCheck/<str:wid>/<str:uid>/',views.editCheck),


    #  path('view/',views.view),

]