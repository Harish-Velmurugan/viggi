from updateapi.models import User_Personal,User_Professional
from updateapi.serializers import user_personal_serializer,user_professional_serializer
from solutions.models import Solution
from solutions.serializers import SolutionSerializer2
from post.models import Post
from rest_framework.decorators import api_view,permission_classes
from post.serializers import PostSerializer2
from rest_framework import generics,filters  
from django.http import JsonResponse as Response

@api_view(['GET'])     	
def get_querylist(request,un):

	task=User_Personal.objects.filter(firstname__icontains=un)	
	serializer=user_personal_serializer(task,many=True)
	dic=serializer.data
	s=[]
	d=[]
	for i in range (len(task)):
		temp=dic[i]['username']
		task2=User_Professional.objects.filter(username=temp)  
		s.append(user_professional_serializer(task2,many=True))     
		d.append(s[i].data) 


	task=Post.objects.filter(title__icontains=un)
	serializer1=PostSerializer2(task,many=True)

	task=Solution.objects.filter(title__icontains=un)
	serializer2=SolutionSerializer2(task,many=True) 

	serializer_list=[serializer.data,serializer1.data,serializer2.data,d] 	   
	return Response(serializer_list,safe=False)                                                                                                                                          


