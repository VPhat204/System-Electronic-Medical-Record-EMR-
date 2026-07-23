import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../../../shared/context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';
import AdminDashboardTab from '../pages/Dashboard/AdminDashboardTab';
import AdminUserManagementTab from '../pages/Users/AdminUserManagementTab';
import AdminSystemLogsTab from '../pages/SystemLogs/AdminSystemLogsTab';
import AdminPerformanceTab from '../pages/Performance/AdminPerformanceTab';
import AdminSecurityTab from '../pages/Security/AdminSecurityTab';
import AdminBackupTab from '../pages/Backup/AdminBackupTab';
import AdminMaintenanceTab from '../pages/Maintenance/AdminMaintenanceTab';
import AdminSettingsTab from '../pages/Settings/AdminSettingsTab';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminChatWidget from './AdminChatWidget';


export default function AdminDashboard({ onNavigate, theme: propTheme, setTheme: propSetTheme, lang: propLang, setLang: propSetLang }) {
  const { t: globalT } = useContext(LanguageContext);
  const [localLang, setLocalLang] = useState('vi');
  const lang = propLang !== undefined ? propLang : localLang;
  const setLang = propSetLang !== undefined ? propSetLang : setLocalLang;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [localTheme, setLocalTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const currentTheme = propTheme !== undefined ? propTheme : localTheme;
  const isDark = currentTheme === 'dark';

  const t = {
    clinicalPortal: globalT('admin.clinicalPortal'),
    adminDashboard: globalT('admin.adminDashboard'),
    overview: globalT('admin.overview'),
    adminSub: globalT('admin.adminSub'),
    exportReport: globalT('admin.exportReport'),
    newConsult: globalT('admin.newConsult'),
    bedOccupancy: globalT('admin.bedOccupancy'),
    avgWaitTime: globalT('admin.avgWaitTime'),
    dailyRevenue: globalT('admin.dailyRevenue'),
    activeStaff: globalT('admin.activeStaff'),
    deptWorkload: globalT('admin.deptWorkload'),
    admissions: globalT('admin.admissions'),
    discharges: globalT('admin.discharges'),
    icuAlert: globalT('admin.icuAlert'),
    systemHealth: globalT('admin.systemHealth'),
    onDutyStaff: globalT('admin.onDutyStaff'),
    searchStaff: globalT('admin.searchStaff'),
    allDepts: globalT('admin.allDepts'),
    practitioner: globalT('admin.practitioner'),
    roleDept: globalT('admin.roleDept'),
    status: globalT('admin.status'),
    currentLoad: globalT('admin.currentLoad'),
    shiftEnd: globalT('admin.shiftEnd'),
    action: globalT('admin.action'),
    userManagement: globalT('admin.userManagement'),
    systemLogs: globalT('admin.systemLogs'),
    performance: globalT('admin.performance'),
    security: globalT('admin.security'),
    backup: globalT('admin.backup'),
    maintenance: globalT('admin.maintenance'),
    settings: globalT('admin.settings'),
    helpCenter: globalT('admin.helpCenter'),
    signOut: globalT('admin.signOut'),
    addUser: globalT('admin.addUser'),
    name: globalT('admin.name'),
    email: globalT('admin.email'),
    role: globalT('admin.role'),
    department: globalT('admin.department'),
    cancel: globalT('admin.cancel'),
    save: globalT('admin.save'),
    searchUsers: globalT('admin.searchUsers'),
    allRoles: globalT('admin.allRoles'),
    logTime: globalT('admin.logTime'),
    logEvent: globalT('admin.logEvent'),
    logLevel: globalT('admin.logLevel'),
    logIP: globalT('admin.logIP'),
    clearLogs: globalT('admin.clearLogs'),
    serverLoad: globalT('admin.serverLoad'),
    dbResponse: globalT('admin.dbResponse'),
    kioskStatus: globalT('admin.kioskStatus'),
    activeSessions: globalT('admin.activeSessions'),
    revoke: globalT('admin.revoke'),
    backupNow: globalT('admin.backupNow'),
    backupSize: globalT('admin.backupSize'),
    backupStatus: globalT('admin.backupStatus'),
    maintenanceMode: globalT('admin.maintenanceMode'),
    maintenanceWarning: globalT('admin.maintenanceWarning'),
    hospitalName: globalT('admin.hospitalName'),
    hospitalAddress: globalT('admin.hospitalAddress'),
    hospitalEmail: globalT('admin.hospitalEmail')
  };

  // Sync state with document dark class on mount and change
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

  const handleToggleDark = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    if (propSetTheme) {
      propSetTheme(nextTheme);
    } else {
      setLocalTheme(nextTheme);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="bg-background dark:bg-slate-900 text-on-surface dark:text-slate-100 min-h-screen transition-colors duration-200 flex w-full relative">
      {/* Mobile Sidebar overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* SideNavBar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onNavigate={onNavigate}
        onLogout={handleLogout}
        lang={lang}
        t={t}
      />

      {/* Main Content Area */}
      <main className="flex-grow md:ml-[260px] flex flex-col h-screen overflow-hidden">
        {/* TopNavBar */}
        <AdminHeader
          setIsSidebarOpen={setIsSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDark={isDark}
          handleToggleDark={handleToggleDark}
          lang={lang}
          setLang={setLang}
          t={t}
          onNavigate={onNavigate}
        />

        {/* Scrollable Canvas Container */}
        <div className="flex-1 overflow-y-auto p-lg bg-surface-container-lowest dark:bg-slate-900 custom-scrollbar text-left">
          {activeTab === 'Dashboard' && (
            <AdminDashboardTab
              lang={lang}
              t={t}
              onNavigate={onNavigate}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'User Management' && (
            <AdminUserManagementTab
              lang={lang}
              t={t}
            />
          )}

          {activeTab === 'System Logs' && (
            <AdminSystemLogsTab
              lang={lang}
              t={t}
            />
          )}

          {activeTab === 'Performance' && (
            <AdminPerformanceTab
              lang={lang}
              t={t}
              isDark={isDark}
            />
          )}

          {activeTab === 'Security' && (
            <AdminSecurityTab
              lang={lang}
              t={t}
            />
          )}

          {activeTab === 'Backup' && (
            <AdminBackupTab
              lang={lang}
              t={t}
            />
          )}

          {activeTab === 'Maintenance' && (
            <AdminMaintenanceTab
              lang={lang}
              t={t}
            />
          )}

          {activeTab === 'Settings' && (
            <AdminSettingsTab
              lang={lang}
              setLang={setLang}
              t={t}
            />
          )}
        </div>
      </main>

      {/* Floating Chat Widget - hidden on Security tab */}
      <AdminChatWidget lang={lang} />
    </div>
  );
}
