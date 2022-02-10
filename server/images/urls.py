from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name='get-all'),
    path("get_by_item/<int:item_id>/", views.get_by_item, name='get-by-item'),
    path("add/<int:item_id>/", views.add, name='add'),
    path("delete/", views.delete, name='delete')
]