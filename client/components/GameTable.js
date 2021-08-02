import React, { useState } from "react";
import Game from "../classes/Game";
import { fetchUser } from "../store/user";

export const GameTable = () => {
  let game;
  let dealer;
  const [player, setPlayer] = useState({});
  const [computerPlayer, setComputerPlayer] = useState({});

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

    game = new Game();
    const { _dealer, _player, _computerPlayer } = game;
    dealer = _dealer;
    setPlayer(_player);
    setComputerPlayer(_computerPlayer);
  }

  function handleDeal(num) {
    // player clicks on deal button after they've placed their bets (like in 247 blackjack)
    const err = player.placeBet(num);
    game.dealInitialHand();
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

  return ();
};
