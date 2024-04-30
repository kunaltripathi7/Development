import Options from "./Options";
function Question({ dispatch, question, answer, index }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        index={index}
      />
    </div>
  );
}

export default Question;
