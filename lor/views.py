from django.shortcuts import render
from users.models import CustomUser
from post.models import Post
from solutions.models import Solution
from updateapi.models import User_Personal
from rest_framework.decorators import api_view,permission_classes
from django.http import JsonResponse as Response
from notifications.signals import notify
from post.serializers import PostSerializer
from .serializers import LORRequestSerializer,generateLorAcceptSerializer,generateLorRejectSerializer
from solutions.serializers import SolutionSerializer2
from updateapi.models import User_Personal
from updateapi.serializers import user_personal_serializer 
from .models import LORRequest
# from datetime import datetime, timedelta
import django.utils.timezone
from swapper import load_model
# Create your views here.

Notification = load_model('notifications', 'Notification')

@api_view(['POST'])
def lorRequest(request,pid,uid):
    serializer=LORRequestSerializer(data=request.data)
    print(serializer.is_valid(),"88888888888888888888888888")
    if serializer.is_valid():
        serializer.save()
        task=Solution.objects.filter(username=uid,problemId=pid)
        ser0=SolutionSerializer2(task,many=True)
        task1=Post.objects.get(problemId=pid)
        sen = CustomUser.objects.get(id=uid)
        task4=CustomUser.objects.get(username=task1.username)
        task5=User_Personal.objects.get(username=task4)
        ser=user_personal_serializer(task5)
        # phone=task5.phone
        print(task5.firstname)
        print(task5.phone)
        task1.lor.append(uid)
        task1.save()
        task2= User_Personal.objects.get(username=uid)
        print(task2.firstname,task2.lastname)
        ser=PostSerializer(task1)
        seeker={"name":task5.firstname +" "+task5.lastname,"email":task4.email,"mobile":str(task5.phone)}
        detail={"name":task2.firstname +" "+task2.lastname,"title":task1.title,"gender":task2.gender}
        notify.send(sen, recipient=task1.username, verb='request for lor', timestamp=django.utils.timezone.now(),obj=detail,problem=ser.data,sol=ser0.data,reason=serializer.data,seeker=seeker)#obj=ser.data,exreq = serializer.data,
    return Response({"":""}) 

@api_view(['POST'])
def lorAccept(request,nid,rid,send,rec):
      serializer=generateLorAcceptSerializer(data=request.data)
      print(serializer.initial_data)
      if serializer.is_valid():
            serializer.save()
            sen = CustomUser.objects.get(id=send)
            reci=CustomUser.objects.get(id=rec)
            task=LORRequest.objects.get(id=rid)
            task.status="accepted"
            task.save()
            noti = Notification.objects.get(id=nid)
            # a=noti.data
            noti.data['reason']['status']='accepted'
            noti.save()
            # noti.save()
            # print("gre")

            notify.send(sen, recipient=reci, verb='lor Accepted', timestamp=django.utils.timezone.now(),obj=serializer.data)#obj=ser.data,exreq = serializer.data,
            print("gre")
            return Response({"state":"success"}) 
      print("aa")
      return Response({"":""}) 
    

@api_view(['POST'])
def lorReject(request,nid,rid,send,rec):
      serializer=generateLorRejectSerializer(data=request.data)
      print(serializer.initial_data)
      if serializer.is_valid():
            serializer.save()
            sen = CustomUser.objects.get(id=send)
            task=LORRequest.objects.get(id=rid)
            task.status="rejected"
            task.save()
            noti = Notification.objects.get(id=nid)
            a=noti.data
            noti.data['reason']['status']='rejected'
            noti.save()
            noti.save()
            print("gre")
            print(serializer.data)
            notify.send(sen, recipient= CustomUser.objects.get(id=rec), verb='lor Rejected', timestamp=django.utils.timezone.now(),obj=serializer.data)#obj=ser.data,exreq = serializer.data,
  
            return Response({"state":"success"}) 

      return Response({"":""}) 
    