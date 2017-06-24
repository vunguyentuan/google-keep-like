import React from 'react';
import './input.css';

const Input = ({ ...other }) => {
  return (
    <input {...other}/>
  );
};

export default Input;