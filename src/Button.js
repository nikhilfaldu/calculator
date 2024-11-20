// Button.js

import React from 'react';
import './Button.css';

const Button = ({ label, onClick, className }) => {
  // Add logic to apply the appropriate button class based on the label
  let buttonClass = className;

  if (label === "C") {
    buttonClass = "Red"; // Assign Red class for "C" button
  } else if (label === "=") {
    buttonClass = "Equal"; // Assign Equal class for "=" button
  } else if (["/", "*", "-", "+", "%", "del"].includes(label)) {
    buttonClass = "Yellow"; // Assign Yellow class for these buttons
  }

  return (
    <button
      className={`Button ${buttonClass || ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
