from django.shortcuts import redirect
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import *
from api.models import Room

# Authenticate application
class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing' # the scope of what our application will be doing (from spotify docs)
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)

def spotifyCallback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    # Get our access token from spotify
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    accessToken = response.get('access_token')
    tokenType = response.get('token_type')
    refreshToken = response.get('refresh_token')
    expiresIn = response.get('expires_in')
    error = response.get('error')

    # ensure user has a session and if not create one
    if not request.session.exists(request.session.session_key):
        request.session.create()

    # store the tokens
    update_or_create_user_tokens(
        request.session.session_key, accessToken, tokenType, expiresIn, refreshToken)

    return redirect('frontend:') #redirecting to a different app (the front end app and the homepage)

# confirm we are authenticated
class IsAuthenticated(APIView):
    def get(self, request, form=None):
        isAuthenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': isAuthenticated}, status=status.HTTP_200_OK)

# get the current hosts play back info about their current song
class CurrentSong(APIView):
    def get(self, request, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)
        # must have a valid room
        if room.exists():
            room = room[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        # find the host of the room
        host = room.host
        endpoint = "player/currently-playing"

        response = execute_spotify_api_request(host, endpoint) # get request so do not need those parameters
        
        if 'error' in response or 'item' not in response: # case for when there is an error or no song playing
            print(response)
            return Response({}, status=status.HTTP_204_NO_CONTENT) 

        #actual song playing:
        item = response.get('item')
        duration = item.get('duration_ms')
        progress = response.get('progress_ms')
        album_cover = item.get('album').get('images')[0].get('url')
        is_playing = response.get('is_playing')
        song_id = item.get('id')

        # create string with all the artists
        artist_string = ""
        for i, artist in enumerate(item.get('artists')):
            if i > 0:
                artist_string += ', '
            name = artist.get('name')
            artist_string += name
        
        song = {
            'title': item.get('name'),
            'artist': artist_string,
            'duration': duration,
            'time': progress,
            'img_url': album_cover,
            'is_playing': is_playing,
            'votes': 0,
            'id': song_id
        }
        
        return Response(song, status=status.HTTP_200_OK)


class PauseSong(APIView):
    def put(self, response, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)[0]

        # either they are the host or have permission
        if self.request.session.session_key == room.host or room.guest_can_pause:
            play_song(room.host)
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        return Response({}, status=status.HTTP_403_FORBIDDEN)

class PlaySong(APIView):
    def put(self, response, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)[0]

        # either they are the host or have permission
        if self.request.session.session_key == room.host or room.guest_can_pause:
            pause_song(room.host)
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        return Response({}, status=status.HTTP_403_FORBIDDEN)




