class Timesheet {
  employeeEntries;
  adminPassword;

  constructor(adminPassword) {
    this.adminPassword = adminPassword;
    this.employeeEntries = [];    // index of the entry list is the id of the employee the entry corresponds to
  }

  // addEmployee(password: String): Timesheet
  addEmployee(password) {
    this.employeeEntries.push(({
      password: password,
      clockedInTime: undefined,
      totalTimeWorked: 0
    }));
  }

  // clockIn(id: number, password: String): Timesheet
  clockIn(id, password) {    // if the password is correct and not already clocked in
    if ((id >= 0 || id < this.employeeEntries.length) && this.employeeEntries[id].password === password && this.employeeEntries[id].clockedInTime === undefined) {
      this.employeeEntries[id].clockedInTime = new Date();
    }
  }

  // clockOut(id: number, password: String): Timesheet
  clockOut(id, password) {  // if the password is correct and not already clocked in
    if ((id >= 0 || id < this.employeeEntries.length) && this.employeeEntries[id].password === password && this.employeeEntries[id].clockedInTime === undefined) {
      const now = new Date;
      this.employeeEntries[id].totalTimeWorked += now.getHours() - this.employeeEntries[id].clockedInTime.getHours() + (now.getMinutes() - this.employeeEntries[id].clockedInTime.getMinutes()) / 60;
      this.employeeEntries[id].clockedInTime = undefined;
    }
  }

  // closeShop(password: String): Timesheet
  // clock everyone out who is not already clocked out
  closeShop(password) {
    if (password === adminPassword) {
      this.employeeEntries.forEach(e => {
        const now = new Date;
        e.totalTimeWorked += now.getHours() - e.clockedInTime.getHours() + (now.getMinutes() - e.clockedInTime.getMinutes()) / 60;
        e.clockedInTime = undefined;
      });
    }
  }
}

module.exports = Timesheet;