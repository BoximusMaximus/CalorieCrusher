from django.test import Client, TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token

from client_app.models import Client as ClientModel
from food_app.models import Meal


class TestCreateMeal(TestCase):
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

    def test_04_create_meal(self):
        response = self.client.post(
            reverse("create_meal"),
            data={"name": "Backfast"},
            content_type="application/json",
            **self.auth,
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["name"], "Backfast")
        self.assertEqual(response.json()["owner"], self.user.id)

        self.assertTrue(
            Meal.objects.filter(
                name="Backfast",
                owner=self.user,
            ).exists()
        )