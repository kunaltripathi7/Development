import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { numQuestions, index, points, maxPoints } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(index !== null)} />
      {/* progress ele -> value logic as it loads index =1 -> index+1 || as it was displaying after selecting the answer cuz the index is intialised async*/}
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
