from django.urls import path
from .views import AssignRoleView, RegisterView

urlpatterns = [
    path("assign-role/", AssignRoleView.as_view(), name="assign_role"),
    path("register/", RegisterView.as_view(), name="register"),
]
