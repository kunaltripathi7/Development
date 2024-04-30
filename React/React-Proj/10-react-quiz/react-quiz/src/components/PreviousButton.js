import { useQuiz } from "../contexts/QuizContext";

function PreviousButton() {
  // create the compo -> handle all possiblities/values of props that could come in compo

  const { dispatch, index } = useQuiz();
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
