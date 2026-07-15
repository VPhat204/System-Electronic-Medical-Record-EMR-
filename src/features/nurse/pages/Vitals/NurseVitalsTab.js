import React from 'react';

export default function NurseVitalsTab({
  lang,
  t,
  isDark,
  patients,
  vitalsPatients,
  setVitalsPatients,
  selectedVitalsPatId,
  setSelectedVitalsPatId,
  isVitalsAlertTickerVisible,
  setIsVitalsAlertTickerVisible,
  vitalsTimeRange,
  setVitalsTimeRange,
  vitalsAuditLog,
  setVitalsAuditLog,
  inputSystolic,
  setInputSystolic,
  inputDiastolic,
  setInputDiastolic,
  inputBPM,
  setInputBPM,
  inputTemp,
  setInputTemp,
  inputSpO2,
  setInputSpO2,
  selectedPatId,
  setSelectedPatId,
  handleLogVitals
}) {
  return (
    <div className="space-y-lg text-left">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-md mb-lg">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-background dark:text-white mb-1 font-bold">
            {lang === 'vi' ? 'Khoa 4C: Phòng Cấp cứu & Theo dõi sinh hiệu' : 'Ward 4C: Intensive Care Unit'}
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant dark:text-slate-400">
            {lang === 'vi'
              ? `Theo dõi sinh hiệu thời gian thực. ${vitalsPatients.filter(p => p.hr > 100 || p.hr < 50 || p.spo2 < 90).length} cảnh báo khẩn cấp đang chờ.`
              : `Real-time monitoring of active patients. ${vitalsPatients.filter(p => p.hr > 100 || p.hr < 50 || p.spo2 < 90).length} critical alerts pending.`}
          </p>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('record-vitals-card');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-primary dark:bg-primary-container text-white dark:text-on-primary-container px-lg py-md rounded-lg font-label-md flex items-center gap-sm hover:opacity-90 transition-all shadow-sm border-none cursor-pointer text-xs font-bold"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          {lang === 'vi' ? 'LOG MỚI SINH HIỆU' : 'LOG NEW VITALS'}
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* ALERT TICKER */}
        {isVitalsAlertTickerVisible && (
          <div className="col-span-12 bg-error-container dark:bg-red-955/20 text-on-error-container dark:text-red-400 p-md rounded-lg flex items-center gap-md animate-pulse border border-error/20 text-xs">
            <span className="material-symbols-outlined text-error dark:text-red-400">warning</span>
            <span className="font-label-md text-label-md font-semibold">
              {lang === 'vi'
                ? 'CẢNH BÁO NGUY KỊCH: Bệnh nhân Sarah Jenkins (Giường 12) - HA 195/110 mmHg. Yêu cầu bác sĩ lâm sàng đánh giá ngay.'
                : 'CRITICAL ALERT: Patient Sarah Jenkins (Bed 12) - BP 195/110 mmHg. Immediate clinical review required.'}
            </span>
            <button
              onClick={() => setIsVitalsAlertTickerVisible(false)}
              className="ml-auto underline font-label-md border-none bg-transparent cursor-pointer hover:opacity-80 text-xs font-bold"
            >
              {lang === 'vi' ? 'XÁC NHẬN XỬ LÝ' : 'ACKNOWLEDGE'}
            </button>
          </div>
        )}

        {/* TREND CHART VIEW (Main Center - 8 Columns) */}
        <div className="col-span-12 lg:col-span-8 space-y-gutter">
          {(() => {
            const pat = vitalsPatients.find(p => p.id === selectedVitalsPatId) || vitalsPatients[1];
            return (
              <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-lg overflow-hidden transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md mb-lg">
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant dark:border-slate-800 flex-shrink-0">
                      <img className="w-full h-full object-cover" alt={pat.name} src={pat.avatar} />
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">{pat.name}</h3>
                      <p className="text-body-sm font-body-sm text-on-surface-variant dark:text-slate-400">
                        {lang === 'vi'
                          ? `Giường ${pat.bed} • ID: #${pat.idNum} • ${pat.age} tuổi`
                          : `Bed ${pat.bed} • ID: #${pat.idNum} • ${pat.age} yrs`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-xs bg-surface-container-low dark:bg-slate-950 p-xs rounded-lg">
                    <button
                      onClick={() => setVitalsTimeRange('24H')}
                      className={`px-md py-sm rounded text-xs font-bold border-none cursor-pointer ${vitalsTimeRange === '24H'
                          ? 'bg-white dark:bg-slate-800 text-primary dark:text-primary-fixed-dim shadow-sm'
                          : 'text-on-surface-variant dark:text-slate-400 bg-transparent hover:bg-surface-container-high dark:hover:bg-slate-800'
                        }`}
                    >
                      24H
                    </button>
                    <button
                      onClick={() => setVitalsTimeRange('7D')}
                      className={`px-md py-sm rounded text-xs font-bold border-none cursor-pointer ${vitalsTimeRange === '7D'
                          ? 'bg-white dark:bg-slate-800 text-primary dark:text-primary-fixed-dim shadow-sm'
                          : 'text-on-surface-variant dark:text-slate-400 bg-transparent hover:bg-surface-container-high dark:hover:bg-slate-800'
                        }`}
                    >
                      7D
                    </button>
                    <button
                      onClick={() => setVitalsTimeRange('30D')}
                      className={`px-md py-sm rounded text-xs font-bold border-none cursor-pointer ${vitalsTimeRange === '30D'
                          ? 'bg-white dark:bg-slate-800 text-primary dark:text-primary-fixed-dim shadow-sm'
                          : 'text-on-surface-variant dark:text-slate-400 bg-transparent hover:bg-surface-container-high dark:hover:bg-slate-800'
                        }`}
                    >
                      30D
                    </button>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="h-60 bg-slate-50/50 dark:bg-slate-950/30 rounded-lg border border-outline-variant/30 dark:border-slate-800/30 flex items-end p-md relative overflow-hidden">

                  {/* Grid lines decoration */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-[0.07] dark:opacity-[0.03]">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="border-t border-l border-on-surface"></div>
                    ))}
                  </div>

                  {/* Simulated Bars */}
                  {pat.readings.map((val, idx) => {
                    const heightPct = (val / 210) * 100;
                    const times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
                    const isHigh = val > 140;

                    return (
                      <div key={idx} className="flex-1 flex flex-col justify-end items-center group h-full z-10">
                        <div
                          style={{ height: `${heightPct}%` }}
                          className={`w-2.5 rounded-t-full relative transition-all duration-300 ${isHigh
                              ? 'bg-error dark:bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                              : 'bg-primary/45 dark:bg-primary-container/60 hover:bg-primary dark:hover:bg-primary-fixed-dim'
                            }`}
                        >
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-inverse-surface dark:bg-slate-800 text-inverse-on-surface dark:text-white text-[10px] py-[2px] px-1.5 rounded transition-opacity shadow-md pointer-events-none whitespace-nowrap z-20">
                            {val} mmHg
                          </div>
                        </div>
                        <span className="text-[10px] mt-2 text-on-surface-variant dark:text-slate-400 font-semibold">{times[idx]}</span>
                      </div>
                    );
                  })}

                  {/* Waveform SVG Line Overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="none">
                    <path
                      className="text-primary dark:text-primary-fixed-dim"
                      d="M 50,180 Q 150,140 250,90 T 450,110 T 650,130 T 750,90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>

                {/* Legend */}
                <div className="mt-md flex gap-lg text-xs font-semibold text-on-surface-variant dark:text-slate-400">
                  <div className="flex items-center gap-xs"><div className="w-2.5 h-2.5 rounded-full bg-primary"></div> {lang === 'vi' ? 'Huyết thu (Systolic)' : 'Systolic'}</div>
                  <div className="flex items-center gap-xs"><div className="w-2.5 h-2.5 rounded-full bg-secondary"></div> {lang === 'vi' ? 'Nhịp tim (Heart Rate)' : 'Heart Rate'}</div>
                  <div className="flex items-center gap-xs"><div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div> SpO2</div>
                </div>
              </div>
            );
          })()}

          {/* WARD OVERVIEW TABLE */}
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors text-left">
            <div className="p-lg border-b border-outline-variant dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">
                {lang === 'vi' ? 'Bảng kiểm soát sinh hiệu' : 'Ward Dashboard'}
              </h3>
              <div className="flex gap-sm">
                <span className="px-3 py-1 bg-surface-container-high dark:bg-slate-800 rounded-full text-xs font-bold text-on-surface-variant dark:text-slate-300">42 Patients</span>
                <span className="px-3 py-1 bg-error-container dark:bg-red-955/40 rounded-full text-xs font-bold text-error dark:text-red-400">{vitalsPatients.filter(p => p.hr > 100 || p.hr < 50 || p.spo2 < 90).length} Critical</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low dark:bg-slate-950 text-on-surface-variant dark:text-slate-300 font-label-md text-xs uppercase tracking-wider border-b border-outline-variant dark:border-slate-800">
                    <th className="px-lg py-3">{lang === 'vi' ? 'GIƯỜNG' : 'BED'}</th>
                    <th className="px-lg py-3">{lang === 'vi' ? 'BỆNH NHÂN' : 'PATIENT'}</th>
                    <th className="px-lg py-3">{lang === 'vi' ? 'HUYẾT ÁP (mmHg)' : 'BP (mmHg)'}</th>
                    <th className="px-lg py-3">{lang === 'vi' ? 'NHỊP TIM (bpm)' : 'HR (bpm)'}</th>
                    <th className="px-lg py-3">SPO2 (%)</th>
                    <th className="px-lg py-3">{lang === 'vi' ? 'NHIỆT ĐỘ (°C)' : 'TEMP (°C)'}</th>
                    <th className="px-lg py-3">{lang === 'vi' ? 'GHI NHẬN CUỐI' : 'LAST LOG'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant dark:divide-slate-800">
                  {vitalsPatients.map((p) => {
                    const isBPAbn = parseInt(p.bp.split('/')[0]) > 140 || parseInt(p.bp.split('/')[0]) < 90;
                    const isHRAbn = p.hr > 100 || p.hr < 50;
                    const isSpO2Abn = p.spo2 < 90;
                    const isSelected = p.id === selectedVitalsPatId;

                    return (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedVitalsPatId(p.id)}
                        className={`hover:bg-primary-container/5 dark:hover:bg-slate-800 transition-colors cursor-pointer ${isSelected ? 'bg-primary-container/10 dark:bg-slate-800 font-semibold border-l-4 border-primary' : ''
                          }`}
                      >
                        <td className="px-lg py-4 font-bold text-primary dark:text-primary-fixed-dim">{p.bed}</td>
                        <td className="px-lg py-4 font-bold text-on-surface dark:text-white">{p.name}</td>
                        <td className="px-lg py-4">
                          {isBPAbn ? (
                            <span className="bg-error-container dark:bg-red-955/40 text-error dark:text-red-400 px-2 py-0.5 rounded font-bold text-xs">
                              {p.bp}
                            </span>
                          ) : (
                            <span>{p.bp}</span>
                          )}
                        </td>
                        <td className="px-lg py-4">
                          {isHRAbn ? (
                            <span className="bg-tertiary-fixed dark:bg-amber-955/40 text-tertiary dark:text-amber-400 px-2 py-0.5 rounded font-bold text-xs">
                              {p.hr}
                            </span>
                          ) : (
                            <span>{p.hr}</span>
                          )}
                        </td>
                        <td className="px-lg py-4">
                          {isSpO2Abn ? (
                            <span className="bg-error-container dark:bg-red-955/40 text-error dark:text-red-400 px-2 py-0.5 rounded font-bold text-xs">
                              {p.spo2}
                            </span>
                          ) : (
                            <span>{p.spo2}</span>
                          )}
                        </td>
                        <td className="px-lg py-4 text-on-surface dark:text-slate-300">{p.temp}°C</td>
                        <td className="px-lg py-4 text-on-surface-variant dark:text-slate-400 text-xs">{p.lastLog}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* DATA ENTRY & STATS (Right Side - 4 Columns) */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter">

          {/* Record Vitals Form */}
          <div id="record-vitals-card" className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-lg shadow-sm transition-colors text-left">
            <h3 className="font-headline-md text-headline-md font-bold mb-lg flex items-center gap-sm text-primary dark:text-primary-fixed-dim">
              <span className="material-symbols-outlined">edit_note</span>
              {lang === 'vi' ? 'Ghi nhận sinh hiệu' : 'Record Vitals'}
            </h3>
            <form onSubmit={handleLogVitals} className="space-y-md">

              {/* Patient dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">
                  {lang === 'vi' ? 'Tìm bệnh nhân *' : 'Patient Selection *'}
                </label>
                <select
                  required
                  value={selectedPatId}
                  onChange={(e) => {
                    setSelectedPatId(e.target.value);
                    const p = vitalsPatients.find(vp => vp.id === e.target.value) || patients.find(gp => gp.id === e.target.value);
                    if (p) {
                      const [sys, dia] = p.bp.split('/');
                      setInputSystolic(sys || '');
                      setInputDiastolic(dia || '');
                      setInputBPM(p.hr ? p.hr.toString() : (p.bpm ? p.bpm.toString() : ''));
                      setInputSpO2(p.spo2.toString());
                      setInputTemp(p.temp.toString());
                    }
                  }}
                  className="w-full bg-surface-container-low dark:bg-slate-950 border border-outline-variant dark:border-slate-800 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                >
                  <option value="">-- {lang === 'vi' ? 'Chọn bệnh nhân' : 'Select Patient'} --</option>
                  {vitalsPatients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Bed {p.bed})</option>
                  ))}
                  {patients.filter(gp => !vitalsPatients.some(vp => vp.id === gp.id)).map(gp => (
                    <option key={gp.id} value={gp.id}>{gp.name} (Bed {gp.roomBed})</option>
                  ))}
                </select>
              </div>

              {/* Systolic / Diastolic Grid */}
              <div className="grid grid-cols-2 gap-md">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">Systolic (mmHg)</label>
                  <input
                    required
                    value={inputSystolic}
                    onChange={(e) => setInputSystolic(e.target.value)}
                    placeholder="120"
                    type="number"
                    className="w-full bg-surface-container-low dark:bg-slate-955 border border-outline-variant dark:border-slate-800 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">Diastolic (mmHg)</label>
                  <input
                    required
                    value={inputDiastolic}
                    onChange={(e) => setInputDiastolic(e.target.value)}
                    placeholder="80"
                    type="number"
                    className="w-full bg-surface-container-low dark:bg-slate-955 border border-outline-variant dark:border-slate-800 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* HR & SpO2 Grid */}
              <div className="grid grid-cols-2 gap-md">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">{lang === 'vi' ? 'Nhịp tim (bpm)' : 'Heart Rate (bpm)'}</label>
                  <input
                    required
                    value={inputBPM}
                    onChange={(e) => setInputBPM(e.target.value)}
                    placeholder="72"
                    type="number"
                    className="w-full bg-surface-container-low dark:bg-slate-955 border border-outline-variant dark:border-slate-800 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">SpO2 (%)</label>
                  <input
                    required
                    value={inputSpO2}
                    onChange={(e) => setInputSpO2(e.target.value)}
                    placeholder="98"
                    type="number"
                    className="w-full bg-surface-container-low dark:bg-slate-955 border border-outline-variant dark:border-slate-800 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* Temp */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">{lang === 'vi' ? 'Nhiệt độ (°C)' : 'Temperature (°C)'}</label>
                <input
                  required
                  value={inputTemp}
                  onChange={(e) => setInputTemp(e.target.value)}
                  placeholder="36.6"
                  step="0.1"
                  type="number"
                  className="w-full bg-surface-container-low dark:bg-slate-955 border border-outline-variant dark:border-slate-800 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div className="pt-sm">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:brightness-110 shadow-sm border-none cursor-pointer transition-all text-xs"
                >
                  {lang === 'vi' ? 'LƯU & ĐĂNG KÝ CHỈ SỐ' : 'SAVE & LOG READING'}
                </button>
              </div>
            </form>
          </div>

          {/* Ward Vitals Summary */}
          <div className="space-y-sm text-left">
            <h4 className="text-[11px] font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest px-xs">{lang === 'vi' ? 'Tóm tắt sinh hiệu khoa' : 'Ward Vitals Summary'}</h4>
            <div className="grid grid-cols-2 gap-sm">
              <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-lg p-md flex flex-col justify-center transition-colors">
                <span className="text-[11px] font-bold text-on-surface-variant dark:text-slate-400">Avg. BP</span>
                <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim mt-1">124/82</span>
                <span className="text-[10px] text-secondary dark:text-teal-400 mt-1 font-semibold">Normal Range</span>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-lg p-md flex flex-col justify-center transition-colors">
                <span className="text-[11px] font-bold text-on-surface-variant dark:text-slate-400">Avg. SpO2</span>
                <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim mt-1">96.8%</span>
                <span className="text-[10px] text-tertiary dark:text-amber-450 mt-1 font-semibold">Down 0.2%</span>
              </div>
              <div className="bg-error-container dark:bg-red-955/20 border border-error/20 rounded-lg p-md flex flex-col justify-center col-span-2 transition-colors">
                <div className="flex justify-between items-center text-error dark:text-red-400">
                  <span className="text-xs font-bold">{lang === 'vi' ? 'Số cảnh báo nguy kịch' : 'Current Critical Alerts'}</span>
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                </div>
                <span className="font-headline-xl text-headline-xl text-error dark:text-red-400 font-bold mt-1">
                  {vitalsPatients.filter(p => p.hr > 100 || p.hr < 50 || p.spo2 < 90).length}
                </span>
                <p className="text-[10px] text-on-error-container dark:text-red-400 mt-1 leading-normal font-semibold">
                  Require immediate clinical response or intervention.
                </p>
              </div>
            </div>
          </div>

          {/* Audit Log / Recent Activity */}
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-lg transition-colors text-left">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-white mb-md">{lang === 'vi' ? 'Nhật ký giám sát' : 'Audit Log'}</h3>
            <div className="space-y-md max-h-56 overflow-y-auto pr-xs custom-scrollbar">
              {vitalsAuditLog.map(item => (
                <div key={item.id} className="flex gap-sm items-start text-xs">
                  <div className={`w-2.5 h-2.5 mt-[3px] rounded-full flex-shrink-0 ${item.isError ? 'bg-error animate-pulse' : 'bg-primary'}`}></div>
                  <div>
                    <p className={`font-semibold leading-normal ${item.isError ? 'text-error dark:text-red-400' : 'text-on-background dark:text-white'}`}>{item.text}</p>
                    <p className="text-[10px] text-on-surface-variant dark:text-slate-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
