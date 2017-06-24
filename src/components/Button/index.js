import React from 'react';
import './button.css';

const Button = ({ children, ...other }) => {
  return (
    <button {...other}>
      {children}
    </button>
  );
};

export default Button;