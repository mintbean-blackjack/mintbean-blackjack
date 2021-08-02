import React, { useState } from 'react';

export const BetInput = ({ player, setPlayer }) => {
  const [value, setValue] = useState(player.currentBetAmount);
  function handleChange(e) {
    setValue(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    value <= player.totalMoney ? setPlayer({ ...player, currentBetAmount: value }) : alert("Choose a smaller amount. You don't have enough money.");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        How much do you want to bet?
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="Ok" />
    </form>
  );
}