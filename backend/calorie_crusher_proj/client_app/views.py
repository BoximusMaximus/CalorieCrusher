from django.shortcuts import render
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404


from .models import Client
from .serializers import ClientSerializer
from food_app.models import Day

# Create your views here.
class Sign_Up(APIView):
    def post(self, request):
        new_user_data = request.data

        new_client_inst = Client.objects.create_user(
            username=new_user_data.get("username"),
            email=new_user_data.get("email"),
            password= new_user_data.get("password")
        )

        Day.objects.create(client=new_client_inst)
        token_inst = Token.objects.create(user=new_client_inst)

        return Response(
            {
                "client": new_client_inst.username,
                "token": token_inst.key,
            },
            status=status.HTTP_201_CREATED,
        )
class Log_in(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        client = authenticate(
            username=username,
            password=password,
        )

        if not client:
            return Response(
                "Invalid credentials",
                status=status.HTTP_401_UNAUTHORIZED,
            )

        token, created = Token.objects.get_or_create(user=client)

        return Response(
            {
                "client": client.username,
                "token": token.key,
            },
            status=status.HTTP_200_OK,
        )
    

class Log_out(APIView):

    def post(self, request):
        request.auth.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )

class Info(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        client = get_object_or_404(Client, id=request.user.id, username=request.user.username)
        serializer = ClientSerializer(client)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )