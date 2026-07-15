import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';

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

  const categories = ['All', 'Cardiology', 'Pediatrics', 'Neurology', 'Orthopedics'];

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesDept = selectedDepartment === 'All' || doc.department === selectedDepartment;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <section className="py-xl bg-surface-container-low dark:bg-slate-900 border-y border-outline-variant dark:border-slate-800 transition-colors duration-200" id="doctors">
      <div className="container mx-auto px-lg">
        {/* Header Title */}
        <div className="text-center mb-xl">
          <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white">Meet Our Specialists</h3>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 max-w-xl mx-auto mt-sm">
            Our multi-disciplinary team is recognized globally for clinical excellence and groundbreaking research.
          </p>
        </div>

        {/* Live Search and Filters */}
        <div className="max-w-3xl mx-auto mb-xl flex flex-col md:flex-row items-center gap-md">
          {/* Search bar */}
          <div className="relative w-full md:flex-1">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline dark:text-slate-400">
              search
            </span>
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search doctor's name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-xl pr-md py-sm bg-white dark:bg-slate-800 text-on-surface dark:text-white border border-outline-variant dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-md top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-xs justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedDepartment(cat)}
                className={`px-md py-[6px] font-label-md text-label-md rounded-full transition-all duration-150 ${
                  selectedDepartment === cat
                    ? 'bg-primary-container text-white'
                    : 'bg-white dark:bg-slate-800 text-on-surface dark:text-slate-300 border border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {filteredDoctors.map((doc) => (
              <div 
                key={doc.id} 
                className="bg-white dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div 
                  className="h-64 bg-cover bg-top relative" 
                  style={{ backgroundImage: `url('${doc.image}')` }}
                  data-alt={`Portrait of ${doc.name}`}
                >
                  <div className="absolute top-sm right-sm bg-primary-fixed dark:bg-blue-950 text-primary dark:text-blue-300 px-sm py-[2px] rounded text-body-sm font-semibold">
                    {doc.department}
                  </div>
                </div>
                <div className="p-lg flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-xs">
                      {doc.name}
                    </h4>
                    <p className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md mb-md">
                      {doc.specialty}
                    </p>
                    <div className="flex items-center gap-sm text-on-surface-variant dark:text-slate-400 font-body-sm text-body-sm mb-lg">
                      <span className="material-symbols-outlined text-[16px] text-green-500">verified</span>
                      {doc.experience}
                    </div>
                  </div>
                  <button 
                    onClick={() => onBookConsultation(doc.name, doc.department)}
                    className="w-full py-sm border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim font-label-md text-label-md rounded hover:bg-primary-fixed dark:hover:bg-slate-700 transition-colors active:scale-[0.98]"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-xl bg-white dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 max-w-xl mx-auto">
            <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-md">
              person_search
            </span>
            <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">No Specialists Found</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-sm">
              We couldn't find any specialist matching "{searchQuery}" in department "{selectedDepartment}". Please try another search.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedDepartment('All'); }}
              className="mt-md text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:underline"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

export default Specialists;
