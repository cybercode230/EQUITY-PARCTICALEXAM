// src/context/AuthContext.jsx
import { createContext, useState } from "react";
import { login, register as registerApi, logout } from "../api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (data) => {
    const res = await login(data); // backend sets HttpOnly cookie
    setUser(res.data.user); // store user info for UI & role-based rendering
    return res;
  };

  const registerUser = async (data) => {
    const res = await registerApi(data);
    setUser(res.data.user);
    return res;
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
