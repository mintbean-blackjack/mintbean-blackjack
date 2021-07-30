import React, { useState } from 'react';
import Game from '../classes/Game';

export const GameTable = () => {
  let game;
  let dealer;
  const [player, setPlayer] = useState({});
  const [computerPlayer, setComputerPlayer] = useState({});

  function handleStartGame() {
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

  return();
}