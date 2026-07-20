import React, { useContext } from 'react';
import { LanguageContext } from '../shared/context/LanguageContext';

export default function Hero({ onOpenBooking, onFindDoctor }) {
  const { t } = useContext(LanguageContext);

  return (
    <header className="relative h-[600px] overflow-hidden flex items-center">
      {/* Background Image with brightness overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center brightness-[0.85] dark:brightness-[0.7]" 
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXstGcb2HqjF8kxscqTEuOKhjBe93BjfaPVO9dSXw3qrfBwf40mSclRrKflqbzOYdLeIjfjgQVE0hDl3plZwO63oSaHPhpYNrQvw-EMWdXS9Z38ZYcheHxNf-cJdoxkP6WvG-4a2TmfOXFG0xA1xzoLqxSWNz4KqrplP03rRng8oLjh56eY1uY3Wm4CyxsKNNKOpjapnl__r_n6duYLY9lmNsUl0N8wETfh7X8d8_TMw0vjVd5tcyN')" 
          }}
          data-alt="Modern high-tech hospital atrium"
        />
      </div>

      {/* Hero Content Card */}
      <div className="container mx-auto px-lg relative z-10">
        <div className="max-w-2xl glass-card p-md sm:p-xl rounded-xl border-none shadow-2xl transition-all duration-300">
          <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mb-md leading-tight">
            {t('hero.title')}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-200 mb-xl min-h-[80px]">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-md">
            <button 
              onClick={onOpenBooking}
              className="flex items-center justify-center gap-sm px-xl py-md bg-primary-container text-white font-label-md text-label-md rounded-lg shadow-lg hover:bg-primary hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer min-w-[180px] whitespace-nowrap flex-shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">event_available</span>
              {t('hero.bookBtn')}
            </button>
            <button 
              onClick={onFindDoctor}
              className="flex items-center justify-center gap-sm px-xl py-md bg-white dark:bg-slate-800 text-primary dark:text-primary-fixed-dim border border-primary dark:border-slate-700 font-label-md text-label-md rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-[0.98] cursor-pointer min-w-[180px] whitespace-nowrap flex-shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
              {t('hero.findBtn')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
