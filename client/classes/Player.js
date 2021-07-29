import Dealer from './Dealer';
import Game from './Game';

export default class Player {
  constructor(name, dealer) {
    this.name = name;
    this.currentCards = [];
    this.totalMoney = 2500;
    this.currentBetAmount = 0;
    this.dealer = dealer;
  }

  // player takes a card
  hit() {
    const card = this.dealer.deal();
    this.updateCurrentCards(card);
  }

  // player doesn't take a card
  stay() {
    return;
  }

  updateCurrentCards(card) {
    this.currentCards.push(card);
  }

  // edge case of handling aces
  getCardTotal() {
    // count the number of aces
    const acesArray = this.currentCards.filter((card) => card.value === 'A');

    const faceCards = ['J', 'Q', 'K'];

    // temporarily add up non-ace cards
    let total = this.currentCards
      .filter((card) => card.value !== 'A')
      .reduce((total, card) => {
        if (faceCards.includes(card.value)) {
          return total + 10;
        }
        return total + Number(card.value);
      }, 0);

    while (acesArray.length > 1) {
      acesArray.pop();
      total++;
    }

    if (acesArray.length === 1) {
      if (total <= 10) {
        total += 11;
      } else {
        total++;
      }
    }

    return total;
  }

  // assign dealer
  // later called in the game instance, where the dealer is instantiated
  setDealer(dealer) {
    this.dealer = dealer;
  }
}
