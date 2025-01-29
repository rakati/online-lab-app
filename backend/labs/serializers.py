from rest_framework import serializers
from .models import Lab, StudentProgress


class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = (
            "id",
            "title",
            "slug",
            "image",
            "description",
            "instructions",
            "status",
            "packages",
            "created_by",
            "created_at",
        )
        read_only_fields = ("created_by", "created_at")


class StudentProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProgress
        fields = "__all__"
