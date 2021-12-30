const Employee = require('./Employee');

class Cook extends Employee {   // TODO: when the system requires more advancements/specific details about cooks, add additional fields here
  constructor(firstName, lastName, email, password) {
    super(firstName, lastName, email, password);
    this.orders = [];
  }
}