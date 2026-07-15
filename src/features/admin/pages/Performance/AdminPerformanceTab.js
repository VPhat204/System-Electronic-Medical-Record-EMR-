import React from 'react';

export default function AdminPerformanceTab({
  lang,
  t,
  isDark,
  isRefreshingPerf,
  globalUptime,
  dbInstances,
  setDbInstances,
  handleRefreshPerformance,
}) {
  return (
    <div className="space-y-lg">
      {/* Scanline Animation CSS Declarations */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        .scanline-anim {
          animation: scan 3s linear infinite;
        }
        .status-pulse-anim {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* Breadcrumbs and Action Header */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-md text-left">
        <div>
          <nav className="flex space-x-2 text-outline dark:text-slate-500 font-body-sm text-[11px] font-bold uppercase tracking-wider mb-1">
            <span>Admin</span>
            <span>/</span>
            <span>Systems</span>
            <span>/</span>
            <span className="text-primary dark:text-primary-fixed-dim font-bold">Theo dõi Hiệu năng</span>
          </nav>
          <h3 className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight">{lang === 'vi' ? 'Theo dõi Hiệu năng' : 'Performance Monitor'}</h3>
          <p className="text-on-surface-variant dark:text-slate-400 font-body-md mt-1">
            {lang === 'vi' ? 'Hệ thống theo dõi thời gian thực cho hạ tầng y tế MediLink.' : 'Real-time telemetry diagnostics for EMR infrastructure.'}
          </p>
        </div>
        <div className="flex space-x-md">
          <button className="flex items-center space-x-2 px-md py-2 border border-outline dark:border-slate-700 rounded bg-white dark:bg-slate-800 font-label-md text-body-sm font-semibold text-on-surface dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-xs">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span>{lang === 'vi' ? '24 Giờ Qua' : 'Last 24 Hours'}</span>
          </button>
          <button 
            onClick={handleRefreshPerformance}
            disabled={isRefreshingPerf}
            className="flex items-center space-x-2 px-md py-2 bg-primary text-on-primary rounded font-label-md text-body-sm font-bold hover:bg-primary-container transition-all active:scale-95 disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-[18px] ${isRefreshingPerf ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>{isRefreshingPerf ? (lang === 'vi' ? 'Đang cập nhật...' : 'Refreshing...') : (lang === 'vi' ? 'Làm mới dữ liệu' : 'Refresh Telemetry')}</span>
          </button>
        </div>
      </header>

      {/* Bento Grid Infrastructure */}
      <div className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Hero Global Uptime Block */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden relative min-h-[300px] flex flex-col justify-between hover:shadow-xs transition-shadow">
          {/* Scanline overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-10">
            <div className="w-full h-0.5 bg-gradient-to-right from-transparent via-primary to-transparent absolute top-0 scanline-anim"></div>
          </div>
          
          <div className="relative z-10 p-lg h-full flex flex-col flex-grow justify-between">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-md">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="w-3 h-3 bg-secondary dark:bg-teal-500 rounded-full status-pulse-anim"></span>
                  <span className="font-label-md text-[11px] font-bold text-secondary dark:text-teal-400 uppercase tracking-wider">{lang === 'vi' ? 'Hệ thống Trực tuyến' : 'System Online'}</span>
                </div>
                <h4 className="font-headline-lg text-headline-lg font-black text-on-surface dark:text-white">{lang === 'vi' ? `Uptime Toàn cục: ${globalUptime.toFixed(2)}%` : `Global Uptime: ${globalUptime.toFixed(2)}%`}</h4>
              </div>
              <div className="bg-surface-container-low dark:bg-slate-900 px-4 py-2 rounded-lg border border-outline-variant dark:border-slate-700 text-left">
                <p className="text-outline dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">{lang === 'vi' ? 'Tải hiện tại' : 'Current Bandwidth'}</p>
                <p className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim mt-0.5">1.2 TB/s</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-md mt-lg">
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xs p-md rounded-lg border border-outline-variant dark:border-slate-700 text-left">
                <p className="text-outline dark:text-slate-400 text-body-sm font-semibold">API Latency</p>
                <p className="font-headline-md text-headline-md text-on-surface dark:text-white mt-1">24ms</p>
                <div className="w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-primary dark:bg-primary-fixed-dim h-full w-[15%]"></div>
                </div>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xs p-md rounded-lg border border-outline-variant dark:border-slate-700 text-left">
                <p className="text-outline dark:text-slate-400 text-body-sm font-semibold">DB Connections</p>
                <p className="font-headline-md text-headline-md text-on-surface dark:text-white mt-1">1,402</p>
                <div className="w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-secondary dark:bg-teal-500 h-full w-[45%]"></div>
                </div>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xs p-md rounded-lg border border-outline-variant dark:border-slate-700 text-left">
                <p className="text-outline dark:text-slate-400 text-body-sm font-semibold">Active Users</p>
                <p className="font-headline-md text-headline-md text-on-surface dark:text-white mt-1">8,941</p>
                <div className="w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-tertiary-container h-full w-[72%]"></div>
                </div>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xs p-md rounded-lg border border-outline-variant dark:border-slate-700 text-left">
                <p className="text-outline dark:text-slate-400 text-body-sm font-semibold">Error Rate</p>
                <p className="font-headline-md text-headline-md text-on-surface dark:text-white mt-1">0.02%</p>
                <div className="w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-error h-full w-[2%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Clusters Status */}
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div className="text-left w-full">
            <h5 className="font-label-md text-label-md text-outline dark:text-slate-400 uppercase tracking-wider mb-md font-bold">{lang === 'vi' ? 'Trạng thái Cụm dịch vụ' : 'Service Cluster Nodes'}</h5>
            <ul className="space-y-md">
              <li className="flex items-center justify-between p-md bg-surface-container-low dark:bg-slate-900/60 rounded border border-outline-variant dark:border-slate-700">
                <div className="flex items-center space-x-md text-on-surface dark:text-white font-semibold text-body-sm animate-none">
                  <span className="material-symbols-outlined text-secondary dark:text-teal-400 animate-none">dns</span>
                  <span>Patient Record Cluster</span>
                </div>
                <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed px-2 py-1 rounded font-bold uppercase">Healthy</span>
              </li>
              <li className="flex items-center justify-between p-md bg-surface-container-low dark:bg-slate-900/60 rounded border border-outline-variant dark:border-slate-700">
                <div className="flex items-center space-x-md text-on-surface dark:text-white font-semibold text-body-sm">
                  <span className="material-symbols-outlined text-secondary dark:text-teal-400">imagesearch_roller</span>
                  <span>DICOM Imaging Proxy</span>
                </div>
                <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed px-2 py-1 rounded font-bold uppercase">Healthy</span>
              </li>
              <li className="flex items-center justify-between p-md bg-surface-container-low dark:bg-slate-900/60 rounded border border-outline-variant dark:border-slate-700">
                <div className="flex items-center space-x-md text-on-surface dark:text-white font-semibold text-body-sm">
                  <span className="material-symbols-outlined text-tertiary">database</span>
                  <span>Main SQL Instance B</span>
                </div>
                <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded font-bold uppercase">Warning</span>
              </li>
              <li className="flex items-center justify-between p-md bg-surface-container-low dark:bg-slate-900/60 rounded border border-outline-variant dark:border-slate-700">
                <div className="flex items-center space-x-md text-on-surface dark:text-white font-semibold text-body-sm">
                  <span className="material-symbols-outlined text-secondary dark:text-teal-400">hub</span>
                  <span>HL7 Interface Engine</span>
                </div>
                <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed px-2 py-1 rounded font-bold uppercase">Healthy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CPU usage chart bento card */}
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg hover:shadow-xs transition-shadow">
          <div className="flex justify-between items-center mb-md text-left">
            <div>
              <h5 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{lang === 'vi' ? 'Sử dụng CPU' : 'CPU Utilization'}</h5>
              <p className="text-outline dark:text-slate-400 text-body-sm">{lang === 'vi' ? 'Trung bình cụm server' : 'Cluster server average'}</p>
            </div>
            <span className="text-headline-md font-bold text-primary dark:text-primary-fixed-dim">34%</span>
          </div>
          <div className="h-[180px] flex items-end justify-between space-x-1 mt-4">
            {/* Simulated bars */}
            {[20, 45, 30, 60, 25, 40, 55, 35, 34, 15, 20, 25].map((h, i) => (
              <div 
                key={i} 
                className={`w-full hover:bg-primary transition-all duration-300 rounded-t-xs ${i === 8 ? 'bg-primary dark:bg-primary-fixed-dim' : 'bg-primary/20 dark:bg-slate-700'}`}
                style={{ height: `${h}%` }}
                title={`${h}% CPU load`}
              />
            ))}
          </div>
        </div>

        {/* Memory usage chart bento card */}
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg hover:shadow-xs transition-shadow">
          <div className="flex justify-between items-center mb-md text-left">
            <div>
              <h5 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{lang === 'vi' ? 'Bộ nhớ (RAM)' : 'RAM Allocation'}</h5>
              <p className="text-outline dark:text-slate-400 text-body-sm">{lang === 'vi' ? 'Cấp phát hệ thống' : 'System memory usage'}</p>
            </div>
            <span className="text-headline-md font-bold text-secondary dark:text-teal-400">62%</span>
          </div>
          <div className="h-[180px] relative mt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
              <path d="M0,100 Q50,80 100,110 T200,90 T300,120 T400,80" fill="none" stroke={isDark ? '#5ddacb' : '#006a62'} strokeWidth="3"></path>
              <path d="M0,100 Q50,80 100,110 T200,90 T300,120 T400,80 L400,150 L0,150 Z" fill="url(#grad1)" opacity="0.2"></path>
              <defs>
                <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#79f4e5" stopOpacity="1"></stop>
                  <stop offset="100%" stopColor={isDark ? '#1e293b' : '#ffffff'} stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <circle cx="400" cy="80" fill={isDark ? '#5ddacb' : '#006a62'} r="4"></circle>
            </svg>
          </div>
        </div>

        {/* Active sessions chart bento card */}
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg hover:shadow-xs transition-shadow">
          <div className="flex justify-between items-center mb-md text-left">
            <div>
              <h5 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{lang === 'vi' ? 'Phiên hoạt động' : 'Active Sessions'}</h5>
              <p className="text-outline dark:text-slate-400 text-body-sm">{lang === 'vi' ? 'Người dùng đồng thời' : 'Concurrent users connected'}</p>
            </div>
            <span className="text-headline-md font-bold text-tertiary">852</span>
          </div>
          <div className="h-[180px] mt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
              <polyline fill="none" points="0,140 40,130 80,120 120,90 160,110 200,60 240,70 280,40 320,50 360,30 400,35" stroke="#9f4300" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
              <rect fill="#ffdbcb" height="8" width="8" x="396" y="31"></rect>
            </svg>
          </div>
        </div>

        {/* Database instances table */}
        <div className="col-span-12 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xs transition-shadow">
          <div className="p-lg border-b border-outline-variant dark:border-slate-700 flex flex-col sm:flex-row justify-between sm:items-center gap-md bg-surface-container-lowest dark:bg-slate-900/60">
            <h5 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{lang === 'vi' ? 'Cơ sở dữ liệu & Service Clusters' : 'Databases & Service Clusters'}</h5>
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-secondary dark:bg-teal-500 rounded-full"></span>
                <span className="font-label-md text-label-md text-outline dark:text-slate-400 font-bold">Normal</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-tertiary rounded-full"></span>
                <span className="font-label-md text-label-md text-outline dark:text-slate-400 font-bold">Maintenance</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-error rounded-full animate-pulse"></span>
                <span className="font-label-md text-label-md text-outline dark:text-slate-400 font-bold">Critical</span>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low dark:bg-slate-900/30 border-b border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-300">
                  <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Tên Instance' : 'Instance Host'}</th>
                  <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Vùng (Zone)' : 'Zone Location'}</th>
                  <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Phản hồi (ms)' : 'Latency (ms)'}</th>
                  <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Tải trọng' : 'Current Load'}</th>
                  <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Tình trạng' : 'Health Status'}</th>
                  <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold text-right">{t.action}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 dark:divide-slate-700 text-body-md text-on-surface dark:text-slate-200">
                {dbInstances.map(db => (
                  <tr key={db.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-lg py-md font-bold text-on-surface dark:text-white text-left">{db.name}</td>
                    <td className="px-lg py-md font-semibold text-on-surface-variant dark:text-slate-400">{db.zone}</td>
                    <td className="px-lg py-md font-data-mono font-bold text-secondary dark:text-teal-400">{db.ping}</td>
                    <td className="px-lg py-md text-left">
                      <div className="w-32 bg-slate-100 dark:bg-slate-705 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${db.isOverload ? 'bg-error' : 'bg-secondary dark:bg-teal-500'}`} style={{ width: `${db.load}%` }}></div>
                      </div>
                    </td>
                    <td className="px-lg py-md text-left">
                      <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${db.statusColor}`}>
                        {db.status}
                      </span>
                    </td>
                    <td className="px-lg py-md text-right">
                      {db.isOverload ? (
                        <button 
                          onClick={() => {
                            alert(lang === 'vi' ? 'Đang thực hiện phân cấp tải (Scale Up) cho cụm HAN-1...' : 'Triggering horizontal auto-scaling on HAN-1 node cluster...');
                            setDbInstances(prev => prev.map(d => d.id === db.id ? { ...d, load: 32, status: 'ONLINE', isOverload: false, statusColor: 'bg-secondary-container text-on-secondary-container' } : d));
                          }}
                          className="text-primary dark:text-primary-fixed-dim font-bold hover:underline active:scale-95 transition-transform"
                        >
                          Scale Up
                        </button>
                      ) : (
                        <button 
                          onClick={() => alert(`Thông số kỹ thuật của ${db.name}: Uptime: 99.99%, RAM allocation: 4GB/8GB, Core count: 8 vCPU.`)}
                          className="text-primary dark:text-primary-fixed-dim hover:underline"
                        >
                          {lang === 'vi' ? 'Chi tiết' : 'Details'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Technical Docs Footer */}
      <footer className="mt-xl pt-lg border-t border-outline-variant dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center text-outline dark:text-slate-500 font-body-sm text-[11px] font-bold uppercase tracking-wider gap-md">
        <p>© 2026 MediLink Health Systems. {lang === 'vi' ? 'Tất cả quyền được bảo lưu.' : 'All rights reserved.'}</p>
        <div className="flex space-x-lg">
          <a className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" href="#feedback">{lang === 'vi' ? 'Phản hồi hệ thống' : 'Diagnostics Feedback'}</a>
          <a className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" href="#docs">{lang === 'vi' ? 'Tài liệu kỹ thuật' : 'Technical Manual'}</a>
          <a className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" href="#support">{lang === 'vi' ? 'Liên hệ IT Support' : 'Contact Support'}</a>
        </div>
      </footer>
    </div>
  );
}
