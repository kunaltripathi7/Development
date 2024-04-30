function Options({ question, dispatch, answer, index }) {
  // seperated the logic from Question component to make that look cleaner
  const isAnswered = answer.at(index) !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            answer.at(index) === index ? "answer" : ""
          }
          ${
            isAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={isAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
