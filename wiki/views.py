from django.shortcuts import render
from  users.models import CustomUser
from .models import *
from rest_framework.decorators import api_view,permission_classes
from .serializers import *
from rest_framework.response import Response
from updateapi.models import User_Profile,User_Professional,User_Personal
from updateapi.serializers import user_personal_serializer,user_professional_serializer,user_profile_serializer

# Create your views here.
@api_view(['POST'])
def createWiki(request,pk):
    task1=CustomUser.objects.get(id=pk)
    task2=wiki.objects.create(username=task1)
    print(task2.id)
    return Response({'value':task2.id})

@api_view(['POST'])
def editWiki(request,wid):
    task1=wiki.objects.get(id=wid)
    task2=editwikiSerializer(task1,data=request.data)
    print(request.data)
    if task2.is_valid():
        user=CustomUser.objects.get(username=task1.username)
        task1.editHistory.append(user.id)
        task2.save()
    return Response({'value':"success"})

@api_view(['GET'])
def draft(request,pk):
    task1=wiki.objects.filter(published=False,username=pk)
    task2=wikiSerializer(task1,many=True)
    return Response(task2.data)



@api_view(['GET'])
def published(request,pk):
    task1=wiki.objects.filter(published=True,username=pk)
    task2=wikiSerializer(task1,many=True)
    return Response(task2.data)

@api_view(['GET'])
def reeditWiki(request,wid):
    task1=wiki.objects.get(id=wid)
    task2=wikiSerializer(task1)
    # print(request.data)
    # if task2.is_valid():
        # task2.save()
    return Response(task2.data)



@api_view(['POST'])
def publish(request,wid):
    task1=wiki.objects.get(id=wid)
    task2=editwikiSerializer(task1,data=request.data)
    print(request.data)
    if task2.is_valid():
        user=CustomUser.objects.get(username=task1.username)
        task1.editHistory.append(user.id)
        task2.save()
        task1.published=True
        task1.save()
    return Response({'value':"success"})

@api_view(['GET'])
def allWiki(requet):

    task1=wiki.objects.filter(published=True)
    task2=wikiSerializer(task1,many=True)
    for i in range(len(task1)):
        # print(i.editHistory[-1])
        user=User_Personal.objects.get(username=task1[i].editHistory[-1])
        task2.data[i].update({"lastEdit":user.firstname +" "+ user.lastname })


    return Response(task2.data)


@api_view(['GET'])
def viewWiki(requet,wid):
    task1=wiki.objects.get(id=wid)
    task2=wikiSerializer(task1)
    print(task2.data)
    return Response(task2.data)


@api_view(['POST'])
def like(requet,wid,uid):
    task1=wiki.objects.get(id=wid)
    if uid not in task1.likeList:
        task1.likeList.append(uid)
        task1.like+=1
        task1.save()
        if uid in task1.dislikeList:
            a=task1.dislike
            task1.dislikeList.remove(uid)
            task1.dislike-=1
            task1.save()

            if(task1.like % 100 == 0):
                task1.likeCounter+=100
                task1.save()
                user=User_Profile.objects.get(username=task1.username)
                user.rp+=50
                user.save()
            



                       
        else:
            if(task1.like / task1.likeCounter == 1):
                task1.likeCounter+=100
                task1.save()
                user=User_Profile.objects.get(username=task1.username)
                user.rp+=50
                user.save()

    else:
        print("already liked")
    # task2=wikiSerializer(task1)
    # print(task2.data)
    return Response({"value":task1.like,'value1':task1.dislike})

@api_view(['POST'])
def dislike(requet,wid,uid):
    task1=wiki.objects.get(id=wid)
    if uid not in task1.dislikeList:
        task1.dislikeList.append(uid)
        task1.dislike+=1
        task1.save()
        if uid in task1.likeList:
            a=task1.like
            task1.likeList.remove(uid)
            task1.like-=1
            task1.save()

            if(a % 100 == 0):
                task1.likeCounter-=100
                task1.save()
                user=User_Profile.objects.get(username=task1.username)
                user.rp-=50
                user.save()
            

        # else:
        #     if(task1.dislike / task1.dislikeCounter == 1):
        #         task1.dislikeCounter+=100
        #         task1.save()
        #         user=User_Profile.objects.get(username=task1.username)
        #         user.rp-=50
        #         user.save()
        
    else:
        print("already liked")
    # task2=wikiSerializer(task1)
    # print(task2.data)
    return Response({"value":task1.dislike,'value1':task1.like})


@api_view(['POST'])
def reEditPublish(request,wid,uid):
    task1=wiki.objects.get(id=wid)
    print(task1)
    task2=editwikiSerializer(task1,data=request.data)
    # task3=CustomUser.objects.get(id=uid)
    task4=User_Profile.objects.get(username=uid)
    print(request.data)
    if task2.is_valid():
        task1.editHistory.append(uid)
        task2.save()
        print("----")
        task1.save()
        task4.rp-=100
        task4.save()

        return Response({'value1':"published"})

    return Response({'value':"success"})

@api_view(['GET'])
def editCheck(request,wid,uid):
    task = User_Professional.objects.get(username = uid)
    task1=wiki.objects.get(id=wid)

    # l = task.domains
    # ls = l.split(',')
    
    p=[]
    ser=[]
    
    o= User_Professional.objects.filter(domains__icontains= task1.domain)
    serialize= user_professional_serializer(o,many=True)
    if(serialize.data != [] ):
        for j in range(len(o)):
            m = serialize.data[j]['username']
            ser.append(serialize.data[j])
            p.append(m)
    ser1 = []
    ser2=[]
    ser3=[]
    # print(p)
    for i in p:
        user = User_Profile.objects.filter(username=i)
        serialize= user_profile_serializer(user,many=True)
        ser1.append(serialize.data[0])

    ser1 = sorted(ser1, key = lambda i: i['rp'],reverse=True)
    for i in ser1:
            ser2.append(i['username'])
    if(len(ser2)<15):
        ser3=ser2
    else:
        ser3=ser2[:15]
    print(ser3) 
    if(int(uid) in ser3):
        task2=User_Profile.objects.get(username=uid)
        if(task2.rp >= 100):
            return Response({'eligible':"True"}) 
        else:
            return Response({'eligible':"False"})
    else:
        return Response({'eligible':"False"})

    return Response({'value':"success"})
