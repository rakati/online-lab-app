from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from online_lab_app.users.permissions import IsInstructor, IsStudent
from .models import Lab, StudentProgress
from .serializers import LabSerializer, StudentProgressSerializer


class LabViewSet(ModelViewSet):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        user = self.requrest.user

        if user.is_instructor:
            return Lab.objects.filter(
                models.Q(created_by=user) | models.Q(status="PUBLISHED")
            ).distinct()
        else:
            return Lab.objects.filter(
                models.Q(status="PUBLISHED") | models.Q(participants=user)
            ).distinct()

    @action(detail=True, methods=["post"], url_path="subscribe")
    def subscribe(self, request, pk=None):
        lab = self.get_object()
        user = request.user
        lab.participants.add(user)
        lab.save()
        return Response({"status": "subscribed"})

    @action(detail=True, methods=["post"], url_path="unsubscribe")
    def unsubscribe(self, request, pk=None):
        lab = self.get_object()
        user = request.user
        lab.participants.remove(user)
        return Response({"status": "unsubscribed"})


class StudentProgressViewSet(ModelViewSet):
    queryset = StudentProgress.objects.all()
    serializer_class = StudentProgressSerializer
    permission_classes = [IsAuthenticated, IsStudent]
