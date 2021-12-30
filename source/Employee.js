const Person = require('./Person');
const FiniteStateMachine = require('./FiniteStateMachine');
const Logger = require('./Logger');
const Validate = require('./Validate');

class Employee extends Person {
  firstName;
  password;    // password to clock in and out of the timesheet

  constructor(firstName, lastName, email, password) {
    super(lastName, email);
    const myReject = err => Logger.printError(err.message, this.description());   // TODO: if program is setup with a GUI, should make this compatible
    this.setFirstName(firstName).catch(myReject);
    this.setPassword(password).catch(myReject);
    this.state = new FiniteStateMachine()
      .createState("clockedOut", [{clockIn: "clockedIn"}])
      .createState("clockedIn", [{clockOut: "clockedOut"}]);
  }

  // arePropertiesValidated(): boolean
  arePropertiesValidated() {
    return super.arePropertiesValidated() && Validate.validateName(this.getFirstName()) && Validate.validatePassword(this.getPassword());
  }

  // getFirstName(): String
  getFirstName() {
    return this.firstName;
  }

  // setFirstName(firstName: String): Promise
  setFirstName(firstName) {
    return this.validateAndSetProperty("firstName", Validate.validateName, firstName, "must contain only letters, spaces, and dashes");
  }

  // getPassword(): String
  getPassword() {
    return this.password;
  }

  // setPassword(password: String): Promise
  setPassword(password) {
    return this.validateAndSetProperty("password", Validate.validatePassword, password, "must be a number");
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