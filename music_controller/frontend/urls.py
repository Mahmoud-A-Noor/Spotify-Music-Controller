from django.urls import path, include
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name='home'),
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index),
]
