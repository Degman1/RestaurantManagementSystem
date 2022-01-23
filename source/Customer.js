const Person = require('./Person');
const FiniteStateMachine = require('./FiniteStateMachine');
const Logger = require('./Logger');

class Customer extends Person {
  size;
  tableID;
  balance;

  constructor(lastName, email, size) {
    super(lastName, email);
    this.size = size;
    this.tableID = undefined;
    this.balance = 0;
    this.state = new FiniteStateMachine()
      .createState("inactive", [{wait: "waitlisted"}, {seat: "seated"}])
      .createState("waitlisted", [{remove: "inactive"}, {seat: "seated"}])
      .createState("seated", [{pay: "inactive"}]);
  }

  // getTableID(): number
  getTableID() {
    return this.tableID;
  }

  // addToWaitlist(): this
  addToWaitlist() {
    if (this.showState() === "inactive") {
      this.state.nextState("wait");
      Logger.printDebug("added to waitlist", this.description());
    } else if (this.showState() === "waitlisted") {                   // TODO remove debug statements?
      Logger.printDebug("already on waitlist", this.description());
    } else if (this.showState() === "seated") {
      Logger.printDebug("already seated", this.description());
    }

    return this;
  }

  // removeFromWaitlist(): this
  removeFromWaitlist() {
    if (this.showState() === "waitlisted") {
      this.state.nextState("remove");
      Logger.printDebug("removed from waitlist", this.description());
    } else {
      Logger.printDebug("not on the waitlist", this.description());
    }

    return this;
  }

  // seat(tableID: number): this
  seat(tableID) {
    this.state.nextState("seat");   // if already seated, state will not change and will just update the table
    this.tableID = tableID;
    Logger.printDebug("seated at table " + tableID, this.description());
    return this;
  }

  // pay(): this
  pay() {   // ability to pay the balance due during any state
    this.state.nextState("pay");
    this.tableID = undefined;
    this.balance = 0;       // TODO: change depending on how the system handles payments
    Logger.printDebug("successfully payed", this.description());
    return this;
  }

  // addToBalance(amount: number): this
  // amount in dollars
  addToBalance(amount) {
    this.balance += amount;
    return this;
  }

  // getBalance(): number
  getBalance() {
    return this.balance;
  }
}

module.exports = Customer;