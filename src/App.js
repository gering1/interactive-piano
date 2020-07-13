import React from 'react';
import 'react-piano/dist/styles.css';
import Paper from '@material-ui/core/Paper'
import Header from './Views/Header.js'
import ScalePlayer from './Views/ScalePlayer.js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Link, Route, BrowserRouter as Router,Switch } from "react-router-dom";
import Home from './Views/Home.js'
import Technique from './Guide/Technique'
import StartingOut from './Guide/StartingOut'
import Playlist1 from './Spotify/Playlist1'



   
function isLoggedIn() {
  if (sessionStorage.getItem('userID') === null) {
      return false
  } else {
      return true
  }
}

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  })
  return (
    <ThemeProvider theme = {theme}>
      <Paper style = {{height : "100vh"}}>
        <div className="container">
          {console.log(() => isLoggedIn())}
          <Header></Header>
            <div>
              <Router>
              <Route exact path='/' component={Home} />
              <Route path = '/Technique' component={Technique}></Route>
              <Route path = '/StartingOut' component={StartingOut}></Route>
              <Route path = '/Playlist' component={Playlist1}></Route>
              </Router>
            </div>
        </div>
        </Paper>
      </ThemeProvider>
    );
  }


export default App;