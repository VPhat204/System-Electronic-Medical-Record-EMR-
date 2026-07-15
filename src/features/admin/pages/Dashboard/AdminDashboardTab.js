import React from 'react';

export default function AdminDashboardTab({ lang, t, onNavigate, usersList, logsList, setActiveTab }) {
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight">
            {lang === 'vi' ? 'Tổng quan hành chính' : 'Administrative Overview'}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">{t.adminSub}</p>
        </div>
        <div className="flex gap-sm">
          <button 
            onClick={() => alert('Đang xuất báo cáo hành chính...')}
            className="flex items-center gap-2 px-4 py-2 border border-outline dark:border-slate-700 text-on-surface dark:text-slate-200 font-label-md rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            {t.exportReport}
          </button>
          <button 
            onClick={() => onNavigate('doctor-dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-label-md rounded-lg hover:bg-surface-tint active:scale-[0.98] transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            {lang === 'vi' ? 'Khám lâm sàng mới' : 'New Consultation'}
          </button>
        </div>
      </div>

      {/* KPI row: Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow text-left">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-primary-fixed-dim/20 rounded-lg">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>bed</span>
            </div>
            <span className="text-secondary dark:text-teal-400 font-label-md text-[11px] font-bold">+2.4% vs last week</span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant dark:text-slate-400 text-[11px] uppercase tracking-wider font-bold">{t.bedOccupancy}</p>
            <h3 className="text-headline-lg font-bold text-on-surface dark:text-white mt-1">87.4%</h3>
          </div>
          <div className="w-full bg-surface-container-highest dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary dark:bg-primary-fixed-dim h-full w-[87%]"></div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow text-left">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-teal-500/10 rounded-lg">
              <span className="material-symbols-outlined text-secondary dark:text-teal-400">timer</span>
            </div>
            <span className="text-error font-label-md text-[11px] font-bold">+12m surge</span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant dark:text-slate-400 text-[11px] uppercase tracking-wider font-bold">{t.avgWaitTime}</p>
            <h3 className="text-headline-lg font-bold text-on-surface dark:text-white mt-1">24m</h3>
          </div>
          <div className="flex gap-1 items-end h-8 mt-2.5">
            <div className="h-4 w-1.5 bg-secondary dark:bg-teal-500 rounded-full"></div>
            <div className="h-6 w-1.5 bg-secondary dark:bg-teal-500 rounded-full"></div>
            <div className="h-8 w-1.5 bg-secondary dark:bg-teal-500 rounded-full"></div>
            <div className="h-5 w-1.5 bg-secondary dark:bg-teal-500 rounded-full"></div>
            <div className="h-7 w-1.5 bg-error rounded-full"></div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow text-left">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
            <span className="text-secondary dark:text-teal-400 font-label-md text-[11px] font-bold">On target</span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant dark:text-slate-400 text-[11px] uppercase tracking-wider font-bold">{t.dailyRevenue}</p>
            <h3 className="text-headline-lg font-bold text-on-surface dark:text-white mt-1">$142.8k</h3>
          </div>
          <p className="text-body-sm text-on-surface-variant dark:text-slate-400 mt-4 border-t border-slate-100 dark:border-slate-700 pt-1">
            Forecast: $155k by EOD
          </p>
        </div>

        {/* KPI 4 */}
        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow text-left">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-slate-500/10 rounded-lg">
              <span className="material-symbols-outlined text-on-surface dark:text-slate-200" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
            </div>
            <span className="text-on-surface-variant dark:text-slate-400 font-label-md text-[11px] font-bold">92% active</span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant dark:text-slate-400 text-[11px] uppercase tracking-wider font-bold">{t.activeStaff}</p>
            <h3 className="text-headline-lg font-bold text-on-surface dark:text-white mt-1">{usersList.length} / 450</h3>
          </div>
          <div className="flex -space-x-2 mt-4 overflow-hidden">
            {usersList.slice(0, 3).map(user => (
              <img 
                key={user.id}
                className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 object-cover" 
                alt="Staff avatar"
                src={user.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtWr4DtmR8B0_in-_gqoKoZVzPdHwgxOleFY_FKFj_wErPD6UsQQqs6ZJw0QdiIoDJYQ_2mCa4dsKrZ3q6b1B2LlP4_ySXqj2BuRPZy1UG3SMtAK1hgxGJPUTYE0t0MddfC2sT-A6WWGOMintZelgmuI-VNTxbHfHm20n86USjV9ylra6OtdGybma8CS0KSegsXALWLV18QNiDhl7FioTutX6vn6gWU7zUNEeABBzoRjMZbBTIJakb'} 
              />
            ))}
            <div className="w-6 h-6 rounded-full bg-surface-container-high dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[9px] font-bold text-on-surface dark:text-white">
              +{450 - usersList.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Charts & Monitoring */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Resource Monitoring (Dept Workload) */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow text-left">
          <div className="p-6 border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface-container-lowest dark:bg-slate-900/60">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">analytics</span>
              {t.deptWorkload}
            </h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400">
                <span className="w-2.5 h-2.5 bg-primary dark:bg-primary-fixed-dim rounded-full"></span> {t.admissions}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400">
                <span className="w-2.5 h-2.5 bg-secondary dark:bg-teal-500 rounded-full"></span> {t.discharges}
              </span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between gap-6">
            {/* Simulated Chart */}
            <div className="flex-1 grid grid-cols-6 items-end gap-md md:gap-6 min-h-[180px] select-none">
              {[
                { name: 'ER', load: 80, detail: 'High' },
                { name: 'ICU', load: 95, detail: 'Surge' },
                { name: 'Surg', load: 50, detail: 'Normal' },
                { name: 'Ped', load: 65, detail: 'Normal' },
                { name: 'Cardio', load: 40, detail: 'Low' },
                { name: 'Radiol', load: 75, detail: 'High' }
              ].map(bar => (
                <div key={bar.name} className="flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                  <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t-lg relative flex flex-col justify-end h-full">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 ${bar.load >= 90 ? 'bg-error' : bar.load >= 70 ? 'bg-primary dark:bg-primary-fixed-dim' : 'bg-secondary dark:bg-teal-500'}`} 
                      style={{ height: `${bar.load}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-10">
                        {bar.load}% ({bar.detail})
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-on-surface-variant dark:text-slate-400">{bar.name}</span>
                </div>
              ))}
            </div>

            {/* Alert Banner in Module */}
            <div className="bg-error-container/60 dark:bg-red-950/20 border border-error/20 p-4 rounded-lg flex items-start gap-3">
              <span className="material-symbols-outlined text-error dark:text-red-400 mt-0.5">warning</span>
              <p className="text-body-sm text-on-error-container dark:text-red-300">
                <strong>ICU Capacity Alert:</strong> {t.icuAlert}
              </p>
            </div>
          </div>
        </div>

        {/* System Alerts & Notifications */}
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow text-left">
          <div className="p-6 border-b border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900/60">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.systemHealth}</h3>
          </div>
          <div className="p-4 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
            {logsList.slice(0, 3).map(log => {
              const isCritical = log.level === 'ERROR';
              const isWarning = log.level === 'WARNING';
              return (
                <div 
                  key={log.id} 
                  className={`p-3 border-l-4 rounded flex gap-3 text-left ${isCritical 
                    ? 'bg-error-container/10 border-error' 
                    : isWarning 
                      ? 'bg-amber-500/5 border-amber-500' 
                      : 'bg-teal-500/5 border-teal-500'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[20px] flex-shrink-0 ${isCritical ? 'text-error' : isWarning ? 'text-amber-600 dark:text-amber-400' : 'text-secondary dark:text-teal-500'}`}>
                    {isCritical ? 'lock' : isWarning ? 'build' : 'check_circle'}
                  </span>
                  <div>
                    <p className="font-label-md text-[12px] text-on-surface dark:text-white font-bold">{log.level} Alert</p>
                    <p className="text-[11px] text-on-surface-variant dark:text-slate-400 leading-normal mt-0.5">{log.actionText}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-4 border-t border-outline-variant dark:border-slate-700">
            <button 
              onClick={() => setActiveTab('System Logs')}
              className="w-full py-2 bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-200 font-label-md rounded-lg hover:bg-surface-container-highest dark:hover:bg-slate-600 transition-colors text-center text-body-sm font-semibold"
            >
              {lang === 'vi' ? 'Xem toàn bộ nhật ký' : 'View All System Logs'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
