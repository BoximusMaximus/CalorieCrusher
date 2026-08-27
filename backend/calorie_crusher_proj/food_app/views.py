from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .models import Food,ExternalFood,Meal,Day
from .serializers import FoodSerializer, ExternalFoodSerializer, MealSerializer,DaySerializer

# Create your views here.
class AllDays(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        days = Day.objects.all().order_by("id")
        serializer = DaySerializer(days, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

class AllMeals(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        meals = Meal.objects.all().order_by("id")
        serializer = MealSerializer(meals, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

class AllFoods(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        foods = Food.objects.filter(
            owner=request.user
        ).order_by("id")
        serializer = FoodSerializer(foods, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

class AllExternalFoods(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        foods = ExternalFood.objects.filter(
            owner=request.user
        ).order_by("id")
        serializer = ExternalFoodSerializer(foods, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

class FoodById(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, food_id):
        food = get_object_or_404(Food, id=food_id, owner=request.user)
        serializer = FoodSerializer(food)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
    def put(self, request, food_id):
        food = get_object_or_404(Food, id=food_id, owner=request.user)
        new_food = FoodSerializer(food, data=request.data, partial=True)
        if new_food.is_valid():
            new_food.save()
            return Response(new_food.data, status=status.HTTP_200_OK)
        else:
            return Response(new_food.data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, food_id):
        food = get_object_or_404(
            Food,
            id=food_id,
            owner=request.user
        )

        food.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )

class ExternalFoodById(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, food_id):
        food = get_object_or_404(ExternalFood, id=food_id, owner=request.user)
        serializer = ExternalFoodSerializer(food)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def delete(self, request, food_id):
        food = get_object_or_404(
            ExternalFood,
            food_id=food_id,
            owner=request.user
        )

        food.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )

class FoodByType(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, food_type):
        foods = Food.objects.filter(
            food_type__iexact=food_type,
            owner=request.user
        ).order_by("id")

        serializer = FoodSerializer(foods, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
class CreateFood(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        new_food = FoodSerializer(data=request.data)
        if new_food.is_valid():
            new_food.save(owner=request.user)
            return Response(
                new_food.data,
                status=status.HTTP_201_CREATED,
        )
        else:
            return Response(new_food.errors, status=status.HTTP_400_BAD_REQUEST)

# class CreateExternalFood(APIView):
#     permission_classes = [IsAuthenticated]
#     def post(self, request, food_id):
#         new_food = ExternalFoodSerializer(data=request.data)
#         if new_food.is_valid():
#             new_food.save(owner=request.user)
#             return Response(
#                 new_food.data,
#                 status=status.HTTP_201_CREATED,
#         )
#         else:
#             return Response(new_food.errors, status=status.HTTP_400_BAD_REQUEST)
        
