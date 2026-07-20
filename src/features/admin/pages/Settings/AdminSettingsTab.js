import React from 'react';
import useAdminSettings from '../../hooks/useAdminSettings';

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
  return (
    <div className="space-y-gutter text-left">
      
      {/* Page header summary */}
      <div>
        <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight">{t.settings}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mt-1">
          {lang === 'vi' ? 'Quản lý cấu hình cơ sở y tế, ngôn ngữ, múi giờ, phân hệ ứng dụng và tích hợp SMTP/API.' : 'Manage medical facility configuration, localization, application modules, and SMTP/API integration.'}
        </p>
      </div>

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

          <div className="p-lg space-y-lg">
            <div className="space-y-xs">
              <label className="font-label-md text-[12px] text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Ngôn ngữ hệ thống' : 'System Language'}</label>
              <select
                value={systemLang}
                onChange={(e) => {
                  setSystemLang(e.target.value);
                  setLang(e.target.value);
                }}
                className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg bg-surface-container-lowest dark:bg-slate-900 dark:text-white outline-none text-body-md"
              >
                <option value="vi">Tiếng Việt (Vietnam)</option>
                <option value="en">English (US)</option>
              </select>
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-[12px] text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Múi giờ' : 'Timezone'}</label>
              <select
                value={systemTimezone}
                onChange={(e) => setSystemTimezone(e.target.value)}
                className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg bg-surface-container-lowest dark:bg-slate-900 dark:text-white outline-none text-body-md"
              >
                <option value="GMT+07:00">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                <option value="GMT+08:00">(GMT+08:00) Singapore, Taipei, Beijing</option>
                <option value="GMT+00:00">(GMT+00:00) London, UTC</option>
              </select>
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-[12px] text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Định dạng ngày tháng' : 'Date Format'}</label>
              <div className="flex items-center justify-between p-sm border border-outline-variant dark:border-slate-700 rounded-lg bg-surface-container-lowest dark:bg-slate-900 text-body-md">
                <label className="flex items-center gap-xs cursor-pointer text-on-surface dark:text-slate-200">
                  <input
                    type="radio"
                    name="datefmt"
                    checked={systemDateFormat === 'DD/MM/YYYY'}
                    onChange={() => setSystemDateFormat('DD/MM/YYYY')}
                    className="text-primary focus:ring-primary animate-none"
                  />
                  <span>DD/MM/YYYY</span>
                </label>
                <label className="flex items-center gap-xs cursor-pointer text-on-surface dark:text-slate-200">
                  <input
                    type="radio"
                    name="datefmt"
                    checked={systemDateFormat === 'MM-DD-YYYY'}
                    onChange={() => setSystemDateFormat('MM-DD-YYYY')}
                    className="text-primary focus:ring-primary"
                  />
                  <span>MM-DD-YYYY</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Module Management Section */}
        <section className="col-span-12 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xs transition-shadow">
          <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 flex items-center justify-between bg-surface-container-lowest dark:bg-slate-900/60">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">extension</span>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{lang === 'vi' ? 'Quản lý các module ứng dụng' : 'Application Modules'}</h3>
            </div>
            <span className="px-sm py-xs bg-secondary-container text-on-secondary-container dark:bg-teal-950/40 dark:text-teal-400 font-label-md text-[11px] rounded uppercase tracking-wider">
              {lang === 'vi' ? 'Thành viên Enterprise' : 'Enterprise Subscription'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container dark:bg-slate-900/40 border-b border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-400">
                  <th className="px-lg py-sm font-label-md text-label-md text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Phân hệ' : 'Module'}</th>
                  <th className="px-lg py-sm font-label-md text-label-md text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Phiên bản' : 'Version'}</th>
                  <th className="px-lg py-sm font-label-md text-label-md text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Tình trạng' : 'Status'}</th>
                  <th className="px-lg py-sm font-label-md text-label-md text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Cập nhật' : 'Updated'}</th>
                  <th className="px-lg py-sm font-label-md text-label-md text-[11px] uppercase tracking-wider text-right">{lang === 'vi' ? 'Thao tác' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 dark:divide-slate-700 font-body-sm text-on-surface dark:text-slate-200">
                {modulesState.map((m) => (
                  <tr key={m.id} className="hover:bg-surface-container-low dark:hover:bg-slate-700/30 transition-all">
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-md">
                        <div className="w-8 h-8 rounded bg-primary-container/20 dark:bg-primary/10 text-primary dark:text-primary-fixed-dim flex items-center justify-center flex-shrink-0 animate-none">
                          <span className="material-symbols-outlined text-[18px]">{m.icon}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-on-surface dark:text-white text-body-md">{lang === 'vi' ? m.nameVi : m.nameEn}</p>
                          <p className="text-xs text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? m.descVi : m.descEn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-lg py-md font-data-mono text-[12px]">{m.version}</td>
                    <td className="px-lg py-md">
                      {m.active ? (
                        <span className="px-sm py-0.5 bg-secondary-container/60 text-on-secondary-container dark:bg-teal-950/40 dark:text-teal-400 rounded-full text-xs font-semibold">
                          {lang === 'vi' ? 'Đang hoạt động' : 'Active'}
                        </span>
                      ) : (
                        <span className="px-sm py-0.5 bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-400 rounded-full text-xs font-semibold">
                          {lang === 'vi' ? 'Tạm dừng' : 'Suspended'}
                        </span>
                      )}
                    </td>
                    <td className="px-lg py-md">{m.updateDate}</td>
                    <td className="px-lg py-md text-right">
                      <div className="flex items-center justify-end gap-sm">
                        <button
                          onClick={() => alert(lang === 'vi' ? `Cấu hình module: ${m.nameVi}` : `Configuring module: ${m.nameEn}`)}
                          className="text-primary dark:text-primary-fixed-dim hover:underline text-[12px] font-bold"
                        >
                          {lang === 'vi' ? 'Cấu hình' : 'Configure'}
                        </button>
                        <span className="text-outline-variant dark:text-slate-700">|</span>
                        <button
                          onClick={() => {
                            const updated = modulesState.map(mod => mod.id === m.id ? { ...mod, active: !mod.active } : mod);
                            setModulesState(updated);
                          }}
                          className={`text-[12px] font-bold hover:underline ${m.active ? 'text-error' : 'text-secondary dark:text-teal-400'}`}
                        >
                          {m.active ? (lang === 'vi' ? 'Vô hiệu' : 'Disable') : (lang === 'vi' ? 'Kích hoạt' : 'Enable')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Email Server (SMTP) & Push Notifications */}
        <section className="col-span-12 lg:col-span-6 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xs transition-shadow text-body-md">
          <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 flex items-center gap-sm bg-surface-container-lowest dark:bg-slate-900/60">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">mail</span>
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{lang === 'vi' ? 'Cấu hình Thông báo & Email' : 'Notifications & Email Configuration'}</h3>
          </div>

          <div className="p-lg space-y-lg">
            {/* SMTP Configuration Card */}
            <div className="p-md bg-surface-container-low dark:bg-slate-900/40 rounded-xl space-y-md border border-outline-variant dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-on-surface dark:text-white">{lang === 'vi' ? 'Server SMTP' : 'SMTP Outbound Server'}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smtpEnabled}
                    onChange={(e) => setSmtpEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-outline-variant peer-checked:bg-primary rounded-full transition-colors after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>

              {smtpEnabled && (
                <div className="grid grid-cols-2 gap-md pt-sm border-t border-outline-variant/40 dark:border-slate-700/60">
                  <div className="space-y-xs">
                    <label className="text-[10px] font-bold text-on-surface-variant dark:text-slate-400 block uppercase tracking-wider">Host</label>
                    <input
                      type="text"
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                      className="w-full px-sm py-2 border border-outline-variant dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 dark:text-white outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>
                  
                  <div className="space-y-xs">
                    <label className="text-[10px] font-bold text-on-surface-variant dark:text-slate-400 block uppercase tracking-wider">Port</label>
                    <input
                      type="text"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                      className="w-full px-sm py-2 border border-outline-variant dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 dark:text-white outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>

                  <div className="col-span-2 space-y-xs">
                    <label className="text-[10px] font-bold text-on-surface-variant dark:text-slate-400 block uppercase tracking-wider">{lang === 'vi' ? 'Tên đăng nhập / Email' : 'Username / Email'}</label>
                    <input
                      type="text"
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                      className="w-full px-sm py-2 border border-outline-variant dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 dark:text-white outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Push notification settings */}
            <div className="space-y-md text-left">
              <h4 className="font-semibold text-on-surface dark:text-white border-b border-outline-variant dark:border-slate-700 pb-sm">
                {lang === 'vi' ? 'Thông báo đẩy (Firebase/Web Push)' : 'Push Notifications (FCM / Web Push)'}
              </h4>
              <label className="flex items-center gap-md cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushPatient}
                  onChange={(e) => setPushPatient(e.target.checked)}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <span className="text-on-surface dark:text-slate-200">{lang === 'vi' ? 'Gửi thông báo nhắc lịch khám cho bệnh nhân' : 'Send appointment reminders to patients'}</span>
              </label>

              <label className="flex items-center gap-md cursor-pointer mt-md">
                <input
                  type="checkbox"
                  checked={pushDoctor}
                  onChange={(e) => setPushDoctor(e.target.checked)}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary animate-none"
                />
                <span className="text-on-surface dark:text-slate-200">{lang === 'vi' ? 'Gửi báo cáo ca trực cho bác sĩ trưởng khoa' : 'Send shift summary reports to department heads'}</span>
              </label>
            </div>
          </div>
        </section>

        {/* 5. API Integration Section */}
        <section className="col-span-12 lg:col-span-6 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xs transition-shadow">
          <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 flex items-center gap-sm bg-surface-container-lowest dark:bg-slate-900/60">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim animate-none">hub</span>
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{lang === 'vi' ? 'Tích hợp API Bên ngoài' : 'External API Integrations'}</h3>
          </div>

          <div className="p-lg space-y-lg text-body-md text-left">
            <div className="space-y-md">
              
              {/* Active Connection 1 */}
              <div className="flex items-center justify-between p-md border border-outline-variant dark:border-slate-700 rounded-lg bg-surface-container-lowest dark:bg-slate-900">
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 bg-surface-container-high dark:bg-slate-700 rounded flex items-center justify-center font-bold text-on-surface-variant dark:text-slate-300 flex-shrink-0">SSO</div>
                  <div>
                    <p className="font-semibold text-on-surface dark:text-white">{lang === 'vi' ? 'Microsoft Azure AD' : 'Microsoft Azure AD SSO'}</p>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Đăng nhập một lần cho nhân viên' : 'Single sign-on connection for staff'}</p>
                  </div>
                </div>
                <span className="px-sm py-0.5 bg-secondary-container/60 text-on-secondary-container dark:bg-teal-950/40 dark:text-teal-400 rounded-full text-[10px] font-bold uppercase">
                  {lang === 'vi' ? 'Đang kết nối' : 'Connected'}
                </span>
              </div>

              {/* Configurable connection 2 */}
              <div className="flex items-center justify-between p-md border border-outline-variant dark:border-slate-700 rounded-lg bg-surface-container-lowest dark:bg-slate-900">
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 bg-surface-container-high dark:bg-slate-700 rounded flex items-center justify-center font-bold text-on-surface-variant dark:text-slate-300 flex-shrink-0">LIS</div>
                  <div>
                    <p className="font-semibold text-on-surface dark:text-white">{lang === 'vi' ? 'Roche Laboratory Hub' : 'Roche Laboratory Analyzer Hub'}</p>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Tự động đồng bộ kết quả xét nghiệm' : 'Auto-sync blood analyzer diagnostics'}</p>
                  </div>
                </div>
                <button
                  onClick={() => alert(lang === 'vi' ? 'Mở cấu hình cổng kết nối Roche...' : 'Opening Roche connectivity settings...')}
                  className="px-md py-1 border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim rounded-lg text-xs hover:bg-primary hover:text-white dark:hover:bg-primary-fixed-dim dark:hover:text-on-primary transition-all font-bold"
                >
                  {lang === 'vi' ? 'Cấu hình' : 'Config'}
                </button>
              </div>

              {/* Add new integration mock */}
              <div
                onClick={() => alert(lang === 'vi' ? 'Tính năng đăng ký kết nối HL7 FHIR đang được phát triển.' : 'HL7 FHIR API endpoint registration in development.')}
                className="flex items-center justify-between p-md border border-outline-variant dark:border-slate-700 rounded-lg border-dashed bg-slate-50/20 dark:bg-slate-900/10 cursor-pointer hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-md opacity-60">
                  <div className="w-10 h-10 bg-surface-container dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface dark:text-white animate-none">add</span>
                  </div>
                  <p className="font-semibold text-on-surface dark:text-white">{lang === 'vi' ? 'Thêm tích hợp mới (HL7 FHIR, HL7 v2...)' : 'Add integration port (HL7 FHIR, HL7 v2...)'}</p>
                </div>
              </div>

            </div>

            {/* API warning box */}
            <div className="p-md bg-error-container/40 dark:bg-red-950/20 text-on-error-container dark:text-red-400 rounded-xl flex gap-md items-start border border-error/15">
              <span className="material-symbols-outlined shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>report</span>
              <div>
                <p className="font-bold text-sm">{lang === 'vi' ? 'Cảnh báo bảo mật API' : 'External API Security Threat'}</p>
                <p className="text-xs opacity-90 mt-0.5 leading-relaxed">
                  {lang === 'vi'
                    ? 'Có 12 yêu cầu API thất bại từ địa chỉ IP không xác định trong 1 giờ qua. Vui lòng kiểm tra lại Whitelist IP.'
                    : 'Detected 12 unauthorized REST API attempts from unregistered endpoints. Verify whitelist whitelist settings immediately.'}
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer Action Bar */}
      <div className="flex justify-end items-center gap-md pt-xl border-t border-outline-variant dark:border-slate-700">
        <button
          onClick={() => setActiveTab('Dashboard')}
          className="px-lg py-2.5 border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-300 font-label-md text-[13px] rounded-lg hover:bg-surface-container dark:hover:bg-slate-700 transition-all"
        >
          {lang === 'vi' ? 'Hủy bỏ' : 'Cancel'}
        </button>
        <button
          onClick={() => alert(lang === 'vi' ? '💾 Đã lưu toàn bộ cấu hình hệ thống thành công!' : '💾 Global system configuration settings saved successfully!')}
          className="px-xl py-2.5 bg-primary text-white font-headline-md text-headline-md rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-sm shadow-lg"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          {lang === 'vi' ? 'Lưu toàn bộ cấu hình' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
}
