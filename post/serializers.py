from rest_framework import serializers,fields
from .models import Post,ExtendDays,PostExpert, Tree
from django.conf import settings

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        #fields = '__all__'
        fields=('username','problemId','title','description','RnD_Budget','deadline','skill','files','img', 'viewers')


class PostSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'    
    
class PostExpertSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostExpert
        fields = '__all__' 

class ExtendDaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendDays
        fields = '__all__'        

class TreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tree
        fields = '__all__'  
