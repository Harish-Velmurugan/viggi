from django.shortcuts import render
from django.http import JsonResponse as Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes

from helper.models import DataProviderReq,DPInvolved,Quote
from helper.serializers import DataProviderReqSerializer,DPInvolvedSerializer,QuoteSerializer
from users.models import CustomUser
from users.api.serializers import LoginSerializer
from updateapi.serializers import user_personal_serializer
from updateapi.models import User_Personal
from django.db.models import Q

from api.views import updateDeposit, sendEmailDep
from api.models import WalletDashboard, Transactions
import numpy as np
import random
import datetime

from swapper import load_model

from notifications.signals import notify
import django.utils.timezone
from django.db.models import Q

# Create your views here.
Notification = load_model('notifications', 'Notification')
@api_view(['POST'])
def ReqView(request):
    serializer = DataProviderReqSerializer(data = request.data)
    print(serializer.initial_data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data) 

@api_view(['GET'])
def DPFeed(request,dm):
    feed = DataProviderReq.objects.filter(Q(domain=dm) | Q( vendor='tech'),accept=False)
    serializer = DataProviderReqSerializer(feed,many=True)
    return Response([serializer.data],safe=False)

@api_view(['GET'])
def QuoteView(request,uid):
    req = DataProviderReq.objects.filter(requestor=uid,paid=False,vendor='tech')
    serializer = DataProviderReqSerializer(req,many=True)
    return Response([serializer.data],safe=False)

@api_view(['GET'])
def QuoteView2(request,rid):
    req = Quote.objects.filter(reqID = rid)
    serializer = QuoteSerializer(req,many=True)
    return Response([serializer.data],safe=False)

@api_view(['POST'])
def DPagreed(request,rid):
    serializer = DPInvolvedSerializer(data = request.data)
    print(serializer.initial_data)
    if serializer.is_valid():
        serializer.save()
        feed = DataProviderReq.objects.get(reqID = rid)
        feed.accept = True
        feed.save()
        ser1 = DataProviderReqSerializer(feed)
        if(feed.vendor == "data"):
            print(request.POST.get('user'), feed.requestor)
            sen = CustomUser.objects.get(id = request.POST.get('user'))
            rec = CustomUser.objects.get( username = feed.requestor)
            sen_pro = user_personal_serializer( User_Personal.objects.get(username = request.POST.get('user')))
            print(sen, rec)
            notify.send( sen, recipient=rec, verb='data provider req accepted', timestamp=django.utils.timezone.now(), req = ser1.data, dp=serializer.data, user = sen_pro.data)  
        else:
            QuoteAmt = Quote.objects.get(reqID = rid)
            feed.budget = QuoteAmt.quote
            feed.save()
            print(request.POST.get('user'), feed.requestor,QuoteAmt.quote)
            sen = CustomUser.objects.get(id = request.POST.get('user'))
            rec = CustomUser.objects.get( username = feed.requestor)
            sen_pro = user_personal_serializer( User_Personal.objects.get(username = request.POST.get('user')))
            print(sen, rec)
            notify.send( rec, recipient=sen, verb='data provider req accepted', timestamp=django.utils.timezone.now(), req = ser1.data, dp=serializer.data, user = sen_pro.data)  
    return Response(serializer.data)





@api_view(['GET'])
def getPI(request,uid):
    PI = DPInvolved.objects.filter(user=uid)
    serializer = DPInvolvedSerializer(PI,many=True)
    ser1=[]
    for i in range(len(PI)):
        pblm = DataProviderReq.objects.filter(reqID = serializer.data[i]['reqID'],accept=True)
        ser1.append((DataProviderReqSerializer(pblm,many=True)).data)
    return Response([serializer.data,ser1],safe=False)


@api_view(['POST'])
def DPAttach(request,rid):
    task  = DPInvolved.objects.get(reqID=rid)
    serializer = DPInvolvedSerializer(instance=task,data=request.data)
    print(serializer.initial_data)
    if serializer.is_valid():
        serializer.save()
        sen = CustomUser.objects.get(username = task.user)
        req = DataProviderReq.objects.get(reqID = rid)
        ser1 = DataProviderReqSerializer(req)
        rec = CustomUser.objects.get( username = req.requestor)
        sen_pro = user_personal_serializer( User_Personal.objects.get(username = task.user))
        notify.send( sen, recipient=rec, verb='dp attached doc', timestamp=django.utils.timezone.now(), req = ser1.data, dp=serializer.data, user = sen_pro.data)
    return Response(serializer.data)


@api_view(['POST'])
def DPPaid(request,nid,ven):
    if(ven == 'tech'):
        task = DataProviderReq.objects.get(reqID = nid)
        task.paid = True
        task.save()

    else:
        rid = Notification.objects.get(id = nid)
        task = DataProviderReq.objects.get(reqID = rid.data['req']['reqID'])
        task.paid = True
        task.save()
    return Response({"value":"success"})

@api_view(['GET'])
def getFromVendor(request,uid):
    PI = DataProviderReq.objects.filter(requestor = uid)
    serializer = DataProviderReqSerializer(PI,many=True)
    ser=[]
    ser1 =[]
    for i in range(len(PI)):
        pblm = DPInvolved.objects.filter(reqID = serializer.data[i]['reqID'])
        ser.append(serializer.data[i])
        ser1.append((DPInvolvedSerializer(pblm,many=True)).data)
    return Response([ser,ser1],safe=False)

@api_view(['GET'])
def singleAccept(request,rid):
    PI = DPInvolved.objects.filter(reqID = rid)
    serializer = DPInvolvedSerializer(PI,many=True)
    if(len(PI)>=1):
        accept = True
    else:
        accept = False
    return Response(accept,safe=False)

@api_view(['POST'])
def helperPayment(request,rid):
    PI = DataProviderReq.objects.get(reqID = rid)
    PI.verify = True
    task = DPInvolved.objects.get(reqID = rid)
    user = LoginSerializer(CustomUser.objects.get(username=task.user))
    mail = user.data.get('email')  
    PI.save()
    print(mail)
    obj = WalletDashboard.objects.get(email = mail)
    print(obj)
    obj.cash = round(obj.cash + round(float(PI.budget), 2), 2)
    obj.save()
    orderId = random.randint(10000000000, 1000000000000000)
    time = datetime.datetime.now()
    time = time.strftime("%Y-%m-%d %H:%M:%S")
    user = CustomUser.objects.get(username=obj.username)
    title = "Accepted " + PI.title
    Transactions.objects.create(username=user, amount=round(PI.budget, 2), orderId=orderId, email=title,time=time)
    
    # sendEmailDep(mail)
    return Response({"value":"success"})

@api_view(['POST'])
def quoteBudget(request,rid):
    serializer = QuoteSerializer(data = request.data)
    print(serializer.initial_data)
    if serializer.is_valid():
        serializer.save()
        feed = DataProviderReq.objects.get(reqID = rid)
        ser1 = DataProviderReqSerializer(feed)
        print(request.POST.get('user'), feed.requestor)
        sen = CustomUser.objects.get(id = request.POST.get('name'))
        rec = CustomUser.objects.get( username = feed.requestor)
        sen_pro = user_personal_serializer( User_Personal.objects.get(username = request.POST.get('name')))
        print(sen, rec)
        notify.send( sen, recipient=rec, verb='quote', timestamp=django.utils.timezone.now(), req = ser1.data, dp=serializer.data, user = sen_pro.data)  
    return Response(serializer.data) 

  
