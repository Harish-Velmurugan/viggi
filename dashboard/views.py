from decouple import config
from django.shortcuts import render
from datetime import datetime, timedelta
from django.http import JsonResponse as response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
    
from post.serializers import PostSerializer2,ExtendDaysSerializer
# Create your views here.
from post.models import Post
from solutions.models import Solution,ExpertReview

from solutions.serializers import SolutionSerializer2,SolutionUpdateSerializer,SolutionSerializer

from smartcontract.serializers import DescriptionSerializer,ContractSerializer,SolverDescriptionSerializer,SolverContractSerializer
from smartcontract.models import Description,Contract,SolverDescription,SolverContract

from updateapi.serializers import user_personal_serializer,user_professional_serializer,user_profile_serializer
# Create your views here.
from updateapi.models import User_Personal,User_Professional,User_Profile, ExpertHelp, ExpertPanel

from notifications.signals import notify
from users.models import CustomUser

import django.utils.timezone
from swapper import load_model
from background_task import background
from users.api.serializers import UserListSerializer

Notification = load_model('notifications', 'Notification')

# Create your views here.
@api_view(['GET'])
def dashboardPIView(request,un):
    ser1=[]
    obj1=[]
    ser=[]
    obj=[]
    tasks = User_Profile.objects.get(username=un)
    print(un)
    l=(tasks.problems_interested)        
    for i in range(len(l)):
        print(len(Solution.objects.filter(problemId=l[i])))
        if(len(Solution.objects.filter(problemId=l[i]))!=0):
            obj1.append(Solution.objects.filter(problemId=l[i]))
            serialize=SolutionSerializer2(obj1[i],many=True)
            ser1.append({"submitted":"true"})
            print("true")
        else:
            ser1.append({"submitted":"false"})
            print("false")
        obj.append(Post.objects.filter(problemId=l[i]))
        serializer = PostSerializer2(obj[i], many = True)
             # ser.append(serializer.data)  

        # if serializer.data[0].get('expired') == False :   
        ser.append(serializer.data[0])    

        # final.append(ser[i].data)  
    content=[ser,ser1]
    print(content)
    return response(content,safe=False)



@api_view(['GET'])
def mySolutionEdit(request,un,pid):
    dic=[]
    task=Solution.objects.filter(problemId=pid)
    ser=SolutionSerializer2(task,many=True)
    for i in range(len(task)):
        if(un in task[i].members):
            ser1=SolutionSerializer2(task[i])
            dic.append(ser1.data)
            
        else:
            i=i+1
    for j in range(len(task)):
        if(ser.data[j]['username'] == int(un)):
            task1=Solution.objects.filter(problemId=pid,username=un)
            ser2=SolutionSerializer2(task[j])
            if( ser2.data not in dic): 
                dic.append(ser2.data)
        else:
            j=j+1 
    

    for i in dic:
        print(i['collaboration'])
        value = True
        if( i['collaboration']):
            con = SolverContract.objects.filter(solution=i['solutionId'])
            value = False
            if(len(con) != 0):
                if(con[0].agreed):
                    value = True
            elif(len(i['members']) == 2):
                value = True

        i.update({"agreed":value})
    return response(dic,safe=False)

@api_view(['GET'])
def dashboardPPView(request,pk):
    ser = []
    tasks  = Post.objects.filter(username=pk)
    serializer = PostSerializer2(tasks,many=True)
    for i in serializer.data:
        if i.get('expired') == False:
            ser.append(i)
        elif i.get('topsolver') == True and i.get('expired')==True and i.get('topsolverexpired')==False:
            ser.append(i)
        
    return response(ser,safe=False)

@api_view(['GET'])
def postedProblemView(request,pk,un):
    
    tasks = Solution.objects.filter(problemId=pk)
    serializer = SolutionSerializer2(tasks, many=True)

    expertHelp = ExpertHelp.objects.filter(problem=pk)

    expert = []
    if len(expertHelp) > 0:
        expert = expertHelp[0].experts

    expertDetail = []

    for i in expert:
        inter = ExpertPanel.objects.get(id=i)
        expertDetail.append(user_personal_serializer(User_Personal.objects.get(username=inter.username)).data)
        

    for i in range(len(tasks)):
        a=tasks[i].voted_list

        score = []
        comments = []
        rating = 0
        for j in expert:
            obj =  ExpertReview.objects.get(solutionId= tasks[i].solutionId, problemId= pk , expert =j)
            rating += int(obj.rating)
            score.append(obj.rating)
            comments.append(obj.comments)
        serializer.data[i].update({"expert":expert})
        if len(expertHelp) > 0:
            serializer.data[i].update({"score":score})
            serializer.data[i].update({"comments":comments})
            serializer.data[i].update({"expertDetails":expertDetail})
            serializer.data[i].update({"rating":rating/len(expert)})

        value = True
        if( serializer.data[i]['collaboration']):
            con = SolverContract.objects.filter(solution=serializer.data[i]['solutionId'])
            value=False
            if(len(con) != 0):
                if(con[0].agreed):
                    value = True
            elif(len(serializer.data[i]['members']) == 2):
                value = True

        serializer.data[i].update({"agreed":value})


        # b=a.split(",")
        serializer.data[i].update({"bid":"false"})
        serializer.data[i].update({"bidamount":'0'})
        for j in range(len(a)):

            c=a[j].split(" ")
            if(int(c[0])==int(un)):
                serializer.data[i].update({"bidamount":c[1]})
                serializer.data[i].update({"bid":"true"})
                break
            
    ser1=serializer.data

    if len(expertHelp) > 0:
        ser1 = sorted(serializer.data, key = lambda i: i['rating'],reverse=True) 
        
    return response(ser1,safe=False)

@api_view(['GET'])
def feedview(request,un):
    print(config('SECRET_KEY'))
    task=Post.objects.filter(solved=False,expired=False)
    serializer=PostSerializer2(task,many=True)
    task2 = User_Profile.objects.filter(username=un)
    serializer2=user_profile_serializer(task2,many=True)
    content=[serializer.data,serializer2.data]
    return response(content,safe=False)

@api_view(['GET'])
def problemDescription(request,pk):
    task=Post.objects.filter(problemId=pk)
    serializer=PostSerializer2(task,many=True)
    return response(serializer.data,safe=False)

@api_view(['GET'])
def problemDeadline(request,pk):
    task=Post.objects.get(problemId=pk)
    # serializer=PostSerializer2(task,many=True)
    a= task.deadline.date() - datetime.now().date() 
    print(a.days)
    print(type(a.days))
    if(a.days== -1 or a.days == -2 or a.days== -3):
        return response({'value':'true'})
    else:
        return response({"value":'false'})
    return response({'':''})    

@api_view(['GET'])
def dashboardExpired(request,pk):
    ser = []
    tasks  = Post.objects.filter(username=pk)
    serializer = PostSerializer2(tasks,many=True)
    for i in serializer.data:
        if i.get('expired') == True :  
            ser.append(i)
    return response(ser,safe=False)



@api_view(['GET'])
def topSolvercheck(request,pk):
    task=Solution.objects.filter(problemId=pk)
    print(len(task))
    if len(task) > int(config('Request_Top_Solver_Solution_Count')):
        print('true')
        task1=Post.objects.get(problemId=pk)
        if task1.topsolverexpired:
            return response({"value":"topsolverFalse"})
        elif(task1.expired and task1.topsolver==False):
            return response({"value":'over'})
        else:
            return response({"value":"false"})
        
    else:
        print('false')
        task1=Post.objects.get(problemId=pk)
        # if(task1.expired and task1.topsolver==False):
        #     print(';')
        #     return response({"value":'over'})
        if task1.topsolver:
            if task1.topsolverexpired:
                print('--')
                return response({"value":"topsolverFalse"})
            else:
                return response({"value":"true"})
        else:
            return response({"value":"date"})
    
        
    return response({"":""})



@api_view(['POST'])
def deadlineExtension(request,pk,date):
    task=Post.objects.get(problemId=pk)
    task.topsolver=True
    task.deadline=date
    task.save()    
    return response({"":""})






@api_view(['GET'])
def topSolverExpired(request,pk): 
    task= Post.objects.get(problemId=pk)
    req = task.requested
    ser5 = task.requested
    l = task.skill
    ls = l.split(',')
    o=[]    
    ser=[]
    p = []
    for i in range(len(ls)):
        o.append(User_Professional.objects.filter(domains__icontains= ls[i]))
        serialize= user_professional_serializer(o[i],many=True)
        if(serialize.data != [] ):
            for j in range(len(o[i])):
                m = serialize.data[j]['username']
                if m not in p:
                    ser.append(serialize.data[j])
                    p.append(m)

    ser1 = []
    for i in p:
        user = User_Profile.objects.filter(username=i)
        serialize= user_profile_serializer(user,many=True)
        ser1.append(serialize.data[0])

    ser1 = sorted(ser1, key = lambda i: i['rp'],reverse=True) 
    ser=[]
    ser2=[]
    ser3=[]
    for i in ser1:
        g = i['username']
        user = User_Personal.objects.filter(username=g)
        serialize= user_personal_serializer(user,many=True)
        ser.append(serialize.data[0])
        user = User_Professional.objects.filter(username=g)
        serialize= user_professional_serializer(user,many=True)
        ser2.append(serialize.data[0])
        
        if(g in req):
            ser2[ser1.index(i)].update({'requested':False})
        else:
            ser2[ser1.index(i)].update({'requested':True})

    length = len(ser)
  

    if (length < 100 ):
        ret = [ser1, ser, ser2,ser5]
    else:
        ret = [ser1[:length],ser[:length], ser2[:length],ser5]

    return response(ret,safe=False)


@api_view(['GET'])
def topRankerNavBar(request,un): 
    task = User_Professional.objects.get(username = un)
     
    l = task.domains
    ls = l.split(',')

    o=[]    
    ser=[]
    p =[]
     

    for i in range(len(ls)):
        o.append(User_Professional.objects.filter(domains__icontains= ls[i]))
        serialize= user_professional_serializer(o[i],many=True)
        if(serialize.data != [] ):
            for j in range(len(o[i])):
                m = serialize.data[j]['username']

                if m not in p:
                                       
                    ser.append(serialize.data[j])
                    p.append(m)
    ser1 = []
    for i in p:
        user = User_Profile.objects.filter(username=i)
        serialize= user_profile_serializer(user,many=True)
        ser1.append(serialize.data[0])

    ser1 = sorted(ser1, key = lambda i: i['rp'],reverse=True) 
    ser=[]
    ser2=[]
    for i in ser1:
        g = i['username']
        user = User_Personal.objects.filter(username=g)
        serialize= user_personal_serializer(user,many=True)
        ser.append(serialize.data[0])
        user = User_Professional.objects.filter(username=g)
        serialize= user_professional_serializer(user,many=True)
        ser2.append(serialize.data[0])
 
    length = len(ser)

    if (length < 100 ):
        ret = [ser1, ser, ser2]
    else:
        ret = [ser1[:length],ser[:length], ser2[:length]]


    return response(ret,safe=False)


@api_view(['GET'])
def domainSearch(request,domain,nation):

    p=[]
    ser=[]



    #if
    if(domain != 'null' and nation == 'null'):
        o= User_Professional.objects.filter(domains__icontains= domain)
        serialize= user_professional_serializer(o,many=True)
        if(serialize.data != [] ):
            for j in range(len(o)):
                m = serialize.data[j]['username']
                ser.append(serialize.data[j])
                p.append(m)
    elif(domain == 'null' and nation != 'null'):
        o= User_Personal.objects.filter(nationality= nation)
        serialize= user_personal_serializer(o,many=True)
        if(serialize.data != [] ):
            for j in range(len(o)):
                m = serialize.data[j]['username']
                ser.append(serialize.data[j])
                p.append(m)

    else:
        o= User_Personal.objects.filter(nationality= nation)
        serialize= user_personal_serializer(o,many=True)
        if(serialize.data != [] ):
            for j in range(len(o)):
                m = serialize.data[j]['username']
                p.append(m)
                pro = User_Professional.objects.get(username = m)
                d = pro.domains
                if(domain not in d):

                    p.remove(m)


    ser1 = []
    for i in p:
        user = User_Profile.objects.filter(username=i)
        serialize= user_profile_serializer(user,many=True)
        ser1.append(serialize.data[0])

    ser1 = sorted(ser1, key = lambda i: i['rp'],reverse=True) 
    ser=[]
    ser2=[]
    for i in ser1:
        g = i['username']
        user = User_Personal.objects.filter(username=g)
        serialize= user_personal_serializer(user,many=True)
        ser.append(serialize.data[0])
        user = User_Professional.objects.filter(username=g)
        serialize= user_professional_serializer(user,many=True)
        ser2.append(serialize.data[0])
 
    length = len(ser)

    if (length < 100 ):
        ret = [ser1, ser, ser2]
    else:
        ret = [ser1[:length],ser[:length], ser2[:length]]


    return response(ret,safe=False)



@api_view(['POST'])
def topSolverRequest(request,pi,re):
    obj = Post.objects.get(problemId = pi)

    obj.requested.append(re)
    obj.save()

    sender = CustomUser.objects.get(username = obj.username)
    rec = CustomUser.objects.get(id = re)

    ser = PostSerializer2(obj)
    
    notify.send(sender, recipient=rec, verb='You got a request to solve a problem', timestamp=django.utils.timezone.now(), problem = ser.data)
    return response({'value': "sent"})


@api_view(['POST'])
def removeRequested(request,pi,re):
    obj = Post.objects.get(problemId = pi)

    try:
        obj.requested.remove(int(re))
        obj.save()
    except:
        return response({'value': "no value"})
    return response({'value': "success"})

@api_view(['GET'])
def topRankerHomepage(request): 

    task = User_Profile.objects.all().order_by('-rp')
    serialize = user_profile_serializer(task,many=True)
    ser = serialize.data
    length = 5 if len(task) > 5 else len(task)

    ser1 =[]
    ser2 = []
    for i in range(length):
        g = serialize.data[i]['username']
        user = User_Personal.objects.filter(username=g)
        serialize1= user_personal_serializer(user,many=True)
        ser1.append(serialize1.data[0])
        user = User_Professional.objects.filter(username=g)
        serialize1= user_professional_serializer(user,many=True)
        ser2.append(serialize1.data[0])

    ret = [ser1, ser, ser2]

    return response(ret,safe=False)


@api_view(['GET'])
def topChallangesHomePage(request):
    obj= Post.objects.all().order_by('-popularity')
    if len(obj) >= 4:
      serialize = PostSerializer2(obj[:4],many=True)
    else:
      serialize = PostSerializer2(obj,many=True) 

    return response(serialize.data, safe=False)

@api_view(['GET'])
def sol(request,pid,un):
    task=Solution.objects.get(problemId=pid,username=un)
    ser=SolutionSerializer(task)
    return  response({"value":"success"})

@api_view(['POST'])
def solUpdate(request,sid):
   user  = Solution.objects.get(solutionId = sid)
#    serializer = SolutionUpdateSerializer(user,data=request.data)
   a=request.POST.get('desc')
   user.desc=a 
   user.abstract=request.POST.get('abstract')
   user.soln_date=datetime.now()
   user.docs=request.data['docs']
   user.video=request.data['video']
   user.image=request.data['image']
   user.save()
   return response({"":""})

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def extendDaysView(request):
   pid = request.POST.get("problemId")
   u = request.POST.get("username") 
   obj = Post.objects.get(problemId = pid)
   ser=PostSerializer2(obj)
   s = obj.username                         # reciever of notification
   serializer = ExtendDaysSerializer(data=request.data)
   if serializer.is_valid():
         serializer.save()
         sen = CustomUser.objects.get(id=u)
         rec =  CustomUser.objects.get(username=s)

         notify.send( sen, recipient=rec, verb='request to extend deadline', timestamp=django.utils.timezone.now(), obj=ser.data,exreq = serializer.data,)

   return response({"value":"success"})

@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def extendTimeAccepted(request,pid,days,nid):
    task = Post.objects.get(problemId=pid)

    task.deadline += timedelta( days = int(days) )
    task.save()
    members = task.interested
    sender = CustomUser.objects.get(username = task.username)
    ser = PostSerializer2(task)

    noti = Notification.objects.get(id=nid)
    noti.verb = 'deadline request accepted'
    noti.save()

    for i in members:
        rec = CustomUser.objects.get(id = i)
        notify.send(sender, recipient=rec, verb='Your involved problem has been extended', timestamp=django.utils.timezone.now(), problem = ser.data)
    
    return response({'value': "success"})



@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def extendTimeRejected(request,pid,uid,nid):
    task = Post.objects.get(problemId=pid)
    ser = PostSerializer2(task)


    sender = CustomUser.objects.get(username=task.username)
    rec = CustomUser.objects.get(id = uid)

    user = User_Personal.objects.get(username=task.username)
    user_ser = user_personal_serializer(user)
    
    noti = Notification.objects.get(id=nid)
    noti.verb = 'deadline request rejected'
    noti.save()

    notify.send(sender, recipient=rec, verb='deadline extend request rejected', timestamp=django.utils.timezone.now(), problem = ser.data,user = user_ser.data)
    
    return response({'value': "success"})


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def requestCollabView(request, ms, s):  
      task=Solution.objects.get(solutionId=ms)  
      ser=SolutionSerializer2(task)
      sen = CustomUser.objects.get(id = s) 
      rec = CustomUser.objects.get(username=task.username)
      if(s in task.waiting_list):
          return response({"value":"request sent already"})
      task.waiting_list.append(s)
      task.save()
      #   seninfo = {"subsolver_id" : int(s)}
      user = User_Personal.objects.get(username=s)
      user_ser = user_personal_serializer(user)

      notify.send( sen, recipient=rec, verb='solver request for collabration', timestamp=django.utils.timezone.now(),sol = ser.data,user=user_ser.data)

      return response({'value': "success"})


@api_view(['GET'])
def usersList(request):
    dic=[]
    task=CustomUser.objects.all().values('username','email')
    serializer=UserListSerializer(task,many=True)
    for i in range(len(task)):
        dic.append(serializer.data)
    return response(serializer.data,safe=False)
