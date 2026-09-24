import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_BASE = ''; // Vite proxy handles /api

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('ml_token'));
  const [loading, setLoading] = useState(true);

  // ============================================================
  //  Set default axios auth header whenever token changes
  // ============================================================
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('ml_token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('ml_token');
    }
  }, [token]);

  // ============================================================
  //  On mount: if we have a token, verify it and load user
  // ============================================================
  useEffect(() => {
    const init = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('/api/auth/me');
        setUser(res.data.user);
      } catch (err) {
        console.warn('Token invalid — logging out');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []); // run once on mount

  // ============================================================
  //  Signup
  // ============================================================
  const signup = async (name, email, password) => {
    const res = await axios.post('/api/auth/signup', { name, email, password });
    const { user: newUser, token: newToken } = res.data;
    setUser(newUser);
    setToken(newToken);
    return newUser;
  };

  // ============================================================
  //  Login
  // ============================================================
  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    const { user: loggedUser, token: newToken } = res.data;
    setUser(loggedUser);
    setToken(newToken);
    return loggedUser;
  };

  // ============================================================
  //  Logout
  // ============================================================
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ml_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};