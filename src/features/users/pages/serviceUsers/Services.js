import React, { useContext } from 'react';
import { LanguageContext } from '../../../../shared/context/LanguageContext';

export default function Services({ onSelectDepartment }) {
  const { t } = useContext(LanguageContext);

  const departments = [
    {
      id: 'Cardiology',
      name: t('services.cardiology.name'),
      icon: 'cardiology',
      desc: t('services.cardiology.desc'),
    },
    {
      id: 'Pediatrics',
      name: t('services.pediatrics.name'),
      icon: 'child_care',
      desc: t('services.pediatrics.desc'),
    },
    {
      id: 'Neurology',
      name: t('services.neurology.name'),
      icon: 'neurology',
      desc: t('services.neurology.desc'),
    },
    {
      id: 'Orthopedics',
      name: t('services.orthopedics.name'),
      icon: 'orthopedics',
      desc: t('services.orthopedics.desc'),
    },
    {
      id: 'Oncology',
      name: t('services.oncology.name'),
      icon: 'health_metrics',
      desc: t('services.oncology.desc'),
    },
    {
      id: 'Diagnostics',
      name: t('services.diagnostics.name'),
      icon: 'biotech',
      desc: t('services.diagnostics.desc'),
    },
  ];

  const handleSelect = (deptId) => {
    onSelectDepartment(deptId);
    const el = document.getElementById('doctors');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-xl container mx-auto px-lg mt-xl" id="services">
      <div className="flex items-center justify-between mb-xl">
        <div>
          <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white">{t('services.title')}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">
            {t('services.subtitle')}
          </p>
        </div>
        <button 
          onClick={() => handleSelect('All')}
          className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md flex items-center gap-xs hover:underline cursor-pointer flex-shrink-0"
        >
          {t('services.viewAll')} <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-md">
        {departments.map((dept) => (
          <div 
            key={dept.id} 
            onClick={() => handleSelect(dept.id)}
            className="bg-white dark:bg-slate-800 p-lg border border-outline-variant dark:border-slate-700 rounded-xl hover:border-primary dark:hover:border-primary-fixed-dim transition-all group cursor-pointer hover:shadow-md min-h-[200px] flex flex-col justify-start"
          >
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim mb-md text-[32px] group-hover:scale-110 transition-transform block w-fit shrink-0">
              {dept.icon}
            </span>
            <h4 className="font-label-md text-label-md mb-xs text-on-surface dark:text-white truncate" title={dept.name}>
              {dept.name}
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 line-clamp-3">
              {dept.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
