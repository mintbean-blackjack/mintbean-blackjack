import Dealer from './Dealer';
import Game from './Game';

export default class Player {
  constructor() {
    this.name = '';
    this.currentCards = [];
    this.totalMoney = 0;
    this.currentBetAmount = 0;
    this.dealer;
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

  getCurrentCards() {
    return this.currentCards;
  }

  // edge case of handling aces
  getCardTotal() {
    const cards = this.getCurrentCards();
    const faceCards = ['J', 'Q', 'K'];

    // TODO: handle edge cases of multiple aces
    const cardTotal = cards.reduce((total, card) => {
      // if our app is smart and decides the value of ace for the player
      if (card.value === 'A') {
        // if ace is counted as 1 and the player would bust otherwise
        if (total + 1 <= 21 && total + 11 > 21) {
          return total + 1;
        }
        // if ace is counted as 11
        else if (total + 11 <= 21) {
          return total + 11;
        }
      } else if (faceCards.includes(card.value)) {
        return total + 10;
      }
      return total + Number(card.value);
    }, 0);
    return cardTotal;
  }

  // assign dealer
  // later called in the game instance, where the dealer is instantiated
  setDealer(dealer) {
    this.dealer = dealer;
  }
}
