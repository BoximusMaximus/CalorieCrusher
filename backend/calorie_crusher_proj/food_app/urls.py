from django.urls import path
from .views import *

urlpatterns = [
    # My db Foods
    path("food/", AllFoods.as_view(), name="all_foods"),
    path("food/create/", CreateFood.as_view(), name="create_food"),
    path("food/type/<str:food_type>/",FoodByType.as_view(),name="foods_by_type"),
    path("food/<int:food_id>/", FoodById.as_view(), name="a_food"),

    #Fatsecret API Call
    path("external/food/search/", SearchFatsecretFoods.as_view(), name="search_fatsecret_foods"),

    # My db Meals
    path("meal/", AllMeals.as_view(), name="all_meals"),
    path("meal/create/", CreateMeal.as_view(), name="create_meal"),
    
]