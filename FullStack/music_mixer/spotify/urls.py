from django.urls import path
from .views import AuthURL, CurrentSong, PauseSong, PlaySong, spotifyCallback, IsAuthenticated

urlpatterns = [
    path('getAuthURL', AuthURL.as_view()),
    path('redirect', spotifyCallback),
    path('isAuth', IsAuthenticated.as_view()),
    path('currSong', CurrentSong.as_view()),
    path('pause', PauseSong.as_view()),
    path('play', PlaySong.as_view())
]