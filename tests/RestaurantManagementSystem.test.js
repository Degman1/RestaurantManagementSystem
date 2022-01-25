const RMS = require('../source/RestaurantManagementSystem');

test("create new obj", () => {
  const rms = new RMS("1234");
});

// Test open and closing

test("open a closed restaurant correct password", () => {
  const rms = new RMS("1234");
  rms.openShop("1234").catch(err => {});
  expect(rms.isOpen()).toBeTruthy();
});

test("open a closed restaurant incorrect password", () => {
  const rms = new RMS("1234");
  rms.openShop("4321").catch(err => {});
  expect(rms.isOpen()).toBeFalsy();
});

test("open an open restaurant correct password", () => {
  const rms = new RMS("1234");
  rms.openShop("1234").catch(err => {});
  rms.openShop("1234").catch(err => {});
  expect(rms.isOpen()).toBeTruthy();
});

test("close an open restaurant correct password", () => {
  const rms = new RMS("1234");
  rms.openShop("1234").catch(err => {});
  rms.closeShop("1234").catch(err => {});
  expect(rms.isOpen()).toBeFalsy();
});

test("close an open restaurant incorrect password", () => {
  const rms = new RMS("1234");
  rms.openShop("1234").catch(err => {});
  rms.closeShop("4321").catch(err => {});
  expect(rms.isOpen()).toBeTruthy();
});

test("close a closed restaurant correct password", () => {
  const rms = new RMS("1234");
  rms.closeShop("1234").catch(err => {});
  expect(rms.isOpen()).toBeFalsy();
});

test("closing a restaurant closes the timesheet", () => {
  const rms = new RMS("1234");
  rms.openShop("1234").catch(err => {});
  rms.closeShop("1234").catch(err => {});
  expect(rms.timesheet.isOpen()).toBeFalsy();
});

test("closing a restaurant clears the host waitlist", () => {   // TODO once create host capabilities
  const rms = new RMS("1234");
  rms.openShop("1234").catch(err => {});
  // create a host here and check the length to be 1
  rms.closeShop("1234").catch(err => {});
  expect(rms.host.waitlist.length).toBeFalsy();
});

// test importing the menu and adding food items

test("import json menu data into system", () => {
  const jsonData = require('../data/MenuExample.json');
  const rms = new RMS("1234");
  rms.importMenu(jsonData);
  expect(jsonData).toEqual(rms.menu.items);
});