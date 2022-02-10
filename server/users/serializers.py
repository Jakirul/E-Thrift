from rest_framework import serializers
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .models import Rating, User
User = get_user_model()
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password',  'phone_number', 'avatar_url' )


class UserRegistrationSerializer(serializers.ModelSerializer):

    phone_number = serializers.CharField()
    avatar_url = serializers.ImageField(required=False, default="image/upload/v1644240099/xfoxtgyalwhtan8cn7bp.png")
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'password_confirmation', 'phone_number', 'avatar_url' )
        write_only_fields = ('first_name', 'last_name', 'password', 'password_confirmation')

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'], first_name=validated_data['first_name'], email=validated_data["email"], last_name=validated_data["last_name"], phone_number=validated_data["phone_number"], avatar_url=validated_data["avatar_url"])
        
        password = validated_data['password']
        password_confirmation = validated_data['password_confirmation']

        if password != password_confirmation:
            raise serializers.ValidationError(
                {'password': 'Passwords must match.'})
        user.set_password(password)
        user.save()
        return user


class RatingSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user_id.username')

    class Meta:
        model = Rating
        fields = ('id', 'user_id', 'rating')