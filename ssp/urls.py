"""ssp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.authtoken.views import obtain_auth_token
from django.views.generic import TemplateView



# logger = getLogger(__name__)
# @background(schedule=60)
# def demo_task():
# #     # task = Post.objects.all()
# #     # now = datetime.now().date()
# #     #     # j=j+1
# #     # for i in task:
# #     #     if(i.deadline.date() < now and i.expired == False):
# #     #       i.expired = True
# #     #       i.save()
#     print("hey 1777")


# demo_task(repeat=10, repeat_until=None)
# i=i+1
# break


react_routes = getattr(settings, 'REACT_ROUTES', [])
# for route in react_routes:
urlpatterns = [
    path('admin/', admin.site.urls),
    path('sol/', include('solutions.urls')),
    path('users/v1/', include('users.api.urls')),
    path('accounts/', include('allauth.urls')),
    path('api/', include('updateapi.urls')),
    path('wallet/', include('api.urls')),
    path('post/', include('post.urls')),
    path('search/', include('searchapi.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('contract/', include('smartcontract.urls')),
    path('auth/', obtain_auth_token),
    path('notify/', include('notifications.urls')),
    path('note/', include('notify.urls')),
    path('lor/', include('lor.urls')),
    path('wiki/', include('wiki.urls')),
    path('comments/', include('comments.urls')),
    path('prototypetest/', include('prototypetest.urls')),
    path('monitorsolution/', include('monitorsolution.urls')),
    path('forum/', include('forum.urls')),
    path('helper/',include('helper.urls')),
    path('community/', include('communitychannel.urls')),



    # re_path('', views.index ),
    # path('', TemplateView.as_view(template_name='build/index.html')),
    # path('signin', TemplateView.as_view(template_name='build/index.html')),
    # path('', TemplateView.as_view(template_name='build/index.html')),
]

for route in react_routes:

    urlpatterns += [
        path(route, TemplateView.as_view(template_name='build/index.html')),
        # print(route+"     ")
    ]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
