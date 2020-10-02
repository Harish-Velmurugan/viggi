from rest_framework import serializers
from .models import Description,Contract,SolverDescription,SolverContract

class DescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = '__all__'

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'

        
class SolverDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolverDescription
        fields = '__all__'

class SolverContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolverContract
        fields = '__all__'
      
