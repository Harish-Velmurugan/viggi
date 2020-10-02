from django.shortcuts import render
from rest_framework import viewsets 
from .models import Post,PostExpert
from .serializers import PostSerializer,PostSerializer2,PostExpertSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
from django.http import JsonResponse as Response

from solutions.models import Solution
from notifications.signals import notify
from users.models import CustomUser
import django.utils.timezone
from solutions.serializers import SolutionSerializer2

from updateapi.models import User_Profile,User_Professional,User_Personal
from datetime import datetime, timedelta
# from .tasks import demo_task

# @permission_classes([IsAuthenticated])
class PostView(viewsets.ModelViewSet):
    queryset=Post.objects.all()
    serializer_class=PostSerializer
    

@api_view(['POST'])
def bookmarks (request, un, pid):
    task = User_Profile.objects.get(username = un)
    s = task.username
    obj = Post.objects.get(problemId = pid)
    ser = PostSerializer2(obj)
    p = obj.username
    l = task.problems_interested
    u = obj.viewers
    if s == p:
        return Response({"values":"Your own problem can't be bookmarked"})
    
    if int(pid) not in l:
        obj.popularity +=99
        task.problems_interested.append(pid)
        interest = obj.interested

        print(obj.topsolver)
        if obj.topsolver:
                 print('in')
                 task1 = User_Personal.objects.get(username=un)
                 sender = CustomUser.objects.get(id=un)
                 rec =  CustomUser.objects.get(id=obj.username.id)
                 notify.send(sender, recipient=rec, verb='Top Solver Accepted', timestamp=django.utils.timezone.now(), data = ser.data ,name={'name':task1.firstname +" "+task1.lastname})
  

        
        if( int(un) not in interest):
            obj.interested.append(int(un))
        print('--')

        obj.save()
        task.save()
        return Response({"values":"Already viewed and Bookmarked now"})
    else: 
        return Response({"values":"Already viewed and Bookmarked"})

@api_view(['POST'])
def viewProblem(request,un,pid): 
    task = User_Profile.objects.get(username = un)
    s = task.username
    obj = Post.objects.get(problemId = pid)
    p = obj.username 
    u = obj.viewers

    if s == p:
        return Response({"values":"Your own problem"})

    if int(un) in u:
        return Response({"values":"Already viewed"})

    obj.viewers.append(un)
    obj.popularity +=1
    obj.save()
    return Response({"values":"success"})

@api_view(['GET'])
def bookmarkCheck(request,un,pid):
    task = User_Profile.objects.get(username = un)
    s=task.problems_interested
    if int(pid) in s:
        return Response({"values":"True"})
    else:
        return Response({"values":"False"})

         


'''
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def voteView(request,pk):
      task = Solution.objects.get(solutionId=pk)
      task.votes+=1
      task.save()
      return Response({"values":"success"})

'''


@api_view(['GET'])
def solverExpired(request,un):    #front end processing needed!!!
    ser=[]
    tasks = User_Profile.objects.get(username=un)
    l=tasks.problems_interested           
    for i in l:
        task = Post.objects.filter(problemId=i)
        serializer = PostSerializer2(task, many = True)
        if serializer.data[0].get('expired') == True:
                ser.append(serializer.data[0])
    return Response(ser,safe=False)


@api_view(['GET'])
def seekerExpired(request,un):    #front end processing needed!!!
    ser=[]
    tasks = Post.objects.filter(username=un)
    serializer = PostSerializer2(tasks,many=True) 
    loop = serializer.data 
    for i in loop:
        if i.get('expired') == True:
                ser.append(i)
    return Response(ser,safe=False) 



@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def trendingProblem(request,un):  
    task= User_Professional.objects.get(username=un)
    l = task.domains
    ls = l.split(',')
    o=[]    
    ser=[]
    p = []
    for i in range(len(ls)):
        o.append(Post.objects.filter(skill__icontains= ls[i]))
        serialize= PostSerializer2(o[i],many=True)
        if(serialize.data != [] ):
            for j in range(len(o[i])):
                m = serialize.data[j]['problemId']
                if m not in p:
                    ser.append(serialize.data[j])
                    p.append(m)


    ser = sorted(ser, key = lambda i: i['popularity'],reverse=True) 
   
    # ser2=[]
    # for i in ser:
    #     g = i['problemId']
    #     user = Post.objects.filter(problemId=g)
    #     serialize=PostSerializer2(user,many=True)
    #     ser2.append(serialize.data[0])
      

    length = len(ser)

    if (length > 10):
       ser = ser[:length]

    return Response(ser,safe=False)

@api_view(['POST'])
def checkPaid (request, pid):
    task = Post.objects.get(problemId = pid)
    task.paid = True
    task.save()
    return Response({"values": "success"})

# @api_view(['GET']) 
# def time(request): 
#     demo_task(repeat=4, repeat_until= None)
#     return Response({"values": "success"})



@api_view(['POST'])
def expertPost(request):
    serializer = PostExpertSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
