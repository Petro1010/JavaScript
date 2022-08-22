from os import access
from .models import SpotifyTokens
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get

BASE_URL = "https://api.spotify.com/v1/me/"

def get_user_tokens(session_id):
    user_tokens = SpotifyTokens.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    # if user has tokens update them in db
    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
    # if not create them in db
    else:
        tokens = SpotifyTokens(user=session_id, access_token=access_token, refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()

def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)

    if tokens:
        expiry = tokens.expires_in
        #if expired refresh it
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)
        
        return True

    return False # no tokens so not authenticated

def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token)

def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False): # send request to any spotify api endpoint
    # get the tokens from the hosts session
    tokens = get_user_tokens(session_id)
    #print(tokens)
    header = {'Content-Type': 'application/json', 'Authorization' : "Bearer " + tokens.access_token}

    if post_:
        # for a post request
        post(BASE_URL + endpoint, headers=header)
    elif put_:
        # for a put request
        put(BASE_URL + endpoint, headers=header)
    
    # for a get request
    response = get(BASE_URL + endpoint, {}, headers=header)
    try:
        return response.json()
    except:
        print(response)
        return {'Error': 'Issue with request'}

def play_song(session_id):
    return execute_spotify_api_request(session_id, "player/play", put_=True)

def pause_song(session_id):
    return execute_spotify_api_request(session_id, "player/pause", put_=True)
