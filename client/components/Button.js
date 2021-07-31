import React from "react";
//className={`${label.toLowerCase().split(' ').join('-')}-button-container`}

export const Button = ({ label, clickHandler }) => (
  <div
    className={`${label.toLowerCase().split(" ").join("-")}-button-container`}
  >
    <button className={`${label}-button`} onClick={clickHandler}>
      {label}
    </button>
  </div>
);
