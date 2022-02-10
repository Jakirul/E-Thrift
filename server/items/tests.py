from django.test import TestCase, Client
from .models import Item, RecentlyViewed
from users.models import User
from django.urls import reverse
import json
import pytest

# Create your tests here.
class TestViewsCase(TestCase):
    client = Client()

    # @pytest.mark.django_db
    def setUp(self):
        self.credentials = {
                "username": "test",
                "first_name": "test",
                "last_name": "test",
                "email": "test@gmail.com",
                "password": "test",
                "phone_number": "0800001066",
            }
        user = User.objects.create_user(**self.credentials)

        self.properties = {
                'seller': user,
                'name': 'TestItem',
                'category': 'TestCat',
                'description': 'TestDesc',
                'address': 'testAddress'
            }
        item = Item.objects.create(**self.properties)

        self.recent = {
            'user_id': user,
            'item_id': item,
        }
        RecentlyViewed.objects.create(**self.recent)
        


    def test_get_all_items(self):
        response = self.client.get(
            '/items/'
        )
        print(response.content)
        self.assertEqual(response.status_code, 200)

    def test_get_unclamed_items(self):
        response = self.client.get(
            '/items/get_unclaimed/'
        )
        print(response.content)
        self.assertEqual(response.status_code, 200)
    
    def get_by_id(self):
        response = self.client.get(
            '/items/get_by_id/1'
        )
        print(response.content)
        self.assertEqual(response.status_code,200)
    

    def get_by_username(self):
        response = self.client.get(
            '/items/get_by_username/TestItem'
        )
        print(response.content)
        self.assertEqual(response.status_code,200)
    
    def test_create_item(self):
        response = self.client.post(
            '/items/create',
            {
                'seller': 'test',
                'name': 'TestItem2',
                'category': 'TestCat2',
                'description': 'TestDesc2',
                'address': 'testAddress2'
            }
        )
        print(response.content)
        self.assertEqual(response.status_code, 200)

    def test_update_item(self):
        response = self.client.post(
            '/items/update',
            {
                'id': 1,
                'seller': 'test',
                'name': 'UpdatedName',
                'category': 'TestCat2',
                'description': 'TestDesc2',
                'address': 'testAddress2'
            }
        )
        print(f'Update: {response.content}')
        self.assertEqual(response.status_code, 200)

    def test_delete_item(self):
        response = self.client.post(
            '/items/delete',
            {
                'id':1
            }
        )
        print(f'Delete test: {response.content}')
        self.assertEqual(response.status_code, 200)
    
    def test_claim(self):
        response = self.client.post(
            '/items/claim/1',
            {
                'username': 'test'
            }
        )
        print(f'Claim: {response.content}')
        self.assertEqual(response.status_code,200)

    def test_recently_viewed(self):
        response = self.client.get(
            '/items/recently_viewed/test/'
        )
        print(f'Recently viewd: {response.content}')
        self.assertEqual(response.status_code,200)


    def test_get_by_category(self):
        response = self.client.get(
            '/items/get_by_category/TestCat/'
        )
        print(response.content)
        self.assertEqual(response.status_code, 200)

    def test_claimed_by_username(self):
        response = self.client.get(
            '/items/claimed_by_username/test'
        )
        print(response.content)
        self.assertEqual(response.status_code,200)

    



    
    
