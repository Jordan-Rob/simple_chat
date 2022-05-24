from django.urls import path
from .views import *

urlpatterns = [
    path('', index_view, name='chat-index'),
    path('<str:room_name>/', room_view, name='chat-room')
]