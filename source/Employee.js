const Person = require('./Person');
const FiniteStateMachine = require('./FiniteStateMachine');
const Logger = require('./Logger');
const Validate = require('./Validate');

class Employee extends Person {
  static idCounter = 0;
  id;
  firstName;
  password;    // password to clock in and out of the timesheet

  constructor(firstName, lastName, email) {
    super(lastName, email);
    this.id = Employee.idCounter;
    ++Employee.idCounter;
    const myReject = err => Logger.printError(err.message, this.description());   // TODO: if program is setup with a GUI, should make this compatible
    this.setFirstName(firstName).catch(myReject);
    this.state = new FiniteStateMachine()
      .createState("clockedOut", [{clockIn: "clockedIn"}])
      .createState("clockedIn", [{clockOut: "clockedOut"}]);
  }

  // arePropertiesValidated(): boolean
  arePropertiesValidated() {
    return super.arePropertiesValidated() && Validate.validateName(this.getFirstName());
  }

  // getFirstName(): String
  getFirstName() {
    return this.firstName;
  }

  // setFirstName(firstName: String): Promise
  setFirstName(firstName) {
    return this.validateAndSetProperty("firstName", Validate.validateName, firstName, "must contain only letters, spaces, and dashes");
  }

  // showState(): String
  showState() {
    return this.state.showState();
  }
  
  // clockIn(): this
  clockIn() {
    this.state.nextState("clockIn");
    return this;
  }

  // clockOut(): this
  clockOut() {
    this.state.nextState("clockOut");
    return this;
  }
}

module.exports = Employee;