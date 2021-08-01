import Dealer from "./Dealer";
import Player from "./Player";
import ComputerPlayer from "./ComputerPlayer";

export default class Game {
  constructor(username) {
    this.dealer = new Dealer();
    //will have to change logic for a logged in user
    this.player = new Player(username, this.dealer);
    this.computerPlayer = new ComputerPlayer(null, this.dealer);
    this.allPlayers = [this.computerPlayer, this.player];
    this.outcome = "";
  }

  dealInitialHand() {
    this.dealer.shuffle();
    this.player.hit();
    this.computerPlayer.hit();
    this.player.hit();
    this.computerPlayer.hit();
    this.checkForNatural();
  }

  getCardTotals() {
    return [this.player.getCardTotal(), this.computerPlayer.getCardTotal()];
  }

  checkForNatural() {
    // if either player is deal a 21, they're automatically the winner
    const [playerHand, dealerHand] = this.getCardTotals();
    if (playerHand === 21 || dealerHand === 21) {
      if (playerHand === 21) {
        this.outcome = "Win";
      } else if (dealerHand === 21) {
        this.outcome = "Lose";
      } else {
        this.outcome = "Tied";
      }
      this.calculatePayout();
    } else {
      return;
    }
  }

  checkForBlackJack() {
    // after the player receives a card, if their total is 21 then they should stand (they haven't necessarily won, though)
    if (this.player.getCardTotal() === 21) {
      this.player.stand();
    }
  }

  checkForBust() {
    // after the player receives a card, if their total is > 21 then they've lost
    const [playerHand, dealerHand] = this.getCardTotals();
    if (playerHand > 21 || dealerHand > 21) {
      if (playerHand > 21) {
        this.outcome = "Lose";
      } else {
        this.outcome = "Win";
      }
      this.calculatePayout();
    } else {
      return;
    }
  }

  findWinner() {
    // gets called when they player clicks on the "stand" button
    const [playerHand, dealerHand] = this.getCardTotals();
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
      return `Congratulations! You ${this.outcome} $${payout}!`;
    } else if (this.outcome === "Lose") {
      return `Sorry! You ${this.outcome} $${-payout} :(`;
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
