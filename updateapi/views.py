from django.views.decorators.csrf import csrf_protect
from django.core.mail import send_mail
from django.shortcuts import render
from django.http import JsonResponse
#from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import user_personal_serializer, user_professional_serializer, bids_serializer, user_profile_serializer, ExpertHelpSerializer, ExpertPanelSerializer, companyapl_serializer
# Create your views here.
from .models import User_Personal, User_Professional, bids, User_Profile, ExpertHelp, ExpertPanel, CompanyApl

from users.models import CustomUser
from users.api.serializers import LoginSerializer
from api.models import WalletDashboard
from chat.models import ChatRoom
from solutions.models import Solution, ExpertReview
import django.utils.timezone

from post.models import Post
from post.serializers import PostSerializer2

from forum.models import ForumPost, ForumAnswer
from forum.serializers import ForumPostSerializer, ForumAnswerSerializer

from decouple import config

from notifications.signals import notify
from swapper import load_model
Notification = load_model('notifications', 'Notification')


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def userProfessionalGetView(request, pk):
    user = User_Professional.objects.get(username=pk)
    serializer = user_professional_serializer(instance=user)
    return Response(serializer.data)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def userPersonalGetView(request, pk):
    user = User_Personal.objects.get(username=pk)
    serializer = user_personal_serializer(instance=user)
    return Response(serializer.data)


@api_view(['GET'])
def userPersonalView(request):
    tasks = User_Personal.objects.all().order_by('-id')
    serializer = user_personal_serializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def userProfessionalView(request):
    tasks = User_Professional.objects.all()
    serializer = user_professional_serializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def userPersonalCreateView(request):

    serializer = user_personal_serializer(data=request.data)
    print(request.data)
    print("-")
    print(serializer.is_valid())
    if serializer.is_valid():

        print("heck")
        serializer.save()
        user = CustomUser.objects.get(id=serializer.data['username'])
        ser = LoginSerializer(user)
        email = ser.data['email']
        WalletDashboard.objects.create(username=user, email=email)

    return Response(serializer.data)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def userProfessionalCreateView(request):
    serializer = user_professional_serializer(data=request.data)
    print("lil yes")
    if serializer.is_valid():
        serializer.save()
        print("yes")
    return Response(serializer.data)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def userPersonalUpdateView(request, pk):
    user = User_Personal.objects.get(username=pk)
    user.firstname = request.POST.get('firstname')
    user.lastname = request.POST.get('lastname')
    user.gender = request.POST.get('gender')
    user.dob = request.POST.get('dob')
    user.nationality = request.POST.get('nationality')
    user.phone = request.POST.get('phone')
    user.pin = request.POST.get('pin')
    user.img = request.data['img']
    user.save()
    # serializer = user_personal_serializer(instance=user,data=request.data)
    # if serializer.is_valid():
    # serializer.save()
    return Response({"value": "success"})


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def userProfessionalUpdateView(request, pk):
    user = User_Professional.objects.get(username=pk)
    serializer = user_professional_serializer(instance=user, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def getMode(request, uid):
    print(uid)
    user = User_Profile.objects.get(username=uid)
    serializer = user_profile_serializer(user)
    return Response(serializer.data)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def userProfileCreateView(request):
    serializer = user_profile_serializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def notifyCount(request, pk, c):
    count = User_Profile.objects.get(username=pk)
    count.notifyCount = c
    count.save()
    return Response(None)


@api_view(['GET'])
def notifyCountGet(request, pk):
    count = User_Profile.objects.get(username=pk)
    serialize = user_profile_serializer(count)
    return Response(serialize.data)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def companyRequest(request, un, code):
    if CompanyApl.objects.filter(username=un, code=code).exists():
        CompanyApl.objects.filter(username=un, code=code).delete()
        return Response({"value": "success"})
    else:
        return Response({"value": "Ivalid code or Username"})


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def companyApplyView(request):
    u = request.data['username']
    c = str(request.data['code'])
    serializer = companyapl_serializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        print(u, c)

        msg = 'to accept click here http://vignatree.herokuapp.com/companyAuth/' + u + '/' + c

        send_mail('Request from company', msg,
                  # admin mail id
                  config('admin_mailId'), [config('admin_mailId')],
                  fail_silently=False)

        return Response({"value": "success"})


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def companyAccepted(request, un, code):
    task = CompanyApl.objects.get(username=un, code=code)
    t = task.email

    msg = 'You are now a part of Vignatree!! Click here http://vignatree.herokuapp.com/# and sign up with code:' + \
        str(code)
    send_mail('Acceptance from Vignatree', msg,
              config('admin_mailId'), [t],  # admin mail id
              fail_silently=False)

    return Response({"value": "success"})


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def companyDeclined(request, un, code):
    task = CompanyApl.objects.get(username=un, code=code)
    t = task.email
    task.delete()
    msg = 'Sorry. Your request to join Vignatree is declined'
    send_mail('Apologies from Vignatree', msg,
              config('admin_mailId'), [t],  # admin mail id
              fail_silently=False)
    return Response({"value": "success"})


# @api_view(['POST'])
# #@permission_classes([IsAuthenticated])
# def companyProfileCreate(request):
#     serializer = companyprofile_serializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"value":"success"})


# expert

@api_view(['POST'])
def expertApply(request):
    aid = request.POST.get("username")
    buc = request.POST.get("bucket")
    ser = ExpertPanelSerializer(data=request.data)
    panel = ExpertPanel.objects.filter(username=aid, bucket=buc)

    if(len(panel) > 0):
        panel[0].domains = request.POST.get('domains')
        if request.POST.get('problem') == 'true':
            panel[0].problem = True
        else:
            panel[0].problem = False
        if request.POST.get('solution') == 'true':
            panel[0].solution = True
        else:
            panel[0].solution = False
        panel[0].save()
    else:
        if ser.is_valid():
            ser.save()
    return Response({})


@api_view(['GET'])
def expertCheck(request, un):
    user = User_Profile.objects.get(username=un)
    ser = user_profile_serializer(user)
    val = ser.data.keys()
    values = []
    j = 0
    for i in val:
        if j > 3 and j < 42:
            if getattr(user, i):
                values.append(i)
        j += 1

    content = {'values': values, 'count': len(values)}
    return Response(content)


@api_view(['GET'])
def expertList(request, buc, choice):
    if choice == 'solution':
        panel = ExpertPanel.objects.filter(
            bucket=buc, solution=True, remarks__gt=0)
    else:
        panel = ExpertPanel.objects.filter(
            bucket=buc, problem=True, remarks__gt=0)
    ser = ExpertPanelSerializer(panel, many=True)

    ser1 = []
    for i in panel:
        user = User_Profile.objects.get(username=i.username)
        serialize = user_profile_serializer(user)
        ser1.append(serialize.data)

    ser1 = sorted(ser1, key=lambda i: i['rp'], reverse=True)
    ser = []
    ser2 = []
    ser3 = []
    for i in ser1:
        g = i['username']
        user = User_Personal.objects.filter(username=g)
        serialize = user_personal_serializer(user, many=True)
        ser.append(serialize.data[0])
        user = User_Professional.objects.filter(username=g)
        serialize = user_professional_serializer(user, many=True)
        ser2.append(serialize.data[0])

    length = len(ser)

    ret = [ser1, ser, ser2]

    return Response(ret)


@api_view(['POST'])
def expertRequest(request):

    sender = CustomUser.objects.get(id=request.POST.get('username'))
    rec = CustomUser.objects.get(id=request.POST.get('expert'))

    user = User_Personal.objects.get(username=request.POST.get('username'))
    sen_ser = user_personal_serializer(user)

    ser = {
        'username': request.POST.get('username'),
        'expert': request.POST.get('expert'),
        'choice': request.POST.get('choice'),
        'problem': request.POST.get('problem'),
        'bucket': request.POST.get('bucket')
    }
    print(ser)

    if(request.POST.get('choice') == 'problem'):
        notify.send(sender, recipient=rec, verb='You got a request for framing a problem',
                    timestamp=django.utils.timezone.now(), user=sen_ser.data, request=ser)
    if(request.POST.get('choice') == 'solution'):
        print(request.POST.get('problem'))
        prblm = PostSerializer2(Post.objects.get(
            problemId=request.POST.get('problem')))
        notify.send(sender, recipient=rec, verb='You got a request for decomposing solutions',
                    timestamp=django.utils.timezone.now(), user=sen_ser.data, request=ser, problem=prblm.data)
    if(request.POST.get('choice') == 'wicked'):
        prblm = ForumPostSerializer(ForumPost.objects.get(
            postId=request.POST.get('problem')))
        notify.send(sender, recipient=rec, verb='You got a request for solving wicked problems',
                    timestamp=django.utils.timezone.now(), user=sen_ser.data, request=ser, problem=prblm.data)
    return Response({'value': "sent"})


@api_view(['POST'])
def expertAccept(request, nid):

    noti = Notification.objects.get(id=nid)
    print(noti)

    sender = CustomUser.objects.get(id=noti.data['request']['expert'])
    rec = CustomUser.objects.get(id=noti.data['request']['username'])

    user = User_Personal.objects.get(username=noti.data['request']['expert'])
    sen_ser = user_personal_serializer(user)

    if(noti.data['request']['choice'] == 'problem'):
        notify.send(sender, recipient=rec, verb='accepted framing problem request',
                    timestamp=django.utils.timezone.now(), user=sen_ser.data, request=noti.data['request'])
    if(noti.data['request']['choice'] == 'solution'):
        notify.send(sender, recipient=rec, verb='accepted decomposing solution request', timestamp=django.utils.timezone.now(
        ), user=sen_ser.data, request=noti.data['request'], problem=noti.data['problem'])

    if(noti.data['request']['choice'] == 'wicked'):
        notify.send(sender, recipient=rec, verb='accepted solving wicked problem', timestamp=django.utils.timezone.now(
        ), user=sen_ser.data, request=noti.data['request'], problem=noti.data['problem'])

    return Response({'value': "sent"})


@api_view(['POST'])
def expertPayProblem(request, nid):

    noti = Notification.objects.get(id=nid)
    print(noti)

    sender = CustomUser.objects.get(id=noti.data['request']['username'])
    rec = CustomUser.objects.get(id=noti.data['request']['expert'])

    user = User_Personal.objects.get(username=noti.data['request']['username'])
    sen_ser = user_personal_serializer(user)

    expert = ExpertPanel.objects.get(
        username=noti.data['request']['expert'], bucket=noti.data['request']['bucket'])

    if(noti.data['request']['choice'] == 'problem'):

        oj = ExpertHelp.objects.create(username=sender, experts=[
                                       expert.id], choice=noti.data['request']['choice'], problem=noti.data['request']['problem'], bucket=noti.data['request']['bucket'])
        oj.chat = noti.data['request']['username'] + \
            ',' + noti.data['request']['expert']
        oj.save()
        obj = ChatRoom.objects.create(expertHelp=oj)

        notify.send(sender, recipient=rec, verb='chat room created for problem framing',
                    timestamp=django.utils.timezone.now(), user=sen_ser.data, request=noti.data['request'])

    if(noti.data['request']['choice'] == 'solution'):

        oj = ExpertHelp.objects.filter(
            problem=noti.data['request']['problem'], username=sender)

        if (len(oj) > 0):
            oj = oj[0]
            oj.experts.append(expert.id)
            oj.chat += ',' + noti.data['request']['expert']
            oj.save()
        else:
            oj = ExpertHelp.objects.create(username=sender, experts=[
                                           expert.id], choice=noti.data['request']['choice'], problem=noti.data['request']['problem'], bucket=noti.data['request']['bucket'])
            oj.chat = noti.data['request']['username'] + \
                ',' + noti.data['request']['expert']
            oj.save()
            obj = ChatRoom.objects.create(expertHelp=oj)

        postProblem = Post.objects.get(
            problemId=noti.data['request']['problem'])
        sol = Solution.objects.filter(
            problemId=noti.data['request']['problem'])
        for i in sol:
            revi = ExpertReview.objects.create(
                expert=expert, expertHelp=oj, problemId=postProblem, solutionId=i)
            revi.save()

        notify.send(sender, recipient=rec, verb='chat room created for solution decomposition', timestamp=django.utils.timezone.now(
        ), user=sen_ser.data, request=noti.data['request'], problem=noti.data['problem'])

    if(noti.data['request']['choice'] == 'wicked'):

        oj = ExpertHelp.objects.create(username=sender, experts=[
                                       expert.id], choice=noti.data['request']['choice'], problem=noti.data['request']['problem'], bucket=noti.data['request']['bucket'])
        oj.chat = noti.data['request']['username'] + \
            ',' + noti.data['request']['expert']
        oj.save()
        obj = ChatRoom.objects.create(expertHelp=oj)

        notify.send(sender, recipient=rec, verb='chat room created for solving wicked problem', timestamp=django.utils.timezone.now(
        ), user=sen_ser.data, request=noti.data['request'], problem=noti.data['problem'])

    return Response({'value': "sent"})


@api_view(['GET'])
def expertChat(request, uid):
    sol = ExpertHelp.objects.filter(chat__icontains=uid)
    serializer = ExpertHelpSerializer(sol, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def expertDash(request, uid):
    sol = ExpertHelp.objects.filter(
        chat__icontains=uid, completed=False, choice="solution")
    ser1 = []
    for i in sol:
        obj = Post.objects.get(problemId=i.problem)
        ser = PostSerializer2(obj)
        ser1.append(ser.data)

    sol = ExpertHelp.objects.filter(
        chat__icontains=uid, completed=False, choice="wicked")
    ser2 = []

    for i in sol:
        obj = ForumPost.objects.get(postId=i.problem)
        ser = ForumPostSerializer(obj)
        ser2.append(ser.data)

    return Response([ser1, ser2])
