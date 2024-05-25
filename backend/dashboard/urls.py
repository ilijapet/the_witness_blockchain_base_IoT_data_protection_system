from django.urls import path


from .views import OrderView


app_name = "dashboard"


urlpatterns = [
    path('dashboard/', OrderView.as_view(), name="dashboard"),
]
