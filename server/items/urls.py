from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_items, name='item-index'),
    path("get_by_id/<int:item_id>", views.get_by_item_id, name="get_by_id"),
    path("get_by_username/<str:username>", views.get_by_username, name="get_by_username"),
    path('search/<str:search_term>/<str:category>/', views.search_term, name="search_term"),
    path("create", views.create, name="create"),
    path("update", views.update_listing, name="update"),
    path("delete", views.delete, name="delete"),
    path("claim/<int:item_id>", views.claim_item, name="claim_item"),
    path("recently_viewed/<str:username>/", views.recently_viewed_by_username, name="recently_viewed_by_username"),
    path("get_by_category/<str:category>/", views.get_by_category, name='get_by_category'),
    path("get_unclaimed/", views.get_unclaimed_items, name='get_unclaimed_items'),
    path("claimed_by_username/<str:username>", views.claimed_by_username, name='claim_by_username'),
    path('claimed_by_seller/<str:seller>', views.get_claimed_by_seller, name='claimed-by-seller')
]