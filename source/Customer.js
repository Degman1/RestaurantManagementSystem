const Person = require('./Person');
const FiniteStateMachine = require('./FiniteStateMachine');
const Logger = require('./Logger');

class Customer extends Person {
  #tableID;
  #state;
  #balance;
  #paymentMethod = undefined;

  constructor(lastName, email) {
    super(lastName, email);
    this.description = "[Customer: " + this.getLastName() + ", " + this.getEmail() + "]";
    this.#tableID = undefined;
    this.#balance = 0;
    this.#paymentMethod = undefined;   // TODO create a payment plug
    this.#state = new FiniteStateMachine()
      .createState("inactive", [{wait: "waitlisted"}, {seat: "seated"}])
      .createState("waitlisted", [{remove: "inactive"}, {seat: "seated"}])
      .createState("seated", [{pay: "inactive"}]);
  }

  // showState(): String | undefined
  showState() {
    return this.#state.showState();
  }

  // getTableID(): number
  getTableID() {
    return this.#tableID;
  }

  // addToWaitlist(): this
  addToWaitlist() {
    if (this.showState() === "inactive") {
      this.#state.nextState("wait");
      Logger.printDebug(this.description + " added to the waitlist");
    } else if (this.showState() === "waitlisted") {                   // TODO remove debug statements?
      Logger.printDebug(this.description + " is already on the waitlist");
    } else if (this.showState() === "seated") {
      Logger.printDebug(this.description + " is already seated");
    }
    return this;
  }

  // removeFromWaitlist(): this
  removeFromWaitlist() {
    if (this.showState() === "inactive") {
      Logger.printDebug(this.description + " is not on the waitlist");
    } else if (this.showState() === "waitlisted") {
      this.#state.nextState("remove");
      Logger.printDebug(this.description + " removed from waitlist");
    } else if (this.showState() === "seated") {
      Logger.printDebug(this.description + " is not on the waitlist");
    }

    return this;
  }

  // seat(tableID: number): this
  seat(tableID) {
    this.#state.nextState("seat");
    this.#tableID = tableID;
    Logger.printDebug(this.description + " seated at table " + tableID);
    return this;
  }

  // pay(): this
  pay() {
    this.#state.nextState("pay");
    this.#tableID = undefined;
    this.#balance = 0;       // TODO: change depending on how the system handles payments
    Logger.printDebug(this.description + " successfully payed");
    return this;
  }

  // addToBalance(amount: number): this
  // amount in dollars
  addToBalance(amount) {
    this.#balance += amount;
    return this;
  }

  // getBalance(): number
  getBalance() {
    return this.#balance;
  }
}

module.exports = Customer;