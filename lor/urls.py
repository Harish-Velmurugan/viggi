from django.urls import path
from . import views
urlpatterns=[
    path("lorRequest/<str:pid>/<str:uid>/",views.lorRequest),
    path("lorAccept/<str:nid>/<str:rid>/<str:send>/<str:rec>/",views.lorAccept),
    path("lorReject/<str:nid>/<str:rid>/<str:send>/<str:rec>/",views.lorReject),
]
