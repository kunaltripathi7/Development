// "use strict";
"strict mode";
const budget = Object.freeze([
  //shallow freeze on 1st levels
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
]);

const spendingLimits = Object.freeze({
  //makes it immutable
  jonas: 1500,
  matilda: 100,
});

const getLimit = (user, limits) => limits?.[user] ?? 0; //passing limits for not even accessing outer scoped (now the func is independent can do all his work without looking up the scope chain)

// how to convert impure to pure -> pass all the data to func that it depends on
// impure -> changes the state of obj/data outside its scope
const addExpenses = function (
  state, // two objs input for implementing immutability
  limits,
  value,
  description,
  user = "jonas"
) {
  const cleanUser = user.toLowerCase();
  return value <= getLimit(cleanUser, spendingLimits)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpenses(budget, spendingLimits, 10, "Pizza 🍕");
const newBudget2 = addExpenses(
  newBudget1,
  spendingLimits,
  100,
  "Going to movies 🍿",
  "Matilda"
);
const newBudget3 = addExpenses(newBudget2, spendingLimits, 200, "Stuff", "Jay");
console.log(newBudget3); // Advanced technique of doing this is currying(composing) -> passing the previous result created to next operation

// Impure
// const checkExpenses = function () {
//   for (const entry of budget)
//     if (entry.value < -getLimit(entry.user)) entry.flag = "limit";
// };
// checkExpenses();

//pure
const checkExpenses = (state, limits) =>
  state.map((entry) =>
    entry.value < -getLimit(entry.user, limits)
      ? { ...entry, flag: "limit" }
      : entry
  );
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// const logBigExpenses = function (bigLimit) {
//   let output = ""; // manipulating output var is also opposed to immutability(never in func use let always const)
//   for (const entry of budget)
//     output +=
//       entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : ""; // Emojis are 2 chars
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };
//impure cuz creates a side effect by logging into console
const logBigExpenses = function (bigLimit, state) {
  const bigExpenses = state
    .filter((entry) => entry.value <= -bigLimit)
    // .map((entry) => entry.description.slice(-2))
    // .join(" /");
    .reduce((str, curr) => `${str} ${curr.description.slice(-2)} /`, ""); // *** STRINGS GENERATOR WITH REDUCE
  console.log(bigExpenses);
};
logBigExpenses(500, finalBudget);
//use as much as it is possible but not hard guidelines
