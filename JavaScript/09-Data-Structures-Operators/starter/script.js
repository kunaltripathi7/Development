'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

  
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

// const values = flights.split('+'); //can't add multiple splits but can use a combination of split and join cuz split returns an array
// for (let det of values) {
//   // det = det.split(';');
//   let output = '';
//   for (let [i, info] of det.split('_').entries()) {
//     if (i === 0) {
//       // info = info.split('_').join(' ').trim();
//       info = info.join(' ').trim();
//       if (info.startsWith('Delayed')) info = '🔴 ' + info;
//     }
//     else if (i===3) info = `(${info.replace(':','h')})`;
//     else if (i===1)info = 'from ' + info.slice(0,3).toUpperCase();
//     else info = 'to ' + info.slice(0,3).toUpperCase();
//     output += (info + ' ');
//   }
//   console.log(output.padStart(40));
// }

// better way of doing this
const city = str => str.slice(0,3).toUpperCase();

for (const entries of flights.split('+')) {
  // for performing different operations on diff variables (limited) use destructuring
  const [type, from, to, time] = entries.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll('_', ' ')} from ${city(from)} to ${city(to)} (${time.replace(':', 'h')})`.padStart(50);
  // can't use if statements inside template literal rather use ternary
  console.log(output);
}


////////////////////////////////////////////////////////////////////////////////////////////

  const weekdays = ['mon', 'tue', 'thur'];
  const openingHours = {
    // thu: {
    [weekdays[2]] : {  // [any expression] = [`${2+2}`]
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  };

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',

  // if its location its giving error its already defined guess its a global object
  locations: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  
  // enhanced object literals just write openingHours
  openingHours, // creates a property name same as variable name

  //doesn't need to care about the order of the arguments
  delivery : function({name, starterIndex, mainMenuIndex, time}) {
    console.log(`order (${this.mainMenu[mainMenuIndex]}, ${this.starterMenu[starterIndex]}) will be delivered to ${name} before ${time} `);
  },
  orderPasta : function (ing1, ing2, ing3) {
    console.log(`${ing1}, ${ing2}, ${ing3}`);
  },
  orderPizza : function (mainIngredient, ...other) {
    console.log(mainIngredient);
    console.log(other);
  }
  // orderPizza(mainIngredient, ...other) { new method writing syntax
  //   console.log(mainIngredient);
  //   console.log(other);
  // }
}; 



///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));
// document.querySelector('button').addEventListener('click', function() {
//   const text = document.querySelector('textarea').value;
//   const values = text.split('\n'); // remember its backslash
//   // for (let index = 0; index<values.length; index++) {
//   //   const str = String(values[index]).toLowerCase().trim();
//   //   const cInd = str.indexOf('_');
//   //   const newStr = (str.slice(0, cInd) + str[cInd+1].toUpperCase() + str.slice(cInd+2)).padEnd(30, ' ') + '✅'.repeat(index+1);  
//   //   values[index] = newStr;
//   // }
//   // console.log(values.join('\n'));

//   //better way
//   for (const [i, row] of values.entries()) { // if you want indexes use this
//     const [first, second] = row.toLowerCase().trim().split('_');
//     const output = `${first}${second.replace(second[0], second[0].toUpperCase())}`;
//     console.log(`${output.padEnd(20)}${'✅'.repeat(i+1)}`);
//   }
// });
// older loop (for in)

///////////////////////////////////////
// Working With Strings - Part 2

// // Split and join
// console.log('a+very+nice+string'.split('+')); // returns array 
// console.log('Jonas Schmedtmann'.split(' '));

// const [firstName, lastName] = 'Jonas Schmedtmann'.split(' '); // *** 

// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

// const capitalizeName = function (name) {
//   const names = name.split(' ');
//   const namesUpper = [];

//   for (const n of names) {
//     // namesUpper.push(n[0].toUpperCase() + n.slice(1));
//     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(namesUpper.join(' '));
// };

// capitalizeName('jessica ann smith davis');
// capitalizeName('jonas schmedtmann');
// // There are 7 primitive types: string , number , bigint , boolean , symbol , null and undefined 

// // Padding  
// const message = 'Go to gate 23!';
// console.log(message.padStart(20, '+').padEnd(30, '+'));
// console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

// // use-case (credit card num only last 4 digits)
// const maskCreditCard = function (number) {
//   const str = number + '';
//   const last = str.slice(-4);
//   return last.padStart(str.length, '*');
// };

// console.log(maskCreditCard(64637836));
// console.log(maskCreditCard(43378463864647384));
// console.log(maskCreditCard('334859493847755774747'));

// // Repeat
// const message2 = 'Bad waether... All Departues Delayed... ';
// console.log(message2.repeat(5)); // returns one big string combined not in new lines

// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
// };
// planesInLine(5);
// planesInLine(3);
// planesInLine(12);


///////////////////////////////////////
// Working With Strings - Part 2

// const airline = 'TAP Air Portugal';

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// // Fix capitalization in name
// const passenger = 'jOnAS'; // Jonas
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1); // doesn't gives the error if index passed in slice is greater than the length of str
// console.log(passengerCorrect);

// // Comparing emails
// const email = 'hello@jonas.io';
// const loginEmail = '  Hello@Jonas.Io \n'; // emails are not case sensitive 

// // const lowerEmail = loginEmail.toLowerCase();
// // const trimmedEmail = lowerEmail.trim(); 
// const normalizedEmail = loginEmail.toLowerCase().trim(); //lowercase returns string so call meth on that     
// console.log(normalizedEmail);
// console.log(email === normalizedEmail);

// // replacing
// const priceGB = '288,97£';
// const priceUS = priceGB.replace('£', '$').replace(',', '.');
// console.log(priceUS);

// const announcement =
//   'All passengers come to boarding door 23. Boarding door 23!';

// console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replaceAll('door', 'gate'));
// // console.log(announcement.replace(/door/g, 'gate')); // reg ex g-global, replace meth is case sensitive

// // Booleans
// const plane = 'Airbus A320neo';
// console.log(plane.includes('A320'));
// console.log(plane.includes('Boeing'));
// console.log(plane.startsWith('Airb'));

// if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
//   console.log('Part of the NEW ARirbus family');
// }

// // Practice exercise
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase(); //imp to convert every input

//   if (baggage.includes('knife') || baggage.includes('gun')) {
//     console.log('You are NOT allowed on board');
//   } else {
//     console.log('Welcome aboard!');
//   }
// };

// checkBaggage('I have a laptop, some Food and a pocket Knife');
// checkBaggage('Socks and camera');
// checkBaggage('Got some snacks and a gun for protection');


///////////////////////////////////////
// Working With Strings - Part 1
// const airline = 'TAP Air Portugal';
// const plane =   'A320';

// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log('B737'[0]);  

// console.log(airline.length);
// console.log('B737'.length);

// console.log(airline.indexOf('r'));
// console.log(airline.lastIndexOf('r'));
// console.log(airline.indexOf('portugal')); // case sensitive

// console.log(airline.slice(4)); // creates a new string just as java
// console.log(airline.slice(4, 7));

// console.log(airline.slice(0, airline.indexOf(' '))); // extracting word by word
// console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// console.log(airline.slice(-2)); 
// console.log(airline.slice(1, -1));

// const checkMiddleSeat = function (seat) {
//   // B and E are middle seats
//   const s = seat.slice(-1); // better way than [length-1]
//   if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
//   else console.log('You got lucky 😎');
// };

// // as string is a primitive it doesn't have meths but whenever we call a meth on str js convert str to str obj (Boxing).

// checkMiddleSeat('11B');
// checkMiddleSeat('23C');
// checkMiddleSeat('3E');

// console.log(new String('jonas')); // object
// console.log(typeof new String('jonas'));
// console.log(typeof new String('jonas').slice(1)); // all string methods return primitives (JS converts in back)
// const s = 'sfs';
// console.log(typeof(s)); //string



///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// // 1.
// const events = [...new Set([gameEvents.values()])];
// console.log(events);
// // 2.
// gameEvents.delete(64);
// // 3. 
// console.log(90/gameEvents.size);
// // 4.
// for (const [key, value] of gameEvents) {
//   const str = (key <= 45) ? 'First Half' : 'Second Half';
//   console.log(str, key, value);
// }


/////////////////////////////////////// 4 types of ds in js
// Maps: Iteration (obj vs map \\ map can have any type of key but obj key can only be string)
// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct 🎉'],
//   [false, 'Try again!'], // Using 2d array constructor
// ]);
// console.log(question);

// // Convert object to map
// console.log(Object.entries(openingHours)); // entries provide array of arrays thatswhy
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // Quiz app
// console.log(question.get('question'));
// for (const [key, value] of question) { // we convert obj to iterable by obj.entries while maps are iterable 
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }
// // const answer = Number(prompt('Your answer'));
// const answer = 3;
// console.log(answer);

// console.log(question.get(question.get('correct') === answer));

// // Convert map to array
// console.log([...question]);
// // console.log(question.entries());
// console.log([...question.keys()]); // question.keys() also works fine with iterator
// console.log([...question.values()]);


// ///////////////////////////////////////
// // Maps: Fundamentals
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// console.log(rest.set(2, 'Lisbon, Portugal')); //set meth also returns the map

// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open :D')
//   .set(false, 'We are closed :('); // chaining as set returns map

// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(rest.get(1));

// const time = 8;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // showing power of boolean as map's keys

// console.log(rest.has('categories')); // hasOn for obj   
// rest.delete(2); // objects are slow in deletion using delte operator
// // rest.clear();

// const arr = [1, 2];
// rest.set(arr, 'Test');
// rest.set(document.querySelector('h1'), 'Heading'); // dom elements r also obj
// console.log(rest);
// console.log(rest.size);

// console.log(rest.get(arr));



///////////////////////////////////////
// Sets (can contain mix types)
// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',// need to pass an iterable (sets -> iterable)
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// console.log(ordersSet);

// console.log(new Set('Jonas')); // strings are also iterable

// console.log(ordersSet.size);
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));
// ordersSet.add('Garlic Bread');
// ordersSet.add('Garlic Bread');
// ordersSet.delete('Risotto');
// // ordersSet.clear();
// console.log(ordersSet); // there is no method for getting values out of the set / if you want to retrieve values then use array instead

// for (const order of ordersSet) console.log(order);

// // Example
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = [...new Set(staff)]; // spread works on all iterables / here takes all elements from the set and write them in b/w square brackets
// console.log(staffUnique);

// console.log(
//   new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size 
// );

// console.log(new Set('jonasschmedtmann').size);



///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// // 1
// for (const [i, player] of game.scored.entries()) console.log(`Goal ${i+1} : ${player}`); 
// // 2
// let avg = 0;
// const odds = Object.values(game.odds);
// for (const temp of odds) avg += temp;
// console.log(avg/odds.length);

// // 3
// const oddsName = Object.entries(game.odds); // entries don't store the indexes values (only in case of arrays)
// console.log(oddsName);
// for (const [keys, val] of oddsName) { 
//   // keys === 'x' && console.log(`Odd of Draw : ${val}`);
//   // keys !== 'x' && console.log(`Odd of ${game[`${keys}`]} : ${val}`);
//   // logical assignment does the work but use it there where you need to perform some task irrespective if its true or false
//   //better way use ternary dry think and seperate common part (write optimised)
//   const str = keys === 'x' ? `draw` : `victory`;
//   console.log( `odd of ${str} : ${val}`);

// }
// // Odd of victory Bayern Munich: 1.33
// const scorers = {}
// for (const x of game.scored) {
//   // if (scorers[`${x}`]) scorers[`${x}`]++; // this also works
//   if (scorers[x]) scorers[x]++; // the proper syntax :)
//   if (scorers[x]) scorers[x]++; // the proper syntax :)
//   else scorers[x] = 1;
// }
// console.log(scorers);


///////////////////////////////////////
// // Looping Objects: Object Keys, Values, and Entries

// // Property NAMES (keys)
// const properties = Object.keys(openingHours);
// console.log(properties);

// let openStr = `We are open on ${properties.length} days: `;
// for (const day of properties) {
//   openStr += `${day}, `;
// }
// console.log(openStr);

// // Property VALUES
// const values = Object.values(openingHours);
// console.log(values);

// Entire object
// const entries = Object.entries(openingHours);
// console.log(entries);

// // [key, value]
// for (const [day, { open, close }] of entries) { // usecase destructuring -> don't need to create new variables for assigning something from 2d arrays or objects.
//   console.log(`On ${day} we open at ${open} and close at ${close}`);
// }




// // Optional Chaining

// if (restaurant.openingHours && restaurant.openingHours.mon)
//   console.log(restaurant.openingHours.mon.open); // the problem 

// // console.log(restaurant.openingHours.mon.open);

// // WITH optional chaining
// console.log(restaurant.openingHours.mon?.open);
// console.log(restaurant.openingHours?.mon?.open);

// // Example
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// // nullish vlaues -> null and undefined
// for (const day of days) {
//   // const open = restaurant.openingHours[day]?.open || 'closed'; (||, && usecase replacing if else)
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day}, we open at ${open}`);
// }

// // Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist'); //(??, ?.) works hand in hand pretty well
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// // Arrays (can be used to check if array is empty)
// const users = [{ name: 'Jonas', email: 'hello@jonas.io' }]; 
// // const users = [];

// console.log(users[0]?.name ?? 'User array empty');

// if (users.length > 0) console.log(users[0].name);
// else console.log('user array empty');


// object literal -> the syntax from which we create the obj. - some enhancement in es6. 


// // The for-of Loop
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item); // can use break and continue 

// for (const [i, el] of menu.entries()) { //destructure for better code
//   console.log(`${i + 1}: ${el}`);
// }

// // console.log([...menu.entries()]); (index with value)
// ----------------------------------------------------------------------------------

// // Coding challenge #1

// // 1.
// //wrong way
// // const players1 = [...game.players[0]];
// // const players2 = [...game.players[1]];
// const [players1, players2] = game.players;
// // 2.
// const [gk, ...fieldPlayers] = players1;

// // 3.
// const allPlayers = [...players1, ...players2];

// //4
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// // 5
// // const {team1, draw, team2} = game.odds;
// const {odds : {team1, x : draw, team2}} = game; // need to specify real property names

// // 6
// function printGoals (...players) {
//   for (let i=0; i<players.length; i++) console.log(players[i]);
// } 
// printGoals('Davies', 'Muller', 'Lewandowski','Kimmich');

// // 7
// team1<team2 && console.log('Team1 is more likely to win');
// team2<team1 && console.log('Team2 is more likely to win');


// // Logical Assignment Operators ES2021 
// const rest1 = {
//   name: 'Capri',
//   // numGuests: 20,
//   numGuests: 0,
// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };

// // OR assignment operator
// // rest1.numGuests = rest1.numGuests || 10;
// // rest2.numGuests = rest2.numGuests || 10;
// // rest1.numGuests ||= 10; //sets the value if the varible is currently falsy
// // rest2.numGuests ||= 10;

// // nullish assignment operator (null or undefined)
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// // AND assignment operator
// // rest1.owner = rest1.owner && '<ANONYMOUS>';
// // rest2.owner = rest2.owner && '<ANONYMOUS>';
// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);

// // summary : or assignment || nullish assignment is used when we want to add the value if it doesn't exist and keep it the same if it exists.
// // and -> if exists = change it, if not exists = remain same


// // The Nullish Coalescing Operator ES2020  
// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// // Nullish: null and undefined (NOT 0 or '') will treat only null and undefined as falsy values || works on the concept of nullish values.
// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);


// // Short Circuiting (&& and ||) // means the expression is not evaluated completely and the result is given accordingly.

// console.log('---- OR ----'); // returns the 1st truthy value
// // Use ANY data type, return ANY data type, short-circuiting
// console.log(3 || 'Jonas'); // in case of or if 1st val is truthy immediately return that value 
// console.log('' || 'Jonas');
// console.log(true || 0);
// console.log(undefined || null);  // if all values are falsy then the evaluation continues and the last val is returned. same for AND.

// console.log(undefined || 0 || '' || 'Hello' || 23 || null); // hello

// // Use - Case
// restaurant.numGuests = 0; // doesn't works in case of no of guests are zero cuz 0 is a falsy value.
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1); // for setting the default values

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log('---- AND ----'); // returns the 1st falsy value
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');

// console.log('Hello' && 23 && null && 'jonas');

// // Practical example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }
// //will move forward only if the last one was true. || used to confirm if something exists or not.
// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

//summary : AND = if something is true then do this., OR = keep performing until the 1st one becomes true.



// // Rest Pattern and Parameters
// // opposite of spread -> packs elements whereas spread unpacks
// // 1) Destructuring

// // SPREAD, because on RIGHT side of =
// const arr = [1, 2, ...[3, 4]];

// // REST, because on LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5]; // rest pattern basically collects all the unused elements in the destructuring assignment (thatswhy its called rest (remaining)) 
// console.log(a, b, others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood); // doesn't include the skipped elements (thatswhy it should be at last to collect all the remaining elements)

// // Objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// // 2) Functions
// // REST -> Muliple vals -> single packed array
// // Spread -> Single array -> unpacks into multiple vals
// const add = function (...numbers) {  // taking multiple vals and packs into one array || also known as rest parameters
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);
// // the rest pattern passing vals in functions just like variable arguments in java

// const x = [23, 5, 7]; // why this?? it gives more options like passing individual args or an array
// add(...x); // spread and rest both in action (true variable arguments implementation)

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// restaurant.orderPizza('mushrooms');

//  **** summary : rest pattern is used where we otherwise write variable names seperated by commas and spread operator is used where we otherwise write values sepertaed by commas.

// // Spread Operator :

// const arr = [1,2,3];
// const newArr = [5,6, ...arr];
// console.log(newArr);
// console.log(...newArr); //prints individual elements

// const newMenu = [...restaurant.mainMenu, 'Chokha'];
// console.log(newMenu);
// // spread operator difference to destructure it takes all the array values and not create any variables.

// // two useCases:
// // shallow copy const arr = [...newArr];
// // join 2 arrays
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(menu);
// // spread operator works on all iterables. (objects are not iterables.)

// // Real-world example
// const ingredients = [
//   // prompt("Let's make pasta! Ingredient 1?"),
//   // prompt('Ingredient 2?'),
//   // prompt('Ingredient 3'),
// ];
// console.log(ingredients);

// // passing to functions
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients); // ES6 syntax (automatically assigns it to function arguments)


// // Objects (from es2018, spread also works with obj even though they are not iterables)
// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant }; // creates a shallow copy
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

// Destructuring objects :

// const {locations} = restaurant;
// const {name, openingHours, categories} = restaurant; // variable names must be same as the property names of the obj, order does not mattter so no need to skip.
// console.log(name, openingHours, categories);

// // useful in api calls as data is sent using objs. so default value
// const {name : resName , openingHours : hours, location : loc} = restaurant;

// // changing the name of properties variables.
// const {menu = [], starterMenu : starters = []} = restaurant;
// console.log(menu, starters); 


// Mutating variables
// let a = 222;
// let b = 333;
// const obj = {a:7, b:3};
// // {a, b} = obj; // javascript expects a block of code in curly braces.
// ({a,b} = obj)
// console.log(a,b);

// Nested objs destructuring
// should provide name of the nested obj in syntax
// const {fri : {open : o, close : c}} = openingHours;
// console.log(o, c);

// // practical use of destructuring of objs
// restaurant.delivery({
//   time : '19:30',
//   mainMenuIndex : 2,
//   starterIndex : 1,
//   name : 'histeria'
// });


// Destructuring arrays
// Destructuring -> unpacking obj/arr into smaller variables.
// const arr = [1,2,3];
// const [x, y, z]= arr;  destructuring (original arrray is not affected.)
// let [a, b,c] = arr;
// a = 3;
// console.log(arr);

// const [x, , y] = arr; // leaving a hole in between to select 3rd and 1st
// changing values of variables by destructuring
// [x, y] = [y, x]; 

// nested destructuring
// const arr = [1,2,3, [6,7]];
// const [a,,,[b,c]] = arr;
// console.log(a, b, c);

// default values
// const [p=1,q=1,r=1] = [9,8];
// console.log(p,q,r);

