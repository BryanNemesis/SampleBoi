from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny

from samples.models import Sample
from samples.serializers import SampleListSerializer, SampleCreateSerializer


class SampleList(ListCreateAPIView):
    queryset = Sample.objects.all()
    ermission_classes = [AllowAny]

    def get_serializer_class(self):
        return (
            SampleCreateSerializer
            if self.request.method == "POST"
            else SampleListSerializer
        )
