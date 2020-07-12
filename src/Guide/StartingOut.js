
  
  import React from 'react';
 import './StartingOut.css'
 import Paper from '@material-ui/core/Paper'
  class StartingOut extends React.Component {
    render() {
    return (
      <Paper style = {{height:"100vh"}}>
        <div className = "startingout-container">
        <a target = "_blank" style = {{marginTop: "50px"}} href = "https://www.reddit.com/r/piano/wiki/faq#wiki_choosing_a_keyboard">What keyboard/piano should I buy?</a>
        <br></br>
        <a target = "_blank" href="https://www.amazon.com/Alfreds-Basic-Adult-All-Course-ebook/dp/B017OBN7CK/ref=sr_1_1?crid=DF2HQTDO43RZ&dchild=1&keywords=alfreds+all+in+one+piano+course+book+1&qid=1593235743&sprefix=alfreds+all+in+%2Caps%2C208&sr=8-1">What book should I buy? </a>
        <h3>How to practice?</h3>
        <div>
        <p>A simple practice routine contains
         <ul>
         <li>Scales and arpeggios (5-10 min)</li>
         <li>Working through the pieces you are currently working on: (15-60 min)</li>
         <li>Practice one to two measures at a time; start with a slow metronome speed and gradually increase</li>
         <li>Sight reading (use pieces below the level of the current pieces you're working on) (5-10 min)</li>
         </ul>
        </p>

        <h4 className = "suggested-books">Suggested Books after Completion of the one above:</h4>
        <div className = "books-container">
        <a target = "_blank" href = "https://www.amazon.com/Alfreds-Basic-Adult-All-Course-ebook/dp/B017OBN7AW/ref=sr_1_2?crid=264VXT999FYBK&dchild=1&keywords=alfreds+all+in+one+piano+course+book+2&qid=1594529527&sprefix=alfreds+all%2Caps%2C205&sr=8-2">Alfreds All-In-One Part 2</a>
        <a target= "_blank" href = "https://www.amazon.com/Piano-Masterworks-Intermediate-Schirmers-Classics/dp/1495006883/ref=sr_1_2?dchild=1&keywords=intermediate+piano&qid=1594529414&sr=8-2">Early intermediate</a>
        <a target= "_blank" href = "https://www.amazon.com/Piano-Masterworks-Intermediate-Schirmers-Classics/dp/1495006891/ref=sr_1_4?dchild=1&keywords=intermediate+piano&qid=1594529460&sr=8-4">Intermediate</a>
        <a target= "_blank" href = "https://www.amazon.com/Chopin-Introduction-Piano-Works-Book/dp/0739036858/ref=sr_1_4?dchild=1&keywords=beginner+chopin&qid=1594529508&sr=8-4">Introduction to Chopin</a>
        </div>
        </div>
        </div>
      </Paper>
      
    )
  };
  }
  
  export default StartingOut
  

