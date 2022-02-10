from django.test import TestCase, Client
from .models import User
from django.urls import reverse
import json

# Create your tests here.
class TestViewsCase(TestCase):
    client = Client()

    def setUp(self):
        self.credentials = {
            "username": "test",
            "first_name": "test",
            "last_name": "test",
            "email": "test@gmail.com",
            "password": "test",
            "phone_number": "0800001066",
        }
        User.objects.create_user(**self.credentials)

    def test_register(self):
        print("here")
        response = self.client.post(
            "/user/register",
            {
                "email": "test2@gmail.com",
                "username": "test2",
                "first_name": "test",
                "last_name": "test",
                "password": "test",
                "phone_number": "0800"
            },
        )
        self.assertEqual(response.status_code, 200)

    def test_login(self):
        response = self.client.post(
            "/user/login", {"email": "test@gmail.com", "password": "test"}
        )
        hold = response.content.decode("UTF-8")
        token = json.loads(hold)
        response = self.client.post(
            reverse("logout"), **{"Authorization": f"Token {token}"}
        )
        self.assertEqual(response.status_code, 200)

    def test_get_rating(self):
        response = self.client.get("/user/rating/")
        self.assertEqual(response.status_code, 200)

    def test_add_rating(self):
        response = self.client.post("/user/rating/test/5")
        self.assertEqual(response.status_code, 200)

    def test_get_rating_for_username(self):
        response = self.client.get("/user/rating/test/")
        self.assertEqual(response.status_code, 200)