// needs to be called index.js cuz webpack expects it to be the entry point
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  // return <h1>Hello React</h1><Pizza/>; each compo can only return one ele (reconcilation realted reason)
  return (
    <div className="container">
      {/* don't nest functions || only nesting components each compo should be in diff funct.*/}
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

// observe everything as compo and create a hierarchy to avoid spaghetti code i.e it could work nesting all compo inside app but make it seperate.
// props => transfer data from parent compo to child compo

function Header() {
  return (
    <header className="header">
      <h1>Deco's Pizza Co.</h1>
    </header>
  );
}

// here we are using global styles like header styles can be applied to footer as well as they are available globally

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <Pizza />
      <Pizza />
      <Pizza />
    </main>
  );
}

function Pizza() {
  // const style = { fontSize: "48px" };
  return (
    // <main style={style}> inline style
    <div>
      <img src="pizzas/spinaci.jpg" alt="pizza img" />
      <h3>Pizza Spinaci</h3>
      <p>Tomato, mozarella, spinach, and ricotta cheese</p>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const open = 12,
    close = 22;
  const isOpen = hour <= close && hour >= open ? "Open" : "closed";
  console.log(isOpen);
  return (
    <footer className="footer">
      {new Date().toLocaleTimeString()} We are currently Open.
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> -> renders the component twice to find bugs.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// before react 18 - ReactDom.render(ele, root);
// all the assets get into public folder so that webpack automatically gets it from there.
