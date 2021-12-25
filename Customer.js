const Person = require('./Person');
const FiniteStateMachine = require('./FiniteStateMachine');
const Logger = require('./Logger');

class Customer extends Person {
  #tableID;
  #state;
  #billAmount = 0;
  #paymentMethod = undefined;   // TODO create a payment plug

  constructor(name, email) {
    super(name, email);
    this.description = "[Customer: " + this.getName() + ", " + this.getEmail() + "]";
    this.#tableID = undefined;
    this.#state = new FiniteStateMachine()
      .createState("inactive", [{wait: "waitlisted"}, {seat: "seated"}])
      .createState("waitlisted", [{remove: "inactive"}, {seat: "seated"}])
      .createState("seated", [{pay: "inactive"}]);
  }

  // showState(): String | undefined
  showState() {
    return this.#state.showState();
  }

  // addToWaitlist(): void
  addToWaitlist() {
    if (this.showState() === "inactive") {
      this.#state.nextState("wait");
      Logger.printDebug(this.description + " added to the waitlist");
    } else if (this.showState() === "waitlisted") {
      Logger.printDebug(this.description + " is already on the waitlist");
    } else if (this.showState() === "seated") {
      Logger.printDebug(this.description + " is already seated");
    }
  }

  // removeFromWaitlist(): void
  removeFromWaitlist() {
    if (this.showState() === "inactive") {
      Logger.printDebug(this.description + " is not on the waitlist");
    } else if (this.showState() === "waitlisted") {
      this.#state.nextState("remove");
      Logger.printDebug(this.description + " removed from waitlist");
    } else if (this.showState() === "seated") {
      Logger.printDebug(this.description + " is not on the waitlist");
    }
  }

  // seat(tableID: number): void
  seat(tableID) {
    if (this.showState() === "seated") {
      Logger.printDebug(this.description + " is already seated");
    } else {
      this.#state.nextState("seat");
      this.#tableID = tableID;
      Logger.printDebug(this.description + " seated at table " + tableID);
    }
  }

  // pay(): void
  pay() {
    if (this.showState() === "seated") {
      this.#state.nextState("pay");
      this.#tableID = undefined;
      this.#billAmount = 0;       // TODO: change depending on how the system handles payments
      Logger.printDebug(this.description + " successfully payed");
    } else {
      Logger.printDebug(this.description + " does not yet owe money");
    }
  }

  // addToBill(amount: number): void
  addToBill(amount) {
    this.#billAmount += amount;
  }
}

module.exports = Customer;