import React from 'react';

export default function DoctorDashboardTab({
  lang,
  t,
  handleNewConsultation,
  setActiveTab,
  filteredSchedule,
  activePatientId,
  setActivePatientId,
  handleStartConsult,
  activePatient,
}) {
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md">
        <div className="text-left">
          <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white">
            {lang === 'vi' ? 'Bảng điều khiển Bác sĩ' : 'Doctor Dashboard'}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">
            {lang === 'vi' ? 'Thứ Hai, Ngày 24 Tháng 10 • Lịch trình Lâm sàng' : 'Monday, Oct 24 • Clinical Schedule'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => alert('Danh sách bệnh nhân vừa kiểm tra')}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface dark:text-slate-200 hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">history</span>
            {lang === 'vi' ? 'Bệnh nhân Gần đây' : 'Recent Patients'}
          </button>
          <button
            onClick={handleNewConsultation}
            className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg font-label-md text-label-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            {lang === 'vi' ? 'Bắt đầu Khám' : 'Start Consultation'}
          </button>
        </div>
      </div>

      {/* Bento Grid Wrapper */}
      <div className="grid grid-cols-12 gap-gutter">

        {/* Left Column: Stats & Schedule Table */}
        <div className="col-span-12 lg:col-span-8 space-y-gutter">

          {/* Summary Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
            <div
              onClick={() => setActiveTab('Appointments')}
              className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary-fixed-dim transition-colors cursor-pointer group text-left"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary-fixed rounded-lg text-primary">
                  <span className="material-symbols-outlined">event_note</span>
                </div>
                <span className="text-secondary dark:text-teal-400 font-label-md text-[11px]">+2 vs yesterday</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">{lang === 'vi' ? 'Lịch hẹn hôm nay' : 'Appointments Today'}</p>
              <h3 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mt-1">12</h3>
              <div className="mt-4 w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                <div className="bg-primary dark:bg-primary-fixed-dim h-full w-[65%]"></div>
              </div>
            </div>

            <div
              onClick={() => alert('Danh sách bệnh nhân đang đợi')}
              className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary-fixed-dim transition-colors cursor-pointer group text-left"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-secondary-fixed rounded-lg text-on-secondary-container">
                  <span className="material-symbols-outlined">hourglass_empty</span>
                </div>
                <span className="text-error font-label-md text-[11px]">Avg. 14min wait</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">{lang === 'vi' ? 'Bệnh nhân đang chờ' : 'Patients Waiting'}</p>
              <h3 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mt-1">4</h3>
              <div className="mt-4 w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[30%]"></div>
              </div>
            </div>

            <div
              onClick={() => setActiveTab('Lab Results')}
              className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl shadow-sm hover:border-error transition-colors cursor-pointer group text-left"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-error-container rounded-lg text-error">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <span className="text-error font-label-md text-[11px] animate-pulse">Critical Action</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">{lang === 'vi' ? 'Xét nghiệm khẩn' : 'Urgent Labs'}</p>
              <h3 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mt-1">3</h3>
              <div className="mt-4 w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                <div className="bg-error h-full w-full"></div>
              </div>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">{lang === 'vi' ? 'Lịch trình khám hôm nay' : "Today's Schedule"}</h4>
                <div className="flex bg-surface-container-low dark:bg-slate-700 rounded-lg p-0.5 border border-outline-variant dark:border-slate-600">
                  <button className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md shadow-sm font-label-md text-label-md text-primary dark:text-white">List</button>
                  <button onClick={() => alert('Mở lịch làm việc tổng quan')} className="px-3 py-1 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 hover:text-on-surface">Calendar</button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => alert('Lọc lịch khám')} className="p-2 hover:bg-surface-container-high dark:hover:bg-slate-700 rounded-lg text-on-surface-variant dark:text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
                </button>
                <button onClick={() => window.print()} className="p-2 hover:bg-surface-container-high dark:hover:bg-slate-700 rounded-lg text-on-surface-variant dark:text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">print</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-surface-container-low dark:bg-slate-900/20 border-b border-outline-variant dark:border-slate-700">
                    <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{lang === 'vi' ? 'Giờ khám' : 'Time'}</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{lang === 'vi' ? 'Họ và tên bệnh nhân' : 'Patient Name'}</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{lang === 'vi' ? 'Lý do khám' : 'Reason'}</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{lang === 'vi' ? 'Trạng thái' : 'Status'}</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant dark:divide-slate-700">
                  {filteredSchedule.map((p) => {
                    const isConsulting = p.status === 'IN CONSULT';
                    const isArrived = p.status === 'ARRIVED';
                    const isWaiting = p.status === 'WAITING';
                    return (
                      <tr
                        key={p.id}
                        onClick={() => setActivePatientId(p.id)}
                        className={`clinical-table-row group hover:bg-primary-fixed/5 dark:hover:bg-slate-700/50 transition-colors cursor-pointer ${activePatientId === p.id ? 'bg-primary-fixed/10 dark:bg-slate-700/30' : ''
                          }`}
                      >
                        <td className={`px-4 py-4 font-data-mono text-data-mono font-bold ${isConsulting ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}>
                          {p.time}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[13px] ${isWaiting
                              ? 'bg-secondary-fixed-dim text-on-secondary-fixed'
                              : 'bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-white'
                              }`}>
                              {p.initials}
                            </div>
                            <span className="font-body-md text-body-md text-on-surface dark:text-white font-semibold">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-body-sm text-body-sm text-on-surface-variant dark:text-slate-300">
                          {p.reason}
                        </td>
                        <td className="px-4 py-4">
                          {isConsulting ? (
                            <span className="bg-primary-fixed text-primary dark:text-teal-900 px-3 py-1 rounded-full font-label-md text-[11px] flex items-center gap-1 w-fit">
                              <span className="w-1.5 h-1.5 bg-primary dark:bg-teal-500 rounded-full animate-pulse"></span>
                              IN CONSULT
                            </span>
                          ) : isWaiting ? (
                            <span className="bg-secondary-container text-on-secondary-container dark:text-teal-900 px-3 py-1 rounded-full font-label-md text-[11px] w-fit block">
                              WAITING (5m)
                            </span>
                          ) : isArrived ? (
                            <span className="bg-secondary-container text-on-secondary-container dark:text-teal-900 px-3 py-1 rounded-full font-label-md text-[11px] w-fit block">
                              ARRIVED
                            </span>
                          ) : (
                            <span className="bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-400 px-3 py-1 rounded-full font-label-md text-[11px] w-fit block">
                              PENDING
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-right">
                          {isConsulting ? (
                            <button onClick={(e) => { e.stopPropagation(); alert(`Báo cáo bệnh án cho ${p.name}`); }} className="text-primary dark:text-primary-fixed-dim hover:underline font-label-md text-label-md">Open Chart</button>
                          ) : (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStartConsult(p.id); }}
                              className="bg-primary hover:bg-primary-container text-white px-3 py-1.5 rounded-lg font-label-md text-[12px] opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Start Now
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-surface-container-lowest dark:bg-slate-800 border-t border-outline-variant dark:border-slate-700 flex justify-center">
              <button onClick={() => alert('Xem toàn bộ lịch trình')} className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:underline">
                View Full Day Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Urgent Alerts & Active Case Details */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter">
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-sm text-left">
            <div className="p-4 border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface dark:bg-slate-900/50">
              <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">{lang === 'vi' ? 'Cảnh báo khẩn cấp' : 'Urgent Alerts'}</h4>
              <span className="bg-error text-white text-[10px] px-2 py-0.5 rounded-full font-bold">3 NEW</span>
            </div>
            <div className="flex-grow overflow-y-auto max-h-[290px] custom-scrollbar">
              <div onClick={() => alert('Xét nghiệm máu Robert Chen critical')} className="p-4 border-b border-outline-variant dark:border-slate-700 hover:bg-error-container/5 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-error-container rounded-full flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-[20px]">biotech</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface dark:text-white">Lab: Potassium Critical</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-0.5">Patient: Robert Chen (MRN-9210)</p>
                    <p className="text-error font-data-mono text-[13px] mt-2 font-bold">Value: 6.2 mmol/L</p>
                    <p className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400 mt-1">Received: 14 mins ago</p>
                  </div>
                </div>
              </div>

              <div onClick={() => alert('Kết quả điện tim abnormal rhythm')} className="p-4 border-b border-outline-variant dark:border-slate-700 hover:bg-error-container/5 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-error-container rounded-full flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-[20px]">ecg</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface dark:text-white">STAT ECG: Abnormal Rhythm</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-0.5">Patient: Elena Rodriguez (MRN-4421)</p>
                    <p className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400 mt-2">Received: 32 mins ago</p>
                  </div>
                </div>
              </div>

              <div onClick={() => alert('Xác minh liều thuốc Warfarin')} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-surface-container-high dark:bg-slate-700 rounded-full flex items-center justify-center text-on-surface-variant dark:text-slate-300">
                    <span className="material-symbols-outlined text-[20px]">medication</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface dark:text-white">Pharmacy Callback Required</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-0.5">Warfarin dose verification needed</p>
                    <p className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400 mt-2">Received: 1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => alert('Mở tất cả cảnh báo')} className="p-4 text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:bg-primary-fixed/20 transition-colors border-t border-outline-variant dark:border-slate-700 text-center">
              {lang === 'vi' ? 'Xem toàn bộ cảnh báo' : 'View All Critical Notifications'}
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-5 shadow-sm text-left">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase">
                Vitals: {activePatient.name}
              </h5>
              <button onClick={() => alert(`Chi tiết sinh hiệu ${activePatient.name}`)} className="text-primary dark:text-primary-fixed-dim">
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-error-container/10 border border-error-container/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                  <span className="font-body-md text-body-md text-on-surface dark:text-slate-300">BP</span>
                </div>
                <span className="font-data-mono text-data-mono font-bold text-error">
                  {activePatient.vitals.bp}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-container-low dark:bg-slate-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">air</span>
                  <span className="font-body-md text-body-md text-on-surface dark:text-slate-300">SpO2</span>
                </div>
                <span className="font-data-mono text-data-mono font-bold text-on-surface dark:text-white">
                  {activePatient.vitals.spo2}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-container-low dark:bg-slate-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary dark:text-amber-500">device_thermostat</span>
                  <span className="font-body-md text-body-md text-on-surface dark:text-slate-300">Temp</span>
                </div>
                <span className="font-data-mono text-data-mono font-bold text-on-surface dark:text-white">
                  {activePatient.vitals.temp}
                </span>
              </div>
            </div>
          </div>

          <div className="relative h-48 rounded-xl overflow-hidden border border-outline-variant dark:border-slate-800 group">
            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-[0.4]"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-g4VCTBWpxusGm5S2tw_9-G3ytEsM_ihlGl-OkIk5x5uWs94DsGt2IM2lX62R2axBTWQrRf_JqTBQjfW0uiirwpOPMQVDsww9TaWKlJhzhITtRkc50Le51avkiy_d1MDGdypH_2VNfxlrEA-xHOZwzfy0FWFqdqA3VIPM5RpTalIkyCcapjuaPrz0ZrEm7pMkcDbOTirfr0PrF_TT2cmGeb3o4HkD3sAIJuVg3oU5CyQP1HSi47kO')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent p-5 flex flex-col justify-end text-white text-left z-10">
              <h6 className="font-headline-md text-headline-md text-white">AI Insights Active</h6>
              <p className="font-body-sm text-body-sm text-white/90">
                Predictive risk analysis is running for 12 patient records. View updated scoring in the patient tab.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
