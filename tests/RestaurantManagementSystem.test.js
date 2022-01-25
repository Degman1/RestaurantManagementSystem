const RMS = require('../source/RestaurantManagementSystem');

test("create new obj", () => {
  const rms = new RMS("1234");
});

test("open a closed restaurant correct password", () => {
  const rms = new RMS("1234");
  rms.open("1234").then(x => { expect(x).toBeTruthy(); });
  expect(rms.isOpen).toBe(true);
});

test("open a closed restaurant incorrect password", () => {
  const rms = new RMS("1234");
  rms.open("4321").catch(err => {});
  expect(rms.isOpen()).toBeFalsy();
});

test("open an open restaurant correct password", () => {
  const rms = new RMS("1234");
  rms.open("1234").catch(err => {});
  rms.open("1234").catch(err => {});
  expect(rms.isOpen()).toBeTruthy();
});

test("close an open restaurant correct password", () => {
  const rms = new RMS("1234");
  rms.open("1234").catch(err => {});
  rms.close("1234").catch(err => {});
  expect(rms.isOpen()).toBeFalsy();
});

test("close an open restaurant incorrect password", () => {
  const rms = new RMS("1234");
  rms.open("1234").catch(err => {});
  rms.close("4321").catch(err => {});
  expect(rms.isOpen()).toBeTruthy();
});

test("close a closed restaurant correct password", () => {
  const rms = new RMS("1234");
  rms.close("1234").catch(err => {});
  expect(rms.isOpen()).toBeFalsy();
});
// TODO: everything past here
test("closing a restaurant closes the timesheet", () => {
  const rms = new RMS("1234");
  rms.open("1234").catch(err => {});
  rms.close("1234").catch(err => {});
  expect(rms.timesheet.isOpen()).toBeFalsy();
});

test("closing a restaurant clears the host waitlist", () => {

});