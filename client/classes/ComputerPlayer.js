import Player from "./Player";

export default class ComputerPlayer extends Player {
  constructor(name, currentCards, totalMoney, currentBetAmount) {
    super(name, currentCards, totalMoney, currentBetAmount);
  }
  play() {
    const { cardTotal } = this;
    if (cardTotal >= 17) {
      this.stay();
    } else if (cardTotal < 16) {
      this.hit();
    }
  }
}