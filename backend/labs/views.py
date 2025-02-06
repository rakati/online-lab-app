from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .theia_utils import run_theia_container
from django.db.models import Q
from online_lab_app.users.permissions import IsInstructor, IsStudent
from .models import Lab, StudentProgress
from .serializers import LabSerializer, StudentProgressSerializer, LabListSerializer


class LabViewSet(ModelViewSet):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer
    permission_classes = [AllowAny]

    def get_permissions(self):
        """
        Only require auth for create/update/subscribe, but not for GET.
        """
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.action == "list":
            self.permission_classes = []
            return LabListSerializer
        return LabSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        # user = self.request.user
        # Q(participants=user
        return Lab.objects.filter(Q(status="PUBLISHED")).distinct()

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

    @action(detail=True, methods=["post"], url_path="start")
    def start_lab(self, request, pk=None):
        """
        custom endpoint triggers the container for Theia.
        """
        lab = self.get_object()
        user = request.user
        serializer = LabSerializer(lab, context={"request": request})

        if not lab.participants.filter(id=user.id).exists():
            lab.participants.add(user)

        # Construct container_name, port, workspace_dir to avoid name collision
        container_name = f"theia_{user.id}_{lab.id}"
        # TODO make the port dynamic to support multiple users on the same time
        port = 4002
        workspace_dir = f"user_{user.id}_lab_{lab.id}"

        # TODO install package defined in lab.packages
        container = run_theia_container(container_name, port, workspace_dir)

        # TODO store container info in db to track activities
        return Response(
            {
                "status": "running",
                "lab": serializer.data,
                "container_name": container_name,
                "port": port,
                "url": f"http://localhost:{port}",
            }
        )


class StudentProgressViewSet(ModelViewSet):
    queryset = StudentProgress.objects.all()
    serializer_class = StudentProgressSerializer
    permission_classes = [IsAuthenticated, IsStudent]
