class Kitchen {
  ordersToFulfill = [];

  // enqueueToOrders(c: Customer): this
  enqueueToOrders(c) {
    this.ordersToFulfill.push(c);
    return this;
  }

  // dequeueFromOrders(): Promise
  dequeueFromOrders() {
    const ref = this;                     // store this in a variable in the lexical environment so it can be used in the closure
    const orderCanBePrepared = true;      // TODO: when system tracks inventory, check for availability here
    return new Promise((myResolve, myReject) => {
      if (orderCanBePrepared) {
        myResolve(ref.ordersToFulfill.shift());
      } else {
        myReject(Error("order cannot be prepared"));
      }
    });
  }

  // peakNextOrder(): Customer | undefined
  peakNextOrder() {
    return this.ordersToFulfill.length === 0 ? undefined : this.ordersToFulfill[0];
  }

  // getOrdersLength(): Number
  getOrdersLength() {
    return this.ordersToFulfill.length;
  }
}

module.exports = Kitchen;