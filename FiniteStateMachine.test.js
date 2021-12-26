const FSA = require('./FiniteStateMachine');

test("createState definition", () => {
  let myMachine = new FSA()
      .createState("delicates, low", [{mode: "normal, low"}, {temp: "delicates, medium"}]);
});

test("nextState definition", () => {
  let myMachine = new FSA()
      .createState("delicates, low", [{mode: "normal, low"}]);
  myMachine.nextState("mode");
});

test("addTransition definition", () => {
  let myMachine = new FSA()
      .createState("delicates, low", [{mode: "normal, low"}])
      .addTransition("delicates, low", {temp: "delicates, medium"});
});

test("showState definition", () => {
  let myMachine = new FSA()
      .createState("delicates, low", [{mode: "normal, low"}]);
  myMachine.showState();
});
/*
test("renameState definition", () => {
  let myMachine = new FSA()
      .createState("delicates, low", [{mode: "normal, low"}])
      .renameState("delicates, low", "delicates, high");
});*/

test("createMemento definition", () => {
  let myMachine = new FSA()
      .createState("delicates, low", [{mode: "normal, low"}]);
  myMachine.createMemento();
});

test("restoreMemento definition", () => {
  let myMachine = new FSA()
      .createState("delicates, low", [{mode: "normal, low"}]);
  myMachine.restoreMemento(myMachine.createMemento());
});

/*
test("test restoreMemento", () => {
  let myMachine = new FSA()
      .createState("delicates, low", [{mode: "normal, low"}]);
  myMachine.restoreMemento(myMachine.createMemento());
  myMachine.nextState("mode");
  assert(myMachine.showState() === delicates, low);
});*/

test("next state works - state=undefined", () => {
  let myMachine = new FSA().nextState("next");
  expect(myMachine.showState()).toBeUndefined();
});

test("next state works - general", () => {
  let myMachine = new FSA().createState("delicates, low", [{mode: "normal, low"}])
                           .createState("normal, low", [{mode: "delicates, low"}, {temp: "normal, medium"}])
                           .nextState("mode")
                           .nextState("mode");
  expect(myMachine.showState()).toBe("delicates, low");
});

test("washing machine example", () => {
  let myMachine = new FSA()
    .createState("delicates, low", [{mode: "normal, low"}, {temp: "delicates, medium"}])
    .createState("normal, low", [{mode: "delicates, low"}, {temp: "normal, medium"}])
    .createState("delicates, medium", [{mode: "normal, medium"}, {temp: "delicates, low"}])
    .createState("normal, medium", [{mode: "delicates, medium"}, {temp: "normal, high"}])
    .createState("normal, high", [{mode: "delicates, medium"},{temp: "normal, low"}]);
    
  // We could then use this machine by executing
  myMachine.nextState("temp") // moves the machine to delicates, medium
           .nextState("mode") // moves the machine to normal, medium
           .nextState("temp"); // moves the machine to normal, high
  
  let restoreTo = myMachine.createMemento(); // creates memento from current state
  myMachine.nextState("mode") // moves the machine to delicates, medium
           .nextState("temp") // moves the machine to delicates, low
           .restoreMemento(restoreTo); // restores the machine to normal, high

  expect(myMachine.showState()).toBe("normal, high");
});

test("add transition - source and destination are present", () => {
  let myMachine = new FSA()
      .createState("delicates, low", [])
      .createState("normal, low", [{mode: "delicates, low"}, {temp: "normal, medium"}])
      .addTransition("delicates, low", {mode: "normal, low"})
      .nextState("mode");

  expect(myMachine.showState()).toBe("normal, low");
});

test("add transition - source and destination are not present", () => {
  let myMachine = new FSA()
      .addTransition("delicates, medium", {mode: "delicates, low"})
      .nextState("mode");

  expect(myMachine.showState()).toBe("delicates, low");
});

test("add transition sets the state of the program if it creates the first state", () => {
  let myMachine = new FSA()
      .addTransition("delicates, medium", {mode: "delicates, low"});
  
  expect(myMachine.showState()).toBe("delicates, medium");
});

test("add transition - destination is not present", () => {
  let myMachine = new FSA()
      .createState("delicates, low", [])
      .addTransition("delicates, low", {mode: "normal, low"})
      .addTransition("delicates, low", {temp: "delicates, medium"})
      .nextState("temp");

  expect(myMachine.showState()).toBe("delicates, medium");
});

test("create state - adding the first state sets the state variable", () => {
  let myMachine = new FSA()
  expect(myMachine.showState()).toBeUndefined();
  myMachine.createState("delicates, low", [{mode: "normal, low"}]);
  expect(myMachine.showState()).toBe("delicates, low");
});

test("nextState call to a non-existant state", () => {
  let myMachine = new FSA()
      .createState("delicates, low", [{mode: "normal, low"}, {temp: "delicates, medium"}])
      .createState("normal, low", [{mode: "delicates, low"}, {temp: "normal, medium"}])
      .createState("normal, medium", [])
      .nextState("mode")
      .nextState("temp")
      .nextState("mode");

  expect(myMachine.showState()).toBe("normal, medium");
});

test("overwrite state", () => {
  let myMachine = new FSA()
    .createState("delicates, low", [{mode: "normal, low"}, {temp: "delicates, medium"}])
    .createState("normal, low", [{mode: "delicates, low"}, {temp: "normal, medium"}])
    .createState("delicates, medium", [{mode: "normal, medium"}, {temp: "delicates, low"}])
    .createState("delicates, low", [{mode: "normal, low"}, {temp: "normal, low"}])
    .nextState("temp");

  expect(myMachine.showState()).toBe("normal, low");
});