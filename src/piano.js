import React from 'react';
import Note from './Components/Note.js'
import Notes from './Components/Notes.js'
import Score from './Components/Score.js'
import PerfectPitch from './Views/PerfectPitch.js'
//import NatNotesQuiz from './Views/NatNotesQuiz.js'
import {BrowserRouter, Route} from 'react-router-dom'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import SoundfontProvider from './piano_tools/SoundfontProvider'
import Soundfont from 'soundfont-player'
import majorNormals from './Views/MajorScales.js'
import DimensionsProvider from './piano_tools/DimensionProvider'
import 'react-piano/dist/styles.css';
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';
const mjn = [{"name":"C Major","blacks":"none","scale": [12,14,16,17,19,21,23,24,26,28,29,31,33,35] }];

const noteRange = {
  first: MidiNumbers.fromNote('c1'),
  last: MidiNumbers.fromNote('f4'),
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});







class ThePiano extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isCorrect : "Click Play to Start Guessing",
      guessedCorrectly : 0,
      totalGuessed : 0,
      scorePercentage : 1,
      waitingForNewNote : true,
      note : undefined
  }
  this.onPlayNoteInput = this.onPlayNoteInput.bind(this);
  this.playSingleNote = this.playSingleNote.bind(this);

  }
  
  playSetNotes(midiNumbers) {

    for(var i = 0;i < midiNumbers.length;i++) {
      this.playSingleNote(midiNumbers[i]);

    }
  }
  

  repeatNote = (e) => {
    this.playSingleNote(this.state.note);
  }

   playSingleNote(midiNumber) {
   const ac = new AudioContext()
   Soundfont.instrument(ac, 'acoustic_grand_piano').then(function (piano) {
     piano.play(midiNumber, ac.currentTime, { duration: 0.6})
   })
   if(this.props.waitingForNewNote === true) {
     this.setState({
       isCorrect: ""
     })
   }

 }
 pickNote = (e) => {

   //randomly choose a note to play
   e.preventDefault();
   const pick = Math.floor(Math.random() * 41 + 24);
   this.updateNote(pick)
   this.playSingleNote(pick)
   this.playSingleNote(pick)


 }
 updateNote = (newNote) => {
   this.setState({note:newNote})
 }


/*
   generateAndPlayNaturals() {
    const naturalTestNums = Array.from({length: 8}, () => Math.floor(Math.random() * MidiNumbers.NATURAL_MIDI_NUMBERS));
    for(let i = 0;i < 8; i++) {
      this.playSingleNote(naturalTestNums[i]);
    }
  }
*/

   onPlayNoteInput(midiNumber) {
     //compare guess to generated note


     if(midiNumber === this.state.note) {
       this.setState({
         isCorrect : "Correct",
         guessedCorrectly : this.state.guessedCorrectly + 1,
         totalGuessed : this.state.totalGuessed + 1,
         scorePercentage : (this.state.guessedCorrectly/this.state.totalGuessed),
         waitingForNewNote: true
       })
       console.log(this.state.guessedCorrectly + " /" + this.state.totalGuessed);
       console.log(MidiNumbers.NATURAL_MIDI_NUMBERS);
       console.log()
     }
     else {
       this.setState({
         isCorrect : "Incorrect",
         totalGuessed : this.state.totalGuessed+1,
         scorePercentage : this.state.guessedCorrectly/this.state.totalGuessed,
         waitingForNewNote: false
       })
     }
}

render() {
  return(
    <div>
        <div>
        <DimensionsProvider>
          {({ containerWidth, containerHeight }) => (
            <SoundfontProvider
              instrumentName="acoustic_grand_piano"
              audioContext={audioContext}
              hostname={soundfontHostname}
              render={({ isLoading,playNote,stopNote }) => (
                <Piano
                  //onPlayNoteInput={onPlayNoteInput}
                  noteRange={noteRange}
                  width={containerWidth}

                  playNote={playNote}
                  playSingleNote={this.playSingleNote}
                  stopNote={stopNote}
                  disabled={isLoading}
                  onPlayNoteInput = {this.onPlayNoteInput}
                />
              )}
            />
          )}
        </DimensionsProvider>
      </div>
        {this.props.perfectPitchRender === true ? (
          <div>
           
          <PerfectPitch playSetNotes = {this.playSetNotes} updateNote = {this.updateNote} repeatNote = {this.repeatNote} playSingleNote = {this.playSingleNote}> {this.props.majorNormalsRender}</PerfectPitch>
          <Score isCorrect = {this.state.isCorrect} guessed = {this.state.guessedCorrectly} totalGuessed = {this.state.totalGuessed} percentage = {this.state.scorePercentage} ></Score>
          </div> )
            : (<div></div>)}
        }
        {this.props.majorNormalsRender === true ? (
          <div>
          <majorNormals>

          </majorNormals>
          
          </div>
        )
          : (<div></div>)
      }

    </div>
  )}
}


export default ThePiano
