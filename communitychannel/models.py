from django.db import models
import uuid
from users.models import CustomUser
from cloudinary_storage.storage import RawMediaCloudinaryStorage
from django_mysql.models import ListTextField, ListCharField
from django.db.models import IntegerField, Model, CharField


class CommunityList(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)lol id nu erkanave ieukum athanprob
    #  = models.CharField(primary_key=True, max_length=15)
    username = models.ForeignKey(
        to=CustomUser, on_delete=models.CASCADE, db_column='username')
    communityName = models.CharField(max_length=25)
    communityDescription = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(
        upload_to='communityImg/')
    usersUnapproved = ListTextField(
        base_field=IntegerField(),
        blank=True,
        # null=True,
    )
    usersApproved = ListTextField(
        base_field=IntegerField(),
        blank=True,
        # null=True,
    )

    def __str__(self):
        return str(self.id)


class CommunityChat(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.run pannuuuid4, editable=False)run panave error varutha or ? create panna bodhu dha varudhu ipo create pannu na pakren apo pakala be la direct ah add pannu ipo athula papom
    # id = models.CharField(primary_key=True, max_length=15)
    username = models.ForeignKey(
        to=CustomUser, on_delete=models.CASCADE, db_column='username')
    name = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)
    body = models.TextField()
    channelId = models.CharField(max_length=85)
    profileImg = models.CharField(max_length=200, default="")
    img = models.ImageField(
        upload_to='communityChatImg/', blank="true", null="true")
    likes = ListTextField(
        base_field=IntegerField(),
        blank=True,
        # null=True,
    )

    def __str__(self):
        return str(self.id)


class PostComments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    problemId = models.CharField(max_length=15)
    username = models.CharField(max_length=15)
    name = models.CharField(max_length=30)
    body = models.CharField(max_length=500)
    profileImage = models.CharField(max_length=200)
    date = models.CharField(max_length=50, default='')

    def __str__(self):
        return self.id


class ReplyComments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    commentId = models.CharField(max_length=40)
    username = models.CharField(max_length=15)
    name = models.CharField(max_length=30)
    body = models.CharField(max_length=500)
    profileImage = models.CharField(max_length=200)
    date = models.CharField(max_length=50, default='')

    def __str__(self):
        return self.id
