from django.contrib import admin
from .models import ForumPost, ForumAnswer
# Register your models here.
admin.site.register(ForumPost)
admin.site.register(ForumAnswer)