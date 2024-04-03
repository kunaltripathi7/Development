export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start Adding items</em>
      </p>
    );

  // derived state
  const nums = items.length;
  const percentage =
    (items.reduce((acc, curr) => (curr.packed ? acc + 1 : acc), 0) / nums) *
    100;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `All Set Lets Go!`
          : `👜 You have ${nums} items in your list and you have packed (${percentage}
        %`}
      </em>
    </footer>
  );
}
