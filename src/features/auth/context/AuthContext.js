import React, { createContext, useState, useEffect } from 'react';

import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user profile if token exists on app start
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await authService.getMe(token);
          setUser(userData);
        } catch (err) {
          console.error('Failed to load user profile, logging out:', err);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (identity, password) => {
    setError(null);
    setLoading(true);
    try {
      const data = await authService.login({ identity, password });
      setToken(data.token);
      localStorage.setItem('token', data.token);

      const profile = await authService.getMe(data.token);
      setUser(profile);
      setLoading(false);
      return profile;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const register = async (userData) => {
    setError(null);
    setLoading(true);
    try {
      const data = await authService.register(userData);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const updateUserSettings = async (settings) => {
    if (!token) return;
    try {
      const data = await authService.updateSettings(token, settings);
      setUser(prevUser => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          theme: data.theme !== undefined ? data.theme : prevUser.theme,
          lang: data.lang !== undefined ? data.lang : prevUser.lang,
          avatar: data.avatar !== undefined ? data.avatar : prevUser.avatar
        };
      });
      return data;
    } catch (err) {
      console.error('Failed to update user settings in DB:', err);
      throw err;
    }
  };

  const verifyAccount = async (email, code) => {
    setError(null);
    setLoading(true);
    try {
      const data = await authService.verifyAccount(email, code);
      setUser(prev => prev ? { ...prev, isVerified: true } : null);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const resendOtp = async (email) => {
    setError(null);
    setLoading(true);
    try {
      const data = await authService.resendOtp(email);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        verifyAccount,
        resendOtp,
        logout,
        updateUserSettings
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
