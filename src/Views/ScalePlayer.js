import React from 'react';
import './ScalePlayer.css';
import {Piano,MidiNumbers,KeyboardShortcuts} from 'react-piano';
import FormControl from '@material-ui/core/FormControl'
import DimensionsProvider from '../piano_tools/DimensionProvider.js';
import SoundfontProvider from '../piano_tools/SoundfontProvider.js';
import classNames from 'classnames'
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import ScaleSelect from './ScaleSelect.js'
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Typography } from '@material-ui/core';
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';


const firstHalf = 5
const secondHalf = 12
const noteRange = {
  first: MidiNumbers.fromNote('c2'),
  last: MidiNumbers.fromNote('b5'),
};



const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: []
});



class ScalePlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        arpeggio: false,
        activeNotesIndex: 0,
        isPlaying: false,
        playingMajorChord: false,
        majorChord: "",
        stopAllNotes: () => console.warn('stopAllNotes not yet loaded'),
        song: [],
        reverseCount: 0,
        RHfingering : "12312341231234543213214321321",
        LHfingering: "54321321432132123123412312345",
        tip: "",
        testScale: [],
        startNum: 0,
        isMajor: true,
        isMinor: false,
        chosenScale: "C",
        scale: "",
        majorMinor: "",
        speed: 200
    }
    this.playbackIntervalFn = null;
    this.handleScaleClick = this.handleScaleClick.bind(this)
    this.handleScaleChange = this.handleScaleChange.bind(this)
  }

  handleMajorMinor = () => {
    this.setState({
      isMajor: !this.state.isMajor,
      isMinor: !this.state.isMinor})
  }



 
  componentDidUpdate(prevProps, prevState) {

    if (prevState.isPlaying !== this.state.isPlaying) {
      if (this.state.isPlaying) {
        this.playbackIntervalFn = setInterval(() => {
          this.setState({
            activeNotesIndex: (this.state.activeNotesIndex + 1) % this.state.song.length
          })
          if(this.state.activeNotesIndex === this.state.song.length-1) {
            this.setState({isPlaying: false})
          }
        }, this.state.speed);
      } else {
        clearInterval(this.playbackIntervalFn);
        this.state.stopAllNotes();
        this.setState({
          activeNotesIndex: 0,
          reverseCount: 0,
          reversedFingering: false
        });
      }
    }
  }




  handleScaleChange = (event) => {
  
    console.log(event.target.value)
    this.setState({chosenScale:event.target.value}, () => {
      console.log(this.state.chosenScale)
    }) 
    this.getFingerings()

}

getFingerings = () => {
  axios.post('http://127.0.0.1:5000/getFingerings', {
      
    selectedScale : this.state.chosenScale,
    isMajor: this.state.isMajor
})
.then((response) => {
    console.log(response)

    let RHfingeringr = response.data[0][0]
    let LHfingeringr = response.data[0][1]
  
    this.setState({
      RHfingering: RHfingeringr,
      LHfingering: LHfingeringr
      
    })
  
})
}

  handleArpeggioClick = (event) => {
    this.handleScaleClick();
    this.setState({
      arpeggio: true
    })
  }

  handleScaleClick = (event) => {
  
    console.log(this.state.chosenScale)
    axios.post('http://127.0.0.1:5000/getScaleStart', {
      
      selectedScale : this.state.chosenScale,
      isMajor: this.state.isMajor
  })
  .then((response) => {
      console.log(response)

      let startNumr = response.data[0][0]
    
      this.setState({
        startNum : startNumr,
      })
      this.createScale(this.state.startNum)
    
  })
  .catch(function (error) {
      console.log(error);
  });
  
  

} 

  createScale = (startNumber) => {
    //Follow W-W-H-W-W-W-H for major 
    //Follow W-H-W-W-H-1.5-W for harmonic minor
    var pattern = []
   
    this.state.isMajor ? this.setState({testScale:[0,2,4,5,7,9,11,12,14,16,17,19,21,23,24]}) : this.setState({testScale : [0,2,3,5,7,8,11,12,14,15,17,19,20,23,24]})
    
  
    var scaled = this.state.testScale.map((number) => [(startNumber+number+35),(startNumber+number+35)+12]);
  
    
    console.log(scaled)
    var rscaled = scaled.slice().reverse();
    var completeScale = scaled.concat(rscaled)
    var arpeggiated = [0,2,4,7,9,11,14,18,20,22,25,27,29]
    var arpeggiatedMapped = arpeggiated.map((number) => completeScale[number])
    
    this.state.arpeggio ?
    this.setState(
      {
        song:arpeggiatedMapped,
      }
      )
    :
    this.setState({
      song:completeScale
    })


    this.setPlaying(!this.state.isPlaying)
    this.setState({
      arpeggio: false
    })
    
  }

  setPlaying = (value) => {
    this.setState({ isPlaying: value });
  };

  handleSpeedChange = (e) => {
    this.setState({ speed: e.target.value})
  }


  render() {
    const noteRange = {
      first: MidiNumbers.fromNote('c2'),
      last: MidiNumbers.fromNote('b5'),
    };
    return(

      <>
          <div className = "scales-container">
          <DimensionsProvider>
            {({ containerWidth, containerHeight }) => (
              <SoundfontProvider
                instrumentName="acoustic_grand_piano"
                audioContext={audioContext}
                hostname={soundfontHostname}
                onLoad={({ stopAllNotes }) => this.setState({ stopAllNotes })}
                render={({ isLoading,playNote,stopNote }) => (
                  <Piano
                  
                  activeNotes={
                    this.state.isPlaying ? this.state.song[this.state.activeNotesIndex] : []
                  }
                    noteRange={noteRange}
                    width={containerWidth}
                    playNote={playNote}
                    stopNote={stopNote}
                    keyboardShortcuts = {keyboardShortcuts}
                  />
                  
                )}
              />
            )}
          </DimensionsProvider>
        </div>

        <div className = "fingering">
        {this.state.isPlaying ? 
        <p>{"LH: " }{this.state.LHfingering[this.state.activeNotesIndex]}
        {"RH: "} {this.state.RHfingering[this.state.activeNotesIndex]}</p>
      :<p>{<strong>{"Left Fingering: "}</strong>}{this.state.LHfingering}{"   "}{<strong>{"Right Fingering: "}</strong>}{this.state.RHfingering}</p>
        }
      </div>

       <div className = "body-container">
        <div>
        
        <FormControl className = "scalesForm" >
        <InputLabel >Key</InputLabel>
              <Select  
              
              variant = "outlined"
              onChange = {this.handleScaleChange}
              value = {this.state.chosenScale}
              style = {{backgroundColor: "black"}}
              >
              <MenuItem value = "C">C</MenuItem>
              <MenuItem value = "C#/D♭">C#/D♭</MenuItem>
              <MenuItem value = "D">D</MenuItem>
              <MenuItem value = "E">E</MenuItem>
              <MenuItem value = "F">F</MenuItem>
              <MenuItem value = "F#/G♭">F#/G♭</MenuItem>
              <MenuItem value = "G">G</MenuItem>
              <MenuItem value = "G#/A♭">G#/A♭</MenuItem>
              <MenuItem value = "A">A</MenuItem>
              <MenuItem value = "A#/B♭">A#/B♭</MenuItem>
              <MenuItem value = "B">B</MenuItem>  
              </Select>
              </FormControl>
          <FormControl className = "majorMinorForm" >
            <InputLabel id="majmin-label">Major/Minor</InputLabel>
              <Select
              variant = "outlined"
              onChange = {this.handleMajorMinor}
              value = {this.state.isMajor ? "Major" : "Minor"}
              style = {{backgroundColor: "black"}}
              >  
              
              <MenuItem disabled = {this.state.isMajor} value = "Major">Major</MenuItem>
              <MenuItem disabled = {this.state.isMinor} value = "Minor">Minor</MenuItem>
              </Select>
           </FormControl>
           <FormControl className = "speedForm">
             <InputLabel id="speed-label">Speed</InputLabel>
            
             <Select
              variant = "outlined"
             className = "main-select"
             onChange = {this.handleSpeedChange}
             value = {this.state.speed}
             style = {{backgroundColor: "black"}}
             >
            
            <MenuItem value = {800}>.25x </MenuItem>
            <MenuItem value = {400}>.5x </MenuItem>
            <MenuItem value = {200}>1x </MenuItem>
             </Select>
            
           </FormControl>
            
          
        </div>


        <div className = "play_buttons_container">
            <Button
              variant = "contained"
              color = "secondary"
              size = "large"
              className = 'scale-button'
             
                onClick={this.handleScaleClick}
                >
                  {this.state.isPlaying ? 'Stop' : 'Play Scale'}
             </Button>
        
          <Button
          variant = "contained"
          color = "secondary"
          size = "large"
          className = "scale-button"
          onClick = {this.handleArpeggioClick}
          >
            {this.state.isPlaying ? 'Stop' : 'Play arpeggio'}
          </Button>
     
        
          <Button
          variant = "contained"
          color = "secondary"
          size = "large"
          className = "scale-button"

          >
            {this.state.isPlaying ? 'Stop' : 'Play Chord'}
          </Button>

        </div>
        </div>  
  </>

    )}
                }
  export default ScalePlayer;

