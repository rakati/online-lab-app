from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LabViewSet, StudentProgressViewSet

router = DefaultRouter()
router.register(r"", LabViewSet, basename="labs")
router.register(r"progress", StudentProgressViewSet, basename="progress")

urlpatterns = [
    path("", include(router.urls)),
]
