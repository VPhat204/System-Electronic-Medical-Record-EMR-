import React, { useState, useEffect } from 'react';
import {
  translations,
  initialStaffList,
  initialLogs,
  initialBackups,
  initialDbInstances,
  loginTrendData,
  maintLogs
} from './mockData';
import AdminDashboardTab from '../pages/Dashboard/AdminDashboardTab';
import AdminUserManagementTab from '../pages/Users/AdminUserManagementTab';
import AdminSystemLogsTab from '../pages/SystemLogs/AdminSystemLogsTab';
import AdminPerformanceTab from '../pages/Performance/AdminPerformanceTab';
import AdminSecurityTab from '../pages/Security/AdminSecurityTab';
import AdminBackupTab from '../pages/Backup/AdminBackupTab';
import AdminMaintenanceTab from '../pages/Maintenance/AdminMaintenanceTab';
import AdminSettingsTab from '../pages/Settings/AdminSettingsTab';

export default function AdminDashboard({ onNavigate, theme: propTheme, setTheme: propSetTheme, lang: propLang, setLang: propSetLang }) {
  const [localLang, setLocalLang] = useState('vi');
  const lang = propLang !== undefined ? propLang : localLang;
  const setLang = propSetLang !== undefined ? propSetLang : setLocalLang;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Performance'); // Default to Performance tab as requested!
  const [searchQuery, setSearchQuery] = useState('');

  const [localTheme, setLocalTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const currentTheme = propTheme !== undefined ? propTheme : localTheme;
  const isDark = currentTheme === 'dark';

  const t = translations[lang];

  // Admin and users database states
  const [usersList, setUsersList] = useState(initialStaffList);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [userDeptFilter, setUserDeptFilter] = useState('All');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Doctor');
  const [newUserDept, setNewUserDept] = useState('Nội khoa');

  // Popup Action Menu State
  const [openMenuUserId, setOpenMenuUserId] = useState(null);

  // System Logs interactive filters
  const [logsList, setLogsList] = useState(initialLogs);
  const [logDateFilter, setLogDateFilter] = useState('Today'); // 'Today', 'Week', 'Month'
  const [logTypeFilter, setLogTypeFilter] = useState('All'); // 'All', 'Login', 'Update', 'Export', 'Error'

  // Performance Tab state
  const [dbInstances, setDbInstances] = useState(initialDbInstances);
  const [isRefreshingPerf, setIsRefreshingPerf] = useState(false);
  const [globalUptime, setGlobalUptime] = useState(99.98);

  // Backup states
  const [backupHistory, setBackupHistory] = useState(initialBackups);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  // Maintenance state
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Settings tab states
  const [hospitalSettings, setHospitalSettings] = useState({
    name: 'Bệnh viện Đa khoa Quốc tế Central',
    address: 'Số 15, Đường Duy Tân, Quận Cầu Giấy, TP. Hà Nội',
    email: 'contact@centralhospital.vn',
    phone: '+84 24 3456 7890',
    code: 'HOSP-VN-88210-9'
  });
  const [smtpEnabled, setSmtpEnabled] = useState(true);
  const [smtpHost, setSmtpHost] = useState('smtp.office365.com');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('system@centralhospital.vn');
  const [pushPatient, setPushPatient] = useState(true);
  const [pushDoctor, setPushDoctor] = useState(false);
  const [systemLang, setSystemLang] = useState('vi');
  const [systemTimezone, setSystemTimezone] = useState('GMT+07:00');
  const [systemDateFormat, setSystemDateFormat] = useState('DD/MM/YYYY');
  const [modulesState, setModulesState] = useState([
    { id: 1, nameVi: 'Hồ sơ Bệnh án Điện tử (EMR)', nameEn: 'Electronic Medical Record (EMR)', version: 'v4.2.1-stable', descVi: 'Quản lý lịch sử khám chữa bệnh', descEn: 'Manage medical history and visits', active: true, icon: 'clinical_notes', updateDate: '12/05/2024' },
    { id: 2, nameVi: 'Quản lý Kho Dược (LIS/PIS)', nameEn: 'Pharmacy & Lab (LIS/PIS)', version: 'v3.9.0-hotfix', descVi: 'Kiểm soát thuốc và vật tư y tế', descEn: 'Control drugs and medical supplies', active: true, icon: 'inventory_2', updateDate: '08/05/2024' },
    { id: 3, nameVi: 'Thanh toán & Bảo hiểm', nameEn: 'Billing & Insurance', version: 'v1.12.0', descVi: 'Kết nối BHXH và cổng thanh toán', descEn: 'Connect social insurance and payment gateways', active: false, icon: 'finance', updateDate: '25/04/2024' },
  ]);


  // Security tab states (must be at top-level, not inside conditional IIFE)
  const [pwMinLen, setPwMinLen] = useState(12);
  const [pwCaps, setPwCaps] = useState(true);
  const [pwSpecial, setPwSpecial] = useState(true);
  const [pwNum, setPwNum] = useState(true);
  const [pwNoUser, setPwNoUser] = useState(false);
  const [pwExpiry, setPwExpiry] = useState('90');
  const [ipList, setIpList] = useState([
    { id: 1, ip: '192.168.1.*', label: 'MẠNG NỘI BỘ' },
    { id: 2, ip: '10.0.4.22', label: 'SERVER TRUNG TÂM' },
    { id: 3, ip: '203.113.10.5', label: 'VPN BÁC SĨ' }
  ]);
  const [showAddIp, setShowAddIp] = useState(false);
  const [newIpVal, setNewIpVal] = useState('');
  const [newIpLabel, setNewIpLabel] = useState('');
  const [threatPulse, setThreatPulse] = useState(false);

  // Maintenance tab states
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [healthScanDone, setHealthScanDone] = useState(false);

  const runHealthCheck = () => {
    setShowHealthModal(true);
    setHealthScanDone(false);
    setTimeout(() => setHealthScanDone(true), 2500);
  };

  // Navigation items definition
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

  // Sync state with document dark class on mount and change (only if propTheme is not provided)
  useEffect(() => {
    if (propTheme === undefined) {
      if (localTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', localTheme);
    }
  }, [localTheme, propTheme]);

  // Click outside listener to close dropdown action menu
  useEffect(() => {
    const handleCloseMenu = () => setOpenMenuUserId(null);
    document.addEventListener('click', handleCloseMenu);
    return () => document.removeEventListener('click', handleCloseMenu);
  }, []);

  // Threat badge pulse for Security tab
  useEffect(() => {
    const interval = setInterval(() => setThreatPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleDark = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    if (propSetTheme) {
      propSetTheme(nextTheme);
    } else {
      setLocalTheme(nextTheme);
    }
  };

  // Add new user submission
  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert(lang === 'vi' ? 'Vui lòng điền đầy đủ thông tin!' : 'Please enter all information!');
      return;
    }
    const initials = newUserName.split(' ').pop().slice(0, 2).toUpperCase();
    const newUser = {
      id: Date.now(),
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      dept: newUserDept,
      status: 'Sẵn sàng',
      statusEn: 'Ready',
      load: 'Hôm nay, vừa xong',
      avatar: null
    };
    setUsersList(prev => [newUser, ...prev]);
    setNewUserName('');
    setNewUserEmail('');
    setShowAddUserModal(false);
  };

  // Refresh performance data simulation
  const handleRefreshPerformance = () => {
    if (isRefreshingPerf) return;
    setIsRefreshingPerf(true);
    setTimeout(() => {
      setIsRefreshingPerf(false);
      setGlobalUptime(99.98 + (Math.random() * 0.01 - 0.005));
      setDbInstances(prev => prev.map(db => ({
        ...db,
        ping: `${Math.floor(Math.random() * 10 + 5)}ms`,
        load: Math.floor(Math.random() * 30 + (db.isOverload ? 65 : 10))
      })));
    }, 1200);
  };

  // Trigger manual backup
  const handleStartBackup = () => {
    if (isBackingUp) return;
    setIsBackingUp(true);
    setBackupProgress(0);
  };

  // Backup simulation effect
  useEffect(() => {
    let interval = null;
    if (isBackingUp) {
      interval = setInterval(() => {
        setBackupProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsBackingUp(false);
            const now = new Date();
            const timeString = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 8);
            const newBackup = {
              id: Date.now(),
              name: `medcore_prod_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}.tar.gz`,
              time: timeString,
              size: '1.21 TB',
              status: 'Success'
            };
            setBackupHistory(prevHistory => [newBackup, ...prevHistory]);

            const newLog = {
              id: Date.now(),
              time: timeString,
              event: 'Manual database backup completed successfully by Admin.',
              level: 'Info',
              ip: '192.168.1.5'
            };
            setLogsList(prevLogs => [newLog, ...prevLogs]);
            return 100;
          }
          return prev + 20;
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBackingUp]);

  // Filtered users for User Management Tab
  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'All' || u.role.toLowerCase() === userRoleFilter.toLowerCase();
    const matchesDept = userDeptFilter === 'All' || u.dept.toLowerCase() === userDeptFilter.toLowerCase();
    return matchesSearch && matchesRole && matchesDept;
  });

  // Filtered logs for System Logs Tab
  const filteredLogs = logsList.filter(l => {
    const matchesSearch = l.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.actionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.ip.includes(searchQuery);

    // Type Filter Matcher
    let matchesType = true;
    if (logTypeFilter === 'Login') {
      matchesType = l.actionText.includes('Đăng nhập') || l.actionText.includes('Đăng xuất');
    } else if (logTypeFilter === 'Update') {
      matchesType = l.actionText.includes('Cập nhật');
    } else if (logTypeFilter === 'Export') {
      matchesType = l.actionText.includes('Xuất');
    } else if (logTypeFilter === 'Error') {
      matchesType = l.level === 'ERROR';
    }

    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-background dark:bg-slate-900 text-on-surface dark:text-slate-100 min-h-screen transition-colors duration-200 flex w-full relative">

      {/* Mobile Sidebar overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* SideNavBar - Preserved MedCore Logo layout */}
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
                <span className="font-label-md text-label-md">{lang === 'vi' ? t[item.key.toLowerCase().replace(' ', '')] || item.key : item.key}</span>
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

      {/* Main Content Area */}
      <main className="flex-grow md:ml-[260px] flex flex-col h-screen overflow-hidden">

        {/* TopNavBar - Preserved Doctor Header style */}
        <header className="flex justify-between items-center h-16 px-6 bg-white dark:bg-slate-950 sticky top-0 z-40 border-b border-outline-variant dark:border-slate-800 transition-colors">
          <div className="flex items-center gap-md w-full max-w-md">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 md:hidden text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400">
                search
              </span>
              <input
                type="text"
                placeholder={lang === 'vi' ? 'Tìm kiếm nhanh...' : 'Search clinical...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-sm text-body-sm text-on-surface dark:text-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-md">
            {/* Dark Mode Switcher */}
            <button
              onClick={handleToggleDark}
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors"
              title={isDark ? 'Giao diện sáng (Light Mode)' : 'Giao diện tối (Dark Mode)'}
            >
              <span className="material-symbols-outlined">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high dark:hover:bg-slate-800 text-label-md font-bold text-primary dark:text-primary-fixed-dim transition-colors"
              title="Chuyển đổi ngôn ngữ / Switch Language"
            >
              {lang.toUpperCase()}
            </button>

            {/* Notifications */}
            <button
              onClick={() => alert('Thông báo hành chính mới')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 relative transition-colors"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>

            {/* Emergency */}
            <button
              onClick={() => alert(lang === 'vi' ? 'Kích hoạt báo động khẩn cấp cấp viện!' : 'Emergency Code Blue Broadcast Triggered!')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-error hover:bg-error-container/20 transition-colors"
              title="Khẩn cấp / Emergency"
            >
              <span className="material-symbols-outlined text-red-500">emergency</span>
            </button>

            {/* User profile layout */}
            <div className="flex items-center gap-3 pl-3 border-l border-outline-variant dark:border-slate-800">
              <img
                className="w-10 h-10 rounded-full object-cover border border-primary-fixed dark:border-slate-700"
                alt="Admin Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTChBNSB76Y9cX0wvEyxGDIdHtW21ddsE8fR7oQuHLlKQmFjYoYY4iTy5I-QyJDPl0tu1yqXFGQEAyebEBeBNOAG5PZJdiYLOnufWUZkYnPZFzRDBcccTvqVxMytF377IrgOQWyBuCfqUnfQ7rHrkzbPz7PU_BZikMsNs7qzi0BE9wgOEP-b-Z7WqC4bXrYk0YQLGVwmuoMLRlT41XMWKQDklDS02nsh0XNe_3tx9WEDILmG1VW2T2"
              />
              <div className="hidden sm:block text-left w-44">
                <p className="font-label-md text-label-md text-on-surface dark:text-white truncate" title="Dr. Julian Reed">Dr. Julian Reed</p>
                <p className="text-[10px] text-on-surface-variant dark:text-slate-400 uppercase tracking-widest font-semibold truncate" title="Chief Admin">Chief Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Canvas Container */}
        <div className="flex-1 overflow-y-auto p-lg bg-surface-container-lowest dark:bg-slate-900 custom-scrollbar text-left">

          {/* TAB 1: DASHBOARD VIEW */}
          {activeTab === 'Dashboard' && (
            <AdminDashboardTab
              lang={lang}
              t={t}
              onNavigate={onNavigate}
              usersList={usersList}
              logsList={logsList}
              setActiveTab={setActiveTab}
            />
          )}

          {/* TAB 2: USER MANAGEMENT VIEW */}
          {activeTab === 'User Management' && (
            <AdminUserManagementTab
              lang={lang}
              t={t}
              userSearch={userSearch}
              setUserSearch={setUserSearch}
              userRoleFilter={userRoleFilter}
              setUserRoleFilter={setUserRoleFilter}
              userDeptFilter={userDeptFilter}
              setUserDeptFilter={setUserDeptFilter}
              filteredUsers={filteredUsers}
              usersList={usersList}
              setUsersList={setUsersList}
              openMenuUserId={openMenuUserId}
              setOpenMenuUserId={setOpenMenuUserId}
              setShowAddUserModal={setShowAddUserModal}
            />
          )}

          {/* TAB 3: SYSTEM LOGS VIEW */}
          {activeTab === 'System Logs' && (
            <AdminSystemLogsTab
              lang={lang}
              t={t}
              logDateFilter={logDateFilter}
              setLogDateFilter={setLogDateFilter}
              logTypeFilter={logTypeFilter}
              setLogTypeFilter={setLogTypeFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredLogs={filteredLogs}
              logsList={logsList}
              setLogsList={setLogsList}
              setActiveTab={setActiveTab}
            />
          )}

          {/* TAB 4: PERFORMANCE VIEW */}
          {activeTab === 'Performance' && (
            <AdminPerformanceTab
              lang={lang}
              t={t}
              isDark={isDark}
              isRefreshingPerf={isRefreshingPerf}
              globalUptime={globalUptime}
              dbInstances={dbInstances}
              setDbInstances={setDbInstances}
              handleRefreshPerformance={handleRefreshPerformance}
            />
          )}

          {/* TAB 5: SECURITY AUDIT */}
          {activeTab === 'Security' && (
            <AdminSecurityTab
              lang={lang}
              t={t}
              threatPulse={threatPulse}
              pwMinLen={pwMinLen}
              setPwMinLen={setPwMinLen}
              pwCaps={pwCaps}
              setPwCaps={setPwCaps}
              pwSpecial={pwSpecial}
              setPwSpecial={setPwSpecial}
              pwNum={pwNum}
              setPwNum={setPwNum}
              pwNoUser={pwNoUser}
              setPwNoUser={setPwNoUser}
              pwExpiry={pwExpiry}
              setPwExpiry={setPwExpiry}
              showAddIp={showAddIp}
              setShowAddIp={setShowAddIp}
              newIpVal={newIpVal}
              setNewIpVal={setNewIpVal}
              newIpLabel={newIpLabel}
              setNewIpLabel={setNewIpLabel}
              ipList={ipList}
              setIpList={setIpList}
              loginTrendData={loginTrendData}
            />
          )}

          {/* TAB 6: BACKUP VIEW */}
          {activeTab === 'Backup' && (
            <AdminBackupTab
              lang={lang}
              t={t}
              isBackingUp={isBackingUp}
              backupProgress={backupProgress}
              backupHistory={backupHistory}
              handleStartBackup={handleStartBackup}
            />
          )}

          {/* TAB 7: MAINTENANCE VIEW */}
          {activeTab === 'Maintenance' && (
            <AdminMaintenanceTab
              lang={lang}
              t={t}
              maintenanceMode={maintenanceMode}
              setMaintenanceMode={setMaintenanceMode}
              showHealthModal={showHealthModal}
              setShowHealthModal={setShowHealthModal}
              healthScanDone={healthScanDone}
              runHealthCheck={runHealthCheck}
              maintLogs={maintLogs}
            />
          )}

          {/* TAB 8: SETTINGS VIEW */}
          {activeTab === 'Settings' && (
            <AdminSettingsTab
              lang={lang}
              setLang={setLang}
              t={t}
              maintenanceMode={maintenanceMode}
              setMaintenanceMode={setMaintenanceMode}
              modulesState={modulesState}
              setModulesState={setModulesState}
              hospitalSettings={hospitalSettings}
              setHospitalSettings={setHospitalSettings}
              systemLang={systemLang}
              setSystemLang={setSystemLang}
              systemTimezone={systemTimezone}
              setSystemTimezone={setSystemTimezone}
              systemDateFormat={systemDateFormat}
              setSystemDateFormat={setSystemDateFormat}
              smtpEnabled={smtpEnabled}
              setSmtpEnabled={setSmtpEnabled}
              smtpHost={smtpHost}
              setSmtpHost={setSmtpHost}
              smtpPort={smtpPort}
              setSmtpPort={setSmtpPort}
              smtpUser={smtpUser}
              setSmtpUser={setSmtpUser}
              pushPatient={pushPatient}
              setPushPatient={setPushPatient}
              pushDoctor={pushDoctor}
              setPushDoctor={setPushDoctor}
              setActiveTab={setActiveTab}
            />
          )}


        </div>
      </main>

      {/* ADD USER MODAL */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 w-full max-w-md p-6 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.addUser}</h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 p-1.5 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">{t.name} *</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Dr. Arthur Conan"
                  className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">{t.email} *</label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. a.conan@medcore.com"
                  className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">{t.role}</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Admin">Admin</option>
                    <option value="Technician">Technician</option>
                  </select>
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">{t.department}</label>
                  <select
                    value={newUserDept}
                    onChange={(e) => setNewUserDept(e.target.value)}
                    className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md"
                  >
                    <option value="Nội khoa">Nội khoa</option>
                    <option value="Ngoại khoa">Ngoại khoa</option>
                    <option value="Nhi khoa">Nhi khoa</option>
                    <option value="Xét nghiệm">Xét nghiệm</option>
                    <option value="Cấp cứu">Cấp cứu</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant dark:border-slate-700 flex justify-end gap-md">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 border border-outline dark:border-slate-700 text-on-surface dark:text-slate-200 font-label-md rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white font-label-md rounded-lg hover:bg-surface-tint transition-colors active:scale-95"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
