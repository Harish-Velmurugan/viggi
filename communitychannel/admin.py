from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(CommunityChat)
admin.site.register(CommunityList)

# Register your models here.
admin.site.register(PostComments)
admin.site.register(ReplyComments)
