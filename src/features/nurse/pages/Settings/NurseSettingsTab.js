import React, { useState } from 'react';
import UserProfileTab from '../../../../shared/components/UserProfileTab';

export default function NurseSettingsTab({
  lang,
  t,
  isDark,
  hospitalName,
  setHospitalName,
  hospitalAddress,
  setHospitalAddress,
  is2faEnabled,
  setIs2faEnabled,
  sessionTimeout,
  setSessionTimeout
}) {
  const [activeSubTab, setActiveSubTab] = useState('profile');

  const settingsText = {
    vi: {
      title: 'Thiết Lập & Hồ Sơ Điều Dưỡng',
      subtitle: 'Quản lý thông tin chứng chỉ điều dưỡng và các tùy chỉnh hệ thống lâm sàng.',
      profileTab: 'Hồ sơ cá nhân',
      cancel: 'Hủy bỏ',
      save: 'Lưu thay đổi',
      facilityTitle: 'Thông tin Cơ sở',
      facilityDesc: 'Thông tin nhận diện bệnh viện hoặc phòng khám của bạn.',
      facilityName: 'Tên Bệnh viện/Phòng khám',
      facilityId: 'Mã số cơ sở (HMS ID)',
      address: 'Địa chỉ liên hệ',
      securityTitle: 'Bảo mật',
      securityDesc: 'Tăng cường lớp bảo vệ cho tài khoản.',
      twoFactor: 'Xác thực 2 yếu tố (2FA)',
      twoFactorDesc: 'Thêm lớp bảo mật bằng mã xác thực.',
      sessionTimeout: 'Thời gian phiên làm việc',
      sessionTimeoutDesc: 'Tự động đăng xuất khi không hoạt động.',
      changePassword: 'Đổi mật khẩu hệ thống',
      notificationsTitle: 'Thông báo',
      notificationsDesc: 'Cấu hình cách nhận cập nhật.',
      newAppointment: 'Lịch hẹn mới',
      labResults: 'Kết quả xét nghiệm',
      manageNotifications: 'Quản lý chi tiết thông báo',
      savedMsg: 'Đã lưu thay đổi cài đặt hệ thống thành công!',
      cancelledMsg: 'Đã hủy bỏ các thay đổi cài đặt!'
    },
    en: {
      title: 'Nurse Settings & Profile',
      subtitle: 'Manage nurse credentials and clinical settings preferences.',
      profileTab: 'Personal Profile',
      cancel: 'Cancel',
      save: 'Save changes',
      facilityTitle: 'Facility Information',
      facilityDesc: 'Hospital or clinic identification information.',
      facilityName: 'Hospital/Clinic Name',
      facilityId: 'Facility ID (HMS ID)',
      address: 'Contact Address',
      securityTitle: 'Security',
      securityDesc: 'Enhance security layers for your account.',
      twoFactor: 'Two-Factor Authentication (2FA)',
      twoFactorDesc: 'Add an extra security layer using verification codes.',
      sessionTimeout: 'Session Timeout',
      sessionTimeoutDesc: 'Automatically log out when inactive.',
      changePassword: 'Change System Password',
      notificationsTitle: 'Notifications',
      notificationsDesc: 'Configure update delivery methods.',
      newAppointment: 'New Appointment',
      labResults: 'Lab Results',
      manageNotifications: 'Manage Notification Details',
      savedMsg: 'System settings saved successfully!',
      cancelledMsg: 'Settings changes discarded!'
    }
  }[lang || 'vi'];

  return (
    <div className="space-y-lg text-left">
      {/* Settings Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md mb-xl">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-primary dark:text-primary-fixed-dim leading-tight font-bold">
            {settingsText.title}
          </h2>
          <p className="text-body-lg text-on-surface-variant dark:text-slate-400 mt-xs max-w-2xl">
            {settingsText.subtitle}
          </p>
        </div>
      </div>

      {/* Sub-tabs horizontal switcher */}
      <div className="flex border-b border-outline-variant dark:border-slate-800 gap-md">
        {[
          { id: 'profile', label: settingsText.profileTab, icon: 'person' },
          { id: 'facility', label: settingsText.facilityTitle, icon: 'domain' },
          { id: 'security', label: settingsText.securityTitle, icon: 'security' },
          { id: 'notifications', label: settingsText.notificationsTitle, icon: 'notifications_active' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`flex items-center gap-xs px-md py-3 font-label-md text-label-md border-b-2 bg-transparent cursor-pointer transition-all outline-none ${
              activeSubTab === tab.id
                ? 'border-primary text-primary dark:text-primary-fixed-dim font-bold'
                : 'border-transparent text-on-surface-variant dark:text-slate-400 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="pb-xl">
        {activeSubTab === 'profile' && (
          <div className="animate-in fade-in duration-200">
            <UserProfileTab lang={lang} />
          </div>
        )}

        {activeSubTab === 'facility' && (
          <div className="space-y-xl animate-in fade-in duration-200">
            <section className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-2xl p-xl shadow-sm">
              <div className="flex items-center gap-sm mb-lg border-b border-surface-container dark:border-slate-800 pb-md">
                <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">domain</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">
                    {settingsText.facilityTitle}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant dark:text-slate-400">
                    {settingsText.facilityDesc}
                  </p>
                </div>
              </div>
              <div className="space-y-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                  <div className="space-y-sm">
                    <label className="block font-label-md text-on-surface-variant dark:text-slate-400">{settingsText.facilityName}</label>
                    <input 
                      type="text" 
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      className="w-full px-md py-sm border border-outline-variant dark:border-slate-800 rounded-lg bg-surface-container-lowest dark:bg-slate-950 text-on-surface dark:text-white outline-none"
                    />
                  </div>
                  <div className="space-y-sm">
                    <label className="block font-label-md text-on-surface-variant dark:text-slate-400">{settingsText.facilityId}</label>
                    <div className="flex items-center gap-sm px-md py-sm border border-outline-variant dark:border-slate-800 rounded-lg bg-surface-container-low dark:text-slate-400 italic">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      <span className="text-body-md">HMS-VN-10293</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-sm">
                  <label className="block font-label-md text-on-surface-variant dark:text-slate-400">{settingsText.address}</label>
                  <textarea 
                    rows="3"
                    value={hospitalAddress}
                    onChange={(e) => setHospitalAddress(e.target.value)}
                    className="w-full px-md py-sm border border-outline-variant dark:border-slate-800 rounded-lg bg-surface-container-lowest dark:bg-slate-950 text-on-surface dark:text-white outline-none min-h-[100px]"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeSubTab === 'security' && (
          <div className="space-y-xl animate-in fade-in duration-200">
            <section className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-2xl p-xl shadow-sm">
              <h3 className="font-headline-md font-bold text-on-surface dark:text-white mb-lg">{settingsText.securityTitle}</h3>
              <div className="flex flex-col sm:flex-row justify-between items-center p-md bg-surface-container-low dark:bg-slate-950 rounded-xl border border-outline-variant dark:border-slate-800 gap-md">
                <div>
                  <p className="font-bold text-on-surface dark:text-white">{settingsText.twoFactor}</p>
                  <p className="text-xs text-outline">{settingsText.twoFactorDesc}</p>
                </div>
                <button onClick={() => setIs2faEnabled(!is2faEnabled)} className="px-md py-1.5 border rounded-lg bg-transparent text-primary dark:text-primary-fixed-dim">{is2faEnabled ? 'DISABLE' : 'ENABLE'}</button>
              </div>
            </section>
          </div>
        )}

        {activeSubTab === 'notifications' && (
          <div className="space-y-xl animate-in fade-in duration-200">
            <section className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-2xl p-xl shadow-sm text-center">
              <span className="material-symbols-outlined text-[48px] text-outline">notifications_off</span>
              <p className="text-body-md text-outline mt-md">{settingsText.notificationsDesc}</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
