import React, { useState } from 'react';

export default function PatientSettingsTab({ lang, t }) {
  const [twoFA, setTwoFA] = useState(true);
  const [apptEmail, setApptEmail] = useState(true);
  const [apptSms, setApptSms] = useState(true);
  const [labEmail, setLabEmail] = useState(true);
  const [labSms, setLabSms] = useState(false);
  const [billEmail, setBillEmail] = useState(true);
  const [billSms, setBillSms] = useState(false);
  
  const [displayLang, setDisplayLang] = useState(lang);
  const [timezone, setTimezone] = useState('7');

  return (
    <div className="space-y-lg text-left">
      
      {/* HEADER */}
      <header className="mb-10">
        <h1 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mb-2">
          {lang === 'vi' ? 'Cài đặt tài khoản' : 'Portal Settings'}
        </h1>
        <p className="text-on-surface-variant dark:text-slate-400 font-body-md text-body-md">
          {lang === 'vi' 
            ? 'Quản lý tùy chọn bảo mật, thông báo và thông tin cá nhân của bạn để tối ưu trải nghiệm dịch vụ.' 
            : 'Manage security credentials, notification channels, and personal info parameters.'}
        </p>
      </header>

      <div className="space-y-8">
        
        {/* Section 1: Security */}
        <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-outline-variant dark:border-slate-700 flex items-center gap-3 bg-surface-container-low/50 dark:bg-slate-900/40">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">security</span>
            <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">
              {lang === 'vi' ? 'Bảo mật tài khoản' : 'Account Security'}
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="font-body-lg text-body-lg font-semibold text-on-surface dark:text-white">
                  {lang === 'vi' ? 'Đổi mật khẩu' : 'Change Password'}
                </div>
                <div className="text-on-surface-variant dark:text-slate-400 text-body-sm">
                  {lang === 'vi' ? 'Cập nhật mật khẩu định kỳ để bảo vệ dữ liệu y tế của bạn.' : 'Update account password regularly to protect medical data logs.'}
                </div>
              </div>
              <button 
                onClick={() => alert(lang === 'vi' ? 'Mở cửa sổ thay đổi mật khẩu...' : 'Opening password modification drawer...')}
                className="border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim px-4 py-2 rounded font-label-md hover:bg-primary/5 transition-colors bg-transparent cursor-pointer"
              >
                {lang === 'vi' ? 'Thay đổi' : 'Modify'}
              </button>
            </div>
            
            <hr className="border-outline-variant dark:border-slate-700" />
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-body-lg text-body-lg font-semibold text-on-surface dark:text-white">
                  {lang === 'vi' ? 'Xác thực hai yếu tố (2FA)' : 'Two-Factor Authentication (2FA)'}
                </div>
                <div className="text-on-surface-variant dark:text-slate-400 text-body-sm">
                  {lang === 'vi' ? 'Thêm một lớp bảo mật khi đăng nhập bằng mã qua SMS hoặc email.' : 'Enforce a verification checkpoint using SMS or Email OTP.'}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={twoFA}
                  onChange={(e) => setTwoFA(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-outline-variant dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-primary-fixed-dim"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Section 2: Notifications */}
        <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-outline-variant dark:border-slate-700 flex items-center gap-3 bg-surface-container-low/50 dark:bg-slate-900/40">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">notifications</span>
            <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">
              {lang === 'vi' ? 'Thông báo' : 'Notifications Setup'}
            </h2>
          </div>
          <div className="p-6 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-body-md min-w-[500px]">
              <thead>
                <tr className="text-on-surface-variant dark:text-slate-400 font-label-md border-b border-outline-variant dark:border-slate-700">
                  <th className="pb-4 font-semibold uppercase tracking-wider">{lang === 'vi' ? 'Loại thông báo' : 'Alert Categories'}</th>
                  <th className="pb-4 font-semibold uppercase tracking-wider text-center">Email</th>
                  <th className="pb-4 font-semibold uppercase tracking-wider text-center">SMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/65 dark:divide-slate-700 text-on-surface dark:text-slate-350">
                <tr>
                  <td className="py-4 text-left">
                    <div className="font-body-md text-body-md font-medium text-on-surface dark:text-white">{lang === 'vi' ? 'Nhắc nhở lịch hẹn' : 'Appointment Reminders'}</div>
                    <div className="text-body-sm text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Gửi trước 24 giờ kể từ thời điểm khám.' : 'Sent 24 hours prior to booked consultation schedule.'}</div>
                  </td>
                  <td className="text-center">
                    <input 
                      type="checkbox"
                      checked={apptEmail}
                      onChange={(e) => setApptEmail(e.target.checked)}
                      className="rounded border-outline-variant dark:border-slate-700 text-primary dark:text-primary-fixed-dim focus:ring-primary bg-transparent dark:bg-slate-900"
                    />
                  </td>
                  <td className="text-center">
                    <input 
                      type="checkbox"
                      checked={apptSms}
                      onChange={(e) => setApptSms(e.target.checked)}
                      className="rounded border-outline-variant dark:border-slate-700 text-primary dark:text-primary-fixed-dim focus:ring-primary bg-transparent dark:bg-slate-900"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 text-left">
                    <div className="font-body-md text-body-md font-medium text-on-surface dark:text-white">{lang === 'vi' ? 'Kết quả xét nghiệm' : 'Laboratory Results'}</div>
                    <div className="text-body-sm text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Thông báo ngay khi có kết quả mới.' : 'Dispatched instantly when clinical labs are certified.'}</div>
                  </td>
                  <td className="text-center">
                    <input 
                      type="checkbox"
                      checked={labEmail}
                      onChange={(e) => setLabEmail(e.target.checked)}
                      className="rounded border-outline-variant dark:border-slate-700 text-primary dark:text-primary-fixed-dim focus:ring-primary bg-transparent dark:bg-slate-900"
                    />
                  </td>
                  <td className="text-center">
                    <input 
                      type="checkbox"
                      checked={labSms}
                      onChange={(e) => setLabSms(e.target.checked)}
                      className="rounded border-outline-variant dark:border-slate-700 text-primary dark:text-primary-fixed-dim focus:ring-primary bg-transparent dark:bg-slate-900"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 text-left">
                    <div className="font-body-md text-body-md font-medium text-on-surface dark:text-white">{lang === 'vi' ? 'Thanh toán & Hóa đơn' : 'Billing & Receipts Statements'}</div>
                    <div className="text-body-sm text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Biên lai điện tử và nhắc nợ.' : 'Payment receipt confirmations and outstanding cost alerts.'}</div>
                  </td>
                  <td className="text-center">
                    <input 
                      type="checkbox"
                      checked={billEmail}
                      onChange={(e) => setBillEmail(e.target.checked)}
                      className="rounded border-outline-variant dark:border-slate-700 text-primary dark:text-primary-fixed-dim focus:ring-primary bg-transparent dark:bg-slate-900"
                    />
                  </td>
                  <td className="text-center">
                    <input 
                      type="checkbox"
                      checked={billSms}
                      onChange={(e) => setBillSms(e.target.checked)}
                      className="rounded border-outline-variant dark:border-slate-700 text-primary dark:text-primary-fixed-dim focus:ring-primary bg-transparent dark:bg-slate-900"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Privacy & Sharing */}
        <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-outline-variant dark:border-slate-700 flex items-center gap-3 bg-surface-container-low/50 dark:bg-slate-900/40">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">visibility</span>
            <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">
              {lang === 'vi' ? 'Quyền riêng tư & Chia sẻ' : 'Privacy & Record Access'}
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="font-body-lg text-body-lg font-semibold text-on-surface dark:text-white">
                  {lang === 'vi' ? 'Quản lý quyền truy cập hồ sơ' : 'Clinical Access Delegation'}
                </div>
                <div className="text-on-surface-variant dark:text-slate-400 text-body-sm mt-1">
                  {lang === 'vi' 
                    ? 'Chỉ định bác sĩ hoặc người thân có thể xem hồ sơ bệnh án của bạn. Hiện có 2 người có quyền truy cập.' 
                    : 'Designate medical specialists or guardians authorized to view clinical files. 2 active grants registered.'}
                </div>
              </div>
              <button 
                onClick={() => alert(lang === 'vi' ? 'Mở cài đặt phân quyền...' : 'Opening permission mappings...')}
                className="self-start text-primary dark:text-primary-fixed-dim font-label-md flex items-center gap-2 hover:underline bg-transparent border-none cursor-pointer"
              >
                {lang === 'vi' ? 'Quản lý quyền' : 'Manage Access'} <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            
            <div className="p-4 bg-surface-container-low dark:bg-slate-900 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-md border border-outline-variant/35 dark:border-slate-700">
              <div className="flex items-center gap-4 text-left">
                <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-350 shrink-0">download</span>
                <div>
                  <div className="font-body-md text-body-md font-semibold text-on-surface dark:text-white">{lang === 'vi' ? 'Xuất dữ liệu y tế' : 'Export Clinical Data'}</div>
                  <div className="text-body-sm text-on-surface-variant dark:text-slate-400">
                    {lang === 'vi' ? 'Tải xuống toàn bộ lịch sử bệnh án dưới định dạng PDF hoặc XML.' : 'Download complete health records packet in PDF or XML format.'}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => alert(lang === 'vi' ? 'Xuất dữ liệu bệnh án...' : 'Exporting records data package...')}
                className="bg-primary text-white px-4 py-2 rounded font-label-md hover:bg-primary-container transition-colors border-none cursor-pointer"
              >
                {lang === 'vi' ? 'Xuất dữ liệu' : 'Export Data'}
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: Language & Region */}
        <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-outline-variant dark:border-slate-700 flex items-center gap-3 bg-surface-container-low/50 dark:bg-slate-900/40">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">language</span>
            <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">
              {lang === 'vi' ? 'Ngôn ngữ & Vùng' : 'Language & Regional Parameters'}
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-400 mb-2 uppercase tracking-wider">
                {lang === 'vi' ? 'Ngôn ngữ hiển thị' : 'Display Language'}
              </label>
              <select 
                value={displayLang}
                onChange={(e) => setDisplayLang(e.target.value)}
                className="w-full bg-surface dark:bg-slate-800 border border-outline-variant dark:border-slate-700 text-on-surface dark:text-white rounded-lg p-3 font-body-md focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English (US)</option>
              </select>
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-400 mb-2 uppercase tracking-wider">
                {lang === 'vi' ? 'Múi giờ' : 'Timezone'}
              </label>
              <select 
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-surface dark:bg-slate-800 border border-outline-variant dark:border-slate-700 text-on-surface dark:text-white rounded-lg p-3 font-body-md focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="7">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                <option value="8">(GMT+08:00) Singapore, Hong Kong</option>
                <option value="0">(GMT+00:00) London, UTC</option>
              </select>
            </div>
          </div>
        </section>

        {/* Action Controls */}
        <div className="flex justify-end gap-4 py-6">
          <button 
            onClick={() => alert(lang === 'vi' ? 'Hủy các thay đổi cài đặt.' : 'Configuration updates discarded.')}
            className="px-6 py-2 border border-outline dark:border-slate-700 text-on-surface-variant dark:text-slate-300 rounded-lg font-label-md hover:bg-surface-container-low dark:hover:bg-slate-700 transition-all cursor-pointer"
          >
            {lang === 'vi' ? 'Hủy bỏ' : 'Cancel'}
          </button>
          <button 
            onClick={() => alert(lang === 'vi' ? 'Đã lưu thay đổi cài đặt thành công!' : 'Portal configurations saved successfully!')}
            className="px-10 py-2 bg-primary text-white rounded-lg font-label-md shadow-sm hover:brightness-110 active:scale-95 transition-all border-none cursor-pointer"
          >
            {lang === 'vi' ? 'Lưu thay đổi' : 'Save Changes'}
          </button>
        </div>

      </div>

    </div>
  );
}
