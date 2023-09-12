'use strict';

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// const renderCountry = function (data, className = '') {
//   const language = Object.values(data.languages);
//   const currency = Object.values(data.currencies)[0].name;
//   const html = `
//   <article class="country ${className}">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${language}</p>
//       <p class="country__row"><span>💰</span>${currency}</p>
//     </div>
//   </article>`;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   //   countriesContainer.style.opacity = 1; moved to finally all common will move
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   //   countriesContainer.style.opacity = 1;
// };

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

///////////////////////////////////////
///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest
// cors -> cross origin resource sharing (yes/unknown) // CORS is a mechanism that allows many resources (like fonts, JavaScript, etc.) on a web page to be requested from another **domain outside the domain from which the resource originated.

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   // data = request.send(); can't do this cuz result is not there yet

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText); //destrucring
//     console.log(data);
//     const language = Object.values(data.languages);
//     const currency = Object.values(data.currencies)[0].name;
//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${language}</p>
//       <p class="country__row"><span>💰</span>${currency}</p>
//     </div>
//   </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal'); // multiple ajax requests parallely so can't determine the order
// getCountryData('usa');
// getCountryData('germany');

//////////////////////////////////////
// Welcome to Callback Hell

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText); //destrucring
//     // console.log(data);
//     renderCountry(data);
//     const [neighbour] = data.borders;
//     // console.log(neighbour);
//     if (!neighbour) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('Portugal');

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
//code that is hard to understand will lead to more bugs :)

///////////////////////////////////////
// Consuming Promises
// Chaining Promises
// Handling Rejected Promises
// Throwing Errors Manually

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       // promise is an obj of promise class -> calling the then method of that class
//       console.log(response); // response is the http response
//       return response.json(); // json is a meth on the response obj, its also an async operation so it will return a promise so we will return it and call then method again
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) // if true the control goes to the catch block directly
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => { // then method always returns a promise, if you return 20 from a promise then it will get fulfilled value in the next then meth. || meaning then will always return a promise and whatever u will return can be accessed in next then methods argument.
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'dfsdfdef';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/name/${neighbour}`); // return & chain in next not inside cuz thats what we r trying to avoid c hell.
//     })
//     .then(response => { //same code as above helper func.
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData('portugal');
// rejected promise can also be dealt in the second callback func passed in then();

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data);
//       const [neighbour] = data[0].borders;
//       console.log(neighbour);
//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       // usecase hiding loading icon
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('australia');

// fetch promise gets fulfilled in 404 not found error.
// Takeaway -> when needed to display an error from a promise throw an error and render it in catch block.

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=590152560658951715051x1272`
//   )
//     .then(response => response.json())
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       getCountryData(data.country); // use fetch but you get the point
//     })
//     .catch(err => {
//       console.log(err.msg);
//       renderError(err);
//     });
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

///////////////////////////////////////
// // The Event Loop in Practice
// //cuz of microtask q
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });

// console.log('Test end');

///////////////////////////////////////
// Building a Simple Promise
// executor func.
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });
// seq -> promise cons. calls the provided func and passes the resolve & reject func's in. then both resolve and reject does the work when they are called.

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout (callbacks -> promises) || make func which will return promise then use then chaining
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promise.resolve('abc').then(x => console.log(x)); // resolve is a static meth
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

///////////////////////////////////////
// Promisifying the Geolocation API
// navigator.geolocation.getCurrentPosition (position => console.log(position), err => console.log(err));// async behaviour does its task in bg,  // 2 callbacks, resolve, reject | promisify > callback -> promise

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// // getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords; //*** how to take vars from obj

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`));
// };

// btn.addEventListener('click', whereAmI);

// setting the src path is an async operation
///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const divE = document.querySelector('.images');
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const newImg = document.createElement('img'); //createElement(tagName)
//     newImg.src = imgPath;
//     newImg.addEventListener('load', function () {
//         divE.append(newImg);
//         resolve(newImg);
//       });
//       newImg.addEventListener('error', function() {
//           reject('Check the path');
//       })
//   });
// };

// let imgG;
// createImage('img/img-1.jpg')
//   .then(img => {
//     imgG = img;
//     return wait(2); // takeaway -> everytime encountering promise return & handle in next then
//   })
//   .then(() => {
//     imgG.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     imgG = img;
//     return wait(2);
//   })
//   .then(() => (imgG.style.display = 'none'))
//   .catch(err => console.error(err));

///////////////////////////////////////
// Consuming Promises with Async/Await | for avoiding the long chain of then cuz we need to return promise in that one if we call another thing which returns a promise
// async await under the hood uses promises then & stuff
// Error Handling With try...catch

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res))

// const whereAmI = async function () {
//   //keeps running in bg | automatically returns promise | all about consuming promises
//   try {
//     // Geolocation
//     const pos = await getPosition(); // incase of rejected promise error will get caught immediately
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error('Problem getting location data');

//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);

//     // Country data
//     const res = await fetch(
//       `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
//     );

//     // BUG in video:
//     // if (!resGeo.ok) throw new Error('Problem getting country');

//     // FIX:
//     if (!res.ok) throw new Error('Problem getting country');

//     const data = await res.json();
//     console.log(data);
//     renderCountry(data[0]);
//   } catch (err) {
//     console.error(`${err} 💥`);
//     renderError(`💥 ${err.message}`);
//   }
// };
// //always handle errors in async functions
// whereAmI();
// whereAmI();
// whereAmI();
// console.log('FIRST');
// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

// functions in js if not encounter return stmt returns undefined by default
///////////////////////////////////////
// Returning Values from Async Functions
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await resGeo.json();

//     // Country data
//     const res = await fetch(
//       `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
//     );
//     if (!resGeo.ok) throw new Error('Problem getting country');
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(`${err} 💥`);
//     renderError(`💥 ${err.message}`);

//     // Reject promise returned from async function
//     throw err;
//     // || if err occ then also then executed but city is undefined | promise is still fulfilled
//   }
// };

// console.log('1: Will get location');
// const city = whereAmI(); // returning a string from the above async function'
// console.log(city); // returns a promise in pending state  | the value that is returned becomes the fulfilled value of the promise || You call the whereAmI function, and it returns a promise immediately. The rest of the code inside it will be executed asynchronously. similar to any promise

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

// conversin to async/await
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message} 💥`);
//   }
//   console.log('3: Finished getting location');
// })();

// // Rule : always use try catch block with an async function

///////////////////////////////////////
// Running Promises in Parallel // request 2 waits for 1st which costs extra time
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(
//     //   `https://restcountries.eu/rest/v2/name/${c1}`
//     // );
//     // const [data2] = await getJSON(
//     //   `https://restcountries.eu/rest/v2/name/${c2}`
//     // );
//     // const [data3] = await getJSON(
//     //   `https://restcountries.eu/rest/v2/name/${c3}`
//     // );
//     // console.log([data1.capital, data2.capital, data3.capital]);

//     const data = await Promise.all([ // static method on promise, / returns a new promise which runs all promises at same time, returns an array containing returned data from each promise, if one promise rejects whole promise rejects
//       getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
//     ]);
//     console.log(data.map(d => d[0].capital)); // see what's required then loop map
//   } catch (err) {
//     console.error(err);
//   }
// };
// get3Countries('portugal', 'canada', 'tanzania');
// // always handle independent promises concurrently cuz it saves time

///////////////////////////////////////
// Other Promise Combinators: race, allSettled and any
// Promise.race
// first promise resolved wins the race, fulfillment of the winning promise will be result, only get one result, same for rejection if one rejects immediately ends
//use case -> for preventing never ending promises/ long running promises
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/italy`),
//     getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
//     getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

// const timeout = function (sec) { // basically a promise
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000); //****
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
//   timeout(5),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// // Promise.allSettled (al;ways fulfilled)|| diff to promise.all is that it never short circuits always returns the result of all promises., also includes rejected, don't need catch block.
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// // Promise.any [ES2021] returns first fulfilled promise , diff to promise.race is it ignores rejected promises, if all promises gets rejected then it gives an aggregate error(mulitple erros at once) which we need to catch
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

//////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const divE = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement('img'); //createElement(tagName)
    newImg.src = imgPath;
    newImg.addEventListener('load', function () {
      divE.append(newImg);
      resolve(newImg);
    });
    newImg.addEventListener('error', function () {
      reject('Check the path');
    });
  });
};

// let imgG;
// createImage('img/img-1.jpg')
//   .then(img => {
//     imgG = img;
//     return wait(2); // takeaway -> everytime encountering promise return & handle in next then
//   })
//   .then(() => {
//     imgG.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     imgG = img;
//     return wait(2);
//   })
//   .then(() => (imgG.style.display = 'none'))
//   .catch(err => console.error(err));

// const loadNPause = async function () {
//   try {
//     // Load image 1
//     let img = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     // Load image 2
//     img = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadNPause();
// catch also works without any parameters

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img)); // we can't control a func,  immediately returns a promise \ removing await here also works fine cuz promises will be first resolve in promise.all
    // **** imp thing is the inside await only awaits the inside callback function which is new every time, its better actually cuz one img need not to wait for another one
    console.log(imgs);
    const imgsEl = await Promise.all(imgs); // await's work ->> without await the below cl will simply print the promise in pending state and then fulfilled, whereas after await it returns the fulfilled value to the var imgsEl and only after then starts executing next;
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.err(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
//So, in essence, the await inside the .map() simply ensures that each promise in the resulting array (the one assigned to imgs) will eventually resolve to the result of the corresponding call to createImage(img). But the loadAll function doesn't pause for these promises to resolve until the Promise.all(imgs) line.
