from cgitb import lookup
from django.shortcuts import render
from rest_framework import generics, status
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer,  UpdateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
#from django.http import HttpResponse

# Create your views here.

#def main(request):
#    return HttpResponse("<h1>Hello its me</h1>") #this is what will be shown as a repsonse at the endpoint

#Generates a view at the endpoint of our Model and its objects
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all() #room view will show every single room from our model
    serializer_class = RoomSerializer

# Generates a view for our specific room info
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'  # need to pass a parameter in the url called code

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg) #the code parameter from the url
        if code != None:
            room = Room.objects.filter(code=code) # filter the rooms in our data base for the one in the request

            if len(room) > 0:
                data = RoomSerializer(room[0]).data # should only be one room
                data['is_host'] = self.request.session.session_key == room[0].host # determines if the person is the host or not, add it to the data
                return Response(data, status=status.HTTP_200_OK)

            return Response({'Room Not Found' : 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request' : 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)
    
# check if room is joinable
class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        #check for active session
        if not self.request.session.exists(self.request.session.session_key):
            # if not, create the session
            self.request.session.create()
        
        code = request.data.get(self.lookup_url_kwarg) #get code from request
        if code != None:
            roomResult = Room.objects.filter(code=code)
            if len(roomResult) > 0:
                room = roomResult[0]
                self.request.session['room_code'] = code # make new variable for current room the user is ins
                return Response({'message' : 'Room Joined'}, status=status.HTTP_200_OK)
            
            return Response({'Room Not Found' : 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
        


#the view to handle post requests
class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        # check if the current user has an active session with user
        if not self.request.session.exists(self.request.session.session_key):
            # if not, create the session
            self.request.session.create()
        
        serialzer = self.serializer_class(data=request.data)
        # ensure that the data needed is provided
        if serialzer.is_valid():
            guest_can_pause = serialzer.data.get('guest_can_pause')
            votes_to_skip = serialzer.data.get('votes_to_skip')
            host = self.request.session.session_key 
            queryset = Room.objects.filter(host=host)
            # allows us to use the same session with new settings
            if queryset.exists(): #case where the room already exists, just update it
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            else:
                #initialize new room
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip) 
                room.save()
            
            self.request.session['room_code'] = room.code
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

#the class to check if user is in a room
class UserInRoom(APIView):
    def get(self, request, format=None):
        #check for active session
        if not self.request.session.exists(self.request.session.session_key):
            # if not, create the session
            self.request.session.create()

        data = {
            'code' : self.request.session.get('room_code')
        }

        #if they are not in a room we will just get None as a response
        return JsonResponse(data, status=status.HTTP_200_OK)

# user leaves the room
class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code') #removes code related to users session, leaves room
            host_id = self.request.session.session_key
            room_results = Room.objects.filter(host=host_id)
            # if the person was the host of the room, and the room still exists, delete it
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()

        return Response({'Message' : 'Success'}, status=status.HTTP_200_OK)

# update the room
class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer
    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        # Ensure info passed is what is needed
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            code = serializer.data.get('code')

            #find the room with the code
            queryset = Room.objects.filter(code=code)
            if not queryset.exists():
                return Response({"msg" : 'Room not found'}, status=status.HTTP_404_NOT_FOUND)
            
            # room exists, check if user is the host of the room
            room = queryset[0]
            user_id = self.request.session.session_key
            if room.host != user_id:
                return Response({"msg" : 'You are not host of room'}, status=status.HTTP_403_FORBIDDEN)
            
            # user is host of room, update settings
            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

        
