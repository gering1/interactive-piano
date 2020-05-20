import React from 'react';
class Note extends React.Component {
  render() {
    return (
    <form onSubmit = {this.props.pickNote}>
      <button type = 'submit'>Play</button>
      <p>{this.props.note}</p>
    </form>
  );
  }
}
export default Note;
