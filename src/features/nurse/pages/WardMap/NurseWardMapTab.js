import React from 'react';

export default function NurseWardMapTab({
  lang,
  t,
  isDark,
  selectedFloor,
  setSelectedFloor,
  visiblePopover,
  setVisiblePopover,
  isWardAlertAcknowledged,
  setIsWardAlertAcknowledged,
  setActiveTab,
  setSelectedPatId
}) {
  return (
    selectedFloor === null ? (
      /* Hospital Floor Maps parent overview */
      <div className="space-y-lg text-left">
        {/* Page Header */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-md">
          <div>
            <h2 className="text-headline-xl font-headline-xl text-on-surface dark:text-white font-bold">
              {lang === 'vi' ? 'Sơ đồ các tầng của bệnh viện' : 'Hospital Floor Maps'}
            </h2>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400 mt-1">
              {lang === 'vi' ? 'Tình trạng lấp đầy giường và trạng thái lâm sàng theo thời gian thực tại các khoa.' : 'Real-time facility occupancy and clinical status across all departments.'}
            </p>
          </div>
          <div className="flex gap-sm">
            <button onClick={() => alert('Filter View')} className="flex items-center gap-2 px-md py-2 border border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-label-md font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-on-surface dark:text-slate-300">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              {lang === 'vi' ? 'Bộ lọc' : 'Filter View'}
            </button>
            <button onClick={() => alert('Sync Assets')} className="flex items-center gap-2 px-md py-2 border border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-label-md font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-on-surface dark:text-slate-300">
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              {lang === 'vi' ? 'Đồng bộ thiết bị' : 'Sync Assets'}
            </button>
          </div>
        </section>

        {/* Main Interactive Map Overview & Floor Selection */}
        <div className="grid grid-cols-12 gap-gutter">
          {/* Floor Stack Visualization */}
          <div className="col-span-12 lg:col-span-5 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-lg flex flex-col transition-colors shadow-sm">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white">
                {lang === 'vi' ? 'Hệ thống các tầng' : 'Facility Stack'}
              </h3>
              <span className="px-2 py-1 bg-secondary-container dark:bg-teal-955 text-on-secondary-container dark:text-teal-400 text-[10px] font-bold rounded uppercase tracking-wider">Live View</span>
            </div>
            <div className="flex-1 relative flex flex-col-reverse justify-between gap-base h-[600px] py-xl">
              {/* B - Logistics */}
              <div onClick={() => setSelectedFloor('B')} className="flex flex-col items-center group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className="w-full h-12 bg-surface-container-highest dark:bg-slate-800 border-x border-t border-outline dark:border-slate-700 flex items-center justify-center rounded-t shadow-sm">
                  <span className="text-label-md text-outline dark:text-slate-400 font-bold">B - Logistics &amp; Maintenance</span>
                </div>
                <div className="w-[110%] h-2 bg-black/10 dark:bg-black/35 rounded-full -mt-1 blur-sm"></div>
              </div>

              {/* F1 */}
              <div onClick={() => setSelectedFloor('F1')} className="flex flex-col items-center group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className="w-full h-16 bg-white dark:bg-slate-900 border border-primary/45 dark:border-primary-fixed-dim/45 flex items-center justify-center rounded shadow-md relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
                  <span className="text-label-md font-bold text-primary dark:text-primary-fixed-dim">F1 - Emergency Medicine</span>
                </div>
                <div className="w-[110%] h-2 bg-black/10 dark:bg-black/35 rounded-full -mt-1 blur-sm"></div>
              </div>

              {/* F2 - active layout */}
              <div onClick={() => setSelectedFloor('F2')} className="flex flex-col items-center group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className="w-full h-16 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 flex items-center justify-center rounded shadow-sm">
                  <span className="text-label-md font-bold text-on-surface dark:text-white">{lang === 'vi' ? 'F2 - Khoa Nội-Ngoại (Chọn để xem)' : 'F2 - Med-Surgical Unit (Click to view)'}</span>
                </div>
                <div className="w-[110%] h-2 bg-black/10 dark:bg-black/35 rounded-full -mt-1 blur-sm"></div>
              </div>

              {/* F3 */}
              <div onClick={() => setSelectedFloor('F3')} className="flex flex-col items-center group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className="w-full h-16 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 flex items-center justify-center rounded shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary"></div>
                  <span className="text-label-md font-bold text-on-surface dark:text-white">F3 - Intensive Care Unit</span>
                </div>
                <div className="w-[110%] h-2 bg-black/10 dark:bg-black/35 rounded-full -mt-1 blur-sm"></div>
              </div>

              {/* F4 */}
              <div onClick={() => setSelectedFloor('F4')} className="flex flex-col items-center group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className="w-full h-16 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 flex items-center justify-center rounded shadow-sm">
                  <span className="text-label-md font-bold text-on-surface dark:text-white">F4 - Pediatrics</span>
                </div>
                <div className="w-[110%] h-2 bg-black/10 dark:bg-black/35 rounded-full -mt-1 blur-sm"></div>
              </div>

              {/* F5 */}
              <div onClick={() => setSelectedFloor('F5')} className="flex flex-col items-center group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className="w-full h-16 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 flex items-center justify-center rounded shadow-sm">
                  <span className="text-label-md font-bold text-on-surface dark:text-white">F5 - Maternity &amp; Neonatal</span>
                </div>
                <div className="w-[110%] h-2 bg-black/10 dark:bg-black/35 rounded-full -mt-1 blur-sm"></div>
              </div>
            </div>
          </div>

          {/* Floor Detail Grid */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-md overflow-y-auto max-h-[700px] pr-2 custom-scrollbar">
            
            {/* Floor 1 Card (Priority/Alert) */}
            <div onClick={() => setSelectedFloor('F1')} className="bg-white dark:bg-slate-900 border-2 border-error/20 rounded-xl p-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 p-2">
                <span className="flex items-center gap-1 bg-error-container dark:bg-red-955 text-on-error-container dark:text-red-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[12px] filled-icon">warning</span>
                  4 ALERTS
                </span>
              </div>
              <div className="mb-lg">
                <p className="text-label-md text-outline uppercase tracking-wider text-[10px] font-bold">Level 01</p>
                <h4 className="text-headline-md font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">Emergency Dept.</h4>
              </div>
              <div className="space-y-md">
                <div>
                  <div className="flex justify-between text-label-md mb-base text-xs font-bold">
                    <span className="text-on-surface-variant dark:text-slate-400">Occupancy</span>
                    <span className="font-bold text-error">94%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-error rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-base border-t border-outline-variant dark:border-slate-800">
                  <div className="flex items-center gap-1 text-on-surface dark:text-slate-350">
                    <span className="material-symbols-outlined text-outline text-[18px]">bed</span>
                    <span className="text-body-sm font-semibold"><span className="font-bold">2</span> Available Beds</span>
                  </div>
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Floor 2 Card */}
            <div onClick={() => setSelectedFloor('F2')} className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group cursor-pointer text-left">
              <div className="mb-lg">
                <p className="text-label-md text-outline uppercase tracking-wider text-[10px] font-bold">Level 02</p>
                <h4 className="text-headline-md font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">Med-Surgical</h4>
              </div>
              <div className="space-y-md">
                <div>
                  <div className="flex justify-between text-label-md mb-base text-xs font-bold">
                    <span className="text-on-surface-variant dark:text-slate-400">Occupancy</span>
                    <span className="font-bold text-primary dark:text-primary-fixed-dim">88%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-base border-t border-outline-variant dark:border-slate-800">
                  <div className="flex items-center gap-1 text-on-surface dark:text-slate-350">
                    <span className="material-symbols-outlined text-outline text-[18px]">bed</span>
                    <span className="text-body-sm font-semibold"><span className="font-bold">8</span> Available Beds</span>
                  </div>
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Floor 3 Card (ICU) */}
            <div onClick={() => setSelectedFloor('F3')} className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 p-2">
                <span className="flex items-center gap-1 bg-tertiary-container dark:bg-amber-955 text-on-tertiary-container dark:text-amber-450 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[12px] filled-icon">vital_signs</span>
                  2 CRITICAL
                </span>
              </div>
              <div className="mb-lg">
                <p className="text-label-md text-outline uppercase tracking-wider text-[10px] font-bold">Level 03</p>
                <h4 className="text-headline-md font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">ICU</h4>
              </div>
              <div className="space-y-md">
                <div>
                  <div className="flex justify-between text-label-md mb-base text-xs font-bold">
                    <span className="text-on-surface-variant dark:text-slate-400">Occupancy</span>
                    <span className="font-bold text-tertiary dark:text-amber-455">75%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-base border-t border-outline-variant dark:border-slate-800">
                  <div className="flex items-center gap-1 text-on-surface dark:text-slate-350">
                    <span className="material-symbols-outlined text-outline text-[18px]">bed</span>
                    <span className="text-body-sm font-semibold"><span className="font-bold">4</span> Available Beds</span>
                  </div>
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Floor 4 Card (Pediatrics) */}
            <div onClick={() => setSelectedFloor('F4')} className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group cursor-pointer text-left">
              <div className="mb-lg">
                <p className="text-label-md text-outline uppercase tracking-wider text-[10px] font-bold">Level 04</p>
                <h4 className="text-headline-md font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">Pediatrics</h4>
              </div>
              <div className="space-y-md">
                <div>
                  <div className="flex justify-between text-label-md mb-base text-xs font-bold">
                    <span className="text-on-surface-variant dark:text-slate-400">Occupancy</span>
                    <span className="font-bold text-secondary dark:text-teal-400">60%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-base border-t border-outline-variant dark:border-slate-800">
                  <div className="flex items-center gap-1 text-on-surface dark:text-slate-350">
                    <span className="material-symbols-outlined text-outline text-[18px]">bed</span>
                    <span className="text-body-sm font-semibold"><span className="font-bold">12</span> Available Beds</span>
                  </div>
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Floor 5 Card (Maternity) */}
            <div onClick={() => setSelectedFloor('F5')} className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group cursor-pointer text-left">
              <div className="mb-lg">
                <p className="text-label-md text-outline uppercase tracking-wider text-[10px] font-bold">Level 05</p>
                <h4 className="text-headline-md font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">Maternity</h4>
              </div>
              <div className="space-y-md">
                <div>
                  <div className="flex justify-between text-label-md mb-base text-xs font-bold">
                    <span className="text-on-surface-variant dark:text-slate-400">Occupancy</span>
                    <span className="font-bold text-primary dark:text-primary-fixed-dim">88%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-base border-t border-outline-variant dark:border-slate-800">
                  <div className="flex items-center gap-1 text-on-surface dark:text-slate-350">
                    <span className="material-symbols-outlined text-outline text-[18px]">bed</span>
                    <span className="text-body-sm font-semibold"><span className="font-bold">5</span> Available Beds</span>
                  </div>
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Floor B Card (Basement) */}
            <div onClick={() => setSelectedFloor('B')} className="bg-slate-50 dark:bg-slate-950 border border-outline-variant dark:border-slate-800 rounded-xl p-md shadow-sm flex flex-col justify-between opacity-80 group cursor-pointer text-left">
              <div className="mb-lg">
                <p className="text-label-md text-outline uppercase tracking-wider text-[10px] font-bold">Basement</p>
                <h4 className="text-headline-md font-bold text-outline dark:text-slate-450 group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">Logistics / Lab</h4>
              </div>
              <div className="space-y-md">
                <div className="flex justify-center items-center py-sm bg-surface-container-highest dark:bg-slate-900 rounded border border-dashed border-outline-variant dark:border-slate-800">
                  <span className="text-[10px] text-outline font-bold">LIMITED CLINICAL ACCESS</span>
                </div>
                <div className="flex justify-between items-center pt-base border-t border-outline-variant dark:border-slate-800">
                  <div className="flex items-center gap-1 text-on-surface-variant dark:text-slate-400">
                    <span className="material-symbols-outlined text-outline text-[18px]">medical_services</span>
                    <span className="text-body-sm font-bold">Operational</span>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Global Stats Bar */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md mt-xl">
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 p-md rounded-lg flex items-center gap-md shadow-sm transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">domain</span>
            </div>
            <div>
              <p className="text-label-md text-outline dark:text-slate-400 text-xs font-bold">Total Facility</p>
              <p className="text-headline-md font-bold text-on-surface dark:text-white">81.2% <span className="text-body-sm font-normal text-on-surface-variant dark:text-slate-400">Occupancy</span></p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 p-md rounded-lg flex items-center gap-md shadow-sm transition-colors">
            <div className="w-12 h-12 rounded-full bg-error-container/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-error">priority_high</span>
            </div>
            <div>
              <p className="text-label-md text-outline dark:text-slate-400 text-xs font-bold">Critical Alerts</p>
              <p className="text-headline-md font-bold text-error">06 <span className="text-body-sm font-normal text-on-surface-variant dark:text-slate-400">Pending</span></p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 p-md rounded-lg flex items-center gap-md shadow-sm transition-colors">
            <div className="w-12 h-12 rounded-full bg-secondary-container/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary dark:text-teal-400">bed</span>
            </div>
            <div>
              <p className="text-label-md text-outline dark:text-slate-400 text-xs font-bold">Total Available</p>
              <p className="text-headline-md font-bold text-on-surface dark:text-white">31 <span className="text-body-sm font-normal text-on-surface-variant dark:text-slate-400">Beds</span></p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 p-md rounded-lg flex items-center gap-md shadow-sm transition-colors">
            <div className="w-12 h-12 rounded-full bg-tertiary-container/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary dark:text-amber-400">groups</span>
            </div>
            <div>
              <p className="text-label-md text-outline dark:text-slate-400 text-xs font-bold">Staff On-Duty</p>
              <p className="text-headline-md font-bold text-on-surface dark:text-white">142 <span className="text-body-sm font-normal text-on-surface-variant dark:text-slate-400">Active</span></p>
            </div>
          </div>
        </section>
      </div>
    ) : selectedFloor === 'F2' ? (
      /* Level 02: Medical-Surgical Room Layout Map (Current interface as child) */
      <div className="space-y-lg text-left">
        {/* Back breadcrumb */}
        <div className="mb-sm">
          <button 
            onClick={() => setSelectedFloor(null)}
            className="flex items-center gap-1 text-primary dark:text-primary-fixed-dim hover:underline font-bold text-xs bg-transparent border-none cursor-pointer p-0"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            {lang === 'vi' ? 'Quay lại sơ đồ tổng thể' : 'Back to Floor Overview'}
          </button>
        </div>

        {/* Header & Stats Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md mb-lg">
          <div>
            <nav className="flex gap-xs text-on-surface-variant dark:text-slate-400 font-label-md mb-xs">
              <span>{lang === 'vi' ? 'Bệnh nhân' : 'Patients'}</span>
              <span>/</span>
              <span className="text-primary dark:text-primary-fixed-dim font-bold">
                {lang === 'vi' ? 'Sơ đồ Tầng 2' : 'Floor 2 Map'}
              </span>
            </nav>
            <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold">
              {lang === 'vi' ? 'Khoa Nội - Ngoại Tổng Hợp (Tầng 2)' : 'Medical-Surgical Ward (Floor 2)'}
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-md">
            {/* Stat Card 1 */}
            <div className="bg-white dark:bg-slate-900 p-md border border-outline-variant dark:border-slate-800 rounded-xl flex flex-col gap-xs min-w-[160px] shadow-sm">
              <span className="text-on-surface-variant dark:text-slate-400 font-label-md text-xs uppercase tracking-wider">{lang === 'vi' ? 'MẬT ĐỘ GIƯỜNG' : 'OCCUPANCY'}</span>
              <div className="flex items-end justify-between mt-1">
                <span className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">88%</span>
                <span className="text-body-sm text-secondary dark:text-teal-400 font-medium">14/16 Beds</span>
              </div>
            </div>
            {/* Stat Card 2 */}
            <div className="bg-white dark:bg-slate-900 p-md border border-outline-variant dark:border-slate-800 rounded-xl flex flex-col gap-xs min-w-[160px] shadow-sm">
              <span className="text-on-surface-variant dark:text-slate-400 font-label-md text-xs uppercase tracking-wider">{lang === 'vi' ? 'TỶ LỆ Y TÁ' : 'NURSE RATIO'}</span>
              <div className="flex items-end justify-between mt-1">
                <span className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">1:4</span>
                <span className="text-body-sm text-on-surface-variant dark:text-slate-500">{lang === 'vi' ? 'Tiêu chuẩn' : 'Standard'}</span>
              </div>
            </div>
            {/* Stat Card 3 */}
            <div className="bg-white dark:bg-slate-900 p-md border border-outline-variant dark:border-slate-800 rounded-xl flex flex-col gap-xs min-w-[160px] shadow-sm">
              <span className="text-on-surface-variant dark:text-slate-400 font-label-md text-xs uppercase tracking-wider">{lang === 'vi' ? 'CẢNH BÁO KHẨN' : 'CRITICAL ALERTS'}</span>
              <div className="flex items-end justify-between mt-1">
                <span className={`font-headline-md text-headline-md font-bold ${!isWardAlertAcknowledged ? 'text-error dark:text-red-400 animate-pulse' : 'text-on-surface-variant dark:text-slate-500'}`}>
                  {!isWardAlertAcknowledged ? '01' : '00'}
                </span>
                <span className={`text-body-sm font-medium ${!isWardAlertAcknowledged ? 'text-error dark:text-red-400' : 'text-on-surface-variant dark:text-slate-500'}`}>
                  {!isWardAlertAcknowledged ? 'Room 204' : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Room Grid and Layout */}
        <div className="grid grid-cols-12 gap-gutter">
          
          {/* Left Side: Map layout (8 columns) */}
          <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-lg transition-colors shadow-sm">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{lang === 'vi' ? 'Bản đồ phòng bệnh tầng 2' : 'Floor Layout Map'}</h3>
              <div className="flex gap-md text-xs font-semibold text-on-surface-variant dark:text-slate-400">
                <div className="flex items-center gap-xs"><div className="w-3.5 h-3.5 bg-error rounded-md animate-pulse"></div> {lang === 'vi' ? 'Có cảnh báo' : 'Alerting'}</div>
                <div className="flex items-center gap-xs"><div className="w-3.5 h-3.5 bg-primary rounded-md"></div> {lang === 'vi' ? 'Bình thường' : 'Occupied'}</div>
                <div className="flex items-center gap-xs"><div className="w-3.5 h-3.5 bg-slate-100 dark:bg-slate-800 border border-outline-variant rounded-md"></div> {lang === 'vi' ? 'Trống' : 'Vacant'}</div>
              </div>
            </div>

            {/* Ward Grid Layout Map */}
            <div className="grid grid-cols-3 gap-md border border-outline-variant dark:border-slate-800 p-md rounded-xl bg-slate-50/50 dark:bg-slate-950/20">
              
              {/* Room 201 */}
              <div 
                onClick={() => setVisiblePopover(visiblePopover === 201 ? null : 201)}
                className="group relative bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 hover:border-primary dark:hover:border-primary-fixed-dim cursor-pointer p-md h-48 transition-all flex flex-col justify-between rounded-xl shadow-xs"
              >
                <div className="flex justify-between items-start">
                  <span className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">201</span>
                  <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">open_in_full</span>
                </div>
                <div className="flex gap-sm">
                  <div className="w-3 h-3 rounded-full bg-primary-container" title="Bed A: Occupied"></div>
                  <div className="w-3 h-3 rounded-full bg-primary-container" title="Bed B: Occupied"></div>
                </div>
                
                {/* Popover */}
                {visiblePopover === 201 && (
                  <div className="absolute top-4 left-4 right-4 bg-white dark:bg-slate-900 shadow-xl border border-outline-variant dark:border-slate-700 z-20 p-md rounded-lg animate-in fade-in zoom-in duration-200">
                    <p className="text-primary dark:text-primary-fixed-dim font-bold font-label-md mb-xs text-[10px]">ROOM 201 PATIENTS</p>
                    <div className="space-y-sm mt-2">
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-semibold">
                        <span>A: James Wilson</span>
                        <span className="px-1.5 py-0.5 bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-primary-fixed-dim rounded font-semibold text-[9px] uppercase">Stable</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-semibold">
                        <span>B: Maria Garcia</span>
                        <span className="px-1.5 py-0.5 bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-primary-fixed-dim rounded font-semibold text-[9px] uppercase">Stable</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Room 202 */}
              <div 
                onClick={() => setVisiblePopover(visiblePopover === 202 ? null : 202)}
                className="group relative bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 hover:border-primary dark:hover:border-primary-fixed-dim cursor-pointer p-md h-48 transition-all flex flex-col justify-between rounded-xl shadow-xs"
              >
                <div className="flex justify-between items-start">
                  <span className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">202</span>
                  <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">open_in_full</span>
                </div>
                <div className="flex gap-sm">
                  <div className="w-3 h-3 rounded-full bg-primary-container" title="Bed A: Occupied"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" title="Bed B: Vacant"></div>
                </div>

                {/* Popover */}
                {visiblePopover === 202 && (
                  <div className="absolute top-4 left-4 right-4 bg-white dark:bg-slate-900 shadow-xl border border-outline-variant dark:border-slate-700 z-20 p-md rounded-lg animate-in fade-in zoom-in duration-200">
                    <p className="text-primary dark:text-primary-fixed-dim font-bold font-label-md mb-xs text-[10px]">ROOM 202 PATIENTS</p>
                    <div className="space-y-sm mt-2">
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-semibold">
                        <span>A: Robert Smith</span>
                        <span className="px-1.5 py-0.5 bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-primary-fixed-dim rounded font-semibold text-[9px] uppercase">Observation</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-semibold">
                        <span>B: (Vacant)</span>
                        <span className="text-outline text-[9px] uppercase font-bold">Available</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Room 203 (Alerting) */}
              <div 
                onClick={() => setVisiblePopover(visiblePopover === 203 ? null : 203)}
                className="group relative bg-error-container/30 dark:bg-red-955/20 border border-error hover:border-error/80 cursor-pointer p-md h-48 transition-all flex flex-col justify-between rounded-xl animate-pulse-subtle shadow-xs"
              >
                <div className="flex justify-between items-start text-error dark:text-red-400">
                  <span className="font-headline-md text-headline-md font-bold">203</span>
                  <span className="material-symbols-outlined text-error opacity-0 group-hover:opacity-100 transition-opacity">warning</span>
                </div>
                <div className="flex gap-sm">
                  <div className="w-3 h-3 rounded-full bg-error animate-pulse" title="Bed A: Critical Alert"></div>
                  <div className="w-3 h-3 rounded-full bg-primary" title="Bed B: Occupied"></div>
                </div>

                {/* Popover */}
                {visiblePopover === 203 && (
                  <div className="absolute top-4 left-4 right-4 bg-white dark:bg-slate-900 shadow-xl border border-error z-20 p-md rounded-lg animate-in fade-in zoom-in duration-200">
                    <p className="text-error font-bold font-label-md mb-xs text-[10px]">ROOM 203 PATIENTS</p>
                    <div className="space-y-sm mt-2">
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-bold">
                        <span>A: Sarah Jenkins</span>
                        <span className="px-1.5 py-0.5 bg-error-container text-error rounded font-black text-[9px] uppercase animate-pulse">Critical BP</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-semibold">
                        <span>B: Marcus Dixon</span>
                        <span className="px-1.5 py-0.5 bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-primary-fixed-dim rounded font-semibold text-[9px] uppercase">Stable</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Room 204 (Conditional Alert) */}
              <div 
                onClick={() => setVisiblePopover(visiblePopover === 204 ? null : 204)}
                className={`group relative bg-white dark:bg-slate-900 border cursor-pointer p-md h-48 transition-all flex flex-col justify-between rounded-xl shadow-xs ${
                  !isWardAlertAcknowledged 
                    ? 'border-error bg-error-container/10 dark:bg-red-955/10 animate-pulse-subtle' 
                    : 'border-outline-variant dark:border-slate-800 hover:border-primary'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`font-headline-md text-headline-md font-bold ${!isWardAlertAcknowledged ? 'text-error dark:text-red-400' : 'text-on-surface dark:text-white'}`}>204</span>
                  <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">open_in_full</span>
                </div>
                <div className="flex gap-sm">
                  <div className={`w-3 h-3 rounded-full ${!isWardAlertAcknowledged ? 'bg-error animate-pulse' : 'bg-primary'}`} title="Bed A: Occupied"></div>
                  <div className="w-3 h-3 rounded-full bg-primary" title="Bed B: Occupied"></div>
                </div>

                {/* Popover */}
                {visiblePopover === 204 && (
                  <div className="absolute top-4 left-4 right-4 bg-white dark:bg-slate-900 shadow-xl border border-outline-variant dark:border-slate-700 z-20 p-md rounded-lg animate-in fade-in zoom-in duration-200">
                    <p className="text-primary dark:text-primary-fixed-dim font-bold font-label-md mb-xs text-[10px]">ROOM 204 PATIENTS</p>
                    <div className="space-y-sm mt-2">
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-bold">
                        <span>A: Robert Sullivan</span>
                        <span className={`px-1.5 py-0.5 rounded font-black text-[9px] uppercase ${!isWardAlertAcknowledged ? 'bg-error-container text-error animate-pulse' : 'bg-primary-fixed text-on-primary-fixed'}`}>
                          {!isWardAlertAcknowledged ? 'LOW O2' : 'Stable'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-semibold">
                        <span>B: Elena Rodriguez</span>
                        <span className="px-1.5 py-0.5 bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-primary-fixed-dim rounded font-semibold text-[9px] uppercase">Stable</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Nursing Station */}
              <div 
                className="bg-primary/10 dark:bg-primary-container/20 border-2 border-dashed border-primary dark:border-primary-fixed-dim p-md h-48 flex flex-col justify-between rounded-xl relative select-none text-left animate-pulse-subtle"
              >
                <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">NS</span>
                <div className="text-xs text-primary dark:text-primary-fixed-dim font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-fixed-dim animate-ping"></span>
                  {lang === 'vi' ? 'Trạm trực 24/7' : 'Nursing Hub'}
                </div>
              </div>

              {/* Room 205 */}
              <div 
                onClick={() => setVisiblePopover(visiblePopover === 205 ? null : 205)}
                className="group relative bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 hover:border-primary dark:hover:border-primary-fixed-dim cursor-pointer p-md h-48 transition-all flex flex-col justify-between rounded-xl shadow-xs"
              >
                <div className="flex justify-between items-start">
                  <span className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">205</span>
                  <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">open_in_full</span>
                </div>
                <div className="flex gap-sm">
                  <div className="w-3 h-3 rounded-full bg-primary" title="Bed A: Occupied"></div>
                  <div className="w-3 h-3 rounded-full bg-primary" title="Bed B: Occupied"></div>
                </div>

                {/* Popover */}
                {visiblePopover === 205 && (
                  <div className="absolute top-4 left-4 right-4 bg-white dark:bg-slate-900 shadow-xl border border-outline-variant dark:border-slate-700 z-20 p-md rounded-lg animate-in fade-in zoom-in duration-200">
                    <p className="text-primary dark:text-primary-fixed-dim font-bold font-label-md mb-xs text-[10px]">ROOM 205 PATIENTS</p>
                    <div className="space-y-sm mt-2">
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-semibold">
                        <span>A: Samuel Park</span>
                        <span className="px-1.5 py-0.5 bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-primary-fixed-dim rounded font-semibold text-[9px] uppercase">Stable</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-semibold">
                        <span>B: Linda Whitaker</span>
                        <span className="px-1.5 py-0.5 bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-primary-fixed-dim rounded font-semibold text-[9px] uppercase">Stable</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Room 206 */}
              <div 
                onClick={() => setVisiblePopover(visiblePopover === 206 ? null : 206)}
                className="group relative bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 hover:border-primary dark:hover:border-primary-fixed-dim cursor-pointer p-md h-48 transition-all flex flex-col justify-between rounded-xl shadow-xs"
              >
                <div className="flex justify-between items-start">
                  <span className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">206</span>
                  <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">open_in_full</span>
                </div>
                <div className="flex gap-sm">
                  <div className="w-3 h-3 rounded-full bg-primary" title="Bed A: Occupied"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" title="Bed B: Vacant"></div>
                </div>

                {/* Popover */}
                {visiblePopover === 206 && (
                  <div className="absolute top-4 left-4 right-4 bg-white dark:bg-slate-900 shadow-xl border border-outline-variant dark:border-slate-700 z-20 p-md rounded-lg animate-in fade-in zoom-in duration-200">
                    <p className="text-primary dark:text-primary-fixed-dim font-bold font-label-md mb-xs text-[10px]">ROOM 206 PATIENTS</p>
                    <div className="space-y-sm mt-2">
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-semibold">
                        <span>A: Emily Johnson</span>
                        <span className="px-1.5 py-0.5 bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-primary-fixed-dim rounded font-semibold text-[9px] uppercase">Stable</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-semibold">
                        <span>B: (Vacant)</span>
                        <span className="text-outline text-[9px] uppercase font-bold">Available</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Room 207 */}
              <div 
                onClick={() => setVisiblePopover(visiblePopover === 207 ? null : 207)}
                className="group relative bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 hover:border-primary dark:hover:border-primary-fixed-dim cursor-pointer p-md h-48 transition-all flex flex-col justify-between rounded-xl shadow-xs"
              >
                <div className="flex justify-between items-start">
                  <span className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">207</span>
                  <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">open_in_full</span>
                </div>
                <div className="flex gap-sm">
                  <div className="w-3 h-3 rounded-full bg-primary" title="Bed A: Occupied"></div>
                  <div className="w-3 h-3 rounded-full bg-primary" title="Bed B: Occupied"></div>
                </div>

                {/* Popover */}
                {visiblePopover === 207 && (
                  <div className="absolute top-4 left-4 right-4 bg-white dark:bg-slate-900 shadow-xl border border-outline-variant dark:border-slate-700 z-20 p-md rounded-lg animate-in fade-in zoom-in duration-200">
                    <p className="text-primary dark:text-primary-fixed-dim font-bold font-label-md mb-xs text-[10px]">ROOM 207 PATIENTS</p>
                    <div className="space-y-sm mt-2">
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-semibold">
                        <span>A: David Miller</span>
                        <span className="px-1.5 py-0.5 bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-primary-fixed-dim rounded font-semibold text-[9px] uppercase">Stable</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-on-surface dark:text-white font-semibold">
                        <span>B: Susan Taylor</span>
                        <span className="px-1.5 py-0.5 bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-primary-fixed-dim rounded font-semibold text-[9px] uppercase">Stable</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right Side: Quick summary info */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-lg">
            
            {/* Critical Alert Detail Card */}
            {!isWardAlertAcknowledged ? (
              <div className="bg-error-container dark:bg-red-955/20 p-lg border border-error rounded-xl shadow-sm transition-all animate-pulse-subtle">
                <div className="flex items-center gap-2 text-error dark:text-red-400 mb-sm">
                  <span className="material-symbols-outlined">notification_important</span>
                  <span className="font-bold font-headline-md uppercase text-sm">EMERGENCY</span>
                </div>
                <div className="space-y-sm text-on-error-container dark:text-red-400">
                  <p className="font-bold text-body-lg">Room 204-A: Sarah Miller</p>
                  <p className="text-xs leading-normal">Vitals dropped: BP 85/55. Nurse assigned: Davis, K.</p>
                  <button 
                    onClick={() => {
                      setIsWardAlertAcknowledged(true);
                      alert(lang === 'vi' ? 'Cảnh báo khẩn buồng 204 đã được xác nhận xử lý!' : 'Emergency alert for Room 204 has been acknowledged!');
                    }}
                    className="w-full bg-error text-white dark:bg-red-650 py-2 rounded-lg font-bold mt-md shadow-sm hover:opacity-90 transition-opacity border-none cursor-pointer text-xs"
                  >
                    Acknowledge Alert
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-secondary-container/10 dark:bg-teal-955/20 p-lg border border-secondary dark:border-teal-850 rounded-xl shadow-sm transition-all text-left">
                <div className="flex items-center gap-2 text-secondary dark:text-teal-400 mb-sm">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span className="font-bold font-headline-md uppercase text-sm">{lang === 'vi' ? 'ỔN ĐỊNH' : 'STABLE'}</span>
                </div>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-normal">
                  {lang === 'vi' ? 'Không có cảnh báo khẩn cấp nào chưa được xử lý tại Tầng 2.' : 'No outstanding emergency alerts on Floor 2.'}
                </p>
              </div>
            )}

            {/* Staff on Duty */}
            <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-lg flex-1 shadow-sm transition-colors text-left">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold mb-md text-sm uppercase tracking-wider">{lang === 'vi' ? 'Nhân sự trực ca' : 'Staff on Duty'}</h3>
              <div className="space-y-md">
                
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary-fixed dark:bg-primary-container flex items-center justify-center font-bold text-xs text-on-primary-fixed dark:text-primary-fixed-dim">
                    DK
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-on-surface dark:text-white">Dr. Kevin Davis</p>
                    <p className="text-on-surface-variant dark:text-slate-400 mt-[2px]">MD, Attending Physician</p>
                  </div>
                  <div className="ml-auto w-2.5 h-2.5 rounded-full bg-secondary"></div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-secondary-fixed dark:bg-teal-900 flex items-center justify-center font-bold text-xs text-on-secondary-fixed dark:text-teal-400">
                    LA
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-on-surface dark:text-white">Nurse L. Adams</p>
                    <p className="text-on-surface-variant dark:text-slate-400 mt-[2px]">Head Nurse</p>
                  </div>
                  <div className="ml-auto w-2.5 h-2.5 rounded-full bg-secondary"></div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-tertiary-fixed dark:bg-amber-900 flex items-center justify-center font-bold text-xs text-on-tertiary-fixed dark:text-amber-400">
                    TC
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-on-surface dark:text-white">Thomas Chen</p>
                    <p className="text-on-surface-variant dark:text-slate-400 mt-[2px]">Floor Technician</p>
                  </div>
                  <div className="ml-auto w-2.5 h-2.5 rounded-full bg-outline-variant dark:bg-slate-700"></div>
                </div>

              </div>
              
              <button 
                onClick={() => alert(lang === 'vi' ? 'Đang kết nối tới Quản lý Ca trực...' : 'Calling Shift Manager...')}
                className="w-full border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim py-2 rounded-lg font-bold mt-lg hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors border-none bg-transparent cursor-pointer text-xs"
              >
                Call Shift Manager
              </button>
            </div>

          </div>

        </div>
      </div>
    ) : (
      /* Other floors mock placeholder (Level 1, 3, 4, 5, B) as child */
      <div className="space-y-lg text-left">
        <div className="mb-sm">
          <button 
            onClick={() => setSelectedFloor(null)}
            className="flex items-center gap-1 text-primary dark:text-primary-fixed-dim hover:underline font-bold text-xs bg-transparent border-none cursor-pointer p-0"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            {lang === 'vi' ? 'Quay lại sơ đồ tổng thể' : 'Back to Floor Overview'}
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-xl shadow-sm text-center">
          <span className="material-symbols-outlined text-6xl text-outline dark:text-slate-600 mb-md animate-pulse">
            {selectedFloor === 'B' ? 'science' : 'apartment'}
          </span>
          <h3 className="font-headline-lg font-bold text-on-surface dark:text-white">
            {selectedFloor === 'B' ? 'Level B - Logistics & Clinical Lab' : `Level ${selectedFloor} - ${
              selectedFloor === 'F1' ? 'Emergency Medicine' : 
              selectedFloor === 'F3' ? 'Intensive Care Unit' :
              selectedFloor === 'F4' ? 'Pediatrics Ward' :
              'Maternity & NICU'
            }`}
          </h3>
          <p className="text-body-md text-on-surface-variant dark:text-slate-400 mt-sm max-w-md mx-auto">
            {lang === 'vi' 
              ? `Dữ liệu sơ đồ chi tiết cho tầng ${selectedFloor} hiện đang được cập nhật thiết bị thực tế. Trạm điều dưỡng tầng 2 đang theo dõi từ xa.` 
              : `Detailed layouts and asset positions for Level ${selectedFloor} are currently syncing live clinical feeds. Floor 2 control hub is tracking active feeds.`}
          </p>
          <div className="mt-lg">
            <button 
              onClick={() => setSelectedFloor(null)}
              className="bg-primary text-white px-lg py-2 rounded-lg font-bold text-xs border-none cursor-pointer hover:brightness-110 shadow-sm"
            >
              {lang === 'vi' ? 'Xem các tầng khác' : 'Explore Other Floors'}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
