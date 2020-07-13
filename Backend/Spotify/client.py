import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
"""
SET SPOTIPY_CLIENT_ID =  'dea236ea09c24b129ee47172ea9390d2'
SET SPOTIPY_CLIENT_SECRET =  '5fcca940e6d54b8ca145e06d0a8eb4ae'

sp = spotipy.Spotify()
pstring = 'spotify:playlist:54zZ0nsqLcbhxsDTOOsJ0B'
classical_playlist = sp.playlist(pstring)
"""

class SpotifyClient:
    def __init__(self,playlist):
        self.playlist = playlist
    def show_playlist(self,playlist):
        print(playlist)

#spotify_client = SpotifyClient(classical_playlist)    