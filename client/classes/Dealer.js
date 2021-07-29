export default class Dealer {
  constructor() {
    this.deck = makeDeck();
  }
  shuffle() {
    const { deck } = this;
    for (let i = deck.length - 1; i > 1; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
  }
  deal() {
    return this.deck.pop();
  }
}

const makeDeck = () => {
  const deck = [];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const suits = ["clubs", "diamonds", "hearts", "spades"];
  for (const value of values) {
    for (const suit of suits) {
      deck.push(makeCard(value, suit));
    }
  }
  return deck;
}

const makeCard = (value, suit) => ({
  value,
  suit
});