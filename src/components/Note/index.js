import React from 'react';
import './note.css';

const Note = ({ title, content, style }) => {
  return (
    <div className="card note" style={style}>
      <div className="note-title">{title}</div>
      <div className="note-content" dangerouslySetInnerHTML={{__html: content}}/>
    </div>
  );
};

export default Note;
