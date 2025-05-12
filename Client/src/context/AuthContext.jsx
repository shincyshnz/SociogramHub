import React, { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const storeToken = useCallback((token) => {
    setIsAuthenticated(true);
    localStorage.setItem("accessToken", token);
  }, []);

  const getToken = useCallback((tokenName) => {
    return localStorage.getItem(tokenName);
  }, []);

  const removeToken = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.clear();
  }, []);

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