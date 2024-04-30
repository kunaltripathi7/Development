import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;
const DEFAULT_QUESTIONS = 10;

const initalState = {
  questions: [],
  // loading, error,ready, active, finished || eff way of storing curr state in one prprty instead of each
  status: "loading",
  index: 0,
  answer: new Array(DEFAULT_QUESTIONS).fill(null), // default values in js array are undefined
  points: 0,
  highscore: parseInt(localStorage.getItem("highScore"))
    ? localStorage.getItem("highScore")
    : 0,
  secondsRemaining: null,
  numQuestions: DEFAULT_QUESTIONS,
  difficulty: "easy",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      const total = state.numQuestions;
      const questions = action.payload.filter((question) => {
        if (total < 1) return false;
        if (
          (question.points === 10 && state.difficulty === "easy") ||
          (question.points === 20 && state.difficulty === "medium") ||
          (question.points === 30 && state.difficulty === "hard")
        )
          return true;
        else return false;
      });
      return { ...state, questions: questions, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "numQuestionChange":
      return { ...state, numQuestions: action.payload };
    case "difficultyChange":
      return { ...state, difficulty: action.payload };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }; // no constant rule
    // put logic related to next state calc in the reducer instead of the compo where event occurs
    case "newAnswer":
      const question = state.questions.at(state.index);
      // console.log(
      //   state.answer.map((ans, ind) =>
      //     state.index === ind ? action.payload : ans
      //   )
      // );
      return {
        ...state,
        answer: state.answer.map((ans, index) =>
          index === state.index ? action.payload : ans
        ),
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1 }; /// states are linked -> useReducer adv
    case "prevQuestion":
      return { ...state, index: state.index - 1 };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    case "finish":
      const orig = localStorage.getItem("highScore");
      orig?.localStorage.setItem(
        "highScore",
        state.highscore > orig ? state.highScore : orig
      );
      return {
        ...state,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
        status: "finished",
      };
    case "restart":
      return { ...initalState, questions: state.questions, status: "ready" }; // change status to ready
    default:
      throw new Error("Action unKnown");
  }
}

function QuizProvider({ children }) {
  const [
    {
      status,
      questions,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      numQuestions,
      difficulty,
    },
    dispatch,
  ] = useReducer(reducer, initalState);

  // const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => curr.points + prev, 0);

  useEffect(
    function () {
      if (questions.length > 0) return;
      fetch("http://localhost:8000/questions") //fake api creation using json-server npm
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch((err) => dispatch({ type: "dataFailed" }));
    },
    [questions.length, difficulty, dispatch]
  );
  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        difficulty,
        dispatch,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext used outside of scope");
  return context;
}

export { useQuiz, QuizProvider };
