import React, { createContext, useState, useEffect } from "react";
import {
  saveToken,
  saveUser,
  getToken,
  getUser,
  checkAuthStatus,
} from "../utils/utils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedToken = getToken();
      const storedUser = getUser();

      if (storedToken) {
        // Verificar si la sesión sigue siendo válida
        const authStatus = await checkAuthStatus();
        if (authStatus.authenticated) {
          setToken(storedToken);
          setUser(storedUser);
        } else {
          // Si la sesión no es válida, limpiar todo
          removeToken();
        }
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToken = (newToken) => {
    saveToken(newToken);
    setToken(newToken);
  };

  const handleSaveUser = (newUser) => {
    saveUser(newUser);
    setUser(newUser);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        handleSaveToken,
        removeToken,
        handleSaveUser,
        token,
        isLoading,
        user,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };