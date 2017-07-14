import React from 'react';
import './note-list.css';
import Note from '../Note';
import Mansory from 'react-masonry-component';
import { Link } from 'react-router-dom';

const options = {
  fitWidth: true
};

const noteStyle = {
  width: 240,
  textDecoration: 'none',
  color: 'inherit'
};

const handleClick = (note, event) => {
  window.activeNote = {
    note,
    layout: event.currentTarget.getBoundingClientRect()
  }
}

const NodeList = ({ notes }) => {
  return (
    <Mansory className="note-list-container" options={options}>
      {notes.map((note, index) =>
        <Link key={index} to={`/notes/${note.id}`} onClick={event => handleClick(note, event)} style={noteStyle}>
          <Note title={note.title} content={note.content} />
        </Link>
      )}
    </Mansory>
  );
};

export default NodeList;
