import React, { Component } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import Composer from './components/Composer';
import NoteDetail from './components/NodeDetail';
import * as api from './api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {
    api.getNotes().then(notes => {
      console.log(notes);
      this.setState({
        notes: notes,
        loading: false,
      });
    });
  };

  handleAddNote = note => {
    api.addNote(note).then(() => {
      this.updateData();
    });
  };

  handleUpdateNote = note => {
    api.updateNote(note).then(() => {
      this.props.history.goBack();
      this.updateData();
    });
  };

  handleDeleteNote = note => {
    api.deleteNote(note).then(() => {
      this.updateData();
    });
  };

  render() {
    const { notes, loading } = this.state;
    if (loading) return <div className="loading">loading</div>
    return (
      <div className="App">
        <Composer onSubmit={this.handleAddNote} />
        <NoteList notes={notes} onDelete={this.handleDeleteNote}/>
        <NoteDetail
          onUpdate={this.handleUpdateNote}
          onDelete={this.handleDeleteNote}
          notes={notes}
          location={this.props.location}
        />
      </div>
    );
  }
}

export default App;
