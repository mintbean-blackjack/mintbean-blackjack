import Player from "./Player";

export default class ComputerPlayer extends Player {
  constructor(name, currentCards) {
    super(name, currentCards);
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