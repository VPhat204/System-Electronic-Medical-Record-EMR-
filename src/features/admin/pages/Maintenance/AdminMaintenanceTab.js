import React from 'react';

export default function AdminMaintenanceTab({
  lang,
  t,
  maintenanceMode,
  setMaintenanceMode,
  showHealthModal,
  setShowHealthModal,
  healthScanDone,
  runHealthCheck,
  maintLogs,
}) {
  return (
    <div className="space-y-gutter text-left">

      {/* Page header */}
      <div>
        <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight">{t.maintenance}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mt-1">
          {lang === 'vi' ? 'Kiểm tra tình trạng hệ thống, thực hiện bảo trì và theo dõi nhật ký vận hành.' : 'Check system health, perform maintenance tasks, and review operation logs.'}
        </p>
      </div>

      {/* ROW 1: System Status + Quick Tools + Schedule */}
      <div className="grid grid-cols-12 gap-gutter">

        {/* Left column: Status card + Quick Tools */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">

          {/* System Status Card */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg flex items-center justify-between hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-lg">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${maintenanceMode ? 'bg-error-container/60 dark:bg-red-950/30' : 'bg-secondary-container/60 dark:bg-teal-950/30'}`}>
                <span
                  className={`material-symbols-outlined text-[32px] animate-pulse ${maintenanceMode ? 'text-error' : 'text-secondary dark:text-teal-400'}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {maintenanceMode ? 'build' : 'check_circle'}
                </span>
              </div>
              <div className="text-left">
                <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white">
                  {maintenanceMode
                    ? (lang === 'vi' ? 'Trạng thái: Bảo trì' : 'Status: Maintenance Mode')
                    : (lang === 'vi' ? 'Trạng thái: Trực tuyến' : 'Status: Online')}
                </h3>
                <p className="text-on-surface-variant dark:text-slate-400 font-body-md">
                  {maintenanceMode
                    ? (lang === 'vi' ? 'Hệ thống đang trong chế độ bảo trì. Người dùng thường không thể truy cập.' : 'System is in maintenance mode. Regular users cannot access.')
                    : (lang === 'vi' ? 'Hệ thống đang hoạt động bình thường. Lần bảo trì cuối: 12 giờ trước.' : 'System operating normally. Last maintenance: 12 hours ago.')}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-sm flex-shrink-0">
              <span className={`font-label-md text-label-md font-bold px-sm py-xs rounded uppercase tracking-wider ${maintenanceMode ? 'bg-error-container text-on-error-container' : 'bg-secondary-container/60 text-on-secondary-container dark:text-teal-700'}`}>
                {maintenanceMode ? 'MAINTENANCE' : 'ONLINE MODE'}
              </span>
              <button
                onClick={() => {
                  if (!maintenanceMode || window.confirm(lang === 'vi' ? 'Tắt chế độ bảo trì và khôi phục truy cập hệ thống?' : 'Disable maintenance mode and restore system access?')) {
                    setMaintenanceMode(!maintenanceMode);
                  }
                }}
                className={`text-[12px] font-bold flex items-center gap-xs hover:underline transition-colors ${maintenanceMode ? 'text-secondary dark:text-teal-400' : 'text-error'}`}
              >
                <span className="material-symbols-outlined text-[16px]">power_settings_new</span>
                {maintenanceMode
                  ? (lang === 'vi' ? 'Tắt Chế độ Bảo trì' : 'Disable Maintenance Mode')
                  : (lang === 'vi' ? 'Kích hoạt Chế độ Bảo trì' : 'Activate Maintenance Mode')}
              </button>
            </div>
          </div>

          {/* Quick Maintenance Tools Grid */}
          <div className="grid grid-cols-3 gap-md">
            {[
              { icon: 'monitor_heart', label: lang === 'vi' ? 'Kiểm tra Health' : 'Check Health', action: runHealthCheck },
              { icon: 'delete_sweep', label: lang === 'vi' ? 'Xóa Cache' : 'Clear Cache', action: () => alert(lang === 'vi' ? '✅ Đã xóa 4.2 GB bộ nhớ đệm hệ thống thành công.' : '✅ Cleared 4.2 GB of system cache.') },
              { icon: 'database', label: lang === 'vi' ? 'Tối ưu DB' : 'Optimize DB', action: () => alert(lang === 'vi' ? '⚙️ Đang tiến hành tối ưu hóa chỉ mục CSDL...' : '⚙️ Database defragmentation launched...') },
              { icon: 'security_update', label: lang === 'vi' ? 'Cập nhật Patch' : 'Apply Patch', action: () => alert(lang === 'vi' ? '🔒 Đang tải gói cập nhật bảo mật...' : '🔒 Downloading security patch...') },
              { icon: 'restart_alt', label: lang === 'vi' ? 'Khởi động lại' : 'Restart Service', action: () => window.confirm(lang === 'vi' ? 'Xác nhận khởi động lại dịch vụ EMR Core?' : 'Confirm restart of EMR Core service?') && alert(lang === 'vi' ? '🔄 Dịch vụ EMR Core đang được khởi động lại...' : '🔄 EMR Core restarting...') },
              { icon: 'manage_history', label: lang === 'vi' ? 'Dọn Logs cũ' : 'Purge Old Logs', action: () => alert(lang === 'vi' ? '🗑️ Đã xóa 1,248 bản ghi logs cũ hơn 90 ngày.' : '🗑️ Purged 1,248 log entries older than 90 days.') },
            ].map(tool => (
              <button
                key={tool.icon}
                onClick={tool.action}
                className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-xl flex flex-col items-center gap-sm hover:border-primary dark:hover:border-primary-fixed-dim hover:bg-primary/5 dark:hover:bg-primary/10 transition-all active:scale-95 group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-surface-container dark:bg-slate-700 flex items-center justify-center text-primary dark:text-primary-fixed-dim group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary-fixed-dim dark:group-hover:text-on-primary transition-all">
                  <span className="material-symbols-outlined text-[20px]">{tool.icon}</span>
                </div>
                <span className="font-label-md text-[11px] text-on-surface dark:text-slate-200 text-center leading-tight">{tool.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right column: Upcoming Schedule */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden flex flex-col h-full hover:shadow-xs transition-shadow">
            <div className="px-md py-sm bg-surface-container-low dark:bg-slate-900/60 flex items-center justify-between border-b border-outline-variant dark:border-slate-700 text-left">
              <h3 className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant dark:text-slate-400 font-bold">
                {lang === 'vi' ? 'Lịch bảo trì sắp tới' : 'Upcoming Maintenance'}
              </h3>
              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 text-[20px]">event</span>
            </div>

            <div className="p-md flex flex-col gap-md flex-1 text-left">
              {/* Upcoming item 1 */}
              <div className="flex gap-md">
                <div className="flex flex-col items-center bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-fixed-dim px-sm py-xs rounded-lg w-14 h-14 shrink-0 justify-center">
                  <span className="font-headline-md text-headline-md font-bold leading-none">24</span>
                  <span className="text-[10px] font-bold">{lang === 'vi' ? 'TH 10' : 'OCT'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-body-md font-semibold text-on-surface dark:text-white">{lang === 'vi' ? 'Cập nhật Kernel 2.4' : 'Kernel 2.4 Update'}</span>
                  <span className="text-body-sm text-on-surface-variant dark:text-slate-400">02:00 AM - 04:00 AM (GMT+7)</span>
                  <span className="mt-xs text-[10px] px-xs py-0.5 bg-error-container/40 dark:bg-red-950/30 text-error dark:text-red-400 rounded self-start font-bold uppercase">
                    {lang === 'vi' ? 'Gián đoạn dịch vụ' : 'Downtime expected'}
                  </span>
                </div>
              </div>

              <div className="h-[1px] bg-outline-variant dark:bg-slate-700"></div>

              {/* Upcoming item 2 */}
              <div className="flex gap-md opacity-60">
                <div className="flex flex-col items-center bg-surface-container dark:bg-slate-700 text-on-surface-variant dark:text-slate-400 px-sm py-xs rounded-lg w-14 h-14 shrink-0 justify-center">
                  <span className="font-headline-md text-headline-md font-bold leading-none">05</span>
                  <span className="text-[10px] font-bold">{lang === 'vi' ? 'TH 11' : 'NOV'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-body-md font-semibold text-on-surface dark:text-white">{lang === 'vi' ? 'Tối ưu Index DB' : 'DB Index Optimization'}</span>
                  <span className="text-body-sm text-on-surface-variant dark:text-slate-400">01:00 AM - 01:30 AM</span>
                </div>
              </div>

              <button
                onClick={() => alert(lang === 'vi' ? 'Mở form đặt lịch bảo trì mới...' : 'Opening new maintenance schedule form...')}
                className="margin-top-auto py-sm text-primary dark:text-primary-fixed-dim font-label-md text-[12px] font-bold hover:bg-primary/5 dark:hover:bg-primary/10 rounded transition-colors text-center border border-dashed border-primary/30 dark:border-primary/40 mt-auto"
              >
                + {lang === 'vi' ? 'Thêm lịch trình mới' : 'Add New Schedule'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: Safety Warning Banner */}
      <div className="bg-error-container/10 dark:bg-red-950/20 border-2 border-error/20 dark:border-error/30 p-lg rounded-xl flex items-start gap-lg relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 p-lg opacity-[0.06] rotate-12 pointer-events-none select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '120px', fontVariationSettings: "'FILL' 1" }}>warning</span>
        </div>
        <div className="bg-error text-on-error p-md rounded-lg shrink-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>security_update_warning</span>
        </div>
        <div className="max-w-3xl">
          <h3 className="font-headline-md text-headline-md text-error mb-xs font-bold">
            {lang === 'vi' ? 'Cảnh báo An toàn Quan trọng' : 'Important Safety Warning'}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mb-md">
            {lang === 'vi'
              ? 'Việc thực hiện các thao tác bảo trì có thể ảnh hưởng đến dữ liệu thời gian thực của bệnh nhân. Vui lòng đảm bảo các điều kiện sau đã được đáp ứng:'
              : 'Maintenance operations may affect real-time patient data. Please ensure the following conditions are met before proceeding:'}
          </p>
          <ul className="grid grid-cols-2 gap-sm">
            {[
              lang === 'vi' ? 'Sao lưu cơ sở dữ liệu hoàn tất' : 'Database backup completed',
              lang === 'vi' ? 'Thông báo cho tất cả đơn vị trực' : 'All on-duty units notified',
              lang === 'vi' ? 'Kiểm tra bộ nhớ trống tối thiểu 50GB' : 'Minimum 50GB free storage verified',
              lang === 'vi' ? 'Chế độ Failover đã sẵn sàng' : 'Failover mode is ready',
            ].map(item => (
              <li key={item} className="flex items-center gap-xs text-body-sm text-on-surface dark:text-slate-200">
                <span className="material-symbols-outlined text-error text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ROW 3: Maintenance Logs Table */}
      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xs transition-shadow">
        <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 flex items-center justify-between bg-surface-container-low dark:bg-slate-900/60 text-left">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">
            {lang === 'vi' ? 'Nhật ký bảo trì hệ thống' : 'System Maintenance Logs'}
          </h3>
          <div className="flex gap-sm">
            <button className="px-md py-1.5 border border-outline-variant dark:border-slate-700 rounded-lg font-label-md text-[12px] text-on-surface dark:text-slate-200 flex items-center gap-xs hover:bg-surface-container dark:hover:bg-slate-700 transition-all">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              {lang === 'vi' ? 'Lọc' : 'Filter'}
            </button>
            <button
              onClick={() => alert(lang === 'vi' ? 'Xuất CSV nhật ký bảo trì...' : 'Exporting maintenance log as CSV...')}
              className="px-md py-1.5 border border-outline-variant dark:border-slate-700 rounded-lg font-label-md text-[12px] text-on-surface dark:text-slate-200 flex items-center gap-xs hover:bg-surface-container dark:hover:bg-slate-700 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              {lang === 'vi' ? 'Xuất CSV' : 'Export CSV'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-body-md">
            <thead className="bg-surface-container-lowest dark:bg-slate-900/40 text-on-surface-variant dark:text-slate-400 border-b border-outline-variant dark:border-slate-700">
              <tr>
                <th className="px-lg py-md font-semibold text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Ngày thực hiện' : 'Date'}</th>
                <th className="px-lg py-md font-semibold text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Loại bảo trì' : 'Type'}</th>
                <th className="px-lg py-md font-semibold text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Người thực hiện' : 'Performed by'}</th>
                <th className="px-lg py-md font-semibold text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Trạng thái' : 'Status'}</th>
                <th className="px-lg py-md font-semibold text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Ghi chú' : 'Notes'}</th>
                <th className="px-lg py-md font-semibold text-[11px] uppercase tracking-wider text-right">{lang === 'vi' ? 'Hành động' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 dark:divide-slate-700">
              {maintLogs.map((log, idx) => (
                <tr key={idx} className={`hover:bg-surface-container-low dark:hover:bg-slate-700/30 transition-colors ${idx % 2 === 1 ? 'bg-slate-50/40 dark:bg-slate-900/10' : ''}`}>
                  <td className="px-lg py-md font-data-mono text-[12px] text-on-surface dark:text-white text-left">{log.date}</td>
                  <td className="px-lg py-md text-on-surface dark:text-slate-200 text-left">{lang === 'vi' ? log.typeVi : log.typeEn}</td>
                  <td className="px-lg py-md text-on-surface-variant dark:text-slate-400 font-data-mono text-[12px] text-left">{log.actor}</td>
                  <td className="px-lg py-md text-left">
                    {log.ok ? (
                      <span className="px-sm py-0.5 bg-secondary-container/60 text-on-secondary-container dark:bg-teal-950/40 dark:text-teal-400 rounded text-[10px] font-bold uppercase">
                        {lang === 'vi' ? 'Thành công' : 'Success'}
                      </span>
                    ) : (
                      <span className="px-sm py-0.5 bg-error-container text-on-error-container rounded text-[10px] font-bold uppercase">
                        {lang === 'vi' ? 'Lỗi nhẹ' : 'Minor Error'}
                      </span>
                    )}
                  </td>
                  <td className="px-lg py-md text-on-surface-variant dark:text-slate-400 text-[12px] max-w-[200px] truncate text-left">{lang === 'vi' ? log.noteVi : log.noteEn}</td>
                  <td className="px-lg py-md text-right">
                    <button
                      onClick={() => alert(lang === 'vi' ? `Chi tiết: ${log.typeVi} — ${log.noteVi}` : `Detail: ${log.typeEn} — ${log.noteEn}`)}
                      className="text-primary dark:text-primary-fixed-dim hover:underline font-label-md text-[12px]"
                    >
                      {lang === 'vi' ? 'Chi tiết' : 'Details'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="p-md flex items-center justify-between bg-surface-container-lowest dark:bg-slate-900/40 border-t border-outline-variant dark:border-slate-700">
          <span className="text-body-sm text-on-surface-variant dark:text-slate-400 font-semibold">
            {lang === 'vi' ? 'Hiển thị 4/124 bản ghi' : 'Showing 4 of 124 records'}
          </span>
          <div className="flex gap-xs">
            <button className="w-8 h-8 flex items-center justify-center border border-outline-variant dark:border-slate-700 rounded hover:bg-surface-container dark:hover:bg-slate-700 opacity-50">
              <span className="material-symbols-outlined text-[18px] text-on-surface dark:text-white">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded font-bold text-[11px]">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-outline-variant dark:border-slate-700 rounded hover:bg-surface-container dark:hover:bg-slate-700 font-bold text-[11px] text-on-surface dark:text-white">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-outline-variant dark:border-slate-700 rounded hover:bg-surface-container dark:hover:bg-slate-700 font-bold text-[11px] text-on-surface dark:text-white">3</button>
            <button className="w-8 h-8 flex items-center justify-center border border-outline-variant dark:border-slate-700 rounded hover:bg-surface-container dark:hover:bg-slate-700">
              <span className="material-symbols-outlined text-[18px] text-on-surface dark:text-white">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Health Check Modal */}
      {showHealthModal && (
        <div className="fixed inset-0 bg-on-background/40 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-xl shadow-2xl border border-outline-variant dark:border-slate-700 p-lg">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>health_and_safety</span>
                {lang === 'vi' ? 'Kiểm tra sức khỏe hệ thống' : 'System Health Check'}
              </h3>
              <button onClick={() => setShowHealthModal(false)} className="text-on-surface-variant hover:text-error dark:hover:text-red-400 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-md">
              {[
                { label: lang === 'vi' ? 'Kiểm tra kết nối DB' : 'Database Connection', value: <span className="material-symbols-outlined text-secondary dark:text-teal-400 animate-none" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> },
                { label: lang === 'vi' ? 'Kiểm tra lưu lượng RAM' : 'RAM Utilization', value: <span className="font-label-md font-bold text-secondary dark:text-teal-400">24% Used</span> },
                { label: lang === 'vi' ? 'Kiểm tra ổ đĩa SSD' : 'SSD Storage', value: <span className="font-label-md font-bold text-secondary dark:text-teal-400">820GB Free</span> },
                {
                  label: lang === 'vi' ? 'Đang quét logs bảo mật...' : 'Scanning security logs...',
                  value: healthScanDone
                    ? <span className="material-symbols-outlined text-secondary dark:text-teal-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    : <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>,
                  pulse: !healthScanDone
                },
              ].map((item, i) => (
                <div key={i} className={`p-md bg-surface-container dark:bg-slate-750 rounded-lg flex items-center justify-between ${item.pulse ? 'animate-pulse' : ''}`}>
                  <span className="font-body-md text-on-surface dark:text-slate-200">{item.label}</span>
                  {item.value}
                </div>
              ))}
            </div>

            <div className="mt-lg flex justify-end">
              <button
                onClick={() => setShowHealthModal(false)}
                disabled={!healthScanDone}
                className="bg-primary text-white px-lg py-md rounded-lg font-label-md hover:opacity-90 transition-all disabled:opacity-50 active:scale-95"
              >
                {healthScanDone ? (lang === 'vi' ? 'Hoàn tất' : 'Done') : (lang === 'vi' ? 'Đang quét...' : 'Scanning...')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
