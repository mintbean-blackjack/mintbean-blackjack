import React from "react";
import { Card } from "./Card";

export const ShowCards = ({ label, cards }) => {
  console.log(`${label} cards in ShowCards >>>`, cards)
  function getVisibility(index) {
    if (label === "Player") return true;
    else {
      if (index === 0) return true;
    }
    return false;
  }
  return (
    <div>
      {label}
      {cards.map((card, index) => {
        return <Card key={index} card={card} isVisible={getVisibility()} />
      })}
    </div>
  );
};
