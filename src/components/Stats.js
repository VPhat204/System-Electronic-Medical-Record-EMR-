import React, { useContext } from 'react';
import { LanguageContext } from '../shared/context/LanguageContext';

export default function Stats() {
  const { t } = useContext(LanguageContext);

  const statItems = [
    {
      icon: 'personal_injury',
      value: '50k+',
      label: t('stats.patients'),
      bgClass: 'bg-primary-fixed dark:bg-blue-950',
      iconClass: 'text-primary dark:text-blue-300',
    },
    {
      icon: 'medical_information',
      value: '250+',
      label: t('stats.doctors'),
      bgClass: 'bg-secondary-fixed dark:bg-teal-950',
      iconClass: 'text-on-secondary-container dark:text-teal-300',
    },
    {
      icon: 'hotel',
      value: '1,200',
      label: t('stats.beds'),
      bgClass: 'bg-tertiary-fixed dark:bg-amber-950',
      iconClass: 'text-tertiary dark:text-amber-300',
    },
    {
      icon: 'emergency',
      value: '24/7',
      label: t('stats.emergency'),
      bgClass: 'bg-error-container dark:bg-red-950',
      iconClass: 'text-error dark:text-red-300',
    },
  ];

  return (
    <section className="container mx-auto px-lg -mt-16 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {statItems.map((stat, idx) => (
          <div 
            key={idx} 
            className="bg-white dark:bg-slate-800 p-lg rounded-xl border border-outline-variant dark:border-slate-700 shadow-sm flex items-center gap-md hover:-translate-y-1 hover:shadow-md transition-all duration-300 min-h-[96px]"
          >
            <div className={`w-12 h-12 rounded-full ${stat.bgClass} flex items-center justify-center shrink-0`}>
              <span className={`material-symbols-outlined ${stat.iconClass}`}>
                {stat.icon}
              </span>
            </div>
            <div className="min-w-0">
              <div className="font-headline-md text-headline-md text-on-surface dark:text-white leading-none mb-1">
                {stat.value}
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 truncate" title={stat.label}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
