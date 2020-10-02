from django.contrib import admin
from .models import LORRequest,generateLorAccept,generateLorReject
# Register your models here.
admin.site.register(LORRequest)
admin.site.register(generateLorAccept)
admin.site.register(generateLorReject)
