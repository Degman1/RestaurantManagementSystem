class Validate {
  // testRegularExpression(str: String): Boolean
  static testRegularExpression(regExp, str) {
    return regExp.test(str);
  }

  // validateName(name: String): Boolean
  // to validate a name only contains lowercase and uppercase letters and spaces
  static validateName(name) {
    return name !== undefined && Validate.testRegularExpression(/^[A-Za-z\s\-]*$/, name);
  }

  // validateEmail(mail: String): Boolean
  // from www.w3resource.com
  static validateEmail(email) {
    return email !== undefined && Validate.testRegularExpression(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, email);
  }

  // validatePassword(password: String): Boolean
  // from www.w3resource.com
  // Check a password of numbers
  static validatePassword(password) {
    return password !== undefined && Validate.testRegularExpression(/^\d+$/, password);
  }
}

module.exports = Validate;