class FiniteStateMachine {
  constructor() {
    // state is hidden beneath the closures created below so it is private
    // state: State
    let state = undefined;   // before the first state is created, set the state to undefined

    // array containing all the various states in the state machine
    // states: State[]
    let states = [];

    // randomInt(min: number, max: number): number
    // ARGUMENTS: min: number - minimum bound for the random output
    //            max: number - maximum bound for the random output
    // RETURNS: number - a random int i where min <= i < max
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;    // mathamatically shifts the range of Math.random to be from min to max
    }

    class State {
      constructor(name) {
        // Transitions[]
        let transitions = []    // const b/c array is an object, so reference type

        // getName(): string
        this.getName = () => name;

        // setName(s: string): this
        this.setName = (newName) => {
          name = newName;
          return this;
        }

        // addTransition(e: string, s: State): this
        this.addTransition = (e, s) => {
          transitions.push({event: e, nextState: s});
          return this;
        }

        // nextStates(e: string): State[]
        this.nextStates = (e) => transitions.filter(t => t.event === e).map(t => t.nextState);
        
        // nextState(e: string): State | undefined
        this.nextState = (e) => {
          let potentialNextStates = this.nextStates(e);

          // if multiple next states exist, return a random one of them, if none exist return this state
          return potentialNextStates.length === 0 ? this : potentialNextStates[randomInt(0, potentialNextStates.length)];
        }

        this.clearTransitions = () => transitions = [];
      }
    }

    class Memento {
      // constructor(s: string)
      constructor() {
        let state = undefined;

        // storeState(s: string): void 
        this.storeState = s => { state = s; }

        // getState(): string
        this.getState = () => state;
      }
    }

    // nextState(e: string): this
    this.nextState = (e) => {
      if (state !== undefined) { state = state.nextState(e); }
      return this;
    }

    // These helper methods are private because they are not set using this, they exist only in the closures of the other methods once the constructor is exited
    // getIndexOfState(s: string): number
    const getIndexOfState = s => states.findIndex(st => (st.getName() === s));  // -1 for not found
    // getState(s: string): State | undefined
    const getState = s => states.find(st => (st.getName() === s));

    // createState(s: string, transitions: Transition[]): this
    this.createState = (s, transitions) => {
      let newState = undefined;

      // if it already exists, clear the transitions array and add in the new transitions
      let index = getIndexOfState(s);
      if (index === -1) { newState = new State(s); states.push(newState); }
      else { newState = states[index]; newState.clearTransitions(); }

      transitions.forEach(t => this.addTransition(s, t));   // must be after placing the state in the states array!
      if (state === undefined) { state = newState; }

      return this;
    }
    
    // getTransitionEvent(t: Transition) => string
    const getTransitionKey = (t) => Object.keys(t)[0];

    // addTransition(s: string, t: Transition): this
    this.addTransition = (s, t) => {
      // get the state we are working with
      let source = getState(s);
      if (source === undefined) {
        source = new State(s);
        states.push(source);
        if (state === undefined) { state = source; }
      }

      // get the state we are going to transition to
      const eventName = getTransitionKey(t);
      let targetName = t[eventName];      // don't need to worry about if found b/c must always be present
      let target = getState(targetName);
      if (target === undefined) {
        target = new State(targetName);
        states.push(target);
      }

      // add the transition to the state with the given name (due to the first part of this method, it is garunteed to now be present)
      source.addTransition(eventName, target);
      return this;
    }

    // showState(): string | undefined
    this.showState = () => {
      return state === undefined ? undefined : state.getName();
    }
    /*
    // renameState(name: string, newName: string): this
    this.renameState = (name, newName) => {             // TODO: what if the newName already exists in the states array?
      
      return this;
    }*/

    // createMemento(): Memento
    this.createMemento = () => {
      let mem = new Memento();
      if (state !== undefined) { mem.storeState(state.getName()); }
      return mem;
    }

    // restoreMemento(m: Memento): this
    this.restoreMemento = (m) => {
      const restoredState = getState(m.getState());
      if (restoredState !== undefined) { state = restoredState; }
      return this;
    }
  }
}

module.exports = FiniteStateMachine