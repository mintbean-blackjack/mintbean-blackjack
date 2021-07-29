import Dealer from "./Dealer";
import Player from "./Player";
import ComputerPlayer from "./ComputerPlayer";

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
    //player can now place a bet
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
    let loser;
    if (playerHand == dealerHand) {
      //draw; no need to calculate payout and can just return message
      return "Draw";
    } else if (playerHand > dealerHand && playerHand <= 21) {
      winner = this.player;
      loser = this.computerPlayer;
    } else if (playerHand < dealerHand && dealerHand <= 21) {
      winner = this.computerPlayer;
      loser = this.player;
    }
    this.calculatePayout(winner, loser);
  }

  calculatePayout(winner, loser) {
    //need additional logic to determine if any player has a natural and therfore wins 1.5x payout
    //maybe add hasNatural to player property and set to false at the end of every game, set to true if natural after dealing
    let payout = winner.currentBetAmount + loser.currentBetAmount;
    this.displayWinner(winner, loser, payout);
  }

  displayWinner(winner, loser, payout) {
    winner.updateTotalMoney(payout);
    loser.updateTotalMoney(-loser.currentBetAmount);
    //something to consider: what happens when computer is the dealer - should the dealer have totalMoney?
    //if so, what happens when the dealer runs out of money
    return `${winner.name} wins ${payout}!`;
  }
}
