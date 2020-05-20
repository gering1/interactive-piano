import React from 'react'
import ThePiano from '../piano.js'
import Score from '../Components/Score.js'
import './PerfectPitch.css'
import Button from '@material-ui/core/Button';
class PerfectPitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

pickNote = (e) => {

  //randomly choose a note to play
  e.preventDefault();
  const pick = Math.floor(Math.random() * 41 + 24);
  this.props.updateNote(pick)
  this.props.playSingleNote(pick)
  //this.props.playSetNotes([12,14,16,17,19,21,23,24,26,28,29,31,33,35]);
}

render() {
  return(
    <div id = "perfectContainer">
      <Button class = "perfectButtons" onClick = {this.pickNote} > Play Note </Button>
      <button class = "perfectButtons" onClick = {this.props.repeatNote}> Repeat Note </button>

    </div>


  )}
}

export default PerfectPitch
