import React, { useState, useContext } from 'react';
import { LanguageContext } from '../shared/context/LanguageContext';

export default function Footer() {
  const { t } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setError(t('footer.validation.emailRequired') || 'Please enter your email.');
      return;
    }
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('footer.validation.emailInvalid') || 'Please enter a valid email address.');
      return;
    }

    // Success simulation
    setSubscribed(true);
    setEmail('');
    setError('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-inverse-surface dark:bg-slate-950 text-inverse-on-surface dark:text-slate-300 pt-xl pb-lg transition-colors duration-200">
      <div className="container mx-auto px-lg grid grid-cols-1 md:grid-cols-4 gap-xl mb-xl">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-md mb-md">
            <span className="material-symbols-outlined text-primary-fixed dark:text-primary-fixed-dim text-headline-md">
              medical_services
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-white">
              MedEMR
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-surface-variant dark:text-slate-400">
            {t('footer.desc')}
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h6 className="font-label-md text-label-md mb-md text-white">{t('footer.quickLinks')}</h6>
          <ul className="font-body-sm text-body-sm flex flex-col gap-sm text-surface-variant dark:text-slate-400">
            <li><a className="hover:text-primary-fixed dark:hover:text-white transition-colors" href="#about">{t('navbar.home')}</a></li>
            <li><a className="hover:text-primary-fixed dark:hover:text-white transition-colors" href="#doctors">{t('navbar.doctors')}</a></li>
            <li><a className="hover:text-primary-fixed dark:hover:text-white transition-colors" href="#services">{t('navbar.services')}</a></li>
            <li><a className="hover:text-primary-fixed dark:hover:text-white transition-colors" href="#blogs">{t('navbar.blogs')}</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h6 className="font-label-md text-label-md mb-md text-white">{t('footer.contact')}</h6>
          <ul className="font-body-sm text-body-sm flex flex-col gap-sm text-surface-variant dark:text-slate-400">
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px] text-primary-fixed shrink-0">location_on</span> 
              <span className="truncate">{t('footer.address')}</span>
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px] text-primary-fixed shrink-0">phone</span> 
              <span>{t('footer.phone')}</span>
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px] text-primary-fixed shrink-0">mail</span> 
              <span className="truncate">{t('footer.email')}</span>
            </li>
            <li className="flex items-center gap-xs text-red-400 font-semibold">
              <span className="material-symbols-outlined text-[16px] shrink-0">emergency</span> 
              <span>{t('footer.emergency')}</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h6 className="font-label-md text-label-md mb-md text-white">{t('footer.newsletter')}</h6>
          <p className="font-body-sm text-body-sm text-surface-variant dark:text-slate-400 mb-md">
            {t('footer.newsletterSub')}
          </p>
          
          {subscribed ? (
            <div className="bg-green-950/40 border border-green-500/50 text-green-300 p-sm rounded text-body-sm flex items-center gap-xs animate-pulse">
              <span className="material-symbols-outlined text-[16px] shrink-0">check_circle</span>
              {t('footer.thankYou')}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-xs">
              <div className="flex bg-white/10 dark:bg-white/5 border border-white/20 rounded overflow-hidden focus-within:border-primary-fixed transition-all">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  className="bg-transparent text-white px-md py-sm text-body-md outline-none flex-grow placeholder-white/40 min-w-0"
                />
                <button 
                  type="submit"
                  className="bg-primary-fixed text-on-primary-fixed px-md hover:bg-primary hover:text-white font-label-md text-label-md transition-colors cursor-pointer"
                >
                  {t('footer.subscribeBtn')}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs font-semibold ml-xs">{error}</p>}
            </form>
          )}
        </div>

      </div>

      <div className="container mx-auto px-lg border-t border-white/10 pt-lg text-center font-body-sm text-body-sm text-surface-variant dark:text-slate-500">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}
