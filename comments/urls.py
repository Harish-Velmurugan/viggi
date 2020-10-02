from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('problemcomment/add/',
         views.addCommentToProblem, name="problemcommentadd"),
    path('problemcomment/<str:pk>/',
         views.getProblemComments, name="problemcommentget"),
    path('replycomment/add/',
         views.addReplyComment, name="replycommentadd"),
    path('replycomment/<str:pk>/',
         views.getReplyComments, name="replycommentget"),
]
