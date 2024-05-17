import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    //OnAuthStateChange
    setIsAuthenticated(false);
    setTimeout(() => {
    }, 300);
  }, []);

  const login = async (email, password) => {
    try {
    } catch (error) {}
  };
  const logout = async (email, password) => {
    try {
    } catch (error) {}
  };
  const register = async (email, password, username, profileUrl) => {
    try {
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped inside a AuthContextProvider");
  }
  return value;
};
