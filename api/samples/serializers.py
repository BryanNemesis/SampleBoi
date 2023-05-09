from samples.models import Sample

from rest_framework.serializers import ModelSerializer


class SampleListSerializer(ModelSerializer):
    class Meta:
        model = Sample
        fields = ["name", "mode", "color", "file_url", "time_added", "clicks"]


class SampleCreateSerializer(ModelSerializer):
    class Meta:
        model = Sample
        fields = ["name", "mode", "color", "file_url"]
