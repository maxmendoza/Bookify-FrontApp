import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const url = 'https://y3b8muy0l2.execute-api.us-east-1.amazonaws.com/Prod/';

  const getUserRole = (accessToken) => {
    try {
      const decodedToken = jwtDecode(accessToken);
      return decodedToken['cognito:groups']?.[0] || '';
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return '';
    }
  };

  const getUserEmail = (accessToken) => {
    try {
      const decodedToken = jwtDecode(accessToken);
      return decodedToken.email || '';
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return '';
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${url}login`, { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('id_token', data.id_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('role', data.role);
        setIsAuthenticated(true);
        setUserRole(getUserRole(data.access_token));
        return data;
      } else {
        console.error('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data?.error_message || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUserRole('');
    navigate('/login');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setIsAuthenticated(true);
      setUserRole(getUserRole(accessToken));
      setUserEmail(getUserEmail(accessToken));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAuth() {
  return useContext(AuthContext);
}
