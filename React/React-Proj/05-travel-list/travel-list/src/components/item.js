export default function Item({ itemObj, onDelete, onCheck }) {
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => onCheck(itemObj.id)}
        // value is used to check checked is used to set.
        value={itemObj.packed}
      ></input>
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button onClick={() => onDelete(itemObj.id)}>❌</button>
    </li>
  );
}
