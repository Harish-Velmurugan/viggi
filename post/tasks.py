from decouple import config
from background_task import background
from logging import getLogger

from post.models import Post
from post.serializers import PostSerializer2



from users.models import CustomUser
from solutions.models import CreateSurvey
from solutions.serializers import CreateSurveySerializer

from datetime import datetime
import time

from swapper import load_model
from notifications.signals import notify
import django.utils.timezone

Notification = load_model('notifications', 'Notification')
# import threading
logger = getLogger(__name__)
@background(schedule=60)
def demo_task():
    task = Post.objects.filter(solved=False)   
    now = datetime.now().date()
        # j=j+1   
    for i in task:
        # if(i.deadline.date() < now and i.expired == False):
          a= i.deadline.date() - now 
          print('-')
          print(a.days)
          # print((int(config('warning-choose-winner-days'))))
          if(int(config('deadline-expired-days')) > a.days and i.expired == False): 
            i.expired = True
            i.save()
            print('1')
          if(a.days == int(config('warning-choose-winner-days')) and i.expired == False and i.chooseWinner == False): 
            sen = CustomUser.objects.get(username=i.username)  
            ser=PostSerializer2(i)
            print('2')
            notify.send( sen, recipient=sen, verb='one day more-choose winner', timestamp=django.utils.timezone.now(),data=ser.data) 
            
          if(i.deadline.date() < now and i.expired == False and i.notified==False):  
            notified=True
            sen = CustomUser.objects.get(username=i.username)  
            ser=PostSerializer2(i)
            print('3')
            notify.send( sen, recipient=sen, verb='problem deadline crossed-choose winner', timestamp=django.utils.timezone.now(),data=ser.data)  

          if(a.days ==  int(config('warning-choose-winner-days'))  and i.expired == True and i.chooseWinner == False):
            sen = CustomUser.objects.get(username=i.username)  
            ser=PostSerializer2(i)
            print('4')
            notify.send( sen, recipient=sen, verb='topsolverone day more-choose winner', timestamp=django.utils.timezone.now(),data=ser.data) 
            
          if(i.deadline.date() < now and i.expired == True and i.topsolver==True and i.topsolvernotified==False):  
            i.topsolvernotified=True
            sen = CustomUser.objects.get(username=i.username)  
            ser=PostSerializer2(i)
            print('5')
            notify.send( sen, recipient=sen, verb='topsolver problem deadline crossed-choose winner', timestamp=django.utils.timezone.now(),data=ser.data)  

          if(int(config('deadline-expired-days')) > a.days and i.expired == True):
            i.topsolverexpired = True 
            i.save()
            print('6')


    task1 = CreateSurvey.objects.all()   
    
          # j=j+1   
    for i in task1:
        if(i.deadline.date() < now and i.alive == False):
          i.alive = True
          i.save()
          sen = CustomUser.objects.get(username=i.creator)  
          ser = CreateSurveySerializer(i)
          notify.send( sen, recipient=sen, verb='survey complete', timestamp=django.utils.timezone.now(),survey=ser.data)
    
    

demo_task(repeat=86400, repeat_until=None)
