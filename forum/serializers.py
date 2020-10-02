from rest_framework import serializers
from .models import ForumPost,ForumAnswer

class ForumPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumPost
        fields = '__all__'        

class ForumAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumAnswer
        fields = '__all__'        
       

   