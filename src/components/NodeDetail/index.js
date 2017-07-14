import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { Link, Route } from 'react-router-dom';
import './node-detail.css';
import Composer from '../Composer';

const fadeIn = [
  {
    opacity: 0
  },
  {
    opacity: 1
  }
];

const fadeInBackdrop = [
  {
    opacity: 0
  },
  {
    opacity: 0.75
  }
];

const defaultAnimationTiming = {
  duration: 500,
  easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
}

const getTranformation = (boundingRect) => {
  const keyFrames = []

  if (window.activeNote) {
    const scaledWidth = window.activeNote.layout.width / boundingRect.width
    const scaledHeight = window.activeNote.layout.height / boundingRect.height

    keyFrames.push({
      transform: `translate(${window.activeNote.layout.left}px, ${window.activeNote.layout.top}px) scale(${scaledWidth}, ${scaledHeight})`,
      opacity: 0
    })
  }

  const targetLeft = window.innerWidth / 2 - boundingRect.width / 2

  keyFrames.push({
    transform: `translate(${targetLeft}px, 180px) scale(1, 1)`,
    opacity: 1
  })

  return keyFrames;
}

const fadeOut = [...fadeIn].reverse();

class NoteDetail extends Component {
  constructor() {
    super()
    this.state = {
      active: false
    }
  }

  componentWillEnter(callback) {
    this._modalBackdrop.animate(fadeInBackdrop, defaultAnimationTiming);
    
    const modalLayout = this._modalContent.getBoundingClientRect()
    const tranformation = getTranformation(modalLayout);
    const fadeInAnimation = this._modalContent.animate(tranformation, defaultAnimationTiming);

    fadeInAnimation.onfinish = () => {
      const targetLeft = window.innerWidth / 2 - modalLayout.width / 2
      this._modalContent.style.transform = `translate(${targetLeft}px , 180px)`

      callback();
    }

    fadeInAnimation.play();
  }

  startAnimation() {

  }

  componentDidEnter() {
    this._modal.classList.add('active')
  }

  componentDidAppear() {
    this._modal.classList.add('active')
  }

  componentWillLeave(callback) {
    this._modalBackdrop.animate([...fadeInBackdrop].reverse(), defaultAnimationTiming);
    const modalLayout = this._modalContent.getBoundingClientRect()
    const tranformation = getTranformation(modalLayout);
    const fadeOutAnimation = this._modalContent.animate([...tranformation].reverse(), defaultAnimationTiming);

    fadeOutAnimation.onfinish = callback;
    fadeOutAnimation.play();
  }

  render() {
    const modalClass = this.state.active ? 'active' : ''
    const { note, onUpdate, onDelete } = this.props
    return (
      <div className={`box-fill modal ${modalClass}`} ref={node => (this._modal = node)}>
        <div className="box-fill modal-backdrop" ref={node => (this._modalBackdrop = node)} onClick={this.startAnimation}/>
        <div
          className="modal-content"
          ref={node => (this._modalContent = node)}>
          <Composer note={note} isEdit onSubmit={onUpdate} onDelete={onDelete}/>
        </div>
      </div>
    );
  }
}

class NodeDetailTransition extends Component {
  render() {
    const { notes, onUpdate, onDelete } = this.props
    return (
      <Route
        path="/notes/:noteId"
        children={({ match, ...rest }) => {
          let foundNote
          if (match) {
            foundNote = notes.find(note => note.id === match.params.noteId)
          }
          return (
            <TransitionGroup component="div" className="animated-list">
              {match && foundNote && <NoteDetail onUpdate={onUpdate} onDelete={onDelete} note={foundNote}/>}
            </TransitionGroup>
          );
        }}
      />
    );
  }
}

export default NodeDetailTransition;
