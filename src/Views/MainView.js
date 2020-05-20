import React from 'react'

import Header from './Header.js';
import ThePiano from '../piano.js'
import Home from './Home.js'
import Login from '../Login/Login.js'
import SignUp from '../Login/Signup.js'
import ProfileView from '../Profile/ProfileView.js'
import ProfileList from '../Profile/ProfileList.js'
import PerfectPitch from './PerfectPitch.js';
import MajorScales from './MajorScales.js'


import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perfectPitchRender : undefined,
      majorScalesRender : undefined
    }
  }
  render() {
    return (
    <BrowserRouter>
        <div>
          <Switch>
            <Route path = '/ProfileView' component = {ProfileView}></Route>
            <Route path = '/Login' component = {Login}/> 
            <Route path='/Signup' component={SignUp}/>
            <Route exact path='/' component={Home} />
            <Route path='/perfect-pitch' render = {(props) => <ThePiano perfectPitchRender = {true}/> } />
            <Route path='/major-scales' render = {(props) => <ThePiano perfectPitchRender = {false} majorScalesRender = {true}/> } />
          </Switch>
        </div>
      </BrowserRouter>
  )
}
};

export default MainView
