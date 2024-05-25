from django.db import models


class OrderHistory(models.Model):
    created_at = models.DateTimeField(auto_now=True)
    user_identifier = models.CharField(max_length=255, null=True, blank=True)
    user_name = models.CharField(max_length=255, null=True, blank=True)
    organization = models.CharField(max_length=255, null=True, blank=True)
    amount = models.FloatField()
