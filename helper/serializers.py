from rest_framework import serializers
from .models import DataProviderReq,DPInvolved,Quote

class DataProviderReqSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataProviderReq
        fields = '__all__'        

class DPInvolvedSerializer(serializers.ModelSerializer):
    class Meta:
        model = DPInvolved
        fields = '__all__'

class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = '__all__'