from rest_framework import serializers
from .models import Images

class ImagesSerializer(serializers.ModelSerializer):
    item_id = serializers.ReadOnlyField(source='item.id')
    
    class Meta:
        model = Images
        fields = ('id', 'item_id', 'img_url')
