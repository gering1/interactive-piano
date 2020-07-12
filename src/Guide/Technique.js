
  
  import React from 'react';
import StartingOut from './StartingOut';
import Paper from '@material-ui/core/Paper'
import './Technique.css'
  
  
  class Technique extends React.Component {
    render() {
    return (
      <Paper >
      <div className = "technique-container">
        <h1 className = "technique-header">Techinque</h1>
        <p>Techniqe is critical to successful piano playing, in numerous aspects: </p>
        <ul className = "technqique-general-list">
         <li>Injury prevention</li>
         <li>Tone</li>
         <li>Consistency</li>
         <li>Stamina</li>
         <li>Strength</li>
        </ul>
        
        <h3 classname = 'technique-vid-labels'>Scales</h3>
            <iframe width="600" height="400" className = "technique-vids"
            src="https://www.youtube.com/embed/R0m67LcS6ks">
            </iframe>   
        <h3 className = 'technique-vid-labels'>Arpeggios</h3>
            <iframe width="600" height="400" className = "technique-vids"
            
            src="https://www.youtube.com/embed/BAkaM0JopOk">
            </iframe>  
        </div>
        </Paper>
    )
  };
  }
  
  export default Technique
  
