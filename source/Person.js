const Logger = require('./Logger');
const FiniteStateMachine = require('./FiniteStateMachine');

class Person {
  #lastName;
  #email;
  #state;
  description = "[Person: " + this.getLastName() + ", " + this.getEmail() + "]";

  constructor(lastName, email) {  // when instantiating, must check for name and email validity first, otherwise it will be kept undefined
    this.#state = new FiniteStateMachine();   // for polymorphism purposes; can't do protected variable, so instead redefine private variable in each sub class and take advantage of duck typing
    const myReject = err => Logger.printError(err.message);   // TODO: if program is setup with a GUI, should make this compatible
    this.setLastName(lastName).catch(myReject);
    this.setEmail(email).catch(myReject);
  }

  // MUST REPLACE THIS IN ANY SUBCLASS THAT DEFINES A NEW #state PROPERTY
  // showState(): String | undefined
  showState() {
    return this.#state.showState();
  }

  // arePropertiesValidated(): boolean
  arePropertiesValidated() {
    return validateName(this.#lastName) && validateEmail(this.#email);
  }

  // PREFERABLE, BUT NOT YET DOABLE:
  // this is an ideal helper method to validating + setting properties, but DOESN'T WORK WITH PRIVATE VARIABLES
  // the statement ref[propertyName] only works with public variables
  /*
  // setProperty(propertyName: String, validate: (String) => Boolean, newValue: Any)
  setProperty_validate(propertyName, validate, newValue) {
    let ref = this;
    return new Promise((myResolve, myReject) => {
      if (validate(newValue)) {
        ref[propertyName] = newValue;
        myResolve(true);
      } else {
        myReject(Error("\"" + newValue + "\" is invalid for the property " + propertyName + " for Person object"));
      }
    });
  }*/

  // getLastName(): String | undefined
  getLastName() {
    return this.#lastName;
  }

  // #validateName(name: String): Boolean
  static validateName(name) {
    const res = /^[A-Za-z\s]*$/.test(name);
    //if (!res) { Logger.printWarning("\"" + name + "\" is invalid for the name property of a Person"); }
    return res;
  }

  // setlastName(lastName: String): Promise
  setLastName(lastName) {
    let ref = this;
    return new Promise((myResolve, myReject) => {
      if (Person.validateName(lastName)) {
        ref.#lastName = lastName;
        myResolve(true);
      } else {
        myReject(Error("\"" + lastName + "\" is invalid for the lastName property for a Person object"));
      }
    });
  }

  // getEmail(): String | undefined
  getEmail() {
    return this.#email;
  }

  // #validateEmail(mail: String): Boolean
  static validateEmail(email) {
    const res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    //if (!res) { Logger.printWarning("\"" + email + "\" is invalid for the email property of a Person"); }
    return res;
  }

  // setEmail(email: String): Promise
  setEmail(email) {
    let ref = this;
    return new Promise((myResolve, myReject) => {
      if (Person.validateEmail(email)) {
        ref.#email = email;
        myResolve(true);
      } else {
        myReject(Error("\"" + email + "\" is invalid for the email property for a Person object"));
      }
    });
  }
}

module.exports = Person;