from django.db import models
import uuid
from django_mysql.models import ListTextField, ListCharField
from django.db.models import IntegerField, Model, CharField
import jsonfield


class MonitorSolution(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    solutionId = models.CharField(max_length=15)
    metrics = models.TextField()
    # metrics = ListCharField(
    #     base_field=CharField(max_length=100),
    #     size=15,
    #     max_length=(15 * 150))
    # json = jsonfield.JSONField()

    def __str__(self):
        return str(self.id)


class MonitorSolutionData(models.Model):
    #id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    solutionId = models.CharField(max_length=15)
    metrics = models.TextField()

    def __str__(self):
        return str(self.id)
