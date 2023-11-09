import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const storeToken = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("accessToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  const removeToken = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ storeToken, getToken, removeToken, isAuthenticated, setIsAuthenticated, setUserEmail, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};