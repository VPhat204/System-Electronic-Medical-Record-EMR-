import React, { useState } from 'react';
import { initialLogs } from '../../components/mockData';

export default function AdminSystemLogsTab({ lang, t }) {
  const [logsList, setLogsList] = useState(initialLogs);
  const [logDateFilter, setLogDateFilter] = useState('Today'); // 'Today', 'Week', 'Month'
  const [logTypeFilter, setLogTypeFilter] = useState('All'); // 'All', 'Login', 'Update', 'Export', 'Error'
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered system logs computed locally
  const filteredLogs = logsList.filter(log => {
    const name = log.userName || '';
    const text = log.actionText || '';
    const ipAddress = log.ip || '';
    
    const matchSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ipAddress.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType = logTypeFilter === 'All' ||
                      (logTypeFilter === 'Login' && (text.includes('Đăng nhập') || text.includes('Đăng xuất') || text.includes('Login') || text.includes('Logout'))) ||
                      (logTypeFilter === 'Update' && (text.toLowerCase().includes('cập nhật') || text.toLowerCase().includes('updated'))) ||
                      (logTypeFilter === 'Export' && (text.toLowerCase().includes('xuất') || text.toLowerCase().includes('backup'))) ||
                      (logTypeFilter === 'Error' && log.level === 'ERROR');
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-lg">
      {/* Page Header & Global Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md text-left">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight">{lang === 'vi' ? 'Nhật ký Hệ thống' : 'System Logs'}</h2>
          <p className="text-on-surface-variant dark:text-slate-400 font-body-md mt-1">
            {lang === 'vi' ? 'Theo dõi các sự kiện và hoạt động kiểm soát theo thời gian thực.' : 'Monitor server events and access logs in real time.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-sm bg-white dark:bg-slate-800 p-2 rounded-xl border border-outline-variant dark:border-slate-700 shadow-xs">
          <div className="flex flex-col px-sm border-r border-outline-variant dark:border-slate-700">
            <label className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase tracking-tighter">{lang === 'vi' ? 'Phạm vi ngày' : 'Date Range'}</label>
            <select 
              value={logDateFilter}
              onChange={(e) => setLogDateFilter(e.target.value)}
              className="bg-transparent border-none p-0 text-body-md font-semibold text-primary dark:text-primary-fixed-dim focus:ring-0 cursor-pointer outline-none select-none"
            >
              <option value="Today">{lang === 'vi' ? 'Hôm nay, 24 Th05' : 'Today, May 24'}</option>
              <option value="Week">{lang === 'vi' ? '7 ngày qua' : 'Last 7 Days'}</option>
              <option value="Month">{lang === 'vi' ? '30 ngày qua' : 'Last 30 Days'}</option>
            </select>
          </div>
          <div className="flex flex-col px-sm border-r border-outline-variant dark:border-slate-700">
            <label className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase tracking-tighter">{lang === 'vi' ? 'Loại sự kiện' : 'Event Type'}</label>
            <select 
              value={logTypeFilter}
              onChange={(e) => setLogTypeFilter(e.target.value)}
              className="bg-transparent border-none p-0 text-body-md font-semibold text-primary dark:text-primary-fixed-dim focus:ring-0 cursor-pointer outline-none select-none"
            >
              <option value="All">{lang === 'vi' ? 'Tất cả sự kiện' : 'All Events'}</option>
              <option value="Login">{lang === 'vi' ? 'Đăng nhập/Đăng xuất' : 'Auth Logs'}</option>
              <option value="Update">{lang === 'vi' ? 'Cập nhật Hồ sơ' : 'Profile Updates'}</option>
              <option value="Export">{lang === 'vi' ? 'Xuất dữ liệu' : 'Data Exports'}</option>
              <option value="Error">{lang === 'vi' ? 'Lỗi hệ thống' : 'System Errors'}</option>
            </select>
          </div>
          <button 
            onClick={() => {
              setLogDateFilter('Today');
              setLogTypeFilter('All');
              setSearchQuery('');
            }}
            className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg font-label-md active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            {lang === 'vi' ? 'Đặt lại' : 'Reset'}
          </button>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700 hover:border-primary transition-colors flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-xs rounded">ac_unit</span>
            <span className="text-[10px] text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-950/20 px-xs py-[2px] rounded">+12%</span>
          </div>
          <div className="mt-sm text-left">
            <p className="text-outline dark:text-slate-400 text-label-md">{lang === 'vi' ? 'Tổng sự kiện (24h)' : 'Total Events (24h)'}</p>
            <p className="text-headline-lg font-black text-on-surface dark:text-white mt-1">1,284</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-error bg-error-container p-xs rounded">error</span>
            <span className="text-[10px] text-error font-bold bg-error-container px-xs py-[2px] rounded">High Risk</span>
          </div>
          <div className="mt-sm text-left">
            <p className="text-outline dark:text-slate-400 text-label-md">{lang === 'vi' ? 'Lỗi Hệ thống' : 'System Errors'}</p>
            <p className="text-headline-lg font-black text-on-surface dark:text-white mt-1">3</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-secondary bg-secondary-container p-xs rounded">group</span>
          </div>
          <div className="mt-sm text-left">
            <p className="text-outline dark:text-slate-400 text-label-md">{lang === 'vi' ? 'Người dùng Hoạt động' : 'Active Users'}</p>
            <p className="text-headline-lg font-black text-on-surface dark:text-white mt-1">42</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col justify-between bg-gradient-to-br from-primary/10 to-transparent">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-xs rounded">security</span>
            <span className="text-[10px] text-primary font-bold bg-primary-fixed px-xs py-[2px] rounded">OK</span>
          </div>
          <div className="mt-sm text-left">
            <p className="text-outline dark:text-slate-400 text-label-md">{lang === 'vi' ? 'Mức độ đe dọa' : 'Threat Level'}</p>
            <p className="text-headline-lg font-black text-on-surface dark:text-white mt-1">{lang === 'vi' ? 'THẤP' : 'LOW'}</p>
          </div>
        </div>
      </div>

      {/* Main Logs Table and Statistics panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl flex flex-col shadow-sm">
          {/* Header controls inside logs table card */}
          <div className="p-lg border-b border-outline-variant dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm">
            <div className="relative w-full sm:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-slate-450 text-[18px]">search</span>
              <input 
                type="text" 
                placeholder={lang === 'vi' ? 'Tìm sự kiện, địa chỉ IP...' : 'Search logs, IP...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg outline-none font-body-sm text-body-sm focus:ring-1 focus:ring-primary dark:text-white text-on-surface"
              />
            </div>
            <button 
              onClick={() => {
                if (window.confirm(lang === 'vi' ? 'Bạn chắc chắn muốn xóa sạch nhật ký hiển thị?' : 'Are you sure you want to clear system logs?')) {
                  setLogsList([]);
                }
              }}
              className="px-lg py-md border border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-error hover:text-error text-body-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
            >
              <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
              {t.clearLogs}
            </button>
          </div>

          <div className="overflow-x-auto custom-scrollbar flex-grow">
            <table className="w-full text-left border-collapse min-w-[550px]">
              <thead>
                <tr className="bg-surface-container-low dark:bg-slate-900/40 border-b border-outline-variant dark:border-slate-700">
                  <th className="px-lg py-md text-outline dark:text-slate-400 font-label-md text-[11px] uppercase tracking-wider">{t.logTime}</th>
                  <th className="px-lg py-md text-outline dark:text-slate-400 font-label-md text-[11px] uppercase tracking-wider">{t.logEvent}</th>
                  <th className="px-lg py-md text-outline dark:text-slate-400 font-label-md text-[11px] uppercase tracking-wider">{t.logLevel}</th>
                  <th className="px-lg py-md text-outline dark:text-slate-400 font-label-md text-[11px] uppercase tracking-wider">{t.logIP}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 dark:divide-slate-700 text-body-sm font-semibold dark:text-slate-200 text-on-surface">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors">
                      <td className="px-lg py-md text-outline dark:text-slate-450 font-normal">{log.time}</td>
                      <td className="px-lg py-md text-left max-w-xs truncate" title={log.actionText}>{log.actionText}</td>
                      <td className="px-lg py-md text-left">
                        <span className={`px-sm py-0.5 rounded text-[10px] font-bold ${
                          log.level === 'Error'
                            ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                            : log.level === 'Warning'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                              : 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
                        }`}>
                          {log.level}
                        </span>
                      </td>
                      <td className="px-lg py-md font-mono text-[11px] text-outline dark:text-slate-400">{log.ip}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-lg py-12 text-center text-outline dark:text-slate-400 italic">
                      {lang === 'vi' ? 'Không tìm thấy nhật ký tương ứng.' : 'No matching server logs found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-surface-container-low dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 p-lg flex flex-col justify-between hover:shadow-xs transition-shadow text-left">
          <div>
            <h4 className="font-headline-md text-on-surface dark:text-white mb-xs font-bold">{lang === 'vi' ? 'Cảnh báo An ninh' : 'Security Alerts'}</h4>
            <p className="text-body-sm text-on-surface-variant dark:text-slate-400 font-semibold">{lang === 'vi' ? 'Phát hiện các hoạt động bất thường.' : 'Anomalous security behavior detected.'}</p>
          </div>
          <div className="space-y-md mt-md text-left">
            <div className="flex items-center gap-md p-sm bg-error-container/20 border-l-4 border-error rounded-r-lg">
              <span className="material-symbols-outlined text-error">gpp_maybe</span>
              <div className="flex-grow">
                <p className="text-[12px] font-bold text-error">{lang === 'vi' ? 'Dò tìm mật khẩu (Brute-force)' : 'Password brute-force attempt'}</p>
                <p className="text-[10px] text-outline dark:text-slate-400 font-semibold mt-0.5">IP 103.45.122.9 - 14:38</p>
              </div>
            </div>
            <div className="flex items-center gap-md p-sm bg-orange-100 dark:bg-orange-950/20 border-l-4 border-orange-500 rounded-r-lg">
              <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">database_off</span>
              <div className="flex-grow">
                <p className="text-[12px] font-bold text-orange-700 dark:text-orange-300">{lang === 'vi' ? 'Truy cập hồ sơ nhạy cảm' : 'Sensitive record access attempt'}</p>
                <p className="text-[10px] text-outline dark:text-slate-400 font-semibold mt-0.5">User ID: hm_admin - 14:22</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => alert('Đang tải toàn bộ cảnh báo an ninh...')}
            className="mt-lg w-full py-md bg-white dark:bg-slate-700 border border-outline-variant dark:border-slate-650 rounded-lg font-label-md text-primary dark:text-primary-fixed-dim hover:bg-primary hover:text-on-primary transition-all text-body-sm font-semibold active:scale-[0.98]"
          >
            {lang === 'vi' ? 'Xem tất cả cảnh báo' : 'View All Alerts'}
          </button>
        </div>
      </div>
    </div>
  );
}
