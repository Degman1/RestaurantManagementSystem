const FiniteStateMachine = require('./FiniteStateMachine');

class Table {
  size;
  customer;
  waiter;
  state;

  constructor(size) {
    this.size = size;
    this.customer = undefined;
    this.waiter = undefined;
    this.state = new FiniteStateMachine()
      .createState("unoccupied", [{join: "occupied"}])
      .createState("occupied", [{leave: "unoccupied"}]);
  }

  // showState(): String | undefined
  showState() {
    return this.state.showState();
  }

  // getSize(): Number
  getSize() {
    return this.size;
  }

  // assignCustomer(c: Customer): this
  assignCustomer(c) {
    this.customer = c;
    this.state.nextState("join");
    return this;
  }

  // removeCustomer(): this
  removeCustomer() {
    this.customer = undefined;
    this.state.nextState("leave");
    return this;
  }

  // getCustomer(): Customer
  getCustomer() {
    return this.customer;
  }

  // assignWaiter(w: Waiter): this
  assignWaiter(w) {
    this.waiter = w;
    return this;
  }

  // getWaiter(): Waiter
  getWaiter() {
    return this.waiter;
  }
}

module.exports = Table;