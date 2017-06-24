import React, { Component } from 'react';
import './composer.css';
import Input from '../Input';
import Button from '../Button';
import Textarea from '../Textarea';

class Composer extends Component {
  constructor() {
    super();

    this.state = {
      title: {
        value: ''
      },
      content: {
        value: ''
      }
    };
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
    const { onSubmit } = this.props;

    e.preventDefault();

    onSubmit(this.state);
  };

  getValue = fieldName => {
    return this.state[fieldName].value;
  };

  render() {
    return (
      <div className="card">
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
