from django.shortcuts import render

# Create your views here.
from .models import Images
from users.models import User
from items.models import Item
from .serializer import ImagesSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
import cloudinary

@api_view(['GET'])
def index(req):
    try:
        images = Images.objects.all()
        serializer = ImagesSerializer(images, many=True)
        return Response({'data': serializer.data})
    except Exception as e:
        return Response({'Error': f'{e}'})

@api_view(['GET'])
def get_by_item(req, item_id):
    try:
        item = Item.objects.get(pk=item_id)
        images = Images.objects.filter(item=item)
        serializer = ImagesSerializer(images, many=True)
        return Response({'data': serializer.data})
    except Exception as e:
        return Response({'Error': f'{e}'})

        
@api_view(['POST'])
def add(req, item_id):
    try:
        item = Item.objects.get(pk=item_id)
        Images.objects.create(  item=item,
                                image=req.data['image'])
        return Response({'Success': 'Added image to item'})
    except Exception as e:
        return Response({'Error': f'e'})

@api_view(['PUT'])
def delete(req):
    try:
        item = Item.objects.get(pk=req.data['id'])
        image = Images.objects.get(item=item, image=req.data['image'])
        cloudinary.uploader.destroy(image.image.public_id)
        image.delete()
        return Response({'Success': 'Image deletion successful'})
    except Exception as e:
        return Response({'Error': f'e'})

