from django.test import Client, TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token

from client_app.models import Client as ClientModel
from food_app.models import Meal


class TestDeleteMeal(TestCase):
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

        self.meal = Meal.objects.create(
            owner=self.user,
            name="Breakfast",
        )

    def test_05_delete_meal(self):
        response = self.client.delete(
            reverse("a_meal", kwargs={"meal_id": self.meal.id}),
            **self.auth,
        )

        self.assertEqual(response.status_code, 204)
        self.assertFalse(
            Meal.objects.filter(id=self.meal.id).exists()
        )