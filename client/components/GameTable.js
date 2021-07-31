import React, { useState } from 'react';
import Game from '../classes/Game';
import { Button } from './Button';
import Card from './Card';

export const GameTable = () => {
  let game;
  let dealer;
  const [player, setPlayer] = useState(null);
  const [computerPlayer, setComputerPlayer] = useState(null);

  function handleStartGame() {
    game = new Game();
    dealer = game.dealer;
    setPlayer(game.player);
    console.log('game.player >>>>', game.player)
    console.log('game.computerPlayer >>>>>', game.computerPlayer)
    console.log('game in handleStartGame >>>>>', game)
    setComputerPlayer(game.computerPlayer);
  }

  console.log('game in GameTable body >>>>', game)
  function handleDeal(num) {
    // player clicks on deal button after they've placed their bets (like in 247 blackjack)
    // const err = game.player.placeBet(num);
    // game.dealInitialHand();
    console.log('in handleDeal')
    console.log('game in handleDeal >>>>', game)
    if (game) {
      game.player.placeBet(num);
      game.dealInitialHand();
      console.log('player currentCards >>>>', game.player.currentCards)
      console.log('computerPlayer currentCards >>>>', game.computerPlayer.currentCards)
    }
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

  return(
    <div>
      <Button label="Start Game" clickHandler={handleStartGame} />
      <Button label="Deal" clickHandler={() => handleDeal(500)} />
    </div>
  );
}