from rest_framework.routers import DefaultRouter
from samples import views


router = DefaultRouter()
router.register("", views.SampleViewSet, basename="samples")
urlpatterns = router.urls
