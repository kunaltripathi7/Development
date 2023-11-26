'use strict';

///////////////////////////////////////
// Constructor Functions and the new Operator (special functions called by new operator)
// convention to use 1st Capital letter for constructor func.
const Person = function (firstName, birthYear) {
  // arrow func don't work cuz they don't have this keyword
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
  // its same as static method
  console.log('Hey there 👋');
  console.log(this); // this always points to obj calling the meth so Person
};
Person.hey();

//////////////////////////////////////
// Prototypes
// Each func automatically has prototype property, Similarly constructor func. So every obj gets access to all the properties & meths defined on cons. func.'s prototype property. || Any object has access to properties & meths of its prototype.
// why prototypal -> When JavaScript was created, it was intended to be a lightweight scripting tool. The prototypal model offered a simple way to add object-oriented capabilities without introducing the complexities of a full class system., simplicity.
console.log(Person.prototype); // func's also has prototype which is known as prototype property cuz it is not a ref to another obj. || person.ptype is an obj thatswhy we can add meth to that.

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge(); // prototype of this is person.prototype
matilda.calcAge();

console.log(jonas.__proto__); // ptype of jonas obj is ptype prprty of constructor func.
console.log(jonas.__proto__ === Person.prototype); //Person.prototype is not the prtype of person

console.log(Person.prototype.isPrototypeOf(jonas)); // step 3 of new creates a new property proto and sets it value to prototype prprty of cons func.
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person)); // false

// .prototyeOfLinkedObjects - property naming

Person.prototype.species = 'Homo Sapiens'; // we can also add properties to the ptype prty of cons. func. cuz to be shared by all.
// So basically its nothing cons. func have a ptype ppty which contains all common meths ans pties and its ref is shared to all objs. that ref is known as ptype of obj.
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

console.dir(Person);

/// EVERY OBJECT HAS ITS PROTOTYPE IN JS
///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects
console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)]; // creates a func to filter duplicates on arr
}; // not preferred adding ptype to built ins

console.log(arr.unique());

const h1 = document.querySelector('h1'); // all the elements are objects like this h1
console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
};
Car.prototype.brake = function () {
  this.speed -= 5;
};
// const car1 = new Car("Ferrari", 200);
// car1.accelerate();
// car1.accelerate();
// car1.brake();
// console.log(car1.speed);

///////////////////////////////////////
// ES6 Classes
// behind the scenes classes are still functions.
// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    //needs to be constructor name
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property // by default
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    // just like a property
    return 2037 - this.birthYear;
  }

  // Set a property that already exists (conflict b/w setter and cons property name stack overflow)
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    // name the property a new name to avoid conflict. Cons("", "") full name is called & redirects to setter w/o creating the fullName prop and setter creates _fullName. BAscially it overrides that.
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this); // this_> PersonCl (cuz its also func)
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () { // can perform this on class as well
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens || cuz classes == func // stored as value
// 3. Classes are executed in strict mode

const walter = new PersonCl('Walter White', 1965);
// PersonCl.hey();

///////////////////////////////////////
// Setters and Getters (Data validation (usecase))
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    // setter will have exactly one var
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50; // basically adds as a property with the name of the get & set method
console.log(account.movements);

///////////////////////////////////////
// Object.create    /// used to manually set an obj's prototype
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    // any meth like const inside ptype of obj just another way
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979); // nyi property automatically bana dega
sarah.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
// class Car {
//   constructor (make, speed) {
//     this.name = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//   }

//   brake() {
//     this.speed -= 10;
//   }

//   get speedUs() {
//     return this.speed/1.6;
//   }

//   set speedUs(speed) {
//     this.speed = speed*1.6;
//   }

// }

// const car1 = new Car("Ferrari", 196);
// // car1.speedUs = 76;
// console.log(car1.speedUs);

///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear); // in a regular func call this points to undefined
//   this.course = course;
// };

// // Linking prototypes
// Student.prototype = Object.create(Person.prototype); // needs to be done before cuz it will return an empty object. Bascially overrides if stu.ptype has some meths.

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const mike = new Student('Mike', 2020, 'Computer Science');
// mike.introduce();
// mike.calcAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Student);//The instanceof operator checks if an object was created using a certain blueprint (constructor). A simple mental model for understanding the instanceof operator is by imagining it as a way to traverse up the prototype chain to see if a specific prototype object exists in that chain.
// console.log(mike instanceof Person);
// console.log(mike instanceof Object); // student X -> Person -> X -> Object yes

// Student.prototype.constructor = Student; // Using obj.create js pointed student cons to person. which we need to fix back as the cons prptry points backwards to the function itself. The constructor property can be useful in certain scenarios. For instance, if you have an instance of an object and you want to know which constructor created it, you can use the constructor property.
// console.dir(Student.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);
// EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  // u r adding the accelerate method on EV.prototype not car.prototype both r diff obj's
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `Tesla going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const fe = new EV('Ferrari', 50, 90);
fe.accelerate();
fe.brake();
fe.accelerate();

///////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method
//   static hey() {
//     console.log('Hey there 👋');
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     // Always needs to happen first! cuz othrwise we won't be able to access this keyword. Before you can set any properties on this in the derived class, you need to make sure the parent class has done its initialization. Make the instance related to parent class.
//     super(fullName, birthYear);
//     this.course = course; // If u don't have any extra prprty then don't create this cons func it automatically initializes the parent class cons.
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}`);
//   }

//   calcAge() {
//     console.log(
//       `I'm ${
//         2037 - this.birthYear
//       } years old, but as a student I feel more like ${
//         2037 - this.birthYear + 10
//       }`
//     );
//   }
// }

// const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
// martha.introduce();
// martha.calcAge();

// ///////////////////////////////////////
// // Inheritance Between "Classes": Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);

// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   // BUG in video:
//   // console.log(`My name is ${this.fullName} and I study ${this.course}`);

//   // FIX:
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const jay = Object.create(StudentProto);
// jay.init('Jay', 2010, 'Computer Science');
// jay.introduce();
// jay.calcAge();

///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods
// Not available now || Properties == fields

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

class Account {
  // 1) Public fields (instances) // they are not on a prtype
  locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];
  #pin; //declaration (dn't need const/let)

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // Protected property (convention _)
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods

  // Public interface i.e better ux to public
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val); // using this for calling some meth to make changes in that obj.prpty, same implementation in java u call a method on the curr obj.
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }

  // 4) Private methods
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1._movements.push(250); don't want to mess with the internal properties so encapsulate it.
// acc1._movements.push(-140);
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();

// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

// Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} is going ...`);
    return this;
  }

  chargeBattery(val) {
    this.charge = val;
    return this.val;
  }
}
