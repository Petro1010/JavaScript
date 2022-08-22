from django.db import models
import string
import random

def generateUniqueCode():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length)) #generates random code of the specified length of Uppercase characters
        #make sure it is unique
        if Room.objects.filter(code=code).count() == 0: #get the database table objects, filter for any codes that match our random one, if there is go again
            break

    return code

# Create your models here.

# creating database tables using python code
class Room(models.Model):
    #pieces of info stored for a room: id, leader, number of people, song
    #define the schema of the table (the columns)
    code = models.CharField(max_length=8, default=generateUniqueCode, unique=True) #will be a character set with max 8 chars, and it will act as a key as it is unique
    host = models.CharField(max_length=50, unique=True) # Can only host one room at a time
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
