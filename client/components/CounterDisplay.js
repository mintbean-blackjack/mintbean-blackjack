import React from "react";

export const CounterDisplay = ({ label, value }) => {
  function getClassName() {
    return label.toLowerCase().split(" ").join("-");
  }
  return (
    <div className={`${getClassName()}-counter-container`}>
      <div className={`${getClassName()}-counter`}>
        <p>{`${label}: ${value}`}</p>
      </div>
    </div>
  );
};
