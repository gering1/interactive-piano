import React from 'react';
import './Login.css';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom'
import StraightenIcon from '@material-ui/icons/StraightenSharp'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'
//import RaisedButton from '@material-ui/core/';
import  { Redirect }from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { render } from 'react-dom';

const styles = (theme) => ({
  paper: {
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component {
constructor(props){
 
  super(props);
  this.state={
  username:'',
  password:'',
  isLoggedIn: false,
  uID:null
  }
  this.handleUsernameChange = this.handleUsernameChange.bind(this);
  this.handlePasswordChange = this.handlePasswordChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}


handleUsernameChange(e) {
  this.setState({
    username: e.target.value
  })
}

handlePasswordChange(e) {
  this.setState({
    password: e.target.value
  })
}

validateForm = () => {
  return this.state.username.length > 0 && this.state.password.length > 0;
}
/*

checkLoggedIn = () => {
  if(sessionStorage.getItem('userID') === null) {
    this.setState({
      isLoggedIn:false
    })
}
}
*/

handleSubmit(e) {
  
  e.preventDefault();
  var self = this
    axios.post('http://127.0.0.1:5000/getUser', {
    username: this.state.username,
    password: this.state.password 
  })
  .then(function (response) {
    if(response.data.isAdmin === true) {
      sessionStorage.setItem("isAdmin",true)
    }
    if(response.data !== '' && response.data !== "bad") {
      console.log(response)
      console.log(response.data.isAdmin)
      sessionStorage.setItem("userID",response.data.userID)
      self.setState({
        isLoggedIn:true
      })
      console.log(sessionStorage.getItem("userID"))
    }
    else{
      alert("Login Unsuccessful")
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  
 console.log(this.state.username, this.state.password)
}

render() { 
  const { classes } = this.props;
  //this.checkLoggedIn()
  
  if(this.state.isLoggedIn) {
    return <Redirect to = {"/"}></Redirect>
  }
  
    return (
    <Container component="main" maxWidth="xs">
      <div className = {classes.paper}>
       <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      <Avatar className= {classes.avatar}>
        <StraightenIcon></StraightenIcon>
      </Avatar>
    <form novalidate className = "loginForm" onSubmit = {this.handleSubmit} class = {classes.form}> 
        <TextField margin = "normal" fullWidth required id="loginText " label="login" variant="outlined" onChange={this.handleUsernameChange} ></TextField>
        <TextField margin = "normal" fullWidth required id="passwordText " label="password" variant="outlined" onChange={this.handlePasswordChange}></TextField>
        <br></br>
        <Button disabled = {!this.validateForm()} className = {classes.submit} fullWidth margin = "normal" variant="contained" type = "submitLogin" color = "primary" >Log in</Button>
        <h5 className = "needAccount"> Don't have an account? <a><NavLink to = "/SignUp"> Create account</NavLink> </a> </h5>
    </form>
    </div>
    </Container>

    )
}
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login)




