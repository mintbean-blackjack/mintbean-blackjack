import Dealer from "./Dealer";
import Player from "./Player";
import ComputerPlayer from "./ComputerPlayer";

export default class Game {
  constructor() {
    this.dealer = new Dealer();
    this.player = new Player(this.dealer);
    this.computerPlayer = new ComputerPlayer();
    this.allPlayers = [this.computerPlayer, this.player];
    this.outcome = "";
  }

  dealInitialHand() {
    this.player.hit();
    this.computerPlayer.hit();
    this.player.hit();
    this.computerPlayer.hit();
    this.findWinner();
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

  endGame() {
    this.findWinner();
  }

  findWinner() {
    let playerHand = this.player.getCardTotal();
    let dealerHand = this.computerPlayer.getCardTotal();
    if (playerHand == dealerHand) {
      this.outcome = "Tied";
    } else if (playerHand > dealerHand && playerHand <= 21) {
      this.outcome = "Win";
    } else if (playerHand < dealerHand && dealerHand <= 21) {
      this.outcome = "Lose";
    }
    this.calculatePayout();
  }

  calculatePayout() {
    let payout;
    if (this.outcome === "Win") {
      payout = this.player.currentBetAmount * 1.5;
    } else if (this.outcome === "Lose") {
      payout = -this.player.currentBetAmount;
    } else {
      payout = 0;
    }
    this.displayWinner(payout);
  }

  displayWinner(payout) {
    this.player.updateTotalMoney(payout);
    if (this.outcome === "Win") {
      //add logic to check if user is logged in; use thunk actions to update win and payout in db
      //also retreive from local storage, update, convert back to string, store again
      updateLocalStorage("wins", payout);
      return `Congratulations! You ${this.outcome} $${payout}!`;
    } else if (this.outcome === "Lose") {
      updateLocalStorage("losses", payout);
      return `Sorry! You ${this.outcome} $${-payout} :(`;
    } else {
      updateLocalStorage("draws", 0);
      return `You tied! You get back all your money.`;
    }
  }
}

const updateLocalStorage = (outcomeType, payout) => {
  let storedPlayer = JSON.parse(window.localStorage.getItem("currentPlayer"));
  storedPlayer[outcomeType]++;
  storedPlayer.totalMoney += payout;
  window.localStorage.setItem("currentPlayer", JSON.stringify(storedPlayer));
};
