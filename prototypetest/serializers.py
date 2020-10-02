from rest_framework import serializers
from .models import *

class createPrototypeTestSerializer(serializers.ModelSerializer):
    class Meta:
        model=createPrototypeTest
        fields='__all__'


class planningSerializer(serializers.ModelSerializer):
    class Meta:
        model=planning
        fields='__all__'
    


class prototypeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model=prototypeSubmission
        fields='__all__'



class ImplementationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Implementation
        fields='__all__'



class StepsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Steps
        fields='__all__'