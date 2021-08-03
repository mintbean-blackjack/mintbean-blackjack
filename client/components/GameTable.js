import React, { useState } from "react";
import Game from "../classes/Game";
import { Button } from "./Button";
import { BetInput } from "./BetInput";
import { Card } from "./Card";
import { Counters } from "./Counters";

export const GameTable = () => {
  const [game, setGame] = useState(null);
  const [player, setPlayer] = useState(null);
  const [computerPlayer, setComputerPlayer] = useState(null);

  const [toggleDeal, setToggleDeal] = useState(false);
  const [toggleHitAndStay, setToggleHitAndStay] = useState(false);
  const [toggleShowCards, setToggleShowCards] = useState(false);

  function handleStartGame() {
    //before creating game, check if local storage player exists (logged in user is stored upon log in and removed upon log out);
    //if local storage player does not exist, add guest player to local storage
    let currentPlayer;
    if (!window.localStorage.getItem("currentPlayer")) {
      currentPlayer = window.localStorage.setItem(
        "currentPlayer",
        JSON.stringify({
          username: "Guest",
          totalMoney: 2500,
          wins: 0,
          losses: 0,
          draws: 0,
        })
      );
    } else {
      currentPlayer = JSON.parse(window.localStorage.getItem("currentPlayer"));
    }
    if (currentPlayer) {
      const _game = new Game();
      setGame(_game);
      setPlayer(_game.player);
      setComputerPlayer(_game.computerPlayer);
    }
  }

  function handleDeal() {
    // player clicks on deal button after they've placed their bets (like in 247 blackjack)
    game.player.placeBet(player.currentBetAmount);
    game.dealInitialHand();
    const outcome = game.checkForNatural();
    updatePlayer(outcome);
    setComputerPlayer({
      ...computerPlayer,
      currentCards: computerPlayer.currentCards,
    });
    setToggleDeal(false);
    setToggleShowCards(true);
    if (!outcome) {
      setToggleHitAndStay(true);
    }
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
    const didPlay = game.computerPlayer.play();
    if (didPlay) {
      setComputerPlayer({
        ...computerPlayer,
        currentCards: game.computerPlayer.currentCards,
      });
    }
    const outcome = game.findWinner();
    updatePlayer(outcome);
    setToggleHitAndStay(false);
  }

  function handlePlayAgain() {
    game.playAgain();
  }

  return (
    <div>
      <Button label="Start Game" clickHandler={handleStartGame} />
      {game ? (
        <div>
          <Counters player={player} />
          <BetInput
            player={player}
            setPlayer={setPlayer}
            setToggleDeal={setToggleDeal}
          />
          {toggleDeal && <Button label="Deal" clickHandler={handleDeal} />}
          {toggleHitAndStay && (
            <div>
              <Button label="Hit" clickHandler={handleHit} />
              <Button label="Stay" clickHandler={handleStay} />
            </div>
          )}
          {toggleShowCards && (
            <div>
              <div>Your cards:</div>
              {player.currentCards.map((card, index) => (
                <Card key={index} card={card} isVisible={true} />
              ))}
              <div>{"Dealer's cards:"}</div>
              {computerPlayer.currentCards.map((card, index) => (
                <Card key={index} card={card} isVisible={index === 0} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
