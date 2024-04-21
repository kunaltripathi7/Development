function PreviousButton({ dispatch, index }) {
  // create the compo -> handle all possiblities/values of props that could come in compo
  if (index === 0) return;
  return (
    <div className="dropdown-label">
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "prevQuestion" })}
      >
        Prev
      </button>
    </div>
  );
}

export default PreviousButton;
