import React, { useRef } from "react";

interface ShoppingListFormProps {
  onAddItem: (item: string, quantity: number) => void;
}

function ShoppingListForm({ onAddItem }: ShoppingListFormProps): JSX.Element {
  const productInputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null); // provide null initially cuz the very first time the func. runs jsx doesn't exist in dom.
  const handleSubmit = (e: React.FormEvent) => {
    // specify type in all parameters you recieve to get autocomplete & type safety
    e.preventDefault();
    const newProduct = productInputRef.current!.value;
    const quantity = parseInt(quantityInputRef.current!.value);
    onAddItem(newProduct, quantity);
    productInputRef.current!.value = "";
    quantityInputRef.current!.value = "1";
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Product Name" ref={productInputRef} />
      <input type="number" min={0} ref={quantityInputRef} />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default ShoppingListForm;
