from distutils.version import \
    StrictVersion  # pylint: disable=no-name-in-module,import-error

from django import get_version
from django.contrib.auth.decorators import login_required
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404, redirect
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from rest_framework.decorators import api_view
from django.views.generic import ListView
from notifications import settings
from notifications.settings import get_config
from notifications.utils import id2slug, slug2id
from swapper import load_model

from users.models import CustomUser

Notification = load_model('notifications', 'Notification')

if StrictVersion(get_version()) >= StrictVersion('1.7.0'):
    from django.http import JsonResponse  # noqa
else:
    # Django 1.6 doesn't have a proper JsonResponse
    import json
    from django.http import HttpResponse  # noqa

    def date_handler(obj):
        return obj.isoformat() if hasattr(obj, 'isoformat') else obj

    def JsonResponse(data):  # noqa
        return HttpResponse(
            json.dumps(data, default=date_handler),
            content_type="application/json")




def mark_all_as_read(request,uid):

    user = CustomUser.objects.get(id=uid)

    user.notifications.mark_all_as_read()

    _next = request.GET.get('next')

    if _next:
        return redirect(_next)
    return redirect('notifications:unread')

@api_view(['POST'])
def mark_as_read(request,uid,nid):
    user = CustomUser.objects.get(id=uid)

    # notification = get_object_or_404(
        # Notification, recipient=user, id=nid)
    notification=Notification.objects.get(recipient=user, id=nid)
    notification.mark_as_read()

    _next = request.GET.get('next')

    if _next:
        return redirect(_next)

    return JsonResponse({"value":"sucess"})


def mark_as_unread(request,uid,nid):
    user = CustomUser.objects.get(id=uid)

    notification = get_object_or_404(
        Notification, recipient=user, id=nid)
    notification.mark_as_unread()

    _next = request.GET.get('next')

    if _next:
        return redirect(_next)

    return redirect('notifications:unread')

@api_view(['POST'])
def delete(request, uid,nid):
    
    user = CustomUser.objects.get(id=uid)

    notification = get_object_or_404(
        Notification, recipient=user, id=nid)

    if settings.get_config()['SOFT_DELETE']:
        notification.deleted = True
        notification.save()
    else:
        notification.delete()

    _next = request.GET.get('next')

    if _next:
        return redirect(_next)

    # return redirect('notifications:all')
    return JsonResponse({"value":"deleted"})
#//kesava meeting join pantiya???hmm ok
# inu join panala
# allow panna sollu

@never_cache
def live_unread_notification_count(request,uid):

    user = CustomUser.objects.get(id=uid)

    data = {
        'unread_count': user.notifications.unread().count(),
    }
    return JsonResponse(data)


@never_cache
def live_unread_notification_list(request,uid):
    ''' Return a json with a unread notification list '''
    
    user = CustomUser.objects.get(id=uid)


    default_num_to_fetch = get_config()['NUM_TO_FETCH']
    try:
        # If they don't specify, make it 5.
        num_to_fetch = request.GET.get('max', default_num_to_fetch)
        num_to_fetch = int(num_to_fetch)
        if not (1 <= num_to_fetch <= 100):
            num_to_fetch = default_num_to_fetch
    except ValueError:  # If casting to an int fails.
        num_to_fetch = default_num_to_fetch

    unread_list = []

    for notification in user.notifications.unread()[0:num_to_fetch]:
        struct = model_to_dict(notification)
        struct['slug'] = id2slug(notification.id)
        if notification.actor:
            struct['actor'] = str(notification.actor)
        if notification.target:
            struct['target'] = str(notification.target)
        if notification.action_object:
            struct['action_object'] = str(notification.action_object)
        if notification.data:
            struct['data'] = notification.data
        unread_list.append(struct)
        if request.GET.get('mark_as_read'):
            notification.mark_as_read()
    data = {
        'unread_count': user.notifications.unread().count(),
        'unread_list': unread_list
    }
    return JsonResponse(data)


@never_cache
def live_all_notification_list(request,uid):
    ''' Return a json with a unread notification list '''

    user = CustomUser.objects.get(id=uid)

   
    default_num_to_fetch = get_config()['NUM_TO_FETCH']
    try:
        # If they don't specify, make it 5.
        num_to_fetch = request.GET.get('max', default_num_to_fetch)
        num_to_fetch = int(num_to_fetch)
        if not (1 <= num_to_fetch <= 100):
            num_to_fetch = default_num_to_fetch
    except ValueError:  # If casting to an int fails.
        num_to_fetch = default_num_to_fetch

    all_list = []

    for notification in user.notifications.all()[0:num_to_fetch]:
        struct = model_to_dict(notification)
        struct['slug'] = id2slug(notification.id)
        if notification.actor:
            struct['actor'] = str(notification.actor)
        if notification.target:
            struct['target'] = str(notification.target)
        if notification.action_object:
            struct['action_object'] = str(notification.action_object)
        if notification.data:
            struct['data'] = notification.data
        all_list.append(struct)
        if request.GET.get('mark_as_read'):
            notification.mark_as_read()
    data = {
        'all_count': user.notifications.count(),
        'all_list': all_list
    }
    return JsonResponse(data)


def live_all_notification_count(request,uid):

    user = CustomUser.objects.get(id=uid)


    data = {
        'all_count': user.notifications.count(),
    }
    return JsonResponse(data)
