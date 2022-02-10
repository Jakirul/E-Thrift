from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Favourite
from .serializers import FavouriteSerializer
from users.models import User
from items.models import Item

# Create your views here.
@api_view(['GET'])
def all_favourites(request):
    favourite = Favourite.objects.all()
    serialized = FavouriteSerializer(favourite, many=True)
    return Response(serialized.data)

@api_view(['GET'])
def favourites_by_username(request, username):
    try:
        user = User.objects.get(username=username)
        favourite = Favourite.objects.filter(user_id=user)
      
        serialized = FavouriteSerializer(favourite, many=True)
        return Response(serialized.data)
    except Exception as e:
        return Response({"Error": f"Cannot find favourites for the username: {username} - {e}"})

@api_view(['POST'])
def add_favourite(request, username, item_id):
    try:
        user = User.objects.get(username=username)
        item = Item.objects.get(id=item_id)
        check_existing = Favourite.objects.filter(user_id=user, item_id=item)
        print("check existing = ", check_existing)
        if not check_existing:
            creation = Favourite.objects.create(user_id=user, item_id=item)
            return Response({"Success": f"Successfully added a favourite: {creation.id}"})
        else:
            return Response({'Error': 'Could not add a favourite'})
    except Exception as err:
        return Response({"Error": f"Could not add a favourite - {err}"})

@api_view(['POST'])
def remove_favourite(request, username, item_id):
    try:
        user = User.objects.get(username=username)
        item = Item.objects.get(id=item_id)
        value = Favourite.objects.filter(user_id=user, item_id=item)
        value.delete()
        return Response({"Success": f"Successfully deleted a favourite"})
    except Exception as err:
        return Response({"Error": f"Could not delete a favourite"})