import React, { useState, useContext } from 'react';

import { AuthContext } from '../features/auth/context/AuthContext';
import { LanguageContext } from '../shared/context/LanguageContext';

export default function Navbar({ theme, toggleTheme, onOpenAuth, onNavigate, currentPage }) {
  const { user } = useContext(AuthContext);
  const { lang, setLang, t } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { label: t('navbar.home'), page: 'home', href: '#' },
    { label: t('navbar.services'), page: 'services', href: '#services' },
    { label: t('navbar.doctors'), page: 'doctors', href: '#doctors' },
    { label: t('navbar.insurance'), page: 'insurance', href: '#insurance' },
    { label: t('navbar.blogs'), page: 'blogs', href: '#blogs' }
  ];

  const getLinkClasses = (page) => {
    const isActive = currentPage === page;
    return `relative pb-1 border-b-2 transition-all duration-150 whitespace-nowrap flex-shrink-0 ${
      isActive
        ? 'text-primary dark:text-primary-fixed-dim border-primary dark:border-primary-fixed-dim'
        : 'text-on-surface-variant dark:text-slate-300 border-transparent hover:text-primary dark:hover:text-primary-fixed-dim hover:border-primary dark:hover:border-primary-fixed-dim'
    }`;
  };

  return (
    <nav className="nav-sticky bg-white dark:bg-slate-900 border-b border-outline-variant dark:border-slate-800 flex items-center justify-between px-lg h-16 w-full shadow-sm transition-colors duration-200 relative">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-md cursor-pointer flex-shrink-0" onClick={() => { onNavigate('home'); setIsOpen(false); }}>
        <span className="material-symbols-outlined text-primary-container dark:text-primary-fixed-dim text-headline-md" style={{ fontVariationSettings: "'FILL' 1" }}>
          medical_services
        </span>
        <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface dark:text-white">
          MedEMR
        </h1>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="hidden md:flex items-center gap-xl font-label-md text-label-md overflow-x-auto py-1">
        {navItems.map((item) => (
          <a
            key={item.page}
            className={`${getLinkClasses(item.page)} cursor-pointer`}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.page);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Action Buttons & Hamburger Menu (Mobile/Desktop) */}
      <div className="flex items-center gap-sm sm:gap-md flex-shrink-0">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className="p-2 text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-primary-fixed-dim hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center cursor-pointer"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <span className="material-symbols-outlined text-[20px]">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Language Switcher (Login Page Style) */}
        <div className="flex gap-xs bg-slate-100 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700 transition-colors duration-200 shrink-0">
          <button 
            onClick={() => setLang('en')}
            className={`px-2 py-0.5 text-xs font-semibold rounded transition-all cursor-pointer ${
              lang.toLowerCase() === 'en' 
                ? 'text-primary dark:text-sky-400 bg-white dark:bg-slate-700 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-primary'
            }`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang('vi')}
            className={`px-2 py-0.5 text-xs font-semibold rounded transition-all cursor-pointer ${
              lang.toLowerCase() === 'vi' || lang.toLowerCase() === 'vn'
                ? 'text-primary dark:text-sky-400 bg-white dark:bg-slate-700 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-primary'
            }`}
          >
            VN
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-sm sm:gap-md relative">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 font-semibold text-sm bg-primary/10 dark:bg-slate-800 text-primary dark:text-slate-100 hover:bg-primary/20 transition-all rounded-lg whitespace-nowrap cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">account_circle</span>
                <span>{user.fullName}</span>
                <span className="material-symbols-outlined text-[16px] transition-transform duration-200" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                  keyboard_arrow_down
                </span>
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 shadow-2xl z-20 py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-4 py-2 border-b border-outline-variant dark:border-slate-700">
                      <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate">{user.fullName}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email || user.username}</p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 bg-primary/10 text-primary dark:text-sky-400 rounded text-[10px] uppercase font-bold tracking-wider">
                        {user.role}
                      </span>
                    </div>
                    <button 
                      onClick={() => { onNavigate(`${user.role}-dashboard`); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">dashboard</span>
                      {user.role === 'patient' ? t('navbar.backToPatient') : t('navbar.dashboard')}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <button 
                onClick={() => onOpenAuth('login')}
                className="px-md py-sm font-label-md text-label-md text-primary dark:text-sky-400 border border-primary dark:border-sky-400/30 hover:bg-primary-fixed dark:hover:bg-slate-800 transition-colors rounded-lg whitespace-nowrap cursor-pointer min-w-[90px]"
              >
                {t('navbar.login')}
              </button>
              <button 
                onClick={() => onOpenAuth('register')}
                className="px-md py-sm font-label-md text-label-md bg-primary hover:bg-primary/95 dark:bg-sky-600 dark:hover:bg-sky-500 text-white transition-colors rounded-lg whitespace-nowrap cursor-pointer min-w-[90px]"
              >
                {t('navbar.register')}
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 md:hidden text-on-surface-variant dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-[24px]">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-outline-variant dark:border-slate-800 flex flex-col p-md gap-md md:hidden z-50 shadow-md animate-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => (
            <a
              key={item.page}
              className={`font-body-md text-body-md py-sm px-md rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
                currentPage === item.page 
                  ? 'text-primary dark:text-primary-fixed-dim font-bold bg-slate-50 dark:bg-slate-800' 
                  : 'text-on-surface-variant dark:text-slate-300'
              }`}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.page);
                setIsOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <hr className="border-outline-variant dark:border-slate-800 my-xs" />
          <div className="flex flex-col gap-sm px-md">
            {user ? (
              <div className="space-y-2 text-left">
                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{user.fullName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user.email || user.username}</p>
                </div>
                <button 
                  onClick={() => { onNavigate(`${user.role}-dashboard`); setIsOpen(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-lg cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">dashboard</span>
                  {user.role === 'patient' ? t('navbar.backToPatient') : t('navbar.dashboard')}
                </button>
                <button 
                  onClick={() => { onNavigate('home', true); setIsOpen(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors rounded-lg cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-red-600">logout</span>
                  {t('navbar.logout')}
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => { onOpenAuth('login'); setIsOpen(false); }}
                  className="w-full py-2 font-label-md text-label-md text-primary dark:text-primary-fixed-dim border border-primary dark:border-primary-fixed-dim hover:bg-primary-fixed dark:hover:bg-slate-800 transition-colors rounded-lg text-center cursor-pointer"
                >
                  {t('navbar.login')}
                </button>
                <button 
                  onClick={() => { onOpenAuth('register'); setIsOpen(false); }}
                  className="w-full py-2 font-label-md text-label-md bg-primary text-white hover:bg-primary/95 transition-colors rounded-lg text-center cursor-pointer"
                >
                  {t('navbar.register')}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
