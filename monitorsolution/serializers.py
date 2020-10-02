from rest_framework import serializers
from .models import MonitorSolution, MonitorSolutionData


class MonitorSolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonitorSolution
        fields = '__all__'


class MonitorSolutionDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonitorSolutionData
        fields = '__all__'
