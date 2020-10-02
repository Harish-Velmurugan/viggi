from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import PostCommentSerializer, ReplyCommentSerializer

from .models import PostComments, ReplyComments


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
