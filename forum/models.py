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
from cloudinary_storage.storage import RawMediaCloudinaryStorage

# Create your models here.
class ForumPost(models.Model):
    username = models.ForeignKey(
        to=CustomUser, on_delete=models.CASCADE, db_column='username')
    postId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    desc = models.CharField(max_length=500)
    posteddate = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(upload_to='problem_images')
    budget = models.CharField(max_length=500)
    ans_count = models.IntegerField(null=False, default=0)
    files = models.FileField(
        upload_to='file', storage=RawMediaCloudinaryStorage())        
    buckets = models.CharField( max_length=100)
    refined = models.BooleanField(default = False)


    def __str__(self):
        return self.title

class ForumAnswer(models.Model):
    username = models.ForeignKey(
        to=CustomUser, on_delete=models.CASCADE, db_column='username')
    postId = models.ForeignKey(
        to=ForumPost, on_delete=models.CASCADE, db_column='postId')
    keyword = models.CharField(max_length=15)
    buckets =  models.CharField(max_length=15)
    msg = models.CharField(max_length=500)
    citaton_abt = models.CharField(max_length=15,null=True)
    citation = models.CharField(max_length=200,null=True)
    upvoters=ListTextField(
        base_field=IntegerField(),
        size=5, blank=True,)
    upvotes = models.IntegerField(null=False, default=0)
    downvoters=ListTextField(
        base_field=IntegerField(),
        size=5, blank=True,)
    
    downvotes = models.IntegerField(null=False, default=0)
