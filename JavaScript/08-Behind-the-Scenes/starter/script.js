'use strict';
// function demo (birthYear) {
//     console.log(2023-birthYear + ' ' + firstName);
// }

// const firstName = 'Kunal';
// demo(2000);
// const firstName = 'Kunal'; gives error as declared after

// ------------------------------------------------------------------------
// var firstName = 'Mal'; //  it will make the arrow function work. || another problem with var. as it will get into window object. (cuz var has func. lvl scoping)
// const demo = {
//     firstName : "fafdaf",
//     arrrow : () => {
//         console.log(this.firstName);
//     }
// };
// // *** an objects block is not a block of code or scope. its the global scope only.

// demo.arrrow(); // gives undefined cuz this gets it from parent scope -> global scope
// doesn't gives error as when we try to access a certain prooperty on obj that is not there it gives undef.

//  conc : never use an arrow func as a method.

const jonas = {
  year: 2000,
  calcAge: function () {
    console.log('ff');
    const demo = function () {
      console.log(this);
      console.log(this.year);
    };
    demo(); // will output undefined cuz this is just a regular func call as if it would be in the global scope.
  },
};

// jonas.calcAge();

const copy1 = Object.assign({}, jonas);
console.log(copy1);
