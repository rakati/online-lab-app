from django.conf import settings
from django.urls import path, re_path, include, reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView
from rest_framework.routers import DefaultRouter
from .authentication.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from .users.views import UserViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path("api/token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # Includes browsable API login/logout Interface
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path(
        "api/users/", include("online_lab_app.users.urls")
    ),  # Include user-related URLs
    path("api/labs/", include("labs.urls")),  # Include lab-related URLs
    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    re_path(r"^$", RedirectView.as_view(url=reverse_lazy("api-root"), permanent=False)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# serve media files in development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
