from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from samples import views

urlpatterns = [
    path('', views.SampleList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)