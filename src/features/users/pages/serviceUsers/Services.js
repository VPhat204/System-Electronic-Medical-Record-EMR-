import React from 'react';

export default function Services({ onSelectDepartment }) {
  const departments = [
    {
      id: 'Cardiology',
      name: 'Cardiology',
      icon: 'cardiology',
      desc: 'Advanced heart care and surgeries.',
    },
    {
      id: 'Pediatrics',
      name: 'Pediatrics',
      icon: 'child_care',
      desc: 'Compassionate care for children.',
    },
    {
      id: 'Neurology',
      name: 'Neurology',
      icon: 'neurology',
      desc: 'Brain and nervous system health.',
    },
    {
      id: 'Orthopedics',
      name: 'Orthopedics',
      icon: 'orthopedics',
      desc: 'Joint, bone, and spine specialists.',
    },
    {
      id: 'Oncology',
      name: 'Oncology',
      icon: 'health_metrics',
      desc: 'Comprehensive cancer treatment.',
    },
    {
      id: 'Diagnostics',
      name: 'Diagnostics',
      icon: 'biotech',
      desc: 'Precise lab and imaging tests.',
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
          <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white">Medical Services</h3>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">
            Specialized healthcare solutions for every stage of life.
          </p>
        </div>
        <button 
          onClick={() => handleSelect('All')}
          className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md flex items-center gap-xs hover:underline"
        >
          View All Departments <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-md">
        {departments.map((dept) => (
          <div 
            key={dept.id} 
            onClick={() => handleSelect(dept.id)}
            className="bg-white dark:bg-slate-800 p-lg border border-outline-variant dark:border-slate-700 rounded-xl hover:border-primary dark:hover:border-primary-fixed-dim transition-all group cursor-pointer hover:shadow-md"
          >
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim mb-md text-[32px] group-hover:scale-110 transition-transform block">
              {dept.icon}
            </span>
            <h4 className="font-label-md text-label-md mb-xs text-on-surface dark:text-white">
              {dept.name}
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">
              {dept.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
