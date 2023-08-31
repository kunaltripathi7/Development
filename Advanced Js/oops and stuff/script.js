'use strict';

///////////////////////////////////////
// // Constructor Functions and the new Operator (special functions called by new operator)
// // convention to use 1st Capital letter for constructor func.
// const Person = function (firstName, birthYear) { // arrow func don't work cuz they don't have this keyword
//     // Instance properties
//     this.firstName = firstName;
//     this.birthYear = birthYear;
  
//     // Never do this!, it will create one func. for each obj created from this func., use prototype
//     // this.calcAge = function () {
//     //   console.log(2037 - this.birthYear);
//     // }; 
//   };
  
//   const jonas = new Person('Jonas', 1991); // at the end the this keyword is returned
//   console.log(jonas);
  
//   // 1. New {} is created
//   // 2. function is called, this = {}
//   // 3. {} linked to prototype
//   // 4. function automatically return {}
  
//   const matilda = new Person('Matilda', 2017);
//   const jack = new Person('Jack', 1975);
  
//   console.log(jonas instanceof Person);

  
//   Person.hey = function () {
//     console.log('Hey there 👋');
//     console.log(this);
//   };
//   Person.hey();

//   //////////////////////////////////////
// // Prototypes
// // Each func automatically has prototype property, Similarly constructor func. So every obj gets access to all the properties & meths defined on cons. func.'s prototype property. || Any object has access to properties & meths of its prototype.
// // why prototypal -> When JavaScript was created, it was intended to be a lightweight scripting tool. The prototypal model offered a simple way to add object-oriented capabilities without introducing the complexities of a full class system., simplicity.
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jonas.calcAge(); // prototype of this is person.prototype
// matilda.calcAge();

// console.log(jonas.__proto__); // ptype of jonas obj is ptype prprty of constructor func.
// console.log(jonas.__proto__ === Person.prototype);  //Person.prototype is not the prtype of person

// console.log(Person.prototype.isPrototypeOf(jonas)); // step 3 of new creates a new property proto and sets it value to prototype prprty of cons func.
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person)); // false

// // .prototyeOfLinkedObjects - property naming

// Person.prototype.species = 'Homo Sapiens'; // we can also add properties to the ptype prty of cons. func. cuz to be shared by all.
// // So basically its nothing cons. func have a ptype ppty which contains all common meths ans pties and its ref is shared to all objs. that ref is known as ptype of obj.
// console.log(jonas.species, matilda.species);

// console.log(jonas.hasOwnProperty('firstName'));
// console.log(jonas.hasOwnProperty('species'));


// // For multiword property names they must be quoted

// // property create nhi krni pdti apne aap this keyword se ho jaati


// // class cyz {
// //   constructor(firstName, accid) {
// //     this.movements = []; // its bascially like setting a new property you don't need to declare it like java first.
// //     this._movements // protect
// //   }
// // }

// // promises

// // const cart = ['pants', 'shirts', 'coat'];

// // createOrder(cart, function(orderId) {
// //     paymentPage (orderId, function(paymentInfo)) {
// //       ordersummary (paymentInfo, function() {
// //         updateWalletBalance();
// //       })
// //     }
// // })


// // createOrder(cart).then(orderId => proceedToPayment(orderId)).then(paymentInfo => ordersummary(paymentInfo)).then()



// // promises

//resolve call hota toh automatically then chal jaata , same with reject catch

// const cart = ["pants", "shirts", "coat"];

// const promise  = createOrder(cart);

// promise.then(function(orderId) {
//   console.log(orderId);
//   return orderId;
// }).then(function(orderId) {
//   return proceedToPayment(orderId);
// }).then(function (paymentInfo) {
//   console.log(paymentInfo);
// }).catch(function(err) {
//   console.log(err.message);
// })

// function createOrder(cart) {
//   const prom = new Promise (function(resolve, reject) {
//     if (cart.length === 0) {
//       const err = new Error("Cart has no items");
//       reject(err);
//     }
//     const orderId = "121232";
//     resolve(orderId);
//   });
//   return prom;
// }


// function proceedToPayment(orderId) {
//   return new Promise(function(resolve, reject) {
//     resolve("Payment Successful");
//   });
// }

// promise.all

// const promiseCons = function (returnData, message) {
//     return function(resolve, reject) {
//         setTimeout(() => {
//             console.log(`The ${message} has been called.`),
//             resolve(returnData);
//             }, 
//             returnData*100);
//     }
// }

// const promise1 = new Promise (promiseCons(10, "First"));
// const promise2 = new Promise (promiseCons(20, "Second"));
// const promise3 = new Promise (promiseCons(30, "Third"));

// promise.all([promise1, promise2, promise3]).then((msg) => console.log(msg)).catch((err) => console.log(err.message));


// // object destructuring
// const obj =  {
//     name2: 'fdsasfda',
//     classt : 2,
//     rollNo : 123
// }

// // const {name2, classt}  =  obj; // property name should be same as object
// // console.log(name2, classt); 

// //can skip in b/w objs as well 
// const {rollNo, name2} = obj;
// console.log(rollNo, name2); // order doesn't matter

// document.write("fdaf"); // writes in the web page

// // ooops 
// class Demo {
//     constructor (name1, age) {
//         this.name1 = name1;
//         this.age = age;
//         console.log("obj created");
//     }

//     static meth1 () {
//         // console.log(this.name1);
//         console.log("fdafaf");
//         //don't specify any this keyword operation inside static meth as this refers to the class in static meths.
//     }

//     demo2 () {
//         console.log(this.name1);
//     }
// }

// const ob = new Demo("kunal", 23); //*** don't create objects like in java

// ob.demo2();
// Demo.meth1(); // static meths by class name 


// refer udemy one as well

// you can write direct html to web as well
//<br> is for line break

// document.write(`<h3>coonstructing classes</h3><br>
//                 Name : fdaf`);

// static meths -> These are often utility functions that don't require access to an instance's properties but still belong to the class.
// Cannot Call Instance Methods:
//advantages : Performance: Since static methods don't have access to instance data, they might be slightly faster as they don't need to deal with instance-specific contexts.
// convenience

////////////////////////////////////////////////////////
//  MOdules -> same vars and functions reuse.
// Advantages -> Reusability, html file loading time less, code maintenance

// ES6 (ES2015) Modules:
// Exporting:
// Named Exports: You can export multiple named values;
// module1.js
// export const name = "ChatGPT";
// export function sayHello() {
//   console.log("Hello");
// }
// Default Export: Each module can have one default export.
//// module2.js
// export default function() {
//   console.log("Default function");
// }

// importing 3 -> named imports, import all, default imports

// 2 functions: IMport and export

// modules all notes from udemy

// modules relative path import {name} from './file1.js'; // we are giving relative path here


// import {name, age, ...} from './';

// using modules in browsers
//<script type="module" src="./module1.js"></script> // give relative path

// document.body.innerHTML = 'jkjl';
// yes, setting the innerHTML property of an element, including document.body, will replace the current content of that element with the new content provided.

// for appending
// document.body.innerHTML += '<p>Another paragraph.</p>';
// performance issues don't use it.

// use at the end export {name, age, sab saath mein};
// use alias in import {name as n, age as a};

// import * as yahoo from './fsdfs.js';  alias dena jrrori hota hai || then call every variable and function using that alias

// jo import, export kr rhi  saari  module hogi

//FETCH
// fetch('demo.txt').then((response) => console.log(response)); response obj
// fetch('fsdf.fsdf').then(response => response.json())
//                     .then(data => console.log(data));

// object ko directly nhi print kr skte document.write se 


// async and await

// async function demo() {
//     // try {

//     // }
//     // catch() {

//     // }
//     return (await fetch("jsonData.json")).json();
// }

// let test = demo(); // returns a promise
// test.then(res => console.log(res)).
// catch(err => console.log(err));


// Generators 
// gain control over func statements
function *generateIt() {
    // console.log('1');
    // yield '1st executed'; // has value and done fields in obj
    // console.log('2');
    // yield '2nd executed';
    
    // let nextNum = 100;
    // while (true) yield(nextNum++);
    // let yArr = [yield, yield, yield];
    // console.log(yArr);
    
    // yield* ['a', 'b', 'c']; // * lagake alg alg aayegi
    yield 1;
    yield 2;
    yield 3;
}
let g = generateIt();
console.log([...g]); // spread operator mein ek iterable chahiye hota hai iterable g hai
console.log(g.return('Ending now'));

// g.next(); // yeh wala start se pehle yield pe jaane ke lie
// g.next(500); //yield pe pahucha aur uski value set kr ke aage chala gya
// g.next(600);
// g.next(700);

// for (let a of g) console.log(a); // a automatically value le  leta hai obj se
// console.log(g.next().value); // next ka mtlb next yield pe chala jaayega
// console.log(g.next().value);
// console.log(g.next().value);
// console.log(g.next().value);


// try catch synchronously work krta hai
// basically async methods ke saath aise use
setTimeout(function() {
    try {
        // best usecase
        let json = '{"name":"Yahoo","age":30}';
        let user = JSON.parse(json); // To convert into js object.
        if (!user.name) {
            throw new Error("fasf"); //same as java
        }
        fsdf; // In set time out define it inside
    }catch(error) {

        // if (error instanceof ReferenceError) {

        // }
        // else (error instanceof TypeError) {

        // }

        // console.log(error.name);
        // console.log(error.message);
        // console.log(error.stack); //poora
    }
    finally {
        // always executes
    }
})
