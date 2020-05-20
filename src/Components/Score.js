import React from 'react';
import './Score.css'
class Score extends React.Component {
  render() {
    return (
      <form>
      <div id = "score">
      <p>{this.props.isCorrect}</p>
      <p>{this.props.guessed + "/" + this.props.totalGuessed}</p>
      <p>{this.props.percentage * 100 + '%'}</p>
      </div>
      </form>
      );
    }
  }

export default Score
