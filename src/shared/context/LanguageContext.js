import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../features/auth/context/AuthContext';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { user, updateUserSettings } = useContext(AuthContext);

  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang_guest') || 'vi';
  });

  // Handle per-account language settings when user changes
  useEffect(() => {
    if (user) {
      setLang(user.lang || localStorage.getItem(`lang_user_${user.id}`) || 'vi');
    } else {
      setLang(localStorage.getItem('lang_guest') || 'vi');
    }
  }, [user]);

  // Sync language with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`lang_user_${user.id}`, lang);
    } else {
      localStorage.setItem('lang_guest', lang);
    }
    localStorage.setItem('lang', lang);
  }, [lang, user]);

  const changeLang = (nextLang) => {
    setLang(nextLang);
    if (user && user.lang !== nextLang) {
      updateUserSettings({ lang: nextLang });
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
