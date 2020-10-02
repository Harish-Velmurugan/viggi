from rest_framework import serializers
from .models import *


class wikiSerializer(serializers.ModelSerializer):
    class Meta:
        model=wiki
        fields='__all__'
        

class editwikiSerializer(serializers.ModelSerializer):
    class Meta:
        model=wiki
        fields=['username','title','body','html','domain']
# class detailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=detail
#         fields='__all__'
        
# class subParaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=subPara
#         fields='__all__'
        
# class  detailImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=detailImage
#         fields='__all__'
        
# class subParaImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=subParaImage
#         fields='__all__'

# class viewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Post
#         fields='__all__'