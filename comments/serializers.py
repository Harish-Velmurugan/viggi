from rest_framework import serializers
from .models import PostComments, ReplyComments


class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComments
        fields = '__all__'


class ReplyCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplyComments
        fields = '__all__'
