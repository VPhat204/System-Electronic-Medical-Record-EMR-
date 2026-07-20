import React from 'react';

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
  onNavigate,
  lang,
  t
}) {
  const menuItems = [
    { key: 'Dashboard', icon: 'dashboard' },
    { key: 'User Management', icon: 'group' },
    { key: 'System Logs', icon: 'receipt_long' },
    { key: 'Performance', icon: 'monitoring' },
    { key: 'Security', icon: 'security' },
    { key: 'Backup', icon: 'backup' },
    { key: 'Maintenance', icon: 'build' },
    { key: 'Settings', icon: 'settings' }
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full w-[260px] bg-white dark:bg-slate-950 border-r border-outline-variant dark:border-slate-800 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="px-6 py-6 flex items-center justify-between border-b border-outline-variant dark:border-slate-800 md:border-none">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
              medical_services
            </span>
          </div>
          <div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed-dim">MedCore</h1>
            <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{t.clinicalPortal}</p>
          </div>
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="p-1 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-grow space-y-1 py-4 text-left px-3 overflow-y-auto custom-scrollbar">
        {menuItems.map(item => {
          const isActive = activeTab === item.key;
          const getLocalizedLabel = (k) => {
            switch (k) {
              case 'Dashboard': return t.adminDashboard || k;
              case 'User Management': return t.userManagement || k;
              case 'System Logs': return t.systemLogs || k;
              case 'Performance': return t.performance || k;
              case 'Security': return t.security || k;
              case 'Backup': return t.backup || k;
              case 'Maintenance': return t.maintenance || k;
              case 'Settings': return t.settings || k;
              default: return k;
            }
          };
          const localizedLabel = getLocalizedLabel(item.key);
          return (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-md px-md py-sm rounded transition-colors duration-150 active:scale-95 ${isActive
                ? 'text-primary dark:text-primary-fixed-dim font-bold border-l-4 border-primary dark:border-primary-fixed-dim bg-surface-container dark:bg-slate-800'
                : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-low dark:hover:bg-slate-900/60'
                }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              <span className="font-label-md text-label-md">{localizedLabel}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="mt-auto p-4 border-t border-outline-variant dark:border-slate-800">
        <nav className="space-y-1">
          <a
            href="#help"
            className="w-full flex items-center gap-3 px-2 py-2 text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors text-left"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span className="font-label-md text-label-md">{t.helpCenter}</span>
          </a>
          <button
            onClick={() => onNavigate('home')}
            className="w-full flex items-center gap-3 px-2 py-2 text-error hover:bg-error-container/20 rounded-md transition-colors text-left"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="font-label-md text-label-md">{t.signOut}</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
