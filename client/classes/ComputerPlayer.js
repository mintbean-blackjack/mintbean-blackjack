import Player from "./Player";

export default class ComputerPlayer extends Player {
  constructor(username, totalMoney, wins, losses, draws, dealer) {
    super(username, totalMoney, wins, losses, draws, dealer);
    this.currentCards = [];
  }
  play() {
    let didPlay = false;
    while (this.getCardTotal() < 17) {
      didPlay = true;
      this.hit();
    }
    return didPlay;
  }
}