from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from online_lab_app.users.permissions import IsInstructor, IsStudent
from .models import Lab, StudentProgress
from .serializers import LabSerializer, StudentProgressSerializer


class LabViewSet(ModelViewSet):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer
    permission_classes = [IsAuthenticated, IsInstructor]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class StudentProgressViewSet(ModelViewSet):
    queryset = StudentProgress.objects.all()
    serializer_class = StudentProgressSerializer
    permission_classes = [IsAuthenticated, IsStudent]
