import { useState } from "react";
import Item from "./item.js";
export default function PackingList({ items, onDelete, onCheck, onClear }) {
  const [sortBy, setSortBy] = useState("input");
  // derived state => new state is not needed as to remember the input order
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => +a.packed - +b.packed);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            itemObj={item}
            key={item.id}
            onDelete={onDelete}
            onCheck={onCheck}
          />
        ))}
      </ul>
      {/* Value attri is the id for option */}
      <div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed</option>
        </select>
        <button onClick={onClear}>Clear List</button>
      </div>
    </div>
  );
}
