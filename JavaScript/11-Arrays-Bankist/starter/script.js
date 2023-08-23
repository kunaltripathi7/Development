'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements, sort = false) { // nice way if you don't wanna pass sort value at every place only when the user clicks it
  containerMovements.innerHTML = ''; // selects the entire HTML of that element
  const movs = sort ?movements.slice().sort((a, b) => a-b) : movements;
  movs.forEach(function (mov, index) {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const nHtml = `<div class="movements__row">
                    <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
                    <div class="movements__value">${mov}€</div>
                  </div>`; 
    containerMovements.insertAdjacentHTML('afterbegin', nHtml);
  });
}
// displayMovements(account1.movements);

// get used to create functions and store local variables in them for operations, only write global variables when you really need them.


const createUsernames = function (acc) {
  acc.forEach( function(user) {
  user.username = user.owner.toLowerCase().split(' ').map(ele => ele[0]).join('');
  }
  );
};
createUsernames(accounts);
// console.log(accounts);

// global balance
// labelBalance.textContent = `${account1.movements.reduce((acc, curr) => acc+curr, 0)}€`;
//When you don't provide an initial accumulator value:The first element of the array becomes the initial value of the accumulator.

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(entry => entry>0).reduce((acc, curr) => acc+curr);
  const withdrawals = acc.movements.filter(entry => entry<0).reduce((acc, curr) => acc+curr);
  const interest = acc.movements.filter(entry => entry>0).filter(entry => (entry*(acc.interestRate/100)) >= 1).reduce((accu, curr) => accu+(curr*(acc.interestRate/100)),0);
  //in chaining if you are not getting the desired result you can add the overhead and then remove that later like here filter
  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;
  labelSumInterest.textContent = `${Math.trunc(interest)}€`;
}

const updateUI = function (acc) {
    // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcDisplayBalance(acc);
  
    // Display summary
    calcDisplaySummary(acc);
};


// calcDisplaySummary(account1.movements);

// don't chain methods that mutate arrays like splice and reverse 
/////////////////////////////////////////////////

// the default behaviour when we click submit btn the page reloads
// after filling any input field if u press enter its the same click event submit

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  const transferAmount = Number(inputTransferAmount.value);

  // Clear input fields
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
  
  if (transferAmount > 0 && receiverAcc && receiverAcc?.username != currentAccount.username && transferAmount <= currentAccount.balance) {
    receiverAcc.movements.push(transferAmount);
    currentAccount.movements.push(-transferAmount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const loanAmt = Number(inputLoanAmount.value);
  if (loanAmt > 0 && currentAccount.movements.some(mov => mov >= loanAmt * 0.1)) {
    currentAccount.movements.push(loanAmt);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});


// delete an element from array -> use splice or delete arr[2];
btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => currentAccount.username === acc.username); // also receives curr index and array
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in';
  }
  inputCloseUsername.value = inputClosePin.value = '';
  console.log(accounts);
});
// diff between findIndex() and indexOf is its for just finding the index of elements that are present in the array.
let sorted = false;
btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});


/////////////////////////////////////////////////
// LECTURES
/////////////////////////////////////////////////

// // Arrays are objects.
// // Simple Array Methods
// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// console.log(arr.slice(2)); // returns a new array
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice()); // creates a shallow copy of the array
// console.log([...arr]);

// // SPLICE
// // console.log(arr.splice(2)); // mutates the array takes the part and returns it & original array loses it.
// arr.splice(-1); // usecase deleting last ele
// console.log(arr);
// arr.splice(1, 2); // 2nd is no.of ele needed to  be del
// console.log(arr);

// // REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse()); // it mutates the original array
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2); // mutates
// console.log(letters);
// console.log([...arr, ...arr2]); // not mutates

// // JOIN
// console.log(letters.join(' - '));

///////////////////////////////////////
// // The new at Method
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// // getting last array element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// console.log('jonas'.at(0));
// console.log('jonas'.at(-1)); // also for strings

// use case -> method chaining, finding the last element of the array

///////////////////////////////////////
// Looping Arrays: forEach
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('---- FOREACH ----'); // 1st para -> ele, 2nd -> index, 3rd -> array
// movements.forEach(function (mov, i, arr) { // ex of telling a higher order func what exactlly it should do everytime
//   // break and continue doesn't work here
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });
// // 0: function(200)
// // 1: function(450)
// // 2: function(400)
// // ...

// // usecase -> easier to have index in for-each


///////////////////////////////////////
// // forEach With Maps and Sets
// // Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // Set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) { // it has value, value cuz if it wouldn't have been it would have made it diff from others.
//   // In js _ variable is throwaway var or unnecessary var.
//   console.log(`${value}: ${value}`);
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const arr1 = [3, 5, 2, 12, 7];
// const arr2 = [4, 1, 15, 8, 3];
// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice(); // shallow copy 
//   dogsJuliaCorrected.splice(0,1); // splice for deleting
//   dogsJuliaCorrected.splice(-2,2);
// const corrected = [...dogsJuliaCorrected, ...dogsKate];
// corrected.forEach(function(ages, index) {
//   ages >= 3 ? console.log(`Dog number ${index+1} is an adult, and is ${ages} years old`) : console.log(`Dog number ${index+1} is still a puppy 🐶`);
// });
// };
// checkDogs(arr1, arr2);
// checkDogs([9, 16, 6, 8, 3],[10, 5, 6, 1, 4]);


///////////////////////////////////////
// // The map Method
// const eurToUsd = 1.1;

// // const movementsUSD = movements.map(function (mov) {
// //   return mov * eurToUsd;
// // }); // this functional programming is more preferred than for of technique.

// // no performance reason for function expressions over func declarations

// // const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// // side effects are operations done in a function besides returning a value.

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementsDescriptions);

// const usernames = accounts.map(account => account.owner.toLowerCase().split(' ').map(str => str[0]).join(''));
// console.log(usernames);


///////////////////////////////////////
// The filter Method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposits = movements.filter(function (mov, i, arr) {
//   return mov > 0;
// });

// // why this & not using for of for everything??
// // 1. Functional programming
// // 2. Practical application -> chaining these methods gets handy 
// // console.log(movements);
// // console.log(deposits);

// const withdrawals = movements.filter (mov => mov<0);
// console.log(withdrawals);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);


///////////////////////////////////////
// // The reduce Method
// Use map, filter, reduce instead of for of 
// console.log(movements);

// // accumulator -> SNOWBALL
// // const balance = movements.reduce(function (acc, cur, i, arr) {
// //   console.log(`Iteration ${i}: ${acc}`);
// //   return acc + cur;
// // }, 0);
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// // Maximum value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]); // start value as max or min
// console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = function(ages) {
//   return ages.map(age => age<=2 ? 2*age : 16+age*4).filter(age => age>=18).reduce((acc, curr, _, arr) => acc+(curr/arr.length), 0);
// };
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

///////////////////////////////////////
// // The Magic of Chaining Methods
// const eurToUsd = 1.1;
// console.log(movements);

// // PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * eurToUsd;
//   })
//   // .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);
///////////////////////////////////////
// The find Method
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// // it is used to find only one element -> the first one satisfies the condition is returned.


///////////////////////////////////////
// // some and every
// console.log(movements);

// // EQUALITY
// console.log(movements.includes(-130)); // only check for equality

// // SOME: CONDITION (suppose for some condition we need to check here any deposits or deposits over 5000)
// console.log(movements.some(mov => mov === -130));

// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// // EVERY (all the ele satisfy the condition)
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));


///////////////////////////////////////
// // flat and flatMap
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat()); // creates a new array

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2)); // takes in depth argument

// // flat
// const overalBalance = accounts
//   .map(acc => acc.movements) // taking only relevant part from an obj use (MAP meth.)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// // flatMap to do it one go
// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements) // goes only one level deep
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance2);


///////////////////////////////////////
// Sorting Arrays

// // Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort()); // only sorts strings
// console.log(owners);

// // Numbers
// console.log(movements);

// // return < 0, A, B (keep order)
// // return > 0, B, A (switch order)

// // Ascending
// // movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (a < b) return -1;
// // });
// movements.sort((a, b) => a - b); // 0 => remains unchanged
// console.log(movements);

// // Descending
// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (a < b) return 1;
// // });
// movements.sort((a, b) => b - a);
// console.log(movements);

// //Shallow copy is a bit-wise copy of an object. A new object is created that has an exact copy of the values in the original object. 
// // If your array contains only primitive types (number, string, boolean), then the slice method will return a new array with copies of those values. Modifying these values in the new array won't affect the original array.
// // why think bout how primitives are stored in the memory.

// // If your array contains objects (including other arrays), then the slice method will return a new array that contains references to the same objects. If you modify the objects in the new array (e.g., change the properties of those objects or modify the elements of those sub-arrays), those modifications will be reflected in the original array as well.

////////////////////////////////////
// More Ways of Creating and Filling Arrays
// const arr = [1, 2, 3, 4, 5, 6, 7];
// // console.log(new Array(1, 2, 3, 4, 5, 6, 7)); 

// // Emprty arrays + fill method
// const x = new Array(7); // if we pass only one arg then it treats it as length
// // console.log(x);
// // console.log(x.map(() => 5)); //doesn't works
// x.fill(1, 3, 5); // only fill works one empty arrays (beg & end)
// x.fill(1);
// // console.log(x);

// arr.fill(23, 2, 6);
// // console.log(arr);

// // Array.from (Dynamically creating arrays)
// const y = Array.from({ length: 7 }, () => 1); //Array func object pe method call kr rhe
// // console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1); // similar to map callback meth
// // console.log(z);

// console.log(Array.from({length : 100}, () => Math.floor(Math.random()*6)+1));
// // Formula : Math.floor(Math.random() * (max - min + 1)) + min

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   ); // accepts all ele's or length of new arr as 1st and at 2nd -> callback function
//   console.log(movementsUI);

//   //alternative way to convert but mapping has to be done seperately
//   const movementsUI2 = [...document.querySelectorAll('.movements__value')];
// });
// js -> html ele's stored in node structure -> querySelector returns some elements(nodes) -> nodelist 2 types -> static & live

// const depositSum = accounts.map(acc => acc.movements).flat().filter(entry => entry>0).reduce((acc, curr) => acc+curr);
// console.log(depositSum);

// const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((acc, curr) => curr > 1000 ? acc + 1 : acc, 0);
// console.log(numDeposits1000);


// const {deposits, withdrawals} = accounts.flatMap(acc => acc.movements).reduce((sums, curr) => {
//    curr>0 ? sums.deposits += curr : sums.withdrawals += curr;
//    return sums;
// }, 
// {deposits : 0, withdrawals : 0});
// console.log(deposits, withdrawals);
/*
///////////////////////////////////////
// Array Methods Practice

// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);
 // a++ does increase the value but returns the curr value
// Prefixed ++ oeprator
let a = 10;
console.log(++a);
console.log(a);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; // optimise to the fullest DRY principle
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  // identify map meth will be used -> whenever we need a new array with same size with some changes to it.
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
    .join(' ');

  return capitzalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/


// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// // 1.
// dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

// // 2.
// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(dogSarah);
// console.log(
//   `Sarah's dog is eating too ${
//     dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
//   } `
// );

// // 3.
// const ownersEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.recFood)
//   .flatMap(dog => dog.owners);
// // .flat();
// console.log(ownersEatTooMuch);

// const ownersEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.recFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);

// // use reduce when you want to create a more than one array from one iterable in one go 

// // const {ownersEatTooMuch, ownersEatTooLittle} = dogs.reduce((acc, curr) => {
// //   curr.curFood < curr.recommendedFood ? acc.ownersEatTooLittle.concat(curr.owners) : acc.ownersEatTooMuch.concat(curr.owners);

// // return acc; why concat was not working because concat returns a new array without modifying the original array.

// // }, 
// // {ownersEatTooMuch : [], ownersEatTooLittle : []});
// const {ownersEatTooMuch, ownersEatTooLittle} = dogs.reduce((acc, curr) => {
//   curr.curFood < curr.recommendedFood ? acc.ownersEatTooLittle = acc.ownersEatTooLittle.concat(curr.owners) : acc.ownersEatTooMuch = acc.ownersEatTooMuch.concat(curr.owners);
//   return acc;
// }, 
// {ownersEatTooMuch : [], ownersEatTooLittle : []});
// console.log(ownersEatTooMuch, ownersEatTooLittle);

// // 4.
// // "Matilda and Alice and Bob's dogs eat too much!"
// //  "Sarah and John and Michael's dogs eat too little!"
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// // 5.
// console.log(dogs.some(dog => dog.curFood === dog.recFood));

// // 6.
// // current > (recommended * 0.90) && current < (recommended * 1.10)
// const checkEatingOkay = dog =>
//   dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

// console.log(dogs.some(checkEatingOkay));


// // my code DRY principle if thing is repeating make it a func or optimise by using literal or other.
// // console.log(dogs.some(obj => obj.curFood > obj.recommendedFood*0.90 && obj.curFood < obj.recommendedFood*1.10));

// // 7.
// console.log(dogs.filter(checkEatingOkay));

// // 8.
// // sort it by recommended food portion in an ascending order [1,2,3]
// const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood); //slice() creates a shallow copy
// console.log(dogsSorted);
//fdsafafadf 
gsfdgdsggfgsdgfdsg
