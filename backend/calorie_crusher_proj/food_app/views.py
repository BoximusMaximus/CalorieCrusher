from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
import requests

from client_app.services import FatSecretTokenError, get_fatsecret_token
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

class CreateExternalFood(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        new_food = ExternalFoodSerializer(data=request.data)
        if new_food.is_valid():
            new_food.save(owner=request.user)
            return Response(
                new_food.data,
                status=status.HTTP_201_CREATED,
        )
        else:
            return Response(new_food.errors, status=status.HTTP_400_BAD_REQUEST)

class SearchFatsecretFoods(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        search_expression = request.query_params.get("query", "").strip()

        if not search_expression:
            return Response(
                {"error": "The q query parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        params = {
            "method": "foods.search",
            "search_expression": search_expression,
            "format": "json",
        }

        def send_search(token):
            return requests.get(
                "https://platform.fatsecret.com/rest/server.api",
                headers={
                    "Authorization": f"Bearer {token}",
                    "Accept": "application/json",
                },
                params=params,
                timeout=10,
            )

        try:
            token, _, _ = get_fatsecret_token(request.user)
            upstream_response = send_search(token)

            # Handles a revoked token or clock mismatch as well as local expiry.
            if upstream_response.status_code == 401:
                token, _, _ = get_fatsecret_token(
                    request.user,
                    force_refresh=True,
                )
                upstream_response = send_search(token)

        except FatSecretTokenError as exc:
            return Response(
                {"error": str(exc)},
                status=exc.status_code,
            )
        except requests.RequestException:
            return Response(
                {"error": "Could not connect to FatSecret"},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        if not upstream_response.ok:
            return Response(
                {
                    "error": "FatSecret food search failed",
                    "upstream_status": upstream_response.status_code,
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        try:
            response_data = upstream_response.json()
        except ValueError:
            return Response(
                {"error": "FatSecret returned an invalid response"},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        return Response(response_data, status=status.HTTP_200_OK)
