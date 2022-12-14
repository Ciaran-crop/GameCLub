from django.urls import path, include
from game.views.settings.get_info import InfoView
from game.views.settings.ranklist import RankList
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
        path('api/token/', TokenObtainPairView.as_view(), name = 'get jwt token'),
        path('api/token/refresh', TokenRefreshView.as_view(), name = 'refresh jwt token'),
        path('get_info/', InfoView.as_view(), name = 'get_info'),
        path('get_ranklist/', RankList.as_view(), name = 'get_ranklist'),
        path('acwing/', include('game.urls.settings.acwing.index')),
        ]
