// Arrow functions
const birthYear = 2000;
const res = (dob) => 2023 - dob;

console.log(res(1990));

// ctrl+d for selecting all next occurences
// let fsdf = 'fa'
// fsdf = 'fdsfaf'

// Coding challenge
function calcTip(billValue) {
  if (billValue < 300 && billValue > 50) return billValue * 0.15;
  return billValue * 0.2;
}

console.log(calcTip(100));
