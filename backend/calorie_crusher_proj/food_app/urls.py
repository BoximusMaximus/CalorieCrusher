from django.urls import path
from .views import *

urlpatterns = [
    path("food/", AllFoods.as_view(), name="all_foods"),
    path("food/type/<str:food_type>/",
        FoodByType.as_view(),
        name="foods_by_type",
    ),
    path("food/<int:food_id>/", FoodById.as_view(), name="a_food"),

    path("meal/", AllMeals.as_view(), name="all_meals"),

    path("day/", AllDays.as_view(), name="all_days"),
]