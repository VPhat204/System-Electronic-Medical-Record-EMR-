import React from 'react';

export default function Stats() {
  const statItems = [
    {
      icon: 'personal_injury',
      value: '50k+',
      label: 'Annual Patients',
      bgClass: 'bg-primary-fixed dark:bg-blue-950',
      iconClass: 'text-primary dark:text-blue-300',
    },
    {
      icon: 'medical_information',
      value: '250+',
      label: 'Expert Doctors',
      bgClass: 'bg-secondary-fixed dark:bg-teal-950',
      iconClass: 'text-on-secondary-container dark:text-teal-300',
    },
    {
      icon: 'hotel',
      value: '1,200',
      label: 'Modern Beds',
      bgClass: 'bg-tertiary-fixed dark:bg-amber-950',
      iconClass: 'text-tertiary dark:text-amber-300',
    },
    {
      icon: 'emergency',
      value: '24/7',
      label: 'Emergency Care',
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
            className="bg-white dark:bg-slate-800 p-lg rounded-xl border border-outline-variant dark:border-slate-700 shadow-sm flex items-center gap-md hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-full ${stat.bgClass} flex items-center justify-center`}>
              <span className={`material-symbols-outlined ${stat.iconClass}`}>
                {stat.icon}
              </span>
            </div>
            <div>
              <div className="font-headline-md text-headline-md text-on-surface dark:text-white">
                {stat.value}
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
