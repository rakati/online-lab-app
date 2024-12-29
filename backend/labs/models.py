from django.db import models


class LabConfiguration(models.Model):
    name = models.CharField(max_length=255)
    docker_image = models.CharField(max_length=255)
    tutorial_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
