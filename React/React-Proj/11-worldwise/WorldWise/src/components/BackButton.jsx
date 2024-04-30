import Button from "./Button";
import { useNavigate } from "react-router-dom";

// as i see any code repeating simply make another reusable component

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault(); // any button in form compo submits it by placing e.preventDefault() we made this btn to not submit the form.
        navigate(-1); // go back once
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
