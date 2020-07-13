import React, { Component } from 'react';
import './Playlist.css';
import { SpotifyApiContext, Artist } from 'react-spotify-api';

function Playlist1(props) {
  return (
    <div className = "playlist-container">
    <iframe src="https://open.spotify.com/embed/playlist/54zZ0nsqLcbhxsDTOOsJ0B" width="350" height="400" 
    frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
  );
}
export default Playlist1