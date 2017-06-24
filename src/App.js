import React, { Component } from 'react';
import './App.css';
import Note from './components/Note'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Note title='note title' content='note content' />
      </div>
    );
  }
}

export default App;
