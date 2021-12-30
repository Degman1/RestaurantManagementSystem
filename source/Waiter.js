const Employee = require('./Employee');
const FiniteStateMachine = require('./FiniteStateMachine');

class Waiter extends Employee {
  tableID;

  constructor(firstName, lastName, email, password) {
    super(firstName, lastName, email, password);
    this.state = new FiniteStateMachine()
      .createState("clockedOut", [{clockIn: "unassigned"}])
      .createState("unassigned", [{assign: "assigned"}, { clockOut: "clockedOut" }])
      .createState("assigned", [{unassigned: "unassigned"}, { clockOut: "clockedOut" }]);
    this.tableID = undefined;
  }

  // clockOut(): this
  clockOut() {
    tableID = undefined;
    return super.clockOut();
  }

  // assignTable(tableID: number): this
  assign(tableID) {
    if (this.showState() !== "clockedOut") {
      this.tableID = tableID;
    }
    this.state.nextState("assign");
    return this;
  }

  // unassign(): this
  unassign() {
    this.tableID = undefined;
    this.state.nextState("unassign");
    return this;
  }
}