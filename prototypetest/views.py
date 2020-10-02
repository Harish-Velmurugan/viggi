from django.shortcuts import render
from users.models import CustomUser
from updateapi.models import  User_Personal,User_Professional
from solutions.models import Solution
from django.http import JsonResponse as Response
from .serializers import  *
from rest_framework.decorators import api_view
from chat.models import ChatRoom
from notifications.signals import notify
from swapper import load_model
from solutions.serializers import SolutionSerializer
from .models import *
import django.utils.timezone
import json as simplejson
import json
from django.utils import six 

# Create your views here.
@api_view(['GET'])
def solverName(request,sid):
    task1=Solution.objects.get(solutionId=sid)
    task2=User_Personal.objects.get(username=task1.username)
    return Response({"value":task2.firstname+" "+task2.lastname})

@api_view(['POST'])
def createPrototype(request):
    task=createPrototypeTestSerializer(data=request.data)
    # print(task)
  
    # task1=Solution.objects.get(solutionId=task.solutionId)
    # task2=SolutionSerializer(task1)
    # sender=CustomUser.objects.get(id=task['pImplementer'])
    # receiver=CustomUser.objects.get(id=task.pBuilder)
    
    # print(task)
    if task.is_valid():
        task1=Solution.objects.get(solutionId=request.data['solutionId'])
        task2=SolutionSerializer(task1)
        sender=CustomUser.objects.get(id=request.data['pImplementer'])
        receiver=CustomUser.objects.get(id=request.data['pBuilder'])
        task.save()
        print("a--")
        notify.send(sender, recipient=receiver, verb='appointed as pilotbuilder', timestamp=django.utils.timezone.now(),obj=task2.data)#havetodofrontend
 
    return Response({"":""})

@api_view(['POST'])
def startProcess(request,sid):
    if createPrototypeTest.objects.filter(solutionId=sid).exists():
        task=createPrototypeTest.objects.get(solutionId=sid)
        ChatRoom.objects.create(prototypeTest=(createPrototypeTest.objects.get(id=task.id)))
        task.started=True
        task.save()
        members = task.members.split(',')
        members.pop() 
        for i in members:
             notify.send(CustomUser.objects.get(id=task.pImplementer), recipient=CustomUser.objects.get(id=i), verb='prototype chatroom created', timestamp=django.utils.timezone.now(),obj={"value":task.solutionId.title})#havetodofrontend
        notify.send(CustomUser.objects.get(id=task.pImplementer), recipient=CustomUser.objects.get(id=task.pBuilder), verb='prototype and test started', timestamp=django.utils.timezone.now(),obj={"value":task.solutionId.title})#havetodofrontend
 
        return Response({"value":"started"})
    else:

        return Response({"value":"not going to implement"})
    return Response({"value":"success"})

@api_view(['GET'])
def prototypetestBuilder(request,un):
    ser1=[]
    task1=createPrototypeTest.objects.filter(pBuilder=int(un),started=True)
    task2=createPrototypeTestSerializer(task1,many=True)
    for i in range(len(task1)):
        # print(task1[i].solutionId.solutionId)
        task3=Solution.objects.get(solutionId=task1[i].solutionId.solutionId)
        task4=SolutionSerializer(task3)
        ser1.append(task4.data)
    content=[task2.data,ser1]
    return Response(content,safe=False)

@api_view(['GET'])
def prototypetestImplementer(request,un):
    ser1=[]
    task1=createPrototypeTest.objects.filter(pImplementer=int(un),started=True)
    task2=createPrototypeTestSerializer(task1,many=True)

    for i in range(len(task1)):
        # print(task1[i].solutionId.solutionId)
        task3=Solution.objects.get(solutionId=task1[i].solutionId.solutionId)
        task4=SolutionSerializer(task3)
        ser1.append(task4.data)
    content=[task2.data,ser1]
    # print(task2.data)
    return Response(content,safe=False)



@api_view(['GET'])
def implementSteps(request,pid):
    task1=createPrototypeTest.objects.get(id=pid)
    task2=prototypeSubmission.objects.get(prototypeTestId=task1)


    length=len(task2.steps)
    print(length)
    
    

    task3=Implementation.objects.get(prototypeTestId=task2)

    print(task3.currentStep)   
    # if(length > task3.currentStep ):
    task4=Steps.objects.get(ImplementationId=task3,stepNo=task3.currentStep)    
        # return Response({"value":task2.steps,'step':task3.currentStep-1,'Iagree':task4.pImplementerAgree,'Bagree':task4.pBuilderAgree})

    ser=StepsSerializer(task4)
    # else:
        # task4=Steps.objects.get(ImplementationId=task3,stepNo=task3.currentStep)
   
    return Response({"value":task2.steps,'step':task3.currentStep,'Iagree':task4.pImplementerAgree,'Bagree':task4.pBuilderAgree,'person':task2.person,'Bdoc':ser.data['pBuilderDoc'],'Idoc':ser.data['pImplementerDoc']})

@api_view(['GET'])
def Stage(request,pid):
    task1=createPrototypeTest.objects.get(id=pid)
    print(task1.step)
    if task1.step==0:
          if planning.objects.filter(prototypeTestId=task1).exists():
             task2=planning.objects.get(prototypeTestId=task1) 

             if task2.pImplementerAgree==True:
                return Response({"value":'success','next':'true'})
             else:
                 task3=planning.objects.get(prototypeTestId=task1)
                 task4=planningSerializer(task3)
                 return Response({"value":'pilotImplementer has to agree','next':'false','currentStep':1,'stepper':0,'state':task4.data,'msg':"(Submitted & waiting for approval)"})
          else:
             return Response({"value":'planning phase not started','next':'false','currentStep':1,'stepper':0})
    if task1.step==1:
        task3=planning.objects.get(prototypeTestId=task1)
        task4=planningSerializer(task3)
        print("00")    
        if prototypeSubmission.objects.filter(prototypeTestId=task1).exists():
            task2=prototypeSubmission.objects.get(prototypeTestId=task1) 
            if task2.pImplementerAgree==True:
                return Response({"value":'success','next':'true'})
            else:
                 task3=planning.objects.get(prototypeTestId=task1)
                 task4=planningSerializer(task3)


                 task5=prototypeSubmission.objects.get(prototypeTestId=task1)
                 task6=prototypeSubmissionSerializer(task5) 
                 return Response({"value":'pilotImplementer has to agree','next':'false','currentStep':2,'stepper':1,'state':task4.data,'state1':task6.data,'msg1':"(Submitted & waiting for approval)",'msg':"(Approved)"})
        

        return Response({"value":'planning phase not started','next':'false','currentStep':2,'stepper':1,'state':task4.data,'msg':"(Approved)"})

    if task1.step==2:
          
          return Response({"value":'planning phase not started','next':'false','currentStep':3,'stepper':2})
    return Response({"":""})

@api_view(['POST'])          
def planningPhase(request):
    task=planningSerializer(data=request.data)
    print(request.data)
    print("b")
    if task.is_valid():
        task.save()
        print("a") 
        pid=task['prototypeTestId'].value
        print(task['prototypeTestId'].value)
        a=Solution.objects.get(solutionId=(createPrototypeTest.objects.get(id=pid)).solutionId.solutionId)
        b=SolutionSerializer(a)
        
        notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=pid).pBuilder), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=pid).pImplementer), verb='pilotbuilder completed planning', timestamp=django.utils.timezone.now(),obj=b.data)#havetodofrontend
        return Response({"value":"(Submitted & waiting for approval)"})     
    return Response({"":""})    

@api_view(['POST'])          
def prototypeSubmissionFn(request):
    print('------',request.data)
    a=[]
    b=[]
    c=len(request.data)-4

    for i in range(int(c/2)): 
        # print(request.data['list['+str(i)+']'])
        a.append(request.data['list['+str(i)+']'])
        b.append(request.data['list1['+str(i)+']'])
        
    print(a)
    print(b)
    # print(request.data)
    task=prototypeSubmissionSerializer(data=request.data)
    if task.is_valid():
        task.save()
        print(task['steps'])
        task7=prototypeSubmission.objects.get(prototypeTestId=task['prototypeTestId'].value)
        task7.steps=a
        task7.person=b
        task7.save()

        print(task['prototypeTestId'].value)
        task8=Implementation.objects.create(prototypeTestId=task7)        
        for i in range(len(a)): 
            task9=Steps.objects.create(ImplementationId=task8,stepName=a[i],stepNo=i,person=b[i])
            print(task9)
        a=Solution.objects.get(solutionId=createPrototypeTest.objects.get(id=task['prototypeTestId'].value).solutionId.solutionId)
        b=SolutionSerializer(a)
        notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task['prototypeTestId'].value).pBuilder), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task['prototypeTestId'].value).pImplementer), verb='pilotbuilder completed prototypeSubmission', timestamp=django.utils.timezone.now(),obj=b.data)#havetodofrontend
        return Response({"value":"(Submitted & waiting for approval)"}) 
    else:
        print("b")
    return Response({"":""})


@api_view(['POST'])
def implementBuilderAgree(request,pid):
    print(request.data)
    task1=createPrototypeTest.objects.get(id=pid)
    task2=prototypeSubmission.objects.get(prototypeTestId=task1)
    task3=Implementation.objects.get(prototypeTestId=task2)
    task4=Steps.objects.get(ImplementationId=task3,stepNo=task3.currentStep)
    if task4.person!=2:
        task4.pBuilderAgree=True
        task4.pBuilderDoc=request.data['pBuilderDoc']
        task4.save()
    else:
        task4.pBuilderDoc=request.data['pBuilderDoc']
        task4.save()
    print(task4.pBuilderAgree)
    print(task4.pImplementerAgree)
    if(task4.pBuilderAgree and task4.pImplementerAgree):

        print(task3.currentStep)    
        task3.currentStep+=1
        task3.save()
        if (task3.currentStep == len(task2.steps)):
            task1.step=3
            task1.save()
            print('comp')
            task1.completed=True
            task1.save()

            notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pBuilder), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pImplementer), verb='prototype testing implementation completed', timestamp=django.utils.timezone.now(), data={"value":task1.solutionId.title})#havetodofrontend

            notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pImplementer), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pBuilder), verb='prototype testing implementation completed', timestamp=django.utils.timezone.now(), data={"value":task1.solutionId.title})#havetodofrontend     
     
    return Response({"step":task3.currentStep})    


@api_view(['POST'])
def implementBuilderAgree1(request,pid):
    print(request.data)
    task1=createPrototypeTest.objects.get(id=pid)
    task2=prototypeSubmission.objects.get(prototypeTestId=task1)
    task3=Implementation.objects.get(prototypeTestId=task2)
    task4=Steps.objects.get(ImplementationId=task3,stepNo=task3.currentStep)
    # if task4.person==2:
    task4.pBuilderAgree=True
        # task4.pBuilderDoc=request.data['pBuilderDoc']
    task4.save()
    # else:
        # task4.pBuilderDoc=request.data['pBuilderDoc']
        # task4.save()
    print(task4.pBuilderAgree)
    print(task4.pImplementerAgree)
    if(task4.pBuilderAgree and task4.pImplementerAgree):

        print(task3.currentStep)    
        task3.currentStep+=1
        task3.save()
        if (task3.currentStep == len(task2.steps)):
            task1.step=3
            task1.save()
            print('comp')
            task1.completed=True
            task1.save()

            notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pBuilder), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pImplementer), verb='prototype testing implementation completed', timestamp=django.utils.timezone.now(), data={"value":task1.solutionId.title})#havetodofrontend

            notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pImplementer), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pBuilder), verb='prototype testing implementation completed', timestamp=django.utils.timezone.now(), data={"value":task1.solutionId.title})#havetodofrontend     
     
    return Response({"step":task3.currentStep}) 





@api_view(['POST'])
def implementImplementerAgree(request,pid):
    task1=createPrototypeTest.objects.get(id=pid)
    task2=prototypeSubmission.objects.get(prototypeTestId=task1)
    task3=Implementation.objects.get(prototypeTestId=task2)
    task4=Steps.objects.get(ImplementationId=task3,stepNo=task3.currentStep)
    if task4.person!=2:
        task4.pImplementerAgree=True
        task4.pImplementerDoc=request.data['pImplementerDoc']
        task4.save()
    else:
        task4.pImplementerDoc=request.data['pImplementerDoc']
        task4.save()    
    print(task4.pBuilderAgree)
    print(task4.pImplementerAgree)
    if(task4.pBuilderAgree and task4.pImplementerAgree):  
        print('-----------')
        task3.currentStep+=1
        task3.save()
        print(task3.currentStep)
        print(len(task2.steps))
        
        if (task3.currentStep == len(task2.steps)):
            task1.step=3
            task1.save()
            print('comp')
            task1.completed=True
            task1.save()
            
            notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pImplementer), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pBuilder), verb='prototype testing implementation completed', timestamp=django.utils.timezone.now(), data={"value":task1.solutionId.title})#havetodofrontend
     
            notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pBuilder), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pImplementer), verb='prototype testing implementation completed', timestamp=django.utils.timezone.now(), data={"value":task1.solutionId.title})#havetodofrontend
     

    return Response({"step":task3.currentStep}) 


@api_view(['POST'])
def implementImplementerAgree1(request,pid):
    task1=createPrototypeTest.objects.get(id=pid)
    task2=prototypeSubmission.objects.get(prototypeTestId=task1)
    task3=Implementation.objects.get(prototypeTestId=task2)
    task4=Steps.objects.get(ImplementationId=task3,stepNo=task3.currentStep)

    task4.pImplementerAgree=True
        # task4.pImplementerDoc=request.data['pImplementerDoc']
    task4.save()
    
    print(task4.pBuilderAgree)
    print(task4.pImplementerAgree)
    if(task4.pBuilderAgree and task4.pImplementerAgree):  
        print('-----------')
        task3.currentStep+=1
        task3.save()
        print(task3.currentStep)
        print(len(task2.steps))
        
        if (task3.currentStep == len(task2.steps)):
            task1.step=3
            task1.save()
            print('comp')
            task1.completed=True
            task1.save()
            
            notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pImplementer), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pBuilder), verb='prototype testing implementation completed', timestamp=django.utils.timezone.now(), data={"value":task1.solutionId.title})#havetodofrontend
     
            notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pBuilder), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=task1.id).pImplementer), verb='prototype testing implementation completed', timestamp=django.utils.timezone.now(), data={"value":task1.solutionId.title})#havetodofrontend
     

    return Response({"step":task3.currentStep})      

@api_view(['GET']) 
def viewPlanning(request,pid):
    task1=createPrototypeTest.objects.get(id=pid)
    print(task1.step)
    if planning.objects.filter(prototypeTestId=task1).exists():
        task3=planning.objects.get(prototypeTestId=task1)
        task4=planningSerializer(task3)
        print(task3.pImplementerAgree)
        if task3.pImplementerAgree:
            print('s')
            return Response({'value':task4.data,'currentStep':task1.step+1,'stepper':task1.step,'agree':''})
        else:                
            return Response({'value':task4.data,'currentStep':task1.step+1,'stepper':task1.step})

    else:
        return Response({"value":'Planning phase is not submitted still','currentStep':task1.step+1,'stepper':task1.step})

@api_view(['POST'])
def planningAccept(request,pid):
    task1=createPrototypeTest.objects.get(id=pid)
    task2=planning.objects.get(prototypeTestId=task1)
    task1.step=1
    task1.save()
    task2.pImplementerAgree=True
    task2.save()
    notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=pid).pImplementer), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=pid).pBuilder), verb='planning Phase Accepted', timestamp=django.utils.timezone.now(),obj={"value":task1.solutionId.title})#havetodofrontend
    return Response({'value':'success'})


@api_view(['POST'])
def planningReject(request,pid):
    task1=createPrototypeTest.objects.get(id=pid)
    task2=planning.objects.get(prototypeTestId=task1)
    task1.step=4
    task1.save()
    notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=pid).pImplementer), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=pid).pBuilder), verb='planning Phase Rejected', timestamp=django.utils.timezone.now(),obj={"value":task1.solutionId.title})#havetodofrontend
    return Response({'value':'success'})

@api_view(['GET'])
def viewPrototype(request,pid):
    task1=createPrototypeTest.objects.get(id=pid)
    if prototypeSubmission.objects.filter(prototypeTestId=task1).exists():
        task2=prototypeSubmission.objects.get(prototypeTestId=task1)
        task3=prototypeSubmissionSerializer(task2)
        return Response(task3.data)
    else:
         return Response({"value":'This phase is not submitted still','currentStep':task1.step+1,'stepper':task1.step})
    return Response({"":""})

@api_view(['POST'])
def prototypeAccept(request,pid):
    task1=createPrototypeTest.objects.get(id=pid)
    task2=prototypeSubmission.objects.get(prototypeTestId=task1)
    task1.step=2
    task1.save()
    task2.pImplementerAgree=True
    task2.save()
    notify.send(CustomUser.objects.get(id=createPrototypeTest.objects.get(id=pid).pImplementer), recipient=CustomUser.objects.get(id=createPrototypeTest.objects.get(id=pid).pBuilder), verb='prototype Phase Accepted', timestamp=django.utils.timezone.now(),obj={"value":task1.solutionId.title})#havetodofrontend
    return Response({'value':'success'})

@api_view(['GET'])
def chat(request,uid):
      task3=[]
      task4=[]
      task = createPrototypeTest.objects.filter(members__icontains = uid,started=True)
      serializer = createPrototypeTestSerializer(task,many=True)
      task3=serializer.data
      for i in range(len(task)):
          task2=Solution.objects.get(solutionId=task[i].solutionId.solutionId)
          task5=SolutionSerializer(task2)
          task4.append(task5.data)
    
      content=[task3,task4]
      return Response(content,safe=False)