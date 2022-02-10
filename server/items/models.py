from django.db import models
from users.models import User

# Create your models here.
class Item(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='seller')
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='buyer_id', default=None, blank=True)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    is_claimed = models.BooleanField(default=False)
    time = models.DateField(auto_now=True)
    address = models.CharField(max_length = 100)

    def __str__(self):
        return f'Listing name:{self.name}, desc: {self.description}, seller:{self.seller}'


class RecentlyViewed(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Item id: {self.item_id}, timestamp: {self.timestamp}"


