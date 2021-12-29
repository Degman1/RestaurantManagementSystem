const Logger = require('./Logger');
const FiniteStateMachine = require('./FiniteStateMachine');
const Validate = require('./Validate');

// ABSTRACT SUPERCLASS - can be instantiated, but not meant to be; only meant to be a template for objects classified as people
class Person {
  lastName;
  email;
  state;

  constructor(lastName, email) {  // when instantiating, must check for name and email validity first, otherwise it will be kept undefined
    const myReject = err => Logger.printError(err.message, this.description());   // TODO: if program is setup with a GUI, should make this compatible
    this.setLastName(lastName).catch(myReject);
    this.setEmail(email).catch(myReject);
    this.state = new FiniteStateMachine();
  }

  // description(): String
  description() {
    return "[" + this.constructor.name + ": " + this.getLastName() + "]";
  }

  // showState(): String | undefined
  showState() {
    return this.state.showState();
  }

  // arePropertiesValidated(): Boolean
  arePropertiesValidated() {
    return Validate.validateName(this.getLastName()) && Validate.validateEmail(this.getEmail());
  }
  
  // validateAndSetProperty(propertyName: String, validate: (String) => Boolean, newValue: Any)
  validateAndSetProperty(propertyName, validate, newValue, additionalErrorMessage = "") {
    let ref = this;
    return new Promise((myResolve, myReject) => {
      if (validate(newValue)) {
        ref[propertyName] = newValue;
        myResolve(true);
      } else {
        myReject(Error("\"" + newValue + "\" is invalid for the property " + propertyName + " for Person object" + (additionalErrorMessage === "" ? additionalErrorMessage : "...\n..." + additionalErrorMessage)));
      }
    });
  }

  // getLastName(): String | undefined
  getLastName() {
    return this.lastName;
  }

  // setlastName(lastName: String): Promise
  setLastName(lastName) {
    return this.validateAndSetProperty("lastName", Validate.validateName, lastName, "must contain only letters, spaces, and dashes");
  }

  // getEmail(): String | undefined
  getEmail() {
    return this.email;
  }

  // setEmail(email: String): Promise
  setEmail(email) {
    return this.validateAndSetProperty("email", Validate.validateEmail, email);
  }
}

module.exports = Person;