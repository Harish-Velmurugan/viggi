'''from rest_framework import routers
from .api import SolutionViewSet

router = routers.DefaultRouter()

router.register('api/solutions', SolutionViewSet, 'solutions')

urlpatterns = router.urls

'''

from django.urls import path
from solutions import views

urlpatterns = [
    path('solution/', views.solutionSubmissionView, name="solution-Submission-View"),
    path('vote/<str:si>/<str:un>/<str:bid>/', views.voteView, name='voting'),
    path('solverParticipationRp/<str:ci>/<str:solis>/', views.solverParticipationRp, name='voting'),
    path('addMembers/<str:sk>/<str:uid>/<str:nid>/', views.addMembers, name='voting'),
    path('discussionList/<str:uid>/', views.discussionList),
    path('rejectMembers/<str:sk>/<str:uid>/<str:nid>/', views.rejectMembers, name='voting'),

    path('CreateSurvey/<str:pk>/<str:uid>/<str:dl>/',views.createS, name='createS'),
    
    
    path('expertPost/',views.expertPost),
    path('lorBadge/<str:id>/', views.lorBadge),
    path('postProblemSeeker/<str:uid>/', views.postProblemSeeker),
    path('templateReject/<str:nid>/', views.templateReject),
    path('templateAccept/<str:nid>/', views.templateAccept),
    path('submitReview/<str:sid>/<str:uid>/<str:rat>/<str:com>/', views.submitReview),

    path('CreateSurvey/<str:pk>/<str:uid>/',views.createS, name='createS'),
    path('SurveyQues/',views.surveyQues,name="sureveyQues"),
    path('TakeSurvey/<str:sid>/',views.getSurveyQues,name="getSurveyQues"),
    path('Choice/',views.attendChoice,name='attendChoice'),
    path('count/<str:sid>/<str:qno>/<str:ch>/',views.count,name='count'),
    path('getChoice/<str:sid>/<str:qno>/',views.getChoice,name="getChoice"),
    path('SurveyAns/',views.SurveyAns,name="SurveyAns"),
    path('FetchSurveyAns/<str:sid>/',views.fetchAns, name="fetchAns"),
    path('getActiveSurvey/',views.getSurvey,name="getSurvey"),
    path('getTree/<str:tid>/',views.getTree,name="getTree"),
    path('setTree/',views.setTree,name="setTree"),
    path('setTreeCommon/',views.setTreeCommon,name="setTreeCommon"),
    
    path('createTree/<str:ids>/',views.createTree,name="createTree"),
]

