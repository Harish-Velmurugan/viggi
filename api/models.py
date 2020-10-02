from django.db import models
from users.models import CustomUser
# Create your models here.

class Transactions(models.Model):
    username = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE)
    email = models.CharField(max_length=40, default='')
    orderId = models.CharField(max_length=40, default='')
    time = models.CharField(max_length=40, default='')
    amount = models.FloatField(default= 0.00)



class WalletDashboard(models.Model):
    username = models.OneToOneField(to=CustomUser, on_delete=models.CASCADE)
    email = models.CharField(max_length=40 ,default='')
    cash = models.FloatField(default= 0.00)
    reputation_points = models.IntegerField(default=0)


