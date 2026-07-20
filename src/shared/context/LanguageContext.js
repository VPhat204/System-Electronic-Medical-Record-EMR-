import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../features/auth/context/AuthContext';
import viTranslations from '../../location/vi.json';
import enTranslations from '../../location/en.json';

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
    const sanitizedLang = nextLang.toLowerCase() === 'vn' ? 'vi' : nextLang.toLowerCase();
    setLang(sanitizedLang);
    if (user && user.lang !== sanitizedLang) {
      updateUserSettings({ lang: sanitizedLang });
    }
  };

  const translations = {
    vi: viTranslations,
    en: enTranslations
  };

  // Safe nested translation lookup function
  const t = (key) => {
    const keys = key.split('.');
    let result = translations[lang === 'vn' ? 'vi' : lang];
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // return key if not found
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
