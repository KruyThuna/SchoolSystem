// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ allowedRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== allowedRole) return <Navigate to="/" replace />;
  return <Outlet />; // ← not {children}
}
