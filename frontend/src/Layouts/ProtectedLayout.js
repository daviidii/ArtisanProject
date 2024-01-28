import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedLayout() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
