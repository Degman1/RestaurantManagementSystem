const Employee = require('./Employee');

class Host extends Employee {
  waitlist;   // Queue of Customers

  constructor(firstName, lastName, email, password) {
    super(firstName, lastName, email, password);
    this.waitlist = [];
  }

  // clear(): this
  clear() {
    this.waitlist = []
  }

  // enqueueToWaitlist(c: Customer): this
  enqueueToWaitlist(c) {
    this.waitlist.push(c);
    return this;
  }

  // dequeueFromWaitlist(): Customer
  dequeueFromWaitlist() {
    return this.waitlist.shift();
  }

  // peakNextCustomer(): Customer | undefined
  peakNextCustomer() {
    return this.waitlist.length === 0 ? undefined : this.waitlist[0];
  }

  // getWaitlistLength(): Number
  getWaitlistLength() {
    return this.waitlist.length;
  }

  // getWaitlistRank(lastName: String): Number
  getWaitlistRank(lastName) {
    return this.waitlist.findIndex(c => c.getLastName() === lastName);
  }
}

module.exports = Host;