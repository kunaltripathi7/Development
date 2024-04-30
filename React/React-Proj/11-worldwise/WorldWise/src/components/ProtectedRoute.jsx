import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthenticationContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(
    function () {
      !isAuthenticated && navigate("/");
    },
    [navigate, isAuthenticated]
  ); // navigate not at top level
  return isAuthenticated ? children : null; // trying to render children even if user isn't authenticated.
}

export default ProtectedRoute;

// without authentication trying to access the diff pages of website -> protection of route -> make a compo and wrap it on our application so it basically performs a check before rendering anything.
