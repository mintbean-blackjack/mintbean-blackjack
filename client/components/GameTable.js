import React, { useState } from "react";
import Game from "../classes/Game";
import { fetchUser } from "../store/user";
import { Button } from "./Button";
import { BetInput } from "./BetInput";
import Card from "./Card";

export const GameTable = () => {
  const [game, setGame] = useState(null);
  const [player, setPlayer] = useState(null);
  const [computerPlayer, setComputerPlayer] = useState(null);

  function handleStartGame() {
    //before creating game, check if local storage player exists (logged in user is stored upon log in and removed upon log out);
    //if local storage player does not exist, add guest player to local storage
    if (!window.localStorage.getItem("currentPlayer")) {
      window.localStorage.setItem(
        "currentPlayer",
        JSON.stringify({
          username: "Guest",
          totalMoney: 2500,
          wins: 0,
          losses: 0,
          draws: 0,
        })
      );
    }

    const _game = new Game();
    setGame(_game);
    setPlayer(_game.player);
    setComputerPlayer(_game.computerPlayer);
  }

  function handleDeal() {
    // player clicks on deal button after they've placed their bets (like in 247 blackjack)
    game.player.placeBet(player.currentBetAmount);
    game.dealInitialHand();
    const outcome = game.checkForNatural();
    console.log('outcome in checkForNatural =', outcome)
    updatePlayer(outcome);
    setComputerPlayer({
      ...computerPlayer,
      currentCards: computerPlayer.currentCards,
    });
  }

  function handleHit() {
    game.player.hit();
    const outcome = game.checkForBust();
    updatePlayer(outcome);
    game.checkForBlackJack();
    setPlayer({
      ...player,
      currentCards: player.currentCards,
      totalMoney: game.player.totalMoney,
    });
  }

  function updatePlayer(outcome) {
    const _player = { ...player, currentCards: player.currentCards };
    outcome
      ? setPlayer({
          ..._player,
          totalMoney: game.player.totalMoney,
          [outcome]: game.player[outcome],
        })
      : setPlayer({ ..._player });
  }

  function handleStay() {
    player.stay();
  }

  function handlePlayAgain() {
    game.playAgain();
  }

  return (
    <div>
      <Button label="Start Game" clickHandler={handleStartGame} />
      {game ? (
        <div>
          <BetInput player={player} setPlayer={setPlayer} />
          <Button label="Deal" clickHandler={handleDeal} />
          <Button label="Hit" clickHandler={handleHit} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
