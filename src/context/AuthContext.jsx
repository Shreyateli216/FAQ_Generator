import React, { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../api/authApi';
import apiClient from '../api/apiClient';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('faqgenie_token');
    const savedUser = localStorage.getItem('faqgenie_user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await authApi.login({ email, password });
      if (data.success) {
        apiClient.setToken(data.token);
        localStorage.setItem('faqgenie_user', JSON.stringify(data.user));
        setUser(data.user);
        return data;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const data = await authApi.register({ name, email, password });
      if (data.success) {
        apiClient.setToken(data.token);
        localStorage.setItem('faqgenie_user', JSON.stringify(data.user));
        setUser(data.user);
        return data;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    apiClient.removeToken();
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
