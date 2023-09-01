import './index.css';
// import {StrictMode} from 'react';
// import App from './App';


// automatically installs babel and web pack
// const React = require('react'); // module for writing html elements & adding elements
// var ReactDom = require("react-Dom");

import {createRoot} from 'react-dom/client';
import React from "react"; // imports createRoot method from the pkg || used for displaying content
import ReactDOM from "react-dom"; // imports createRoot method from the pkg || used for displaying content
const rootElement =  document.getElementById('root');
const root = createRoot(rootElement); // 2nd arg is optional options object

// kya, kha
// ReactDOM.render(<div>
//                 <h1>Hello World</h1>
//                 <h2>Le thapa technical</h2>
//                 </div>, 
// use <React.Fragment> instead of div faster and memory better
// usse bhi accha <></> inside react fragment hi ho rha haiu

// {} for expression inside jsx || only expressions not statements or code || template literals are also possible
// ReactDOM.render([ // its possible for render() to return an array of ele's
//                 <h1>Hello World</h1>,
//                 <h2>Le thapa technical</h2>,
//                 <ol>
//                   <li>Coffee</li>
//                   <li>Tea</li>
//                   <li>Milk</li>
//                 </ol>
//                 ], 
// document.getElementById("root")); // it replaces the content // It is not html its jsx what is written inside
// why importing react module cuz to use jsx


// the js way
// const h1 = document.createElement("h1");
// h1.innerHTML = "dunno??"; //*** its innerHTML
// document.getElementById("root").appendChild(h1);

////////////////////////////////////////////////////////
// const today = new Date();
// const formattedDate = today.toLocaleDateString('en-us');
// const formattedTime = today.toLocaleTimeString('en-us');
// // the attri are called property here
// ReactDOM.render(<> 
//                 <h1 contentEditable = 'true'>Edit this</h1>
//                 <p>{`${formattedDate} ${formattedTime}`}</p>
//                 </>
// ,document.getElementById("root"));

/////
// class is a keyword in react so jsx uses className as property
// root.render(<h1 className='heading'>Is this working?</h1>);

///////////////////////////////////////// Inline-css
// kebab-case to camelCase {{}} like that so you can make an external obj and pass it


// React challenge
// const 
const today = new Date();
let currentHour= today.getHours();
let greet;
  if (currentHour>=1 && currentHour<=11) greet =  "Morning";
  else if (currentHour>=12 && currentHour<=17) greet =  "Afternoon";
  else greet =  "Night";
let color;
if (greet === "Morning") color = "white";
else if (greet === "Afternoon") color =  "black";
else color = "orangered";

const boxStyling = {
  display : "flex",
  justifyContent : "center",
  backgroundColor : "green",
  alignItems : "center"
}
root.render(<>
            <span></>
            </>)
root.render(<>
  <div>
  <h1>Hello Sir, <span style= {boxStyling}>Good {greet}</span></h1>
  </div>          
  </>
  );
  // style = {boxStyling}






