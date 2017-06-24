import React, { Component } from 'react';
import './App.css';
import Note from './components/Note'
import Composer from './components/Composer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Composer onSubmit={console.log}/>
        <Note title='note title' content='note content' />
      </div>
    );
  }
}

export default App;
