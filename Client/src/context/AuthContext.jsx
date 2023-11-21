import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const storeToken = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("accessToken", token);
  };

  const getToken = (tokenName) => {
    return localStorage.getItem(tokenName);
  };

  const removeToken = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{
      storeToken,
      getToken,
      removeToken,
      isAuthenticated,
      setIsAuthenticated,
      setUserDetails,
      userDetails,
    }}>
      {children}
    </AuthContext.Provider>
  );
};