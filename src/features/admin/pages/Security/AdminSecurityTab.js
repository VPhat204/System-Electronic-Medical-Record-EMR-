import React from 'react';
import useAdminSecurity from '../../hooks/useAdminSecurity';
import { loginTrendData } from '../../components/mockData';

export default function AdminSecurityTab({ lang, t }) {
  const {
    threatPulse,
    pwMinLen,
    setPwMinLen,
    pwCaps,
    setPwCaps,
    pwSpecial,
    setPwSpecial,
    pwNum,
    setPwNum,
    pwNoUser,
    setPwNoUser,
    pwExpiry,
    setPwExpiry,
    showAddIp,
    setShowAddIp,
    newIpVal,
    setNewIpVal,
    newIpLabel,
    setNewIpLabel,
    ipList,
    setIpList
  } = useAdminSecurity();
  return (
    <div className="space-y-6 text-left relative pb-16">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight">
            {lang === 'vi' ? 'Bảo mật & Phân quyền' : 'Security & Access Control'}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mt-1">
            {lang === 'vi' ? 'Giám sát hoạt động bất thường, cấu hình chính sách và quản lý phân quyền người dùng.' : 'Monitor anomalous behavior, configure policies, and manage role-based access.'}
          </p>
        </div>
      </div>

      {/* ROW 1: Active Threats + 2FA Compliance */}
      <div className="grid grid-cols-12 gap-gutter">

        {/* Active Threats Table */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden relative flex flex-col gap-md hover:shadow-xs transition-shadow">
          <div className="absolute top-0 left-0 w-1 h-full bg-error rounded-l-xl"></div>
          <div className="p-lg pl-6 flex justify-between items-start">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-sm">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>report</span>
                {lang === 'vi' ? 'Cảnh báo bảo mật hoạt động' : 'Active Security Alerts'}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-0.5">
                {lang === 'vi' ? 'Phát hiện 3 hành vi bất thường trong 24 giờ qua.' : '3 anomalous behaviors detected in the last 24 hours.'}
              </p>
            </div>
            <button
              onClick={() => alert(lang === 'vi' ? 'Mở cửa sổ quản lý sự cố bảo mật...' : 'Opening Security Incident Manager...')}
              className="px-md py-1.5 bg-error text-white rounded-lg font-label-md text-[12px] font-bold hover:opacity-90 transition-opacity active:scale-95 flex-shrink-0"
            >
              {lang === 'vi' ? 'Quản lý sự cố' : 'Manage Incidents'}
            </button>
          </div>

          <div className="overflow-x-auto px-lg pb-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low dark:bg-slate-900/40 border-b border-outline-variant dark:border-slate-700 text-[11px] uppercase tracking-widest font-bold text-outline dark:text-slate-400">
                  <th className="px-md py-sm rounded-l-lg">{lang === 'vi' ? 'Thời gian' : 'Timestamp'}</th>
                  <th className="px-md py-sm">{lang === 'vi' ? 'Sự kiện' : 'Event'}</th>
                  <th className="px-md py-sm">{lang === 'vi' ? 'Địa chỉ IP' : 'IP Address'}</th>
                  <th className="px-md py-sm">{lang === 'vi' ? 'Mức độ' : 'Severity'}</th>
                  <th className="px-md py-sm rounded-r-lg">{lang === 'vi' ? 'Trạng thái' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm divide-y divide-outline-variant/30 dark:divide-slate-700">
                <tr className="hover:bg-surface-container-lowest dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-md py-sm font-data-mono text-on-surface dark:text-white">14:22:10</td>
                  <td className="px-md py-sm text-on-surface dark:text-slate-200">Failed Login (Admin_01)</td>
                  <td className="px-md py-sm font-data-mono text-primary dark:text-primary-fixed-dim">192.168.1.105</td>
                  <td className="px-md py-sm">
                    <span className={`px-sm py-xs text-[10px] font-bold rounded uppercase ${threatPulse ? 'bg-error text-on-error animate-pulse' : 'bg-error-container text-on-error-container'}`}>
                      Critical
                    </span>
                  </td>
                  <td className="px-md py-sm text-on-surface-variant dark:text-slate-400 italic">{lang === 'vi' ? 'Đang điều tra' : 'Under investigation'}</td>
                </tr>
                <tr className="bg-slate-50/30 dark:bg-slate-900/10 hover:bg-surface-container-lowest dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-md py-sm font-data-mono text-on-surface dark:text-white">13:15:45</td>
                  <td className="px-md py-sm text-on-surface dark:text-slate-200">Unauthorized API Access</td>
                  <td className="px-md py-sm font-data-mono text-primary dark:text-primary-fixed-dim">45.22.112.8</td>
                  <td className="px-md py-sm">
                    <span className="px-sm py-xs bg-orange-100 dark:bg-orange-950/20 text-orange-800 dark:text-orange-400 text-[10px] font-bold rounded uppercase">High</span>
                  </td>
                  <td className="px-md py-sm text-on-surface-variant dark:text-slate-400 italic">{lang === 'vi' ? 'Bị chặn IP' : 'IP Blocked'}</td>
                </tr>
                <tr className="hover:bg-surface-container-lowest dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-md py-sm font-data-mono text-on-surface dark:text-white">11:02:00</td>
                  <td className="px-md py-sm text-on-surface dark:text-slate-200">Bulk Data Export</td>
                  <td className="px-md py-sm font-data-mono text-primary dark:text-primary-fixed-dim">10.0.5.42</td>
                  <td className="px-md py-sm">
                    <span className="px-sm py-xs bg-blue-100 dark:bg-blue-950/20 text-blue-800 dark:text-blue-400 text-[10px] font-bold rounded uppercase">Medium</span>
                  </td>
                  <td className="px-md py-sm text-on-surface-variant dark:text-slate-400 italic">{lang === 'vi' ? 'Đã xác minh' : 'Verified'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2FA Compliance Ring Chart */}
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg flex flex-col hover:shadow-xs transition-shadow">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">
            {lang === 'vi' ? 'Xác thực 2 lớp (2FA)' : 'Two-Factor Auth (2FA)'}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mb-md mt-0.5">
            {lang === 'vi' ? 'Tỷ lệ tuân thủ toàn bệnh viện' : 'Hospital-wide compliance rate'}
          </p>

          <div className="flex-1 flex flex-col justify-center items-center py-md">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                <circle className="text-surface-container dark:text-slate-700" cx="64" cy="64" fill="transparent" r="52" stroke="currentColor" strokeWidth="12"></circle>
                <circle
                  className="text-secondary dark:text-teal-400"
                  cx="64" cy="64" fill="transparent" r="52"
                  stroke="currentColor"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={`${2 * Math.PI * 52 * 0.12}`}
                  strokeWidth="12"
                  strokeLinecap="round"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline-xl text-headline-xl text-secondary dark:text-teal-400 font-black leading-none">88%</span>
                <span className="font-label-md text-[10px] text-on-surface-variant dark:text-slate-400 uppercase tracking-widest mt-0.5">{lang === 'vi' ? 'Tuân thủ' : 'Compliant'}</span>
              </div>
            </div>

            <div className="mt-lg w-full space-y-sm">
              {[
                { role: lang === 'vi' ? 'Bác sĩ:' : 'Doctors:', pct: 94 },
                { role: lang === 'vi' ? 'Điều dưỡng:' : 'Nurses:', pct: 82 },
                { role: lang === 'vi' ? 'Hành chính:' : 'Admin Staff:', pct: 76 }
              ].map(r => (
                <div key={r.role} className="space-y-xs">
                  <div className="flex justify-between font-label-md text-[12px]">
                    <span className="text-on-surface-variant dark:text-slate-400">{r.role}</span>
                    <span className="text-primary dark:text-primary-fixed-dim font-bold">{r.pct}%</span>
                  </div>
                  <div className="w-full bg-surface-container dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary dark:bg-teal-400 h-full rounded-full transition-all duration-700" style={{ width: `${r.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => alert(lang === 'vi' ? 'Đã gửi email nhắc nhở tuân thủ 2FA tới 12% nhân viên chưa kích hoạt.' : 'Reminder emails sent to all non-compliant staff.')}
            className="w-full py-2 bg-secondary dark:bg-teal-600 text-white rounded-lg font-label-md text-[12px] font-bold mt-md hover:opacity-90 active:scale-95 transition-all"
          >
            {lang === 'vi' ? 'Gửi nhắc nhở tuân thủ' : 'Send Compliance Reminder'}
          </button>
        </div>
      </div>

      {/* ROW 2: Password Policy + IP Whitelist + RBAC */}
      <div className="grid grid-cols-12 gap-gutter">

        {/* Password Policy Configuration */}
        <div className="col-span-12 lg:col-span-5 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg space-y-md hover:shadow-xs transition-shadow">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">password</span>
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">
              {lang === 'vi' ? 'Chính sách mật khẩu' : 'Password Policy'}
            </h3>
          </div>

          <div className="space-y-lg pt-sm">
            {/* Min Length Slider */}
            <div className="space-y-xs">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-[12px] font-bold text-on-surface dark:text-white">
                  {lang === 'vi' ? 'Độ dài tối thiểu' : 'Minimum Length'}
                </label>
                <span className="font-data-mono text-primary dark:text-primary-fixed-dim font-bold">{pwMinLen} {lang === 'vi' ? 'ký tự' : 'chars'}</span>
              </div>
              <input
                type="range" min="8" max="24" value={pwMinLen}
                onChange={(e) => setPwMinLen(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-container dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-outline dark:text-slate-400">
                <span>8</span><span>16</span><span>24</span>
              </div>
            </div>

            {/* Complexity Requirements */}
            <div className="space-y-sm">
              <label className="font-label-md text-[12px] font-bold text-on-surface dark:text-white">
                {lang === 'vi' ? 'Yêu cầu phức tạp' : 'Complexity Requirements'}
              </label>
              <div className="grid grid-cols-2 gap-sm">
                {[
                  { label: lang === 'vi' ? 'Chữ hoa & Chữ thường' : 'Upper & Lowercase', val: pwCaps, set: setPwCaps },
                  { label: lang === 'vi' ? 'Ký tự đặc biệt (!@#)' : 'Special chars (!@#)', val: pwSpecial, set: setPwSpecial },
                  { label: lang === 'vi' ? 'Chữ số (0-9)' : 'Numbers (0-9)', val: pwNum, set: setPwNum },
                  { label: lang === 'vi' ? 'Không chứa tên user' : "No username included", val: pwNoUser, set: setPwNoUser }
                ].map((opt) => (
                  <label key={opt.label} className="flex items-center gap-sm p-sm bg-surface-container-low dark:bg-slate-900/60 rounded-lg cursor-pointer hover:bg-surface-container dark:hover:bg-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={opt.val}
                      onChange={(e) => opt.set(e.target.checked)}
                      className="rounded border-outline-variant text-primary focus:ring-primary"
                    />
                    <span className="font-body-sm text-[11px] text-on-surface dark:text-slate-200 leading-tight">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Expiry */}
            <div className="flex justify-between items-center py-sm border-t border-outline-variant dark:border-slate-700">
              <div>
                <p className="font-label-md text-[12px] font-bold text-on-surface dark:text-white">
                  {lang === 'vi' ? 'Thời hạn hết hạn mật khẩu' : 'Password Expiry Period'}
                </p>
                <p className="text-[11px] text-on-surface-variant dark:text-slate-400 italic">{lang === 'vi' ? 'Mặc định: 90 ngày' : 'Default: 90 days'}</p>
              </div>
              <select
                value={pwExpiry}
                onChange={(e) => setPwExpiry(e.target.value)}
                className="bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg font-label-md text-[12px] py-1 px-2 focus:ring-primary focus:ring-1 outline-none dark:text-white"
              >
                <option value="30">{lang === 'vi' ? '30 ngày' : '30 days'}</option>
                <option value="60">{lang === 'vi' ? '60 ngày' : '60 days'}</option>
                <option value="90">{lang === 'vi' ? '90 ngày' : '90 days'}</option>
                <option value="never">{lang === 'vi' ? 'Không bao giờ' : 'Never'}</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => alert(lang === 'vi' ? 'Đã lưu cấu hình chính sách mật khẩu!' : 'Password policy saved successfully!')}
            className="w-full py-2.5 bg-primary text-white rounded-lg font-label-md text-[12px] font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            {lang === 'vi' ? 'Lưu cấu hình mật khẩu' : 'Save Password Config'}
          </button>
        </div>

        {/* Right column: IP Whitelist + RBAC */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-gutter">

          {/* IP Whitelist */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg space-y-md hover:shadow-xs transition-shadow flex-grow">
            <div className="flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">hub</span>
                {lang === 'vi' ? 'Quản lý IP Whitelist' : 'IP Whitelist Management'}
              </h3>
              <button
                onClick={() => setShowAddIp(v => !v)}
                className="text-primary dark:text-primary-fixed-dim font-label-md text-[12px] font-bold flex items-center gap-xs hover:underline"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                {lang === 'vi' ? 'Thêm IP mới' : 'Add IP'}
              </button>
            </div>

            {showAddIp && (
              <div className="flex gap-sm items-end bg-surface-container-low dark:bg-slate-900/60 p-sm rounded-lg">
                <div className="flex-1 flex flex-col gap-xs">
                  <label className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider">IP / CIDR</label>
                  <input
                    type="text" value={newIpVal} onChange={(e) => setNewIpVal(e.target.value)}
                    placeholder="e.g. 10.0.8.22"
                    className="border border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-sm py-xs font-data-mono text-[12px] outline-none dark:text-white focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-xs">
                  <label className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider">{lang === 'vi' ? 'Ghi chú' : 'Label'}</label>
                  <input
                    type="text" value={newIpLabel} onChange={(e) => setNewIpLabel(e.target.value)}
                    placeholder="e.g. LAB SERVER"
                    className="border border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-sm py-xs text-[12px] uppercase tracking-wider font-bold outline-none dark:text-white focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={() => {
                    if (!newIpVal.trim()) return;
                    setIpList(prev => [...prev, { id: Date.now(), ip: newIpVal.trim(), label: newIpLabel.trim().toUpperCase() || 'CUSTOM' }]);
                    setNewIpVal(''); setNewIpLabel(''); setShowAddIp(false);
                  }}
                  className="px-md py-xs bg-primary text-white rounded-lg font-bold text-[12px] hover:opacity-90 active:scale-95 transition-all flex-shrink-0"
                >
                  {lang === 'vi' ? 'Thêm' : 'Add'}
                </button>
              </div>
            )}

            <div className="bg-surface-container-low dark:bg-slate-900/60 rounded-lg p-md">
              <div className="flex flex-wrap gap-sm">
                {ipList.map(item => (
                  <div key={item.id} className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 px-sm py-1 rounded flex items-center gap-sm">
                    <span className="font-data-mono text-[12px] text-on-surface dark:text-white">{item.ip}</span>
                    <span className="text-[9px] font-bold text-on-surface-variant dark:text-slate-400 bg-surface-container dark:bg-slate-700 px-1.5 py-0.5 rounded uppercase tracking-wider">{item.label}</span>
                    <button onClick={() => setIpList(prev => prev.filter(i => i.id !== item.id))}>
                      <span className="material-symbols-outlined text-[16px] text-error hover:text-red-750 cursor-pointer transition-colors">close</span>
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-on-surface-variant dark:text-slate-400 mt-sm leading-relaxed">
                {lang === 'vi'
                  ? 'Các IP ngoài danh sách này sẽ bị yêu cầu xác thực 2 bước ngay cả khi ở mạng nội bộ.'
                  : 'IPs not in this list will require 2FA verification even on the internal network.'}
              </p>
            </div>
          </div>

          {/* RBAC Summary */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg space-y-md hover:shadow-xs transition-shadow flex-grow">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">admin_panel_settings</span>
              {lang === 'vi' ? 'Tóm tắt Phân quyền (RBAC)' : 'Role-Based Access Summary'}
            </h3>
            <div className="grid grid-cols-3 gap-md pt-sm">
              {[
                { role: lang === 'vi' ? 'Bác sĩ Trưởng' : 'Senior Doctors', count: '12 Users', bars: [1, 1, 1, 0.5], color: 'bg-primary dark:bg-primary-fixed-dim' },
                { role: lang === 'vi' ? 'Điều dưỡng' : 'Nurses', count: '45 Users', bars: [1, 1, 0.33, 0.33], color: 'bg-secondary dark:bg-teal-500' },
                { role: lang === 'vi' ? 'Dược sĩ' : 'Pharmacists', count: '8 Users', bars: [1, 0.66, 0.33, 0.33], color: 'bg-tertiary-container' }
              ].map(r => (
                <div
                  key={r.role}
                  className="p-md bg-surface-container-low dark:bg-slate-900/60 rounded-xl border border-outline-variant dark:border-slate-700 hover:border-primary dark:hover:border-primary-fixed-dim transition-all cursor-pointer group text-left"
                  onClick={() => alert(lang === 'vi' ? `Xem ma trận quyền hạn chi tiết của: ${r.role}` : `Viewing permission matrix for: ${r.role}`)}
                >
                  <p className="font-label-md text-[11px] text-on-surface-variant dark:text-slate-400 group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors font-bold">{r.role}</p>
                  <p className="font-headline-md text-headline-md text-on-surface dark:text-white mt-xs">{r.count}</p>
                  <div className="mt-sm flex gap-xs">
                    {r.bars.map((w, i) => (
                      <div key={i} className={`h-1 rounded ${w === 1 ? r.color : 'bg-surface-container dark:bg-slate-700'}`} style={{ flex: 1 }}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-sm border-t border-outline-variant dark:border-slate-700">
              <button
                onClick={() => alert(lang === 'vi' ? 'Mở ma trận quyền hạn chi tiết...' : 'Opening detailed permission matrix...')}
                className="font-label-md text-[12px] font-bold text-primary dark:text-primary-fixed-dim flex items-center gap-xs hover:underline"
              >
                {lang === 'vi' ? 'Xem chi tiết ma trận quyền hạn' : 'View Full Permission Matrix'}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: Login Trend Chart */}
      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg space-y-md hover:shadow-xs transition-shadow">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-md mb-md">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">
              {lang === 'vi' ? 'Xu hướng đăng nhập thất bại' : 'Failed Login Trends'}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">
              {lang === 'vi' ? 'Thống kê 7 ngày qua - Giám sát brute-force' : 'Last 7 days - Brute-force monitoring'}
            </p>
          </div>
          <div className="flex items-center gap-md">
            <div className="flex items-center gap-sm">
              <span className="w-3 h-3 rounded-full bg-error"></span>
              <span className="font-label-md text-[11px] font-bold text-on-surface dark:text-white">
                {lang === 'vi' ? 'Đăng nhập thất bại' : 'Failed logins'}
              </span>
            </div>
            <div className="flex items-center gap-sm">
              <span className="w-3 h-3 rounded-full bg-primary dark:bg-primary-fixed-dim"></span>
              <span className="font-label-md text-[11px] font-bold text-on-surface dark:text-white">
                {lang === 'vi' ? 'Đăng nhập thành công' : 'Successful logins'}
              </span>
            </div>
          </div>
        </div>

        <div className="h-48 w-full flex items-end gap-4 pt-lg select-none">
          {loginTrendData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col justify-end gap-xs h-full group cursor-pointer">
              <div
                className={`w-full rounded-t-xs group-hover:opacity-80 transition-all ${d.fail >= 30 ? 'bg-error/80' : 'bg-error/35 dark:bg-error/20'}`}
                style={{ height: `${d.fail}%` }}
                title={`${d.fail}% failed`}
              ></div>
              <div
                className="w-full bg-primary/20 dark:bg-primary/25 rounded-t-xs group-hover:bg-primary/50 dark:group-hover:bg-primary/40 transition-colors"
                style={{ height: `${d.success}%` }}
                title={`${d.success}% successful`}
              ></div>
              <p className={`text-[10px] text-center font-data-mono font-bold ${d.fail >= 30 ? 'text-error' : d.day === 'CN' ? 'text-secondary dark:text-teal-400' : 'text-on-surface-variant dark:text-slate-400'}`}>
                {d.day}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
