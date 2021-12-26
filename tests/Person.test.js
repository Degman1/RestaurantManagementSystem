const Person = require('../source/Person');

test("validateName definition", () => {
  Person.validateName("David");
});

test("validateEmail definition", () => {
  Person.validateEmail("abcdefg@gmail.com");
});

test("initialization definition", () => {
  const p = new Person("David ", "dgredsox@gmail.com");
});

test("validateName only letters", () => {
  expect(Person.validateName("David")).toBeTruthy();
});

test("validateName letters and spaces", () => {
  expect(Person.validateName("David  ")).toBeTruthy();
});

test("validateName with invalid character", () => {
  expect(Person.validateName("David  $")).toBeFalsy();
});

test("validateName with invalid character", () => {
  expect(Person.validateName("David  -")).toBeFalsy();
});

test("validateEmail correct format", () => {
  expect(Person.validateEmail("abcdefg@gmail.com")).toBeTruthy();
});

test("validateEmail correct format", () => {
  expect(Person.validateEmail("ab.cd.efg@gmail.com")).toBeTruthy();
});

test("validateEmail incorrect format", () => {
  expect(Person.validateEmail("ab.cd@efg@gmail.com")).toBeFalsy();
});

test("validateEmail incorrect format", () => {
  expect(Person.validateEmail(".abcd@efg@gmail.com")).toBeFalsy();
});

test("setName valid name", () => {
  const p = new Person("david", "abc@gmail.com");
  p.setName("jeff").catch(err => {});
  expect(p.getName()).toBe("jeff");
});

test("setName invalid name", () => {
  const p = new Person("david", "abc@gmail.com");
  p.setName("daaa.vid").catch(err => {});
  expect(p.getName()).toBe("david");
});

test("Person constructor invalid inputs", () => {
  const p = new Person("david-", "ab*c@gmail.com");
  expect(p.getName()).toBeFalsy();
  expect(p.getEmail()).toBeFalsy();
});

test("setEmail valid email", () => {
  const p = new Person("david", "abc@gmail.com");
  p.setEmail("efg@verizon.net").catch(err => {});
  expect(p.getEmail()).toBe("efg@verizon.net");
});

test("setEmail invalid email", () => {
  const p = new Person("david", "abc@gmail.com");
  p.setEmail("efg@verizon$net").catch(err => {});
  expect(p.getEmail()).toBe("abc@gmail.com");
});
