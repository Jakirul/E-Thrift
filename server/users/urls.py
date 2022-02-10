from django.urls import path

from .views import MyTokenObtainPairView, BlacklistRefreshView, get_all_user, get_all_ratings, add_rating, avg_rating_by_username, get_by_username, edit_account
from .api import RegisterAPI


from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("", get_all_user, name="all"),
    path("rating/", get_all_ratings, name="all_ratings"),
    path("get_by_username/<str:username>/", get_by_username, name="get_by_username"),
    path("edit", edit_account, name="edit"),
    path("rating/<str:username>/<int:rating>", add_rating, name="add_rating"),
    path("rating/<str:username>/", avg_rating_by_username, name="avg_rating_by_username"),
    path('register', RegisterAPI.as_view()),
    path('login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout', BlacklistRefreshView.as_view(), name="logout"),
]