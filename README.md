# RestaurantSimulator

A JavaScript program run with NodeJS to simulate a restaurant management system using the state, observer, and fluent design patterns along with functional programming and streamlined error handling.

### Simulator Flow

Once the simulator is initiated, the restaurant can be openned for business and the user can create and manipulate new customer groups that can be added to an entrance wait list. Once the front desk finds an open table with enough seats, the customer is assigned to a table. Waiters are also created and manipulated by the system and are assigned to groups of tables. Waiter objects observe the state of the customers sitting at the tables along with the prepared food that exits the kitchen and changes their internal state accordingly. The customer group can order food and drink by creating new orders that are added to the kitchen's queue of food to complete. Once the food is prepared, the corresponding waiter is notified and sends the food over to the table. Once a customer group is finished they must first pay the bill with a tip and leave the table and are removed from the system along with any outstanding orders they may have placed. Once all customers have paid and vacated their tables, the restaurant can be closed and the tips for the waiters are distributed accordingly.

Potential Updates:
1. The state of the simulator can be saved the Momento Design Pattern
2. Customers are saved in the system and remembered when they come back
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

The simulator keeps track of the following aspects of a real-life restaurant: customers, the front desk, tables, waiters, orders, and the kitchen.

### RestaurantSimulator

The simulator itself that keeps track of all the aspects of the restaurant and the methods to manipulate those aspects

Data Types: 
- isOpen: boolean
- frontDesk: FrontDesk
- kitchen: Kitchen
- tables: Table[]
- menu: Food[]
- waiters: Waiter[]

Methods:
- open(): RestaurantSimulator - opens the restaurant
- close(): Promise - closes the restaurant and returns Success if all customers are vacated, otherwise returns Failure
- isOpen(): boolean - returns true if the restaurant is open, false otherwise
- createFood(name: String, price: number): RestaurantSimulator - adds a food to the menu
- createWaiter(name: String): RestaurantSimulator - create a new waiter
- createTable(tableID: number): RestaurantSimulator - create a new table with a corresponding id
- assignWaiter(name: String, tableID: number): RestaurantSimulator - assign a waiter to a given table, takes the table over if another waiter already is working the table
- addGroupToWaitlist(name: String, size: number): RestaurantSimulator - creates a customer group and adds it to the front desk's waitlist to be seated when a table opens up -- once seated, if the table has no waiter, assign the waiter with the least number of tables or print a warning if not waiters exist yet
- order(tableID: number, food: Food[]): RestaurantSimulator - send an order to the kitchen with an array of the requested foods, adding the total price to the table's bill
- prepareNextOrder(): RestaurantSimulator - the kitchen prepares the next order and the prepared food is sent to the corresponding table, popped from the kitchen's todo stack, and changed the table state to eating

### Person

The ***abstract*** class that respresents any generic person - advances the program's scalability

Data Types:
- name: String
- type: String - for now either "Customer" or "Waiter"

Methods:
- setName(name: String): Person
- getName(): String

### Customer

Inherits from Person

Data Types:
- tableID: number - the id of the table to which the customer is assigned, undefined if no table
- stateMachine: FSA - keeps track of the states and state transitions including waitlist, seated, ordered, eating, payed, and inactive

Methods: ...

### Waiter

Inherits from Person

Data Types:

Methods: ...

### FrontDesk

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
