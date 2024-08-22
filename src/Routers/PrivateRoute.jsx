import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
