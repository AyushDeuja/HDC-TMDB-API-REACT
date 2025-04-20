import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const AuthProvier = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      setUser({ username });
      navigate("/favourites");
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
export default AuthProvier;
