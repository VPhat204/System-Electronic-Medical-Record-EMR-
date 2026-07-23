import React, { useState } from 'react';
import useAdminSettings from '../../hooks/useAdminSettings';
import UserProfileTab from '../../../../shared/components/UserProfileTab';

export default function AdminSettingsTab({ lang, setLang, t }) {
  const {
    maintenanceMode,
    hospitalSettings,
    setHospitalSettings,
    smtpEnabled,
    setSmtpEnabled,
    smtpHost,
    setSmtpHost,
    smtpPort,
    setSmtpPort,
    smtpUser,
    setSmtpUser,
    pushPatient,
    setPushPatient,
    pushDoctor,
    setPushDoctor,
    systemLang,
    setSystemLang,
    systemTimezone,
    setSystemTimezone,
    systemDateFormat,
    setSystemDateFormat,
    modulesState,
    setModulesState
  } = useAdminSettings();

  const [activeSubTab, setActiveSubTab] = useState('profile');

  return (
    <div className="space-y-gutter text-left">
      {/* Page Header */}
      <div>
        <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight">{t.settings}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mt-1">
          {lang === 'vi' ? 'Quản lý thông tin tài khoản admin và cấu hình hệ thống bệnh viện.' : 'Manage administrator accounts and clinical facility parameters.'}
        </p>
      </div>

      {/* Sub-tab selection */}
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
          <span>{lang === 'vi' ? 'Cài đặt hệ thống' : 'System Config'}</span>
        </button>
      </div>

      <div className="pb-xl">
        {activeSubTab === 'profile' ? (
          <div className="animate-in fade-in duration-200">
            <UserProfileTab lang={lang} />
          </div>
        ) : (
          <div className="space-y-gutter animate-in fade-in duration-200">
            {/* Dashboard Header Summary widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              <div className="p-md bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl flex items-center gap-md hover:shadow-xs transition-shadow">
                <div className="w-12 h-12 bg-primary-container text-primary dark:bg-primary/20 dark:text-primary-fixed-dim rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">domain</span>
                </div>
                <div>
                  <p className="text-on-surface-variant dark:text-slate-400 font-label-md text-xs uppercase tracking-wider">{lang === 'vi' ? 'Trạng thái cơ sở' : 'Facility Status'}</p>
                  <p className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">{maintenanceMode ? (lang === 'vi' ? 'Bảo trì' : 'Maintenance') : (lang === 'vi' ? 'Đang hoạt động' : 'Active')}</p>
                </div>
              </div>

              <div className="p-md bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl flex items-center gap-md hover:shadow-xs transition-shadow">
                <div className="w-12 h-12 bg-secondary-container text-secondary dark:bg-teal-950/40 dark:text-teal-400 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">apps</span>
                </div>
                <div>
                  <p className="text-on-surface-variant dark:text-slate-400 font-label-md text-xs uppercase tracking-wider">{lang === 'vi' ? 'Phân hệ kích hoạt' : 'Active Modules'}</p>
                  <p className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">
                    {modulesState.filter(m => m.active).length} / {modulesState.length}
                  </p>
                </div>
              </div>

              <div className="p-md bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl flex items-center gap-md hover:shadow-xs transition-shadow">
                <div className="w-12 h-12 bg-tertiary-fixed text-tertiary dark:bg-orange-950/30 dark:text-orange-400 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">api</span>
                </div>
                <div>
                  <p className="text-on-surface-variant dark:text-slate-400 font-label-md text-xs uppercase tracking-wider">{lang === 'vi' ? 'Kết nối API' : 'External APIs'}</p>
                  <p className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">{lang === 'vi' ? '3 Tích hợp' : '3 Integrations'}</p>
                </div>
              </div>
            </div>

            {/* Bento Grid Settings */}
            <div className="grid grid-cols-12 gap-lg items-start">
              {/* 1. Basic Info Section */}
              <section className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xs transition-shadow">
                <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface-container-lowest dark:bg-slate-900/60">
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">festival</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{lang === 'vi' ? 'Thông tin cơ sở y tế' : 'Medical Facility Info'}</h3>
                  </div>
                  <button
                    onClick={() => alert(lang === 'vi' ? 'Đã lưu thay đổi thông tin cơ sở!' : 'Facility details successfully updated!')}
                    className="px-md py-1.5 bg-primary text-white font-label-md text-[12px] rounded-lg hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    {lang === 'vi' ? 'Lưu thay đổi' : 'Save'}
                  </button>
                </div>
                
                <div className="p-lg grid grid-cols-2 gap-lg">
                  <div className="col-span-2 md:col-span-1 space-y-xs">
                    <label className="font-label-md text-[12px] text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Tên cơ sở y tế' : 'Facility Name'}</label>
                    <input
                      type="text"
                      value={hospitalSettings.name}
                      onChange={(e) => setHospitalSettings({ ...hospitalSettings, name: e.target.value })}
                      className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg bg-surface-container-lowest dark:bg-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-primary text-body-md"
                    />
                  </div>
                  
                  <div className="col-span-2 md:col-span-1 space-y-xs">
                    <label className="font-label-md text-[12px] text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Mã số cơ sở (MST/GPKD)' : 'Facility Identifier (Tax/License)'}</label>
                    <input
                      type="text"
                      value={hospitalSettings.code}
                      readOnly
                      className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg bg-surface-container-low dark:bg-slate-950/80 text-on-surface-variant dark:text-slate-500 outline-none text-body-md cursor-not-allowed"
                    />
                  </div>

                  <div className="col-span-2 space-y-xs">
                    <label className="font-label-md text-[12px] text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Địa chỉ trụ sở chính' : 'Headquarters Address'}</label>
                    <input
                      type="text"
                      value={hospitalSettings.address}
                      onChange={(e) => setHospitalSettings({ ...hospitalSettings, address: e.target.value })}
                      className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg bg-surface-container-lowest dark:bg-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-primary text-body-md"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1 space-y-xs">
                    <label className="font-label-md text-[12px] text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Số điện thoại liên hệ' : 'Contact Phone'}</label>
                    <input
                      type="tel"
                      value={hospitalSettings.phone}
                      onChange={(e) => setHospitalSettings({ ...hospitalSettings, phone: e.target.value })}
                      className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg bg-surface-container-lowest dark:bg-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-primary text-body-md"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1 space-y-xs">
                    <label className="font-label-md text-[12px] text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Email quản trị' : 'Administrator Email'}</label>
                    <input
                      type="email"
                      value={hospitalSettings.email}
                      onChange={(e) => setHospitalSettings({ ...hospitalSettings, email: e.target.value })}
                      className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg bg-surface-container-lowest dark:bg-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-primary text-body-md"
                    />
                  </div>
                </div>
              </section>

              {/* 2. Localization Section */}
              <section className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xs transition-shadow">
                <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 flex items-center gap-sm bg-surface-container-lowest dark:bg-slate-900/60">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">language</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{lang === 'vi' ? 'Địa phương hóa' : 'Localization'}</h3>
                </div>
                <div className="p-lg space-y-md">
                  <div className="space-y-xs">
                    <label className="font-label-md text-[12px] text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Ngôn ngữ hệ thống mặc định' : 'Default System Language'}</label>
                    <select
                      value={systemLang}
                      onChange={(e) => setSystemLang(e.target.value)}
                      className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg bg-surface-container-lowest dark:bg-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-primary text-body-md dark:bg-slate-800"
                    >
                      <option value="vi">Tiếng Việt (Vietnamese)</option>
                      <option value="en">English (English)</option>
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="font-label-md text-[12px] text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Múi giờ hệ thống' : 'System Timezone'}</label>
                    <select
                      value={systemTimezone}
                      onChange={(e) => setSystemTimezone(e.target.value)}
                      className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg bg-surface-container-lowest dark:bg-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-primary text-body-md dark:bg-slate-800"
                    >
                      <option value="Asia/Ho_Chi_Minh">(GMT+07:00) Hanoi, Jakarta, Bangkok</option>
                      <option value="UTC">(UTC) Coordinated Universal Time</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
