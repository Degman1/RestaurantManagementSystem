const Person = require('./Person');
const FiniteStateMachine = require('./FiniteStateMachine');
const Logger = require('./Logger');

class Employee extends Person {
  #username;    // username and password to clock in and out of the time sheet
  #password;
  firstName;

  constructor(firstName, lastName, email, username, password) {
    super(lastName, email);
    this.type = this.constructor.name;
    this.firstName = firstName;
    this.#username = username;
    this.#password = password;
    this.state = new FiniteStateMachine()
      .createState("clockedOut", [{clockIn: "clockedIn"}])
      .createState("clockedIn", [{clockOut: "clockedOut"}]);
  }

  // arePropertiesValidated(): boolean
  arePropertiesValidated() {
    return super.arePropertiesValidated() && validateName(this.firstName) && validateUsername(this.#username) && validatePassword(this.#password);
  }
}