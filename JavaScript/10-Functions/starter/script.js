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
// Functions Accepting Callback Functions
const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase(); // g stands for global (i.e it will not stop executing after finding the first instance)
  };
  
  const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
  };
  
  // Higher-order function
  const transformer = function (str, fn) {
    console.log(`Original string: ${str}`); // use template literals always
    console.log(`Transformed string: ${fn(str)}`);
  
    console.log(`Transformed by: ${fn.name}`);
  };
  
  transformer('JavaScript is the best!', upperFirstWord);// upperFirstWord & oneWord -> Callback functions
  transformer('JavaScript is the best!', oneWord);
  
  // JS uses callbacks all the time
  const high5 = function () {
    console.log('👋');
  };
  document.body.addEventListener('click', high5); // use case doesn;t matter the function or task it will be performed at the time of the event.
          //Higher    ||||       order function
  ['Jonas', 'Martha', 'Adam'].forEach(high5);

//   Advantages :
// It makes it easy to split up the code to more reusable and interconnected part.
// It implements abstraction. some levels of abstraction. The code would have worked fine if we have written all the logic inside the main func but it helped to achieve abstraction.
  // f fadfa f
  