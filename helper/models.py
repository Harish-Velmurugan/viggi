from django.db import models
from django.db.models import IntegerField, Model, CharField
from django_mysql.models import ListCharField, ListTextField
from cloudinary_storage.storage import RawMediaCloudinaryStorage
from users.models import CustomUser

# Create your models here.
class DataProviderReq(models.Model):
    reqID = models.AutoField(primary_key = True)
    domain = models.CharField(max_length = 50, null =True)
    title = models.CharField(max_length = 150)
    requestor = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE, default=None)
    purpose = models.CharField(max_length = 500)
    budget = models.IntegerField(default = 0)
    attach = models.FileField(upload_to='documents',storage=RawMediaCloudinaryStorage())
    accept = models.BooleanField(default = False)
    paid = models.BooleanField(default=False)
    verify = models.BooleanField(default=False)
    vendor = models.CharField(max_length = 50,default=None)
    techno = ListTextField(base_field=models.CharField(max_length=50), blank=True)
    time = ListTextField(base_field=models.CharField(max_length=50), blank=True)
    quantity = ListTextField(base_field=models.CharField(max_length=50), blank=True)
    Stype = ListTextField(base_field=models.CharField(max_length=50), blank=True)
    core = ListTextField(base_field=models.CharField(max_length=50), blank=True)
    os = ListTextField(base_field=models.CharField(max_length=50), blank=True)
    speed = ListTextField(base_field=models.CharField(max_length=50), blank=True)
    storage = ListTextField(base_field=models.CharField(max_length=50), blank=True)
    depend = ListTextField(base_field=models.CharField(max_length=250), blank=True)

class DPInvolved(models.Model):
    user = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE)
    reqID = models.ForeignKey(to=DataProviderReq, on_delete=models.CASCADE)
    doc = models.FileField(upload_to='documents',storage=RawMediaCloudinaryStorage(),null=True)

class Quote(models.Model):
    reqID = models.ForeignKey(to=DataProviderReq, on_delete=models.CASCADE)
    quote = models.IntegerField(default = 0)
    name = models.CharField(max_length = 50,default=None)
    paid = models.BooleanField(default=False)
