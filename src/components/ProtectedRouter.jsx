import { Navigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "../context/useCurrentUser.js";

export default function ProtectedRouter({ children }) {
  const { isLoggedIn, currentUser, currentUserLoading } = useCurrentUser();
  const location = useLocation();

  if (currentUserLoading) return null;

  if (!isLoggedIn || !currentUser) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
