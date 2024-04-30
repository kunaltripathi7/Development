import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import "./store"; // it will just run the code written in top level of store
import store from "./store"; // it will just run the code written in top level of store
import { Provider } from "react-redux"; // compo to connect react & redux

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
