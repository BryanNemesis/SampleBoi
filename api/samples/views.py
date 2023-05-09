from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny

from samples.models import Sample
from samples.serializers import SampleListSerializer, SampleCreateSerializer
from samples.s3 import upload_file_to_s3


class SampleList(ListCreateAPIView):
    queryset = Sample.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        return (
            SampleCreateSerializer
            if self.request.method == "POST"
            else SampleListSerializer
        )

    def create(self, request, *args, **kwargs):
        # for now, strip the url field
        try:
            request.data.pop("url")
        except:
            pass

        file = request.data.pop("file")[0]
        file_url = upload_file_to_s3(file)
        request.data["file_url"] = file_url

        return super().create(request, *args, **kwargs)
