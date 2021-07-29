import Dealer from "./Dealer";
import Player from "./Player";
import ComputerPlayer from "./ComputerPlayer";

//ex. player class:
// class Player {
//   constructor() {
//     this.name = "p1";
//     this.currentCards = [];
//     this.totalMoney = 2500;
//     this.currentBetAmount = 0;
//   }
// }

//computer player extends player, just has specific play logic
// class ComputerPlayer {
//   constructor() {
//     this.name = "comp";
//     this.currentCards = [];
//     this.totalMoney = technically unlimited?;
//     this.currentBetAmount = 0;
//   }
// }

// ex dealer class:
// class Dealer {
//     constructor() {
//         this.deck = makeDeck();
//     }
// }

export default class Game {
  constructor() {
    //initiating new player, dealer, computer player here rather than in startGame

    this.player = new Player();
    //will have to change logic for a logged in user

    this.dealer = new Dealer();
    this.computerPlayer = new ComputerPlayer();
    this.allPlayers = [this.player, this.computerPlayer];

    //thinking rather than have active players in the constructor of the game, we can add isActive to player class and toggle between true and false (which is set when player busts)
    // this.activePlayers = {};
  }

  getActivePlayers() {
    //   if we instead add isActive to the player class
    //   if this.activePlayers is in the constructor:
    //   return Object.keys(this.activePlayers).filter((player) => activePlayers[player]);
  }

  //this method is reliant on adding activePlayers to the constructor
  //   removePlayer(player) {
  //       this.activePlayers[player] = false;
  //   }

  startGame() {
    //   "instantiates Player, AI Player(s), and Dealer if there are none already"
    // ^^NOTE: wouldn't this happen when we want to create new Game anyway?
    // NOTE: should the startGame() function be for starting ANOTHER game/start over rather than starting a brand-new game?

    // the following instead might be better off in the Game's constructor
    // new ComputerPlayer();
    // new Player();
    // new Dealer();
    if (this.dealer.deck.length <= 26) {
      this.dealer.shuffle();
    }
  }

  endGame() {
    this.findWinner();
    this.player.updateCurrentCards([]);
    this.computerPlayer.updateCurrentCards([]);
    //not necessary to call player.updateMoney again here as findWinner > calculatePayout > updateTotalMoney
  }

  findWinner() {
    let playerHand = this.player.getCardTotal();
    let dealerHand = this.computerPlayer.getCardTotal();
    let winner;
    if (playerHand == dealerHand) {
      winner = "draw";
    } else if (playerHand > dealerHand && playerHand <= 21) {
      winner = this.player;
    } else if (playerHand < dealerHand && dealerHand <= 21) {
      winner = this.computerPlayer;
    }
    this.calculatePayout(winner);
  }

  calculatePayout(winner) {
    if (winner === "draw") {
    }
    winner.updateTotalMoney();
    //calls this.displayWinner
  }

  displayWinner(player, payout) {}
}
