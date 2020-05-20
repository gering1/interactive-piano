import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import FormControl from "react-bootstrap/FormControl";

import Header from './Header.js';
import ThePiano from '../piano.js'
import Home from './Home.js'
import Login from '../Login/Login.js'
import SignUp from '../Login/Signup.js'
import ProfileView from '../Profile/ProfileView.js'
import ProfileList from '../Profile/ProfileList.js'
import PerfectPitch from './PerfectPitch.js';
import MajorScales from './MajorScales.js'
import { Link, Route, BrowserRouter as Router,Switch } from "react-router-dom";


export default function Header2() {
    return (
        
       <>
<header className="App-header">
          <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">Super App</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      <Nav.Link href="/ProfileView">Profile</Nav.Link>
                      <Nav.Link href="/Login">Login</Nav.Link>
                    
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
      </header>

       <div>
           <Router>
            <Route path = '/ProfileView' component = {ProfileView}></Route>
            <Route path = '/Login' component = {Login}/> 
            <Route path='/Signup' component={SignUp}/>
            <Route exact path='/' component={Home} />
           </Router>
       </div>

     </>
    )
    

}
