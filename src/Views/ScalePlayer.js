import React from 'react';
import './ScalePlayer.css';
import {Piano,MidiNumbers} from 'react-piano';
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

class ScalePlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        activeNotesIndex: 0,
        isPlaying: false,
        stopAllNotes: () => console.warn('stopAllNotes not yet loaded'),
        song: [],
        RHfingering : ["test me"],
        LHfingering: [],
        testScale: [],
        startNum: 0,
        isMajor: true,
        isMinor: false,
        chosenScale: "C",
        scale: "",
        majorMinor: ""
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
            activeNotesIndex: (this.state.activeNotesIndex + 1) % this.state.song.length,
          });
          console.log(this.state.activeNotesIndex)
          if(this.state.activeNotesIndex === this.state.song.length-1) {
            this.setState({isPlaying: false})
          }
        }, 250);
      } else {
        clearInterval(this.playbackIntervalFn);
        this.state.stopAllNotes();
        this.setState({
          activeNotesIndex: 0,
        });
      }
    }
  }
  handleScaleChange = (event) => {
  
    console.log(event.target.value)
    this.setState({chosenScale:event.target.value}, () => {
      console.log(this.state.chosenScale)
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
      var res = ""
      if(response.data.length === 4){
        res = response.data[1]
      }
      else if(response.data.length === 5){
        res = response.data[1].concat(response.data[2])

      }
      var newRes = Number(res)
      console.log(newRes)
      this.setState({startNum : newRes})
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
    var arpeggiatedPattern = [0,2,4,7,12,14,16,19,24]
    this.state.isMajor ? this.setState({testScale:[0,2,4,5,7,9,11,12,14,16,17,19,21,23,24]}) : this.setState({testScale : [0,2,3,5,7,8,11,12,14,15,17,19,20,23,24]})
    
  
    var scaled = this.state.testScale.map((number) => [(startNumber+number+35),(startNumber+number+35)+12]);
    var rscaled = scaled.slice().reverse();
    var completeScale = scaled.concat(rscaled)
    var arpeggiated = []
    for(var i = 0;i <completeScale.length;i=i+2){
      arpeggiated.push(completeScale[i])
    }
    console.log(arpeggiated)
    console.log(completeScale)
    this.setState({song:completeScale})
    this.setPlaying(!this.state.isPlaying)
  
    
  }

  setPlaying = (value) => {
    this.setState({ isPlaying: value });
  };


  render() {
    const noteRange = {
      first: MidiNumbers.fromNote('c2'),
      last: MidiNumbers.fromNote('b5'),
    };
    return(
      <Paper>
      <div>
          <div>
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
                  />
                  
                )}
              />
            )}
          </DimensionsProvider>
        </div>


       <div className = "body">
        <div>
        <FormControl className = "scalesForm">
              <InputLabel id="demo-mutiple-name-label">Key</InputLabel>
              <Select
              minWidth = {200}
              onChange = {this.handleScaleChange}
              value = {this.state.chosenScale}
              >
              <MenuItem value = "C">C</MenuItem>
              <MenuItem value = "D♭">D♭</MenuItem>
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
              <FormControl className = "majorMinorForm" width = "500px">
              <InputLabel id="majmin-label">Major/Minor</InputLabel>
              <Select
             
              onChange = {this.handleMajorMinor}
              value = {this.state.isMajor ? "Major" : "Minor"}
              >  
              
              <MenuItem disabled = {this.state.isMajor} value = "Major">Major</MenuItem>
              <MenuItem disabled = {this.state.isMinor} value = "Minor">Minor</MenuItem>
              </Select>
             </FormControl>
            
          
        </div>
        
        <div>
            <Button
              
              variant = "contained"
              color = "secondary"
               className={classNames('btn', {
                'btn-outline-info': !this.state.isPlaying,
                'btn-outline-danger': this.state.isPlaying,
                })}
                onClick={this.handleScaleClick}
                >
                  {this.state.isPlaying ? 'Stop' : 'Play Scale'}
             </Button>
        </div>
        </div>
  </div>
  </Paper>
    )}
                }
  export default ScalePlayer;
  /*
    return (
      <div>
        <div className="text-center">


        </div>
        <div className="mt-4">
          <SoundfontProvider
            audioContext={this.props.audioContext}
            instrumentName="acoustic_grand_piano"
            hostname={this.props.soundfontHostname}
            onLoad={({ stopAllNotes }) => this.setState({ stopAllNotes })}
            render={({ isLoading, playNote, stopNote, stopAllNotes }) => (
              <DimensionsProvider>
                {({ containerWidth }) => (
                  <Piano
                    activeNotes={
                      this.state.isPlaying ? this.state.song[this.state.activeNotesIndex] : []
                    }
                    noteRange={noteRange}
                    width={containerWidth}
                    playNote={playNote}
                    stopNote={stopNote}
                    disabled={isLoading || !this.state.isPlaying}
                  />
                )}
              </DimensionsProvider>
            )}
          />
        </div>
        <p>Choose Scale</p>
        <div>
            <ToggleButtonGroup type="radio" name="scale" onChange={this.handleScaleChange}>
                <ToggleButton value="AMajor">AMajor</ToggleButton>
                <ToggleButton defaultChecked value="CMajor">CMajor</ToggleButton>
                <ToggleButton value="CChord">CChord</ToggleButton>
            </ToggleButtonGroup>
        </div>
        <p>Press Play to see it in action: </p>
        <div>
            <button
               className={classNames('btn', {
                'btn-outline-info': !this.state.isPlaying,
                'btn-outline-danger': this.state.isPlaying,
                })}
                onClick={() => this.setPlaying(!this.state.isPlaying)}
            >
                  {this.state.isPlaying ? 'Stop' : 'Play Scale'}
             </button>
        </div>
      </div>
    );
  }
}
*/

