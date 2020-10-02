import decimal
import random
import datetime
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, WalletDashboardSerializer
from .models import WalletDashboard, Transactions
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from users.models import CustomUser
from django.core.exceptions import ObjectDoesNotExist

import json
User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class WalletDashboardViewSet(viewsets.ModelViewSet):
    queryset = WalletDashboard.objects.all()
    serializer_class = WalletDashboardSerializer
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]


@api_view(['GET'])
def getDetails(request,un):
    obj = WalletDashboard.objects.get(email = un)
    serializer = WalletDashboardSerializer(obj)
    return JsonResponse(serializer.data)


@api_view(['POST'])
def updateDetails(request, un, c):
    obj = WalletDashboard.objects.get(username = un)
    obj.cash = round(obj.cash + round(float(c), 2), 2)
    obj.save()
    return JsonResponse({'status': 200})

@api_view(['POST'])
def updateWithdraw(request, un, c):
    obj = WalletDashboard.objects.get(username = un)
    obj.cash = round(obj.cash - round(float(c), 2), 2)
    obj.save()
    return JsonResponse({'status': 200})

def updateDeposit(request,fin,title):
    title = title[:18]
    title = 'Won-'+title
    email = list(fin.keys())
    amount = list(fin.values())
    for i in range(len(email)):
        obj = WalletDashboard.objects.get(email = email[i])
        obj.cash = round(obj.cash + round(float(amount[i]), 2), 2)
        orderId = random.randint(10000000000, 1000000000000000)
        time = datetime.datetime.now()
        time = time.strftime("%Y-%m-%d %H:%M:%S")
        user = CustomUser.objects.get(username=obj.username)
        Transactions.objects.create(username=user, amount=round(amount[i], 2), orderId=orderId, email=title,time=time)
        obj.save()
        sendEmailDep(email[i])

@api_view(['GET'])
def getTransactions(request,un):
    transac = Transactions.objects.filter(username = int(un))
    Transaction=[]
    t = []
    for trans in transac:
        time = trans.time[:10]
        trans.time = trans.time[11:]
        trans.time = time + ' ' + trans.time
        Transaction.append([trans.time, trans.orderId,trans.email,trans.amount])
    t = Transaction[::-1]
    return JsonResponse(t,safe=False)



@api_view(['POST'])
def updateTransactions(request, un, amt, email, orderId, time):
    user = CustomUser.objects.get(id = int(un))
    Transactions.objects.create(username = user, amount=amt,orderId=orderId,email=email,time=time)
    sendEmail(un,email)
    return JsonResponse({'status': 200})


def sendEmail(un,email):
    obj = WalletDashboard.objects.get(username = un)
    send_mail('Request for Payment - VignaTree', 'This is an automated message sent by VignaTree '
                                                         'Thanks for using!',
              'rinnovations0@gmail.com', [str(obj.email)]
              ,fail_silently=False)

def sendEmailDep(email):
    send_mail('Payment by VignaTree', 'This is an automated message sent by VignaTree to let you know that a payment has been credited to your Wallet'
                                                         'Thanks for using!',
              'rinnovations0@gmail.com', [str(email)]
              ,fail_silently=False)