#stores all the urls local to this app
from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoom, LeaveRoom, UpdateRoom

#these are the paths to our api endpoints
urlpatterns = [
    path('room', RoomView.as_view()), # at the ..../home path, it will show a view of our Room Model (so we will be sent a url ....../"" and we are concerned with the "" part)
    #path('', main)
    path('createRoom', CreateRoomView.as_view()),
    path('getRoom', GetRoom.as_view()),
    path('joinRoom', JoinRoom.as_view()),
    path('userInRoom', UserInRoom.as_view()),
    path('leaveRoom', LeaveRoom.as_view()),
    path('updateRoom', UpdateRoom.as_view())
]
