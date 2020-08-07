import React from 'react'
import './Header.css';
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Nav from 'react-bootstrap/Nav'
import MenuItem from "@material-ui/core/MenuItem"
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: theme.palette.background.default
  },
  

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
  
        </Toolbar>
      </AppBar>
    </div>
  </>
  )};
              
