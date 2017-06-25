import React, { Component } from 'react';
import './composer.css';
import Input from '../Input';
import Button from '../Button';
import Textarea from '../Textarea';

const initialState = {
  title: {
    value: ''
  },
  content: {
    value: ''
  }
};

class Composer extends Component {
  constructor() {
    super();

    this.state = initialState;
  }

  handleChange = event => {
    const fieldName = event.target.name;

    this.setState({
      [fieldName]: {
        value: event.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;

    // TODO: validate

    const title = this.state.title.value;
    const content = this.state.content.value;

    onSubmit({
      title,
      content
    });

    // reset
    this.setState(initialState);
  };

  getValue = fieldName => {
    return this.state[fieldName].value;
  };

  render() {
    return (
      <div className="card composer-container">
        <form onSubmit={this.handleSubmit} className="input-form">
          <Input
            type="text"
            name="title"
            placeholder="Title"
            autoComplete={false}
            autoFocus
            value={this.getValue('title')}
            onChange={this.handleChange}
          />
          <Textarea
            name="content"
            placeholder="Take a note..."
            value={this.getValue('content')}
            onChange={this.handleChange}
          />

          <div className="actions">
            <Button>Done</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Composer;
