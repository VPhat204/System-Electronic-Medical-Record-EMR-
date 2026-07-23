import React, { useState } from 'react';
import UserProfileTab from '../../../../shared/components/UserProfileTab';

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
  const [activeSubTab, setActiveSubTab] = useState('profile');

  return (
    <div className="space-y-lg text-left">
      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-outline-variant dark:border-slate-800 gap-md">
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`flex items-center gap-xs px-md py-3 font-label-md text-label-md transition-all border-b-2 bg-transparent cursor-pointer outline-none ${
            activeSubTab === 'profile'
              ? 'border-primary text-primary dark:text-primary-fixed-dim font-bold'
              : 'border-transparent text-on-surface-variant dark:text-slate-400 hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">person</span>
          <span>{lang === 'vi' ? 'Hồ sơ cá nhân' : 'User Profile'}</span>
        </button>
        <button
          onClick={() => setActiveSubTab('config')}
          className={`flex items-center gap-xs px-md py-3 font-label-md text-label-md transition-all border-b-2 bg-transparent cursor-pointer outline-none ${
            activeSubTab === 'config'
              ? 'border-primary text-primary dark:text-primary-fixed-dim font-bold'
              : 'border-transparent text-on-surface-variant dark:text-slate-400 hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
          <span>{lang === 'vi' ? 'Cấu hình hệ thống' : 'System Preferences'}</span>
        </button>
      </div>

      <div className="pb-xl">
        {activeSubTab === 'profile' ? (
          <div className="animate-in fade-in duration-200">
            <UserProfileTab lang={lang} />
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-lg items-start text-left animate-in fade-in duration-200">
            {/* Language Selection Card (4 Cols) */}
            <div className="col-span-12 lg:col-span-4 space-y-lg">
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
                      : 'border-outline-variant dark:border-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <div className="flex items-center gap-sm">
                      <span className="w-6 h-4 bg-red-600 rounded-sm"></span>
                      <span className={`font-body-md text-body-md dark:text-white ${lang === 'vi' ? 'font-bold' : ''}`}>{t.vietnameseLabel}</span>
                    </div>
                    {lang === 'vi' ? <span className="material-symbols-outlined text-primary">check_circle</span> : <div className="w-5 h-5 rounded-full border-2"></div>}
                  </label>

                  <label
                    onClick={() => setLang('en')}
                    className={`flex items-center justify-between p-sm border rounded-lg cursor-pointer transition-all ${lang === 'en'
                      ? 'border-primary bg-primary/5 dark:bg-slate-700'
                      : 'border-outline-variant dark:border-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <div className="flex items-center gap-sm">
                      <span className="w-6 h-4 bg-blue-800 rounded-sm"></span>
                      <span className={`font-body-md text-body-md dark:text-white ${lang === 'en' ? 'font-bold' : ''}`}>{t.englishLabel}</span>
                    </div>
                    {lang === 'en' ? <span className="material-symbols-outlined text-primary">check_circle</span> : <div className="w-5 h-5 rounded-full border-2"></div>}
                  </label>
                </div>
              </section>
            </div>

            {/* Notification and Preferences (8 Cols) */}
            <div className="col-span-12 lg:col-span-8 space-y-lg">
              <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 shadow-xs">
                <div className="flex items-center gap-sm mb-lg text-primary dark:text-primary-fixed-dim">
                  <span className="material-symbols-outlined">notifications_active</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.notificationConfigHeader}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="p-md border border-outline-variant dark:border-slate-700 rounded-lg flex items-start gap-md bg-white dark:bg-slate-800">
                    <div className="w-10 h-10 rounded-lg bg-secondary-container/20 text-on-secondary-container flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined">person_add</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-xs">
                        <p className="font-bold text-on-surface dark:text-white text-body-md">{t.newRegAlertTitle}</p>
                        <button
                          type="button"
                          onClick={() => setSettingsForm({ ...settingsForm, notifyNewRegistration: !settingsForm.notifyNewRegistration })}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none ${settingsForm.notifyNewRegistration ? 'bg-primary' : 'bg-surface-dim'}`}
                        >
                          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ${settingsForm.notifyNewRegistration ? 'translate-x-5' : 'translate-x-0'}`}></span>
                        </button>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 leading-tight">{t.newRegAlertDesc}</p>
                    </div>
                  </div>

                  <div className="p-md border border-outline-variant dark:border-slate-700 rounded-lg flex items-start gap-md bg-white dark:bg-slate-800">
                    <div className="w-10 h-10 rounded-lg bg-tertiary-container/10 text-tertiary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined">account_balance_wallet</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-xs">
                        <p className="font-bold text-on-surface dark:text-white text-body-md">{t.paymentAlertTitle}</p>
                        <button
                          type="button"
                          onClick={() => setSettingsForm({ ...settingsForm, notifyPayment: !settingsForm.notifyPayment })}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none ${settingsForm.notifyPayment ? 'bg-primary' : 'bg-surface-dim'}`}
                        >
                          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ${settingsForm.notifyPayment ? 'translate-x-5' : 'translate-x-0'}`}></span>
                        </button>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 leading-tight">{t.paymentAlertDesc}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 shadow-xs">
                <div className="flex items-center gap-sm mb-lg text-primary dark:text-primary-fixed-dim">
                  <span className="material-symbols-outlined">desktop_windows</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.workspacePrefsHeader}</h3>
                </div>
                <div className="space-y-md">
                  <div className="flex items-center justify-between py-sm border-b border-outline-variant dark:border-slate-700">
                    <div>
                      <p className="font-bold text-on-surface dark:text-white text-body-md">{t.autoRefreshLabel}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{t.autoRefreshDesc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSettingsForm({ ...settingsForm, autoRefreshQueue: !settingsForm.autoRefreshQueue })}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none ${settingsForm.autoRefreshQueue ? 'bg-primary' : 'bg-surface-dim'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ${settingsForm.autoRefreshQueue ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </div>
                </div>
              </section>

              <div className="flex justify-end gap-md pt-md">
                <button onClick={handleCancelSettings} className="px-xl py-sm rounded-lg border text-on-surface-variant dark:text-slate-300 font-label-md text-label-md hover:bg-surface-container transition-colors">{t.cancelBtn}</button>
                <button onClick={handleSaveChangesSettings} className="px-xl py-sm rounded-lg bg-primary text-white font-label-md text-label-md shadow-xs">{t.saveChangesBtn}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
