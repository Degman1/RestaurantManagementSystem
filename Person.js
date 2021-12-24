class Person {
  #name;
  #email;

  constructor(name, email) {  // when instantiating, must check for name and email validity first
    if (!Person.validateEmail(email)) { console.log("WARNING: [" + name + ", " +  email + "] invalid name"); }
    if (!Person.validateName(name)) { console.log("WARNING: [" + name + ", " +  email + "] invalid email") }
    this.#name = name;
    this.#email = email;
  }

  // getName(): String
  getName() {
    return this.#name;
  }

  // #validateName(name: String): Boolean
  static validateName(name) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(name);
  }

  // setName(name: String): Promise
  setName(name) {
    if (Person.validateName(email)) {
      this.#name = name;
      return new Promise();
    }
    return new Promise();
  }

  // getEmail(): String
  getEmail() {
    return this.#email;
  }

  // #validateEmail(mail: String): Boolean
  static validateEmail(mail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
  }

  // setEmail(email: String): Promise
  setEmail(email) {
    if (Person.validateEmail(email)) {
      this.#email = email;
      return new Promise();
    }
    return new Promise();
  }
}

module.exports = Person;