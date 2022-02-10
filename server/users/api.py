from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserRegistrationSerializer

class RegisterAPI(generics.GenericAPIView):
  serializer_class = UserRegistrationSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    if serializer.is_valid():
      serializer.is_valid(raise_exception=True)
      user = serializer.save()
      return Response({
        'user_id': user.pk,
        'username': user.username
      })
    else:
      return Response({'Error': f'Error registering!'})