import React, { Component } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import Composer from './components/Composer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  handleAddNote = ({ title, content }) => {
    this.setState({
      notes: [...this.state.notes, { title, content }]
    });
  };

  render() {
    const { notes } = this.state;
    return (
      <div className="App">
        <Composer onSubmit={this.handleAddNote} />
        <NoteList notes={notes} />
      </div>
    );
  }
}

export default App;
