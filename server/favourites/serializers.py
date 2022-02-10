from rest_framework import serializers
from .models import Favourite
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token

class FavouriteSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source="user_id.username")
    item_name = serializers.ReadOnlyField(source="item_id.name")
    item_description = serializers.ReadOnlyField(source="item_id.description")
    item_category = serializers.ReadOnlyField(source="item_id.category")
    
    class Meta:
        model = Favourite
        fields = ('id','user_id', 'item_id', 'item_name', 'item_description', 'item_category')
        # fields = '__all__'