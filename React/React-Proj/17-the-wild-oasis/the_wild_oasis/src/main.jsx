import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import GlobalStyles from "./styles/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyles />
    <React.StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")} // can't access react router here, replace means current page will not be saved in history. replaces the url
      >
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  </>
);

// useEffect & other async errors are not caught -> They are handled by useQuery
