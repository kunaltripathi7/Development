import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  //all the func's starts with use -> hooks
  // can't call anyhook under if(conditional stmts) or any other func. only extern. compo func.
  //something changes on compo -> new state
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);
  // const [test, setTest] = useState({ name: "fred" });

  function handlePrev() {
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
    /* this doesn't works -> cuz it executes at the same time & state is not updated in second call. 
    setStep((s) => s + 1);
    setStep((s) => s + 1); */
    // step = step+1; react doesn't know that its a state variable || react => immutability.
    // BAD Practice || React treats state as immutable
    // test.name = 'faf';
    // setTest({ name: "faf" });
  }

  // compo remembers state even if it's not rendered.

  return (
    <>
      {/* updating state based on current state -> callback func. */}
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {/* <div className={`steps ${!isOpen ? "hidden" : ""}`}>  other way conditional rendering -> don't render || not the js way hidden class*/}
      {isOpen && (
        <div className={`steps`}>
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>
          <p className="message">
            Step{step}: {messages[step - 1]}
            {/* {test.name} */}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              // onClick={() => alert("Prev")}
              onClick={handlePrev}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// IN js implementation => we have to update state and render the compo manually by dom manipulation.
