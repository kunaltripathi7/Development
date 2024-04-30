import { useQuiz } from "../contexts/QuizContext";

function Options() {
  // seperated the logic from Question component to make that look cleaner
  const { dispatch, answer, index, questions } = useQuiz();
  const isAnswered = answer.at(index) !== null;
  const question = questions[index];
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
