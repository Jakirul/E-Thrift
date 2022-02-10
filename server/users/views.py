from django.urls import re_path
from rest_framework.views import APIView
from django.db.models import Avg
# from django.contrib.auth.models import User
from .models import User, Rating
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserRegistrationSerializer, UserSerializer, RatingSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

class UserRegistrationView(APIView):
    def post(self, request, format=None):
        try:
            serializer = UserRegistrationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'Error': f'Username or email exists already - {e}'})

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class BlacklistRefreshView(APIView):
    def post(self, request):
        
        try:
            token = RefreshToken(request.data.get('refresh'))
            token.blacklist()
            return Response("Success")
        except: 
            return Response("Token expired or blacklisted")



@api_view(['GET'])
def get_all_user(request):
    all = User.objects.all()
    serializer = UserSerializer(all, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_by_username(request, username):
    find = User.objects.get(username=username)
    serializer = UserSerializer(find)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_ratings(request):
    all = Rating.objects.all()
    serializer = RatingSerializer(all, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def avg_rating_by_username(request, username):
    try:
        specific_user = User.objects.get(username=username)
        user = Rating.objects.filter(user_id=specific_user)
        total_rating = len(user)
        avg_figure = user.aggregate(Avg("rating"))["rating__avg"]
   
        return Response({"average_rating": avg_figure, "total":total_rating})
    except Exception as e:
        return Response({"Error": f"Cannot retreive ratings for this user! - {e}"})


@api_view(['POST'])
def add_rating(request, username, rating):
    try:
        find_username = User.objects.get(username=username)
        if rating > 0 and rating < 6:
            rating = Rating.objects.create(user_id=find_username, rating=rating)
            return Response({'Success': 'Successfully added a rating'})
        else:
            return Response({'Error': 'Rating must be between 1-5'})
    except Exception as e:
        return Response({'Error': f'Cannot add a rating - {e}'})

@api_view(['POST'])
def edit_account(request):
    try:
        print(request.data)
        user_acc = User.objects.get(username=request.data["current_username"])

        if user_acc:
            user_acc.first_name = request.data['first_name']
            user_acc.last_name = request.data['last_name']
            # user_acc.username = request.data["body"]['username']
            user_acc.phone_number = request.data['phone_number']
            
            if request.data["avatar_url"] != 'null':
                user_acc.avatar_url = request.data['avatar_url']
            user_acc.save()
            return Response({'Success': f'Successfully edited a profile'})

    except Exception as e:
        return Response({'Error': f'Cannot edit an account! - {e}'})