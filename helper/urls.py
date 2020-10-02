from django.urls import path
from helper import views

urlpatterns = [
    path ('dataReq/',views.ReqView,name="ReqView"),
    path('dpFeed/<str:dm>/',views.DPFeed,name="DPFeed"),
    path('dpagreed/<str:rid>/',views.DPagreed,name="DPagreed"),
    path('pblmInv/<str:uid>/',views.getPI,name="getPI"),
    path("DPAttach/<str:rid>/",views.DPAttach),
    path("DPPaid/<str:nid>/<str:ven>/",views.DPPaid),
    path("getFromVendor/<str:uid>/",views.getFromVendor),
    path("helperPayment/<str:rid>/", views.helperPayment),
    path("quoteBudget/<str:rid>/",views.quoteBudget,name="quoteBudget"),
    path("singleaccept/<str:rid>/",views.singleAccept),
    path("quoteView/<str:uid>/",views.QuoteView),
    path("quoteView2/<str:rid>/",views.QuoteView2),
]
