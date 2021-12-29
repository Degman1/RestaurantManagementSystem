const Validate = require('../source/Validate');

test("validateName definition", () => {
  Validate.validateName("");
});

test("validateEmail definition", () => {
  Validate.validateEmail("");
});

test("validatePassword definition", () => {
  Validate.validatePassword("");
});

test("validateName only letters", () => {
  expect(Validate.validateName("David")).toBeTruthy();
});

test("validateName only letters and dashes", () => {
  expect(Validate.validateName("D-av-id")).toBeTruthy();
});

test("validateName letters and spaces", () => {
  expect(Validate.validateName("David  ")).toBeTruthy();
});

test("validateName with invalid character", () => {
  expect(Validate.validateName("David  $")).toBeFalsy();
});

test("validateName with invalid character", () => {
  expect(Validate.validateName("David  -")).toBeTruthy();
});

test("validateEmail correct format", () => {
  expect(Validate.validateEmail("abcdefg@gmail.com")).toBeTruthy();
});

test("validateEmail correct format", () => {
  expect(Validate.validateEmail("ab.cd.efg@gmail.com")).toBeTruthy();
});

test("validateEmail incorrect format", () => {
  expect(Validate.validateEmail("ab.cd@efg@gmail.com")).toBeFalsy();
});

test("validateEmail incorrect format", () => {
  expect(Validate.validateEmail(".abcd@efg@gmail.com")).toBeFalsy();
});

test("validatePassword valid", () => {

});

test("validatePassword characters other than numbers", () => {

});

test("validatePassword too many characters", () => {

});

test("validatePassword no numeric digit", () => {

});

test("validatePassword too many characters", () => {

});