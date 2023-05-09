from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from samples.models import Sample
from samples.serializers import SampleSerializer, SampleCreateSerializer
from samples.s3 import upload_file_to_s3


class SampleViewSet(ModelViewSet):
    queryset = Sample.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        return (
            SampleCreateSerializer
            if self.request.method == "POST"
            else SampleSerializer
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

    @action(detail=True, methods=["post"])
    def add_click(self, _, pk=None):
        try:
            sample = Sample.objects.get(pk=pk)
        except Sample.DoesNotExist:
            return Response(status=404)

        try:
            sample.clicks += 1
            sample.save()
            return Response()
        except Exception as e:
            return Response(status=500, exception=e)
