import Player from "./Player";

export default class ComputerPlayer extends Player {
  constructor(username, totalMoney, wins, losses, draws, dealer) {
    super(username, totalMoney, wins, losses, draws, dealer);
    this.currentCards = [];
  }
  play() {
    const { cardTotal } = this;
    while (cardTotal < 16) {
      this.hit();
    }
    this.stay();
  }
}