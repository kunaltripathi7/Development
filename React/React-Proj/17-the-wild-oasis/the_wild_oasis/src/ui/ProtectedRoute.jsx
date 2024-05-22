import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  text-align: center;
`;

//navigate function is called inside a useEffect/callback not on top level.

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1.load the authenticated user
  const { isAuthenticated, isLoading } = useUser();
  // 2. if there is no authenticated user redirect to /login.
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  // 3. while loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 4. if there is a user render the app.
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
