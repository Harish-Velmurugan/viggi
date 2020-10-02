from rest_framework import serializers
from .models import CommunityChat, CommunityList, PostComments, ReplyComments


class CommunityChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityChat
        fields = '__all__'


class CommunityListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityList
        fields = '__all__'


class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComments
        fields = '__all__'


class ReplyCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplyComments
        fields = '__all__'
