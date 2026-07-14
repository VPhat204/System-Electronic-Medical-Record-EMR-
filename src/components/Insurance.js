import React from 'react';

export default function Insurance() {
  const partners = [
    { name: 'HEALTHCORE', icon: 'health_and_safety' },
    { name: 'LUNAINSURE', icon: 'shield_moon' },
    { name: 'GLOBAL GUARD', icon: 'security' },
    { name: 'TRUSTMED', icon: 'verified_user' },
    { name: 'APEX LIFE', icon: 'gpp_good' },
  ];

  return (
    <section className="py-xl bg-surface-container-highest dark:bg-slate-800 transition-colors duration-200 border-t border-b border-outline-variant dark:border-slate-700" id="insurance">
      <div className="container mx-auto px-lg">
        <h3 className="font-headline-md text-headline-md text-on-surface dark:text-slate-200 text-center mb-xl">
          Insurance Partners
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-xl opacity-60 dark:opacity-80 grayscale dark:invert-[0.1] hover:grayscale-0 dark:hover:invert-0 hover:opacity-100 dark:hover:opacity-100 transition-all duration-300">
          {partners.map((partner, idx) => (
            <div key={idx} className="flex items-center gap-sm font-bold text-headline-sm text-on-surface dark:text-white select-none">
              <span className="material-symbols-outlined text-[28px] text-primary dark:text-primary-fixed-dim">
                {partner.icon}
              </span> 
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
