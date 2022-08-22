from django.urls import path
from .views import index

app_name = 'frontend' # needed for the redirect method

urlpatterns = [
    path('', index, name=''),
    path('joinRoom', index),
    path('createRoom', index),  # must add any react router links to the urls aswell
    path('room/<str:roomCode>', index)
]