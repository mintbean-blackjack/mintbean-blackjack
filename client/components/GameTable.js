import React, { useState } from 'react';
import Game from '../classes/Game';

export const GameTable = () => {
  let game;
  let dealer;
  const [player, setPlayer] = useState({});
  const [computerPlayer, setComputerPlayer] = useState({});

  function startGameHandler() {
    game = new Game();
    const { _dealer, _player, _computerPlayer } = game;
    dealer = _dealer;
    setPlayer(_player);
    setComputerPlayer(_computerPlayer);
  }

  function playAgainHandler() {
    game.playAgain();
  }

  function hitHandler() {
    player.hit();
  }

  function stayHandler() {
    player.stay();
  }

  function placeBetHandler(num) {
    const err = player.placeBet(num);
  }

  return();
}