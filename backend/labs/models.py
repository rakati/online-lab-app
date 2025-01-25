from django.db import models
from django.conf import settings


class Lab(models.Model):
    """Implement lab configuration model"""

    title = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class StudentProgress(models.Model):
    """Implement Student progress model"""

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE)
    time_spent = models.DurationField(default=0)
    started_at = models.DateTimeField(auto_now_add=True)
