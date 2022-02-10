from django.urls import path
from . import views

urlpatterns = [
    path("", views.all_favourites, name="all_favourites"),
    path("get/<str:username>/", views.favourites_by_username, name="favourites_by_username"),
    path("<str:username>/<int:item_id>/", views.add_favourite, name="add_favourite"),
    path("delete/<str:username>/<int:item_id>/", views.remove_favourite, name="remove_favourite")
]