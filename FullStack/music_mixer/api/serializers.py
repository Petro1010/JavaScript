from rest_framework import serializers
from .models import Room

#translates a database table into a json response (outgoing)
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')

# This will be used to collect post requests, serializes a request so it can be understood (incoming)
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')

#Need this to take in the information needed to update settings of a specific room
class UpdateRoomSerializer(serializers.ModelSerializer):
    # To update, we need the code of the room, but we defined it as unique so if we give a code that already exists we will get errors
    # We redefine it to be different so it no longer needs to be unique in this instance
    code = serializers.CharField(validators=[])
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'code')
