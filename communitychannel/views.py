from django.http import response
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import CommunityChatSerializer, CommunityListSerializer, PostCommentSerializer, ReplyCommentSerializer

from .models import CommunityChat, CommunityList, PostComments, ReplyComments
from updateapi.models import User_Profile, User_Personal
from updateapi.serializers import user_personal_serializer


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Problem-Comment': '/problemcomment/<str:pk>/',
        'Problem-Comment-Add': '/problemcomment/add/<str:pk>/',
        'Solution-Comment': '/solutioncomment/',
        'Reply-Comment': '/replaycomment/',
    }

    return Response(api_urls)


@api_view(['POST'])
def createCommunity(request):
    serializer = CommunityListSerializer(data=request.data)
    print(serializer.initial_data)
    if serializer.is_valid():
        serializer.save()
        print('s')
    return Response({"": ""})


@api_view(['POST'])
def newCommunity(request):
    print(request.data)
    return Response(request.data)


@api_view(['GET'])
def getCommunityList(request):
    comments = CommunityList.objects.all()
    serializer = CommunityListSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addChat(request):
    serializer = CommunityChatSerializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        serializer.save()
        print('a')
    return Response(serializer.data)


@api_view(['GET'])
def getCommunityChat(request, pk):
    chats = CommunityChat.objects.filter(channelId=pk).order_by('-date')
    serializer = CommunityChatSerializer(chats, many=True)
    return Response(serializer.data[:10])


@api_view(['POST'])
def joinCommunity(request):
    inputdata = request.data
    channelId = inputdata["channelId"]
    username = inputdata["username"]

    community = CommunityList.objects.get(id=channelId)
    userCommunities = User_Profile.objects.get(username=username)

    if community.username != username:
        if username not in community.usersUnapproved:
            community.usersUnapproved.append(username)
            community.save()
    else:
        print('1already done')
        return Response({"reason": "Your Community"})

    if channelId not in userCommunities.subscribedChannels:
        userCommunities.subscribedChannels.append(channelId)
        userCommunities.save()
    else:
        print('already done')
        return Response({"reason": "Already Subscribed"})

    return Response({"": ""})


@api_view(['POST'])
def createSubscribedCommunityList(request):
    serializer = UserSubscribedChannelsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def getYourCommunity(request, pk):
    yourCommunities = CommunityList.objects.filter(username=pk)
    serializer = CommunityListSerializer(yourCommunities, many=True)
    return Response(serializer.data[:10])


@api_view(['GET'])
def getSubscribedCommunity(request, pk):
    ser1 = []
    yourCommunities = User_Profile.objects.get(username=pk)
    list1 = yourCommunities.subscribedChannels
    for i in list1:
        ser = CommunityList.objects.get(id=i)
        s = CommunityListSerializer(ser)
        ser1.append(s.data)
    print(ser1)
    return Response(ser1)


@api_view(['GET'])
def getUnApproveMembers(request, pk):
    ser1 = []
    community = CommunityList.objects.get(id=pk)
    list1 = community.usersUnapproved
    for i in list1:
        ser = User_Personal.objects.get(username=i)
        s = user_personal_serializer(ser)
        ser1.append(s.data)
    # print(ser1)
    return Response(ser1)


@api_view(['POST'])
def allowMember(request):
    username = request.data["username"]
    channelId = request.data["channelId"]

    community = CommunityList.objects.get(id=channelId)
    community.usersUnapproved.remove(username)
    community.usersApproved.append(username)
    community.save()

    return Response({"": ""})


@api_view(['POST'])
def blockMember(request):
    username = request.data["username"]
    channelId = request.data["channelId"]

    community = CommunityList.objects.get(id=channelId)
    community.usersUnapproved.remove(username)
    community.save()

    return Response({"": ""})


@api_view(['POST'])
def checkUser(request):
    username = int(request.data["username"])
    channelId = request.data["channelId"]

    community = CommunityList.objects.get(id=channelId)

    # print(type(username))
    # print(username == community.username.id)
    # print(type(community.username.id))
    response = {}
    if(username in community.usersApproved or username == community.username.id):
        response["status"] = "true"
        response["joinButton"] = "false"
    elif(username in community.usersUnapproved):
        response["status"] = "false"
        response["joinButton"] = "false"
    elif(username not in community.usersUnapproved):
        response["status"] = "false"
        response["joinButton"] = "true"

    return Response(response)


@api_view(['POST'])
def addLike(request, username, chatId):

    communityChat = CommunityChat.objects.get(id=chatId)
    if(int(username) not in communityChat.likes):
        communityChat.likes.append(int(username))
        communityChat.save()
        return Response({"status": "liked"})

    return Response({"": ""})


@api_view(['POST'])
def disLike(request, username, chatId):

    communityChat = CommunityChat.objects.get(id=chatId)
    if(int(username) in communityChat.likes):
        communityChat.likes.remove(int(username))
        communityChat.save()
        return Response({"status": "disliked"})

    return Response({"": ""})


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Problem-Comment': '/problemcomment/<str:pk>/',
        'Problem-Comment-Add': '/problemcomment/add/<str:pk>/',
        'Solution-Comment': '/solutioncomment/',
        'Reply-Comment': '/replaycomment/',
    }

    return Response(api_urls)


@api_view(['POST'])
def addCommentToProblem(request):
    serializer = PostCommentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['GET'])
def getProblemComments(request, pk):
    comments = PostComments.objects.filter(problemId=pk)
    serializer = PostCommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addReplyComment(request):
    serializer = ReplyCommentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['GET'])
def getReplyComments(request, pk):
    comments = ReplyComments.objects.filter(commentId=pk)
    serializer = ReplyCommentSerializer(comments, many=True)
    print(serializer.data)
    return Response(serializer.data)


@api_view(['POST'])
def test(request):
    print(request.data)
    return Response(request.data)
