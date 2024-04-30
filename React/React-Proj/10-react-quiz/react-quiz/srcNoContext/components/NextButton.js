function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer.at(index) === null) return;
  if (index < numQuestions - 1) {
    // write logic that runs on only correct conditions || index !== numQuestions-1
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );
  }
  if (index === numQuestions - 1) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </div>
    );
  }
}

export default NextButton;
