from django.test import TestCase, Client
from .models import Images
from items.models import Item
from users.models import User
from django.core.files.uploadedfile import SimpleUploadedFile

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

        self.image = {
            'item':item,
            'img_url': 'image/upload/v1644240099/xfoxtgyalwhtan8cn7bp.png'
        }
        image = Images.objects.create(**self.image)

    def test_index(self):
        response = self.client.get(
            '/images/'
        )
        print(f'Get all: {response.content}')
        self.assertEqual(response.status_code,200)
    
    def test_get_by_item(self):
        response = self.client.get(
            '/images/get_by_item/1/'
        )
        print(f'Get all: {response.content}')
        self.assertEqual(response.status_code,200)
    
    def test_add(self):
        f = SimpleUploadedFile("file.png", b"file_content")

        response = self.client.post(
            '/images/add/1/',
            {
                'file': f
            }
        )
        print(response.content)
        self.assertEqual(response.status_code,200)

    def test_delete(self):
        response = self.client.put(
            '/images/delete/',
            {
                'id':1
            }
        )
        print(response.content)
        self.assertEqual(response.status_code, 200)

