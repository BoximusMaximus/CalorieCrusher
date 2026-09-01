from django.test import Client, TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token

from client_app.models import Client as ClientModel
from food_app.models import Food


class TestCreateFood(TestCase):
    def setUp(self):
        self.user = ClientModel.objects.create_user(
            username="Cody83337",
            email="chris83337@gmail.com",
            password="CodyBoxMan",
        )
        self.token = Token.objects.create(user=self.user)
        self.client = Client()
        self.auth = {
            "HTTP_AUTHORIZATION": f"Token {self.token.key}"
        }

    def test_02_create_food(self):
        food_data = {
            "name": "Nanner",
            "food_type": "FR",
            "kcal": 69,
            "saturated_fat": 69,
            "trans_fat": 69,
            "cholesterol": 69,
            "fiber": 69,
            "sugar": 69,
            "protein": 69,
        }

        response = self.client.post(
            reverse("create_food"),
            data=food_data,
            content_type="application/json",
            **self.auth,
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["name"], "Nanner")
        self.assertEqual(response.json()["owner"], self.user.id)

        self.assertTrue(
            Food.objects.filter(
                name="Nanner",
                owner=self.user,
            ).exists()
        )