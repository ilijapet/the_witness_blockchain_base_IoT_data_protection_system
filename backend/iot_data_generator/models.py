from django.db import models



class Car(models.Model):
    uuid = models.CharField(primary_key=True, max_length=100)
    brake_status = models.BooleanField(default=False)
    tires_status = models.BooleanField(default=False)
    engine_status = models.BooleanField(default=False)
    distance = models.IntegerField(default=0)
    create_at = models.DateTimeField(auto_now_add=True)
