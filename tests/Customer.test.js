const Customer = require('../source/Customer');
const Logger = require('../source/Logger');

// This test is expected to fail to prove that teh private variables cannot be accessed externally
/*test("cannot directly change state", () => {
  const c = new Customer("david", "abc@gmail.com");
  c.state.nextState("wait");
});*/

test("initialization", () => {
  const c = new Customer("david", "abc@gmail.com");
});

test("state starts @ inactive", () => {
  const c = new Customer("david", "abc@gmail.com");
  expect(c.showState()).toBe("inactive");
});

test("addToWaitlist state inactive -> waitlisted", () => {
  const c = new Customer("david", "abc@gmail.com").addToWaitlist();
  expect(c.showState()).toBe("waitlisted");
});

test("addToWaitlist state waitlisted -> waitlisted", () => {
  const c = new Customer("david", "abc@gmail.com").addToWaitlist().addToWaitlist();
  expect(c.showState()).toBe("waitlisted");
});

test("addToWaitlist state seated -> seated", () => {
  const c = new Customer("david", "abc@gmail.com").seat(1).addToWaitlist();
  expect(c.showState()).toBe("seated");
});

test("removeFromWaitlist state inactive -> inactive", () => {
  const c = new Customer("david", "abc@gmail.com").removeFromWaitlist();
  expect(c.showState()).toBe("inactive");
});

test("removeFromWaitlist state waitlisted -> inactive", () => {
  const c = new Customer("david", "abc@gmail.com").addToWaitlist().removeFromWaitlist();
  expect(c.showState()).toBe("inactive");
});

test("removeFromWaitlist state seated -> seated", () => {
  const c = new Customer("david", "abc@gmail.com").seat(1).removeFromWaitlist();
  expect(c.showState()).toBe("seated");
});

test("seat state inactive -> seated", () => {
  const c = new Customer("david", "abc@gmail.com").seat(1);
  expect(c.showState()).toBe("seated");
});

test("seat state inactive -> seated tableID is correct", () => {
  const c = new Customer("david", "abc@gmail.com").seat(1);
  expect(c.getTableID()).toBe(1);
});

test("seat state waitlisted -> seated", () => {
  const c = new Customer("david", "abc@gmail.com").addToWaitlist().seat(1);
  expect(c.showState()).toBe("seated");
});

test("seat state waitlisted -> seated tableID is correct", () => {
  const c = new Customer("david", "abc@gmail.com").addToWaitlist().seat(1);
  expect(c.getTableID()).toBe(1);
});

test("seat state seated -> seated", () => {
  const c = new Customer("david", "abc@gmail.com").seat(1).seat(1);
  expect(c.showState()).toBe("seated");
});

test("seat changes tableID accordingly", () => {
  const c = new Customer("david", "abc@gmail.com").seat(1).seat(2);
  expect(c.getTableID()).toBe(2);
});

test("pay state inactive -> inactive", () => {
  const c = new Customer("david", "abc@gmail.com").pay();
  expect(c.showState()).toBe("inactive");
});

test("pay state inactive -> inactive balance handled", () => {
  const c = new Customer("david", "abc@gmail.com").addToBalance(10).pay();
  expect(c.getBalance()).toBe(0);
});

test("pay state waitlisted -> waitlisted", () => {
  const c = new Customer("david", "abc@gmail.com").addToWaitlist().pay();
  expect(c.showState()).toBe("waitlisted");
});

test("pay state waitlisted -> waitlisted balance handled", () => {
  const c = new Customer("david", "abc@gmail.com").addToWaitlist().addToBalance(10).pay();
  expect(c.getBalance()).toBe(0);
});

test("pay state seated -> inactive", () => {
  const c = new Customer("david", "abc@gmail.com").seat(1).pay();
  expect(c.showState()).toBe("inactive");
});

test("pay state seated -> inactive balance reset", () => {
  const c = new Customer("david", "abc@gmail.com").seat(1).addToBalance(10).pay();
  expect(c.getBalance()).toBe(0);
});

test("addToBalance and getBalance works", () => {
  const c = new Customer("david", "abc@gmail.com");
  expect(c.getBalance()).toBe(0);
  c.addToBalance(100);
  expect(c.getBalance()).toBe(100);
});