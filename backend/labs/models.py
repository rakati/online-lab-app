from django.db import models
from django.conf import settings
from django.db.models import JSONField
from django.utils.text import slugify


class Lab(models.Model):
    """Implement lab configuration model"""

    STATUS_CHOICES = (
        ("DRAFT", "Draft"),
        ("PUBLISHED", "Published"),
    )

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    image = models.ImageField(upload_to="labs/", blank=True, null=True)

    description = models.TextField(blank=True, default="")
    instructions = models.TextField(blank=True, default="")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="DRAFT",
        help_text="Indicates if the lab is published or still in draft.",
    )

    packages = JSONField(default=list, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    participants = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="joined_labs", blank=True
    )

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class StudentProgress(models.Model):
    """Implement Student progress model"""

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE)
    time_spent = models.DurationField(default=0)
    started_at = models.DateTimeField(auto_now_add=True)
