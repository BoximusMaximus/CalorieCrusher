from django.test import TestCase, Client
from django.urls import reverse


class TestClientSignUp(TestCase):
    def test_01_client_create_account(self):
        client = Client()
        response = client.post(
            reverse("signup"),
            data={
                "username": "Cody83337",
                "email":"chris83337@gmail.com",
                "password": "CodyBoxMan"
                },
            content_type="application/json",
        )
        print(response.content)
        with self.subTest():
            self.assertEqual(response.status_code, 201)
        self.assertTrue(
            b'{"client":"Cody83337"' in response.content
            and b"token" in response.content
        )