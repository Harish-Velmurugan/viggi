from django.db import models
from post.models import Post
from users.models import CustomUser
from datetime import datetime, timedelta
from django.db.models import IntegerField, Model, CharField
from django_mysql.models import ListTextField,ListCharField
from cloudinary_storage.storage import RawMediaCloudinaryStorage
from updateapi.models import ExpertHelp, ExpertPanel



class Solution(models.Model):

    username = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE) # id of particular team (user id can be fetched)
    problemId = models.ForeignKey(to= Post , on_delete= models.CASCADE,db_column='problemId') # id of particular problem
    solutionId = models.AutoField(primary_key=True) # generated id for solution to be submitted
    
    title = models.CharField(max_length=500)
    desc = models.CharField(max_length=10000) 
    abstract = models.CharField(max_length=10000) 
    docs = models.FileField(upload_to='documents',storage=RawMediaCloudinaryStorage())
    image = models.ImageField(upload_to= 'solution_images',null=True) # uploading image files
    video = models.FileField(upload_to='videos',null=True,storage=RawMediaCloudinaryStorage()) # uploading video file
    soln_date = models.DateTimeField(auto_now_add=True)
    status= models.BooleanField(default = False)
    level= models.CharField(max_length=50, default='unsolved')
    votes= models.IntegerField(default=0) 
    members=ListTextField(
        base_field=CharField(max_length=100),
        size=5,)
    members = models.CharField((members), max_length=500,blank=True)    
    collaboration = models.BooleanField(default=False)
    voted_list= ListTextField(
        base_field=CharField(max_length=100),
        blank = True,
        #null = True,
    )
    waiting_list= ListTextField(
        base_field=CharField(max_length=100),
        blank = True,
        #null = True,
    )

    briliant= models.IntegerField(default=0) 
    practical= models.IntegerField(default=0) 
    eco= models.IntegerField(default=0)
    ww= models.IntegerField(default=0) 
    inaccurate= models.IntegerField(default=0)  
    inadequate= models.IntegerField(default=0)

    def __str__(self):
        return self.title


class ExpertReview(models.Model):
    expert = models.ForeignKey(to=ExpertPanel, on_delete=models.CASCADE)
    expertHelp = models.ForeignKey(to = ExpertHelp, on_delete=models.CASCADE)
    problemId = models.ForeignKey(to= Post , on_delete= models.CASCADE,db_column='problemId') # id of particular problem
    solutionId = models.ForeignKey(to = Solution, on_delete=models.CASCADE) # generated id for solution to be submitted
    rating = models.IntegerField(default=0)
    comments = models.TextField(default='')
    
class CreateSurvey(models.Model):
    surveyID = models.AutoField(primary_key=True)
    pblmID = models.ForeignKey(to=Post,on_delete=models.CASCADE)
    creator = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE)
    deadline = models.DateTimeField(default=datetime.now())
    alive = models.BooleanField(default=False)

class SurveyQ(models.Model):
    questionID = models.AutoField(primary_key=True)
    questionNo = models.IntegerField(default=0)
    survey = models.ForeignKey(to=CreateSurvey,on_delete=models.CASCADE)
    question = models.CharField(max_length=50)
    questionType = models.CharField(max_length=50,default="SingleLine Text")

class Choice(models.Model):
    survey = models.ForeignKey(to=CreateSurvey,on_delete=models.CASCADE)
    #questionNo = models.ForeignKey(to=SurveyQ, on_delete=models.CASCADE)
    questionNo = models.IntegerField(default=0)
    option = models.CharField(max_length=50,default='None')
    votes = models.IntegerField(default=0)

class TakeSurvey(models.Model):
    survey = models.ForeignKey(to=CreateSurvey,on_delete=models.CASCADE)
    name = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE)
    #questionNo = models.ForeignKey(to=SurveyQ, on_delete=models.CASCADE)
    #questionNo = models.IntegerField(default=0)
    questionType = ListTextField(
        base_field=CharField(max_length=250),
        blank = True,
    )
    # ans = models.CharField(max_length=50)
    # ans=ListCharField(
    #     base_field=CharField(max_length=20),
    #     size=50,
    #     max_length=(50 * 21))
    
    # ans = models.CharField((ans), max_length=1000)
    ans= ListTextField(
        base_field=CharField(max_length=250),
        blank = True,
    )


