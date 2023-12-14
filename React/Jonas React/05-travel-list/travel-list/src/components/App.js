import { useState } from "react";
import Logo from "./Logo";
import PackingList from "./packingList";
import Form from "./Form";
import Stats from "./Stats";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Tele", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]); // Lifting up the state to be used by siblings to closest common parent.
  function handleItems(item) {
    setItems((items) => [...items, item]); // react -> immutability || state can't be mutated
  }

  // another case of lifting deleting the items in list compo but items state is in app compo
  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleCheck(id) {
    setItems((items) =>
      items.map((item) =>
        // how you return a new obj based on the prev obj -> immutability
        item.id !== id ? item : { ...item, packed: !item.packed }
      )
    );
  }

  function handleClear() {
    const confirmed = window.confirm(
      // web api
      "Are you sure you want to delete all items?"
    );
    confirmed && setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      {/* passing the fun. */}
      <Form onAddItems={handleItems} />
      <PackingList
        items={items}
        onDelete={handleDelete}
        onCheck={handleCheck}
        onClear={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}
