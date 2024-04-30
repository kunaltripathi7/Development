import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

function Counter({ children }) {
  // on each rerender counter func. will be called and children will not get affected
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function Test() {
  // const [count, setCount] = useState(0);
  // return (
  //   <div>
  //     <h1>Slow counter?!?</h1>
  //     <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
  //     <SlowComponent />
  //     {/* slow compo rerenders even if its not dependent on state */}
  //   </div>
  // );

  return (
    <Counter>
      <SlowComponent />
      {/* slow compo is rendered/created before passed down as a children prop so its not affected by state update of count and not rerender || react in this jsx -> creates slow compo & sends it children prop, already passed as a prop -> so not affected by state */}
    </Counter>
  );
}
//React’s re-rendering process is based on changes to props or state. When the state of a parent component changes, by default, it re-renders itself and all its child components. However, if a child component is passed as a prop and is not dependent on the parent’s state, it doesn’t need to re-render every time the parent does.

//“This component is separate; it doesn’t need to update with every state change.” So, even though the JSX structure looks the same, the way React treats it is different. It’s like saying, “Here’s a component that I’ve already created; just place it here,” rather than, “Here’s a component that needs to be re-evaluated and potentially re-rendered every time there’s a change.”
