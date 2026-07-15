import React from 'react';

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
  const settingsText = {
    vi: {
      title: 'Hệ thống Cài đặt',
      subtitle: 'Quản lý cấu hình lâm sàng, bảo mật và tùy chọn hiển thị cho hệ thống MedCore.',
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
      title: 'System Settings',
      subtitle: 'Manage clinical configuration, security, and display options for the MedCore system.',
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
  }[lang];

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
        <div className="flex gap-md shrink-0 w-full md:w-auto">
          <button 
            type="button"
            onClick={() => {
              setHospitalName('Bệnh viện Đa khoa MedCore');
              setHospitalAddress('123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh');
              setIs2faEnabled(true);
              setSessionTimeout('30 phút');
              alert(settingsText.cancelledMsg);
            }}
            className="flex-1 md:flex-none px-xl py-2 border border-outline dark:border-slate-700 text-on-surface-variant dark:text-slate-300 font-label-md rounded-lg bg-transparent hover:bg-surface-container-high dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
          >
            {settingsText.cancel}
          </button>
          <button 
            type="button"
            onClick={() => alert(settingsText.savedMsg)}
            className="flex-1 md:flex-none px-xl py-2 bg-primary dark:bg-primary-container text-white dark:text-on-primary-container font-label-md rounded-lg shadow-sm hover:bg-primary/90 active:scale-95 transition-all cursor-pointer"
          >
            {settingsText.save}
          </button>
        </div>
      </div>

      <div className="space-y-xl">
        {/* Facility Information Section */}
        <section className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-2xl p-xl shadow-sm transition-colors">
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
                  className="w-full px-md py-sm border border-outline-variant dark:border-slate-800 rounded-lg bg-surface-container-lowest dark:bg-slate-950 text-on-surface dark:text-white text-body-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-sm">
                <label className="block font-label-md text-on-surface-variant dark:text-slate-400">{settingsText.facilityId}</label>
                <div className="flex items-center gap-sm px-md py-sm border border-outline-variant dark:border-slate-800 rounded-lg bg-surface-container-low dark:bg-slate-850 text-on-surface-variant dark:text-slate-400 italic cursor-not-allowed select-none">
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
                className="w-full px-md py-sm border border-outline-variant dark:border-slate-800 rounded-lg bg-surface-container-lowest dark:bg-slate-950 text-on-surface dark:text-white text-body-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[100px]"
              />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
          {/* Security Section */}
          <section className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-2xl p-xl shadow-sm transition-colors h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-sm mb-lg border-b border-surface-container dark:border-slate-800 pb-md">
                <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">verified_user</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">
                    {settingsText.securityTitle}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant dark:text-slate-400">
                    {settingsText.securityDesc}
                  </p>
                </div>
              </div>
              <div className="space-y-lg divide-y divide-surface-container dark:divide-slate-800">
                <div className="flex items-center justify-between py-md first:pt-0">
                  <div>
                    <p className="font-label-md text-on-surface dark:text-white">{settingsText.twoFactor}</p>
                    <p className="text-body-sm text-on-surface-variant dark:text-slate-400">{settingsText.twoFactorDesc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={is2faEnabled}
                      onChange={(e) => setIs2faEnabled(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-12 h-6 bg-surface-container-high dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-primary-container shadow-inner"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-md">
                  <div>
                    <p className="font-label-md text-on-surface dark:text-white">{settingsText.sessionTimeout}</p>
                    <p className="text-body-sm text-on-surface-variant dark:text-slate-400">{settingsText.sessionTimeoutDesc}</p>
                  </div>
                  <select 
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="px-md py-sm border border-outline-variant dark:border-slate-800 rounded-lg bg-surface-container-lowest dark:bg-slate-950 text-on-surface dark:text-white text-body-md outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="30 phút">{lang === 'vi' ? '30 phút' : '30 minutes'}</option>
                    <option value="1 giờ">{lang === 'vi' ? '1 giờ' : '1 hour'}</option>
                    <option value="8 giờ">{lang === 'vi' ? '8 giờ' : '8 hours'}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="pt-md mt-md">
              <button 
                type="button"
                onClick={() => alert(lang === 'vi' ? 'Đang chuyển tới trang đổi mật khẩu...' : 'Redirecting to password reset page...')}
                className="w-full py-sm border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim font-label-md rounded-lg hover:bg-primary/5 dark:hover:bg-primary-container/10 transition-colors bg-transparent cursor-pointer font-bold text-xs"
              >
                {settingsText.changePassword}
              </button>
            </div>
          </section>

          {/* Notifications Summary Section */}
          <section className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-2xl p-xl shadow-sm transition-colors">
            <div className="flex items-center gap-sm mb-lg border-b border-surface-container dark:border-slate-800 pb-md">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">notifications_active</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white">
                  {settingsText.notificationsTitle}
                </h3>
                <p className="text-body-sm text-on-surface-variant dark:text-slate-400">
                  {settingsText.notificationsDesc}
                </p>
              </div>
            </div>
            <div className="space-y-md">
              <div className="flex items-center justify-between">
                <span className="text-body-md font-medium text-on-surface dark:text-white">{settingsText.newAppointment}</span>
                <div className="flex gap-sm">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-primary-fixed-dim">EMAIL</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary-container dark:bg-teal-955 text-on-secondary-container dark:text-teal-400">APP</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body-md font-medium text-on-surface dark:text-white">{settingsText.labResults}</span>
                <div className="flex gap-sm">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-primary-fixed-dim">EMAIL</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-tertiary-fixed dark:bg-amber-900 text-on-tertiary-fixed dark:text-amber-400">SMS</span>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => alert(lang === 'vi' ? 'Đang mở tùy chọn thông báo...' : 'Opening notification preferences...')}
                className="w-full text-center text-primary dark:text-primary-fixed-dim font-bold text-xs mt-sm hover:underline border-none bg-transparent cursor-pointer"
              >
                {settingsText.manageNotifications}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
