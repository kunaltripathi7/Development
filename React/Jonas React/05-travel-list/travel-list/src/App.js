import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Tele", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]); // Lifting up the state to be used by siblings to closest common parent.
  function handleItems(item) {
    setItems((items) => [...items, item]); // react -> immutability || state can't be mutated
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      {/* passing the fun. */}
      <Form onAddItems={handleItems} />
      <PackingList items={items} onDelete={handleDelete} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏡 Far Away 🥗</h1>;
}

function Form({ onAddItems }) {
  // forms store the state inside the dom not ideal for react -> controlled ele's
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    // Date avilable on window obj.
    const item = { description, quantity, package: false, id: Date.now() };
    onAddItems(item);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {/* creates empty array takes a map fn as 2nd arg || cuz we don't use for loop, can't use for loop cuz jsx supports expr not stmts.*/}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* on change event state changes -> form compo rerenders */}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      {/* any btn w/o type attri default = submit  // listening for onclick will not work when hitting enter.*/}
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item itemObj={item} key={item.id} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

function Item({ itemObj, onDelete }) {
  return (
    <li>
      <span>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button onClick={() => onDelete(itemObj.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>👜 You have X items in your list and you have packed (%)</em>
    </footer>
  );
}
