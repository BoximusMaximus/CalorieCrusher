from rest_framework import serializers

from .models import Food, ExternalFood, Meal, Day


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = "__all__"
        read_only_fields = ["owner", "id"]

class ExternalFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExternalFood
        fields = ["food_id"]


class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = "__all__"

class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = "__all__"
        read_only_fields = ["owner"]