from django.urls import path
from .views import *

urlpatterns = [
    path("", AllFoods.as_view(), name="all_foods"),
    path(
        "food_type/<str:food_type>/",
        FoodByType.as_view(),
        name="foods_by_type",
    ),
    path("<int:item_id>/", FoodById.as_view(), name="a_food"),
]