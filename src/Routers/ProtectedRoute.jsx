import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
