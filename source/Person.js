const Logger = require('./Logger');
const FiniteStateMachine = require('./FiniteStateMachine');

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
    return "[" + this.constructor.name + ": " + this.getLastName() + ", " + this.getEmail() + "]";
  }

  // showState(): String | undefined
  showState() {
    return this.state.showState();
  }

  // arePropertiesValidated(): boolean
  arePropertiesValidated() {
    return validateName(this.lastName) && validateEmail(this.email);
  }
  
  // validateAndSetProperty(propertyName: String, validate: (String) => Boolean, newValue: Any)
  validateAndSetProperty(propertyName, validate, newValue) {
    let ref = this;
    return new Promise((myResolve, myReject) => {
      if (validate(newValue)) {
        ref[propertyName] = newValue;
        myResolve(true);
      } else {
        myReject(Error("\"" + newValue + "\" is invalid for the property " + propertyName + " for Person object"));
      }
    });
  }

  // getLastName(): String | undefined
  getLastName() {
    return this.lastName;
  }

  // #validateName(name: String): Boolean
  static validateName(name) {
    return /^[A-Za-z\s]*$/.test(name);
  }

  // setlastName(lastName: String): Promise
  setLastName(lastName) {
    return this.validateAndSetProperty("lastName", Person.validateName, lastName);
  }

  // getEmail(): String | undefined
  getEmail() {
    return this.email;
  }

  // #validateEmail(mail: String): Boolean
  static validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  // setEmail(email: String): Promise
  setEmail(email) {
    return this.validateAndSetProperty("email", Person.validateEmail, email);
  }
}

module.exports = Person;