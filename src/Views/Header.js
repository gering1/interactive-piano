import React from 'react'
import './Header.css';
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import AccountCircle from "@material-ui/icons/AccountCircle";
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Nav from 'react-bootstrap/Nav'

import Typography from '@material-ui/core/Typography'
import Home from './Home.js'
import Login from '../Login/Login.js'
import SignUp from '../Login/Signup.js'
import ProfileView from '../Profile/ProfileView.js'
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem"
import MenuIcon from '@material-ui/icons/Menu';
import ProfileList from '../Profile/ProfileList.js';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Route, BrowserRouter as Router,Switch } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: theme.palette.secondary.light
  },
  root: {
    marginBottom: theme.spacing(10)
  },
  menuButton: {
    
    marginRight: theme.spacing(2),
  },
  homeButton: {
    

  },
  activeLink: {
    color: theme.palette.secondary.light
  },
  title: {
    flexGrow:1,
    marginLeft: theme.spacing(5)
  },
  circleButton: {
    
  }
}));

export default  function Header({navigation}) {
  const classes = useStyles();
  const [redirect, setRedirect] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const setLogoutandAdmin = () => {
    sessionStorage.removeItem("userID")
    if(sessionStorage.getItem("isAdmin") !== null) {
      sessionStorage.removeItem("isAdmin")
    }
    
  }
  /*
  if(redirect === true) {
    return <Redirect to="/ProfileView"></Redirect>
  }
  */
  
  return (
 <>
  <div className = {classes.root}>
  
  <AppBar position="static" className = {classes.app}>
    <Toolbar variant="dense">
      <Nav.Link href = "/">
      <IconButton edge="start"  color="black" aria-label="menu" className={classes.homeButton}>
        <HomeIcon />
      </IconButton>
      </Nav.Link>
      <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
     
    </IconButton>
     
      <Typography variant="h5" color="inherit" className = {classes.title}>
        Piano Resource
      </Typography>
      <div>
      <IconButton 
      aria-controls="menu-appbar"
      edge = ""
      color = "inherit" 
      aria-label="account of current user"
      aria-haspopup="true"
      onClick={handleMenu}
      className = {classes.circleButton}
      >
        <AccountCircle/>
      </IconButton>
              <Menu
                id="menu-appbar"
                edge = "end"
                anchorEl={anchorEl}
                TransitionComponent={Fade}
               
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
                >
                 {console.log(sessionStorage.getItem("userID"))} 
                 {console.log(sessionStorage.getItem("isAdmin"))}
                 {sessionStorage.getItem("isAdmin") === "true" ? 
                <div>
                <Nav.Link href = "/Dashboard" className = {classes.activeLink}>
                  <MenuItem key = "dashboardKey" >Dashboard</MenuItem>
                </Nav.Link>
                </div>
                :
                <div>
                {null}
               </div>
                }
                {sessionStorage.getItem("userID") !== null  ? 
                <div>
                <Nav.Link href = "/ProfileView" className = {classes.activeLink}>
                  <MenuItem id = "/ProfileView" >Profile</MenuItem>
                </Nav.Link>
                <Nav.Link href = "/Login" className = {classes.activeLink}>
                  <MenuItem key = "logoutKey" onClick={setLogoutandAdmin}>Logout</MenuItem>
                </Nav.Link>
      
                </div>
                :
                <div>
                <Nav.Link href = "/Login" className = {classes.activeLink}>
                <MenuItem id = "loginKey" >Login</MenuItem>
                </Nav.Link>
                
                </div>
                
                }
                
                </Menu>
                </div>
    </Toolbar>
  </AppBar>
</div>

</>
      
  
  )};
              
