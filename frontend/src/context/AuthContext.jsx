import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

// ✅ Get backend URL from environment
const API = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    const res = await axios.post(`${API}/api/auth/login`, {
      email,
      password,
    });
    setUser(res.data.user);
  };

  const register = async (username, email, password, role = "user") => {
    const res = await axios.post(`${API}/api/auth/register`, {
      username,
      email,
      password,
      role,
    });
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post(`${API}/api/auth/logout`);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};