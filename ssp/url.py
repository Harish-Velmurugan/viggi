
from django.contrib import admin
from django.urls import path, include,re_path
from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.authtoken.views import obtain_auth_token
from django.views.generic import TemplateView
urlpatterns=[]
react_routes = getattr(settings, 'REACT_ROUTES', [])    
for route in react_routes:
    urlpatterns += [   
        path(route, TemplateView.as_view(template_name='build/index.html')),
    ] 