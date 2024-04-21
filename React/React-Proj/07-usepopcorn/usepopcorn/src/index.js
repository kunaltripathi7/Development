import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App-V2";
import StarRating from "./StarRating";

// if user wants to display some content based on state -> external state functionality provide
function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <>
      {/* pass func. to update external state */}
      <StarRating color="blue" setextRating={setMovieRating} />
      <p> This movie was {movieRating} stars</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {
      <App />
      // <>
      //   <StarRating
      //     maxRating={5}
      //     messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      //     defaultRating={3}
      //   />
      //   <Test />
      // </>
    }
  </React.StrictMode>
);
