'use strict';
///////////////////////////////////////
// Default Parameters
// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers // works only for the variables declared beforehand
// ) {
//   // ES5
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);

// createBooking('LH123', undefined, 1000); // way of skipping the default parameter in a function (declare it undefined)


///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference
// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 24739479284,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 24739479284) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// // checkIn(flight, jonas);
// // console.log(flight); // primitive types just work as java
// // console.log(jonas); // reference types pass value as a reference (ex -> objects are reference types)
// //  In JavaScript, objects are the only mutable values. Functions are, in fact, also objects with the additional capability of being callable.

// // -> reference types = object, Array, Function, Date, REGEX

// // Is the same as doing...
// // const flightNum = flight;
// // const passenger = jonas; // we are copying the reference of the object in the memory heap.

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000000);
// };

// newPassport(jonas);
// checkIn(flight, jonas);


///////////////////////////////////////
// // Functions Accepting Callback Functions
// const oneWord = function (str) {
//     return str.replace(/ /g, '').toLowerCase(); // g stands for global (i.e it will not stop executing after finding the first instance)
//   };
  
//   const upperFirstWord = function (str) {
//     const [first, ...others] = str.split(' ');
//     return [first.toUpperCase(), ...others].join(' ');
//   };
  
//   // Higher-order function
//   const transformer = function (str, fn) {
//     console.log(`Original string: ${str}`); // use template literals always
//     console.log(`Transformed string: ${fn(str)}`);
  
//     console.log(`Transformed by: ${fn.name}`);
//   };
  
//   transformer('JavaScript is the best!', upperFirstWord);// upperFirstWord & oneWord -> Callback functions
//   transformer('JavaScript is the best!', oneWord);
  
//   // JS uses callbacks all the time
//   const high5 = function () {
//     console.log('👋');
//   };
//   document.body.addEventListener('click', high5); // use case doesn;t matter the function or task it will be performed at the time of the event.
//           //Higher    ||||       order function
//   ['Jonas', 'Martha', 'Adam'].forEach(high5);

// //   Advantages :
// // It makes it easy to split up the code to more reusable and interconnected part.
// // It implements abstraction. some levels of abstraction. The code would have worked fine if we have written all the logic inside the main func but it helped to achieve abstraction.

///////////////////////////////////////
// // Functions Returning Functions
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// greet('Hello')('Jonas'); // use case -> Functional programming

// // Challenge
// const greetArr = greeting => name => console.log(`${greeting} ${name}`);

// greetArr('Hi')('Jonas');


///////////////////////////////////////
// // The call and apply Methods
// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   // book: function() {}
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name }); // thats how we can push objects to arrays.. (anonymous object creation)
//   },
// };

// lufthansa.book(239, 'Jonas Schmedtmann');
// lufthansa.book(635, 'John Smith');

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;

// // Does NOT work
// // book(23, 'Sarah Williams'); // cuz this keyword doesn't works on normal func declarations n this func is not a meth now. || Problem (can't work in func expressions as well as it points to global obj there)

// // Call method (Solution:)  Point this to specified object
// // The property names for all the objs should be same.
// book.call(eurowings, 23, 'Sarah Williams');
// console.log(eurowings);

// book.call(lufthansa, 239, 'Mary Cooper');
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 583, 'Mary Cooper');

// // Apply method does the same thing but uses array as all args for func's (obsolete)
// const flightData = [583, 'George Cooper']; 
// book.apply(swiss, flightData); // 
// console.log(swiss);

// book.call(swiss, ...flightData); // same task as apply

///////////////////////////////////////
// The bind Method
// book.call(eurowings, 23, 'Sarah Williams');
// creates a new function
// const bookEW = book.bind(eurowings); // fix the this keyword to a particular object (make that obj's func)
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(23, 'Steven Williams');

// const bookEW23 = book.bind(eurowings, 23); // keeping constraints on some arguments or predefining them 
// // concept is known as partial application
// bookEW23('Jonas Schmedtmann');
// bookEW23('Martha Cooper');

// // use case -> defining a general function then modifying the same func according to various objs needs


// // With Event Listeners
// // In an event handler fucn this keyword is always attached points to the ele on which the handler is attached to
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };
// // lufthansa.buyPlane();

// // document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); doesn't works cuz this points to the button
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // pointing this to lufthansa explicitly

// // Partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23); // first arg of bind func is 'this' value.
// // addVAT = value => value + value * 0.23;

// console.log(addVAT(100));
// console.log(addVAT(23));


// // it was asking to make a func to preset the value
// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };
// const addVAT2 = addTaxRate(0.23);
// console.log(addVAT2(100));
// console.log(addVAT2(23));


///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
// const poll = {
//     question: 'What is your favourite programming language?',
//     options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//     // This generates [0, 0, 0, 0]. More in the next section 😃
//     answers: new Array(4).fill(0),
//     displayResults(type = 'array') {
//         type = type.toLowerCase();
//         if (type === 'array') console.log(this.answers);
//         else if (type === 'string')
//         // console.log('Poll results are', ...this.answers);
//         console.log(`Poll results are ${this.answers.join(', ')}`);
//     },  
//     registerNewAnswer() {
//         // const input = Number(prompt (`What is your favourite programming language?\n
//         // 0: JavaScript\n
//         // 1: Python\n
//         // 2: Rust\n
//         // 3: C++\n
//         // (Write option number)`)); // don't hardcode it
//         const input = Number(prompt (`${this.question}\n${this.options.join('\n')}\n(Write Option Number)`));
//         // if (typeof(input) === 'number' && input <= 3 && input >=0) this.answers[input]++; // typeof returns string so don't compare it with constructor
//         typeof answer === 'number' && answer  < this.this.answers.length && this.answers[answer]++;
//         //betterway concl : don't hardcode anything
//         // this will not work here cuz it refers to the obj that the event was called button :)
//         this.displayResults('string');
//     } 
// }; 

// document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

// const newObj = {
//     answers: [5, 2, 3]
// }

// const newObj2 = {
//     answers : [1, 5, 3, 9, 6, 1]
// }
// // poll.displayResults.call(newObj);
// //better way
// // poll.displayResults.call({answers : [5,2,3]});

// poll.displayResults.call(newObj2);


///////////////////////////////////////
// // Immediately Invoked Function Expressions (IIFE)
// const runOnce = function () {
//     console.log('This will never run again');
//   };
//   runOnce();

//   // IIFE (just like anonymous)
//   (function () {
//     console.log('This will never run again');
//     const isPrivate = 23;
//   })(); // inside is the value and then we call it with bracks
  
//   // console.log(isPrivate);

//   // were used for data encapsulation and data privacy but since var and let create their own scope i.e block scoped so no need of IIFE now
  
//   (() => console.log('This will ALSO never run again'))();
  
//   {
//     const isPrivate = 23;
//     var notPrivate = 46;
//   }
//   // console.log(isPrivate);
//   console.log(notPrivate);


///////////////////////////////////////
// // Closures
// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();
// // How the booker can access passengerCount variable??
// // Closures makes a func remember all the variables that existed on its birthplace.
// // the ve of the execution context where the function was created remains in the JS Engine.

// booker();
// booker();
// booker();

// console.dir(booker);  //console.dir() is the way to see all the properties of a specified JavaScript object in console
// //[[]] in console represents we can't access its an internal property.


// ///////////////////////////////////////
// // More Closure Examples
// // Example 1
// let f;

// // closure happens even when the variable is not defined inside, its just assigned here. 
// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// const h = function () {
//   const b = 777;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// g();
// f();
// console.dir(f);

// // Re-assigning f function
// h();
// f();
// console.dir(f);

// // Example 2
// const boardPassengers = function (n, wait) {
//   const perGroup = n / 3;

//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, wait * 1000); // it executes after the specified time
//   //closure is happening cuz the func is exec after the boardPassengers in global scope.

//   console.log(`Will start boarding in ${wait} seconds`);
// };

// const perGroup = 1000;
// boardPassengers(180, 3);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';
//   document.querySelector('body').addEventListener('click', function() {
//     header.style.color = 'blue';
//     //cuz click will remain exec even after this IIFE gets over, so this maintains a closure and stores header. it is closed over that IIFE.
//   });
// })();
