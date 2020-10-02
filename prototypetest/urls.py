from django.urls import path
from . import views

urlpatterns=[

    path('solverName/<str:sid>/',views.solverName),
    path('createPrototype/',views.createPrototype),
    path('startProcess/<str:sid>/',views.startProcess),  
    path('prototypetestBuilder/<str:un>/',views.prototypetestBuilder),
    path('prototypetestImplementer/<str:un>/',views.prototypetestImplementer),
    path('Stage/<str:pid>/',views.Stage),
    path('planningPhase/',views.planningPhase),
    path('prototypeSubmission/',views.prototypeSubmissionFn),
    path('implementSteps/<str:pid>/',views.implementSteps),
    
    path('implementBuilderAgree/<str:pid>/',views.implementBuilderAgree),
    path('implementBuilderAgree1/<str:pid>/',views.implementBuilderAgree1),
    path('implementImplementerAgree/<str:pid>/',views.implementImplementerAgree),
    path('implementImplementerAgree1/<str:pid>/',views.implementImplementerAgree1),



     path('viewPlanning/<str:pid>/',views.viewPlanning),   
     path('planningAccept/<str:pid>/',views.planningAccept),
     path('planningReject/<str:pid>/',views.planningReject),
     path('viewPrototype/<str:pid>/',views.viewPrototype),

     path('prototypeAccept/<str:pid>/',views.prototypeAccept),

     path('chat/<str:uid>/',views.chat),
     

 
]
