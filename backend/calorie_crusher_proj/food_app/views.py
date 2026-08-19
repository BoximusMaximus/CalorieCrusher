from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Food,Meal,Day
from .serializers import FoodSerializer,MealSerializer,DaySerializer

# Create your views here.
class AllDays(APIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request):
        days = Day.objects.all().order_by("id")
        serializer = DaySerializer(days, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

class AllMeals(APIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request):
        meals = Meal.objects.all().order_by("id")
        serializer = MealSerializer(meals, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

class AllFoods(APIView):
    def get(self, request):
        foods = Food.objects.all().order_by("id")
        serializer = FoodSerializer(foods, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

class FoodById(APIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, food_id):
        food = get_object_or_404(Food, id=food_id)
        serializer = FoodSerializer(food)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
    def post(self, request, food_id):
        food = get_object_or_404(Food, id=food_id)

        Food.objects.create(food)


        return Response(
            status=status.HTTP_201_CREATED,
        )
    def delete(self, request, food_id):
        food = get_object_or_404(
            Food,
            food_id=food_id,
        )

        food.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )

class FoodByType(APIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, food_type):
        foods = Food.objects.filter(
            food_type__iexact=food_type,
        ).order_by("id")

        serializer = FoodSerializer(foods, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )