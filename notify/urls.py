from django.urls import path
from notify import view

urlpatterns = [
    path('all_list/<str:uid>/', view.live_all_notification_list),
    path('all_count/<str:uid>/', view.live_all_notification_count),
    path('unread_list/<str:uid>/', view.live_unread_notification_list),
    path('unread_count/<str:uid>/', view.live_unread_notification_count),
    path('delete/<str:uid>/<str:nid>/', view.delete),
    path('mark_as_unread/<str:uid>/<str:nid>/', view.mark_as_unread),
    path('mark_as_read/<str:uid>/<str:nid>/', view.mark_as_read),
    path('mark_all_as_read/<str:uid>/', view.mark_all_as_read),
]
# oru 5 min...