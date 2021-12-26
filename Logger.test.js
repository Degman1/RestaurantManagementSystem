const Logger = require('./Logger');

let output = "";
Logger.setLogOutput(str => { output = str; });
Logger.enterDebugMode();

test("printDebug prints with flag on", () => {
  Logger.printDebug("debugging");
  expect(output).toBe("DEBUG: debugging");
});

test("printDebug prints with flag off", () => {
  output = "";
  Logger.exitDebugMode();
  Logger.printDebug("debugging");
  expect(output).toBe("");
});

test("printError sets error flag correctly", () => {
  Logger.printError("error");
  expect(Logger.encounteredError()).toBeTruthy();
});

test("printError prints correctly", () => {
  Logger.printError("error");
  expect(output).toBe("ERROR: error");
});

test("resetError works correctly", () => {
  Logger.resetError();
  Logger.printError("error");
  Logger.resetError();
  expect(Logger.encounteredError()).toBeFalsy();
});

test("printWarning prints correctly", () => {
  Logger.printError("error");
  expect(output).toBe("ERROR: error");
});