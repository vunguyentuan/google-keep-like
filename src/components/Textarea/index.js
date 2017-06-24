import React, { Component } from 'react';
import './textarea.css';

class Textarea extends Component {
  handleResize = e => {
    const element = e.target

    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  }

  render() {
    const { ...other } = this.props;
    return (
      <textarea {...other}
        onInput={this.handleResize}
      />
    );
  }
}

export default Textarea;