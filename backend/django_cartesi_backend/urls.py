from dashboard.views import OrderView
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/", include("users.urls")),
    path("api/dashboard/", include("dashboard.urls"), name="dashboard"),
    #  JWT token generation paths
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/order/", OrderView.as_view(), name="order"),
    path("api/", include("bridge.urls"), name="bridge"),
    path("api/", include("iot_registration.urls"), name="iot-registration"),
]
