import React, { useState, useEffect } from 'react';

const translations = {
  vi: {
    clinicalPortal: 'Clinical Portal',
    adminDashboard: 'Quản trị hệ thống',
    overview: 'Quản lý người dùng',
    adminSub: 'Quản lý tài khoản nhân viên, phân quyền và trạng thái hoạt động của hệ thống.',
    exportReport: 'Xuất báo cáo',
    newConsult: 'Thêm người dùng mới',
    bedOccupancy: 'Tỷ lệ giường bệnh',
    avgWaitTime: 'Thời gian chờ TB',
    dailyRevenue: 'Doanh thu trong ngày',
    activeStaff: 'Nhân sự hoạt động',
    deptWorkload: 'Khối lượng công việc theo Khoa',
    admissions: 'Nhập viện',
    discharges: 'Xuất viện',
    icuAlert: 'Cảnh báo Công suất ICU: Giao thức tăng cường cấp 1 đang hoạt động. Còn lại 2 giường trống. Cân nhắc hoãn lịch phẫu thuật tự chọn.',
    systemHealth: 'Sức khỏe hệ thống',
    onDutyStaff: 'Nhân sự đang trực',
    searchStaff: 'Tìm kiếm nhân viên...',
    allDepts: 'Tất cả khoa',
    practitioner: 'Thành viên',
    roleDept: 'Vai trò',
    status: 'Trạng thái',
    currentLoad: 'Khoa / Phòng',
    shiftEnd: 'Hoạt động cuối',
    action: 'Thao tác',
    userManagement: 'Quản lý người dùng',
    systemLogs: 'Nhật ký hệ thống',
    performance: 'Hiệu năng',
    security: 'Bảo mật',
    backup: 'Sao lưu',
    maintenance: 'Bảo trì',
    settings: 'Cài đặt',
    helpCenter: 'Trung tâm trợ giúp',
    signOut: 'Đăng xuất',
    addUser: 'Thêm người dùng mới',
    name: 'Họ và tên',
    email: 'Địa chỉ email',
    role: 'Vai trò',
    department: 'Khoa phòng',
    cancel: 'Hủy bỏ',
    save: 'Lưu lại',
    searchUsers: 'Tìm kiếm nhân viên...',
    allRoles: 'Tất cả vai trò',
    logTime: 'Thời gian',
    logEvent: 'Sự kiện',
    logLevel: 'Mức độ',
    logIP: 'Địa chỉ IP',
    clearLogs: 'Xóa nhật ký',
    serverLoad: 'Tải lượng máy chủ',
    dbResponse: 'Phản hồi Database',
    kioskStatus: 'Trạng thái Kiosk',
    activeSessions: 'Phiên hoạt động',
    revoke: 'Thu hồi',
    backupNow: 'Sao lưu dữ liệu ngay',
    backupSize: 'Dung lượng',
    backupStatus: 'Trạng thái',
    maintenanceMode: 'Chế độ bảo trì hệ thống',
    maintenanceWarning: 'Cảnh báo: Bật chế độ bảo trì sẽ hiển thị thông báo bảo trì cho người dùng thông thường.',
    hospitalName: 'Tên bệnh viện',
    hospitalAddress: 'Địa chỉ bệnh viện',
    hospitalEmail: 'Email liên hệ',
  },
  en: {
    clinicalPortal: 'Clinical Portal',
    adminDashboard: 'System Admin',
    overview: 'User Management',
    adminSub: 'Manage practitioner registration, roles, and credential levels.',
    exportReport: 'Export Report',
    newConsult: 'Add New User',
    bedOccupancy: 'Bed Occupancy',
    avgWaitTime: 'Avg Wait Time',
    dailyRevenue: 'Daily Revenue',
    activeStaff: 'Active Staff',
    deptWorkload: 'Departmental Workload',
    admissions: 'Admissions',
    discharges: 'Discharges',
    icuAlert: 'ICU Capacity Alert: Level 1 surge protocol active. 2 beds remaining. Consider elective surgery rescheduling.',
    systemHealth: 'System Health',
    onDutyStaff: 'On-Duty Medical Staff',
    searchStaff: 'Search employees...',
    allDepts: 'All Departments',
    practitioner: 'Member',
    roleDept: 'Role',
    status: 'Status',
    currentLoad: 'Dept / Clinic',
    shiftEnd: 'Last Active',
    action: 'Action',
    userManagement: 'User Management',
    systemLogs: 'System Logs',
    performance: 'Performance',
    security: 'Security',
    backup: 'Backup',
    maintenance: 'Maintenance',
    settings: 'Settings',
    helpCenter: 'Help Center',
    signOut: 'Sign Out',
    addUser: 'Add New User',
    name: 'Full Name',
    email: 'Email Address',
    role: 'Role',
    department: 'Department',
    cancel: 'Cancel',
    save: 'Save',
    searchUsers: 'Search employees...',
    allRoles: 'All Roles',
    logTime: 'Timestamp',
    logEvent: 'Event Description',
    logLevel: 'Level',
    logIP: 'IP Address',
    clearLogs: 'Clear Logs',
    serverLoad: 'Server CPU Load',
    dbResponse: 'DB Response Time',
    kioskStatus: 'Kiosk Network',
    activeSessions: 'Active Sessions',
    revoke: 'Revoke',
    backupNow: 'Backup Now',
    backupSize: 'Size',
    backupStatus: 'Status',
    maintenanceMode: 'Maintenance Mode',
    maintenanceWarning: 'Warning: Activating maintenance mode will display a notice to normal users.',
    hospitalName: 'Hospital Name',
    hospitalAddress: 'Hospital Address',
    hospitalEmail: 'Hospital Email',
  }
};

const initialStaffList = [
  { id: 1, name: 'Dr. Trần Đức', email: 'tran.duc@medilink.vn', role: 'Doctor', dept: 'Ngoại Thần Kinh', status: 'Đang trực', statusEn: 'On-Duty', load: '10 phút trước', avatar: null },
  { id: 2, name: 'Lê Thị Mai', email: 'mai.le@medilink.vn', role: 'Nurse', dept: 'Cấp Cứu (ER)', status: 'Sẵn sàng', statusEn: 'Ready', load: 'Hôm nay, 08:32', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp8mjIUE4UtW8kLkPahytryPtzFMP3E1ckil_sPWAXfF4Z97FrephsKuQ_WmOr5fbtQgOAmfV9ByZsFy8vb1D5TDtgZ55hXm8D_N_hExKRDNpRLqMIjpmxe9a-82-ey9_TX0r-2w7QrmbY6Bi3ruy72Ca2lTxZHtB_3o6ErTlRa9cjXLc0w7gzVlFxUoe2FkTwCmXM3-74EOHjz-2sr8z0gP940tkskzZqgS6lDGxaLZ76sqHlzKzO' },
  { id: 3, name: 'Nguyễn Văn Bình', email: 'binh.nv@medilink.vn', role: 'Administrator', dept: 'Công Nghệ Thông Tin', status: 'Bận', statusEn: 'Busy', load: '2 giờ trước', avatar: null },
  { id: 4, name: 'Phạm Hoàng', email: 'hoang.p@medilink.vn', role: 'Doctor', dept: 'Nhi Khoa', status: 'Vắng mặt', statusEn: 'Absent', load: 'Hôm qua, 17:45', avatar: null },
  { id: 5, name: 'Trịnh Hồng', email: 'hong.t@medilink.vn', role: 'Technician', dept: 'Xét Nghiệm Máu', status: 'Sẵn sàng', statusEn: 'Ready', load: 'Hôm nay, 10:15', avatar: null }
];

const initialLogs = [
  { id: 1, time: '14:45:22', date: '24 Tháng 05, 2024', userInitials: 'NT', userName: 'Nguyễn Văn Thuận', userRole: 'Bác sĩ Trưởng', actionIcon: 'edit_document', actionText: 'Cập nhật Hồ sơ Bệnh án', ip: '192.168.1.104', level: 'INFO', detailsIcon: 'visibility' },
  { id: 2, time: '14:42:05', date: '24 Tháng 05, 2024', userInitials: 'LA', userName: 'Lê Thị Lan Anh', userRole: 'Y tá Điều dưỡng', actionIcon: 'logout', actionText: 'Đăng xuất hệ thống', ip: '172.16.254.1', level: 'INFO', detailsIcon: 'visibility' },
  { id: 3, time: '14:38:11', date: '24 Tháng 05, 2024', userInitials: '??', userName: 'Không xác định', userRole: 'Truy cập trái phép', actionIcon: 'lock_reset', actionText: 'Sai mật khẩu nhiều lần', ip: '103.45.122.9', level: 'ERROR', detailsIcon: 'report' },
  { id: 4, time: '14:30:55', date: '24 Tháng 05, 2024', userInitials: 'HM', userName: 'Hoàng Minh', userRole: 'Quản trị viên IT', actionIcon: 'cloud_download', actionText: 'Xuất dữ liệu hóa đơn', ip: '192.168.1.15', level: 'WARNING', detailsIcon: 'visibility' },
  { id: 5, time: '14:15:00', date: '24 Tháng 05, 2024', userInitials: 'PT', userName: 'Phạm Thanh', userRole: 'Kế toán trưởng', actionIcon: 'login', actionText: 'Đăng nhập hệ thống', ip: '192.168.1.55', level: 'INFO', detailsIcon: 'visibility' }
];

const initialBackups = [
  { id: 1, name: 'medcore_prod_20260714.tar.gz', time: '2026-07-14 12:00:04', size: '1.2 TB', status: 'Success' },
  { id: 2, name: 'medcore_prod_20260713.tar.gz', time: '2026-07-13 12:00:02', size: '1.18 TB', status: 'Success' },
  { id: 3, name: 'medcore_prod_20260712.tar.gz', time: '2026-07-12 12:00:05', size: '1.19 TB', status: 'Success' }
];

const initialDbInstances = [
  { id: 1, name: 'medilink-db-primary-sea-01', zone: 'SEA-1 (Singapore)', ping: '12ms', load: 45, status: 'ONLINE', statusColor: 'bg-secondary-container text-on-secondary-container' },
  { id: 2, name: 'medilink-db-replica-sea-02', zone: 'SEA-1 (Singapore)', ping: '15ms', load: 20, status: 'ONLINE', statusColor: 'bg-secondary-container text-on-secondary-container' },
  { id: 3, name: 'medilink-auth-cluster-01', zone: 'HAN-1 (Hanoi)', ping: '8ms', load: 88, status: 'OVERLOAD', statusColor: 'bg-tertiary-fixed text-on-tertiary-fixed', isOverload: true },
  { id: 4, name: 'medilink-storage-node-v3', zone: 'Global Edge', ping: '45ms', load: 12, status: 'ONLINE', statusColor: 'bg-secondary-container text-on-secondary-container' }
];

const loginTrendData = [
  { day: 'T2', success: 60, fail: 10 },
  { day: 'T3', success: 75, fail: 15 },
  { day: 'T4', success: 65, fail: 12 },
  { day: 'T5', success: 85, fail: 50 },
  { day: 'T6', success: 90, fail: 8 },
  { day: 'T7', success: 40, fail: 5 },
  { day: 'CN', success: 30, fail: 2 },
];

// Static maintenance log entries (lang-agnostic keys, rendered with lang in component)
const maintLogs = [
  { date: '15/10/2023 23:45', typeVi: 'Xóa bộ nhớ đệm', typeEn: 'Clear Cache', actor: 'Admin_Hoang', ok: true, noteVi: 'Giải phóng 4.2GB cache hệ thống', noteEn: 'Freed 4.2GB system cache' },
  { date: '10/10/2023 02:00', typeVi: 'Tối ưu hóa DB', typeEn: 'Optimize DB', actor: 'System_Cron', ok: true, noteVi: 'Re-index các bảng PatientRecord', noteEn: 'Re-indexed PatientRecord tables' },
  { date: '01/10/2023 01:15', typeVi: 'Bảo trì Định kỳ', typeEn: 'Routine Maintenance', actor: 'Admin_Nguyen', ok: false, noteVi: 'Lỗi kết nối Socket tạm thời', noteEn: 'Temporary socket connection error' },
  { date: '25/09/2023 04:00', typeVi: 'Cập nhật Patch', typeEn: 'Security Patch', actor: 'Admin_Hoang', ok: true, noteVi: 'Vá lỗ hổng bảo mật XSS', noteEn: 'Patched XSS vulnerability' },
];


export default function AdminDashboard({ onNavigate, theme: propTheme, setTheme: propSetTheme }) {
  const [lang, setLang] = useState('vi'); // 'vi' or 'en'
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

  // General settings
  const [hospitalSettings, setHospitalSettings] = useState({
    name: 'MedCore Clinic',
    address: '24 Medical Blvd, Sector 4',
    email: 'admin@medcore.vn'
  });

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
              name: `medcore_prod_${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}.tar.gz`,
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
      <aside className={`fixed left-0 top-0 h-full w-[260px] bg-white dark:bg-slate-955 border-r border-outline-variant dark:border-slate-800 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-6 py-6 flex items-center justify-between border-b border-outline-variant dark:border-slate-800 md:border-none">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_hospital
              </span>
            </div>
            <div>
              <h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed-dim">MedCore</h1>
              <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{t.clinicalPortal}</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1 md:hidden hover:bg-slate-100 dark:hover:bg-slate-850 rounded-full">
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
                  : 'text-on-surface-variant dark:text-slate-455 hover:bg-surface-container-low dark:hover:bg-slate-900/60'
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
        <header className="flex justify-between items-center h-16 px-6 bg-white dark:bg-slate-955 sticky top-0 z-40 border-b border-outline-variant dark:border-slate-800 transition-colors">
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
            <div className="space-y-6">
              {/* Header section */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md">
                <div>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight">{lang === 'vi' ? 'Tổng quan hành chính' : 'Administrative Overview'}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">{t.adminSub}</p>
                </div>
                <div className="flex gap-sm">
                  <button 
                    onClick={() => alert('Đang xuất báo cáo hành chính...')}
                    className="flex items-center gap-2 px-4 py-2 border border-outline dark:border-slate-700 text-on-surface dark:text-slate-200 font-label-md rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    {t.exportReport}
                  </button>
                  <button 
                    onClick={() => onNavigate('doctor-dashboard')}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-label-md rounded-lg hover:bg-surface-tint active:scale-[0.98] transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    {lang === 'vi' ? 'Khám lâm sàng mới' : 'New Consultation'}
                  </button>
                </div>
              </div>

              {/* KPI row: Bento Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                {/* KPI 1 */}
                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-primary-fixed-dim/20 rounded-lg">
                      <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>bed</span>
                    </div>
                    <span className="text-secondary dark:text-teal-400 font-label-md text-[11px] font-bold">+2.4% vs last week</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-on-surface-variant dark:text-slate-455 text-[11px] uppercase tracking-wider font-bold">{t.bedOccupancy}</p>
                    <h3 className="text-headline-lg font-bold text-on-surface dark:text-white mt-1">87.4%</h3>
                  </div>
                  <div className="w-full bg-surface-container-highest dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div className="bg-primary dark:bg-primary-fixed-dim h-full w-[87%]"></div>
                  </div>
                </div>

                {/* KPI 2 */}
                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-teal-500/10 rounded-lg">
                      <span className="material-symbols-outlined text-secondary dark:text-teal-400">timer</span>
                    </div>
                    <span className="text-error font-label-md text-[11px] font-bold">+12m surge</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-on-surface-variant dark:text-slate-455 text-[11px] uppercase tracking-wider font-bold">{t.avgWaitTime}</p>
                    <h3 className="text-headline-lg font-bold text-on-surface dark:text-white mt-1">24m</h3>
                  </div>
                  <div className="flex gap-1 items-end h-8 mt-2.5">
                    <div className="h-4 w-1.5 bg-secondary dark:bg-teal-500 rounded-full"></div>
                    <div className="h-6 w-1.5 bg-secondary dark:bg-teal-500 rounded-full"></div>
                    <div className="h-8 w-1.5 bg-secondary dark:bg-teal-500 rounded-full"></div>
                    <div className="h-5 w-1.5 bg-secondary dark:bg-teal-500 rounded-full"></div>
                    <div className="h-7 w-1.5 bg-error rounded-full"></div>
                  </div>
                </div>

                {/* KPI 3 */}
                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <span className="material-symbols-outlined text-amber-600 dark:text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                    </div>
                    <span className="text-secondary dark:text-teal-400 font-label-md text-[11px] font-bold">On target</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-on-surface-variant dark:text-slate-455 text-[11px] uppercase tracking-wider font-bold">{t.dailyRevenue}</p>
                    <h3 className="text-headline-lg font-bold text-on-surface dark:text-white mt-1">$142.8k</h3>
                  </div>
                  <p className="text-body-sm text-on-surface-variant dark:text-slate-400 mt-4 border-t border-slate-100 dark:border-slate-700 pt-1">
                    Forecast: $155k by EOD
                  </p>
                </div>

                {/* KPI 4 */}
                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-slate-500/10 rounded-lg">
                      <span className="material-symbols-outlined text-on-surface dark:text-slate-200" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
                    </div>
                    <span className="text-on-surface-variant dark:text-slate-400 font-label-md text-[11px] font-bold">92% active</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-on-surface-variant dark:text-slate-455 text-[11px] uppercase tracking-wider font-bold">{t.activeStaff}</p>
                    <h3 className="text-headline-lg font-bold text-on-surface dark:text-white mt-1">{usersList.length} / 450</h3>
                  </div>
                  <div className="flex -space-x-2 mt-4 overflow-hidden">
                    {usersList.slice(0, 3).map(user => (
                      <img 
                        key={user.id}
                        className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 object-cover" 
                        alt="Staff avatar"
                        src={user.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtWr4DtmR8B0_in-_gqoKoZVzPdHwgxOleFY_FKFj_wErPD6UsQQqs6ZJw0QdiIoDJYQ_2mCa4dsKrZ3q6b1B2LlP4_ySXqj2BuRPZy1UG3SMtAK1hgxGJPUTYE0t0MddfC2sT-A6WWGOMintZelgmuI-VNTxbHfHm20n86USjV9ylra6OtdGybma8CS0KSegsXALWLV18QNiDhl7FioTutX6vn6gWU7zUNEeABBzoRjMZbBTIJakb'} 
                      />
                    ))}
                    <div className="w-6 h-6 rounded-full bg-surface-container-high dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[9px] font-bold text-on-surface dark:text-white">
                      +{450 - usersList.length}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Grid: Charts & Monitoring */}
              <div className="grid grid-cols-12 gap-gutter">
                {/* Resource Monitoring (Dept Workload) */}
                <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  <div className="p-6 border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface-container-lowest dark:bg-slate-900/60">
                    <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">analytics</span>
                      {t.deptWorkload}
                    </h3>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400">
                        <span className="w-2.5 h-2.5 bg-primary dark:bg-primary-fixed-dim rounded-full"></span> {t.admissions}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400">
                        <span className="w-2.5 h-2.5 bg-secondary dark:bg-teal-500 rounded-full"></span> {t.discharges}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                    {/* Simulated Chart */}
                    <div className="flex-1 grid grid-cols-6 items-end gap-md md:gap-6 min-h-[180px] select-none">
                      {[
                        { name: 'ER', load: 80, detail: 'High' },
                        { name: 'ICU', load: 95, detail: 'Surge' },
                        { name: 'Surg', load: 50, detail: 'Normal' },
                        { name: 'Ped', load: 65, detail: 'Normal' },
                        { name: 'Cardio', load: 40, detail: 'Low' },
                        { name: 'Radiol', load: 75, detail: 'High' }
                      ].map(bar => (
                        <div key={bar.name} className="flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                          <div className="w-full bg-primary/10 dark:bg-slate-700 rounded-t-lg relative flex flex-col justify-end h-full">
                            <div 
                              className={`w-full rounded-t-lg transition-all duration-500 ${bar.load >= 90 ? 'bg-error' : bar.load >= 70 ? 'bg-primary dark:bg-primary-fixed-dim' : 'bg-secondary dark:bg-teal-500'}`} 
                              style={{ height: `${bar.load}%` }}
                            >
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                                {bar.load}% ({bar.detail})
                              </div>
                            </div>
                          </div>
                          <span className="text-[11px] font-bold text-on-surface-variant dark:text-slate-400">{bar.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* Alert Banner in Module */}
                    <div className="bg-error-container/60 dark:bg-red-950/20 border border-error/20 p-4 rounded-lg flex items-start gap-3">
                      <span className="material-symbols-outlined text-error dark:text-red-400 mt-0.5">warning</span>
                      <p className="text-body-sm text-on-error-container dark:text-red-300">
                        <strong>ICU Capacity Alert:</strong> {t.icuAlert}
                      </p>
                    </div>
                  </div>
                </div>

                {/* System Alerts & Notifications */}
                <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  <div className="p-6 border-b border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900/60">
                    <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.systemHealth}</h3>
                  </div>
                  <div className="p-4 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                    {logsList.slice(0, 3).map(log => {
                      const isCritical = log.level === 'ERROR';
                      const isWarning = log.level === 'WARNING';
                      return (
                        <div 
                          key={log.id} 
                          className={`p-3 border-l-4 rounded flex gap-3 text-left ${isCritical 
                            ? 'bg-error-container/10 border-error' 
                            : isWarning 
                              ? 'bg-amber-500/5 border-amber-500' 
                              : 'bg-teal-500/5 border-teal-500'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-[20px] flex-shrink-0 ${isCritical ? 'text-error' : isWarning ? 'text-amber-600 dark:text-amber-400' : 'text-secondary dark:text-teal-500'}`}>
                            {isCritical ? 'lock' : isWarning ? 'build' : 'check_circle'}
                          </span>
                          <div>
                            <p className="font-label-md text-[12px] text-on-surface dark:text-white font-bold">{log.level} Alert</p>
                            <p className="text-[11px] text-on-surface-variant dark:text-slate-400 leading-normal mt-0.5">{log.actionText}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-4 border-t border-outline-variant dark:border-slate-700">
                    <button 
                      onClick={() => setActiveTab('System Logs')}
                      className="w-full py-2 bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-200 font-label-md rounded-lg hover:bg-surface-container-highest dark:hover:bg-slate-600 transition-colors text-center text-body-sm font-semibold"
                    >
                      {lang === 'vi' ? 'Xem toàn bộ nhật ký' : 'View All System Logs'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USER MANAGEMENT VIEW */}
          {activeTab === 'User Management' && (
            <div className="space-y-6">
              {/* Page Header Section */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md">
                <div>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight">{t.userManagement}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">{t.adminSub}</p>
                </div>
                <button 
                  onClick={() => setShowAddUserModal(true)}
                  className="flex items-center gap-sm bg-primary text-on-primary px-lg py-sm rounded-lg font-label-md hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 shadow-sm"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
                  {t.addUser}
                </button>
              </div>

              {/* Dashboard Filters & Controls */}
              <div className="grid grid-cols-12 gap-gutter">
                <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md flex flex-col sm:flex-row items-start sm:items-center gap-md shadow-sm">
                  <div className="flex-1 flex flex-wrap items-center gap-sm">
                    <span className="text-[11px] font-bold text-outline dark:text-slate-455 uppercase tracking-wider">{lang === 'vi' ? 'Lọc theo:' : 'Filter by:'}</span>
                    <select 
                      value={userRoleFilter}
                      onChange={(e) => setUserRoleFilter(e.target.value)}
                      className="bg-surface-container-low dark:bg-slate-900 border-none rounded px-md py-xs font-label-md text-on-surface dark:text-white focus:ring-1 focus:ring-primary outline-none text-body-sm font-semibold"
                    >
                      <option value="All">{lang === 'vi' ? 'Tất cả vai trò' : 'All Roles'}</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Nurse">Nurse</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Technician">Technician</option>
                    </select>
                    <select 
                      value={userDeptFilter}
                      onChange={(e) => setUserDeptFilter(e.target.value)}
                      className="bg-surface-container-low dark:bg-slate-900 border-none rounded px-md py-xs font-label-md text-on-surface dark:text-white focus:ring-1 focus:ring-primary outline-none text-body-sm font-semibold"
                    >
                      <option value="All">{lang === 'vi' ? 'Tất cả khoa' : 'All Departments'}</option>
                      <option value="Ngoại Thần Kinh">{lang === 'vi' ? 'Ngoại Thần Kinh' : 'Neurosurgery'}</option>
                      <option value="Cấp Cứu (ER)">{lang === 'vi' ? 'Cấp Cứu (ER)' : 'Emergency (ER)'}</option>
                      <option value="Công Nghệ Thông Tin">{lang === 'vi' ? 'Công Nghệ Thông Tin' : 'IT Department'}</option>
                      <option value="Nhi Khoa">{lang === 'vi' ? 'Nhi Khoa' : 'Pediatrics'}</option>
                      <option value="Xét Nghiệm Máu">{lang === 'vi' ? 'Xét Nghiệm Máu' : 'Blood Diagnostics'}</option>
                    </select>
                  </div>
                  <div className="hidden sm:block h-6 w-px bg-outline-variant dark:bg-slate-700"></div>
                  <div className="flex items-center gap-sm">
                    <button 
                      onClick={() => {
                        setUserSearch('');
                        setUserRoleFilter('All');
                        setUserDeptFilter('All');
                      }}
                      className="p-xs hover:bg-surface-container-low dark:hover:bg-slate-700 rounded text-on-surface-variant dark:text-slate-400 transition-colors" 
                      title={lang === 'vi' ? 'Làm mới' : 'Refresh'}
                    >
                      <span className="material-symbols-outlined">refresh</span>
                    </button>
                    <button 
                      onClick={() => alert('Xuất danh sách tài khoản...')}
                      className="p-xs hover:bg-surface-container-low dark:hover:bg-slate-700 rounded text-on-surface-variant dark:text-slate-400 transition-colors" 
                      title={lang === 'vi' ? 'Xuất báo cáo' : 'Export Report'}
                    >
                      <span className="material-symbols-outlined">download</span>
                    </button>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-md">
                    <div className="p-sm bg-primary-fixed dark:bg-slate-700 rounded-lg">
                      <span className="material-symbols-outlined text-primary">groups</span>
                    </div>
                    <div>
                      <p className="text-body-sm text-outline dark:text-slate-400">{lang === 'vi' ? 'Tổng nhân viên' : 'Total staff'}</p>
                      <p className="font-headline-md text-headline-md text-on-surface dark:text-white">{usersList.length}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-body-sm text-secondary dark:text-teal-400 font-bold">{lang === 'vi' ? '+12 tháng này' : '+12 this month'}</p>
                    <p className="text-[10px] text-outline dark:text-slate-555 font-semibold">{lang === 'vi' ? 'Hoạt động: 98%' : 'Active: 98%'}</p>
                  </div>
                </div>
              </div>

              {/* Data Table Section */}
              <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low dark:bg-slate-900/40 border-b border-outline-variant dark:border-slate-700">
                        <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Thành viên' : 'Member'}</th>
                        <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{t.role}</th>
                        <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Khoa / Phòng' : 'Dept / Ward'}</th>
                        <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{t.status}</th>
                        <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Hoạt động cuối' : 'Last Active'}</th>
                        <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold text-right">{t.action}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/30 dark:divide-slate-750">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, idx) => (
                          <tr key={user.id} className={`${idx % 2 === 1 ? 'bg-slate-50/20 dark:bg-slate-900/10' : 'bg-white dark:bg-slate-800'} hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group`}>
                            <td className="px-lg py-md">
                              <div className="flex items-center gap-md">
                                {user.avatar ? (
                                  <img className="w-10 h-10 rounded-full object-cover border border-outline-variant dark:border-slate-700" src={user.avatar} alt={user.name} />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-surface-container dark:bg-slate-700 flex items-center justify-center font-bold text-primary dark:text-primary-fixed-dim border border-outline-variant dark:border-slate-600">
                                    {user.name.split(' ').pop().slice(0, 2).toUpperCase()}
                                  </div>
                                )}
                                <div>
                                  <p className="font-label-md text-on-surface dark:text-white font-semibold text-left">{user.name}</p>
                                  <p className="text-body-sm text-outline dark:text-slate-455 font-data-mono">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-lg py-md text-body-md font-semibold text-on-surface dark:text-slate-200">{user.role}</td>
                            <td className="px-lg py-md text-body-md text-on-surface-variant dark:text-slate-400">{user.dept}</td>
                            <td className="px-lg py-md">
                              <span className={`inline-flex items-center px-sm py-xs rounded-full text-[10px] font-bold uppercase tracking-wider ${user.status === 'Đang trực' 
                                ? 'bg-green-100 dark:bg-green-950/25 text-green-700 dark:text-green-400' 
                                : user.status === 'Sẵn sàng' 
                                  ? 'bg-primary-fixed dark:bg-blue-950/40 text-primary dark:text-primary-fixed-dim' 
                                  : user.status === 'Bận' 
                                    ? 'bg-orange-100 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400' 
                                    : 'bg-error-container/20 text-error'}`}>
                                {lang === 'vi' ? user.status : user.statusEn}
                              </span>
                            </td>
                            <td className="px-lg py-md text-body-md text-on-surface-variant dark:text-slate-400 font-data-mono">{user.load}</td>
                            <td className="px-lg py-md text-right relative">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuUserId(openMenuUserId === user.id ? null : user.id);
                                }}
                                className="p-sm hover:bg-surface-container dark:hover:bg-slate-700 rounded-full text-on-surface-variant dark:text-slate-400 hover:text-primary transition-colors"
                              >
                                <span className="material-symbols-outlined">more_vert</span>
                              </button>
                              
                              {openMenuUserId === user.id && (
                                <div className="absolute right-6 top-12 w-48 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 shadow-lg rounded-lg py-sm z-50 text-left animate-in fade-in zoom-in-95 duration-100">
                                  <button 
                                    onClick={() => alert(`Chỉnh sửa ${user.name}`)}
                                    className="w-full text-left px-md py-sm hover:bg-surface-container-low dark:hover:bg-slate-700 flex items-center gap-sm text-on-surface dark:text-white transition-colors text-body-sm font-semibold"
                                  >
                                    <span className="material-symbols-outlined text-[18px] text-outline">edit</span>
                                    <span>{lang === 'vi' ? 'Chỉnh sửa' : 'Edit'}</span>
                                  </button>
                                  <button 
                                    onClick={() => alert(`Đặt lại mật khẩu cho ${user.email}`)}
                                    className="w-full text-left px-md py-sm hover:bg-surface-container-low dark:hover:bg-slate-700 flex items-center gap-sm text-on-surface dark:text-white transition-colors text-body-sm font-semibold"
                                  >
                                    <span className="material-symbols-outlined text-[18px] text-outline">lock_reset</span>
                                    <span>{lang === 'vi' ? 'Đặt lại mật khẩu' : 'Reset Password'}</span>
                                  </button>
                                  <div className="h-px bg-outline-variant dark:bg-slate-700 my-xs"></div>
                                  <button 
                                    onClick={() => {
                                      setUsersList(prev => prev.map(u => u.id === user.id ? { ...u, status: u.status === 'Vắng mặt' ? 'Sẵn sàng' : 'Vắng mặt', statusEn: u.statusEn === 'Absent' ? 'Ready' : 'Absent' } : u));
                                    }}
                                    className="w-full text-left px-md py-sm hover:bg-surface-container-low dark:hover:bg-slate-700 flex items-center gap-sm text-error transition-colors text-body-sm font-semibold"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">person_off</span>
                                    <span>{user.status === 'Vắng mặt' ? (lang === 'vi' ? 'Kích hoạt' : 'Activate') : (lang === 'vi' ? 'Vô hiệu hóa' : 'Deactivate')}</span>
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-lg py-12 text-center text-on-surface-variant dark:text-slate-455 italic">
                            {lang === 'vi' ? 'Không tìm thấy kết quả phù hợp.' : 'No users found matching filters.'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Footer */}
                <div className="p-md bg-surface-container-lowest dark:bg-slate-900/60 border-t border-outline-variant dark:border-slate-700 flex items-center justify-between">
                  <p className="text-body-sm text-outline dark:text-slate-455 font-semibold">
                    {lang === 'vi' ? `Hiển thị ${filteredUsers.length} trên ${usersList.length} nhân viên` : `Showing ${filteredUsers.length} of ${usersList.length} employees`}
                  </p>
                  <div className="flex items-center gap-sm">
                    <button className="p-xs border border-outline-variant dark:border-slate-700 rounded disabled:opacity-50 hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors" disabled={true}>
                      <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <div className="flex items-center gap-xs">
                      <button className="w-8 h-8 flex items-center justify-center bg-primary text-on-primary rounded font-label-md">1</button>
                      <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-low dark:hover:bg-slate-850 rounded font-label-md dark:text-white font-bold">2</button>
                      <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-low dark:hover:bg-slate-850 rounded font-label-md dark:text-white font-bold">3</button>
                      <span className="px-xs text-outline dark:text-slate-555">...</span>
                      <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-low dark:hover:bg-slate-850 rounded font-label-md dark:text-white font-bold">257</button>
                    </div>
                    <button className="p-xs border border-outline-variant dark:border-slate-700 rounded hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM LOGS VIEW */}
          {activeTab === 'System Logs' && (
            <div className="space-y-lg">
              {/* Page Header & Global Filters */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
                <div>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight">{lang === 'vi' ? 'Nhật ký Hệ thống' : 'System Logs'}</h2>
                  <p className="text-on-surface-variant dark:text-slate-400 font-body-md mt-1">
                    {lang === 'vi' ? 'Theo dõi các sự kiện và hoạt động kiểm soát theo thời gian thực.' : 'Monitor server events and access logs in real time.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-sm bg-white dark:bg-slate-800 p-2 rounded-xl border border-outline-variant dark:border-slate-700 shadow-xs">
                  <div className="flex flex-col px-sm border-r border-outline-variant dark:border-slate-700">
                    <label className="text-[10px] font-bold text-outline dark:text-slate-455 uppercase tracking-tighter">{lang === 'vi' ? 'Phạm vi ngày' : 'Date Range'}</label>
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
                    <label className="text-[10px] font-bold text-outline dark:text-slate-455 uppercase tracking-tighter">{lang === 'vi' ? 'Loại sự kiện' : 'Event Type'}</label>
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
                    <p className="text-outline dark:text-slate-455 text-label-md">{lang === 'vi' ? 'Tổng sự kiện (24h)' : 'Total Events (24h)'}</p>
                    <p className="text-headline-lg font-black text-on-surface dark:text-white mt-1">1,284</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-error bg-error-container p-xs rounded">error</span>
                    <span className="text-[10px] text-error font-bold bg-error-container px-xs py-[2px] rounded">High Risk</span>
                  </div>
                  <div className="mt-sm text-left">
                    <p className="text-outline dark:text-slate-455 text-label-md">{lang === 'vi' ? 'Lỗi Hệ thống' : 'System Errors'}</p>
                    <p className="text-headline-lg font-black text-on-surface dark:text-white mt-1">3</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-secondary bg-secondary-container p-xs rounded">group</span>
                  </div>
                  <div className="mt-sm text-left">
                    <p className="text-outline dark:text-slate-455 text-label-md">{lang === 'vi' ? 'Người dùng Hoạt động' : 'Active Users'}</p>
                    <p className="text-headline-lg font-black text-on-surface dark:text-white mt-1">42</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-tertiary bg-tertiary-container p-xs rounded text-on-tertiary-container">database</span>
                  </div>
                  <div className="mt-sm text-left">
                    <p className="text-outline dark:text-slate-455 text-label-md">{lang === 'vi' ? 'Truy xuất Dữ liệu' : 'Data Retrieved'}</p>
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
                        if (confirm(lang === 'vi' ? 'Làm sạch danh sách Log?' : 'Clear live logs list?')) {
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
                      <tr className="bg-surface-container-low dark:bg-slate-900/30 border-b border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-355">
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
                                  <span className="text-[10px] text-outline dark:text-slate-455 mt-0.5">{log.date}</span>
                                </div>
                              </td>
                              <td className="px-lg py-md">
                                <div className="flex items-center gap-sm">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isError ? 'bg-error text-on-error' : 'bg-primary-container dark:bg-slate-700 text-on-primary-container dark:text-white'}`}>
                                    {log.userInitials}
                                  </div>
                                  <div className="text-left">
                                    <p className="font-semibold text-on-surface dark:text-white text-body-sm">{log.userName}</p>
                                    <p className="text-[10px] text-outline dark:text-slate-455">{log.userRole}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-lg py-md">
                                <div className="flex items-center gap-xs">
                                  <span className={`material-symbols-outlined text-[18px] ${isError ? 'text-error' : isWarning ? 'text-amber-500' : 'text-primary dark:text-primary-fixed-dim'}`}>
                                    {log.actionIcon}
                                  </span>
                                  <span className={`text-body-sm font-semibold ${isError ? 'text-error font-bold dark:text-red-300' : 'text-on-surface dark:text-slate-200'}`}>
                                    {log.actionText}
                                  </span>
                                </div>
                              </td>
                              <td className="px-lg py-md font-data-mono text-[12px] text-on-surface-variant dark:text-slate-400">{log.ip}</td>
                              <td className="px-lg py-md">
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
                          <td colSpan="6" className="px-lg py-12 text-center text-on-surface-variant dark:text-slate-455 italic">
                            {lang === 'vi' ? 'Không tìm thấy kết quả phù hợp.' : 'No events found.'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="px-lg py-md bg-surface-container-low dark:bg-slate-900/60 border-t border-outline-variant dark:border-slate-700 flex items-center justify-between">
                  <p className="text-body-sm text-outline dark:text-slate-455 font-semibold">
                    {lang === 'vi' ? `Hiển thị ${filteredLogs.length} trong số ${logsList.length} sự kiện` : `Showing ${filteredLogs.length} of ${logsList.length} events`}
                  </p>
                  <div className="flex items-center gap-xs">
                    <button className="p-1 border border-outline-variant dark:border-slate-700 rounded hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30" disabled={true}>
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-bold text-body-sm">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white dark:hover:bg-slate-850 text-on-surface-variant dark:text-slate-200 font-bold text-body-sm">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white dark:hover:bg-slate-850 text-on-surface-variant dark:text-slate-200 font-bold text-body-sm">3</button>
                    <span className="px-1 text-outline dark:text-slate-555">...</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white dark:hover:bg-slate-850 text-on-surface-variant dark:text-slate-200 font-bold text-body-sm">257</button>
                    <button className="p-1 border border-outline-variant dark:border-slate-700 rounded hover:bg-white dark:hover:bg-slate-800">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Asymmetric Module: Visual Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 p-lg hover:shadow-xs transition-shadow">
                  <div className="flex justify-between items-center mb-lg">
                    <h4 className="font-headline-md text-on-surface dark:text-white font-bold">{lang === 'vi' ? 'Phân tích Lưu lượng Truy cập' : 'Traffic Analysis'}</h4>
                    <span className="text-body-sm text-outline dark:text-slate-455 font-semibold">{lang === 'vi' ? 'Thời gian thực (60 phút)' : 'Real Time (60 mins)'}</span>
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

                <div className="bg-surface-container-low dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 p-lg flex flex-col justify-between hover:shadow-xs transition-shadow">
                  <div className="text-left">
                    <h4 className="font-headline-md text-on-surface dark:text-white mb-xs font-bold">{lang === 'vi' ? 'Cảnh báo An ninh' : 'Security Alerts'}</h4>
                    <p className="text-body-sm text-on-surface-variant dark:text-slate-400 font-semibold">{lang === 'vi' ? 'Phát hiện các hoạt động bất thường.' : 'Anomalous security behavior detected.'}</p>
                  </div>
                  <div className="space-y-md mt-md text-left">
                    <div className="flex items-center gap-md p-sm bg-error-container/20 border-l-4 border-error rounded-r-lg">
                      <span className="material-symbols-outlined text-error">gpp_maybe</span>
                      <div className="flex-grow">
                        <p className="text-[12px] font-bold text-error">{lang === 'vi' ? 'Dò tìm mật khẩu (Brute-force)' : 'Password brute-force attempt'}</p>
                        <p className="text-[10px] text-outline dark:text-slate-455 font-semibold mt-0.5">IP 103.45.122.9 - 14:38</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-md p-sm bg-orange-100 dark:bg-orange-950/20 border-l-4 border-orange-500 rounded-r-lg">
                      <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">database_off</span>
                      <div className="flex-grow">
                        <p className="text-[12px] font-bold text-orange-700 dark:text-orange-355">{lang === 'vi' ? 'Truy cập hồ sơ nhạy cảm' : 'Sensitive record access attempt'}</p>
                        <p className="text-[10px] text-outline dark:text-slate-455 font-semibold mt-0.5">User ID: hm_admin - 14:22</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Đang tải toàn bộ cảnh báo an ninh...')}
                    className="mt-lg w-full py-md bg-white dark:bg-slate-700 border border-outline-variant dark:border-slate-600 rounded-lg font-label-md text-primary dark:text-primary-fixed-dim hover:bg-primary hover:text-on-primary transition-all text-body-sm font-semibold active:scale-[0.98]"
                  >
                    {lang === 'vi' ? 'Xem tất cả cảnh báo' : 'View All Alerts'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PERFORMANCE TELEMETRY - Redesigned to match the high-fidelity template */}
          {activeTab === 'Performance' && (
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
              <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-md">
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
              <div className="grid grid-cols-12 gap-gutter">
                
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
                        <p className="text-outline dark:text-slate-450 text-[10px] font-bold uppercase tracking-wider">{lang === 'vi' ? 'Tải hiện tại' : 'Current Bandwidth'}</p>
                        <p className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim mt-0.5">1.2 TB/s</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-md mt-lg">
                      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xs p-md rounded-lg border border-outline-variant dark:border-slate-700 text-left">
                        <p className="text-outline dark:text-slate-455 text-body-sm font-semibold">API Latency</p>
                        <p className="font-headline-md text-headline-md text-on-surface dark:text-white mt-1">24ms</p>
                        <div className="w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                          <div className="bg-primary dark:bg-primary-fixed-dim h-full w-[15%]"></div>
                        </div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xs p-md rounded-lg border border-outline-variant dark:border-slate-700 text-left">
                        <p className="text-outline dark:text-slate-455 text-body-sm font-semibold">DB Connections</p>
                        <p className="font-headline-md text-headline-md text-on-surface dark:text-white mt-1">1,402</p>
                        <div className="w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                          <div className="bg-secondary dark:bg-teal-500 h-full w-[45%]"></div>
                        </div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xs p-md rounded-lg border border-outline-variant dark:border-slate-700 text-left">
                        <p className="text-outline dark:text-slate-455 text-body-sm font-semibold">Active Users</p>
                        <p className="font-headline-md text-headline-md text-on-surface dark:text-white mt-1">8,941</p>
                        <div className="w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                          <div className="bg-tertiary-container h-full w-[72%]"></div>
                        </div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xs p-md rounded-lg border border-outline-variant dark:border-slate-700 text-left">
                        <p className="text-outline dark:text-slate-455 text-body-sm font-semibold">Error Rate</p>
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
                    <h5 className="font-label-md text-label-md text-outline dark:text-slate-450 uppercase tracking-wider mb-md font-bold">{lang === 'vi' ? 'Trạng thái Cụm dịch vụ' : 'Service Cluster Nodes'}</h5>
                    <ul className="space-y-md">
                      <li className="flex items-center justify-between p-md bg-surface-container-low dark:bg-slate-900/60 rounded border border-outline-variant dark:border-slate-700">
                        <div className="flex items-center space-x-md text-on-surface dark:text-white font-semibold text-body-sm">
                          <span className="material-symbols-outlined text-secondary dark:text-teal-400">dns</span>
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
                      <p className="text-outline dark:text-slate-455 text-body-sm">{lang === 'vi' ? 'Trung bình cụm server' : 'Cluster server average'}</p>
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
                      <p className="text-outline dark:text-slate-455 text-body-sm">{lang === 'vi' ? 'Cấp phát hệ thống' : 'System memory usage'}</p>
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
                      <p className="text-outline dark:text-slate-455 text-body-sm">{lang === 'vi' ? 'Người dùng đồng thời' : 'Concurrent users connected'}</p>
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
                        <span className="font-label-md text-label-md text-outline dark:text-slate-450 font-bold">Normal</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-tertiary rounded-full"></span>
                        <span className="font-label-md text-label-md text-outline dark:text-slate-455 font-bold">Maintenance</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-error rounded-full animate-pulse"></span>
                        <span className="font-label-md text-label-md text-outline dark:text-slate-455 font-bold">Critical</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low dark:bg-slate-900/30 border-b border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-350">
                          <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Tên Instance' : 'Instance Host'}</th>
                          <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Vùng (Zone)' : 'Zone Location'}</th>
                          <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Phản hồi (ms)' : 'Latency (ms)'}</th>
                          <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Tải trọng' : 'Current Load'}</th>
                          <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">{lang === 'vi' ? 'Tình trạng' : 'Health Status'}</th>
                          <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold text-right">{t.action}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/30 dark:divide-slate-750 text-body-md text-on-surface dark:text-slate-200">
                        {dbInstances.map(db => (
                          <tr key={db.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                            <td className="px-lg py-md font-bold text-on-surface dark:text-white text-left">{db.name}</td>
                            <td className="px-lg py-md font-semibold text-on-surface-variant dark:text-slate-450">{db.zone}</td>
                            <td className="px-lg py-md font-data-mono font-bold text-secondary dark:text-teal-400">{db.ping}</td>
                            <td className="px-lg py-md">
                              <div className="w-32 bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className={`h-full ${db.isOverload ? 'bg-error' : 'bg-secondary dark:bg-teal-500'}`} style={{ width: `${db.load}%` }}></div>
                              </div>
                            </td>
                            <td className="px-lg py-md">
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
          )}

          {/* TAB 5: SECURITY AUDIT - High-fidelity redesign */}
          {activeTab === 'Security' && (
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
                            <td className="px-md py-sm text-on-surface-variant dark:text-slate-455 italic">{lang === 'vi' ? 'Đang điều tra' : 'Under investigation'}</td>
                          </tr>
                          <tr className="bg-slate-50/30 dark:bg-slate-900/10 hover:bg-surface-container-lowest dark:hover:bg-slate-700/30 transition-colors">
                            <td className="px-md py-sm font-data-mono text-on-surface dark:text-white">13:15:45</td>
                            <td className="px-md py-sm text-on-surface dark:text-slate-200">Unauthorized API Access</td>
                            <td className="px-md py-sm font-data-mono text-primary dark:text-primary-fixed-dim">45.22.112.8</td>
                            <td className="px-md py-sm">
                              <span className="px-sm py-xs bg-orange-100 dark:bg-orange-950/20 text-orange-800 dark:text-orange-400 text-[10px] font-bold rounded uppercase">High</span>
                            </td>
                            <td className="px-md py-sm text-on-surface-variant dark:text-slate-455 italic">{lang === 'vi' ? 'Bị chặn IP' : 'IP Blocked'}</td>
                          </tr>
                          <tr className="hover:bg-surface-container-lowest dark:hover:bg-slate-700/30 transition-colors">
                            <td className="px-md py-sm font-data-mono text-on-surface dark:text-white">11:02:00</td>
                            <td className="px-md py-sm text-on-surface dark:text-slate-200">Bulk Data Export</td>
                            <td className="px-md py-sm font-data-mono text-primary dark:text-primary-fixed-dim">10.0.5.42</td>
                            <td className="px-md py-sm">
                              <span className="px-sm py-xs bg-blue-100 dark:bg-blue-950/20 text-blue-800 dark:text-blue-400 text-[10px] font-bold rounded uppercase">Medium</span>
                            </td>
                            <td className="px-md py-sm text-on-surface-variant dark:text-slate-455 italic">{lang === 'vi' ? 'Đã xác minh' : 'Verified'}</td>
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
                        <div className="flex justify-between text-[10px] text-outline dark:text-slate-455">
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
                    <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg space-y-md hover:shadow-xs transition-shadow flex-1">
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
                            <label className="text-[10px] font-bold text-outline dark:text-slate-455 uppercase tracking-wider">IP / CIDR</label>
                            <input
                              type="text" value={newIpVal} onChange={(e) => setNewIpVal(e.target.value)}
                              placeholder="e.g. 10.0.8.22"
                              className="border border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-sm py-xs font-data-mono text-[12px] outline-none dark:text-white focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div className="flex-1 flex flex-col gap-xs">
                            <label className="text-[10px] font-bold text-outline dark:text-slate-455 uppercase tracking-wider">{lang === 'vi' ? 'Ghi chú' : 'Label'}</label>
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
                                <span className="material-symbols-outlined text-[16px] text-error hover:text-red-700 cursor-pointer transition-colors">close</span>
                              </button>
                            </div>
                          ))}
                        </div>
                        <p className="text-[10px] text-on-surface-variant dark:text-slate-455 mt-sm leading-relaxed">
                          {lang === 'vi'
                            ? 'Các IP ngoài danh sách này sẽ bị yêu cầu xác thực 2 bước ngay cả khi ở mạng nội bộ.'
                            : 'IPs not in this list will require 2FA verification even on the internal network.'}
                        </p>
                      </div>
                    </div>

                    {/* RBAC Summary */}
                    <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg space-y-md hover:shadow-xs transition-shadow flex-1">
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
                            className="p-md bg-surface-container-low dark:bg-slate-900/60 rounded-xl border border-outline-variant dark:border-slate-700 hover:border-primary dark:hover:border-primary-fixed-dim transition-all cursor-pointer group"
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
                    {loginTrendData.map((d, i) => (
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

                {/* Floating Emergency Lock Button */}
                <div className="fixed bottom-lg right-lg z-50 group">
                  <button
                    onClick={() => {
                      if (confirm(lang === 'vi' ? '⚠️ XÁC NHẬN PHONG TỎA HỆ THỐNG?\n\nHành động này sẽ ngắt kết nối tất cả phiên truy cập và khóa hệ thống EMR.' : '⚠️ CONFIRM EMERGENCY SYSTEM LOCKDOWN?\n\nThis will terminate all active sessions and lock the EMR.')) {
                        alert(lang === 'vi' ? '🔒 HỆ THỐNG ĐÃ ĐƯỢC PHONG TỎA. Liên hệ IT Support để mở khóa.' : '🔒 SYSTEM LOCKDOWN ACTIVATED. Contact IT Support to restore access.');
                      }
                    }}
                    className="w-14 h-14 bg-error text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                    title={lang === 'vi' ? 'Phong tỏa hệ thống khẩn cấp' : 'Emergency System Lockdown'}
                  >
                    <span className="material-symbols-outlined text-[28px] group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                  </button>
                  <div className="absolute right-16 bottom-3 bg-error text-white font-label-md text-[11px] font-bold px-md py-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                    {lang === 'vi' ? 'PHONG TỎA HỆ THỐNG KHẨN CẤP' : 'EMERGENCY SYSTEM LOCKDOWN'}
                  </div>
                </div>

              </div>
            )}

          {/* TAB 6: BACKUP VIEW - High-fidelity redesign */}
          {activeTab === 'Backup' && (
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
                      <p className="text-[11px] text-on-surface-variant dark:text-slate-455 italic">
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
                            <td className="px-md py-md">
                              <div className="font-semibold text-on-surface dark:text-white">{b.time}</div>
                              <div className="text-[10px] text-on-surface-variant dark:text-slate-455 font-data-mono">ID: {b.id}</div>
                            </td>
                            <td className="px-md py-md font-data-mono text-on-surface dark:text-white">{b.size}</td>
                            <td className="px-md py-md">
                              {b.type === 'Full Backup' ? (
                                <span className="px-sm py-xs bg-primary-container text-on-primary-container dark:bg-primary/20 dark:text-primary-fixed-dim rounded-full text-[10px] font-bold uppercase">Full Backup</span>
                              ) : b.type === 'Automated' ? (
                                <span className="px-sm py-xs bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-350 rounded-full text-[10px] font-bold uppercase">Automated</span>
                              ) : (
                                <span className="px-sm py-xs bg-secondary-container/60 text-on-secondary-container dark:bg-teal-950/40 dark:text-teal-400 rounded-full text-[10px] font-bold uppercase">Incremental</span>
                              )}
                            </td>
                            <td className="px-md py-md">
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
                          <p className="text-on-surface-variant dark:text-slate-455 text-[11px] leading-relaxed mt-xs">
                            {lang === 'vi' ? 'Sao lưu vào lúc 00:00 mỗi ngày. Chỉ sao lưu các thay đổi mới (Incremental).' : 'Backs up at midnight every day. Only saves incremental changes.'}
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-sm p-sm rounded-lg border border-outline-variant dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-900/40 cursor-pointer transition-colors">
                        <input type="radio" name="bkSchedule" className="text-primary focus:ring-primary h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-on-surface dark:text-white font-body-sm">{lang === 'vi' ? 'Hàng tuần (Weekly)' : 'Weekly'}</p>
                          <p className="text-on-surface-variant dark:text-slate-455 text-[11px] leading-relaxed mt-xs">
                            {lang === 'vi' ? 'Sao lưu vào 00:00 Chủ Nhật. Thực hiện sao lưu toàn bộ hệ thống (Full Backup).' : 'Full backup every Sunday at midnight.'}
                          </p>
                        </div>
                      </label>

                      <div className="pt-xs">
                        <label className="font-label-md text-[11px] text-on-surface-variant dark:text-slate-455 block mb-xs uppercase tracking-wider">
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
          )}


          {/* TAB 7: MAINTENANCE VIEW - High-fidelity redesign */}
          {activeTab === 'Maintenance' && (
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
                        <div>
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
                            if (!maintenanceMode || confirm(lang === 'vi' ? 'Tắt chế độ bảo trì và khôi phục truy cập hệ thống?' : 'Disable maintenance mode and restore system access?')) {
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
                        { icon: 'restart_alt', label: lang === 'vi' ? 'Khởi động lại' : 'Restart Service', action: () => confirm(lang === 'vi' ? 'Xác nhận khởi động lại dịch vụ EMR Core?' : 'Confirm restart of EMR Core service?') && alert(lang === 'vi' ? '🔄 Dịch vụ EMR Core đang được khởi động lại...' : '🔄 EMR Core restarting...') },
                        { icon: 'manage_history', label: lang === 'vi' ? 'Dọn Logs cũ' : 'Purge Old Logs', action: () => alert(lang === 'vi' ? '🗑️ Đã xóa 1,248 bản ghi logs cũ hơn 90 ngày.' : '🗑️ Purged 1,248 log entries older than 90 days.') },
                      ].map(tool => (
                        <button
                          key={tool.icon}
                          onClick={tool.action}
                          className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-xl flex flex-col items-center gap-sm hover:border-primary dark:hover:border-primary-fixed-dim hover:bg-primary/5 dark:hover:bg-primary/10 transition-all active:scale-95 group"
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
                      <div className="px-md py-sm bg-surface-container-low dark:bg-slate-900/60 flex items-center justify-between border-b border-outline-variant dark:border-slate-700">
                        <h3 className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant dark:text-slate-400">
                          {lang === 'vi' ? 'Lịch bảo trì sắp tới' : 'Upcoming Maintenance'}
                        </h3>
                        <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 text-[20px]">event</span>
                      </div>

                      <div className="p-md flex flex-col gap-md flex-1">
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
                          className="mt-auto py-sm text-primary dark:text-primary-fixed-dim font-label-md text-[12px] font-bold hover:bg-primary/5 dark:hover:bg-primary/10 rounded transition-colors text-center border border-dashed border-primary/30 dark:border-primary/40"
                        >
                          + {lang === 'vi' ? 'Thêm lịch trình mới' : 'Add New Schedule'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROW 2: Safety Warning Banner */}
                <div className="bg-error-container/10 dark:bg-red-950/20 border-2 border-error/20 dark:border-error/30 p-lg rounded-xl flex items-start gap-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-lg opacity-[0.06] rotate-12 pointer-events-none select-none">
                    <span className="material-symbols-outlined" style={{ fontSize: '120px', fontVariationSettings: "'FILL' 1" }}>warning</span>
                  </div>
                  <div className="bg-error text-on-error p-md rounded-lg shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>security_update_warning</span>
                  </div>
                  <div className="max-w-3xl">
                    <h3 className="font-headline-md text-headline-md text-error mb-xs">
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
                  <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 flex items-center justify-between bg-surface-container-low dark:bg-slate-900/60">
                    <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">
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
                            <td className="px-lg py-md font-data-mono text-[12px] text-on-surface dark:text-white">{log.date}</td>
                            <td className="px-lg py-md text-on-surface dark:text-slate-200">{lang === 'vi' ? log.typeVi : log.typeEn}</td>
                            <td className="px-lg py-md text-on-surface-variant dark:text-slate-455 font-data-mono text-[12px]">{log.actor}</td>
                            <td className="px-lg py-md">
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
                            <td className="px-lg py-md text-on-surface-variant dark:text-slate-455 text-[12px] max-w-[200px] truncate">{lang === 'vi' ? log.noteVi : log.noteEn}</td>
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
                    <span className="text-body-sm text-on-surface-variant dark:text-slate-455">
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
                          { label: lang === 'vi' ? 'Kiểm tra kết nối DB' : 'Database Connection', value: <span className="material-symbols-outlined text-secondary dark:text-teal-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> },
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
                          <div key={i} className={`p-md bg-surface-container dark:bg-slate-700/60 rounded-lg flex items-center justify-between ${item.pulse ? 'animate-pulse' : ''}`}>
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
          )}


          {/* TAB 8: SETTINGS VIEW */}
          {activeTab === 'Settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight">{t.settings}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">
                  {lang === 'vi' ? 'Quản lý thông tin hiển thị của bệnh viện, ngôn ngữ và cấu hình giao diện.' : 'Configure general clinic settings, system language overrides.'}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 space-y-6 text-left">
                {/* Hospital settings form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-355">{t.hospitalName}</label>
                    <input 
                      type="text" 
                      value={hospitalSettings.name}
                      onChange={(e) => setHospitalSettings({ ...hospitalSettings, name: e.target.value })}
                      className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-3 outline-none dark:text-white text-body-md focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-355">{t.hospitalEmail}</label>
                    <input 
                      type="email" 
                      value={hospitalSettings.email}
                      onChange={(e) => setHospitalSettings({ ...hospitalSettings, email: e.target.value })}
                      className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-3 outline-none dark:text-white text-body-md focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 flex flex-col gap-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-355">{t.hospitalAddress}</label>
                    <input 
                      type="text" 
                      value={hospitalSettings.address}
                      onChange={(e) => setHospitalSettings({ ...hospitalSettings, address: e.target.value })}
                      className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-3 outline-none dark:text-white text-body-md focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-outline-variant dark:border-slate-700 flex justify-end">
                  <button 
                    onClick={() => alert(lang === 'vi' ? 'Cập nhật cài đặt bệnh viện thành công!' : 'Hospital metadata settings successfully updated!')}
                    className="px-6 py-2.5 bg-primary text-white font-label-md rounded-lg hover:bg-surface-tint active:scale-[0.98] transition-all shadow-xs"
                  >
                    {t.save}
                  </button>
                </div>
              </div>
            </div>
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
                <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-355">{t.name} *</label>
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
                <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-355">{t.email} *</label>
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
                  <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-355">{t.role}</label>
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
                  <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-355">{t.department}</label>
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
