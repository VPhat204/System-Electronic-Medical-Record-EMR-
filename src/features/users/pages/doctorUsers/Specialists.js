import React, { useState, forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import { LanguageContext } from '../../../../shared/context/LanguageContext';

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Robert Sterling',
    specialty: 'Chief Cardiologist',
    department: 'Cardiology',
    experience: '20+ Years Experience',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsYfC37kzDOcEwKaEUypN--8CqRQ1sH4hdUkWxXIbAMryUSNTgjMkvDawYgfTAgFxMLRgjl6epW3qQ2eEEBU0DzvNjCDkJaGyUGFWq9DZu-50bZMBK_ZkXJOU0A2pppGvJdDTVNK9mdWKEDAQjiPB-BZvLY3zhRNTrA27VNPNaNpIl85hr3nOqge2SZAdJWH0JI7Qz43q172Z3OYh2TWZpZbU9fhy37X6lyKOJgk2wKscR_2gi5huO',
  },
  {
    id: 2,
    name: 'Dr. Elena Rodriguez',
    specialty: 'Senior Pediatrician',
    department: 'Pediatrics',
    experience: '15+ Years Experience',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFDt3jbh_pkcczbv2SJpLsU14Ez8NKt4KxgP4jhanLk2X2LmglqA02C-m6M-DXNZ-KlfxzL8mzJI4bD9r35hAZ9NZ9tAvsTHpwGp01JsBnFmguxppDWfos7xi9pVDVJGokd7cItriviISsCEJ964WgIk4QHorOGpyyKj53-UZ8I6tKJkJVVfrCJEY3i6ooXD09LyenBJ-oCE7TXp2nXhLpZGGVFJ9jjrzuHrPu9e_NTRyiRHtJ0znr',
  },
  {
    id: 3,
    name: 'Dr. James Chen',
    specialty: 'Neurology Specialist',
    department: 'Neurology',
    experience: '12+ Years Experience',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTzUF9skV0zbKJxb4AukI3bZwIzpeds2GNxa2m2iNvFJedn0kFod2UM1f_n21cjiSV1QO0Pc8KJHAbnRCn4JYoq1qhUNqMkaMUqd9bl0Xs59THICRL3E2QcSI3_0nWZOXz3jiFByUahROAiET31z5_qemsrPVvsPz0MeAxLmqFSH3H6iS3V_nA5iwvWV_iYfnjYMTkHnMCmRdV1MUUTNg_tH0yWYZjGVgWz-cda14vtg2243HH-kmK',
  },
  {
    id: 4,
    name: 'Dr. Sarah Thompson',
    specialty: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    experience: '18+ Years Experience',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeVPuetly0Zf0-MiU8OvbNXVxB0IQUXCkbt4HtcGLMdvxxUp5AaHNvKUu7RxHIz0CoeVCMoh4i963ozGS8OgxbgnLEOON_peZjRP5elH0coM-I9TsahSysMUYcZpGwAsPp4tRSI2fttccnyc2iRS8aHoavEZcXt_UOO3aNDqzZvJp21kAjs3xcUnmIYuYRffaBuhu9Rut7AKZlPDUxNlTnyaApxc54Rl8qRVRiIV6ltFvxfvFiji0L',
  },
];

const Specialists = forwardRef(({ selectedDepartment, setSelectedDepartment, onBookConsultation }, ref) => {
  const { t } = useContext(LanguageContext);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusSearch: () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }));

  const categories = [
    { id: 'All', label: t('doctors.allDepts') },
    { id: 'Cardiology', label: t('doctors.department.Cardiology') },
    { id: 'Pediatrics', label: t('doctors.department.Pediatrics') },
    { id: 'Neurology', label: t('doctors.department.Neurology') },
    { id: 'Orthopedics', label: t('doctors.department.Orthopedics') }
  ];

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesDept = selectedDepartment === 'All' || doc.department === selectedDepartment;
    
    // Multi-language safe search match
    const translatedName = doc.name.toLowerCase();
    const translatedSpecialty = t(`doctors.specialty.${doc.specialty}`).toLowerCase();
    const query = searchQuery.toLowerCase();
    
    const matchesSearch = translatedName.includes(query) || 
                          translatedSpecialty.includes(query) || 
                          doc.specialty.toLowerCase().includes(query);
    return matchesDept && matchesSearch;
  });

  return (
    <section className="py-xl bg-surface-container-low dark:bg-slate-900 border-y border-outline-variant dark:border-slate-800 transition-colors duration-200" id="doctors">
      <div className="container mx-auto px-lg">
        {/* Header Title */}
        <div className="text-center mb-xl">
          <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white">{t('doctors.title')}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 max-w-xl mx-auto mt-sm">
            {t('doctors.subtitle')}
          </p>
        </div>

        {/* Live Search and Filters */}
        <div className="max-w-3xl mx-auto mb-xl flex flex-col md:flex-row items-center gap-md">
          {/* Search bar */}
          <div className="relative w-full md:flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline dark:text-slate-400">
              search
            </span>
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder={t('doctors.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-md py-sm bg-white dark:bg-slate-800 text-on-surface dark:text-white border border-outline-variant dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-md top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-xs justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedDepartment(cat.id)}
                className={`px-md py-xs font-label-md text-label-md rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  selectedDepartment === cat.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 border border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Specialists Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter max-w-6xl mx-auto">
          {filteredDoctors.map((doc) => (
            <div 
              key={doc.id} 
              className="bg-white dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary dark:hover:border-primary-fixed-dim flex flex-col justify-between"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  alt={doc.name} 
                  src={doc.image}
                />
                <div className="absolute top-md right-md bg-secondary-container text-on-secondary-container dark:text-teal-900 px-sm py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {t(`doctors.department.${doc.department}`)}
                </div>
              </div>
              <div className="p-md flex-grow space-y-sm flex flex-col justify-between min-h-[140px]">
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white leading-tight mb-xs truncate" title={doc.name}>
                    {doc.name}
                  </h4>
                  <p className="font-body-sm text-body-sm text-primary dark:text-sky-400 font-semibold truncate" title={t(`doctors.specialty.${doc.specialty}`)}>
                    {t(`doctors.specialty.${doc.specialty}`)}
                  </p>
                </div>
                <div className="flex items-center gap-sm text-on-surface-variant dark:text-slate-400">
                  <span className="material-symbols-outlined text-[18px] shrink-0">work_history</span>
                  <span className="font-body-sm truncate">{t(`doctors.experience.${doc.experience}`)}</span>
                </div>
              </div>
              <div className="p-md pt-0 shrink-0">
                <button 
                  onClick={() => onBookConsultation(doc.name, doc.department)}
                  className="w-full py-sm border border-primary dark:border-sky-400/50 text-primary dark:text-sky-400 font-label-md text-label-md rounded-lg hover:bg-primary dark:hover:bg-slate-700 hover:text-white transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  {t('doctors.bookBtn')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Specialists;
