const Person = require('./Person');
const Customer = require('./Customer');
const Employee = require('./Employee');
const Host = require('./Host');
const Waiter = require('./Waiter');
const Cook = require('./Cook');
const Menu = require('./Menu');
const Table = require('./Table');
const Kitchen = require('./Kitchen');
const Timesheet = require('./Timesheet');

class RestaurantManagementSystem {
  isOpen;     //: boolean
  host;       //: Host
  kitchen;    //: Kitchen
  tables;     //: Table[]
  menu;       //: Menu[]
  employees;  //: Employee[]
  timesheet;  //: TimeSheet

  constructor(adminPassword) {
    this.isOpen = false;
    this.host = undefined;
    this.kitchen = new Kitchen();
    this.tables = [];
    this.menu = [];
    this.employees = [];
    this.timesheet = new Timesheet(adminPassword);
  }

  open() {
    if (password === adminPassword) { this.isOpen = true; }
  }

  close() {
    if (password === adminPassword) {
      this.isOpen = false;
      this.timeSheet
    }
  }
}

module.exports = RestaurantManagementSystem;