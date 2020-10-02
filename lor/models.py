from django.db import models
from users.models import CustomUser 
from post.models import Post
# Create your models here.
class LORRequest(models.Model):
    username=models.ForeignKey(to=CustomUser,on_delete=models.CASCADE,db_column='username')
    problemId = models.ForeignKey(to= Post , on_delete= models.CASCADE,db_column='problemId') 
    reason=models.TextField()
    designation=models.TextField()
    firm=models.TextField()
    status=models.CharField(max_length=20)

class generateLorAccept(models.Model):
    requestId=models.ForeignKey(to=LORRequest,on_delete=models.CASCADE)
    aName=models.CharField(max_length=50)
    aDesignation=models.CharField(max_length=50)
    arequestingFirm=models.CharField(max_length=75)
    askills=models.CharField(max_length=75)
    projectTitle=models.CharField(max_length=100)
    sname=models.CharField(max_length=50)
    sDesignation=models.CharField(max_length=50)
    sOrganization=models.CharField(max_length=50)
    sIndustry=models.CharField(max_length=50)
    smobileNumber=models.CharField(max_length=50)
    semailId=models.CharField(max_length=50)
    sSealImage=models.FileField(upload_to="lor",blank=True)
    sSealName=models.CharField(max_length=50,blank=True,null=True)
    sLinkedIn=models.CharField(max_length=50,blank=True,null=True)
    rReason=models.TextField()
    trait1=models.CharField(max_length=50)
    trait2=models.CharField(max_length=50)
    trait3=models.CharField(max_length=50)
    date=models.CharField(max_length=50)
    gender=models.CharField(max_length=50)
    yoe=models.IntegerField()

class generateLorReject(models.Model):
    requestId=models.ForeignKey(to=LORRequest,on_delete=models.CASCADE)
    projectTitle=models.TextField()
    rejectReason=models.TextField()

    
    




