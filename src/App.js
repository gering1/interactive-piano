import React from 'react';
import 'react-piano/dist/styles.css';
import Paper from '@material-ui/core/Paper'
import Header from './Views/Header.js'
import Dashboard from './Admin/Dashboard.js'
import ScalePlayer from './Views/ScalePlayer.js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Link, Route, BrowserRouter as Router,Switch } from "react-router-dom";
import Home from './Views/Home.js'
import Login from './Login/Login.js'
import SignUp from './Login/Signup.js'
import ProfileView from './Profile/ProfileView.js'




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
        <Paper style = {{ height: "100vh"}}>
        <div className="container">
          {console.log(() => isLoggedIn())}
       <Header></Header>

          <div className="row mt-5">
            <div className="col-md-8 offset-md-2">
             
            </div>
          </div>
          <div>
           <Router>
            <Route path = '/ProfileView' component = {ProfileView}></Route>
            <Route path = '/Dashboard' component = {Dashboard}></Route>
            <Route path = '/Login' component = {Login}/> 
            <Route path='/Signup' component={SignUp}/>
            <Route exact path='/' component={Home} />
           </Router>
       </div>
        </div>

        </Paper>
        </ThemeProvider>
    );
  }


export default App;