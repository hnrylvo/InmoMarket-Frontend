import React, { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/check`, {
        withCredentials: true
      });

      setUser(response.data.user);
      setIsLoading(false);
    } catch (error) {
      setUser(null);
      setIsLoading(false);
    }
  };

  const removeToken = async () => {
    try {
      await axios.get(`${API_BASE_URL}/auth/logout`, {
        withCredentials: true
      });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    }
  };

  const handleSaveToken = () => {};
  const handleSaveUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        handleSaveToken,
        removeToken,
        handleSaveUser,
        isLoading,
        user,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };