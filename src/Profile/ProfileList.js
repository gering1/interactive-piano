import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles';
import CurrentKey from './CurrentKey.js'
import Container from '@material-ui/core/Container'
import Header from '../Views/Header'
import FolderIcon from '@material-ui/icons/Folder';
import { render } from 'react-dom'
import PropTypes from 'prop-types';
import Pieces from './Pieces.js';

const styles = (theme) => ({
  wrapper: {
  position: "absolute",
  left: 0,
  top: "10%"
  },
 content: {
  position: "absolute",
  left: 500,
  top: 6
 }
});
class ProfileList extends React.Component {
  constructor(props){
        
    super(props);
    
    this.state={
      renderCurrentKeys: false,
      renderCompletedPieces: false,
    }
    
  }
  handleListChange = (event) => {
    console.log(event.currentTarget.id)
    if(event.currentTarget.id === "Current Keys") {
      this.setState({
        renderCurrentKeys:true,
        renderCompletedPieces:false
      })
     
    }
    else if(event.currentTarget.id === "Completed Pieces")  {
      this.setState({
        renderCurrentKeys:false,
        renderCompletedPieces:true
      })
    }
  }
  render() {
    const {classes} = this.props;
    let profileContent;
    if(this.state.renderCurrentKeys) {
      profileContent = <CurrentKey></CurrentKey>
    }
    else if(this.state.renderCompletedPieces) {
      profileContent = <Pieces></Pieces>
    }
    return (
      <>
<div className = {classes.wrapper}>
      <Container component="main" maxWidth="xs">
      <List>
      <ListItem onClick = {this.handleListChange} id = "Current Keys" button>
       
        <ListItemText primary="Current Keys" />
        <ListItemIcon>
          <MusicNoteIcon></MusicNoteIcon>
        </ListItemIcon>
      </ListItem>
      <ListItem onClick = {this.handleListChange} id = "Completed Pieces" button>
        <ListItemText primary="Completed Pieces" />
        <ListItemIcon>
          <QueueMusicIcon></QueueMusicIcon>
        </ListItemIcon>
      </ListItem>
    </List>
    </Container>
    <div className = {classes.content}>
    {profileContent}
    </div>
    </div>
  
 </>
    )
  }

}
ProfileList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileList)


