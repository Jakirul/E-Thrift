from django.db import models
from users.models import User
from items.models import Item

# Create your models here.
class Favourite(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="user_id", default=None, blank=True)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, null=True, related_name="item_id", default=None, blank=True)