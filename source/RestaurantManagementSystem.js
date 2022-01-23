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

  // open(): this
  open(password) {
    if (password === adminPassword) { this.isOpen = true; }
    return this;
  }

  // closes the restaurant if the password is correct and if all customers have vacated (ie. no customers at tables)
  // clears the waitlist
  // close(): Promise
  close(password) {
    return new Promise((myResolve, myReject) => {
      if (password === adminPassword && this.tables.every(t => t.showState() === "unoccupied")) {
        this.isOpen = false;
        this.timeSheet.closeShop(password);
        this.host.clear();
        myResolve(true);
      } else {
        myReject(Error("unable to close restaurant, either wrong admin password or customers are still seated at tables"));
      }
    });
  }

  // returns true if the restaurant is open, false otherwise
  // isOpen(): boolean
  isOpen() {
    return this.isOpen;
  }

  // adds a food to the menu
  /* A food is an object with the following properties (not necessery for the properties to be present)
    Food: {
    "name": String,
    "price": number,
    "section": String,                // the section of the menu
    "allergens": String[],
    "spicy": boolean,
    "sizes": {
      [key: String]: number           // the number indicates the addition the size choice makes to the price
    }
    "description": String
    }
  */
  // createFood(food: Food): this
  createFood(food) {
    this.menu.items.push(food)
    return this;
  }

  // create a new waiter and add a slot for them in the timesheet
  // createWaiter(firstName, lastName, email, password): this
  createWaiter(firstName, lastName, email, password) {
    this.employees.push(new Waiter(firstName, lastName, email, password));
    this.timesheet.addEmployee(password);
    return this;
  }

  // creates a new table with a given size capacity
  // createTable(size: number): this
  createTable(size) {
    this.tables.push(new Table(size));
    return this;
  }

  // assign a waiter to a given table, takes the table over if another waiter already is working the table
  // assignWaiter(employeeID: String, tableID: number): Promise
  assignWaiter(employeeID, tableID) {
    return new Promise((myResolve, myReject) => {
      const w = this.employees.find(e => e.id === employeeID);
      if (w != null && tableID < this.tables.length) {
        w.tableID = tableID;
        this.tables[tableID].waiter = w;
      } else {
        myReject(Error("unable to assign employee to table, tableID or employeeID not found"));
      }
      return this;
    });
  }

  // creates a customer group and adds it to the front desk's waitlist to be seated when a table opens up
  // addCustomerToWaitlist(name: String, size: number): this
  addToCustomerWaitlist(lastName, email, size) {
    this.host.enqueueToWaitlist(new Customer(lastName, email, size))
    return this;
  }
}

module.exports = RestaurantManagementSystem;