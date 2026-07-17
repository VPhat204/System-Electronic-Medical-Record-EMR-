import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../features/auth/context/AuthContext';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { user, updateUserSettings } = useContext(AuthContext);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme_guest') || 'light';
  });

  // Handle per-account theme settings when user changes
  useEffect(() => {
    if (user) {
      setTheme(user.theme || localStorage.getItem(`theme_user_${user.id}`) || 'light');
    } else {
      setTheme(localStorage.getItem('theme_guest') || 'light');
    }
  }, [user]);

  // Sync theme with document class and persist to localStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (user) {
      localStorage.setItem(`theme_user_${user.id}`, theme);
    } else {
      localStorage.setItem('theme_guest', theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme, user]);

  const changeTheme = (nextTheme) => {
    setTheme(nextTheme);
    if (user && user.theme !== nextTheme) {
      updateUserSettings({ theme: nextTheme });
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    changeTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
