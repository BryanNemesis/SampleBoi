from django.db import models


class Sample(models.Model):
    mode_choices = (("ONESHOT", "oneshot"), ("START_STOP", "start/stop"))

    name = models.CharField(max_length=50)
    mode = models.CharField(max_length=50, choices=mode_choices)
    color = models.CharField(max_length=8)
    file_url = models.URLField()
    time_added = models.DateTimeField(auto_now_add=True)
    clicks = models.IntegerField(default=0)
