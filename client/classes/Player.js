//access player from local storage
// const { username, totalMoney, wins, losses, draws } = JSON.parse(
//   window.localStorage.getItem("currentPlayer")
// );
// let currentPlayer = JSON.parse(window.localStorage.getItem("currentPlayer"));

export default class Player {
  //construct player from local storage
  constructor(username, totalMoney, wins, losses, draws, dealer) {
    this.name = username;
    this.currentCards = [];
    this.totalMoney = totalMoney;
    this.currentBetAmount = 0;
    this.dealer = dealer;
    this.wins = wins;
    this.losses = losses;
    this.draws = draws;
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

  updateOutcome(outcome) {
    console.log('outcome in updateOutcome =', outcome)
    console.log(`this[${outcome}] before incrementing =`, this[outcome])
    this[outcome]++;
    console.log(`this[${outcome}] after incrementing =`, this[outcome])
  }

  updateTotalMoney(payout) {
    this.totalMoney += payout;
  }
}
