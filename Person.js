const Logger = require('./Logger');

class Person {
  #name;
  #email;

  constructor(name, email) {  // when instantiating, must check for name and email validity first
    /*Person.validateName(name);
    Person.validateEmail(email);
    this.#name = name;
    this.#email = email;*/
    const myReject = err => Logger.printWarning(err.message);   // TODO: if program is setup with a GUI, should make this compatible
    this.setName(name).catch(myReject);
    this.setEmail(email).catch(myReject);
  }

  // arePropertiesValidated(): boolean
  arePropertiesValidated() {
    return validateName(name) && validateEmail(email);
  }

  // getName(): String
  getName() {
    return this.#name;
  }

  // #validateName(name: String): Boolean
  static validateName(name) {
    const res = /^[A-Za-z\s]*$/.test(name);
    //if (!res) { Logger.printWarning("\"" + name + "\" is invalid for the name property of a Person"); }
    return res;
  }

  // setName(name: String): Promise
  setName(name) {
    let ref = this;
    return new Promise((myResolve, myReject) => {
      if (Person.validateName(name)) { 
        ref.#name = name;
        myResolve(true);
      } else {
        myReject(Error("\"" + name + "\" is invalid for the name property of a Person"));
      }
    });
  }

  // getEmail(): String
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
        myReject(Error("\"" + email + "\" is invalid for the name property of a Person"));
      }
    });
  }
}

module.exports = Person;