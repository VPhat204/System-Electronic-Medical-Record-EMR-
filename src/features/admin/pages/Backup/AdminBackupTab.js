import React from 'react';

export default function AdminBackupTab({
  lang,
  t,
  isBackingUp,
  backupProgress,
  backupHistory,
  handleStartBackup,
}) {
  return (
    <div className="space-y-gutter text-left">
      {/* Page header */}
      <div>
        <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight">{t.backup}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mt-1">
          {lang === 'vi' ? 'Cấu hình lịch sao lưu tự động và tạo bản sao lưu khẩn cấp cho hệ thống EMR.' : 'Configure automatic backup schedules and trigger emergency backups for the EMR system.'}
        </p>
      </div>

      {/* ROW 1: Storage Stats + CTA Buttons */}
      <div className="grid grid-cols-12 gap-gutter">

        {/* Storage gauge card */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg flex flex-col justify-between hover:shadow-xs transition-shadow relative overflow-hidden">
          <div className="flex justify-between items-start mb-md">
            <div>
              <h3 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim mb-xs">
                {lang === 'vi' ? 'Tình trạng Lưu trữ' : 'Storage Status'}
              </h3>
              <p className="text-on-surface-variant dark:text-slate-400 font-body-sm">
                {lang === 'vi' ? 'Cập nhật lúc: 14:30 - 24/05/2024' : 'Last updated: 14:30 - 24/05/2024'}
              </p>
            </div>
            <div className="text-right">
              <span className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed-dim">1.2 TB</span>
              <span className="text-on-surface-variant dark:text-slate-400"> / 2.0 TB</span>
            </div>
          </div>

          {/* Segmented storage bar */}
          <div className="w-full h-4 bg-surface-container-high dark:bg-slate-700 rounded-full overflow-hidden mb-md flex">
            <div className="bg-primary dark:bg-primary-fixed-dim h-full transition-all duration-1000 ease-out" style={{ width: '42%' }}></div>
            <div className="bg-secondary dark:bg-teal-500 h-full transition-all duration-1000 ease-out" style={{ width: '18%' }}></div>
          </div>

          {/* Storage breakdown legend */}
          <div className="grid grid-cols-3 gap-md">
            <div className="flex items-center gap-sm">
              <span className="w-3 h-3 rounded-full bg-primary dark:bg-primary-fixed-dim flex-shrink-0"></span>
              <div className="font-body-sm">
                <p className="text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Dữ liệu EMR' : 'EMR Data'}</p>
                <p className="font-semibold text-on-surface dark:text-white">850 GB</p>
              </div>
            </div>
            <div className="flex items-center gap-sm">
              <span className="w-3 h-3 rounded-full bg-secondary dark:bg-teal-500 flex-shrink-0"></span>
              <div className="font-body-sm">
                <p className="text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Hình ảnh/DICOM' : 'Images/DICOM'}</p>
                <p className="font-semibold text-on-surface dark:text-white">350 GB</p>
              </div>
            </div>
            <div className="flex items-center gap-sm">
              <span className="w-3 h-3 rounded-full bg-outline-variant dark:bg-slate-600 flex-shrink-0"></span>
              <div className="font-body-sm">
                <p className="text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Còn lại' : 'Free Space'}</p>
                <p className="font-semibold text-on-surface dark:text-white">800 GB</p>
              </div>
            </div>
          </div>

          {/* In-progress bar */}
          {isBackingUp && (
            <div className="mt-md space-y-xs border-t border-outline-variant dark:border-slate-700 pt-md">
              <div className="flex justify-between font-body-sm font-bold text-on-surface dark:text-white">
                <span className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px] animate-spin text-primary dark:text-primary-fixed-dim">sync</span>
                  {lang === 'vi' ? 'Đang sao lưu...' : 'Backup in progress...'}
                </span>
                <span className="text-primary dark:text-primary-fixed-dim">{backupProgress}%</span>
              </div>
              <div className="w-full bg-surface-container dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-primary dark:bg-primary-fixed-dim h-full transition-all duration-300 rounded-full" style={{ width: `${backupProgress}%` }}></div>
              </div>
              <p className="text-[11px] text-on-surface-variant dark:text-slate-400 italic">
                {lang === 'vi' ? 'Đang xuất tệp cơ sở dữ liệu EMR — vui lòng không đóng trang này.' : 'Exporting EMR database — please do not close this page.'}
              </p>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-md">
          <button
            onClick={handleStartBackup}
            disabled={isBackingUp}
            className="flex-1 bg-primary text-white rounded-xl p-md flex flex-col items-center justify-center gap-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg border border-primary/20"
          >
            <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isBackingUp ? 'sync' : 'backup'}
            </span>
            <span className="font-headline-md text-headline-md">
              {isBackingUp ? (lang === 'vi' ? `Đang sao lưu... (${backupProgress}%)` : `Backing up... (${backupProgress}%)`) : (lang === 'vi' ? 'Sao lưu ngay' : 'Backup Now')}
            </span>
            <span className="text-[10px] opacity-70 uppercase tracking-widest">Manual Trigger</span>
          </button>
          <button
            onClick={() => alert(lang === 'vi' ? '⚠️ Chức năng Khôi phục Khẩn cấp sẽ khởi động tiến trình restore từ bản sao lưu cuối cùng.' : '⚠️ Emergency Recovery will restore from the last successful backup.')}
            className="flex-1 border-2 border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim rounded-xl p-md flex flex-col items-center justify-center gap-sm hover:bg-primary/5 dark:hover:bg-primary/10 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[40px]">settings_backup_restore</span>
            <span className="font-headline-md text-headline-md">{lang === 'vi' ? 'Khôi phục dữ liệu' : 'Restore Data'}</span>
            <span className="text-[10px] opacity-70 uppercase tracking-widest">Emergency Recovery</span>
          </button>
        </div>
      </div>

      {/* ROW 2: Backup History Table + Config Panel */}
      <div className="grid grid-cols-12 gap-gutter items-start">

        {/* Recent Backups Table */}
        <div className="col-span-12 xl:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xs transition-shadow">
          <div className="p-md border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface-container-low dark:bg-slate-900/60">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">history</span>
              {lang === 'vi' ? 'Danh sách các bản sao lưu gần đây' : 'Recent Backup Archives'}
            </h3>
            <button className="text-primary dark:text-primary-fixed-dim hover:underline font-label-md flex items-center gap-xs">
              {lang === 'vi' ? 'Xem tất cả' : 'View all'}
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container dark:bg-slate-900/40 text-on-surface-variant dark:text-slate-400 border-b border-outline-variant dark:border-slate-700">
                  <th className="px-md py-sm font-label-md text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Thời gian' : 'Timestamp'}</th>
                  <th className="px-md py-sm font-label-md text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Dung lượng' : 'Size'}</th>
                  <th className="px-md py-sm font-label-md text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Loại' : 'Type'}</th>
                  <th className="px-md py-sm font-label-md text-[11px] uppercase tracking-wider">{lang === 'vi' ? 'Trạng thái' : 'Status'}</th>
                  <th className="px-md py-sm font-label-md text-[11px] uppercase tracking-wider text-right">{lang === 'vi' ? 'Thao tác' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 dark:divide-slate-700 font-body-sm text-on-surface dark:text-slate-200">
                {[
                  { id: 'BK-20240524-001', time: '24/05/2024 12:00', size: '14.2 GB', type: 'Incremental', success: true },
                  { id: 'BK-20240523-001', time: '23/05/2024 12:00', size: '12.8 GB', type: 'Incremental', success: true },
                  { id: 'BK-20240522-FULL', time: '22/05/2024 00:00', size: '1.1 TB', type: 'Full Backup', success: true },
                  { id: 'BK-20240521-001', time: '21/05/2024 12:00', size: '15.5 GB', type: 'Incremental', success: false },
                  ...backupHistory.map(b => ({ id: b.name, time: b.time, size: b.size, type: 'Automated', success: b.status === 'Success' }))
                ].map((b, idx) => (
                  <tr key={b.id} className={`hover:bg-surface-container-low dark:hover:bg-slate-700/30 transition-colors group ${idx % 2 === 1 ? 'bg-slate-50/30 dark:bg-slate-900/10' : ''}`}>
                    <td className="px-md py-md text-left">
                      <div className="font-semibold text-on-surface dark:text-white">{b.time}</div>
                      <div className="text-[10px] text-on-surface-variant dark:text-slate-400 font-data-mono">ID: {b.id}</div>
                    </td>
                    <td className="px-md py-md font-data-mono text-on-surface dark:text-white text-left">{b.size}</td>
                    <td className="px-md py-md text-left">
                      {b.type === 'Full Backup' ? (
                        <span className="px-sm py-xs bg-primary-container text-on-primary-container dark:bg-primary/20 dark:text-primary-fixed-dim rounded-full text-[10px] font-bold uppercase">Full Backup</span>
                      ) : b.type === 'Automated' ? (
                        <span className="px-sm py-xs bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 rounded-full text-[10px] font-bold uppercase">Automated</span>
                      ) : (
                        <span className="px-sm py-xs bg-secondary-container/60 text-on-secondary-container dark:bg-teal-950/40 dark:text-teal-400 rounded-full text-[10px] font-bold uppercase">Incremental</span>
                      )}
                    </td>
                    <td className="px-md py-md text-left">
                      {b.success ? (
                        <div className="flex items-center gap-xs text-secondary dark:text-teal-400">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          <span className="font-label-md">{lang === 'vi' ? 'Thành công' : 'Success'}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-xs text-error">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                          <span className="font-label-md">{lang === 'vi' ? 'Thất bại' : 'Failed'}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-md py-md text-right">
                      <button
                        onClick={() => alert(lang === 'vi' ? `Tải về bản sao lưu: ${b.id}` : `Downloading backup: ${b.id}`)}
                        className="p-xs hover:bg-surface-container-high dark:hover:bg-slate-600 rounded transition-colors text-on-surface-variant dark:text-slate-400 opacity-0 group-hover:opacity-100"
                      >
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right panel: Schedule Config + Retention + Cloud */}
        <div className="col-span-12 xl:col-span-4 space-y-md">

          {/* Schedule Configuration */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-xs">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">schedule</span>
                {lang === 'vi' ? 'Cấu hình lịch' : 'Schedule Config'}
              </h3>
              {/* Toggle */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-outline-variant peer-checked:bg-primary rounded-full transition-colors after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>

            <div className="space-y-md">
              <label className="flex items-start gap-sm p-sm bg-surface-container-low dark:bg-slate-900/60 rounded-lg border border-outline-variant dark:border-slate-700 cursor-pointer">
                <input type="radio" name="bkSchedule" defaultChecked className="text-primary focus:ring-primary h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-on-surface dark:text-white font-body-sm">{lang === 'vi' ? 'Hàng ngày (Daily)' : 'Daily'}</p>
                  <p className="text-on-surface-variant dark:text-slate-400 text-[11px] leading-relaxed mt-xs">
                    {lang === 'vi' ? 'Sao lưu vào lúc 00:00 mỗi ngày. Chỉ sao lưu các thay đổi mới (Incremental).' : 'Backs up at midnight every day. Only saves incremental changes.'}
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-sm p-sm rounded-lg border border-outline-variant dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-900/40 cursor-pointer transition-colors">
                <input type="radio" name="bkSchedule" className="text-primary focus:ring-primary h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-on-surface dark:text-white font-body-sm">{lang === 'vi' ? 'Hàng tuần (Weekly)' : 'Weekly'}</p>
                  <p className="text-on-surface-variant dark:text-slate-400 text-[11px] leading-relaxed mt-xs">
                    {lang === 'vi' ? 'Sao lưu vào 00:00 Chủ Nhật. Thực hiện sao lưu toàn bộ hệ thống (Full Backup).' : 'Full backup every Sunday at midnight.'}
                  </p>
                </div>
              </label>

              <div className="pt-xs">
                <label className="font-label-md text-[11px] text-on-surface-variant dark:text-slate-400 block mb-xs uppercase tracking-wider">
                  {lang === 'vi' ? 'Thông báo kết quả qua Email' : 'Notification Email'}
                </label>
                <div className="flex gap-sm">
                  <input
                    type="email"
                    defaultValue="admin@hospital-hms.com"
                    className="flex-1 bg-surface dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg px-sm py-xs text-body-sm focus:ring-1 focus:ring-primary outline-none dark:text-white"
                  />
                  <button
                    onClick={() => alert(lang === 'vi' ? 'Đã lưu địa chỉ email thông báo!' : 'Notification email saved!')}
                    className="px-md py-xs bg-surface-container-high dark:bg-slate-700 text-on-surface dark:text-white rounded-lg font-label-md text-[12px] hover:bg-outline-variant dark:hover:bg-slate-600 transition-colors"
                  >
                    {lang === 'vi' ? 'Lưu' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Retention Policy */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md border-l-4 border-l-tertiary hover:shadow-xs transition-shadow">
            <div className="flex items-center gap-sm mb-xs">
              <span className="material-symbols-outlined text-tertiary">auto_delete</span>
              <h4 className="font-semibold text-on-surface dark:text-white">{lang === 'vi' ? 'Chính sách lưu giữ' : 'Retention Policy'}</h4>
            </div>
            <p className="text-body-sm text-on-surface-variant dark:text-slate-400 leading-relaxed">
              {lang === 'vi'
                ? <>Các bản sao lưu Incremental sẽ được tự động xóa sau <strong className="text-on-surface dark:text-white">30 ngày</strong>. Các bản Full Backup được lưu trữ vĩnh viễn trên Cloud Server riêng biệt.</>
                : <>Incremental backups are auto-deleted after <strong className="text-on-surface dark:text-white">30 days</strong>. Full Backups are stored permanently on a separate Cloud Server.</>}
            </p>
          </div>

          {/* Cloud Sync Status */}
          <div className="bg-primary-fixed dark:bg-primary/20 text-on-primary-fixed-variant dark:text-primary-fixed-dim rounded-xl p-md flex items-center justify-between shadow-sm border border-primary/10 dark:border-primary/30">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
              <div>
                <p className="font-bold font-body-md">Cloud Sync Active</p>
                <p className="text-[11px] opacity-80">AWS Medical Instance 01</p>
              </div>
            </div>
            <span className="material-symbols-outlined animate-spin" style={{ animationDuration: '3s' }}>sync</span>
          </div>
        </div>
      </div>
    </div>
  );
}
