import React, { PureComponent } from 'react';
import './note.css';

class Note extends PureComponent {
  render() {
    const { title, content, onClick } = this.props;
    return (
      <div>
        <div className="card note" onClick={onClick}>
          {title && <div className="note-title">{title}</div>}
          <div className="note-content" dangerouslySetInnerHTML={{__html: content}}/>
        </div>
      </div>
    );
  }
}

export default Note;
