from rest_framework import serializers
from .models import Lab, StudentProgress


class LabSerializer(serializers.ModelSerializer):
    creator_username = serializers.ReadOnlyField(
        source="created_by.username", read_only=True
    )
    is_participant = serializers.SerializerMethodField()
    participant_count = serializers.SerializerMethodField()

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
            "participant_count",
            "time",
            "skills",
            "difficulty",
            "language",
            "tags",
            "creator_username",
            "is_participant",
            "created_by",
            "created_at",
        )
        read_only_fields = ("created_by", "created_at", "participants", "slug")

    def get_is_participant(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.participants.filter(id=request.user.id).exists()
        return False

    def get_participant_count(self, obj):
        return obj.participants.count()


class LabListSerializer(serializers.ModelSerializer):
    description_snippet = serializers.SerializerMethodField()
    participant_count = serializers.SerializerMethodField()

    class Meta:
        model = Lab
        fields = (
            "id",
            "title",
            "image",
            "description_snippet",
            "participant_count",
            "time",
            "skills",
            "status",
            "difficulty",
            "language",
            "tags",
        )

    def get_description_snippet(self, obj):
        if len(obj.description) > 100:
            return obj.description[:100] + "..."
        return obj.description

    def get_participant_count(self, obj):
        return obj.participants.count()


class StudentProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProgress
        fields = "__all__"
