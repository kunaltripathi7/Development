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
  // react knows how to render jsx compo in arrays.

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {/* semantic jsx */}
      {/*rendering lists Key is a prop of react needed for performance 
      only render when the list has some pizzas & pizza.length > 0 cuz otherwise it renders 0*/}
      {/* IN JSX CAN WRITE ONLY THOSE STATEMENTS WHICH PRODUCES A VALUE. (iF/ELSE DOESN'T PRODUCES) */}
      {pizzaData.length > 0 && (
        // cuz we don't wanna render it when there are no pizzas (React fragment to avoid any div or root container. may contain a key) || overall if you don't wanna use a div
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      )}
      {/* </> */}
      {/* <Pizza
      photoName="pizzas/spinaci.jpg"
      name="Pizza Spinaci"
      ingredients="Tomato, mozarella, spinach, and ricotta cheese"
      price={10} // can even pass react compo like this
    /> */}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  // const style = { fontSize: "48px" };
  // if (!props.pizzaObj.soldOut) return null;
  return (
    // <main style={style}> inline style
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt="pizza img" />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

// all compo have props by default
function Footer() {
  const hour = new Date().getHours();
  const open = 12,
    close = 22;
  const isOpen = hour <= close && hour >= open ? "Open" : "closed";
  // console.log(isOpen); when jsx becomes messy in a compo extract it to sub compo.
  return (
    <footer className="footer">
      {/* Component closes slash afterwards while tags at first */}
      {isOpen && <Order close={close} open={open} />}
    </footer>
  );
}

// destructuring
function Order({ close, open }) {
  return (
    <div className="order">
      {/* js mode inside js mode  || conditional rendering*/}
      <p>
        We are Open from {open}:00 until {close}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order</button>
    </div>
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
