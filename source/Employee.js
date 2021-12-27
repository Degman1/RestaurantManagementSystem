const Person = require('./Person');
const FiniteStateMachine = require('./FiniteStateMachine');
const Logger = require('./Logger');

class Employee extends Person {
  #username;    // username and password to clock in and out of the time sheet
  #password;
  #firstName;
  #state;

  constructor(firstName, lastName, email, username, password) {
    super(lastName, email);
    this.#firstName = firstName;
    this.#username = username;
    this.#password = password;
    this.#state = new FiniteStateMachine()
      .createState("clockedOut", [{clockIn: "clockedIn"}])
      .createState("clockedIn", [{clockOut: "clockedOut"}]);
  }

  // arePropertiesValidated(): boolean
  arePropertiesValidated() {
    return super.validateName() && validateName(this.#firstName) && validateUsername(this.#username) && validatePassword(this.#password);
  }

  // Do i need to restate this?
  // showState(): String | undefined
  showState() {
    return this.#state.showState();
  }
}