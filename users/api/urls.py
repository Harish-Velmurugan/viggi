from django.urls import include, path
#from rest_auth.views import PasswordResetConfirmView
from users import views

urlpatterns = [
    path('users/', include('users.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api-auth/', include('rest_framework.urls')),
    #path('rest-auth/password_reset/', include('django_rest_passwordreset.urls')),
    #path('/rest-auth/password_reset/confirm/', PasswordResetConfirmView.as_view()),

]
