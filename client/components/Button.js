import React from 'react';

export const Button = ({ label, clickHandler }) => (
  <div className={`${label}-button-container`}>
    <button className={`${label}-button`} onClick={clickHandler}>
      {label}
    </button>
  </div>
);
