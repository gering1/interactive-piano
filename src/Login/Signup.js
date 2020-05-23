import React from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
const styles = (theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            confirmPassword:'',
            firstName: '',
            lastName: '',
        }
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 

    handleUsernameChange(e){
        this.setState({
          username: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
          password: e.target.value
        })
    }

    handleConfirmPasswordChange(e){
        this.setState({
          confirmPassword: e.target.value
    })
}
  handleFirstNameChange(e){
    this.setState({
      firstName:e.target.value
    })
  }
  handleLastNameChange(e){
    this.setState({
      lastName:e.target.value
    })
  }
    validateForm = () => {
      return this.state.username.length > 0 && this.state.password.length > 0 && this.state.confirmPassword.length > 0;
    }

    handleSubmit(e) {
        e.preventDefault();
        //make sure account creation is valid
        if(this.state.password != this.state.confirmPassword) {
            alert("Passwords don't match!")
        }
        else {
            axios.post('http://127.0.0.1:5000/createUser', {
              username: this.state.username,
              password: this.state.password,
              firstName: this.state.firstName,
              lastName: this.state.lastName
            },
            {withCredentials:false}
            )
            .then(function (response) {
              console.log(response);
              if(response.data === "good") {

              }
              else {
                alert("Username already exists")
              }
            })
            .catch(function (error) {
              console.log(error);
            });
    }
}
render() {
    const { classes } = this.props;
    return(
        <Container component="main" maxWidth="xs">
        <div className = {classes.paper}>
         <Typography component="h1" variant="h5">
            Enter Information
          </Typography>
      <form novalidate className = "signupForm" onSubmit = {this.handleSubmit} class = {classes.form}> 
          <TextField margin = "normal" fullWidth required id="loginText " label="Username" variant="outlined" onChange={this.handleUsernameChange} ></TextField>
          <TextField margin = "normal" fullWidth required id="passwordText " label="Password" variant="outlined" onChange={this.handlePasswordChange}></TextField>
          <TextField margin = "normal" fullWidth required id="passwordText " label="Confirm password" variant="outlined" onChange={this.handleConfirmPasswordChange}></TextField>
          <TextField margin = "normal" fullWidth id="firstNameText " label="First Name" variant="outlined" onChange={this.handleFirstNameChange} ></TextField>
          <TextField margin = "normal" fullWidth id="lastNameText " label="Last Name" variant="outlined" onChange={this.handleLastNameChange} ></TextField>

          <br></br>
          <Button disabled = {!this.validateForm()} className = {classes.submit} fullWidth margin = "normal" variant="contained" type = "submitSignup" color = "primary" >Sign Up</Button>
          <h5 className = "haveAccount"> Already have an account? <NavLink to = "/Login"> Log in</NavLink> </h5>

      </form>
      </div>
      </Container>
    )
}
}
SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(SignUp)
