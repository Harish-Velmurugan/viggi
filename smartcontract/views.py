from django.shortcuts import render
from django.http import JsonResponse as response
from rest_framework.decorators import api_view,permission_classes
from .serializers import DescriptionSerializer,ContractSerializer,SolverDescriptionSerializer,SolverContractSerializer
from .models import Description,Contract,SolverDescription,SolverContract
from post.models import Post
from solutions.models import Solution
from solutions.serializers import SolutionSerializer2
from notifications.signals import notify
from users.models import CustomUser
import django.utils.timezone
from updateapi.models import User_Personal
from updateapi.serializers import user_personal_serializer
# Create your views here.

@api_view(['GET'])
def ContractView(request):
    contract = Contract.objects.all()
    serializer = ContractSerializer(contract,many=True)
    return response(serializer.data,safe=False)


@api_view(['GET'])
def DescriptionView(request,pk):
    contract = Contract.objects.get(contractNumber= pk)
    ser = ContractSerializer(contract)
    seeker = User_Personal.objects.get(username=contract.problem.username)
    sek = user_personal_serializer(seeker)
    details = Description.objects.filter(contract=pk)
    serializer = DescriptionSerializer(details,many=True)
    ser1=[]
    for i in range(len(details)):
        user = User_Personal.objects.get(username=serializer.data[i]['username'])
        ser1.append((user_personal_serializer(user)).data)
    pi = contract.problem.problemId
    obj = Post.objects.get(problemId = pi)
    return response([ser.data,serializer.data,ser1,obj.title,sek.data],safe=False)

@api_view(['GET'])
def share(request,pk):
    contract = Contract.objects.filter(problem= pk)
    ser = ContractSerializer(contract,many=True)
    return response([ser.data],safe=False)

@api_view(['POST'])
def CreateContract(request,pk):
    contract = Contract()
    contract.problem = Post.objects.get(problemId=pk)
    
    contract.save()
    task = Post.objects.get(problemId=pk)
    task.chooseWinner=True
    serializer = ContractSerializer(contract)
    return response(serializer.data)

@api_view(['POST'])
def CreateDescription(request):
    serializer = DescriptionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return response(serializer.data)

@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def agree(request, pk,sk):
    user  = Description.objects.get(username=pk, contract=sk)
    user.agreed = True
    user.save()
    col = Contract.objects.get(contractNumber= sk)
    pi = col.problem.problemId
    obj = Post.objects.get(problemId = pi)

    description = Description.objects.filter(contract=sk)

    ver ='solution accepted'

    if(len(description) == 1):
        ver ='solver solution accepted'

    rec = CustomUser.objects.get(username = obj.username)
    sender = CustomUser.objects.get(id = pk)

    ser = ContractSerializer(col)
    des = DescriptionSerializer(user)

    notify.send( sender, recipient=rec, verb=ver, timestamp=django.utils.timezone.now(), contract = ser.data, desc= des.data )
    return response('sucessfull',safe=False)

@api_view(['POST'])
def seekerCollaboration(request,ci,re):
    col = Contract.objects.get(contractNumber= ci)
    pi = col.problem.problemId
    obj = Post.objects.get(problemId = pi)

    sender = CustomUser.objects.get(username = obj.username)
    rec = CustomUser.objects.get(id = re)
    pk = rec.id

    description = Description.objects.filter(contract=ci)

    ver ='solution won and collaborated'

    if(len(description) == 1):
        ver ='solution won and accepted'

    desc  = Description.objects.get(username=pk, contract=ci)

    ser = ContractSerializer(col)
    des = DescriptionSerializer(desc)

    
    notify.send( sender, recipient=rec, verb = ver, timestamp=django.utils.timezone.now(), contract = ser.data, desc= des.data )
    return response({'value': "sent"})

@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def seekerAgree(request,sk):
    user  = Contract.objects.get(contractNumber= sk)#Description.objects.get(username=pk, contract=sk)
    user.agreed = True
    user.save()
    return response('sucessfull',safe=False)

@api_view(['POST'])
def CreateSolverContract(request,pk,sk):
    contract = SolverContract()
    contract.problem = Post.objects.get(problemId=pk)
    contract.solution = Solution.objects.get(solutionId=sk)
    contract.save()
    serializer = SolverContractSerializer(contract)
    return response(serializer.data)

@api_view(['POST'])
def CreateSolverDescription(request):
    serializer = SolverDescriptionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return response(serializer.data)



@api_view(['POST'])
def solverCollaboration(request,ci,re):
    col = SolverContract.objects.get(contractNumber= ci)
    si = col.solution.solutionId
    obj = Solution.objects.get(solutionId = si)


    sender = CustomUser.objects.get(username = obj.username)
    rec = CustomUser.objects.get(id = re)
    pk = rec.id


    ver ='solver solver collaborated'


    desc  = SolverDescription.objects.get(username=pk, contract=ci)

    ser = SolverContractSerializer(col)
    des = SolverDescriptionSerializer(desc)


    if(sender != rec):
        notify.send( sender, recipient=rec, verb = ver, timestamp=django.utils.timezone.now(), contract = ser.data, desc= des.data )

    return response({'value': "sent"})


@api_view(['GET'])
def SolverDescriptionView(request,pk):
    contract = SolverContract.objects.get(contractNumber= pk)
    ser = SolverContractSerializer(contract)
    details = SolverDescription.objects.filter(contract=pk)
    serializer = SolverDescriptionSerializer(details,many=True)
    ser1=[]
    for i in range(len(details)):
        user = User_Personal.objects.get(username=serializer.data[i]['username'])
        ser1.append((user_personal_serializer(user)).data)
    si = contract.solution.solutionId
    obj = Solution.objects.get(solutionId = si)
    sol = SolutionSerializer2(obj)
    return response([ser.data,serializer.data,ser1,obj.title,sol.data],safe=False)


@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def solveragree(request, pk,sk):
    user  = SolverDescription.objects.get(username=pk, contract=sk)
    user.agreed = True
    user.save()


    col = SolverContract.objects.get(contractNumber= sk)
    si = col.solution.solutionId
    obj = Solution.objects.get(solutionId = si)

    ver ='solver solver split accepted'

    rec = CustomUser.objects.get(username = obj.username)  #leader
    sender = CustomUser.objects.get(id = pk)                #solver

    ser = SolverContractSerializer(col)
    des = SolverDescriptionSerializer(user)

    if(rec!=sender):
        notify.send( sender, recipient=rec, verb=ver, timestamp=django.utils.timezone.now(), contract = ser.data, desc= des.data )
    else:
        col.agreed = True
        col.save()
    return response('sucessfull',safe=False)