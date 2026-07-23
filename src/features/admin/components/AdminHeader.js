import React, { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export default function AdminHeader({
  setIsSidebarOpen,
  searchQuery,
  setSearchQuery,
  isDark,
  handleToggleDark,
  lang,
  setLang,
  t,
  onNavigate
}) {
  const { user } = useContext(AuthContext);
  return (
    <header className="flex justify-between items-center h-16 px-6 bg-white dark:bg-slate-950 sticky top-0 z-40 border-b border-outline-variant dark:border-slate-800 transition-colors">
      <div className="flex items-center gap-md w-full max-w-md">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 md:hidden text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400">
            search
          </span>
          <input
            type="text"
            placeholder={t.quickSearchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-sm text-body-sm text-on-surface dark:text-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-md">
        {/* Dark Mode Switcher */}
        <button
          onClick={handleToggleDark}
          className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors"
          title={isDark ? t.lightModeTitle : t.darkModeTitle}
        >
          <span className="material-symbols-outlined">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Language Switcher */}
        <button
          onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high dark:hover:bg-slate-800 text-label-md font-bold text-primary dark:text-primary-fixed-dim transition-colors"
          title={t.switchLanguageTitle}
        >
          {lang.toUpperCase()}
        </button>

        {/* Notifications */}
        <button
          onClick={() => alert(t.newAdminNotification)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 relative transition-colors"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>

        {/* Emergency */}
        <button
          onClick={() => alert(t.emergencyBroadcast)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-error hover:bg-error-container/20 transition-colors"
          title={t.emergencyTitle}
        >
          <span className="material-symbols-outlined text-red-500">emergency</span>
        </button>

        {/* User profile layout */}
        <div className="flex items-center gap-3 pl-3 border-l border-outline-variant dark:border-slate-800">
          <img
            className="w-10 h-10 rounded-full object-cover border border-primary-fixed dark:border-slate-700"
            alt="Admin Profile"
            src={user?.avatar ? (user.avatar.startsWith('http') || user.avatar.startsWith('data:image') ? user.avatar : `http://localhost:5000${user.avatar}`) : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTChBNSB76Y9cX0wvEyxGDIdHtW21ddsE8fR7oQuHLlKQmFjYoYY4iTy5I-QyJDPl0tu1yqXFGQEAyebEBeBNOAG5PZJdiYLOnufWUZkYnPZFzRDBcccTvqVxMytF377IrgOQWyBuCfqUnfQ7rHrkzbPz7PU_BZikMsNs7qzi0BE9wgOEP-b-Z7WqC4bXrYk0YQLGVwmuoMLRlT41XMWKQDklDS02nsh0XNe_3tx9WEDILmG1VW2T2'}
          />
          <div className="hidden sm:block text-left w-44">
            <p className="font-label-md text-label-md text-on-surface dark:text-white truncate" title={user ? user.fullName : "Dr. Julian Reed"}>
              {user ? user.fullName : "Dr. Julian Reed"}
            </p>
            <p className="text-[10px] text-on-surface-variant dark:text-slate-400 font-semibold truncate" title={user ? user.email : t.chiefAdmin}>
              {user ? user.email : t.chiefAdmin}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
