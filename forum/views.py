from django.shortcuts import render

from django.http import JsonResponse as Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
from .models import ForumPost, ForumAnswer
from .serializers import ForumPostSerializer,ForumAnswerSerializer

from updateapi.serializers import user_personal_serializer,user_professional_serializer,bids_serializer, user_profile_serializer

from updateapi.models import User_Personal,User_Professional,bids,User_Profile,ExpertHelp
from notifications.signals import notify



@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def postSubmission(request):
    print("am in")
    serializer = ForumPostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        print("am out")
    return Response({"value": "success"})


@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def answerSubmission(request):
    print(request.data)
    pid = request.POST.get("postId")
    serializer = ForumAnswerSerializer(data=request.data)
    print(serializer.initial_data)
    if serializer.is_valid():
        serializer.save()
        c = (serializer.data["postId"])
        d = ForumPost.objects.get(postId=c)
        d.ans_count += 1
        d.save()
        return Response({"value": "not success"})
    return Response({"value": "success"})    

@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def getPost(request):
    task = ForumPost.objects.all()
    serializer = ForumPostSerializer(task,many = True)
    return Response(serializer.data,safe = False)


@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def getAnswer(request,pid):
    pof=[]
    task = ForumAnswer.objects.filter(postId = pid)
    for i in task:
        p = i.username
        ta = User_Personal.objects.get(username = p)
        ser = user_personal_serializer(ta)
        pof.append(ser.data)
    serializer = ForumAnswerSerializer(task,many = True)
    return Response([serializer.data,pof],safe= False)


@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def postRefining(request,un):
    task = ForumPost.objects.filter(username = un)
    serializer = ForumPostSerializer(task,many = True)
    return Response(serializer.data,safe=False)

@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def upvote(request,aid,un):
    
    task = ForumAnswer.objects.get(id= aid)
    a=task.upvoters
    d = task.downvoters
    if int(un) not in a:
        if int(un) not in d:
            task.upvoters.append(int(un))
            task.upvotes += 1
            task.save()
            return Response({"value": "success"})
        else:
            task.downvoters.remove(int(un)) 
            task.downvotes -=1
            task.upvoters.append(int(un))
            task.upvotes += 1  
            task.save()
            return Response({"value": "success"})
    return Response({"value":"already upvoted"})


@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def downvote(request,aid,un):
    task = ForumAnswer.objects.get(id= aid)
    a = task.upvoters
    d = task.downvoters
    
    if int(un) not in d:
        
        if int(un) not in a:
            
            task.downvoters.append(int(un))
            task.downvotes +=1
            task.save()
            return Response({"value": "success"})
        else:
            print("else")
            task.upvoters.remove(int(un)) 
            task.upvotes -=1
            task.downvoters.append(int(un))
            task.downvotes += 1  
            task.save()
            return Response({"value": "success"})
    return Response({"value":"already downvoted"})
    
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def answerFound(request,pid):
    task = ForumPost.objects.get(postId = pid)
    task.refined = True
    task.save()
    return Response({"value": "success"})


@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def getaPost(request,pi):
    expert = ExpertHelp.objects.filter(problem=pi)
    serializer={}
    if len(expert) > 0:
        serializer.update({'panel':True})
        serializer.update({'panelId':expert[0].id})
        serializer.update({'panelBucket':expert[0].bucket})
    else:
        serializer.update({'panel':False})
    task = ForumPost.objects.get(postId = pi)
    serializer.update(ForumPostSerializer(task).data)
    
    return Response(serializer,safe = False)    



@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def gettingPost(request,un):
    task = ForumPost.objects.filter(username = un)
    serializer = ForumPostSerializer(task,many = True)
    return Response(serializer.data,safe = False) 