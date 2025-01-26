from django.urls import path
from .views import AssignRoleView, RegisterView, ProfileView, ChangePasswordView

urlpatterns = [
    path("assign-role/", AssignRoleView.as_view(), name="assign_role"),
    path("register/", RegisterView.as_view(), name="register"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("change-password/", ChangePasswordView.as_view(), name="change_password"),
]
