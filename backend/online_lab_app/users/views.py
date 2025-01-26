from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView
from .serializers import ProfileSerializer
from .models import User
from .permissions import IsUserOrCreatingAccountOrReadOnly
from .serializers import CreateUserSerializer, UserSerializer, RegisterSerializer


class UserViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """
    Updates and retrieves user accounts
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsUserOrCreatingAccountOrReadOnly,)

    def get_serializer_class(self):
        is_creating_a_new_user = self.action == "create"
        if is_creating_a_new_user:
            return CreateUserSerializer
        return self.serializer_class


class AssignRoleView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        user_id = request.data.get("user_id")
        role = request.data.get("role")

        if role not in ["admin", "instructor", "student"]:
            return Response({"error": "Invalid role"}, status=400)

        try:
            user = User.objects.get(id=user_id)
            user.role = role
            user.save()
            return Response({"success": "Role assigned successfully"})
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "birthday": user.birthday,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
