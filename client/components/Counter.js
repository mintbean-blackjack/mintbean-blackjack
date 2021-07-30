import React from 'react';

export const Counter = (label) => (
  <div className={`${label}-counter-container`}>
    <div className={`${label}-counter`}>
      <p>{label}</p>
    </div>
  </div>
);
