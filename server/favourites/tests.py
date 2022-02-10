from django.test import TestCase, Client
from .models import Favourite
from items.models import Item
from users.models import User

# Create your tests here.
class TestViewsCase(TestCase):
    client = Client()

    def setUp(self):
        self.user = {
            "username": "test",
            "first_name": "test",
            "last_name": "test",
            "email": "test@gmail.com",
            "password": "test",
            "phone_number": "0800001066",
        }
        user = User.objects.create_user(**self.user
        )
        self.item = {
                'seller': user,
                'name': 'TestItem',
                'category': 'TestCat',
                'description': 'TestDesc',
                'address': 'testAddress'
        }
        item = Item.objects.create(**self.item)

        self.favorite = {
            'user_id': user,
            'item_id': item
        }
        favo = Favourite.objects.create(**self.favorite)

    def test_all(self):
        response = self.client.get(
            '/favourite/'
        )
        print(response.content)
        self.assertEqual(response.status_code,200)

    def test_by_username(self):
        response = self.client.get(
            '/favourite/get/test/'
        )
        print(response.content)
        self.assertEqual(response.status_code,200)

    def test_add(self):
        response = self.client.post(
            '/favourite/test/1/',
        )
        print(response.content)
        self.assertEqual(response.status_code, 200)

    def test_remove(self):
        response = self.client.post(
            '/favourite/delete/test/1/'
        )
        print(response.content)
        self.assertEqual(response.status_code, 200)


