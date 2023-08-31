'use strict';

///////////////////////////////////////
// Constructor Functions and the new Operator (special functions called by new operator)
// convention to use 1st Capital letter for constructor func.
const Person = function (firstName, birthYear) { // arrow func don't work cuz they don't have this keyword
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;
  
    // Never do this!, it will create one func. for each obj created from this func., use prototype
    // this.calcAge = function () {
    //   console.log(2037 - this.birthYear);
    // }; 
  };
  
  const jonas = new Person('Jonas', 1991); // at the end the this keyword is returned
  console.log(jonas);
  
  // 1. New {} is created
  // 2. function is called, this = {}
  // 3. {} linked to prototype
  // 4. function automatically return {}
  
  const matilda = new Person('Matilda', 2017);
  const jack = new Person('Jack', 1975);
  
  console.log(jonas instanceof Person);

  
  Person.hey = function () {
    console.log('Hey there 👋');
    console.log(this);
  };
  Person.hey();

  //////////////////////////////////////
// Prototypes
// Each func automatically has prototype property, Similarly constructor func. So every obj gets access to all the properties & meths defined on cons. func.'s prototype property. || Any object has access to properties & meths of its prototype.
// why prototypal -> When JavaScript was created, it was intended to be a lightweight scripting tool. The prototypal model offered a simple way to add object-oriented capabilities without introducing the complexities of a full class system., simplicity.
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge(); // prototype of this is person.prototype
matilda.calcAge();

console.log(jonas.__proto__); // ptype of jonas obj is ptype prprty of constructor func.
console.log(jonas.__proto__ === Person.prototype);  //Person.prototype is not the prtype of person

console.log(Person.prototype.isPrototypeOf(jonas)); // step 3 of new creates a new property proto and sets it value to prototype prprty of cons func.
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person)); // false

// .prototyeOfLinkedObjects - property naming

Person.prototype.species = 'Homo Sapiens'; // we can also add properties to the ptype prty of cons. func. cuz to be shared by all.
// So basically its nothing cons. func have a ptype ppty which contains all common meths ans pties and its ref is shared to all objs. that ref is known as ptype of obj.
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));


// For multiword property names they must be quoted

// property create nhi krni pdti apne aap this keyword se ho jaati


// class cyz {
//   constructor(firstName, accid) {
//     this.movements = []; // its bascially like setting a new property you don't need to declare it like java first.
//     this._movements // protect
//   }
// }

// promises

// const cart = ['pants', 'shirts', 'coat'];

// createOrder(cart, function(orderId) {
//     paymentPage (orderId, function(paymentInfo)) {
//       ordersummary (paymentInfo, function() {
//         updateWalletBalance();
//       })
//     }
// })


// createOrder(cart).then(orderId => proceedToPayment(orderId)).then(paymentInfo => ordersummary(paymentInfo)).then()



// promises


const cart = ["pants", "shirts", "coat"];

const promise  = createOrder(cart);

promise.then(function(orderId) {
  console.log(orderId);
  return orderId;
}).then(function(orderId) {
  return proceedToPayment(orderId);
}).then(function (paymentInfo) {
  console.log(paymentInfo);
}).catch(function(err) {
  console.log(err.message);
})

function createOrder(cart) {
  const prom = new Promise (function(resolve, reject) {
    if (cart.length === 0) {
      const err = new Error("Cart has no items");
      reject(err);
    }
    const orderId = "121232";
    resolve(orderId);
  });
  return prom;
}


function proceedToPayment(orderId) {
  return new Promise(function(resolve, reject) {
    resolve("Payment Successful");
  });
}


