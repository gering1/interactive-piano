import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import './index.css';
import Piano from './piano.js'
import ProfileView from './Profile/ProfileView'
import MainView from './Views/MainView.js'
import Login from './Login/Login.js'
import Header from './Views/Header.js'
import * as serviceWorker from './serviceWorker';
import CurrentKey from './Profile/CurrentKey';
import ScalePlayer from './Views/ScalePlayer.js'
import Dashboard from './Admin/Dashboard.js';

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
