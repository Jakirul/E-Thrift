from math import dist
from xml.dom import NotFoundErr
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from .models import Item, RecentlyViewed
from .serializers import ItemSerializer, RecentlyViewedSerializer
from users.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from images.models import Images
from images.serializer import ImagesSerializer
import cloudinary


def index(req):
    return HttpResponse('<h1>Root items page</h1>')

# Create your views here.


@api_view(['GET'])
def get_all_items(req):
    try:
        data = Item.objects.all()
        photos = Images.objects.all().order_by('item_id').distinct()
        
        serializer = ItemSerializer(data, many=True)
        serializer_img = ImagesSerializer(photos, many=True)

        data = {'data': serializer.data, 'image': serializer_img.data}
        return Response(data)
    except Exception as e:
        return Response({'Error': f"{e}"})


@api_view(['GET'])
def get_by_username(req, username):
    try:
        user = User.objects.get(username=username)
        items = Item.objects.filter(seller=user)
        serializer = ItemSerializer(items, many=True)
        
        lists = []
        for item in items:
            
            photos = Images.objects.filter(item_id=item)
            
            for photo in photos:
                print(photo)
                lists.append(photo)
        
        serializer_img = ImagesSerializer(lists, many=True)
        data = {'data': serializer.data, 'photos': serializer_img.data}
        return Response(data)
    except Exception as e:
        return Response({'Error': f'Provided username doesnt exist - {e}'})


@api_view(['GET'])
def get_by_item_id(req, item_id):
    try:
        item = Item.objects.get(id=item_id)
        serializer = ItemSerializer(item)
        photos = Images.objects.filter(item_id=item)
        serializer_img = ImagesSerializer(photos, many=True)
<<<<<<< HEAD
        print(req.GET.get("username") == "null")
        if req.GET.get("username") is not None and req.GET.get('username') != '':
=======
        
        if req.GET.get("username") is not None and req.GET.get("username") != "":
>>>>>>> 29c82c6b396d80e5b13a1ebe3f1820c78c685599
            user = User.objects.get(username=req.GET.get("username"))
            
            if user is not None:
                last_item = RecentlyViewed.objects.filter(user_id=user).last()
                
                if last_item is not None:
                    # Prevents the recently viewed list from being spammed with the same item
                    if (last_item.item_id.id != item_id):
                        RecentlyViewed.objects.create(user_id=user, item_id=item)
                else:
                    RecentlyViewed.objects.create(user_id=user, item_id=item)
            else:
                print("here")
               

        data = {'data': serializer.data, 'photo': serializer_img.data}
        return Response(data)
    except Exception as e:
        return Response({'Error': f'Item Not Found - {e}'})


@api_view(['POST'])
def create(req):
    try:

        seller = User.objects.get(username=req.data['seller'])
        new_item = Item.objects.create( name = req.data['name'],
                                        description = req.data['description'],
                                        address = req.data['address'],
                                        category = req.data['category'],
                                        seller = seller)
        return Response({'Success': f'Created new listing with id: {new_item.id} and name {new_item.name}'})
    except Exception as e:
        return Response({'Error!': f"{e}"})

# updates whole item, maybe make new to ba able to update certain features


@api_view(['POST'])
def update_listing(req):
    try:
        item = Item.objects.get(pk=req.data['id'])
        item.name = req.data['name']
        item.description = req.data['description']
        item.address = req.data['address']
        item.save() #this may update time not sure
        return Response({"Success": "Updated the post!"})
    except Exception as e:
        return Response({'Error': f"{e}"})


@api_view(['POST'])
def delete(req):
    try:
        item = Item.objects.get(pk=req.data['id']) #pk vs id?
        item.delete()
        return Response({'Success': 'Listing Deleted'})
    except Exception:
        return Response({'Error': 'Item not found'})


@api_view(['POST'])
def claim_item(req, item_id):
    try:
        item = Item.objects.get(pk=item_id)
        buyer = User.objects.get(username=req.data['username'])
        if not item.is_claimed:
            item.buyer = buyer
            item.is_claimed = True
            item.save()
        return Response({"Success": 'Successfully claimed item'})
    except Exception as e:
        return Response({'Error': f'error claiming item: {e}'})


@api_view(['GET'])
def recently_viewed_by_username(req, username):
    try:
        user = User.objects.get(username=username)
        all = RecentlyViewed.objects.filter(user_id=user)
        serialized = RecentlyViewedSerializer(all, many=True)
        data = {'data': serialized.data}
        return Response(data)

    except Exception as e:
        return Response({'Error': f'Cannot get all recently viewed items - {e}'})