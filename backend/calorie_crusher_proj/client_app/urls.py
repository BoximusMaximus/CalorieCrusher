from django.urls import path
from .views import *

urlpatterns = [
    path("signup/", Sign_Up.as_view(), name="signup"),
    path("login/", Log_in.as_view(), name="login"),
    path("logout/", Log_out.as_view(), name="logout"),
    path("me/", Info.as_view(), name="info"),
    path("gentoken/", Generate_FatSecret_Token.as_view(), name="generatetoken")
]
