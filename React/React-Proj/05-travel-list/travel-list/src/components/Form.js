import { useState } from "react";

export default function Form({ onAddItems }) {
  // forms store the state inside the dom not ideal for react -> controlled ele's
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    // Date available on window obj.
    const item = { description, quantity, packed: false, id: Date.now() };
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
