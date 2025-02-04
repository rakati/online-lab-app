from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .theia_utils import run_theia_container
from django.db.models import Q
from online_lab_app.users.permissions import IsInstructor, IsStudent
from .models import Lab, StudentProgress
from .serializers import LabSerializer, StudentProgressSerializer, LabListSerializer


class LabViewSet(ModelViewSet):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "list":
            return LabListSerializer
        return LabSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        user = self.request.user

        if user.role == "instructor" or "admin":
            return Lab.objects.filter(
                Q(created_by=user) | Q(status="PUBLISHED")
            ).distinct()
        else:
            return Lab.objects.filter(
                Q(status="PUBLISHED") | Q(participants=user)
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

    @action(detail=True, methods=["post"], url_path="start-lab")
    def start_lab(self, request, pk=None):
        """
        custom endpoint triggers the container for Theia.
        """
        lab = self.get_object()
        user = request.user

        if not lab.participants.filter(id=user.id).exists():
            lab.participants.add(user)

        # Construct container_name, port, workspace_dir
        container_name = f"theia_{user.id}_{lab.id}"
        port = 4000  # or dynamic
        workspace_dir = f"user_{user.id}_lab_{lab.id}"

        # packages = lab.packages  # might be a list from the DB
        container = run_theia_container(container_name, port, workspace_dir)
        return Response(
            {
                "status": "running",
                "containerName": container_name,
                "port": port,
                "url": f"http://{request.get_host()}:{port}",
            }
        )


class StudentProgressViewSet(ModelViewSet):
    queryset = StudentProgress.objects.all()
    serializer_class = StudentProgressSerializer
    permission_classes = [IsAuthenticated, IsStudent]
