from rest_framework import serializers
from post.models import Post
#from myprofile.models import profile

class dserializer1(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '_all_'

class dserializer2(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '_all_'