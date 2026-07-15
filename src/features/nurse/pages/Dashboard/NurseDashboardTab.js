import React from 'react';

export default function NurseDashboardTab({
  lang,
  t,
  isDark,
  patients,
  meds,
  isAlertAcknowledged,
  setActiveTab,
  setSelectedPatId,
  handleAcknowledgeAlert,
  handleStartAllRounds,
  handleAdministerMed
}) {
  return (
    <div className="space-y-lg text-left">

      {/* Header Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-lg">
        {/* Card 1: Bed Occupancy */}
        <div className="bg-white dark:bg-slate-900 p-md border border-outline-variant dark:border-slate-800 rounded-xl flex items-center justify-between shadow-sm transition-colors">
          <div>
            <p className="text-on-surface-variant dark:text-slate-400 text-body-sm font-medium uppercase tracking-tight">{t.bedOccupancy}</p>
            <h2 className="text-headline-lg font-headline-lg text-on-surface dark:text-white font-bold">22/24</h2>
            <div className="w-36 bg-surface-container-high dark:bg-slate-700 h-1.5 rounded-full mt-sm overflow-hidden">
              <div className="bg-primary dark:bg-primary-container h-1.5 rounded-full" style={{ width: '91%' }}></div>
            </div>
          </div>
          <div className="bg-primary-fixed dark:bg-primary-container/20 p-sm rounded-full text-primary dark:text-primary-fixed-dim">
            <span className="material-symbols-outlined">bed</span>
          </div>
        </div>

        {/* Card 2: Active Rounds */}
        <div className="bg-white dark:bg-slate-900 p-md border border-outline-variant dark:border-slate-800 rounded-xl flex items-center justify-between shadow-sm transition-colors">
          <div>
            <p className="text-on-surface-variant dark:text-slate-400 text-body-sm font-medium uppercase tracking-tight">{t.activeRounds}</p>
            <h2 className="text-headline-lg font-headline-lg text-on-surface dark:text-white font-bold">
              {patients.filter(p => p.status === 'OVERDUE' || p.status === 'PENDING').length} {t.pending}
            </h2>
            <p className="text-body-sm text-secondary dark:text-teal-400 font-medium">
              {patients.filter(p => p.status === 'ON_TRACK').length} {t.completed}
            </p>
          </div>
          <div className="bg-secondary-fixed dark:bg-teal-900/20 p-sm rounded-full text-secondary dark:text-teal-400">
            <span className="material-symbols-outlined">assignment_turned_in</span>
          </div>
        </div>

        {/* Card 3: Medications Due */}
        <div className="bg-white dark:bg-slate-900 p-md border border-outline-variant dark:border-slate-800 rounded-xl flex items-center justify-between shadow-sm transition-colors">
          <div>
            <p className="text-on-surface-variant dark:text-slate-400 text-body-sm font-medium uppercase tracking-tight">{t.medsDue}</p>
            <h2 className="text-headline-lg font-headline-lg text-on-surface dark:text-white font-bold">
              {meds.filter(m => m.status === 'DUE').length} {t.dueNow}
            </h2>
            <p className="text-body-sm text-tertiary dark:text-amber-400 font-medium">{t.nextIn} 45m</p>
          </div>
          <div className="bg-tertiary-fixed dark:bg-amber-900/20 p-sm rounded-full text-tertiary dark:text-amber-400">
            <span className="material-symbols-outlined">pill</span>
          </div>
        </div>

        {/* Card 4: Vitals Alerts */}
        <div className={`p-md border rounded-xl flex items-center justify-between shadow-sm transition-all ${!isAlertAcknowledged
            ? 'bg-error-container dark:bg-red-955/20 border-error animate-pulse-subtle'
            : 'bg-white dark:bg-slate-900 border-outline-variant dark:border-slate-800'
          }`}>
          <div>
            <p className={`text-body-sm font-bold uppercase tracking-tight ${!isAlertAcknowledged ? 'text-on-error-container dark:text-red-450' : 'text-on-surface-variant dark:text-slate-400'}`}>{t.vitalsAlerts}</p>
            <h2 className={`text-headline-lg font-headline-lg font-bold ${!isAlertAcknowledged ? 'text-on-error-container dark:text-red-450' : 'text-on-surface dark:text-white'}`}>
              {!isAlertAcknowledged ? `01 ${t.critical}` : `00 ${t.stable}`}
            </h2>
            <p className={`text-body-sm ${!isAlertAcknowledged ? 'text-on-error-container/85 dark:text-red-400/80' : 'text-on-surface-variant/80 dark:text-slate-500'}`}>{t.requiresAttention}</p>
          </div>
          <div className={`p-sm rounded-full ${!isAlertAcknowledged ? 'bg-error text-on-error' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
            <span className="material-symbols-outlined">warning</span>
          </div>
        </div>
      </div>

      {/* Bento Grid Main Content */}
      <div className="grid grid-cols-12 gap-lg">

        {/* Left Column: Patient Rounds & Vitals */}
        <div className="col-span-12 lg:col-span-8 space-y-lg">

          {/* Patient Rounds List */}
          <section className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors duration-150">
            <div className="px-lg py-md border-b border-outline-variant dark:border-slate-800 flex flex-wrap justify-between items-center bg-surface-bright dark:bg-slate-900/50 gap-sm">
              <h3 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim font-bold">{t.observationsTitle}</h3>
              <div className="flex gap-sm">
                <button
                  onClick={handleStartAllRounds}
                  className="px-md py-1.5 bg-primary dark:bg-primary-container text-white dark:text-on-primary-container rounded font-semibold text-label-md hover:brightness-110 transition-all border-none cursor-pointer"
                >
                  {t.startAllRounds}
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-surface-container-low dark:bg-slate-950 text-on-surface-variant dark:text-slate-300 font-label-md text-xs uppercase tracking-wider border-b border-outline-variant dark:border-slate-800">
                  <tr>
                    <th className="px-lg py-3">{t.roomBed}</th>
                    <th className="px-lg py-3">{t.patientName}</th>
                    <th className="px-lg py-3">{t.condition}</th>
                    <th className="px-lg py-3">{t.nextObservation}</th>
                    <th className="px-lg py-3">{t.status}</th>
                    <th className="px-lg py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant dark:divide-slate-800">
                  {patients.map((pat) => (
                    <tr key={pat.id} className="hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors">
                      <td className="px-lg py-4 font-bold text-primary dark:text-primary-fixed-dim">{pat.roomBed}</td>
                      <td className="px-lg py-4">
                        <p className="font-bold text-on-surface dark:text-white leading-tight">{pat.name}</p>
                        <p className="text-xs text-on-surface-variant dark:text-slate-400">ID: {pat.id.slice(4)} | {lang === 'vi' ? `${pat.gender === 'Male' ? 'Nam' : 'Nữ'}, ${pat.age} tuổi` : `${pat.gender}, ${pat.age}y`}</p>
                      </td>
                      <td className="px-lg py-4">
                        {pat.condition === 'High Risk' ? (
                          <span className="px-2 py-0.5 bg-error-container text-on-error-container dark:bg-red-955/60 dark:text-red-400 text-[10px] font-bold rounded uppercase">
                            {t.highRisk}
                          </span>
                        ) : pat.condition === 'Stable' ? (
                          <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container dark:bg-teal-955/60 dark:text-teal-400 text-[10px] font-bold rounded uppercase">
                            {t.stable}
                          </span>
                        ) : pat.condition === 'Monitoring' ? (
                          <span className="px-2 py-0.5 bg-tertiary-container text-on-tertiary-container dark:bg-amber-955/60 dark:text-amber-400 text-[10px] font-bold rounded uppercase">
                            {t.monitoring}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 text-[10px] font-bold rounded uppercase">
                            {t.postOp}
                          </span>
                        )}
                      </td>
                      <td className="px-lg py-4 font-data-mono text-data-mono dark:text-slate-400 text-xs">{pat.nextObs}</td>
                      <td className="px-lg py-4">
                        {pat.status === 'OVERDUE' ? (
                          <span className="flex items-center gap-1 text-error dark:text-red-400 font-bold text-xs">
                            <span className="material-symbols-outlined text-[16px]">schedule</span> {t.overdue}
                          </span>
                        ) : pat.status === 'PENDING' ? (
                          <span className="flex items-center gap-1 text-tertiary dark:text-amber-400 font-bold text-xs">
                            <span className="material-symbols-outlined text-[16px]">schedule</span> {t.pending}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-secondary dark:text-teal-400 font-bold text-xs">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span> {t.onTrack}
                          </span>
                        )}
                      </td>
                      <td className="px-lg py-4 text-right">
                        <button
                          onClick={() => { setActiveTab('Chỉ số sinh tồn'); setSelectedPatId(pat.id); }}
                          className="text-primary dark:text-primary-fixed-dim hover:underline border-none bg-transparent cursor-pointer font-bold text-body-sm"
                        >
                          {t.checkVitals}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Vitals Summary Card Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {/* Critical Patient Alert 204-A */}
            <section className={`border rounded-xl p-md shadow-sm transition-colors text-left flex flex-col justify-between ${!isAlertAcknowledged
                ? 'bg-white dark:bg-slate-900 border-error'
                : 'bg-white dark:bg-slate-900 border-outline-variant dark:border-slate-800'
              }`}>
              <div>
                <div className="flex items-center justify-between mb-md">
                  <h4 className={`font-bold flex items-center gap-2 text-md ${!isAlertAcknowledged ? 'text-error dark:text-red-400' : 'text-on-surface dark:text-white'}`}>
                    <span className="material-symbols-outlined">heart_broken</span>
                    <span>{t.patientAlert.replace('{bed}', '204-A')}</span>
                  </h4>
                  {!isAlertAcknowledged && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-error text-on-error rounded animate-pulse">
                      {t.live}
                    </span>
                  )}
                </div>
                <div className="flex items-end justify-between gap-md mb-md">
                  <div>
                    <p className="text-body-sm text-on-surface-variant dark:text-slate-400 leading-none">{t.heartRate}</p>
                    <h3 className={`text-headline-xl font-headline-xl font-black ${!isAlertAcknowledged ? 'text-error dark:text-red-400 animate-pulse' : 'text-primary dark:text-primary-fixed-dim'}`}>
                      {!isAlertAcknowledged ? '114' : '85'}
                    </h3>
                  </div>
                  {/* Mock heartbeat wave visualizer */}
                  <div className="h-12 w-32 flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 rounded border border-outline-variant dark:border-slate-800">
                    <div className={`absolute h-0.5 bg-error dark:bg-red-400 rounded-full w-full ${!isAlertAcknowledged ? 'animate-pulse' : 'opacity-30'}`} style={{ top: '50%' }}></div>
                    <span className="text-[10px] font-semibold dark:text-slate-400">ECG Normal</span>
                  </div>
                </div>
                <div className="bg-surface-container-low dark:bg-slate-950 p-sm rounded border border-outline-variant dark:border-slate-800">
                  <div className="flex justify-between text-xs mb-xs text-on-surface-variant dark:text-slate-400 font-semibold">
                    <span>{t.bp}: {!isAlertAcknowledged ? '145/95' : '122/82'}</span>
                    <span>SpO2: {!isAlertAcknowledged ? '91%' : '97%'}</span>
                  </div>
                  <div className="w-full h-1 bg-outline-variant dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${!isAlertAcknowledged ? 'bg-error' : 'bg-secondary'}`} style={{ width: !isAlertAcknowledged ? '85%' : '97%' }}></div>
                  </div>
                </div>
              </div>
              <button
                disabled={isAlertAcknowledged}
                onClick={handleAcknowledgeAlert}
                className={`w-full mt-md py-2 rounded-lg font-bold transition-all border-none cursor-pointer text-body-md ${!isAlertAcknowledged
                    ? 'bg-error text-on-error hover:brightness-110'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  }`}
              >
                {t.acknowledgeRespond}
              </button>
            </section>

            {/* Summary Card Elena 204-B */}
            <section className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-md shadow-sm transition-colors text-left flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-md">
                  <h4 className="font-bold text-on-surface dark:text-white flex items-center gap-2 text-md">
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">analytics</span>
                    <span>{t.vitalsSummary.replace('{bed}', '204-B')}</span>
                  </h4>
                  <span className="text-[10px] text-on-surface-variant dark:text-slate-400">{t.lastUpdated.replace('{time}', '5m')}</span>
                </div>
                <div className="grid grid-cols-2 gap-md mb-md">
                  <div className="p-sm bg-surface-container-low dark:bg-slate-950 rounded border border-outline-variant dark:border-slate-800">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-slate-400">{t.bp}</p>
                    <p className="text-headline-md font-headline-md text-primary dark:text-primary-fixed-dim font-bold">120/80</p>
                  </div>
                  <div className="p-sm bg-surface-container-low dark:bg-slate-950 rounded border border-outline-variant dark:border-slate-800">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-slate-400">{t.temp}</p>
                    <p className="text-headline-md font-headline-md text-secondary dark:text-teal-400 font-bold">37.2°C</p>
                  </div>
                  <div className="p-sm bg-surface-container-low dark:bg-slate-950 rounded border border-outline-variant dark:border-slate-800">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-slate-400">BPM</p>
                    <p className="text-headline-md font-headline-md text-on-surface dark:text-white font-bold">78</p>
                  </div>
                  <div className="p-sm bg-surface-container-low dark:bg-slate-950 rounded border border-outline-variant dark:border-slate-800">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-slate-400">{t.spo2}</p>
                    <p className="text-headline-md font-headline-md text-primary dark:text-primary-fixed-dim font-bold">98%</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => alert('Trend graph popup.')}
                className="w-full py-2 border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim rounded-lg font-bold hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer bg-transparent"
              >
                {t.viewTrends}
              </button>
            </section>
          </div>

        </div>

        {/* Right Column: Meds & Notifications */}
        <div className="col-span-12 lg:col-span-4 space-y-lg">

          {/* Medication Administration Schedule */}
          <section className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl shadow-sm transition-colors text-left">
            <div className="p-md border-b border-outline-variant dark:border-slate-800 flex justify-between items-center bg-surface-bright dark:bg-slate-900/50">
              <h3 className="font-bold text-on-surface dark:text-white flex items-center gap-2 text-md">
                <span className="material-symbols-outlined text-tertiary dark:text-amber-400">pill</span>
                <span>{t.medsSchedule}</span>
              </h3>
              <button
                onClick={() => setActiveTab('Cấp phát thuốc')}
                className="text-xs font-bold text-primary dark:text-primary-fixed-dim hover:underline border-none bg-transparent cursor-pointer"
              >
                {t.fullChart}
              </button>
            </div>
            <div className="p-md space-y-md max-h-[380px] overflow-y-auto custom-scrollbar">

              {meds.map((med) => {
                let timelineColor = 'border-outline-variant dark:border-slate-800';
                let dotColor = 'bg-outline';
                if (med.status === 'ADMINISTERED') {
                  timelineColor = 'border-secondary';
                  dotColor = 'bg-secondary';
                } else if (med.urgent) {
                  timelineColor = 'border-error';
                  dotColor = 'bg-error';
                } else {
                  timelineColor = 'border-tertiary';
                  dotColor = 'bg-tertiary';
                }

                return (
                  <div key={med.id} className={`relative pl-lg border-l-2 ${timelineColor} py-[2px]`}>
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${dotColor} border-4 border-white dark:border-slate-900`}></div>

                    <p className={`text-xs font-bold leading-none ${med.status === 'ADMINISTERED' ? 'text-secondary' : med.urgent ? 'text-error' : 'text-tertiary'}`}>
                      {med.time} {med.urgent && `- ${t.urgent}`} {med.status === 'ADMINISTERED' && `- ${t.completed}`}
                    </p>

                    <div className={`mt-2 p-3 rounded border text-left ${med.status === 'ADMINISTERED'
                        ? 'bg-secondary-container/10 border-secondary/20'
                        : med.urgent
                          ? 'bg-error-container/20 border-error-container'
                          : 'bg-surface-container-low dark:bg-slate-955 border-outline-variant dark:border-slate-800'
                      }`}>
                      <p className="font-bold text-on-surface dark:text-white text-body-md leading-tight">{med.name}</p>
                      <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1">{med.details}</p>

                      {med.status === 'DUE' && (
                        <button
                          onClick={() => handleAdministerMed(med.id)}
                          className={`mt-2.5 px-3 py-1 text-xs rounded font-bold transition-all border-none cursor-pointer ${med.urgent
                              ? 'bg-error text-on-error hover:brightness-110'
                              : 'bg-primary text-white dark:bg-primary-container dark:text-on-primary-container hover:brightness-110'
                            }`}
                        >
                          {t.administer}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

            </div>
          </section>

          {/* Nurse Station Feed Notifications */}
          <section className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl shadow-sm transition-colors text-left">
            <div className="p-md border-b border-outline-variant dark:border-slate-800 bg-surface-bright dark:bg-slate-900/50 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">chat_bubble</span>
              <h3 className="font-bold text-on-surface dark:text-white text-md">{t.stationFeed}</h3>
            </div>
            <div className="p-md space-y-md">

              <div className="flex gap-md p-sm hover:bg-surface-container-low dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 text-primary dark:text-primary-fixed-dim">
                  <span className="material-symbols-outlined text-sm">medical_information</span>
                </div>
                <div className="flex-1">
                  <p className="text-body-sm font-medium text-on-surface dark:text-slate-200">Dr. Aris (Cardiology) added new notes for Robert Sullivan.</p>
                  <p className="text-[10px] text-on-surface-variant dark:text-slate-400 mt-xs">2m ago</p>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
              </div>

              <div className="flex gap-md p-sm hover:bg-surface-container-low dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0 text-secondary dark:text-teal-400">
                  <span className="material-symbols-outlined text-sm">lab_research</span>
                </div>
                <div className="flex-1">
                  <p className="text-body-sm font-medium text-on-surface dark:text-slate-200">Lab Results: Elena Rodriguez - CBC Panel ready.</p>
                  <p className="text-[10px] text-on-surface-variant dark:text-slate-400 mt-xs">15m ago</p>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
              </div>

              <div className="flex gap-md p-sm bg-primary/5 border border-primary/20 rounded-lg group cursor-pointer text-left">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-white">
                  <span className="material-symbols-outlined text-sm">campaign</span>
                </div>
                <div className="flex-1">
                  <p className="text-body-sm font-bold text-primary dark:text-primary-fixed-dim">Shift Handover: Review new protocols in Staff Room.</p>
                  <p className="text-[10px] text-on-surface-variant dark:text-slate-400 mt-xs">1h ago</p>
                </div>
              </div>

            </div>
            <div className="p-md pt-0">
              <button className="w-full py-2 bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 rounded font-bold hover:bg-surface-container-highest dark:hover:bg-slate-750 transition-colors border-none cursor-pointer text-body-sm">
                {t.viewAllComms}
              </button>
            </div>
          </section>

          {/* Quick Ward Map Widget */}
          <section
            onClick={() => setActiveTab('Sơ đồ phòng')}
            className="bg-inverse-surface text-inverse-on-surface rounded-xl p-md shadow-lg overflow-hidden relative group cursor-pointer transition-transform hover:scale-[1.01]"
          >
            <div className="relative z-10 text-left">
              <h3 className="font-bold mb-md flex items-center gap-2 text-md text-white">
                <span className="material-symbols-outlined">map</span>
                <span>{t.floorName}</span>
              </h3>
              <div className="grid grid-cols-4 gap-sm">
                {['201', '202', '203', '204', 'NS', '205', '206', '207'].map((bed) => {
                  const isAlert = bed === '203' || (bed === '204' && !isAlertAcknowledged);
                  return (
                    <div
                      key={bed}
                      className={`h-11 rounded flex items-center justify-center border font-bold text-xs select-none ${isAlert
                          ? 'bg-error text-white border-error animate-pulse'
                          : bed === 'NS'
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white/10 text-white border-white/20 hover:bg-primary/40'
                        }`}
                    >
                      <span>{bed}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] mt-md opacity-85 text-slate-300 font-medium">
                {t.codeBlueDrill.replace('{time}', '2')}
              </p>
            </div>
            <div className="absolute bottom-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-white">apartment</span>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
