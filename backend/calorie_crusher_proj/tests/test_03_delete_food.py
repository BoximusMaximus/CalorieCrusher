from django.test import Client, TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token

from client_app.models import Client as ClientModel
from food_app.models import Food


class TestDeleteFood(TestCase):
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
        
        self.food = Food.objects.create(
            owner=self.user,
            name="Nanner",
            food_type="FR",
            kcal=69,
            saturated_fat=69,
            trans_fat=69,
            cholesterol=69,
            fiber=69,
            sugar=69,
            protein=69,
        )

    def test_03_delete_food(self):
        response = self.client.delete(
            reverse("a_food", kwargs={"food_id": self.food.id}),
            **self.auth,
        )

        self.assertEqual(response.status_code, 204)
        self.assertFalse(
            Food.objects.filter(id=self.food.id).exists()
        )