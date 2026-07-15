import React from 'react';

export default function ReceptionistSettingsTab({
  lang,
  setLang,
  t,
  operatorProfile,
  handleEditOperatorProfile,
  settingsForm,
  setSettingsForm,
  handleCancelSettings,
  handleSaveChangesSettings,
}) {
  return (
    <>
      {/* Settings Canvas Split Layout */}
      <div className="grid grid-cols-12 gap-lg items-stretch text-left">

        {/* Left Column: Profile Card & Language (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-lg flex flex-col justify-between">

          {/* Operator Profile Card */}
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 overflow-hidden relative shadow-xs flex-grow">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-md">
                <div className="w-24 h-24 rounded-full border-4 border-surface-container dark:border-slate-700 overflow-hidden shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    alt="Vietnamese medical staff profile picture"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnerl56n_F9eFnvMNkioc0rRGXaRqhDKxKIwsGfnQEWaeW7G-CkwmS8AEliFrtssc_MJeBS4Fzmqxa48XciqTKBzE0ncgPi-sHdUFPVL2degXxiIr6xZXUWgXZYuOS6fke-EAB72UEGanr-QiEKTLWb-ZbWwIvngAACMxKyhrlEyZ8UYgQPIaPOgFbBfUxB7GI-K-0yVop9pTg9QAxBt4NOYezG5a62ShOVplek5dqKhObvRoSlzer"
                  />
                </div>
                <button
                  onClick={handleEditOperatorProfile}
                  className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full border-2 border-white dark:border-slate-800 hover:scale-105 transition-transform"
                  title={lang === 'vi' ? 'Sửa thông tin cá nhân' : 'Edit profile info'}
                >
                  <span className="material-symbols-outlined text-[16px] block">edit</span>
                </button>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">{operatorProfile.name}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? operatorProfile.role : operatorProfile.roleEn}</p>

              <div className="mt-lg w-full space-y-sm">
                <div className="flex justify-between items-center py-sm border-b border-outline-variant dark:border-slate-700">
                  <span className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase">{t.empCodeLabel}</span>
                  <span className="font-data-mono text-data-mono text-primary dark:text-primary-fixed-dim font-bold">{operatorProfile.code}</span>
                </div>
                <div className="flex justify-between items-center py-sm border-b border-outline-variant dark:border-slate-700">
                  <span className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase">{t.facilityLabel}</span>
                  <span className="font-body-md text-body-md dark:text-slate-200">{lang === 'vi' ? operatorProfile.clinicBranch : operatorProfile.clinicBranchEn}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Language Selection card */}
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-sm mb-md text-primary dark:text-primary-fixed-dim">
              <span className="material-symbols-outlined">language</span>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.languageLabel}</h3>
            </div>
            <div className="space-y-sm">
              <label
                onClick={() => setLang('vi')}
                className={`flex items-center justify-between p-sm border rounded-lg cursor-pointer transition-all ${lang === 'vi'
                  ? 'border-primary bg-primary/5 dark:bg-slate-700'
                  : 'border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
              >
                <div className="flex items-center gap-sm">
                  <span className="w-6 h-4 bg-red-600 rounded-sm"></span>
                  <span className={`font-body-md text-body-md dark:text-white ${lang === 'vi' ? 'font-bold' : ''}`}>{t.vietnameseLabel}</span>
                </div>
                {lang === 'vi' ? (
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">check_circle</span>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-outline dark:border-slate-500"></div>
                )}
              </label>

              <label
                onClick={() => setLang('en')}
                className={`flex items-center justify-between p-sm border rounded-lg cursor-pointer transition-all ${lang === 'en'
                  ? 'border-primary bg-primary/5 dark:bg-slate-700'
                  : 'border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
              >
                <div className="flex items-center gap-sm">
                  <span className="w-6 h-4 bg-blue-800 rounded-sm"></span>
                  <span className={`font-body-md text-body-md dark:text-white ${lang === 'en' ? 'font-bold' : ''}`}>{t.englishLabel}</span>
                </div>
                {lang === 'en' ? (
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">check_circle</span>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-outline dark:border-slate-500"></div>
                )}
              </label>
            </div>
          </section>

        </div>

        {/* Right Column: Notification settings & Preferences (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-lg flex flex-col justify-between">

          {/* Notification config cards */}
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-sm mb-lg text-primary dark:text-primary-fixed-dim">
              <span className="material-symbols-outlined">notifications_active</span>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.notificationConfigHeader}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {/* Alert 1 */}
              <div className="p-md border border-outline-variant dark:border-slate-700 rounded-lg hover:border-primary transition-colors flex items-start gap-md bg-white dark:bg-slate-800">
                <div className="w-10 h-10 rounded-lg bg-secondary-container/20 text-on-secondary-container dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">person_add</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-xs">
                    <p className="font-bold text-on-surface dark:text-white text-body-md">{t.newRegAlertTitle}</p>
                    <button
                      type="button"
                      onClick={() => setSettingsForm({ ...settingsForm, notifyNewRegistration: !settingsForm.notifyNewRegistration })}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${settingsForm.notifyNewRegistration ? 'bg-primary' : 'bg-surface-dim dark:bg-slate-700'
                        }`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${settingsForm.notifyNewRegistration ? 'translate-x-5' : 'translate-x-0'
                        }`}></span>
                    </button>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 leading-tight">{t.newRegAlertDesc}</p>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-md border border-outline-variant dark:border-slate-700 rounded-lg hover:border-primary transition-colors flex items-start gap-md bg-white dark:bg-slate-800">
                <div className="w-10 h-10 rounded-lg bg-tertiary-container/10 text-tertiary dark:text-amber-500 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-xs">
                    <p className="font-bold text-on-surface dark:text-white text-body-md">{t.paymentAlertTitle}</p>
                    <button
                      type="button"
                      onClick={() => setSettingsForm({ ...settingsForm, notifyPayment: !settingsForm.notifyPayment })}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${settingsForm.notifyPayment ? 'bg-primary' : 'bg-surface-dim dark:bg-slate-700'
                        }`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${settingsForm.notifyPayment ? 'translate-x-5' : 'translate-x-0'
                        }`}></span>
                    </button>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 leading-tight">{t.paymentAlertDesc}</p>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="p-md border border-outline-variant dark:border-slate-700 rounded-lg hover:border-primary transition-colors flex items-start gap-md bg-white dark:bg-slate-800">
                <div className="w-10 h-10 rounded-lg bg-surface-container dark:bg-slate-900 text-on-surface-variant dark:text-slate-300 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">event_repeat</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-xs">
                    <p className="font-bold text-on-surface dark:text-white text-body-md">{t.apptAlertTitle}</p>
                    <button
                      type="button"
                      onClick={() => setSettingsForm({ ...settingsForm, notifyApptChange: !settingsForm.notifyApptChange })}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${settingsForm.notifyApptChange ? 'bg-primary' : 'bg-surface-dim dark:bg-slate-700'
                        }`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${settingsForm.notifyApptChange ? 'translate-x-5' : 'translate-x-0'
                        }`}></span>
                    </button>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 leading-tight">{t.apptAlertDesc}</p>
                </div>
              </div>

              {/* Alert 4 */}
              <div className="p-md border border-error-container bg-error-container/5 rounded-lg flex items-start gap-md">
                <div className="w-10 h-10 rounded-lg bg-error text-white flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-xs">
                    <p className="font-bold text-error text-body-md">{t.emergencyAlertTitle}</p>
                    <span className="material-symbols-outlined text-error text-[18px]">lock</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-error-container leading-tight">{t.emergencyAlertDesc}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Workspace Preferences */}
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 shadow-xs flex-grow">
            <div className="flex items-center gap-sm mb-lg text-primary dark:text-primary-fixed-dim">
              <span className="material-symbols-outlined">desktop_windows</span>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.workspacePrefsHeader}</h3>
            </div>

            <div className="space-y-xl">
              {/* View modes */}
              <div>
                <h4 className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase mb-md tracking-wider">
                  {t.queueDisplayModeLabel}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
                  {/* List view */}
                  <div
                    onClick={() => setSettingsForm({ ...settingsForm, workspaceViewMode: 'list' })}
                    className={`p-md rounded-lg border-2 cursor-pointer transition-all ${settingsForm.workspaceViewMode === 'list'
                      ? 'border-primary bg-primary/5 dark:bg-slate-700'
                      : 'border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-sm">
                      <span className={`material-symbols-outlined text-[32px] ${settingsForm.workspaceViewMode === 'list' ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}>view_list</span>
                      <p className={`font-body-md text-body-md ${settingsForm.workspaceViewMode === 'list' ? 'font-bold dark:text-white' : 'dark:text-slate-300'}`}>{t.listViewOption}</p>
                    </div>
                  </div>

                  {/* Grid view */}
                  <div
                    onClick={() => setSettingsForm({ ...settingsForm, workspaceViewMode: 'grid' })}
                    className={`p-md rounded-lg border-2 cursor-pointer transition-all ${settingsForm.workspaceViewMode === 'grid'
                      ? 'border-primary bg-primary/5 dark:bg-slate-700'
                      : 'border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-sm">
                      <span className={`material-symbols-outlined text-[32px] ${settingsForm.workspaceViewMode === 'grid' ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}>grid_view</span>
                      <p className={`font-body-md text-body-md ${settingsForm.workspaceViewMode === 'grid' ? 'font-bold dark:text-white' : 'dark:text-slate-300'}`}>{t.gridViewOption}</p>
                    </div>
                  </div>

                  {/* Split screen view */}
                  <div
                    onClick={() => setSettingsForm({ ...settingsForm, workspaceViewMode: 'split' })}
                    className={`p-md rounded-lg border-2 cursor-pointer transition-all ${settingsForm.workspaceViewMode === 'split'
                      ? 'border-primary bg-primary/5 dark:bg-slate-700'
                      : 'border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-sm">
                      <span className={`material-symbols-outlined text-[32px] ${settingsForm.workspaceViewMode === 'split' ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}>splitscreen</span>
                      <p className={`font-body-md text-body-md ${settingsForm.workspaceViewMode === 'split' ? 'font-bold dark:text-white' : 'dark:text-slate-300'}`}>{t.splitViewOption}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail triggers */}
              <div className="space-y-md">
                {/* Auto refresh */}
                <div className="flex items-center justify-between py-sm border-b border-outline-variant dark:border-slate-700">
                  <div>
                    <p className="font-bold text-on-surface dark:text-white text-body-md">{t.autoRefreshLabel}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{t.autoRefreshDesc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettingsForm({ ...settingsForm, autoRefreshQueue: !settingsForm.autoRefreshQueue })}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${settingsForm.autoRefreshQueue ? 'bg-primary' : 'bg-surface-dim dark:bg-slate-700'
                      }`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${settingsForm.autoRefreshQueue ? 'translate-x-5' : 'translate-x-0'
                      }`}></span>
                  </button>
                </div>

                {/* Sound notify */}
                <div className="flex items-center justify-between py-sm border-b border-outline-variant dark:border-slate-700">
                  <div>
                    <p className="font-bold text-on-surface dark:text-white text-body-md">{t.soundNotifyLabel}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{t.soundNotifyDesc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettingsForm({ ...settingsForm, soundChimeNotification: !settingsForm.soundChimeNotification })}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${settingsForm.soundChimeNotification ? 'bg-primary' : 'bg-surface-dim dark:bg-slate-700'
                      }`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${settingsForm.soundChimeNotification ? 'translate-x-5' : 'translate-x-0'
                      }`}></span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Settings Action Footer */}
          <div className="flex justify-end gap-md pt-md">
            <button
              onClick={handleCancelSettings}
              className="px-xl py-sm rounded-lg border border-outline dark:border-slate-700 text-on-surface-variant dark:text-slate-300 font-label-md text-label-md hover:bg-surface-container dark:hover:bg-slate-700 hover:text-on-surface transition-colors active:scale-95"
            >
              {t.cancelBtn}
            </button>
            <button
              onClick={handleSaveChangesSettings}
              className="px-xl py-sm rounded-lg bg-primary text-white font-label-md text-label-md shadow-xs active:scale-95 transition-all"
            >
              {t.saveChangesBtn}
            </button>
          </div>

        </div>

      </div>
    </>
  );
}
