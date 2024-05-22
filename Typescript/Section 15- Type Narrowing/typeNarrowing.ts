// const printLetters = (word?: string) => {
//   // optional parameter
//   if (word) {
//   } else {
//     // string | undefined cuz "" is also falsy.
//   }
// };

// interface Dog {
//     name: string,
//     breed: string,
// }

// interface Cat {
//     name: string,
//     numLives: number
// }

// function isCat(animal: Cat | Dog): animal is Cat { // ts will know its used to detect the cat type
//     return (animal as Cat).numLives !== undefined; // function should return boolean;
// }

// function (makeNoise: Cat | Dog) {
//     if (isCat(makeNoise)) {

//     }
//     else {

//     }
// }

// type declarations
// interface user {
//   name: string,
//   ..
//   ..
// }

// axios.get<user>() => gonna return the same object of type user due to internal implementation
