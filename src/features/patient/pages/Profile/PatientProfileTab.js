import React from 'react';

export default function PatientProfileTab({ lang, t }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
      
      {/* 1. Personal Information Card (Span 8) */}
      <section className="md:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-sm text-left">
        <div className="p-lg border-b border-outline-variant dark:border-slate-700 flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim flex items-center gap-sm">
            <span className="material-symbols-outlined">badge</span> 
            {lang === 'vi' ? 'Thông tin cá nhân' : 'Personal Information'}
          </h2>
        </div>
        <div className="p-lg flex flex-col md:flex-row gap-xl items-start">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container dark:border-slate-700 ring-1 ring-outline-variant shadow-md">
              <img 
                className="w-full h-full object-cover" 
                alt="Patient profile avatar" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwo2C_dk0HpwFKTj4wKewVviyYkbYQz5hKgbX0B5qb1THrUqzrllVUp6S-j8Nn52jKu4IIwDQWg-NdtbXP7V79F1o5L2JTynJImEjQqz8Doz18ihOvxIC4p6ndawaKQEle39nuMPJF1L67lIl-qIGkeq3-hJ8E8BzNA22t5MIzXvflazLoE7oYn0kUXqcF2EBwMYySIVeubwZPGv0sBbqd84GImY1wLXJUxjNEux-FRl0uMMGv3zjx"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-md gap-x-xl w-full">
            <div className="space-y-1">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Họ và Tên' : 'Full Name'}
              </p>
              <p className="font-headline-md text-on-surface dark:text-white">Nguyễn Văn An</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Mã bệnh nhân' : 'Patient ID'}
              </p>
              <p className="font-data-mono text-primary dark:text-primary-fixed-dim font-bold">VN-782-990-CL</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Ngày sinh' : 'Date of Birth'}
              </p>
              <p className="font-body-lg text-on-surface dark:text-slate-300">
                {lang === 'vi' ? '15 tháng 08, 1982' : 'August 15, 1982'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Giới tính' : 'Gender'}
              </p>
              <p className="font-body-lg text-on-surface dark:text-slate-300">
                {lang === 'vi' ? 'Nam' : 'Male'}
              </p>
            </div>
            <div className="sm:col-span-2 space-y-1">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Mã số BHYT' : 'Health Insurance ID'}
              </p>
              <p className="font-data-mono text-on-surface dark:text-slate-300">GD4791234567890</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Medical Basics Card (Span 4) */}
      <section className="md:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-sm text-left">
        <div className="p-lg border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/50">
          <h2 className="font-headline-md text-headline-md text-tertiary dark:text-amber-500 flex items-center gap-sm">
            <span className="material-symbols-outlined">medical_information</span> 
            {lang === 'vi' ? 'Chỉ số cơ bản' : 'Basic Indicators'}
          </h2>
        </div>
        <div className="p-lg space-y-lg flex-grow">
          <div className="flex justify-between items-center p-md bg-surface-container-low dark:bg-slate-900/40 rounded-lg">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-error">bloodtype</span>
              <span className="font-label-md text-on-surface dark:text-slate-300">{lang === 'vi' ? 'Nhóm máu' : 'Blood Group'}</span>
            </div>
            <span className="font-headline-md text-on-surface dark:text-white">O+</span>
          </div>
          <div className="space-y-sm">
            <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
              {lang === 'vi' ? 'Dị ứng' : 'Allergies'}
            </p>
            <div className="flex flex-wrap gap-xs">
              <span className="px-sm py-1 bg-error-container text-on-error-container text-xs font-bold rounded">Penicillin</span>
              <span className="px-sm py-1 bg-error-container text-on-error-container text-xs font-bold rounded">{lang === 'vi' ? 'Phấn hoa' : 'Pollen'}</span>
            </div>
          </div>
          <div className="space-y-sm">
            <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
              {lang === 'vi' ? 'Bệnh mãn tính' : 'Chronic Conditions'}
            </p>
            <ul className="space-y-xs text-body-sm text-on-surface dark:text-slate-300">
              <li className="flex items-center gap-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> 
                {lang === 'vi' ? 'Cao huyết áp (Đang điều trị)' : 'Hypertension (Under treatment)'}
              </li>
              <li className="flex items-center gap-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> 
                {lang === 'vi' ? 'Rối loạn mỡ máu nhẹ' : 'Mild Hyperlipidemia'}
              </li>
            </ul>
          </div>
          <div className="p-sm bg-surface-container-highest dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded text-[11px] text-on-surface-variant dark:text-slate-400 italic">
            {lang === 'vi' 
              ? '* Thông tin y khoa cơ bản là chế độ chỉ đọc. Liên hệ bác sĩ để cập nhật.' 
              : '* Basic medical information is read-only. Contact your physician to update.'}
          </div>
        </div>
      </section>

      {/* 3. Contact Details Card (Span 6) */}
      <section className="md:col-span-6 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm text-left">
        <div className="p-lg border-b border-outline-variant dark:border-slate-700 flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim flex items-center gap-sm">
            <span className="material-symbols-outlined">contact_mail</span> 
            {lang === 'vi' ? 'Thông tin liên lạc' : 'Contact Details'}
          </h2>
          <button 
            onClick={() => alert(lang === 'vi' ? 'Yêu cầu chỉnh sửa thông tin liên hệ đã gửi.' : 'Contact modification request sent.')} 
            className="text-primary dark:text-primary-fixed-dim font-label-md hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span> 
            {lang === 'vi' ? 'Sửa' : 'Edit'}
          </button>
        </div>
        <div className="p-lg space-y-md">
          <div className="flex items-start gap-md">
            <div className="w-10 h-10 rounded bg-surface-container dark:bg-slate-900 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-300">call</span>
            </div>
            <div>
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase">{lang === 'vi' ? 'Điện thoại' : 'Phone'}</p>
              <p className="font-body-lg text-on-surface dark:text-slate-300">+84 90 123 4567</p>
            </div>
          </div>
          <div className="flex items-start gap-md">
            <div className="w-10 h-10 rounded bg-surface-container dark:bg-slate-900 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-300">mail</span>
            </div>
            <div>
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase">Email</p>
              <p className="font-body-lg text-on-surface dark:text-slate-300">an.nguyen82@email.vn</p>
            </div>
          </div>
          <div className="flex items-start gap-md">
            <div className="w-10 h-10 rounded bg-surface-container dark:bg-slate-900 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-300">location_on</span>
            </div>
            <div>
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase">{lang === 'vi' ? 'Địa chỉ thường trú' : 'Permanent Address'}</p>
              <p className="font-body-lg text-on-surface dark:text-slate-300">
                {lang === 'vi' 
                  ? '123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh' 
                  : '123 Le Loi Street, Ben Thanh Ward, District 1, Ho Chi Minh City'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Emergency Contact Card (Span 6) */}
      <section className="md:col-span-6 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm text-left">
        <div className="p-lg border-b border-outline-variant dark:border-slate-700 flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-error flex items-center gap-sm">
            <span className="material-symbols-outlined">emergency_share</span> 
            {lang === 'vi' ? 'Liên hệ khẩn cấp' : 'Emergency Contacts'}
          </h2>
          <button 
            onClick={() => alert(lang === 'vi' ? 'Yêu cầu chỉnh sửa liên hệ khẩn cấp đã gửi.' : 'Emergency contact update request sent.')} 
            className="text-primary dark:text-primary-fixed-dim font-label-md hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span> 
            {lang === 'vi' ? 'Sửa' : 'Edit'}
          </button>
        </div>
        <div className="p-lg bg-error-container/10 dark:bg-red-950/10 flex-grow">
          <div className="flex items-center gap-lg mb-md">
            <div className="w-16 h-16 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-error-container text-4xl">person_alert</span>
            </div>
            <div>
              <p className="font-headline-md text-on-surface dark:text-white">Lê Thị Mai</p>
              <p className="text-on-surface-variant dark:text-slate-400 font-body-md italic">
                {lang === 'vi' ? 'Vợ (Người bảo hộ)' : 'Spouse (Guardian)'}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="p-md bg-white dark:bg-slate-900 rounded border border-outline-variant/30 dark:border-slate-700">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase">{lang === 'vi' ? 'Điện thoại' : 'Phone'}</p>
              <p className="font-body-lg font-bold text-on-surface dark:text-white">+84 90 987 6543</p>
            </div>
            <div className="p-md bg-white dark:bg-slate-900 rounded border border-outline-variant/30 dark:border-slate-700">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase">{lang === 'vi' ? 'Quan hệ' : 'Relationship'}</p>
              <p className="font-body-lg text-on-surface dark:text-slate-300">{lang === 'vi' ? 'Vợ' : 'Spouse'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Security Settings Card (Full Width) */}
      <section className="md:col-span-12 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm text-left">
        <div className="p-lg border-b border-outline-variant dark:border-slate-700">
          <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-sm">
            <span className="material-symbols-outlined">security</span> 
            {lang === 'vi' ? 'Cài đặt an ninh & Đăng nhập' : 'Security Settings & Logins'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-outline-variant dark:divide-slate-700">
          
          {/* Change Password */}
          <div className="p-lg space-y-md">
            <div>
              <p className="font-label-md text-on-surface dark:text-white">{lang === 'vi' ? 'Mật khẩu' : 'Password'}</p>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">
                {lang === 'vi' ? 'Thay đổi mật khẩu đăng nhập cổng thông tin của bạn.' : 'Update your patient portal login password.'}
              </p>
            </div>
            <div className="flex items-center justify-between p-md bg-surface-container-low dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400">key</span>
                <span className="font-data-mono dark:text-slate-300">••••••••••••••</span>
              </div>
              <button 
                onClick={() => alert(lang === 'vi' ? 'Mở hộp thoại đổi mật khẩu...' : 'Opening password update modal...')}
                className="px-md py-1.5 border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim font-label-md rounded hover:bg-primary/5 transition-colors"
              >
                {lang === 'vi' ? 'Đổi mật khẩu' : 'Change Password'}
              </button>
            </div>
            <p className="text-[11px] text-outline dark:text-slate-400 italic">
              {lang === 'vi' ? 'Lần thay đổi cuối: 3 tháng trước' : 'Last modified: 3 months ago'}
            </p>
          </div>

          {/* 2FA */}
          <div className="p-lg space-y-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-label-md text-on-surface dark:text-white">{lang === 'vi' ? 'Xác thực 2 yếu tố (2FA)' : 'Two-Factor Authentication (2FA)'}</p>
                <p className="text-sm text-on-surface-variant dark:text-slate-400">
                  {lang === 'vi' ? 'Thêm một lớp bảo mật bằng cách sử dụng mã OTP.' : 'Secure your account with OTP login verification.'}
                </p>
              </div>
              <span className="px-sm py-1 bg-secondary-container dark:bg-teal-950 text-on-secondary-container dark:text-teal-400 text-[10px] font-bold rounded uppercase">
                {lang === 'vi' ? 'Đang bật' : 'Enabled'}
              </span>
            </div>
            <div className="flex items-center justify-between p-md bg-surface-container-low dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-secondary dark:text-teal-400">verified_user</span>
                <span className="text-sm font-body-md dark:text-slate-300">SMS +84 *** *** 67</span>
              </div>
              <button 
                onClick={() => alert(lang === 'vi' ? 'Cấu hình cài đặt 2FA...' : 'Opening 2FA setups...')}
                className="px-md py-1.5 border border-outline dark:border-slate-600 text-on-surface-variant dark:text-slate-300 rounded hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors"
              >
                {lang === 'vi' ? 'Cấu hình' : 'Configure'}
              </button>
            </div>
            <div className="flex items-center gap-sm p-sm bg-secondary-container/10 dark:bg-teal-950/20 rounded">
              <span className="material-symbols-outlined text-secondary dark:text-teal-400 text-sm">info</span>
              <p className="text-xs text-on-secondary-container dark:text-teal-400">
                {lang === 'vi' 
                  ? 'Tài khoản của bạn được bảo vệ bởi các tiêu chuẩn HIPAA.' 
                  : 'Your account is secured under HIPAA data protection protocols.'}
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
