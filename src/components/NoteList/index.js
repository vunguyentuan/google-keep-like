import React from 'react';
import './note-list.css';
import Note from '../Note';

const NodeList = ({ notes }) => {
  return (
    <div className="note-list-container">
      {notes.map(note => <Note title={note.title} content={note.content} />)}
    </div>
  );
};

export default NodeList;
