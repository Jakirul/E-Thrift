from rest_framework import serializers
from .models import Item, RecentlyViewed


class ItemSerializer(serializers.ModelSerializer):
    seller = serializers.ReadOnlyField(source='seller.username')
    buyer = serializers.ReadOnlyField(source='buyer.username')

    class Meta:
        model = Item
        fields = ('id', 'name','category','description','is_claimed','time', 'address', 'seller', 'buyer')


class RecentlyViewedSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user_id.username')
    item_id = serializers.ReadOnlyField(source='item_id.id')
    item_name = serializers.ReadOnlyField(source='item_id.name')

    class Meta:
        model = RecentlyViewed
        fields = ('id', 'username', 'item_id', 'item_name', 'timestamp')
