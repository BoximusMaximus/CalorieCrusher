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
    path("meal/<int:meal_id>/", MealById.as_view(), name="a_meal"),

    # FoodItemTable
    path("food_item/meal/<int:meal_id>/food/<int:food_id>/", AddFoodToMeal.as_view(), name="add_food_item_to_meal"),
    path("food_item/from_food/<int:food_id>/", FoodItemByFoodId.as_view(), name="get_or_delete_food_item"),
    path("food_item/by_meal/<int:meal_id>/", FoodItemsForMeal.as_view(), name="get_all_meal_food_items"),

    
]