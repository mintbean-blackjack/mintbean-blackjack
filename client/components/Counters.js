import React from "react";
import { CounterDisplay } from "./CounterDisplay";

export const Counters = ({ player }) => {
  const { totalMoney, wins, losses, draws } = player;
  return (
    <div>
      <CounterDisplay label="Total Money" value={totalMoney} />
      <CounterDisplay label="Wins" value={wins} />
      <CounterDisplay label="Losses" value={losses} />
      <CounterDisplay label="Draws" value={draws} />
    </div>
  );
};
