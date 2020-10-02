from rest_framework import generics

from . import models
from users.api import serializers

from django.shortcuts import render
from django.http import JsonResponse as Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from post.models import Post
from solutions.models import Solution

from .models import CustomUser

from updateapi.models import User_Personal, User_Professional, User_Profile

from users.api.serializers import LoginSerializer
from updateapi.serializers import user_personal_serializer, user_professional_serializer, user_profile_serializer
from post.serializers import PostSerializer
from solutions.serializers import SolutionSerializer


class UserListView(generics.ListAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.LoginSerializer


@api_view(['GET'])  # isauthenticated needed (sends back pswd)
def userProfileView(request, un):

    # email

    em = CustomUser.objects.filter(id=un)
    m = em[0].mode
    serializer6 = LoginSerializer(em, many=True)
    content = {"email": serializer6.data[0].get('email')}

    # content1={"domains" : ['algo','crypto'],
    # "count":[1,2]}

    # problem
    pos = Post.objects.filter(username=un)
    serializer2 = PostSerializer(pos, many=True)

    # solution
    sol = Solution.objects.filter(username=un)
    serializer3 = SolutionSerializer(sol, many=True)

    # user_personal

    personal = User_Personal.objects.filter(username=un)
    serializer4 = user_personal_serializer(personal, many=True)

    # user_professional
    professional = User_Professional.objects.filter(username=un)
    serializer5 = user_professional_serializer(professional, many=True)

    profile = User_Profile.objects.filter(username=un)
    serializerprofile = user_profile_serializer(profile, many=True)

    # domain details
    dom = Solution.objects.filter(username=un)
    dom1 = Solution.objects.filter(members__icontains=un)
    doma = dom | dom1
    q = []
    coun = []
    content1 = {}

    for i in doma:
        ta = Post.objects.get(problemId=i.problemId.problemId)
        arr = ta.skill.split(',')

        for j in arr:
            if j not in q:
                q.append(j)
                coun.append(1)
            else:
                ind = q.index(j)
                coun[ind] += 1

    for k in q:
        pos = q.index(k)
        content1.update({k: coun[pos]})

    Serializer_list = [serializer2.data, serializer3.data, serializer4.data,
                       serializer5.data, content, serializerprofile.data, content1]

    # badge
    po = User_Profile.objects.get(username=un)
    ser = user_profile_serializer(po)
    val = ser.data.keys()
    vales = []
    j = 0
    for i in val:
        if j > 3 and j < 42:
            if getattr(po, i):
                vales.append(i)
        j += 1

    # domain details
    dom = Solution.objects.filter(username=un)
    dom1 = Solution.objects.filter(members__icontains=un)
    doma = dom | dom1

    for i in doma:
        ta = Post.objects.get(problemId=i.problemId.problemId)
        arr = ta.skill.split(',')
        for j in arr:
            if j not in q:
                q.append(j)
                coun.append(1)
            else:
                ind = q.index(j)
                coun[ind] += 1

    Serializer_list = [serializer2.data, serializer3.data, serializer4.data,
                       serializer5.data, content, serializerprofile.data, q, coun, vales]

    return Response(Serializer_list, safe=False)  # returns list of json


@api_view(['GET'])  # isauthenticated needed (sends back pswd)
def solverDetails(request, un):

    # user_personal
    personal = User_Personal.objects.filter(username=un)
    serializer4 = user_personal_serializer(personal, many=True)

    # user_professional
    professional = User_Professional.objects.filter(username=un)
    serializer5 = user_professional_serializer(professional, many=True)

    # email
    em = CustomUser.objects.filter(id=un)
    serializer6 = LoginSerializer(em, many=True)
    content = {"email": serializer6.data[0].get('email')}

    Serializer_list = [serializer2.data, serializer3.data,
                       serializer4.data, serializer5.data, content, serializerprofile.data]

    return Response(Serializer_list, safe=False)  # returns list of json\


@api_view(['GET'])  # isauthenticated needed (sends back pswd)
def seekerDetails(request, pi):

    pos = Post.objects.get(problemId=pi)
    un = pos.username

    # user_personal
    personal = User_Personal.objects.filter(username=un)
    serializer4 = user_personal_serializer(personal, many=True)

    # user_professional
    professional = User_Professional.objects.filter(username=un)
    serializer5 = user_professional_serializer(professional, many=True)
    # email
    em = CustomUser.objects.filter(username=un)
    serializer6 = LoginSerializer(em, many=True)
    content = {"email": serializer6.data[0].get('email')}

    Serializer_list = [serializer4.data, serializer5.data, content]

    return Response(Serializer_list, safe=False)  # returns list of json


@api_view(['GET'])
def mode(request, un):
    task = CustomUser.objects.get(id=un)
    print(task.mode)
    return Response({"value": task.mode})


@api_view(['POST'])
def setMode(request, un):
    print(request.data['mode'])
    print(un)
    task = CustomUser.objects.get(id=un)
    task.mode = request.data['mode']
    task.save()
    return Response({"value": "success"})
