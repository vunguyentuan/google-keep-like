import React from 'react';
import './note.css';

const Note = ({ title, content }) => {
  return (
    <div className="note">
      <div className="note-title">{title}</div>
      <div className="note-content">{content}</div>
    </div>
  );
};

export default Note;
