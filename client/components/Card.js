import React from "react";

/*
SAMPLE INPUT:
const card = {
  suit: spade,
  value: 4
}
isVisible = true
*/

export const Card = (card, isVisible) => {
  console.log("card in Card >>>>", card);
  const { suit, value } = card;
  return (
    <div className="card-container">
      <div className={isVisible ? "visible-card" : "hidden-card"}>
        <div>
          <div className="card-suit">{suit}</div>
          <div className="card-value">{value}</div>
        </div>
      </div>
    </div>
  );
};
