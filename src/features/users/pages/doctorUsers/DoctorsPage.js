import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../../../../shared/context/LanguageContext';

const doctorsData = [
  {
    id: 1,
    name: 'BS. Robert Sterling',
    specialty: 'Chuyên gia Tim mạch học',
    department: 'Tim mạch',
    experience: '22 năm kinh nghiệm',
    location: 'Cơ sở Quận 1',
    title: 'Trưởng khoa',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxkL0fpGe0McqM8PikzZBQymJlxDslNi9yN5mM3yiOwiU7nniG4W-MhVYeINBbK-Mxm47rGuIwk9eQ2q7eRR-ef6N8EWZDjc_rilM5V4bckf-V1HP8EGuNYnH7tIDJHtVu0qGt-GUHpdY5iTuakcNymcQI_MstJy7VuVdAKjOLaHu0F8SZQS-iqVIhRdghxdjZe-SoLrtEHFKl5jR1HwegdNFTWJpHSh5HDobh8c4I5_-MufcR2P33'
  },
  {
    id: 2,
    name: 'BS. Elena Vance',
    specialty: 'Chuyên khoa Nội tiết',
    department: 'Nội endocrine',
    experience: '15 năm kinh nghiệm',
    location: 'Cơ sở Quận 7',
    title: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnUW1U94R1gylZ_4sjbpfW4knjm2b2ObZ4E4OA9JYR6NkNiBxw_aUvpoHJZb0YvnV6VI7Cr5nu11ycQBKgjwFOA4z1PIOk6MHFaSztyIUpabZ_6moF3OSQHSNX7x-7esrG8SNfnhD5dDvtpbQbIlYtDqKcZqn2JlxPHzhxhj-tuXtynZCXKMRWm1ZQ2KNA1So_uDFS0ffwIQTqS9hXmtlaUKoHoxC--Xkz0rdo-2oeYHUnBVbHaviU'
  },
  {
    id: 3,
    name: 'BS. Marcus Thorne',
    specialty: 'Nhi Khoa Tổng quát',
    department: 'Nhi khoa',
    experience: '10 năm kinh nghiệm',
    location: 'Cơ sở Quận 1',
    title: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqViP2uGRjGPiwNYMG0TQERVmBldCrWFVqO5mMomCKRFFz9sZCjAeSLym6F8jmiPMuBQ01SjZx41zfVIBB9BXuEzNnhPiE6RFOH8J5lAjQ0VhYqkVplIBJDvtlC4_nG8ZhN12OkW7o0HQ-VmRww_fOEl_mHptx1VNenf0qWpAYwU9VvWibUVAaxydo9eB6MHTEWMtlt0TnydwQk_niH28eun1RQuX6A6aLrDe_GGQZtpVx9nnE-csl'
  },
  {
    id: 4,
    name: 'BS. Sarah Chen',
    specialty: 'Phẫu thuật Ngoại thần kinh',
    department: 'Thần kinh',
    experience: '18 năm kinh nghiệm',
    location: 'Trung tâm Kỹ thuật cao',
    title: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6nPhOn_8LvLT5FniBGrTvEIbIZjd3nWBrNhELkiR-uqkazjBvoXWAhYxSBhAxBcV0l7FCvRKyRmycWxlmHg2-1QaVtCkEvTxL_3lipzIXLcual6K4Z1AXv9IRL8zU1tg5NHs2J16p0-_NTCr-UnVYaCIBX4H1US0708atPgUhTfeIF7tJ6kAi59MEjHq2ARCU1q_gqNYmwAOflnJfGc09-7ReQBW8z3JkwJJ9PjyT1MOHuI_8iLv8'
  },
  {
    id: 5,
    name: 'BS. Julianne More',
    specialty: 'Chuyên khoa Ung bướu',
    department: 'Ung bướu',
    experience: '25 năm kinh nghiệm',
    location: 'Cơ sở Quận 1',
    title: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYZRB4Er-HUW_nlcFQ2SEyDVy8XckCxL26jltoTeQj-JtQMJ2NKiZJa8RtuxEENi2F10GnHYAR3PLOdA6Qf6BWrHhKq7T__QQTKpqCqMm1agYoavkJ8DxwUpaO7k4FZCqzZ9q18knjHPGFUcstDRSL69YwVpSWoZ0WA0uVmQEQ1JJJeA_3soM8-wVx5V1bu__bcP0Qv84I2ClDLrOLGD-D34lyxu0gxaG9N-qAZ6APRKyUxb92xDR0'
  },
  {
    id: 6,
    name: 'BS. Linh Nguyễn',
    specialty: 'Da liễu & Thẩm mỹ',
    department: 'Da liễu',
    experience: '8 năm kinh nghiệm',
    location: 'Cơ sở Quận 7',
    title: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD222j-zKVlF4y-B1sFb_0OS8hWkogHKCD4h6uAIUr4bxNgxzY1mbsc8imPrhdlaZms-0M5w8GKkpkR1HuVIogAycZ7Mi4wIt_xifYztj9naRTvw3oEHzQQYQDZv2Ixqikea_OxX5nYi-Vy8NY8sZy2PXyqYKrta-SaGhz7JI7ggvelnTjaHDZN1wG15Jn7ahUCAs0cvSRNSb3f1k7c3186GTAaAUe4NNbNIL4UX6auwhPNZGlpvO13'
  }
];

export default function DoctorsPage({ onNavigate, onBookConsultation }) {
  const { t, lang } = useContext(LanguageContext);
  const [searchName, setSearchName] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedLoc, setSelectedLoc] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const [scrolled, setScrolled] = useState(false);

  // Sync scroll class for Nav shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApplyFilter = () => {
    const filtered = doctorsData.filter((doc) => {
      const translatedName = doc.name.toLowerCase();
      const translatedSpecialty = t(`doctors.specialty.${doc.specialty}`).toLowerCase();
      const query = searchName.toLowerCase();

      const matchesName = translatedName.includes(query) ||
                          translatedSpecialty.includes(query) ||
                          doc.specialty.toLowerCase().includes(query);
      const matchesDept = !selectedDept || doc.department === selectedDept;
      const matchesLoc = !selectedLoc || doc.location === selectedLoc;
      return matchesName && matchesDept && matchesLoc;
    });
    setFilteredDoctors(filtered);
  };

  // Run filter on criteria changes
  useEffect(() => {
    handleApplyFilter();
  }, [searchName, selectedDept, selectedLoc, lang]);

  return (
    <main className="pt-24 pb-xl px-lg max-w-7xl mx-auto min-h-screen">
        
        {/* Hero & Commitment Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-xl mb-xl items-center">
          <div className="md:col-span-7">
            <h1 className="font-headline-xl text-headline-xl text-on-background dark:text-white mb-md leading-tight">
              {t('doctors.pageTitle')}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-300 mb-xl max-w-2xl min-h-[84px]">
              {t('doctors.pageDesc')}
            </p>
            <div className="flex flex-wrap gap-md">
              <div className="flex items-center gap-sm bg-surface-container-low dark:bg-slate-800 px-md py-sm rounded-lg border border-outline-variant dark:border-slate-700 select-none">
                <span className="material-symbols-outlined text-primary dark:text-sky-400 shrink-0">verified</span>
                <span className="font-label-md whitespace-nowrap">{t('doctors.certBadge')}</span>
              </div>
              <div className="flex items-center gap-sm bg-surface-container-low dark:bg-slate-800 px-md py-sm rounded-lg border border-outline-variant dark:border-slate-700 select-none">
                <span className="material-symbols-outlined text-primary dark:text-sky-400 shrink-0">clinical_notes</span>
                <span className="font-label-md whitespace-nowrap">{t('doctors.deptBadge')}</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-5 relative h-64 md:h-80 rounded-xl overflow-hidden border border-outline-variant dark:border-slate-800 group shrink-0 shadow-sm">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Clinical corridor" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhwEmvvj3HK2TZnAmWxeBGuOB5UnNELFiLCiuFMJnqWfBvN9_eGbJOC-wS4R_aj72u1u0DuXcQVg1xbD8jD1HgPcs24LGSG8yYJcaibDDQQE08yBGAZtQDxaiJAThEVLd1hEifwXgjiat8asYaQiMbNu8QrMUa0oGOuBM7-iNEyHsTMdY6-AVpswviHrwCkWgYNsn2bEwJURcsDx25vNX-K8dzplOdmvqElCCY5ryk4eK1uTHCRSaK"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
          </div>
        </section>

        {/* Search & Filter System */}
        <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md mb-xl clinical-shadow transition-colors duration-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-md items-end">
            
            {/* Search Name Input */}
            <div className="space-y-xs">
              <label className="font-label-md text-on-surface-variant dark:text-slate-300 ml-xs select-none">{t('doctors.searchLabel')}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-slate-400">
                  search
                </span>
                <input 
                  type="text"
                  placeholder={t('doctors.searchPlaceholder')}
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-outline-variant dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-slate-900 text-body-md text-on-surface dark:text-white outline-none placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="space-y-xs">
              <label className="font-label-md text-on-surface-variant dark:text-slate-300 ml-xs select-none">{t('doctors.deptLabel')}</label>
              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-4 py-2 border border-outline-variant dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-slate-900 text-body-md text-on-surface dark:text-white outline-none appearance-none"
              >
                <option value="">{t('doctors.allDepts')}</option>
                <option value="Tim mạch">{t('doctors.department.Tim mạch')}</option>
                <option value="Nhi khoa">{t('doctors.department.Nhi khoa')}</option>
                <option value="Thần kinh">{t('doctors.department.Thần kinh')}</option>
                <option value="Nội endocrine">{t('doctors.department.Nội endocrine')}</option>
                <option value="Da liễu">{t('doctors.department.Da liễu')}</option>
                <option value="Ung bướu">{t('doctors.department.Ung bướu')}</option>
              </select>
            </div>

            {/* Location Dropdown */}
            <div className="space-y-xs">
              <label className="font-label-md text-on-surface-variant dark:text-slate-300 ml-xs select-none">{t('doctors.locLabel')}</label>
              <select 
                value={selectedLoc}
                onChange={(e) => setSelectedLoc(e.target.value)}
                className="w-full px-4 py-2 border border-outline-variant dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-slate-900 text-body-md text-on-surface dark:text-white outline-none appearance-none"
              >
                <option value="">{t('doctors.allLocs')}</option>
                <option value="Cơ sở Quận 1">{t('doctors.location.Cơ sở Quận 1')}</option>
                <option value="Cơ sở Quận 7">{t('doctors.location.Cơ sở Quận 7')}</option>
                <option value="Trung tâm Kỹ thuật cao">{t('doctors.location.Trung tâm Kỹ thuật cao')}</option>
              </select>
            </div>

            {/* Apply Button */}
            <div>
              <button 
                onClick={handleApplyFilter}
                className="w-full bg-primary hover:bg-primary-container text-white font-label-md py-2.5 rounded-lg transition-all flex items-center justify-center gap-sm active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                {t('doctors.filterBtn')}
              </button>
            </div>
          </div>
        </section>

        {/* Doctor Directory Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter animate-fade-in">
            {filteredDoctors.map((doc) => (
              <div 
                key={doc.id} 
                className="doctor-card bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary dark:hover:border-primary-fixed-dim clinical-shadow flex flex-col justify-between"
              >
                <div className="h-64 overflow-hidden relative select-none">
                  <img 
                    className="doctor-image w-full h-full object-cover transition-transform duration-500" 
                    alt={doc.name} 
                    src={doc.image}
                  />
                  {doc.title && (
                    <div className="absolute top-md right-md bg-secondary-container text-on-secondary-container dark:text-teal-900 px-sm py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {t(`doctors.titleLabel.${doc.title}`)}
                    </div>
                  )}
                </div>
                <div className="p-md flex-grow space-y-sm flex flex-col justify-between min-h-[140px]">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white truncate" title={doc.name}>
                      {doc.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-primary dark:text-sky-400 font-semibold truncate" title={t(`doctors.specialty.${doc.specialty}`)}>
                      {t(`doctors.specialty.${doc.specialty}`)}
                    </p>
                  </div>
                  <div className="space-y-xs shrink-0">
                    <div className="flex items-center gap-sm text-on-surface-variant dark:text-slate-400">
                      <span className="material-symbols-outlined text-[18px] shrink-0">work_history</span>
                      <span className="font-body-sm truncate">{t(`doctors.experience.${doc.experience}`)}</span>
                    </div>
                    <div className="flex items-center gap-sm text-on-surface-variant dark:text-slate-400">
                      <span className="material-symbols-outlined text-[18px] shrink-0">location_on</span>
                      <span className="font-body-sm truncate">{t(`doctors.location.${doc.location}`)}</span>
                    </div>
                  </div>
                </div>
                <div className="p-md pt-0 shrink-0">
                  <button 
                    onClick={() => onBookConsultation(doc.name, doc.department)}
                    className="w-full py-sm border-2 border-primary dark:border-sky-400/50 text-primary dark:text-sky-400 font-label-md rounded-lg hover:bg-primary dark:hover:bg-slate-700 hover:text-white transition-colors active:scale-[0.98] cursor-pointer whitespace-nowrap"
                  >
                    {t('doctors.bookBtn')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 p-xl">
            <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-md block">search_off</span>
            <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400">
              {t('doctors.noResults')}
            </p>
          </div>
        )}

    </main>
  );
}
