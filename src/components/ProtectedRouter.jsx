// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../context/useCurrentUser";

export default function ProtectedRouter({
  to = "/",
  replace = true,
  children,
}) {
  const { isLoggedIn } = useCurrentUser();

  if (!isLoggedIn) {
    return <Navigate to={to} replace={replace} />;
  }

  return children ?? <Outlet />;
}
