import Dealer from "./Dealer";
import Player from "./Player";
import ComputerPlayer from "./ComputerPlayer";

// let currentPlayer;

// if (!window.localStorage.getItem("currentPlayer")) {
//   currentPlayer = window.localStorage.setItem(
//     "currentPlayer",
//     JSON.stringify({
//       username: "Guest",
//       totalMoney: 2500,
//       wins: 0,
//       losses: 0,
//       draws: 0,
//     })
//   );
// } else {
//   currentPlayer = JSON.parse(window.localStorage.getItem("currentPlayer"));
// }

// console.log("current player obj before game is made", currentPlayer);

let { username, totalMoney, wins, losses, draws } = JSON.parse(
  window.localStorage.getItem("currentPlayer")
);

export default class Game {
  constructor() {
    this.dealer = new Dealer();
    this.player = new Player(
      username,
      totalMoney,
      wins,
      losses,
      draws,
      this.dealer
    );
    this.computerPlayer = new ComputerPlayer(
      null,
      Infinity,
      null,
      null,
      null,
      this.dealer
    );
    this.allPlayers = [this.computerPlayer, this.player];
    this.outcome = "";
  }

  dealInitialHand() {
    this.dealer.shuffle();
    this.player.hit();
    this.computerPlayer.hit();
    this.player.hit();
    this.computerPlayer.hit();
  }

  getCardTotals() {
    return [this.player.getCardTotal(), this.computerPlayer.getCardTotal()];
  }

  checkForNatural() {
    const [playerHand, dealerHand] = this.getCardTotals();
    if (playerHand === 21 || dealerHand === 21) {
      if (playerHand === 21) {
        this.outcome = "wins";
      } else if (dealerHand === 21) {
        this.outcome = "losses";
      } else {
        this.outcome = "draws";
      }
      this.calculatePayout();
      return this.outcome;
    } else {
      return null;
    }
  }

  checkForBlackJack() {
    // after the player receives a card, if their total is 21 then they should stand (they haven't necessarily won, though)
    if (this.player.getCardTotal() === 21) {
      this.player.stay();
    }
  }

  checkForBust() {
    // after the player receives a card, if their total is > 21 then they've lost
    const [playerHand, dealerHand] = this.getCardTotals();
    if (playerHand > 21 || dealerHand > 21) {
      if (playerHand > 21) {
        this.outcome = "losses";
      } else {
        this.outcome = "wins";
      }
      this.calculatePayout();
      return this.outcome;
    } else {
      return null;
    }
  }

  findWinner() {
    // gets called when they player clicks on the "stand" button
    const [playerHand, dealerHand] = this.getCardTotals();
    if (playerHand === dealerHand) {
      this.outcome = "draws";
    } else if (playerHand > dealerHand) {
      this.outcome = "wins";
    } else if (playerHand < dealerHand) {
      this.outcome = "losses";
    }
    this.calculatePayout();
    return this.outcome;
  }

  calculatePayout() {
    let payout;
    if (this.outcome === "wins") {
      payout = this.player.currentBetAmount * 1.5;
    } else if (this.outcome === "losses") {
      payout = -this.player.currentBetAmount;
    } else {
      payout = 0;
    }
    this.displayWinner(payout);
  }

  displayWinner(payout) {
    this.player.updateTotalMoney(payout);
    this.player.updateOutcome(this.outcome);
    updateLocalStorage(this.outcome, payout);
    if (this.outcome === "wins") {
      //add logic to check if user is logged in; use thunk actions to update win and payout in db
      //also retreive from local storage, update, convert back to string, store again
      return `Congratulations! You Win $${payout}!`;
    } else if (this.outcome === "losses") {
      return `Sorry! You Lose $${-payout} :(`;
    } else {
      return `You tied! You get back all your money.`;
    }
  }

  playAgain() {
    this.player.updateCurrentCards([]);
    this.computerPlayer.updateCurrentCards([]);
    this.outcome = "";
    if (this.dealer.deck.length <= 26) {
      this.dealer.shuffle();
    }
    //player can now place a bet
  }
}

const updateLocalStorage = (outcomeType, payout) => {
  let storedPlayer = JSON.parse(window.localStorage.getItem("currentPlayer"));
  storedPlayer[outcomeType]++;
  storedPlayer.totalMoney += payout;
  window.localStorage.setItem("currentPlayer", JSON.stringify(storedPlayer));
};
