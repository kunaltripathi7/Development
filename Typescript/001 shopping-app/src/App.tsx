import React, { useState } from "react";
import ShoppingList from "./components/ShoppingList";
import ShoppingListForm from "./components/ShoppingListForm";
import Item from "./models/item";
import { v4 as getId } from "uuid";
import "./App.css";

function App() {
  const [items, setItems] = useState<Item[]>([]); // default type - never -> type that should never occur
  const addItem = (product: string, quantity: number) => {
    console.log("MADE TO THE APP COMPONENT!");
    setItems([...items, { id: getId(), product, quantity }]);
  };
  return (
    <div>
      <ShoppingList items={items} />
      <ShoppingListForm onAddItem={addItem} />
    </div>
  );
}

export default App;

// utility types are types provided by typescript such as partial where all types are optional. -> React.FC same functionality.... just more explicit about the return type and more verbose
