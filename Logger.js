class Logger {
  static #debug = false;
  static #error = false;  // keeps track of if an error was encountered
  static #log = console.log;

  static setLogOutput(log) {
    this.#log = log;
  }

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
    this.#log("ERROR: " + message);
  }

  // printWarning(message: String): void
  static printWarning(message) {
    this.#log("WARNING: " + message);
  }
  
  // printDebug(message: String): void
  static printDebug(message) {
    if (this.#debug) {
      this.#log("DEBUG: " + message);
    }
  }
}

module.exports = Logger;