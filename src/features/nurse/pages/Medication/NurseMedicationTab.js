import React from 'react';

export default function NurseMedicationTab({
  lang,
  t,
  isDark,
  meds,
  handleAdministerMed
}) {
  return (
    <div className="space-y-lg text-left">
      <div className="mb-lg">
        <h3 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mb-xs font-bold">{t.medsSchedule}</h3>
        <p className="text-on-surface-variant dark:text-slate-400 font-body-md">Timetable for shift medication deliveries.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors p-lg space-y-md">
        {meds.map(med => (
          <div key={med.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-md bg-surface-container-low dark:bg-slate-950 rounded-lg gap-md border border-outline-variant dark:border-slate-800">
            <div className="flex items-center gap-md">
              <div className={`p-2.5 rounded-full ${med.status === 'ADMINISTERED'
                  ? 'bg-secondary/15 text-secondary dark:text-teal-400'
                  : med.urgent
                    ? 'bg-error/15 text-error dark:text-red-400'
                    : 'bg-tertiary/15 text-tertiary dark:text-amber-400'
                }`}>
                <span className="material-symbols-outlined">pill</span>
              </div>
              <div>
                <p className="font-bold text-on-surface dark:text-white text-md leading-tight">{med.name}</p>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1">{med.details} | <span className="font-bold">{med.time}</span></p>
              </div>
            </div>

            <div className="flex items-center gap-md">
              {med.status === 'ADMINISTERED' ? (
                <span className="bg-secondary/10 text-secondary dark:bg-teal-950/40 dark:text-teal-400 px-3 py-1 rounded text-xs font-bold uppercase">
                  {t.administered}
                </span>
              ) : (
                <>
                  {med.urgent && (
                    <span className="bg-error/10 text-error dark:bg-red-955/40 dark:text-red-400 px-3 py-1 rounded text-xs font-bold uppercase animate-pulse">
                      {t.urgent}
                    </span>
                  )}
                  <button
                    onClick={() => handleAdministerMed(med.id)}
                    className="bg-primary text-white dark:bg-primary-container dark:text-on-primary-container px-lg py-1.5 rounded-lg font-bold text-xs hover:brightness-110 transition-all border-none cursor-pointer"
                  >
                    {t.administer}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
