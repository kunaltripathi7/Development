'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const contentTab = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault(); // for preventing it to scroll to top
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Sticky navigation: Intersection Observer API
const navHeight = nav.getBoundingClientRect();
const stickyNav = function(entries) {
  if (!entries[0].isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav , {
  root : null,
  threshhold : 0,
  // rootMargin : '-90px' won't work for responsive websites
  rootMargin : `-${navHeight.height}px`
});
headerObserver.observe(header);

///////////////////////////////////////
// Revealing Sections 
// const allSections = document.querySelectorAll('.section');
// const revealer = function(entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return; // *** property on entry not on entry.target
//   entry.target.classList.remove('section--hidden');
//   observer.unobserve(entry.target); // observer is just one obj providing all the meths entry tells from which ele its been occured & u perform func's on that
// }
// const sectionObserver = new IntersectionObserver(revealer, {
//   root : null,
//   threshold : 0.15
// });
// allSections.forEach(function(sec) {
//   sectionObserver.observe(sec);
//   sec.classList.add('section--hidden');
// });
//In simple terms, you're hiring a watchman (Intersection Observer), giving him a task (Callback), and specifying the details of what you want to know (Options). And when he reports back to you, he just reminds you that he's the one reporting (by including the observer object).

///////////////////////////////////////
// Lazy Loading Images - Improves performance
// add data-src files to html and change the src using IntersectionObserver
const lazyImgs = document.querySelectorAll('img[data-src]');
const lazyLoader = function(entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  // not adding classlist directly cuz in slow connections it will instantly remove blur and our img would not have been loaded yet
  entry.target.addEventListener('load', entry => entry.target.classList.remove('lazy-img'));
  observer.unobserve(entry.target);
} 
const imgObserver = new IntersectionObserver(lazyLoader, {
  root : null,
  rootMargin : '200px',
  threshold : 0
});

lazyImgs.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider
// Elements can exist beyond the view port just you can't see them || overflow is hidden 
const slider = function() {
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currSlide=0, maxSlide = slides.length; // node list also have length property

// never traverse over all elements using children property always select all the ele using dq and then traverse

const goToSlide = function (slideNo) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100*(i-slideNo)}%)`));  // **** translate is inside template literal
};

goToSlide(0);

// const slider = document.querySelector('.slider');
// slider.style.overflow = `visible`;
const nextSlide = function () {
  currSlide = currSlide === maxSlide-1? 0 : ++currSlide;
  goToSlide(currSlide);
  activateDot(currSlide);
};

const prevSlide = function () {
  currSlide = currSlide === 0 ? maxSlide-1 : --currSlide;
  goToSlide(currSlide);
  activateDot(currSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

//slides or component is not increasing its just those 3 slides r further shifting
// Framework -> Try every motion & fix the starting condition.
const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(`beforeend`,
    `<button class="dots__dot" data-slide="${i}"></button>`
    );
  }); // use this type if you just need counter instead of traditional for
}
createDots();

// Rule : Don't traverse on children
const activateDot = function(dotNo) {
  dotContainer.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active')); // ** always remove the class from every ele before adding it to a new one. 
  dotContainer.querySelector(`.dots__dot[data-slide="${dotNo}"]`).classList.add('dots__dot--active'); // ** Syntax: data-slide="";
};
activateDot(0);

dotContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});// keypress is deprecated || use keydown & keyup 
}
slider(); 
// Its a good practice to enclose the whole component in a func. so thereby we can pass a certain obj & use it.

// Scrolling
///////////////////////////////////////

// boundingClientRect is relative to the window you r currently viewing
// the offset y -> top edge of browser to the top of webpage distance and x is left edge of browser to left webpage distance.

btnScrollTo.addEventListener('click', function (e) { // here e is the event object on which various methods are available
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect()); // e.target returns the element on which event was called

  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);  deprecated it returns the scrolled position from the top & left of the webpage

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset); // why it gets top position relative to curr viewport but window.scrollTo scrolls with respect to the topmost edge of web page in total || to fix this distance from top + scrolled position
  // window.scrollTo({
  //   left :s1coords.left + window.pageXOffset, 
  //   top :s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

  btnsOpenModal.forEach((a)=> a.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// page Navigation 

// common technique-> using id's for scrolling to sections & using them as href in html ele's
// event delegation is useful in handling events that are generated by ele no yet present on the page

//Inefficient way
// document.querySelectorAll('.nav__link').forEach(btn => btn.addEventListener('click', function(e) {
//   e.preventDefault(); // (IMP) default behaviour has higher priority 
//   const id = this.getAttribute('href');
//   document.querySelector(id).scrollIntoView({behavior : 'smooth'});
// }));

// delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', 
function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) { // *** cuz click happening in parent elements will result in error otherwise.
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component
// Hover effect optimised

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  // handling the click occured outside buttons but inside container
  if(!clicked) return;
  tabs.forEach(btn => btn.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  contentTab.forEach( tab => tab.classList.remove('operations__content--active'));

  //***  Distinction -> classList mein without dot class specify & qSelector mein with dot
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});


///////////////////////////////////////
// Nav hover Effect
// refactoring

const handleHover = function (e) {
  if (!e.target.classList.contains('nav__link')) return;
  // ***** if more navs would be in this page so to make code robust don't directly select nav instead find the closest
  const link = e.target.closest('nav'); 
  const siblings = link.querySelectorAll('.nav__link');
  const logo = link.querySelector('img');
  siblings.forEach(ele => {
    if (ele != e.target) ele.style.opacity = this;
  });
  logo.style.opacity = this;
};
// mouseenter event does not bubble
// nav.addEventListener('mouseover', function(e) {
//   fader(e, 0.5);
// } ); // js expects a func in 2nd parameter
// nav.addEventListener('mouseout', function(e) {
//   fader(e, 1);
// } ); 
nav.addEventListener('mouseover', handleHover.bind(0.5)); // if we wanna pass multiple arg point this to an array etc
nav.addEventListener('mouseout', handleHover.bind(1));

// // Events dealing (Framework)
// 1. check if it has some child ele's so use closest
// 2. handle if user clicks outside the child ele's.



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

///////////////////////////////////////
// Selecting, Creating, and Deleting Elements

// // document is the main object of dom entry point to dom

// console.log(document.documentElement); // document is not real element || documentElement contains all html
// // Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections); // returns a nodelist

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons); // return a html collection (live changes reflect) while nodelist doesn't gets updated

// console.log(document.getElementsByClassName('btn')); // returns collection

// // Creating and inserting elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookied for improved functionality and analytics.'; // both can be used
// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // header.prepend(message); // dom element is unique and can exist at one place at a time.
// header.append(message);
// // header.append(message.cloneNode(true));  // if we want copies of same element

// // header.before(message); 
// // header.after(message);

// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message); // old way of doing it
//   });

// ///////////////////////////////////////
// // Styles, Attributes and Classes
  
// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%'; // styles applied using dom work as inline styles.

// console.log(message.style.color); // can't access any property out of inline style basically only the properties that you set you can see
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color); // way to get all the styles
// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
//   //In JavaScript, functions do not enforce a specific number of arguments, and extra arguments are simply ignored. parseFloat doesn't accept radix parameter

// document.documentElement.style.setProperty('--color-primary', 'orangered'); // css variables (already defined) || set property can be used to set everything color, bkground etc. using style.color = 'xyz'

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// // Non-standard Properties
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist'); // new attri add

// console.log(logo.src); // absolute link
// console.log(logo.getAttribute('src')); // relative link || use getAttribute for links of relative url

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber); // convert to camelCase(property name) || all the dataset attri are stored in dataset
// //  The dataset property is especially useful for embedding custom data within the markup and then accessing or modifying it with JavaScript without needing to make AJAX requests or look elsewhere for that data. Dataset is a property of DOM element in the javascript environment

// // Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // not includes

// // Don't use
// logo.className = 'jonas'; // It overwrites existing classes

///////////////////////////////////////
// Types of Events and Event Handlers 
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) { // old school
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// h1.addEventListener('mouseenter', alertH1); // adtg -> mutliple events, remove the evnt hndlr 

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); // need to export the func to pass it

// // h1.onmouseenter = function (e) {
// //   alert('onmouseenter: Great! You are reading the heading :D');
// // };


///////////////////////////////////////
// // Event Propagation in Practice
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget); // e.target is where the event originated all three have same event obj
//   console.log(e.currentTarget === this); // points to the element on which the event handler is attached

//   // Stop propagation
//   // e.stopPropagation(); // not preferred
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });
// // }, true); need to pass 3rd parameter for listening to events while capturing phase.

///////////////////////////////////////
// // DOM Traversing
// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight')); // searches for all childs and collects relevant
// console.log(h1.childNodes); //returns nodelist every type of node
// console.log(h1.children); // returns HTMLCollection of only elements
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered'; 

// // Going upwards: parents
// console.log(h1.parentNode); // direct parent || This can return any node type. For instance, if the parent node of the current node is a comment, parentNode would return that comment node.
// console.log(h1.parentElement);


// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // *****

// h1.closest('h1').style.background = 'var(--gradient-primary)';   

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling); // for nodes
// console.log(h1.nextSibling);
// // since we can't access all siblings so trick |
// console.log(h1.parentElement.children); // returns collection which is iterable
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

///////////////////////////////////////
// sticky
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function() {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
//   console.log(window.scrollY);
// }); // inefficient cuz scroll event bombards each time we scroll


///////////////////////////////////////
// Sticky navigation: Intersection Observer API
// new is used for creating an instance of the obj (its a func which we call which is also an obj)

// const obsCallback = function (entries, observer) { // will be called each time target ele will intersect with root ele at threshold || entries are array of threshold entries (not threshold values)
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, // root element will be the ele which we want out target ele to intersect || null means the viewport
//   // threshold: [0, 0.2], 
//   // threshold : 0.1 // percentage at which obsCallback will be called, this means that whenever the element's 10% of area comes in the viewport it will trigger whether from down or up & similarly the isIntersectingProperty determines whether u r going up or down (true: The target element is intersecting with the root (at least partially).)
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// ***** think from both way scrolls

///////////////////////////////////////
// Lifecycle DOM Events (fired when html and js is loaded, doesn't wait for imgs)
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
}); // connect script tag at the end of html & we don't need to look for the event Dom tree loaded

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
}); // when all of the imgs, css & external files are loaded

window.addEventListener('beforeunload', function (e) { // fired just before the user is leaving the page || used for the confirmation
  e.preventDefault(); // required in some browsers not in chrome
  console.log(e);
  e.returnValue = ''; // its default can't customise the msg
});

