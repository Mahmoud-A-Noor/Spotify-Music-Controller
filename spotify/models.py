from django.db import models
from API.models import Room

class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now=True)
    refresh_token = models.CharField(max_length=200)
    access_token = models.CharField(max_length=200)
    token_type = models.CharField(max_length=50)
    expires_in = models.DateTimeField()

    def __str__(self):
        return self.user

class Vote(models.Model):
    user = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now=True)
    song_id = models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

    def __str__(self):
        return self.user