from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from cloudinary.models import CloudinaryField
# ('username', 'first_name', 'last_name', 'email', 'password', 'password_confirmation', 'phone_number', 'avatar_url' )

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20,null=True, blank=True)
    avatar_url = CloudinaryField('image', null=True, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

# class Address(models.Model):
class Rating(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="user_ids", default=None, blank=True)
    rating = models.IntegerField()

    def __str__(self):
        return f"{self.user_id} - {self.rating}"

