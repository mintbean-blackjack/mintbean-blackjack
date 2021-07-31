import Player from "./Player";

export default class ComputerPlayer extends Player {
  constructor(currentCards, dealer) {
    super(currentCards, dealer);
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