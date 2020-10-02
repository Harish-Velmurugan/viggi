from rest_framework import serializers
from .models import LORRequest,generateLorAccept,generateLorReject

class LORRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=LORRequest
        fields='__all__'

class generateLorAcceptSerializer(serializers.ModelSerializer):
    class Meta:
        model=generateLorAccept
        fields='__all__'
class generateLorRejectSerializer(serializers.ModelSerializer):
    class Meta:
        model=generateLorReject
        fields='__all__'

