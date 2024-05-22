const inp = document.querySelector<HTMLInputElement>("#username")!; // will get inputEle or null.,  telling the input type and that type will be returned by that querySelector
inp.value = "3";
// function (type: any): any -> no correlation between input & output -> here's generic comes into play same i/o return.

// problem:
// function randomEle(list: number[]): number {} // we need to make same for every data type, sol -> generic

// inferrred generic types:
/*  getRandomEle<string>(list: string[]): string
    getRandomElement([1,2,343,5]) -> automatically inferred cuz here is a relationship in i/o -> same type.
    not applicable in some things like -> const inp = document.querySelector("#username")!; cuz there's nocorrelation args is a string and we don't know if that thing is even created yet || its like input is always a string and output is unknown if we don't specify <HtmlInputElement> 
*/

// add , in tsx for arrow functions

// k-V
// function merge(ob1, ob2) {
//   return {
//     ...ob1,
//     ...ob2,
//   };
// }

// const getEle = merge({ name: "jon" }, { pets: ["ren", "fds"] }); // problem: returning any -> we want to avoid that in ts -> purpose of ts is to type safe

// function merge<T, U>(ob1: T, ob2: U) {
//   // automatically infers that it will be intersection of two
//   return {
//     ...ob1,
//     ...ob2,
//   };
// }

// const getEle = merge({ name: "jon" }, { pets: ["ren", "fds"] });
// number is a primitive wrappper class Number

// constraints:
// prblm = const new = merge({name: "fdsa"}, 9) -> returns {name: "fdsa"};

// function merge<T extends object, U extends object>(ob1: T, ob2: U) {
//   // Generic constraints
//   return {
//     ...ob1,
//     ...ob2,
//   };
// }

// interface constraints

// interface lengthy {
//   length: number;
// }

// function merge<T extends lengthy>(obj: T): number {
//   return obj.length * 2;
// }

// // can be achieved via this
// function merge(obj: lengthy): number {
//   return obj.length * 2;
// }

// stricter type safety -> unknown in comparison to any.
// default value:
// function makeEmptyArray<T = number>(): T[] {
//   return [];
// }

// const res = makeEmptyArray<string>();
// const fdasf = makeEmptyArray(); // default val -> returns unknown type

// Classes
// interface Song {
//   title: string;
//   creator: string;
// }
// interface Video {
//   title: string;
//   creator: string;
//   resolution: string;
// }
// // otherwise we would have to create 2 classes.
// class Playlist<T> {
//   public queue: T[] = [];

//   add(el: T) {
//     this.queue.push(el);
//   }
// }
