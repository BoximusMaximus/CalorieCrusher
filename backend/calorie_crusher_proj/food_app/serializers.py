from rest_framework import serializers

from .models import Food, Meal


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = "__all__"
        read_only_fields = ["owner", "id"]

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = "__all__"
        read_only_fields = ["owner", "id"]

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = "__all__"
