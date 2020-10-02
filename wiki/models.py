from django.db import models
from users.models import CustomUser
from users.models import CustomUser
from django.db.models import IntegerField, Model, CharField
from django_mysql.models import ListTextField
from cloudinary_storage.storage import RawMediaCloudinaryStorage




# Create your models here.
class wiki(models.Model):
    username= models.ForeignKey(to=CustomUser,on_delete=models.CASCADE)
    domain=models.CharField(max_length=70,blank=True,null=True)
    title=models.CharField(max_length=70,blank=True,null=True)
    body=models.TextField(blank=True)
    html=models.TextField(blank=True)
    like=models.IntegerField(default=0)
    dislike=models.IntegerField(default=0)

    likeCounter=models.IntegerField(default=100)

    viewers=ListTextField(
        base_field=CharField(max_length=100),
        size=5,blank=True)
    published=models.BooleanField(default=False)
    likeList=ListTextField(
        base_field=CharField(max_length=1000),
        blank = True,
        #null = True,
    )
    dislikeList=ListTextField(
        base_field=CharField(max_length=1000),
        blank = True,
        #null = True,
    )
    editHistory=ListTextField(
        base_field=CharField(max_length=1000),
        blank = True,
        #null = True,
    )
# class detail(models.Model):
#     wikiId=models.ForeignKey(to=wiki,on_delete=models.CASCADE)
#     subheading=models.TextField(blank=True)
#     para=models.TextField(blank=True)

# class subPara(models.Model):
#     wikiId=models.ForeignKey(to=wiki,on_delete=models.CASCADE)
#     detailId=models.ForeignKey(to=detail,on_delete=models.CASCADE)
#     para=models.TextField(blank=True)

# class detailImage(models.Model):
#      detailId=models.OneToOneField(to=detail,on_delete=models.CASCADE)
#      wikiId=models.ForeignKey(to=wiki,on_delete=models.CASCADE)
#      image=models.ImageField(upload_to="wikidetailimage/",blank=True)

# class subParaImage(models.Model):
#      subParaId=models.OneToOneField(to=subPara,on_delete=models.CASCADE)
#      wikiId=models.ForeignKey(to=wiki,on_delete=models.CASCADE)
#      image=models.ImageField(upload_to="wiksubparaimage/",blank=True)



