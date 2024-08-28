from django.urls import path

from .views import RegistrationView

urlpatterns = [
    path("v1/iot-registration", RegistrationView.as_view(), name="iot-registration"),
]
