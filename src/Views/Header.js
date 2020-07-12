import React from 'react'
import './Header.css';
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import AccountCircle from "@material-ui/icons/AccountCircle";
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Nav from 'react-bootstrap/Nav'
import Button from '@material-ui/core/Button'
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
    backgroundColor: theme.palette.background.default
  },
  root: {
   
  },
  homeButton: {

  },
  guide: {
 
  },
  activeLink: {
    color: theme.palette.secondary.light
  },
  title: {
    flexGrow: 1
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
      
      <IconButton color="inherit" aria-label="menu" className={classes.menuButton}>
     
    </IconButton>
    <Nav.Link className = "guidelink odd" href ="StartingOut">
    <MenuItem key = "startGuide">Starting Out</MenuItem>
    </Nav.Link>
    <Nav.Link className = "guidelink even" href ="/Technique">
    <MenuItem key = "startGuide" >Technique</MenuItem>
    </Nav.Link>
    <Nav.Link className = "guidelink odd" href ="Playlist">
    <MenuItem key = "startGuide" >My Playlists</MenuItem>
    </Nav.Link>

    </Toolbar>
  </AppBar>
</div>

</>
      
  
  )};
              
