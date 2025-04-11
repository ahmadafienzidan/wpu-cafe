import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAuthStore();
  const location = useLocation();
  const currentPath = location.pathname;

  if (!token && currentPath !== "/login") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (token && currentPath === "/login") {
    return <Navigate to="/dashboard/create" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
