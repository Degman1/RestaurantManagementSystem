# RestaurantSimulator

A JavaScript program run with NodeJS to simulate a restaurant management system using the state, observer, and fluent design patterns along with functional programming and streamlined error handling (Promises).

### Simulator Flow

Once the simulator is initiated, stored data is loaded into the system to remember the table setup, the employees with their assignments, and the menu. The restaurant can then be openned for business and the user can create and manipulate new customer groups that can be added to an entrance wait list. Once the front desk finds an open table with enough seats, the customer is assigned to a table. Waiter objects observe the state of the customers sitting at the tables along with the prepared food that exits the kitchen and changes their internal state accordingly. The customer group can order food and drink by creating new orders that are added to the kitchen's queue of food to complete. Once the food is prepared, the corresponding waiter is notified and sends the food over to the table. Once a customer group is finished they must first pay the bill with a tip and leave the table and are removed from the system along with any outstanding orders they may have placed. Once all customers have paid and vacated their tables, the restaurant can be closed and the tips for the waiters are distributed accordingly.

Potential Updates:
1. Ability to remove People from the system on condition that they are in a certain state
2. Customers are saved in the system with their information and remembered when they come back
3. Assign waiters to tables taking table location into consideration

## Computer Science Principles Incorperated into this Project

1. Object Oriented Programming - leverage encapsulation, data hiding, inheritance, and polymorphism
2. Higher Order Functions - implement for ease of readability and efficiency when dealing with arrays of customers and observer objects
3. Design Patterns

   a. Fluent Design Pattern - enables method chaining for running restaurant methods in a concise manner
   
   b. State Design Pattern - enables various objects to keep track of their current and upcoming states of being
   
   c. Observer Design Pattern - enables waiters to observe what dishes from the kitchen are ready for which tables without having to be prompted
   
4. Linked Lists / Queues - use list implementation of queues to represent customers waiting to be seated and food orders waiting to be processed by the kitchen
5. Error Handling - implement JavaScript Promises to handle successes and failures while fulfilling various operations
6. Unit Test and Property Tests - incorperate both testing ideologies to debug and garuntee the correctness of the program

## Objects

The simulator keeps track of the following aspects of a real-life restaurant: customers, the front desk, tables, waiters, orders, and the kitchen

### RestaurantSimulator

The main simulator that keeps track of all the aspects of the restaurant and the methods to manipulate those aspects

Properties:
- `isOpen: boolean`
- `frontDesk: FrontDesk`
- `kitchen: Kitchen`
- `tables: Table[]`
- `menu: Food[]`
- `waiters: { waiter: Waiter, assignedTables: number[] }` - 

Methods:
- `open(): this` - opens the restaurant
- `close(): Promise` - closes the restaurant and returns Success if all customers are vacated, otherwise returns Failure
- `isOpen(): boolean` - returns true if the restaurant is open, false otherwise
- `createFood(name: String, price: number): this` - adds a food to the menu
- `createWaiter(name: String): this` - create a new waiter
- `createTable(tableID: number): this` - create a new table with a corresponding id
- `assignWaiter(name: String, tableID: number): this` - assign a waiter to a given table, takes the table over if another waiter already is working the table
- `addGroupToWaitlist(name: String, size: number): this` - creates a customer group and adds it to the front desk's waitlist to be seated when a table opens up -- once seated, if the table has no waiter, assign the waiter with the least number of tables or print a warning if not waiters exist yet
- `order(tableID: number, food: Food[]): this` - send an order to the kitchen with an array of the requested foods, adding the total price to the table's bill
- `prepareNextOrder(): this` - the kitchen prepares the next order and the prepared food is sent to the corresponding table, popped from the kitchen's todo stack, and changed the table state to eating

### Person

Properties:
- `#name: String` - the name of the person
- `#email: String` - the email of the person

Methods:
- `getName(): String` - gets the name of the person
- `setName(name: String): Promise` - set the name of the customer, returns Success if valid name, Failure otherwise
- `getEmail(): String` - gets the email of the person
- `setEmail(email: String): Promise` - set the email of the customer, returns Success if valid email, Failure otherwise

### Customer

*Inherits from Person*

Properties:
- `tableID: number | undefined` - the id of the table to which the customer is assigned, undefined if no table
- `state: FiniteStateMachine` - keeps track of the customer states and state transitions: <"waitlisted", "seated", "ordered", "eating", "payed", "inactive">

Methods: ...

### Employee

*Inherits from Person*

Properties:
- `#username: String` - the username for an employee to clock into and out of work
- `#password: String` - the password for an employee to clock into and out of work
- `state: FiniteStateMachine` - keeps track of the customer states and state transitions: <"clockedIn", "clockedOut">

Methods:
- `getUsername(): String` - gets the username of the person
- `setUsername(username: String): Promise` - set the username of the employee, returns Success if valid name, Failure otherwise
- `getPassword(): String` - gets the password of the person
- `setPassword(password: String): Promise` - set the password of the employee, returns Success if valid email, Failure otherwise

### Waiter

*Inherits from Employee*

Properties:
- (MUTATED) `state: FiniteStateMachine` - keeps track of the customer states and state transitions: <"clockedOut", "unassigned", "assigned-inactive", "assigned-serving">

Methods: ...

### Cook

*Inherits from Employee*

Propertied:
- (MUTATED) `state: FiniteStateMachine` - keeps track of the customer states and state transitions: <"clockedOut", "unassigned", "assigned-inactive", "assigned-serving">

Methods: ...

### Host

*Inherits from Employee*

Keeps track of the customer entrance line and seating

Data Types: ...
Methods: ...

### Table

Represents a table to which a group of customers and a waiter are assigned

Data Types:

Methods: ...

### Kitchen

Data Types:
- ordersToFulfill: Queue
- stateMachine: FSA - keeps track of the states and state transitions including notBusy, busy, and full

Methods:
- prepareNextOrder()

### Order 

Data Types:
- items: Food[]
- orderID: number
- tableID: number
- specialInstructions: String - any special requests for the kitchen
