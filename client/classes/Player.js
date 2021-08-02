//access player from local storage
const {
  storedName,
  storedMoney,
  storedWins,
  storedLosses,
  storedDraws,
} = JSON.parse(window.localStorage.getItem("currentPlayer"));

export default class Player {
  //construct player from local storage
  constructor(dealer) {
    this.name = storedName;
    this.currentCards = [];
    this.totalMoney = storedMoney;
    this.currentBetAmount = 0;
    this.dealer = dealer;
    this.wins = storedWins;
    this.losses = storedLosses;
    this.draws = storedDraws;
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

  getCardTotal() {
    // count the number of aces
    const acesArray = this.currentCards.filter((card) => card.value === "A");
    const faceCards = ["J", "Q", "K"];

    // temporarily add up non-ace cards
    let total = this.currentCards
      .filter((card) => card.value !== "A")
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

  placeBet(num) {
    const bet = Number(num);
    if (bet <= this.totalMoney) {
      this.currentBetAmount = bet;
    } else {
      return "You do not have enough money. Choose a smaller amount.";
    }
  }

  updateTotalMoney(payout) {
    this.totalMoney += payout;
  }
}
