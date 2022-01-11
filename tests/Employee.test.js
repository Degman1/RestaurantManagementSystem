const Employee = require('../source/Employee');

test("id counter", () => {
  console.log(Employee.idCounter);
  expect(Employee.idCounter).toBe(0);
  var p = new Employee("david", "johnson", "abc@gmail.com");
  expect(Employee.idCounter).toBe(1);
  p = new Employee("david", "johnson", "abc@gmail.com");
  expect(Employee.idCounter).toBe(2);
});

test("id setting", () => {
  var p = new Employee("david", "johnson", "abc@gmail.com");
  expect(p.id).toBe(2);
  p = new Employee("david", "johnson", "abc@gmail.com");
  expect(p.id).toBe(3);
})

test("initialization definition", () => {
  const p = new Employee("david", "johnson", "abc@gmail.com");
});

test("initialization definition invalid firstName", () => {
  const p = new Employee("david@", "johnson", "abc@gmail.com");
  expect(p.arePropertiesValidated()).toBeFalsy();
});

test("initialization definition invalid lastName", () => {
  const p = new Employee("david", "johns*on", "abc@gmail.com");
  expect(p.arePropertiesValidated()).toBeFalsy();
});

test("initialization definition invalid email", () => {
  const p = new Employee("david", "johnson", "abcgmail.com");
  expect(p.arePropertiesValidated()).toBeFalsy();
});

test("setFirstName valid name", () => {
  const p = new Employee("David -", "johnson", "abc@gmail.com");
  expect(p.getFirstName()).toBe("David -");
  p.setFirstName("jeff").then(x => { expect(x).toBeTruthy(); });
  expect(p.getFirstName()).toBe("jeff");
});

test("setFirstName invalid name special char .", () => {
  const p = new Employee("david", "johnson", "abc@gmail.com");
  p.setFirstName("daaa.vid").catch(err => {});
  expect(p.getFirstName()).toBe("david");
});

test("setFirstName invalid name special char #", () => {
  const p = new Employee("david", "johnson", "abc@gmail.com", "1234");
  p.setFirstName("daaa#vid").catch(err => {});
  expect(p.getFirstName()).toBe("david");
});

test("setFirstName invalid name special char @", () => {
  const p = new Employee("david", "johnson", "abc@gmail.com");
  p.setFirstName("daaa@vid").catch(err => {});
  expect(p.getFirstName()).toBe("david");
});

test("setFirstName invalid name number", () => {
  const p = new Employee("david", "johnson", "abc@gmail.com");
  p.setFirstName("d1aaavid").catch(err => {});
  expect(p.getFirstName()).toBe("david");
});

test("setFirstName invalid name", () => {
  const p = new Employee("david", "johnson", "abc@gmail.com");
  p.setFirstName("daaa.vid").catch(err => {});
  expect(p.getFirstName()).toBe("david");
});

