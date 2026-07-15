import React from 'react';

export default function ReceptionistPatientsTab({
  lang,
  t,
  setIsAddPatientOpen,
  checkinsTodayCount,
  patientSearch,
  setPatientSearch,
  insuranceFilter,
  setInsuranceFilter,
  filteredPatients,
  patients,
  handleCheckInPatientFromList,
}) {
  return (
    <>
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-lg text-left">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mb-xs">{t.patientsTitle}</h1>
          <p className="text-body-md text-on-surface-variant dark:text-slate-400">{t.patientsSubtitle}</p>
        </div>
        <div className="flex flex-wrap gap-md">
          <button
            onClick={() => alert(lang === 'vi' ? 'Hiển thị nhật ký check-in hành chính bệnh nhân gần đây.' : 'Showing recent patient check-in log details.')}
            className="bg-surface-container-lowest dark:bg-slate-800 border border-outline dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-700 px-lg py-2 rounded-lg text-label-md text-primary dark:text-primary-fixed-dim flex items-center gap-2 transition-colors active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">history</span>
            {t.checkinHistory}
          </button>
          <button
            onClick={() => alert(lang === 'vi' ? 'Vui lòng chọn bệnh nhân trong bảng để cập nhật bảo hiểm.' : 'Please select a patient in the grid to update insurance.')}
            className="bg-surface-container-lowest dark:bg-slate-800 border border-outline dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-700 px-lg py-2 rounded-lg text-label-md text-primary dark:text-primary-fixed-dim flex items-center gap-2 transition-colors active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">verified_user</span>
            {t.updateInsurance}
          </button>
          <button
            onClick={() => setIsAddPatientOpen(true)}
            className="bg-primary hover:bg-primary-container text-white px-lg py-2 rounded-lg text-label-md flex items-center gap-2 transition-all shadow-xs active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">add</span>
            {t.registerNewPatientBtn}
          </button>
        </div>
      </div>

      {/* Stats Summary Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md mb-xl text-left">
        {/* Total patients */}
        <div className="bg-surface-container-lowest dark:bg-slate-800 p-md border border-outline-variant dark:border-slate-700 rounded-xl">
          <div className="flex justify-between items-start mb-sm">
            <span className="text-label-md text-on-surface-variant dark:text-slate-400 uppercase">{t.totalPatients}</span>
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">groups</span>
          </div>
          <p className="font-headline-lg text-headline-lg text-on-surface dark:text-white">12,482</p>
          <p className="text-body-sm text-secondary dark:text-teal-400 mt-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            {t.trendingUp}
          </p>
        </div>

        {/* Checkin Today */}
        <div className="bg-surface-container-lowest dark:bg-slate-800 p-md border border-outline-variant dark:border-slate-700 rounded-xl">
          <div className="flex justify-between items-start mb-sm">
            <span className="text-label-md text-on-surface-variant dark:text-slate-400 uppercase">{t.checkinToday}</span>
            <span className="material-symbols-outlined text-secondary dark:text-teal-400">person_check</span>
          </div>
          <p className="font-headline-lg text-headline-lg text-on-surface dark:text-white">{checkinsTodayCount}</p>
          <p className="text-body-sm text-on-surface-variant dark:text-slate-400 mt-xs">{t.newPatientsCount}</p>
        </div>

        {/* Expired insurance count */}
        <div className="bg-surface-container-lowest dark:bg-slate-800 p-md border border-outline-variant dark:border-slate-700 rounded-xl">
          <div className="flex justify-between items-start mb-sm">
            <span className="text-label-md text-on-surface-variant dark:text-slate-400 uppercase">{t.expiredInsurance}</span>
            <span className="material-symbols-outlined text-error">warning</span>
          </div>
          <p className="font-headline-lg text-headline-lg text-error">15</p>
          <p className="text-body-sm text-error mt-xs font-semibold">{t.needUrgentUpdate}</p>
        </div>

        {/* Appointments today */}
        <div className="bg-surface-container-lowest dark:bg-slate-800 p-md border border-outline-variant dark:border-slate-700 rounded-xl">
          <div className="flex justify-between items-start mb-sm">
            <span className="text-label-md text-on-surface-variant dark:text-slate-400 uppercase">{t.appointmentsToday}</span>
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">event_available</span>
          </div>
          <p className="font-headline-lg text-headline-lg text-on-surface dark:text-white">32</p>
          <p className="text-body-sm text-on-surface-variant dark:text-slate-400 mt-xs">{t.punctualityRate}</p>
        </div>
      </div>

      {/* Table Card container */}
      <div className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-xs text-left">

        {/* Filters block */}
        <div className="p-md border-b border-outline-variant dark:border-slate-700 flex flex-col md:flex-row gap-md justify-between items-center bg-surface-container-low/30 dark:bg-slate-900/30">
          <div className="flex items-center gap-sm w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400">
                search
              </span>
              <input
                type="text"
                placeholder={t.searchPatientPlaceholder}
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none dark:text-white"
              />
            </div>
            <button className="p-2 border border-outline-variant dark:border-slate-700 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-300">filter_list</span>
            </button>
          </div>

          <div className="flex items-center gap-md w-full md:w-auto">
            <select
              value={insuranceFilter}
              onChange={(e) => setInsuranceFilter(e.target.value)}
              className="bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg px-md py-2 text-body-md focus:ring-1 focus:ring-primary outline-none cursor-pointer dark:text-white"
            >
              <option value={t.allInsurance}>{t.allInsurance}</option>
              <option value={lang === 'vi' ? 'Còn hiệu lực' : 'Active'}>{t.activeInsurance}</option>
              <option value={lang === 'vi' ? 'Hết hạn' : 'Expired'}>{t.expiredInsuranceFilter}</option>
              <option value={lang === 'vi' ? 'Chờ xác minh' : 'Pending verification'}>{t.pendingVerification}</option>
              <option value={lang === 'vi' ? 'Không có' : 'None'}>{t.noInsurance}</option>
            </select>
            <span className="text-body-sm text-on-surface-variant dark:text-slate-400 whitespace-nowrap">
              {t.showingRecords.replace('{start}', '1').replace('{end}', filteredPatients.length.toString()).replace('{total}', filteredPatients.length.toString())}
            </span>
          </div>
        </div>

        {/* Table list view */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-low dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700">
                <th className="px-md py-4 font-label-md text-on-surface-variant dark:text-slate-300">{t.fullName}</th>
                <th className="px-md py-4 font-label-md text-on-surface-variant dark:text-slate-300">{t.patientID}</th>
                <th className="px-md py-4 font-label-md text-on-surface-variant dark:text-slate-300">{t.phoneNumber}</th>
                <th className="px-md py-4 font-label-md text-on-surface-variant dark:text-slate-300">{t.insuranceStatus}</th>
                <th className="px-md py-4 font-label-md text-on-surface-variant dark:text-slate-300">{t.lastVisit}</th>
                <th className="px-md py-4 font-label-md text-on-surface-variant dark:text-slate-300 text-right pr-6">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant dark:divide-slate-700/60 text-body-md text-on-surface dark:text-slate-200">
              {filteredPatients.map((pat, idx) => {
                const activeIns = pat.insurance === 'Còn hiệu lực';
                const expiredIns = pat.insurance === 'Hết hạn';
                const pendingIns = pat.insurance === 'Chờ xác minh';

                return (
                  <tr key={pat.id} className={`${idx % 2 === 1 ? 'bg-slate-50/20 dark:bg-slate-900/10' : 'bg-white dark:bg-slate-800'} hover:bg-surface-container-low/50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer group`}>
                    <td className="px-md py-3">
                      <div className="flex items-center gap-md">
                        <img
                          className="w-9 h-9 rounded-full overflow-hidden bg-surface-container-highest dark:bg-slate-700 object-cover"
                          alt={pat.name}
                          src={pat.avatar}
                        />
                        <div>
                          <p className="font-semibold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">
                            {pat.name}
                          </p>
                          <p className="text-body-sm text-on-surface-variant dark:text-slate-400">
                            {lang === 'vi' ? pat.gender : pat.genderEn} • {pat.age} {lang === 'vi' ? 'tuổi' : 'y/o'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-md py-3 text-data-mono font-medium">{pat.mrn}</td>
                    <td className="px-md py-3 font-medium">{pat.phone}</td>
                    <td className="px-md py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${activeIns
                        ? 'bg-secondary-container/20 text-on-secondary-container dark:text-teal-400'
                        : expiredIns
                          ? 'bg-error-container text-on-error-container'
                          : pendingIns
                            ? 'bg-tertiary-fixed/30 text-on-tertiary-fixed-variant'
                            : 'bg-surface-container-highest dark:bg-slate-700 text-on-surface-variant dark:text-slate-300'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${activeIns ? 'bg-secondary dark:bg-teal-500' : expiredIns ? 'bg-error' : pendingIns ? 'bg-tertiary dark:bg-amber-500' : 'bg-outline'
                          }`}></span>
                        {lang === 'vi' ? pat.insurance : pat.insuranceEn}
                      </span>
                    </td>
                    <td className="px-md py-3 text-on-surface-variant dark:text-slate-300">{lang === 'vi' ? pat.lastVisit : (pat.lastVisit === 'Hôm nay' ? 'Today' : pat.lastVisit)}</td>
                    <td className="px-md py-3 text-right pr-6">
                      <div className="flex gap-sm justify-end">
                        <button
                          onClick={() => handleCheckInPatientFromList(pat)}
                          className="p-2 hover:bg-primary-container/20 text-primary dark:text-primary-fixed-dim rounded-lg transition-all"
                          title={lang === 'vi' ? 'Đón tiếp' : 'Check-in'}
                        >
                          <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                        </button>
                        <button
                          onClick={() => alert(`${lang === 'vi' ? 'Hồ sơ bệnh nhân' : 'Patient details'}: ${pat.name} - MRN: ${pat.mrn}`)}
                          className="p-2 hover:bg-surface-container-high dark:hover:bg-slate-700 rounded-lg transition-all"
                          title={lang === 'vi' ? 'Chi tiết' : 'Details'}
                        >
                          <span className="material-symbols-outlined text-[20px] text-on-surface-variant dark:text-slate-300">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="p-md border-t border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface-container-low/30 dark:bg-slate-900/30">
          <div className="hidden sm:block text-body-sm text-on-surface-variant dark:text-slate-400">
            {t.showingTotalPatientsCount.replace('{count}', filteredPatients.length.toString()).replace('{total}', patients.length.toString())}
          </div>
          <div className="flex items-center gap-xs">
            <button className="p-2 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700 disabled:opacity-30" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-white text-label-md">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700 text-label-md">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700 text-label-md">3</button>
            <span className="px-1 text-on-surface-variant">...</span>
            <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700 text-label-md">125</button>
            <button className="p-2 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
