import React from 'react';

export default function NursePatientsTab({
  lang,
  t,
  isDark,
  patients,
  setPatients,
  patientFilterMode,
  setPatientFilterMode,
  searchQuery,
  setActiveTab,
  setSelectedPatId,
  setSelectedNotesPatId
}) {
  return (
    <div className="space-y-lg text-left">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed-dim mb-1 font-bold">
            {lang === 'vi' ? 'Khoa 4C: Danh sách bệnh nhân' : 'Ward 4C: Patient Roster'}
          </h2>
          <p className="text-on-surface-variant dark:text-slate-400 font-body-md">
            {lang === 'vi'
              ? `Hiện đang quản lý ${patients.length} bệnh nhân trên tổng số 24 giường hoạt động.`
              : `Currently managing ${patients.length} patients across 24 available beds.`}
          </p>
        </div>
        <div className="flex items-center gap-sm bg-surface-container-low dark:bg-slate-900 p-1 rounded-lg border border-outline-variant dark:border-slate-800">
          <button
            onClick={() => setPatientFilterMode('my')}
            className={`px-4 py-2 rounded font-label-md transition-all text-xs border-none cursor-pointer ${patientFilterMode === 'my'
                ? 'bg-white dark:bg-slate-800 text-primary dark:text-primary-fixed-dim shadow-xs font-bold'
                : 'text-on-surface-variant dark:text-slate-400 bg-transparent hover:bg-surface-container-high dark:hover:bg-slate-800'
              }`}
          >
            {lang === 'vi' ? `Bệnh nhân của tôi (${patients.filter(p => p.assignedToMe).length})` : `My Patients (${patients.filter(p => p.assignedToMe).length})`}
          </button>
          <button
            onClick={() => setPatientFilterMode('all')}
            className={`px-4 py-2 rounded font-label-md transition-all text-xs border-none cursor-pointer ${patientFilterMode === 'all'
                ? 'bg-white dark:bg-slate-800 text-primary dark:text-primary-fixed-dim shadow-xs font-bold'
                : 'text-on-surface-variant dark:text-slate-400 bg-transparent hover:bg-surface-container-high dark:hover:bg-slate-800'
              }`}
          >
            {lang === 'vi' ? `Tất cả bệnh nhân (${patients.length})` : `All Ward Patients (${patients.length})`}
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low dark:bg-slate-950 border-b border-outline-variant dark:border-slate-800">
                <th className="px-lg py-3 font-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-widest text-[11px]">{lang === 'vi' ? 'Giường' : 'Bed #'}</th>
                <th className="px-lg py-3 font-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-widest text-[11px]">{lang === 'vi' ? 'Bệnh nhân' : 'Patient Name'}</th>
                <th className="px-lg py-3 font-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-widest text-[11px]">{lang === 'vi' ? 'Tuổi/Giới' : 'Age/Gender'}</th>
                <th className="px-lg py-3 font-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-widest text-[11px]">{lang === 'vi' ? 'Chẩn đoán chính' : 'Primary Diagnosis'}</th>
                <th className="px-lg py-3 font-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-widest text-[11px]">{lang === 'vi' ? 'Bác sĩ phụ trách' : 'Attending Doctor'}</th>
                <th className="px-lg py-3 font-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-widest text-[11px]">{lang === 'vi' ? 'Mức độ nguy cơ' : 'Risk Level'}</th>
                <th className="px-lg py-3 font-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-widest text-[11px] text-right">{lang === 'vi' ? 'Thao tác' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant dark:divide-slate-800">
              {patients.filter(p => {
                const matchesSearch = searchQuery === '' ||
                  p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.roomBed.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesFilter = patientFilterMode === 'all' || p.assignedToMe;
                return matchesSearch && matchesFilter;
              }).length > 0 ? (
                patients.filter(p => {
                  const matchesSearch = searchQuery === '' ||
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.roomBed.toLowerCase().includes(searchQuery.toLowerCase());

                  const matchesFilter = patientFilterMode === 'all' || p.assignedToMe;
                  return matchesSearch && matchesFilter;
                }).map((pat) => (
                  <tr key={pat.id} className="hover:bg-primary-container/5 dark:hover:bg-slate-800 transition-colors group">
                    <td className="px-lg py-4 font-data-mono text-primary dark:text-primary-fixed-dim font-bold">{pat.roomBed}</td>
                    <td className="px-lg py-4">
                      <div className="flex items-center gap-sm">
                        <img className="w-10 h-10 rounded-full object-cover border border-outline-variant" alt="Patient profile avatar" src={pat.avatar} />
                        <div>
                          <p className="font-bold text-on-surface dark:text-white leading-tight">{pat.name}</p>
                          <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1">ID: {pat.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-lg py-4 text-on-surface dark:text-slate-300">{pat.age}y / {pat.gender}</td>
                    <td className="px-lg py-4 text-on-surface dark:text-slate-300">
                      <span className="font-semibold block">{pat.diagnosis}</span>
                      <p className="text-[11px] text-on-surface-variant dark:text-slate-400 italic mt-0.5">{pat.diagnosisDetail}</p>
                    </td>
                    <td className="px-lg py-4 text-on-surface dark:text-slate-300">
                      <div className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[16px] text-primary dark:text-primary-fixed-dim">stethoscope</span>
                        <span className="text-xs font-medium">{pat.doctor}</span>
                      </div>
                    </td>
                    <td className="px-lg py-4">
                      {pat.condition === 'High Risk' ? (
                        <span className="px-2 py-1 rounded bg-error-container dark:bg-red-955/40 text-on-error-container dark:text-red-400 font-bold text-[10px] uppercase tracking-wider border border-error/20 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                          {lang === 'vi' ? 'Nguy cơ cao' : 'High Risk'}
                        </span>
                      ) : pat.condition === 'Stable' ? (
                        <span className="px-2 py-1 rounded bg-secondary-container dark:bg-teal-955/40 text-on-secondary-container dark:text-teal-400 font-bold text-[10px] uppercase tracking-wider border border-secondary/20 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          {lang === 'vi' ? 'Nguy cơ thấp' : 'Low Risk'}
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-tertiary-fixed dark:bg-amber-955/40 text-on-tertiary-fixed dark:text-amber-400 font-bold text-[10px] uppercase tracking-wider border border-tertiary/20 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                          {lang === 'vi' ? 'Nguy cơ trung bình' : 'Medium Risk'}
                        </span>
                      )}
                    </td>
                    <td className="px-lg py-4 text-right">
                      <div className="flex justify-end gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => alert(`View Clinical Chart for ${pat.name}`)}
                          className="px-3 py-1.5 bg-primary dark:bg-primary-container text-white dark:text-on-primary-container text-xs font-bold rounded shadow-sm hover:brightness-110 transition-colors border-none cursor-pointer"
                        >
                          View Chart
                        </button>
                        <button
                          onClick={() => { setSelectedNotesPatId(pat.id); setActiveTab('Ghi chú lâm sàng'); }}
                          className="px-3 py-1.5 bg-secondary dark:bg-teal-750 text-white dark:text-on-secondary text-xs font-bold rounded shadow-sm hover:brightness-110 transition-colors border-none cursor-pointer"
                        >
                          {lang === 'vi' ? 'Ghi chú' : 'Notes'}
                        </button>
                        <button
                          onClick={() => { setActiveTab('Chỉ số sinh tồn'); setSelectedPatId(pat.id); }}
                          className="px-3 py-1.5 border border-outline dark:border-slate-700 text-on-surface-variant dark:text-slate-300 text-xs font-bold rounded hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors bg-transparent cursor-pointer"
                        >
                          Add Obs
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-lg py-8 text-center text-on-surface-variant dark:text-slate-500 font-medium">
                    {lang === 'vi' ? 'Không tìm thấy bệnh nhân nào.' : 'No patients found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-lg py-3 bg-surface-container-low dark:bg-slate-950 flex justify-between items-center border-t border-outline-variant dark:border-slate-800 text-xs text-on-surface-variant dark:text-slate-400">
          <p>Showing <span className="font-bold">{patients.filter(p => {
            const matchesSearch = searchQuery === '' ||
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.roomBed.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilter = patientFilterMode === 'all' || p.assignedToMe;
            return matchesSearch && matchesFilter;
          }).length}</span> of <span className="font-bold">{patients.length}</span> patients</p>

          <div className="flex gap-xs">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-none cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant dark:border-slate-800 bg-primary text-white dark:bg-primary-container dark:text-on-primary-container font-bold text-xs border-none cursor-pointer">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-xs border-none cursor-pointer">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-none cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Bottom Widgets (Quick Stats) */}
      <div className="mt-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 p-md rounded-xl flex items-center gap-md shadow-sm transition-colors">
          <div className="w-12 h-12 bg-error-container dark:bg-red-955/20 rounded-full flex items-center justify-center text-error dark:text-red-400">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
          </div>
          <div>
            <p className="text-[11px] text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wider">{lang === 'vi' ? 'Cảnh báo khẩn' : 'Critical Alerts'}</p>
            <p className="text-2xl font-black text-on-background dark:text-white mt-0.5">{patients.filter(p => p.condition === 'High Risk').length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 p-md rounded-xl flex items-center gap-md shadow-sm transition-colors">
          <div className="w-12 h-12 bg-primary-fixed dark:bg-primary-container/20 rounded-full flex items-center justify-center text-primary dark:text-primary-fixed-dim">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bed</span>
          </div>
          <div>
            <p className="text-[11px] text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wider">{lang === 'vi' ? 'Mật độ giường' : 'Bed Occupancy'}</p>
            <p className="text-2xl font-black text-on-background dark:text-white mt-0.5">{Math.round((patients.length / 24) * 100)}%</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 p-md rounded-xl flex items-center gap-md shadow-sm transition-colors">
          <div className="w-12 h-12 bg-secondary-container dark:bg-teal-955/20 rounded-full flex items-center justify-center text-secondary dark:text-teal-400">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_turned_in</span>
          </div>
          <div>
            <p className="text-[11px] text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wider">{lang === 'vi' ? 'Theo dõi cần làm' : 'Observations Due'}</p>
            <p className="text-2xl font-black text-on-background dark:text-white mt-0.5">04</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 p-md rounded-xl flex items-center gap-md shadow-sm transition-colors">
          <div className="w-12 h-12 bg-tertiary-fixed dark:bg-amber-955/20 rounded-full flex items-center justify-center text-tertiary dark:text-amber-400">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          </div>
          <div>
            <p className="text-[11px] text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wider">{lang === 'vi' ? 'Xét nghiệm chờ' : 'Pending Labs'}</p>
            <p className="text-2xl font-black text-on-background dark:text-white mt-0.5">11</p>
          </div>
        </div>
      </div>

      {/* Admit New Patient FAB Button */}
      <button
        onClick={() => {
          const name = prompt(lang === 'vi' ? 'Nhập tên bệnh nhân:' : 'Enter patient name:');
          if (!name) return;
          const age = parseInt(prompt(lang === 'vi' ? 'Tuổi:' : 'Age:')) || 45;
          const gender = prompt(lang === 'vi' ? 'Giới tính (M/F):' : 'Gender (M/F):') || 'M';
          const diagnosis = prompt(lang === 'vi' ? 'Chẩn đoán chính:' : 'Primary Diagnosis:') || 'General Observation';
          const roomBed = prompt(lang === 'vi' ? 'Phòng - Giường (ví dụ 4C-20):' : 'Room-Bed (e.g. 4C-20):') || '4C-20';
          const doctor = prompt(lang === 'vi' ? 'Bác sĩ phụ trách:' : 'Attending Doctor:') || 'Dr. Julian Reed';

          const newPat = {
            id: `#BN-${Math.floor(10000 + Math.random() * 90000)}`,
            roomBed,
            name,
            age,
            gender,
            condition: 'Stable',
            nextObs: '12:00 PM',
            status: 'ON_TRACK',
            admissionDate: new Date().toISOString().split('T')[0],
            doctor,
            bpm: 75,
            bp: '120/80',
            spo2: 98,
            temp: 36.8,
            diagnosis,
            diagnosisDetail: 'Admitted recently, Stable',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO0qF7sZAPmSvu21x2jAN-YjKqVtEhbaP4kYFUusTXaEzrnkJZWDVxxiMmvq8iCTIMqNNLwVVcmDwLXVkItLnKlmq8VEwHc5DskJmX-1HqvjZczx4DQkZZDL0G_GVAvtQgmLYpE0ziRJ8iG3J1D2jO0twzidMQArR5rArc0BcYHff24kMZoGYzvk3llv3quk9nlEiVJU05WD33e8rKEgeJVFyhrZwGPMB9nWzm7qlCmRSn1TBjzCaZ',
            assignedToMe: true
          };
          setPatients([newPat, ...patients]);
          alert(lang === 'vi' ? `Đã nhập viện thành công bệnh nhân ${name}!` : `Admitted new patient ${name} successfully!`);
        }}
        className="fixed bottom-lg right-lg w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 border-none cursor-pointer group"
      >
        <span className="material-symbols-outlined text-[32px]">add</span>
        <div className="absolute right-16 px-3 py-2 bg-inverse-surface text-inverse-on-surface rounded font-label-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap text-xs">
          Admit New Patient
        </div>
      </button>
    </div>
  );
}
