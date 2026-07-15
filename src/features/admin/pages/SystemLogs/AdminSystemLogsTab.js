import React from 'react';

export default function AdminSystemLogsTab({
  lang,
  t,
  logDateFilter,
  setLogDateFilter,
  logTypeFilter,
  setLogTypeFilter,
  searchQuery,
  setSearchQuery,
  filteredLogs,
  logsList,
  setLogsList,
  setActiveTab,
}) {
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

        <div className="bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-tertiary bg-tertiary-container p-xs rounded text-on-tertiary-container">database</span>
          </div>
          <div className="mt-sm text-left">
            <p className="text-outline dark:text-slate-400 text-label-md">{lang === 'vi' ? 'Truy xuất Dữ liệu' : 'Data Retrieved'}</p>
            <p className="text-headline-lg font-black text-on-surface dark:text-white mt-1">15.4 GB</p>
          </div>
        </div>
      </div>

      {/* Real-time Log Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
        <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface-container-lowest dark:bg-slate-900/60">
          <div className="flex items-center gap-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h3 className="font-headline-md text-on-surface dark:text-white">{lang === 'vi' ? 'Live Event Feed' : 'Live Event Feed'}</h3>
          </div>
          <div className="flex items-center gap-md">
            <button 
              onClick={() => alert('Xuất tệp CSV nhật ký...')}
              className="text-primary dark:text-primary-fixed-dim font-label-md flex items-center gap-xs hover:underline text-body-sm font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">download</span> {lang === 'vi' ? 'Xuất CSV' : 'Export CSV'}
            </button>
            <button 
              onClick={() => {
                if (window.confirm(lang === 'vi' ? 'Làm sạch danh sách Log?' : 'Clear live logs list?')) {
                  setLogsList([]);
                }
              }}
              className="text-outline hover:text-on-surface dark:hover:text-white"
            >
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low dark:bg-slate-900/30 border-b border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-300">
                <th className="px-lg py-sm font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Thời điểm' : 'Timestamp'}</th>
                <th className="px-lg py-sm font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Người dùng' : 'User'}</th>
                <th className="px-lg py-sm font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Hành động' : 'Action'}</th>
                <th className="px-lg py-sm font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Địa chỉ IP' : 'IP Address'}</th>
                <th className="px-lg py-sm font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Mức độ' : 'Level'}</th>
                <th className="px-lg py-sm font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold text-right">{lang === 'vi' ? 'Chi tiết' : 'Details'}</th>
              </tr>
            </thead>
            <tbody className="text-body-md divide-y divide-outline-variant/30 dark:divide-slate-700">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, idx) => {
                  const isError = log.level === 'ERROR';
                  const isWarning = log.level === 'WARNING';
                  return (
                    <tr key={log.id} className={`${isError ? 'bg-error-container/5 dark:bg-red-950/10' : idx % 2 === 1 ? 'bg-slate-50/20 dark:bg-slate-900/10' : 'bg-white dark:bg-slate-800'} hover:bg-primary-fixed/10 dark:hover:bg-slate-700/30 transition-colors group`}>
                      <td className="px-lg py-md whitespace-nowrap text-left">
                        <div className="flex flex-col">
                          <span className={`font-bold ${isError ? 'text-error dark:text-red-400' : 'text-on-surface dark:text-white'}`}>{log.time}</span>
                          <span className="text-[10px] text-outline dark:text-slate-400 mt-0.5">{log.date}</span>
                        </div>
                      </td>
                      <td className="px-lg py-md text-left">
                        <div className="flex items-center gap-sm">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isError ? 'bg-error text-on-error' : 'bg-primary-container dark:bg-slate-700 text-on-primary-container dark:text-white'}`}>
                            {log.userInitials}
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-on-surface dark:text-white text-body-sm">{log.userName}</p>
                            <p className="text-[10px] text-outline dark:text-slate-400">{log.userRole}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-lg py-md text-left">
                        <div className="flex items-center gap-xs">
                          <span className={`material-symbols-outlined text-[18px] ${isError ? 'text-error' : isWarning ? 'text-amber-500' : 'text-primary dark:text-primary-fixed-dim'}`}>
                            {log.actionIcon}
                          </span>
                          <span className={`text-body-sm font-semibold ${isError ? 'text-error font-bold dark:text-red-300' : 'text-on-surface dark:text-slate-200'}`}>
                            {log.actionText}
                          </span>
                        </div>
                      </td>
                      <td className="px-lg py-md font-data-mono text-[12px] text-on-surface-variant dark:text-slate-400 text-left">{log.ip}</td>
                      <td className="px-lg py-md text-left">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${isError 
                          ? 'bg-error text-on-error' 
                          : isWarning 
                            ? 'bg-orange-100 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400' 
                            : 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'}`}>
                          {log.level}
                        </span>
                      </td>
                      <td className="px-lg py-md text-right">
                        <button 
                          onClick={() => alert(`Chi tiết nhật ký: \nThời gian: ${log.time} - ${log.date}\nTác vụ: ${log.actionText}\nĐịa chỉ IP: ${log.ip}\nMức độ: ${log.level}`)}
                          className={`p-1 hover:bg-surface-container dark:hover:bg-slate-700 rounded-full transition-colors ${isError ? 'text-error' : 'text-outline dark:text-slate-400'}`}
                        >
                          <span className="material-symbols-outlined">{isError ? 'report' : 'visibility'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-lg py-12 text-center text-on-surface-variant dark:text-slate-400 italic">
                    {lang === 'vi' ? 'Không tìm thấy kết quả phù hợp.' : 'No events found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-lg py-md bg-surface-container-low dark:bg-slate-900/60 border-t border-outline-variant dark:border-slate-700 flex items-center justify-between">
          <p className="text-body-sm text-outline dark:text-slate-400 font-semibold">
            {lang === 'vi' ? `Hiển thị ${filteredLogs.length} trong số ${logsList.length} sự kiện` : `Showing ${filteredLogs.length} of ${logsList.length} events`}
          </p>
          <div className="flex items-center gap-xs">
            <button className="p-1 border border-outline-variant dark:border-slate-700 rounded hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30" disabled={true}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-bold text-body-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white dark:hover:bg-slate-800 text-on-surface-variant dark:text-slate-200 font-bold text-body-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white dark:hover:bg-slate-800 text-on-surface-variant dark:text-slate-200 font-bold text-body-sm">3</button>
            <span className="px-1 text-outline dark:text-slate-500">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white dark:hover:bg-slate-800 text-on-surface-variant dark:text-slate-200 font-bold text-body-sm">257</button>
            <button className="p-1 border border-outline-variant dark:border-slate-700 rounded hover:bg-white dark:hover:bg-slate-800">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Asymmetric Module: Visual Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 p-lg hover:shadow-xs transition-shadow text-left">
          <div className="flex justify-between items-center mb-lg">
            <h4 className="font-headline-md text-on-surface dark:text-white font-bold">{lang === 'vi' ? 'Phân tích Lưu lượng Truy cập' : 'Traffic Analysis'}</h4>
            <span className="text-body-sm text-outline dark:text-slate-400 font-semibold">{lang === 'vi' ? 'Thời gian thực (60 phút)' : 'Real Time (60 mins)'}</span>
          </div>
          <div className="h-48 flex items-end justify-between gap-2 px-md select-none">
            <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t h-[40%] hover:bg-primary transition-all cursor-help relative group">
              <div className="absolute -top-8 left-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">42 events</div>
            </div>
            <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t h-[65%] hover:bg-primary transition-all cursor-help relative group">
              <div className="absolute -top-8 left-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">68 events</div>
            </div>
            <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t h-[55%] hover:bg-primary transition-all cursor-help relative group">
              <div className="absolute -top-8 left-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">55 events</div>
            </div>
            <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t h-[90%] hover:bg-primary transition-all cursor-help relative group">
              <div className="absolute -top-8 left-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">90 events</div>
            </div>
            <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t h-[75%] hover:bg-primary transition-all cursor-help relative group">
              <div className="absolute -top-8 left-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">75 events</div>
            </div>
            <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t h-[45%] hover:bg-primary transition-all cursor-help relative group">
              <div className="absolute -top-8 left-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">45 events</div>
            </div>
            <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t h-[60%] hover:bg-primary transition-all cursor-help relative group">
              <div className="absolute -top-8 left-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">60 events</div>
            </div>
            <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t h-[85%] hover:bg-primary transition-all cursor-help relative group">
              <div className="absolute -top-8 left-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">85 events</div>
            </div>
            <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t h-[30%] hover:bg-primary transition-all cursor-help relative group">
              <div className="absolute -top-8 left-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">30 events</div>
            </div>
            <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t h-[50%] hover:bg-primary transition-all cursor-help relative group">
              <div className="absolute -top-8 left-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">50 events</div>
            </div>
            <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t h-[70%] hover:bg-primary transition-all cursor-help relative group">
              <div className="absolute -top-8 left-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">70 events</div>
            </div>
            <div className="w-full bg-primary rounded-t h-[95%] animate-pulse relative group">
              <div className="absolute -top-8 left-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-100 whitespace-nowrap z-10">Live: 104</div>
            </div>
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
