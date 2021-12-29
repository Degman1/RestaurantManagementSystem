const Employee = require('../source/Employee');

test("initialization definition", () => {
  const p = new Employee("david", "johnson", "abc@gmail.com", "1234");
});

test("initialization definition invalid firstName", () => {
  const p = new Employee("david@", "johnson", "abc@gmail.com", "1234");
  expect(p.arePropertiesValidated()).toBeFalsy();
});

test("initialization definition invalid lastName", () => {
  const p = new Employee("david", "johns*on", "abc@gmail.com", "1234");
  expect(p.arePropertiesValidated()).toBeFalsy();
});

test("initialization definition invalid email", () => {
  const p = new Employee("david", "johnson", "abcgmail.com", "1234");
  expect(p.arePropertiesValidated()).toBeFalsy();
});

test("initialization definition invalid password", () => {
  const p = new Employee("david", "johnson", "abcgmail.com", "12a34");
  expect(p.arePropertiesValidated()).toBeFalsy();
});

test("setFirstName valid name", () => {
  const p = new Employee("David -", "johnson", "abc@gmail.com", "1234");
  expect(p.getFirstName()).toBe("David -");
  p.setFirstName("jeff").then(x => { expect(x).toBeTruthy(); });
  expect(p.getFirstName()).toBe("jeff");
});

test("setFirstName invalid name special char .", () => {
  const p = new Employee("david", "johnson", "abc@gmail.com", "1234");
  p.setFirstName("daaa.vid").catch(err => {});
  expect(p.getFirstName()).toBe("david");
});

test("setFirstName invalid name special char #", () => {
  const p = new Employee("david", "johnson", "abc@gmail.com", "1234");
  p.setFirstName("daaa#vid").catch(err => {});
  expect(p.getFirstName()).toBe("david");
});

test("setFirstName invalid name special char @", () => {
  const p = new Employee("david", "johnson", "abc@gmail.com", "1234");
  p.setFirstName("daaa@vid").catch(err => {});
  expect(p.getFirstName()).toBe("david");
});

test("setFirstName invalid name number", () => {
  const p = new Employee("david", "johnson", "abc@gmail.com", "1234");
  p.setFirstName("d1aaavid").catch(err => {});
  expect(p.getFirstName()).toBe("david");
});

test("setFirstName invalid name", () => {
  const p = new Employee("david", "johnson", "abc@gmail.com", "1234");
  p.setFirstName("daaa.vid").catch(err => {});
  expect(p.getFirstName()).toBe("david");
});