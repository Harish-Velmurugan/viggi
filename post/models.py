from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from unittest.util import _MAX_LENGTH
from getpass import getuser
from datetime import datetime, timedelta
from multiselectfield import MultiSelectField
from django_mysql.models import ListCharField, ListTextField
from django.db.models import CharField, Model, IntegerField
from users.models import CustomUser 
from updateapi.models import ExpertPanel,ExpertHelp
from cloudinary_storage.storage import RawMediaCloudinaryStorage
from forum.models import ForumPost


class Post(models.Model):

    username = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE, db_column='username')
    # unique id for each problem
    problemId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    RnD_Budget = models.CharField(max_length=20)
    posteddate = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField(default=datetime.now())
    # skill=MultiSelectField(max_length=20, choices=SKILLS)
    # skill=models.CharField(choices=SKILLS,max_length=20)
    skill = ListCharField(
        base_field=CharField(max_length=20),
        size=5,
        max_length=(5 * 21))

    skill = models.CharField((skill), max_length=100)
    files = models.FileField(
        upload_to='file', storage=RawMediaCloudinaryStorage())
    img = models.ImageField(upload_to='problem_images')
    sol_count = models.IntegerField(default=0)
    solved = models.BooleanField(default=False)
    expired = models.BooleanField(default=False)
    chooseWinner = models.BooleanField(default=False)

    popularity = models.IntegerField(default=0)
    interested = ListTextField(
        base_field=IntegerField(),
        blank=True,
    )

    expert = models.IntegerField(default=0)
    
    requested = ListTextField(
        base_field=IntegerField(),
        blank=True,
    )
    viewers = ListTextField(
        base_field=IntegerField(),
        blank=True,
        #null = True,
    )
    paid = models.BooleanField(default=False)
    lor=ListTextField(
        base_field=IntegerField(),
        blank = True
    )
     
    topsolver=models.BooleanField(default=False)
    topsolverexpired=models.BooleanField(default=False)
    notified=models.BooleanField(default=False)
    topsolvernotified=models.BooleanField(default=False)

    RequestedTopSolver = ListTextField(
        base_field=IntegerField(),
        blank=True,
    )


    buckets= CharField(max_length=100, blank=True)
    def __str__(self):
        return self.title


class PostExpert(models.Model):
    
    username = models.ForeignKey(to=CustomUser,on_delete=models.CASCADE,db_column='username')
    expertHelp = models.ForeignKey(to=ExpertHelp,on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    description = models.TextField()
    bucket=models.CharField(max_length=50)
    posteddate = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    skill = models.CharField(max_length=1000)
    files=models.FileField(upload_to='file', storage=RawMediaCloudinaryStorage())
    img=models.ImageField(upload_to='problem_images')

class ExtendDays(models.Model):  
    username = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE)
    problemId = models.ForeignKey(
        to=Post, on_delete=models.CASCADE, db_column='problemId')
    days = models.IntegerField(null=False, default=0)

    reason = models.CharField(max_length=150)
    docs = models.FileField(upload_to='reason_docs')

    def _str_(self):
        return self.reason

class Tree(models.Model):
    username = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE, db_column='username')
    forumPost = models.OneToOneField(to=ForumPost, on_delete=models.CASCADE)
    treeBase = models.TextField(default="")
    treeCommon = models.TextField(default="")
