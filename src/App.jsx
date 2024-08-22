import { useContext } from 'react';
import { Container } from "@mui/material";
import PublicNavBar from "./components/navBar/Clients/NavBar";
import PrivateNavBar from "./components/navBar/Client/NavBar";
import AdminNavBar from "./components/navBar/Admin/NavBar";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Login from "./pages/Clients/Login";
import Register from "./pages/Clients/Register";
import ResetPassword from "./pages/Clients/ResetPassword";
import UpdatePassword from "./pages/Clients/UpdatePassword";
import ServerError from "./pages/Errors/ServerError";
import NotFound from "./pages/Errors/NotFound";
import AdminRoute from "./Routers/AdminRoute";
import ClientRoute from "./Routers/ClientRoute";
import Unauthorized from "./pages/Errors/Unauthorized"; 
import Catalogue from "./pages/Clients/Catalogue";
import { useAuth } from './AuthContext';
import ChancePassword from './pages/Clients/ChancePassword';
import ProtectedRoute from './Routers/ProtectedRoute';

export default function App() {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  const renderNavBar = () => {
    // Ocultar NavBar si la ruta actual es "/login", "/register", "/resetPassword", "/updatePassword" o "/changePassword"
    if (
      location.pathname === '/login' || 
      location.pathname === '/register' || 
      location.pathname === '/resetPassword' || 
      location.pathname === '/updatePassword' || 
      location.pathname === '/changePassword'
    ) {
      return null;
    }
  
    // Mostrar NavBar basado en la autenticación y rol de usuario
    if (isAuthenticated) {
      if (userRole === 'Admins') {
        return <AdminNavBar />;
      } else if (userRole === 'Clients') {
        return <PrivateNavBar />;
      }
    }
    return <PublicNavBar />;
  };

  return (
    <>
      {renderNavBar()}
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
          <Route path="/changePassword" element={<ChancePassword />} />

          {/* Rutas protegidas para administradores */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute roles={['Admins']}>
                <AdminRoute />
              </ProtectedRoute>
            }
          />

          {/* Rutas protegidas para clientes */}
          <Route
            path="/client/*"
            element={
              <ProtectedRoute roles={['Clients']}>
                <ClientRoute />
              </ProtectedRoute>
            }
          />

          <Route path="/500" element={<ServerError />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}
