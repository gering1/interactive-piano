import React from 'react';
import './ScalePlayer.css';
import {Piano,MidiNumbers,KeyboardShortcuts} from 'react-piano';
import FormControl from '@material-ui/core/FormControl'
import DimensionsProvider from '../piano_tools/DimensionProvider.js';
import SoundfontProvider from '../piano_tools/SoundfontProvider.js';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
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
const keys = [
   {
    key:"C Major",
    majorMinor: "Major",
    startMidi: 1,
    tip: 'Normal',
    RHFingering : "12312341231234543213214321321",
    LHFingering: "54321321432132123123412312345",
  },
  {
    key:"A Major",
    majorMinor: "Major",
    startMidi: 10,
    tip: 'Normal',
    RHFingering : "12312341231234543213214321321",
    LHFingering: "54321321432132123123412312345",
  },
  {
    key:"D Major",
    majorMinor: "Major",
    startMidi: 3,
    tip: 'Normal',
    RHFingering : "12312341231234543213214321321",
    LHFingering: "54321321432132123123412312345",
  },
  {
    key:"E Major",
    majorMinor: "Major",
    startMidi: 5,
    tip: 'Normal',
    RHFingering : "12312341231234543213214321321",
    LHFingering: "54321321432132123123412312345",
  },
  {
    key:'E Minor',
    majorMinor:'Minor',
    startMidi:5,
    tip:'Normal',
     RHFingering : "12312341231234543213214321321",
    LHFingering: "54321321432132123123412312345",
  },
  {
    key:"F Major",
    majorMinor: "Major",
    startMidi: 6,
    tip: 'Cluster',
    RHFingering: '12341231234123432143213214321',
    LHFingering:'54321321432132123123412312345'
  },
  {
    key:"B Major",
    majorMinor: "Major",
    startMidi: 12,
    tip: 'Cluster',
    RHFingering: '12312341231234543213214321321',
    LHFingering:'43214321321432123412312341234'
  },
  {
    key:"G Major",
    majorMinor: "Major",
    startMidi: 8,
    tip: 'Normal',
    RHFingering : "12312341231234543213214321321",
    LHFingering: "54321321432132123123412312345",
  },
  {
    key:'A#/B♭ Major',
    majorMinor:'Major',
    startMidi:11,
    tip:'Opposite 4/3',
    RHFingering: '41231234123123432132143213214',
    LHFingering: '32143213214321312341231234123'
  },
  {
    key:'D#/E♭ Major',
    majorMinor:'Major',
    startMidi:4,
    tip:'Matching 34s',
    RHFingering:'31234123123412321432132143213',
    LHFingering:'32143213214321312341231234123'
  },
  {
    key:'G♭ Major',
    majorMinor:'Major',
    startMidi:7,
    tip:'Cluster',
    RHFingering:'23412312341231213214321321432',
    LHFingering:'43213214321321412312341231234'
  },
  {
    key:'C#/D♭ Major',
    majorMinor:'Major',
    startMidi:2,
    tip:'Cluster',
    RHFingering:'23123412312341214321321432132',
    LHFingering:'32143213214321312341231234123'
  },
  {
    key:'G#/A♭ Major',
    majorMinor:'Major',
    startMidi:9,
    tip:'Matching 3s',
    RHFingering:'34123123412312321321432132143',
    LHFingering:'32143213214321312341231234123'
  },
  {
    key:'D Minor',
    majorMinor:'Minor',
    startMidi:3,
    tip:'Normal',
    RHFingering : "12312341231234543213214321321",
    LHFingering: "54321321432132123123412312345",
  },
  {
    key:'G Minor',
    majorMinor:'Minor',
    startMidi:8,
    tip:'Normal',
    RHFingering : "12312341231234543213214321321",
    LHFingering: "54321321432132123123412312345",
  },
  {
    key:'C Minor',
    majorMinor:'Minor',
    startMidi:1,
    tip:'Normal',
    RHFingering : "12312341231234543213214321321",
    LHFingering: "54321321432132123123412312345",
  },
  {
    key:'A#/B♭ Minor',
    majorMinor:'Minor',
    startMidi:11,
    tip:'Cluster',
    RHFingering:'21231234123123432132143213212',
    LHFingering:'21321432132143234123123412312'
  },
  {
    key:'D#/E♭ Minor',
    majorMinor:'Minor',
    startMidi:4,
    tip:'Cluster',
    RHFingering:'21234123123412321432132143212',
    LHFingerirng:'21234123123412321432132143212'
  },
  {
    key:'B Minor',
    majorMinor:'Minor',
    startMidi:12,
    tip:'Cluster',
    RHFingering:'12312341231234543213214321321',
    LHFingering:'43214321321432123412312341234'
  },
  {
    key:'F Minor',
    majorMinor:'Minor',
    startMidi:6,
    tip:'Cluster',
    RHFingering:'12341231234123432143213214321',
    LHFingering:'54321321432132123123412312345'
  },
  {
    key:'B#/C♭ Minor',
    majorMinor:'Minor',
    startMidi:9,
    tip:'Matching 3s',
    RHFingering:'34123123412312321321432132143',
    LHFingering:'3214321321432131234123123412'
  },
  {
    key:'C#/D♭ Minor',
    majorMinor:'Minor',
    startMidi:2,
    tip:'Matching 3s',
    RHFingering:'3412312341231321321432132143',
    LHFingering:'32143213214321312341231234123'
  },
  {
    key:'F#/G♭ Minor',
    majorMinor:'Minor',
    startMidi:7,
    tip:'Matching 34s',
    RHFingering:'34123123412312321321432132143',
    LHFingering:'43213214321321212312341231234'
  },
  {
    key:'F#/G♭ Major',
    majorMinor:'Major',
    startMidi:7,
    tip:'Cluster',
    RHFingering:'23412312341231213214321321432',
    LHFingering:'43213214321321432132143213214'
  },
  {
  key:'G#/A♭ Minor',
  majorMinor:'Major',
  startMidi:9,
  tip:'Matching 3s',
  RHFingering:'34123123412312321321432132143',
  LHFingering:'32143213214321312341231234123  '
  },

 
]

let keyRecords =  [('C Major','Major',1,'Normal','123123412312345','543213214321321'),
              ('A Major','Major',10,'Normal','123123412312345','543213214321321'),
               ('D Major','Major',3,'Normal','123123412312345','543213214321321'),
               ('E Major','Major',5,'Normal','123123412312345','543213214321321'),
               ('F Major','Major',6,'Cluster','123412312341234','543213214321321'),
               ('B Major','Major',12,'Cluster','123123412312345','432143213214321'),
               ('G Major','Major',8,'Normal','123123412312345','543213214321321'),
               ('B♭ Major','Major',11,'Opposite 4/3','412312341231234','321432132143213'),
               ('E♭ Major','Major',4,'Matching 34s','312341231234123','321432132143213'),
               ('G♭ Major','Major',7,'Cluster','234123123412312','432132143213214'),
               ('D♭ Major','Major',2,'Cluster','231234123123412','321432132143213'),
               ('A♭ Major','Major',9,'Matching 3s','341231234123123','321432132143213'),
               ('D Minor','Minor',3,'Normal','123123412312345','543213214321321 '),
               ('A Minor','Minor',10,'Normal','123123412312345','543213214321321'),
               ('E Minor','Minor',5,'Normal','123123412312345','543213214321321'),
               ('G Minor','Minor',8,'Normal','123123412312345','543213214321321'),
               ('C Minor','Minor',1,'Normal','123123412312345','543213214321321'),
               ('A# Minor','Minor',11,'Cluster','212312341231234','213214321321432'), 
               ('D# Minor','Minor',4,'Cluster','212341231234123','212341231234123'),
               ('B Minor','Minor',12,'Cluster','123123412312345','432143213214321'),
               ('F Minor','Minor',6,'Cluster','123412312341234','543213214321321'),
               ('B# Minor','Minor',9,'Matching 3s','341231234123123','321432132143213'),
               ('C# Minor','Minor',2,'Matching 3s','341231234123123','321432132143213'),
               ('F# Minor','Minor',7,'Matching 34s','341231234123123','432132143213212')]

class ScalePlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        arpeggio: false,
        activeNotesIndex: 0,
        selectedKey: null,
        isPlaying: false,
        playingMajorChord: false,
        majorChord: "",
        stopAllNotes: () => console.warn('stopAllNotes not yet loaded'),
        song: [],
        reverseCount: 0,
        RHFingering : "12312341231234543213214321321",
        LHFingering: "543213214321321123123412312345",
        tip: "",
        testScale: [],
        startNum: 0,
        isMajor: true,
        isMinor: false,
        chosenScale: "C",
        majorMinor: "Major",
        speed: 200
    }
    this.playbackIntervalFn = null;
    this.handleScaleClick = this.handleScaleClick.bind(this)
    this.handleScaleChange = this.handleScaleChange.bind(this)
  }

  handleMajorMinor = () => {
    let tempMajor = "Major"
    if(this.state.isMajor){
      tempMajor = "Minor"
    }
    this.setFingering(this.state.chosenScale + " " + tempMajor)
    console.log('switch')
    this.setState({
      isMajor: !this.state.isMajor,
      isMinor: !this.state.isMinor})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isPlaying !== this.state.isPlaying) {
      //trigger playing, set interval for list of notes being played
      if (this.state.isPlaying) {
        this.playbackIntervalFn = setInterval(() => {
          this.setState({
            activeNotesIndex: (this.state.activeNotesIndex + 1) % this.state.song.length
          })
          //stop playing if end of list hit
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
    
   let tempMajor = "Minor"
  if(this.state.isMajor){
    tempMajor = "Major"
  }
  this.setFingering(event.target.value + " " + tempMajor)
  this.setState({
    chosenScale: event.target.value
  })
 
}

  setFingering = (theKey) => {
    let currKey = keys.filter(keyfilt => {
      return keyfilt.key === theKey
    })
    currKey = currKey[0]
    this.setState({
      RHFingering: currKey.RHFingering,
      LHFingering: currKey.LHFingering
    })
  }


  handleScaleClick = () => {
    console.log(this.state.chosenScale)
    
    console.log(this.state.isMajor)
    let tempMajor = "Minor"
    if(this.state.isMajor) {
      tempMajor = "Major"
    }
    
    let theScale = this.state.chosenScale + " " + tempMajor
    console.log(theScale)
    this.state.selectedKey = keys.filter(key => {
     return key.key === theScale
    })

  }
  handleArpeggioAndCreate = () => {
    this.handleScaleClick();
    console.log(this.state.selectedKey[0].startMidi)
    this.createArpeggio(this.state.selectedKey[0].startMidi)
    this.setPlaying(!this.state.playing)
  
  }
  handleScaleAndCreate = () => {
    this.handleScaleClick()
    console.log(this.state.selectedKey[0].startMidi)
    this.createScale(this.state.selectedKey[0].startMidi)
    this.setPlaying(!this.state.isPlaying)
   
  }

  createArpeggio = (startNumber) => {
    let test = []
    this.state.isMajor ? test = [0,2,4, 5,7,9,11,12,14,16,17,19,21,23,24] : test = [0,2,3,5,7,8,11,12,14,15,17,19,20,23,24]

    var scaled = test.map((number) => [(startNumber+number+35),(startNumber+number+35)+12]);
    console.log(scaled)
    console.log(scaled)
    var rscaled = scaled.slice().reverse();
    var completeScale = scaled.concat(rscaled)
    var arpeggiated = [0,2,4,7,9,11,14,18,20,22,25,27,29]
    var arpeggiatedMapped = arpeggiated.map((number) => completeScale[number])
    this.setState(
      {
        song:arpeggiatedMapped,
      })
  }

  setScale = (scale) => {
    this.setState({
      testScale: scale
    })
  }
  createScale = (startNumber) => {
    //Follow W-W-H-W-W-W-H for major 
    //Follow W-H-W-W-H-1.5-W for harmonic minor
    let test = []
    this.state.isMajor ? test = [0,2,4, 5,7,9,11,12,14,16,17,19,21,23,24] : test = [0,2,3,5,7,8,11,12,14,15,17,19,20,23,24]

    var scaled = test.map((number) => [(startNumber+number+35),(startNumber+number+35)+12]);
    
    console.log(scaled)
    var rscaled = scaled.slice().reverse();
    var completeScale = scaled.concat(rscaled)

    
    this.setState({
      song:completeScale
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
        {this.state.isPlaying ? 
        <><Paper className = "fingeringPaper" style = {{alignItems: "center",display: "flex",justifyContent: "center",margin: "auto",width: "800px",height: "100px",backgroundColor:"rgba(0, 0, 0, 0.54);"}}> {<Typography><strong>{"RH fingering: "}</strong>{this.state.RHFingering[this.state.activeNotesIndex]}<strong>{" LH fingering: "}</strong>{this.state.LHFingering[this.state.activeNotesIndex]}</Typography>}</Paper></>
        :
    <><Paper className = "fingeringPaper" style = {{alignItems: "center",display: "flex",justifyContent: "center",margin: "auto",width: "800px",height: "100px",backgroundColor:"rgba(0, 0, 0, 0.54);"}}> {<Typography><strong>{"RH fingering: "}</strong>{this.state.RHFingering}<strong>{" LH fingering: "}</strong>{this.state.LHFingering}</Typography>}</Paper> </>
  
        }
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
              <MenuItem value = "D#/E♭">D#/E♭</MenuItem>
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
            onClick={this.handleScaleAndCreate}
            >
              {this.state.isPlaying ? 'Stop' : 'Play Scale'}
            </Button>
      
          <Button
            variant = "contained"
            color = "secondary"
            size = "large"
            className = "scale-button"
            onClick = {this.handleArpeggioAndCreate}
          >
            {this.state.isPlaying ? 'Stop' : 'Play arpeggio'}
          </Button>
     
        
        
      </div>
    </div>  
  </>
    )}
  }
  export default ScalePlayer;

