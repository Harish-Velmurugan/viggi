from .models import Solution
from rest_framework import viewsets, permissions
from .serializers import SolutionSerializer


class SolutionViewSet(viewsets.ModelViewSet):
    queryset = Solution.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer= SolutionSerializer

