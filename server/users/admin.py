from django.contrib import admin
from rest_framework_simplejwt import token_blacklist
from django.contrib.auth.admin import UserAdmin
from .models import User, Rating

admin.site.register(User, UserAdmin)
admin.site.register(Rating)

class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True # or whatever logic you want

admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)