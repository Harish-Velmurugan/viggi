from django.shortcuts import render

from django.shortcuts import render
from django.http import JsonResponse as Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
    
from solutions.serializers import SolutionSerializer, SolutionSerializer2,CreateSurveySerializer,SurveyQSerializer,TakeSurveySerializer,ChoiceSerializer

from users.models import CustomUser
from users.api.serializers import LoginSerializer

from smartcontract.serializers import DescriptionSerializer,ContractSerializer,SolverDescriptionSerializer,SolverContractSerializer
from smartcontract.models import Description,Contract,SolverDescription,SolverContract
from post.models import Post ,ExpertHelp,PostExpert, Tree
from post.serializers import PostSerializer2,PostExpertSerializer,PostSerializer, TreeSerializer
from solutions.models import Solution ,ExpertReview,CreateSurvey,SurveyQ,TakeSurvey,Choice
from notifications.signals import notify
import django.utils.timezone
from updateapi.serializers import user_personal_serializer,user_professional_serializer,user_profile_serializer
# Create your views here.
from updateapi.models import User_Personal,User_Professional,User_Profile,ExpertPanel
from chat.models import ChatRoom
from api.views import updateDeposit, sendEmailDep
from api.models import WalletDashboard, Transactions
from swapper import load_model
import numpy as np
import random
import datetime
from forum.models import ForumAnswer, ForumPost
from forum.serializers import ForumPostSerializer, ForumAnswerSerializer

Notification = load_model('notifications', 'Notification')
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def solutionSubmissionView(request):
      pid = request.POST.get("problemId")
      serializer = SolutionSerializer2(data=request.data)
      if serializer.is_valid():
            serializer.save()
            c = (serializer.data["problemId"])
            d = Post.objects.get(problemId=c)
            d.sol_count += 1
            col = serializer.data['collaboration']
            if(col):
                  obj = ChatRoom.objects.create(Solutionid=Solution.objects.get(solutionId=serializer.data['solutionId']))
                  sol=Solution.objects.get(solutionId=serializer.data['solutionId'])
                  sol.members=str(serializer.data['username']) +','
                  sol.save()

            interest = d.interested
            
            if( int(serializer.data['username']) not in interest):
                  d.interested.append(int(serializer.data['username']))
                  d.save()
            d.save()
            return Response({"value":"Successfully Saved"})
      else:
            return Response({"value":"Uploadvalidfile"})

      return Response({"value":"success"})


@api_view(['POST'])
def rejectMembers(request,sk, uid,nid):
      sol = Solution.objects.get(solutionId= sk)
      ser = SolutionSerializer2(sol)
      sol.waiting_list.remove(uid)
      sol.save()
      sen = CustomUser.objects.get(username=sol.username)
      rec = CustomUser.objects.get(id=uid)
      leader = User_Personal.objects.get(username=sol.username)
      leader_ser = user_personal_serializer(leader)

      notify.send( sen, recipient=rec, verb='collaboration requested rejected', timestamp=django.utils.timezone.now(), sol = ser.data, user=leader_ser.data)
      user = Notification.objects.get(id=nid)
      user.verb="you rejected this request"
      user.save()
      return Response({"value":"success"})

@api_view(['POST'])
def addMembers(request,sk, uid,nid):
      sol = Solution.objects.get(solutionId= sk)
      ser = SolutionSerializer2(sol)
      votes=sol.voted_list
      dic=[]
      for i in range(len(votes)):
           
            if (uid+ " " in votes[i]):
                  a = votes[i].split(' ')
                  user = User_Profile.objects.get(username = uid)
                  
                  user.rp = user.rp + int(a[1])
                  task=a[1]
                  dic={"bidreturn":task}
                  dic.update(ser.data)
                  user.save()
                  sol.voted_list.pop(i)
                  sol.save()
                  sen = CustomUser.objects.get(username=sol.username)
                  rec = CustomUser.objects.get(id=uid)
                  notify.send( sen, recipient=rec, verb='bidded rp returned', timestamp=django.utils.timezone.now(), solution = dic)
                  break

      if(sol.collaboration):
            members = sol.members.split(',')
            members.pop()
            if( uid not in members):
                  sol.members += str(uid) + ','
                  sol.save()
            

            obj = Post.objects.get(problemId = sol.problemId.problemId)
            interest = obj.interested
            
            if( int(uid) not in interest):
                  obj.interested.append(int(uid))
                  obj.save()
        
            user = User_Profile.objects.get(username = uid)
            interested = user.problems_interested

            if( sol.problemId.problemId not in interested):
                  user.problems_interested.append(sol.problemId.problemId)
                  user.save()
            sen = CustomUser.objects.get(username=sol.username)
            rec = CustomUser.objects.get(id=uid)
            sol.waiting_list.remove(uid)
            sol.save()

            leader = User_Personal.objects.get(username=sol.username)
            leader_ser = user_personal_serializer(leader)

            user = Notification.objects.get(id=nid)
            user.verb="you accepted this request"
            user.save()

            notify.send( sen, recipient=rec, verb='added as member', timestamp=django.utils.timezone.now(), sol = ser.data,user=leader_ser.data)

      return Response({'values' : 'Success'})

@api_view(['GET'])
def discussionList(request, uid):
      sol = Solution.objects.filter(collaboration=True , members__icontains = uid)
      serializer = SolutionSerializer2(sol,many=True)
      return Response(serializer.data, safe=False)
   
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def voteView(request, si, un, bid):
    task = Solution.objects.get(solutionId=si)
    s = task.username  # solver username
    l = task.voted_list

    user = User_Profile.objects.get(username=un)
    k = user.username  # user username

    if k == s:
        return Response({"values": "Your own solution can't be voted"})

    for i in range(len(l)):
          a=l[i].split(" ")
          if(a[0]==un):
            return Response({"values": "Already voted"})
    if user.rp < int(bid):
        return Response({"values":"Insufficient RP"})

    task.votes+=int(bid)
    msg = un + " " + bid
    task.voted_list.append(msg)
    user.rp = user.rp - int(bid)
    task.save()
    user.save()
    return Response({"values":"success"})


@api_view(['POST'])
def solverParticipationRp(request,ci,solis):
      con = Contract.objects.get(contractNumber=ci)
      conSer = ContractSerializer(con)
      pi = con.problem.problemId
      seeker = con.problem.username
      amt = round(float(con.problem.RnD_Budget),2)
      title = con.problem.title

      

      fin={}

      splits=[]   # to store and send splits for payment
      emails=[]   # to store emal_id of winners

      statusUpdate(seeker) 
      winner(pi,solis) 
       


      sols = Solution.objects.filter(problemId=pi).order_by('-votes')
      serializer = SolutionSerializer2(sols, many=True)
      length = len(sols)
      min = serializer.data[length-1]['votes']
      max = serializer.data[0]['votes']

      seek = Post.objects.get(problemId=pi)

      buckets = seek.buckets
      seek_ser = PostSerializer2(seek)
      sen = User_Profile.objects.get(username = seeker )


      expertHelp = ExpertHelp.objects.filter(problem=pi)

      expert = []
      if len(expertHelp) > 0:
            expert = expertHelp[0].experts
            expert.completed = True

      for i in expert:
            inter = ExpertPanel.objects.get(id=i)
            user = CustomUser.objects.get(id = inter.username)
            inter.remarks += 2
            serializer6 = LoginSerializer(user)	           
            mail = serializer6.data.get('email')  

            obj = WalletDashboard.objects.get(email = mail)
            obj.cash = round(obj.cash + round(float(200), 2), 2)
            orderId = random.randint(10000000000, 1000000000000000)
            time = datetime.datetime.now()
            time = time.strftime("%Y-%m-%d %H:%M:%S")
            user = CustomUser.objects.get(username=obj.username)
            title1 = "Accepted " + title
            Transactions.objects.create(username=user, amount=round(100, 2), orderId=orderId, email=title1,time=time)
            obj.save()
            sendEmailDep(mail)

            notify.send( sen, recipient=user, verb="decompose solution accepted", timestamp=django.utils.timezone.now(), prblm=seek_ser.data,user=user.data)


    
      for j in range(len(sols)):
            si = serializer.data[j]['solutionId']
            obj = Solution.objects.get(solutionId = si)
            uid = obj.username
            hid = obj.voted_list
            vote = obj.votes

            members = []
            

            collaborated = obj.collaboration
            
            if(collaborated):
                  
                  members = obj.members.split(',')
                  members.pop()
            else :
                  jo = CustomUser.objects.get(username=uid)
                  members.append(jo.id)

            rrp = 0
            if(max!=min):
                  rrp = round(( ( vote - min ) / (max - min ) ) * 100)

            status = obj.status

            ver = 'You gained reputation points for participation'


            if(status):
                  rrp *= 3
                  ver = "You gained reputation points for winning a solution"

            for i in members:
                  rec1 = User_Profile.objects.get(username = i )
                  rec1.rp = rec1.rp + rrp
                  
                  statusUpdate(i)
                  


                  rec = CustomUser.objects.get(id=i)
                  notify.send( sen, recipient=rec, verb=ver, timestamp=django.utils.timezone.now(), contract = conSer.data, sol = serializer.data[j], prblm = seek_ser.data )
            
                  if(status):
                        des = Description.objects.get(contract = ci,username = uid)
                        revenue = des.revenue
                        sp=amt*(revenue/100)
                        if(collaborated):
                              solverCon = SolverContract.objects.get(solution=obj.solutionId)
                              solverDes = SolverDescription.objects.get(contract= solverCon.contractNumber, username = i)
                              sp *= (solverDes.revenue/100)

                        serializer6 = LoginSerializer(rec)	           
                        emails.append(serializer6.data.get('email'))   
                        m=serializer6.data.get('email')
                        dict = {m:sp}
                        fin.update(dict) 
                        badges(i,buckets)
                        rec1.hatrick +=1 

                  else:
                        rec1.hatrick = 0   
                  if(rec1.hatrick == 3):
                        rec1.hattricker = True
                  rec1.save()
                  levels(i) 

            bidReturn(hid,status,uid,serializer.data[j]) 
      
      updateDeposit(request,fin,title)
      
      return Response(fin,safe=True)


def bidReturn(list, value , uid, sol): 

      sen = CustomUser.objects.get(username=uid)

      for i in list:
            vote = i.split(' ')
            user = User_Profile.objects.get(username= vote[0])
            rec = CustomUser.objects.get(id=vote[0])
            v = int(vote[1])
            if value: 
                  user.rp = user.rp + v + v * 0.02  # winning soln
                  user.ast +=1
                  if user.ast >= 10:
                        user.astute = True
                  user.save() 
                  levels(vote[0])  
                  notify.send( sen, recipient=rec, verb='your bidded solution won', timestamp=django.utils.timezone.now(), sol=sol)
            else:
                  user.rp = user.rp + v - v * 0.02
                  levels(vote[0]) 
                  notify.send( sen, recipient=rec, verb='your bidded solution lost', timestamp=django.utils.timezone.now(), sol=sol)
            user.save()


def winner(pid,sols):
    obj = Post.objects.get(problemId = pid)
    obj.solved= True
    obj.save()
    


    wonsol=sols.split(',')
    wonsol.pop()
    for i in wonsol:
        s = Solution.objects.get(solutionId = i)
        s.status=True
        s.save()
        
 


def badges(sid,buckets):#sid,sol,buckets
      obj = User_Profile.objects.get(username = sid )  
      buck=[]
      jack=[]  

      yi = ['fashion','fmcg','healthcare','finance','tt','edu','power','med_ent','sw','hw','infrastructure'] 
      
      task = Solution.objects.filter(username = sid, status= True)
      task0 = Solution.objects.filter(username = sid)      
      task1 = Solution.objects.filter(members__icontains = sid, status= True)

      #Striker-badge
      if len(task0) == 1:
            obj.striker = True
            obj.save() 

      
      
      for b in buckets:
            
            count=0
            for i in task:
                  p = i.problemId
                  prblm = Post.objects.get(problemId = p)
                  buck = prblm.buckets

                  jack = np.unique(np.concatenate((jack,buck),0))


                  if b in buck:
                        count+=1
                        

                        
                  #alpha-badge
                  al=0
                  com=0
                  if(i.collaborated):
                        mem = len(i.members)
                        if mem > 1:
                              al += 1
                  else:
                        com += 1       
                  if al >= 5:
                        obj.alpha = True 

                  #commando
                  if com >= 10:
                        obj.commando = True 
 

            for i in task1:
                  if i not in task:
                        p = i.problemId
                        prblm = Post.objects.get(problemId = p)
                        buck = prblm.buckets
                        if b in buck:
                              count+=1
            if count >= 5:
                  setattr(obj,b, True)
                  obj.save()     

      #omnipotent
      ya = 0
      for j in yi:
            if getattr(obj,j) == True:
                ya += 1
      if ya == len(yi):
            obj.omnipotent = True
            obj.save()

      #jack_of_all_trades
      if len(jack) == len(yi):
            obj.jack = True 
            obj.save()


def levels(id):
      o1 = User_Profile.objects.get(username = id )
      lvl = o1.rp

      if lvl >500:
            o1.level= 'Silver'
      if lvl >=2000:
            o1.level = 'Gold'
      if lvl >=5000:
            o1.level = 'Platinum'
      if lvl >=10000:
            o1.level = 'Diamond'
      if lvl >=20000:
            o1.level = 'Jadiete'
      o1.save()



def statusUpdate(id):
      ob1= Solution.objects.filter(username =id)
      ob2= Post.objects.filter(username =id)
      ob3=Solution.objects.filter(members__icontains = id)

      # ob = ob1|ob2
      if len(ob1) > 20:
            obj.unraveler = True

      if len(ob2) >= 5:
            obj.quester = True
      
      if len(ob3) >= 10:
            obj.comrade = True



@api_view(['POST'])
def lorBadge(request,id):
      obj = User_Profile.objects.get(username = id) 
      obj.maestro = True
      obj.save()
      return Response({"values":"success"})


@api_view(['POST'])
def expertPost(request):
    serializer = PostExpertSerializer(data=request.data)
    print(request.data)
    print(serializer.initial_data)

    if serializer.is_valid():
        serializer.save()
        expert = ExpertHelp.objects.get(id=request.POST.get('expertHelp'))
        sen = CustomUser.objects.get(id=expert.experts[0])
        user = user_personal_serializer(User_Personal.objects.get(username=expert.experts[0]))
        rec = CustomUser.objects.get(id=request.POST.get('username'))
        notify.send( sen, recipient=rec, verb='problem is framed', timestamp=django.utils.timezone.now(), prblm=serializer.data,user=user.data)
    return Response(serializer.data)



@api_view(['GET'])
def postProblemSeeker(request,uid):

      obj = PostExpert.objects.filter(username=uid)
      ser = PostExpertSerializer(obj,many=True)

      obj = ForumPost.objects.filter(username=uid)
      ser1 = ForumPostSerializer(obj, many=True)
      return Response([ser.data,ser1.data],safe=False)





@api_view(['POST'])
def templateAccept(request, nid):

      obj = Notification.objects.get(id = nid)
      prblm = PostExpert.objects.get(id = obj.data['prblm']['id'])
      prblm.paid = True
      prblm.save()
      user = ExpertPanel.objects.get(username = obj.data['user']['username'])
      amt = 0
      if(user.choice== "problem"):
            amt=50
      elif(user.choice=="wicked"):
            amt=100
      user.remarks = user.remarks + 2
      user.save()

      expert = ExpertHelp.objects.get(id = prblm.expertHelp)
      expert.completed = True
      expert.save()
      sen = CustomUser.objects.get(id=expert.username)
      rec = CustomUser.objects.get(id = obj.data['user']['username'])
      serializer6 = LoginSerializer(rec)	           
      mail = serializer6.data.get('email')  

      obj = WalletDashboard.objects.get(email = mail)
      obj.cash = round(obj.cash + round(float(amt), 2), 2)
      orderId = random.randint(10000000000, 1000000000000000)
      time = datetime.datetime.now()
      time = time.strftime("%Y-%m-%d %H:%M:%S")
      user = CustomUser.objects.get(username=obj.username)
      title = "Accepted " + prblm.title
      Transactions.objects.create(username=user, amount=round(amt, 2), orderId=orderId, email=title,time=time)
      obj.save()
      sendEmailDep(mail)
      notify.send( sen, recipient=rec, verb="template framed accepted", timestamp=django.utils.timezone.now(), prblm=obj.data['prblm'],user=user.data)


      return Response({'value':"success"})


@api_view(['POST'])
def templateReject(request, nid):

      obj = Notification.objects.get(id = nid)
      user = ExpertPanel.objects.get(username =obj.data['user']['username'])
      user.remarks = user.remarks - 1
      user.save()
      return Response({'value':"success"})



@api_view(['GET'])
def submitReview(request, sid, uid, rat, com):

      user = ExpertPanel.objects.get(username= uid)

      obj = ExpertReview.objects.get(solutionId=sid, expert=user.id)
      obj.rating= rat
      obj.comments = com
      obj.save()

      return Response({'value':"success"})

#survey
@api_view(['POST'])
def createS(request,pk,uid,dl):
      survey = CreateSurvey()
      survey.pblmID = Post.objects.get(problemId=pk)
      survey.creator = CustomUser.objects.get(id=uid)
      survey.deadline = dl
      survey.save()
      serializer = CreateSurveySerializer(survey)
      return Response(serializer.data)

@api_view(['POST'])
def surveyQues(request):
    #ques = CreateSurvey.objects.get(surveyID=sid)
    serializer = SurveyQSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save() 
    return Response(serializer.data)
        
@api_view(['GET'])
def getSurveyQues(request,sid):
      ques = SurveyQ.objects.filter(survey=sid)
      serializer = SurveyQSerializer(ques,many=True)
      return Response([serializer.data],safe=False)

@api_view(['POST'])
def SurveyAns(request):
      # ans.survey = CreateSurvey.objects.get(surveyID=sid)
      # # #ans.questionID = SurveyQ.objects.get(questionID=qid)
      # ans.name = CustomUser.objects.get(id=uid)
      serializer = TakeSurveySerializer(data=request.data)
      if serializer.is_valid():
            serializer.save() 
      return Response(serializer.data)

@api_view(['POST'])
def attendChoice(request):
      serializer = ChoiceSerializer(data=request.data)
      if serializer.is_valid():
            serializer.save() 
      return Response(serializer.data)

@api_view(['GET'])
def getChoice(request,sid,qno):
      obj = Choice.objects.filter(survey=sid,questionNo=qno)
      serializer = ChoiceSerializer(obj,many=True)
      return Response([serializer.data],safe=False)


@api_view(['POST'])
def count(request,sid,qno,ch):
      obj = Choice.objects.get(survey=sid,questionNo=qno,option=ch)
      obj.votes +=1
      obj.save()
      ser = ChoiceSerializer(obj)
      return Response("success",safe=False)

@api_view(["GET"])
def fetchAns(request,sid):
      ans =TakeSurvey.objects.filter(survey=sid)
      serializer = TakeSurveySerializer(ans,many=True)
      pblm = CreateSurvey.objects.get(surveyID = sid)
      ser1 = CreateSurveySerializer(pblm)
      ser2=[]
      pblmName = Post.objects.get(problemId = ser1.data['pblmID'])
      ser2.append((PostSerializer(pblmName)).data)
      ques = SurveyQ.objects.filter(survey = sid)
      ser3 = SurveyQSerializer(ques,many=True)
      obj = Choice.objects.filter(survey=sid)
      ser4 = ChoiceSerializer(obj,many=True)

      return Response([serializer.data,ser2,ser3.data,ser4.data],safe=False)

@api_view(["GET"])
def getSurvey(request,uid):
      survey = CreateSurvey.objects.filter(alive = False)
      serializer = CreateSurveySerializer(survey,many=True)
      
      ser1=[]
      ser2=[]
      ser3=[]
      for i in range(len(survey)):
            user = User_Personal.objects.get(username=serializer.data[i]['creator'])
            ser1.append((user_personal_serializer(user)).data)

            pblm = Post.objects.get(problemId = serializer.data[i]['pblmID'])
            ser2.append((PostSerializer(pblm)).data)

            sur = TakeSurvey.objects.filter(survey=serializer.data[i]['surveyID'],name=uid)
            # ser3.append((TakeSurveySerializer(sur,many=True)).data)
            ser = TakeSurveySerializer(sur,many=True).data
            if(len(ser)==0):
                  ser3.append(True)
            else:
                  ser3.append(False)
      return Response([serializer.data,ser1,ser2,ser3],safe=False)




#Tree
@api_view(["GET"])
def getTree(request, tid):
      tree = Tree.objects.filter(forumPost = tid)
      ser = TreeSerializer(tree,many=True)
      return Response(ser.data,safe=False)

@api_view(["POST"])
def setTree(request):
      tree = Tree.objects.get(id = request.POST.get("id"))
      tree.treeBase = request.POST.get("treeBase")
      tree.treeCommon = request.POST.get("treeBase")
      tree.save()
      return Response({"value":"success"})


@api_view(["POST"])
def setTreeCommon(request):
      tree = Tree.objects.get(id = request.POST.get("id"))
      tree.treeCommon = request.POST.get("treeBase")
      tree.save()
      return Response({"value":"success"})



@api_view(["POST"])
def createTree(request, ids):

      idArr = ids.split(',')
      forum = ForumAnswer.objects.get(id=idArr[0])
      tree ='['

      for i in idArr:
            ans = ForumAnswer.objects.get(id=i)
            if tree.find(ans.buckets) == -1: # both not same and k=keyword same
                  tree +="{\"title\":\""+ ans.buckets + "\",\"children\":[{\"title\":\""+ans.keyword + "\",\"children\":[{\"title\":\""+ans.msg+ "\",\"children\":[],\"expanded\":true}],\"expanded\":true}],\"expanded\":true},"
            elif tree.find(ans.keyword) == -1: # bucket same 
                  var = "{\"title\":\""+ans.keyword + "\",\"children\":[{\"title\":\""+ans.msg+ "\",\"children\":[],\"expanded\":true}],\"expanded\":true}"
                  
                  index = tree.find(ans.buckets)+len(ans.buckets) +14
                  if (tree[index] == "{"):
                        var += ","
                  tree = tree[0:index] + var + tree[index:]
            else: #both same
                  var = "{\"title\":\""+ans.msg+ "\",\"children\":[],\"expanded\":true}"
                  index = tree.find(ans.keyword, tree.find(ans.buckets))+len(ans.keyword) +14
                  if (tree[index] == "{"):
                        var += ","
                  tree = tree[0:index] + var + tree[index:]

      tree = tree[:-1]
      tree +=']'
      Tree.objects.create(username= forum.username, forumPost= forum.postId, treeBase = tree, treeCommon = tree)
      print(tree)
      return Response({"value":"success"})