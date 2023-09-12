///////////////////////////////////////
// Exporting and Importing in ES6 Modules // importing also works without exporting but all the vars and func's are scoped to modules
//import {addToCart}  from xyz named export -> export keyword before any func. -> needs to happen in top level code (global)

// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

// console.log('Importing module');
// console.log(shippingCost);

// import * as ShoppingCart from './shoppingCart.js'; //className convention
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

//default import give it any name
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log(price);

import add, { cart } from "./shoppingCart.js"; // avoid mix of default imports
add("pizza", 2); //live connections update in the cart in other module
add("bread", 5);
add("apples", 4);

console.log(cart);

///////////////////////////////////////
// Top-Level Await (ES2022)

// console.log('Start fetching'); // blocking the execution
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

// const getLastPost = async function () {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const data = await res.json();

//     return { title: data.at(-1).title, text: data.at(-1).body };
//   };

//   const lastPost = getLastPost();
//   console.log(lastPost);

//   // Not very clean
//   // lastPost.then(last => console.log(last));

//   console.log(lastPost2);

// why iife? to encapsulate data need a func.

///////////////////////////////////////
// The Module Pattern

// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
//     ); // can print private members as well
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();
// // IIFe forms a closure to run methods inside it afterwards.

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('pizza', 2);
// console.log(ShoppingCart2); // has only returned stuff as obj
// console.log(ShoppingCart2.shippingCost); //can't access this inside iife (Private)
// // iife disadvantages -> can't use bundlers and need to create multiple scripts and link in html where order is also taken care of., no asynchronous module loading,global pollution

//////////////////////////////////////
// // CommonJS Modules (node js heavily used -> now replaced || npm still uses cuz it was originally only for node now it is for whole js)|| (other one -> AMG modules)

// // Export
// export.addTocart = function (product, quantity) { // export is an obj in nodejs
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
//   );
// };

// // Import
// const { addTocart } = require('./shoppingCart.js');
//Advantage of module system : organized bookshelf ex, avoid name classes independent work, reusability, maintainability

//cmd rm -R(Recursive flag) temp

//////////////////////////////////////
// Introduction to NPM (package repository & software)
//analogy = book(package), repository(library)
// A package is a bundled collection of code, resources, and documentation that accomplishes a specific task or set of tasks. You can install it, use it, and sometimes modify it based on its license. A repository is a storage location or a service where multiple packages are kept, organized, and made available for download and installation. When you need a package, you fetch it from a repository.

// In past -> including libraries from html like mapty proj || dis -> 1. if library got updated manually update the pkg, 2. global scope 3.no single repository for all libraries

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from "lodash-es"; // possible with parcel (it downloads if the library isn't there)

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state); // creates primitives but copies references of objects inside ones
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
  // code only parcel gets (no reload on saving maintaining the same state)
  module.hot.accept();
}
//since the state is maintained the values gets added every time the code executes

class Person {
  #greeting = "Hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const jonas = new Person("Jonas");

console.log("Jonas" ?? null);

console.log(cart.find((el) => el.quantity >= 2));
Promise.resolve("TEST").then((x) => console.log(x)); // babel can't transpile the new features of the lang like promise find meth etc. transpile -> converting to older syntax like arrow to function etc.

import "core-js/stable"; //external library for polyfilling (promises, newer func etc.) // polyfilling doesnt remove find method but recreates find method in the bundle
// import "core-js/stable/array/find"; // only including the find method to polyfill -> reduces the bundle size otherwise it polyfills some more similar meths
// import "core-js/stable/promise";

// Polifilling async functions
// import "regenerator-runtime/runtime";

// using npm -> npm init then install packages
// leaflet uses common js modules so we can't use it without the module bundler || Browsers natively don't understand CommonJS syntax. If you try to directly include a file that uses require or module.exports in a web page, it won't work. So a module bundler makes it possible.
//pkg.json keeps the data which are the dependencies so if you need to transfer it to another comp it just installs it. not transfer node modules to git.

// module bundler -> several modules -> pack into a single container

// dev dependency -> tool to build the proj but not to be included in code (like at the time when end-users use the app)

//npm script -> just replace the command with the script

// build is the compressed bundle for production npm build script.js
// parcel is a bundler and babel converts code for older browsers

//babel _ uses plugins(one thing arrow func) | presets (bunch of plugins bundled together) || parcel uses babel preset env (this preset only includes code that is part of the lang like class fields were at stage 3) then you can include other plugin like class prprty
