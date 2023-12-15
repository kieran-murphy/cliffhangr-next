// src/context/AuthContext.jsx
import { verifyToken } from "@/utils/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // setUser(verifyToken());
    console.log("setting user true");
    setUser(true);
  }, []);

  // Context value
  const contextValue = { user, setUser };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
