function StartScreen({ numQuestions, dispatch }) {
  // adv of useReducer (no more indi props)
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} Questions to test your react mastery</h3>
      <div className="dropdown-container">
        <div>
          <label className="dropdown-label">Number of Questions</label>
          <select
            className="dropdown-select"
            onChange={(e) =>
              dispatch({ type: "numQuestionChange", payload: e.target.value })
            }
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div>
          <label className="dropdown-label">Difficulty level</label>
          <select
            className="dropdown-select"
            onChange={(e) =>
              dispatch({ type: "difficultyChange", payload: e.target.value })
            }
          >
            <option value={"Easy"}>Easy</option>
            <option value={"Medium"}>Medium</option>
            <option value={"Hard"}>Hard</option>
          </select>
        </div>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
