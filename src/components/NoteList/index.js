import React from 'react';
import './note-list.css';
import Note from '../Note';
import Mansory from 'react-masonry-component'

const options = {
  fitWidth: true
}

const noteStyle = {
  width: 200
}

const NodeList = ({ notes }) => {
  return (
    <Mansory className="note-list-container" options={options}>
      {notes.map(note => <Note style={noteStyle} title={note.title} content={note.content} />)}
    </Mansory>
  );
};

export default NodeList;
