from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import MonitorSolutionSerializer, MonitorSolutionDataSerializer

from .models import MonitorSolution, MonitorSolutionData
import json
logList = {}


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'AddMetrics': '/addmetrics/',
    }

    return Response(api_urls)


@api_view(['POST'])
def createSolutionMonitorApi(request):
    serializer = MonitorSolutionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    res = "127.0.0.1/"

    return Response(serializer.data)


@api_view(['POST'])
def monitorApiAdd(request):
    serializer = MonitorSolutionDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['GET'])
def monitorApiGet(request):
    # print("hello")
    metrics = MonitorSolution.objects.get(solutionId=5)
    log = MonitorSolutionData.objects.filter(solutionId=5)

    logs = []
    for i in log:
        logs.append(i.metrics)

    # logs = ['{"id":"1","date":"","Kilometer":"150","Mileage":"55","Engine Temperture":"50","Noise":"30"}', '{"id":"1","date":"","Kilometer":"150","Mileage":"55","Engine Temperture":"40","Noise":"35"}',
        # '{"id":"1","date":"","Kilometer":"100","Mileage":"40","Engine Temperture":"35","Noise":"130"}', '{"id":"1","date":"","Kilometer":"100","Mileage":"50","Engine Temperture":"10","Noise":"30"}', '{"id":"1","date":"","Kilometer":"50","Mileage":"45","Engine Temperture":"100","Noise":"50"}']
    # print(metrics.metrics.split(",/$/"))
    parameters = []
    logJson = []
    output = []

    for metric in metrics.metrics.split(",/$/"):
        if metric != '':
            if metric[0] == ',':
                y = json.loads(metric[1:])
            else:
                y = json.loads(metric)
            # print(y['name'])
            # print(y['minValue'])
            # print(y['maxValue'])
            parameters.append(y)

    for log in logs:
        print(log)
        logJson.append(json.loads(log))

    for i in range(len(parameters)):
        name = parameters[i]['name']
        minValue = parameters[i]['minValue']
        maxValue = parameters[i]['maxValue']

        successCount = 0

        newlog = []

        for log in logJson:
            value = log[name]
            if(value >= minValue and value <= maxValue):
                status = True
                successCount = successCount+1
            else:
                status = False

            newlog.append(
                {'id': log['id'], 'date': log['date'], 'value': value, 'status': status})

        logList[name] = newlog

        successPecentage = round((successCount/len(logJson))*100, 2)

        if(successPecentage > 60):
            status = True
        else:
            status = False
        output.append({'name': name,
                       'value': successPecentage, 'status': status})

    # print(output)
    # print(logList)

    return Response(output)


@api_view(['POST'])
def dele(request):
    task = MonitorSolutionData.objects.filter(solutionId=4)
    task.delete()
    return Response({"": ""})


@api_view(['GET'])
def getParameterLog(request, parameter):
    return Response(logList[parameter])
