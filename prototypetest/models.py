from django.db import models
from django.db.models import IntegerField, Model, CharField
from users.models import CustomUser
from solutions.models import Solution
from django_mysql.models import ListCharField, ListTextField
from cloudinary_storage.storage import RawMediaCloudinaryStorage
# Create your models here.

class createPrototypeTest(models.Model):
    solutionId=models.OneToOneField(to=Solution,on_delete=models.CASCADE)
    pBuilder=models.IntegerField()
    pImplementer=models.IntegerField()
    started=models.BooleanField(default=False)
    # members=ListTextField(
    #     base_field=IntegerField(),
    #     blank=True,        
    # )#not used
    members=ListTextField(
        base_field=CharField(max_length=100),
        size=5,)
    members = models.CharField((members), max_length=500,blank=True)   
 
    step=models.IntegerField(default=0)
    completed=models.BooleanField(default=False)

class planning(models.Model):
    prototypeTestId=models.OneToOneField(createPrototypeTest,on_delete=models.CASCADE)
    budget=models.IntegerField()
    time=models.IntegerField()
    desc=models.TextField()
    sustainability=models.TextField()
    risk=models.TextField()
    ios=models.TextField()
    pImplementerAgree=models.BooleanField(default=False)

class prototypeSubmission(models.Model):
    prototypeTestId=models.OneToOneField(createPrototypeTest,on_delete=models.CASCADE)
    prototypeDesc=models.TextField()
    prototypeDoc = models.FileField(upload_to='prototype',null=True,storage=RawMediaCloudinaryStorage())
    steps=ListTextField(
        base_field=CharField(max_length=1000),
        size=20,
        null=True,
        blank=True,
        max_length=(20 * 1100)          
    )
    person=ListTextField(
        base_field=CharField(max_length=1000),
        size=20,
        null=True,
        blank=True,
        max_length=(20 * 1100)          
    )
    pImplementerAgree=models.BooleanField(default=False)


class Implementation(models.Model):
    prototypeTestId=models.OneToOneField(prototypeSubmission,on_delete=models.CASCADE)
    currentStep=models.IntegerField(default=0)

class Steps(models.Model):
    ImplementationId=models.ForeignKey(Implementation,on_delete=models.CASCADE)
    stepName=models.TextField()
    pBuilderAgree=models.BooleanField(default=False)
    pImplementerAgree=models.BooleanField(default=False) 
    pImplementerDoc = models.FileField(upload_to='prototypeImplementationpBuilder',null=True,blank=True,storage=RawMediaCloudinaryStorage())
    pBuilderDoc = models.FileField(upload_to='prototypeImplementationpImplementer',null=True,blank=True,storage=RawMediaCloudinaryStorage())
    person=models.IntegerField()#0-pilotBuilder,1-pilotImplementer,2-Both
    stepNo=models.IntegerField()
