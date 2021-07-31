import React, { useState } from 'react';
import Game from '../classes/Game';
import { Button } from './Button';
import Card from './Card';

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

  console.log('game in GameTable body >>>>', game)
  console.log('player in GameTable body >>>>', player)
  console.log('computerPlayer in GameTable body >>>>', computerPlayer)

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