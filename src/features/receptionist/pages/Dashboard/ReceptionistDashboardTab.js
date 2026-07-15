import React from 'react';

export default function ReceptionistDashboardTab({
  lang,
  t,
  handleProcessPayment,
  queue,
  searchQuery,
  setAssigningPatient,
  pendingBills,
  unverifiedInsurance,
  anthemVerified,
  handleVerifyInsurance,
  unitedAppealed,
  handleAppealInsurance,
  beds,
  handleToggleBed,
  patientType,
  setPatientType,
  checkInName,
  setCheckInName,
  checkInType,
  setCheckInType,
  handleCheckInSubmit,
}) {
  return (
    <>
      {/* Quick Action Row */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md text-left">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.receptionistDashboard}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">{t.centralAdmissionsBilling}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              const el = document.getElementById('patient-checkin-form');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary-container rounded font-label-md text-label-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">person_add</span>
            {t.newPatientCheckin}
          </button>
          <button
            onClick={handleProcessPayment}
            className="flex items-center gap-2 px-6 py-3 border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim rounded font-label-md text-label-md hover:bg-primary/5 transition-all"
          >
            <span className="material-symbols-outlined">payments</span>
            {t.processPayment}
          </button>
        </div>
      </div>

      {/* Bento Grid Panel Layout */}
      <div className="grid grid-cols-12 gap-gutter">

        {/* Active waiting queue list (7 columns) */}
        <section className="col-span-12 lg:col-span-7 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden clinical-shadow flex flex-col">
          <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50 flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">groups</span>
              {t.activeWaitingQueue}
            </h3>
            <span className="bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 px-md py-xs rounded text-[10px] font-bold uppercase tracking-wider">
              {queue.length} {lang === 'vi' ? 'Đang Chờ' : 'Waiting'}
            </span>
          </div>
          <div className="flex-grow overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low dark:bg-slate-900 text-on-surface-variant dark:text-slate-300 border-b border-outline-variant dark:border-slate-700">
                <tr>
                  <th className="px-md py-3 font-label-md text-label-md">{t.patientName}</th>
                  <th className="px-md py-3 font-label-md text-label-md">{t.dept}</th>
                  <th className="px-md py-3 font-label-md text-label-md">{t.waitTime}</th>
                  <th className="px-md py-3 font-label-md text-label-md">{t.status}</th>
                  <th className="px-md py-3 font-label-md text-label-md text-right">{t.action}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant dark:divide-slate-700/60 text-body-md text-on-surface dark:text-slate-200">
                {queue.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((p, idx) => (
                  <tr key={p.id} className={`${idx % 2 === 1 ? 'bg-slate-50/30 dark:bg-slate-900/10' : 'bg-white dark:bg-slate-800'} hover:bg-surface-container-low dark:hover:bg-slate-700/40 transition-colors`}>
                    <td className="px-md py-4">
                      <p className="font-semibold text-on-surface dark:text-white">{p.name}</p>
                      <p className="text-[11px] text-on-surface-variant dark:text-slate-400">MRN: {p.mrn}</p>
                    </td>
                    <td className="px-md py-4 font-medium">{p.department}</td>
                    <td className={`px-md py-4 font-semibold ${p.waitTime.includes('42') || p.waitTime.includes('30') ? 'text-error' : 'text-on-surface dark:text-slate-300'}`}>{p.waitTime}</td>
                    <td className="px-md py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${p.status === 'Delayed'
                        ? 'bg-error-container text-on-error-container'
                        : p.status === 'Normal'
                          ? 'bg-secondary-container/20 text-on-secondary-container dark:text-teal-400'
                          : 'bg-tertiary-fixed/30 text-tertiary dark:text-amber-500'
                        }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-md py-4 text-right">
                      <button
                        onClick={() => setAssigningPatient(p)}
                        className="text-primary dark:text-primary-fixed-dim hover:underline font-bold text-label-md whitespace-nowrap"
                      >
                        {t.assignRoom}
                      </button>
                    </td>
                  </tr>
                ))}
                {queue.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-on-surface-variant dark:text-slate-400">
                      <span className="material-symbols-outlined text-[48px] block mb-2 opacity-30">
                        inpatient
                      </span>
                      {t.noPatientsInQueue}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Billing & Insurance dashboard panel (5 columns) */}
        <section className="col-span-12 lg:col-span-5 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden clinical-shadow flex flex-col text-left">
          <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50">
            <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed-dim">receipt_long</span>
              {t.billingInsurance}
            </h3>
          </div>
          <div className="p-md space-y-4 flex-grow">
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={handleProcessPayment}
                className="bg-surface-container-low dark:bg-slate-900/55 p-md rounded-lg border border-outline-variant/30 dark:border-slate-700 cursor-pointer hover:border-primary transition-colors text-left"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-slate-400">{t.pendingBills}</p>
                <p className="text-headline-md font-bold text-tertiary dark:text-tertiary-fixed-dim mt-1">{pendingBills}</p>
              </div>
              <div className="bg-surface-container-low dark:bg-slate-900/55 p-md rounded-lg border border-outline-variant/30 dark:border-slate-700 text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-slate-400">{t.unverifiedInsurance}</p>
                <p className="text-headline-md font-bold text-error dark:text-red-405 mt-1">{unverifiedInsurance}</p>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-widest">{t.recentInsuranceTasks}</p>

              {/* Task item Anthem */}
              <div className={`flex items-center justify-between p-3 border border-outline-variant dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-xs ${anthemVerified ? 'opacity-55' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${anthemVerified ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : 'bg-primary-fixed dark:bg-slate-700 text-primary dark:text-primary-fixed-dim'}`}>
                    <span className="material-symbols-outlined text-[18px]">{anthemVerified ? 'check' : 'verified_user'}</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface dark:text-white">Anthem Blue Cross</p>
                    <p className="text-[11px] text-on-surface-variant dark:text-slate-400">For Patient: David G.</p>
                  </div>
                </div>
                {anthemVerified ? (
                  <span className="text-body-sm font-semibold text-green-500">VERIFIED</span>
                ) : (
                  <button
                    onClick={() => handleVerifyInsurance('Anthem')}
                    className="bg-secondary-container hover:bg-secondary/15 text-on-secondary-container dark:text-teal-400 text-[10px] font-bold px-3 py-1.5 rounded active:scale-[0.97]"
                  >
                    {t.verify}
                  </button>
                )}
              </div>

              {/* Task item United */}
              <div className={`flex items-center justify-between p-3 border border-outline-variant dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-xs ${unitedAppealed ? 'opacity-55' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-error-container text-on-error-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface dark:text-white">United HealthCare</p>
                    <p className="text-[11px] text-on-surface-variant dark:text-slate-400">Denied: #RX-2921</p>
                  </div>
                </div>
                {unitedAppealed ? (
                  <span className="text-body-sm font-semibold text-amber-500">APPEALED</span>
                ) : (
                  <button
                    onClick={() => handleAppealInsurance('United')}
                    className="text-primary dark:text-primary-fixed-dim text-[10px] font-bold px-3 py-1.5 hover:underline"
                  >
                    {t.appeal}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="p-md bg-surface-container-low dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 text-center">
            <button
              onClick={() => alert('Xem danh sách lịch sử bảo hiểm...')}
              className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:underline"
            >
              {t.viewAllBilling}
            </button>
          </div>
        </section>

        {/* Bed availability management (12 columns) */}
        <section className="col-span-12 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden clinical-shadow text-left">
          <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary dark:text-teal-400">bed</span>
              {t.wardAvailability}
            </h3>

            {/* Bed status color indicator legends */}
            <div className="flex flex-wrap items-center gap-md">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-surface-container-highest dark:bg-slate-700 rounded border border-outline dark:border-slate-600"></div>
                <span className="text-[11px] font-medium text-on-surface-variant dark:text-slate-300">{t.occupied} ({beds.filter(b => b.status === 'Occupied').length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-white dark:bg-slate-800 rounded border border-secondary dark:border-teal-500"></div>
                <span className="text-[11px] font-medium text-on-surface-variant dark:text-slate-300">{t.available} ({beds.filter(b => b.status === 'Available').length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-error/15 rounded border border-error"></div>
                <span className="text-[11px] font-medium text-on-surface-variant dark:text-slate-300">{t.cleaning} ({beds.filter(b => b.status === 'Cleaning').length})</span>
              </div>
            </div>
          </div>

          {/* Grid map array */}
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {beds.map(bed => {
              const isOcc = bed.status === 'Occupied';
              const isAvail = bed.status === 'Available';

              return (
                <div
                  key={bed.id}
                  onClick={() => handleToggleBed(bed.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded border transition-all cursor-pointer relative group ${isOcc
                    ? 'bg-surface-container-highest dark:bg-slate-700 border-outline dark:border-slate-600'
                    : isAvail
                      ? 'bg-white dark:bg-slate-800 border-2 border-secondary dark:border-teal-500 hover:shadow-md'
                      : 'bg-error/10 dark:bg-red-950/20 border border-error/40'
                    }`}
                  title={lang === 'vi' ? `Giường ${bed.id}: Nhấp để đổi trạng thái` : `Bed ${bed.id}: Click to cycle status`}
                >
                  <span className={`text-[10px] font-bold mb-1 ${isOcc ? 'text-on-surface-variant dark:text-slate-300' : isAvail ? 'text-secondary dark:text-teal-400' : 'text-error'}`}>
                    {bed.id}
                  </span>
                  <span className={`material-symbols-outlined text-2xl ${isOcc ? 'text-on-surface-variant dark:text-slate-300' : isAvail ? 'text-secondary dark:text-teal-400' : 'text-error'}`}>
                    {isOcc ? 'person' : isAvail ? 'bed' : 'cleaning_services'}
                  </span>

                  {/* Hover action overlay */}
                  <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center pointer-events-none">
                    <span className="bg-white dark:bg-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs text-on-surface dark:text-white">
                      CYCLE
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Detailed Patient Registration Check-in Portal form section */}
      <section id="patient-checkin-form" className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 text-left clinical-shadow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-outline-variant/35 dark:border-slate-700 pb-4 mb-6 gap-md">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white">{t.patientCheckinPortal}</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{t.registerNewReturning}</p>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-body-md font-semibold text-on-surface dark:text-white">
              <input
                checked={patientType === 'returning'}
                onChange={() => setPatientType('returning')}
                className="text-primary dark:text-primary-fixed-dim focus:ring-primary h-4 w-4 bg-transparent border-outline-variant"
                name="patient_type"
                type="radio"
              />
              <span>{t.returning}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-body-md font-semibold text-on-surface dark:text-white">
              <input
                checked={patientType === 'new'}
                onChange={() => setPatientType('new')}
                className="text-primary dark:text-primary-fixed-dim focus:ring-primary h-4 w-4 bg-transparent border-outline-variant"
                name="patient_type"
                type="radio"
              />
              <span>{t.newPatient}</span>
            </label>
          </div>
        </div>

        <form onSubmit={handleCheckInSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-xs">
            <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">{t.searchLabel}</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400">
                person_search
              </span>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={checkInName}
                onChange={(e) => setCheckInName(e.target.value)}
                className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg pl-10 pr-4 py-2 text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none dark:text-white"
              />
            </div>
          </div>
          <div className="flex flex-col gap-xs">
            <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">{t.appointmentType}</label>
            <select
              value={checkInType}
              onChange={(e) => setCheckInType(e.target.value)}
              className="w-full h-10 border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg text-body-md px-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none dark:text-white"
            >
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency Wing</option>
              <option value="Lab Work">Lab Diagnostics</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-primary text-white h-10 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all active:scale-[0.98] shadow-xs"
            >
              {t.validateEntry}
            </button>
          </div>
        </form>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-outline-variant/30 dark:border-slate-700/60">
          <div onClick={() => alert('Quét mã vạch tiếp nhận di động...')} className="flex gap-4 p-4 rounded-lg bg-surface-container-low dark:bg-slate-900 border border-transparent hover:border-outline-variant/40 transition-colors cursor-pointer text-left">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 flex items-center justify-center rounded-full border border-outline-variant dark:border-slate-700 shadow-xs">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">qr_code_scanner</span>
            </div>
            <div>
              <p className="font-bold text-on-surface dark:text-white">{t.scanQrCode}</p>
              <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{t.scanQrSub}</p>
            </div>
          </div>

          <div onClick={() => alert('Đang kết nối đầu đọc vân tay USB...')} className="flex gap-4 p-4 rounded-lg bg-surface-container-low dark:bg-slate-900 border border-transparent hover:border-outline-variant/40 transition-colors cursor-pointer text-left">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 flex items-center justify-center rounded-full border border-outline-variant dark:border-slate-700 shadow-xs">
              <span className="material-symbols-outlined text-secondary dark:text-teal-400">fingerprint</span>
            </div>
            <div>
              <p className="font-bold text-on-surface dark:text-white">{t.biometricId}</p>
              <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{t.biometricSub}</p>
            </div>
          </div>

          <div onClick={() => alert('Lượt tải Kiosk sảnh đợi: 3 thiết bị hoạt động bình thường.')} className="flex gap-4 p-4 rounded-lg bg-surface-container-low dark:bg-slate-900 border border-transparent hover:border-outline-variant/40 transition-colors cursor-pointer text-left">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 flex items-center justify-center rounded-full border border-outline-variant dark:border-slate-700 shadow-xs">
              <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed-dim">assignment_ind</span>
            </div>
            <div>
              <p className="font-bold text-on-surface dark:text-white">{t.kioskSupport}</p>
              <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{t.kioskSub}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
