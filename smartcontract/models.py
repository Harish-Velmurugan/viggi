from django.db import models
from users.models import CustomUser
from post.models import Post

from solutions.models import Solution

# Create your models here.
class Contract(models.Model):
    contractNumber = models.AutoField(primary_key=True)
    problem = models.OneToOneField(to=Post,on_delete=models.CASCADE) # onetoone
    agreed = models.BooleanField(default=False)

class Description(models.Model):
    contract = models.ForeignKey(to=Contract,on_delete=models.CASCADE)
    username = models.ForeignKey(to=CustomUser,on_delete=models.CASCADE)
    
    solution = models.OneToOneField(to=Solution,on_delete=models.CASCADE) #onetoone
    revenue = models.FloatField()
    agreed = models.BooleanField(default=False)

    
class SolverContract(models.Model):
    contractNumber = models.AutoField(primary_key=True)
    problem = models.ForeignKey(to=Post,on_delete=models.CASCADE)
    agreed = models.BooleanField(default=False)
    solution = models.OneToOneField(to=Solution,on_delete=models.CASCADE) #onetoone

class SolverDescription(models.Model):
    contract = models.ForeignKey(to=SolverContract,on_delete=models.CASCADE)
    username = models.ForeignKey(to=CustomUser,on_delete=models.CASCADE)
       
    revenue = models.FloatField()
    agreed = models.BooleanField(default=False)
   
    



