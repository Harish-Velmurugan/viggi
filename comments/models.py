from django.db import models
import uuid


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
