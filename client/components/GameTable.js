import React, { useState } from "react";
import Game from "../classes/Game";
import { Button } from "./Button";
import { BetInput } from "./BetInput";
import Card from "./Card";

export const GameTable = () => {
  const [game, setGame] = useState(null);
  const [player, setPlayer] = useState(null);
  const [computerPlayer, setComputerPlayer] = useState(null);

  function handleStartGame() {
    const _game = new Game();
    setGame(_game);
    setPlayer(_game.player);
    setComputerPlayer(_game.computerPlayer);
  }

  function handleDeal() {
    // player clicks on deal button after they've placed their bets (like in 247 blackjack)
    game.player.placeBet(player.currentBetAmount);
    game.dealInitialHand();
    setPlayer({ ...player, currentCards: player.currentCards });
    setComputerPlayer({ ...computerPlayer, currentCards: computerPlayer.currentCards });
  }

  function handlePlayAgain() {
    game.playAgain();
  }

  function handleHit() {
    player.hit();
  }

  function handleStay() {
    player.stay();
  }

  return (
    <div>
      <Button label="Start Game" clickHandler={handleStartGame} />
      {game ? (
        <div>
          <BetInput player={player} setPlayer={setPlayer} />
          <Button label="Deal" clickHandler={() => handleDeal()} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
