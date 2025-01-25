import os
from .common import Common

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Local(Common):
    DEBUG = True

    # Testing
    INSTALLED_APPS = Common.INSTALLED_APPS

    # start ------ allowing drf to recognize jwt token
    CORS_ALLOWED_ORIGIN_REGEXES = [
        r"^https?://localhost(:[0-9]+)?$",  # Allow localhost with any port
        r"^https?://127\.0\.0\.1(:[0-9]+)?$",  # Allow 127.0.0.1 with any port
    ]
    CORS_EXPOSE_HEADERS = [
        "Authorization",
    ]
    # ------------ end drf
    # Mail
    EMAIL_HOST = "localhost"
    EMAIL_PORT = 1025
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
