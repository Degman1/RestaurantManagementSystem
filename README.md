# RestaurantSimulator

A JavaScript program run with NodeJS to simulate a virtual functioning restaurant. 

## Computer Science Principles Incorperated into this Project

1. Object Oriented Programming - leverage encapsulation, data hiding, inheritance, and polymorphism
2. Higher Order Functions - implement for ease of readability and efficiency when dealing with arrays, lists, and streams of data
3. Design Patterns
   a. Fluent Design Pattern - enables method chaining for running restaurant methods in a concise manner
   b. State Design Pattern - enables various objects to keep track of their current and upcoming states of being
   c. Observer Design Pattern - enables waiters to observe what dishes from the kitchen are ready for which tables without having to be prompted
4. Linked Lists - use list implementation of queues to represent customers waiting to be seated and food orders waiting to be processed by the kitchen
5. Error Handling - implement JavaScript Promises to handle successes and failures while fulfilling various operations
6. Unit Test and Property Tests - incorperate both testing ideologies to debug and garuntee the correctness of the program

## Objects

The simulator keeps track of the following aspects of a real-life restaurant: customers, the front desk, tables, waiters, orders, and the kitchen.

### RestaurantSimulator

The simulator itself that keeps track of all the aspects of the restaurant and the methods to manipulate those aspects

Data Types: ...
Methods: ...

### Person

The superclass that respresents any generic person

Data Types: ...
Methods: ...

### Customer

Inherits from Person

Data Types: ...
Methods: ...

### Waiter

Inherits from Person

Data Types: ...
Methods: ...

### FrontDesk

Keeps track of the customer entrance line and seating

Data Types: ...
Methods: ...

### Table

Represents a table to which a group of customers and a waiter are assigned

Data Types: ...
Methods: ...

### Kitchen

Data Types: ...
Methods: ...

### Order 

Data Types: ...
Methods: ...
