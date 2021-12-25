class Logger {
  static #debug = true;
  static #error = false;

  static encounteredError() {
    return this.#error;
  }

  static resetError() {
    this.#error = false;
  }

  static isInDebugMode() {
    return this.#debug;
  }

  static enterDebugMode() {
    this.#debug = true;
  }

  static exitDebugMode() {
    this.#debug = false;
  }

  static printError(message) {
    this.#error = true;
    console.log("ERROR: " + message);
  }

  // printWarning(message: String): void
  static printWarning(message) {
    console.log("WARNING: " + message);
  }
  
  // printDebug(message: String): void
  static printDebug(message) {
    if (debug) {
      console.log("DEBUG: " + message);
    }
  }
}

module.exports = Logger;