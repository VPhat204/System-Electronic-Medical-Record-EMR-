import React, { useState, useEffect } from 'react';
import PharmacistDashboardTab from '../pages/Dashboard/PharmacistDashboardTab';
import PharmacistPatientsTab from '../pages/Patients/PharmacistPatientsTab';
import PharmacistPendingRxTab from '../pages/PendingPrescriptions/PharmacistPendingRxTab';
import PharmacistLabResultsTab from '../pages/LabResults/PharmacistLabResultsTab';
import PharmacistPharmacyTab from '../pages/Pharmacy/PharmacistPharmacyTab';
import PharmacistSettingsTab from '../pages/Settings/PharmacistSettingsTab';

const translations = {
  vi: {
    dashboard: 'Bảng điều khiển',
    patients: 'Bệnh nhân',
    pendingPrescriptions: 'Đơn thuốc chờ duyệt',
    labResults: 'Kết quả xét nghiệm',
    pharmacy: 'Nhà thuốc',
    settings: 'Cài đặt',
    newPrescription: 'Tạo đơn mới',
    helpCenter: 'Trợ giúp',
    signOut: 'Đăng xuất',
    searchPlaceholder: 'Tìm kiếm đơn thuốc, tên thuốc hoặc bệnh nhân...',
    title: 'Quản Lý Nhà Thuốc',
    subTitle: 'Chào buổi sáng, Dược sĩ Minh Anh. Đây là báo cáo vận hành hôm nay.',
    exportReport: 'Xuất báo cáo',
    stockCount: 'Kiểm kê định kỳ',
    totalPrescriptions: 'Tổng đơn hôm nay',
    vsYesterday: 'so với hôm qua',
    pendingVerification: 'Chờ xử lý',
    avgWait: 'Thời gian chờ TB',
    inventoryWarning: 'Cảnh báo tồn kho',
    reorderRequired: 'Cần đặt hàng ngay',
    systemAlerts: 'Cảnh báo hệ thống',
    outOfStock: 'Hết hàng',
    nearingExpiry: 'Sắp hết hạn',
    expiryIn: 'hạn dùng',
    prescriptionQueue: 'Hàng Đợi Cấp Phát Thuốc',
    all: 'Tất cả',
    preparing: 'Đang chuẩn bị',
    ready: 'Sẵn sàng',
    delivered: 'Đã giao',
    patient: 'Bệnh nhân',
    medicationDose: 'Thuốc & Liều lượng',
    prescribedBy: 'Bác sĩ chỉ định',
    status: 'Trạng thái',
    action: 'Hành động',
    complete: 'Hoàn tất',
    prepare: 'Chuẩn bị',
    viewAllPrescriptions: 'Xem tất cả đơn hàng',
    inventoryManagement: 'Quản Lý Kho Thuốc',
    lastUpdated: 'Cập nhật lúc 09:45 AM hôm nay',
    filterByMedication: 'Lọc theo loại thuốc...',
    addNew: 'Thêm mới',
    restock: 'NHẬP HÀNG',
    details: 'CHI TIẾT',
    showingCount: 'Hiển thị 4 trong tổng số 856 loại thuốc',
    pharmacistTitle: 'Dược sĩ trưởng',
    centralPharmacy: 'Nhà thuốc trung tâm'
  },
  en: {
    dashboard: 'Dashboard',
    patients: 'Patients',
    pendingPrescriptions: 'Pending Prescriptions',
    labResults: 'Lab Results',
    pharmacy: 'Pharmacy',
    settings: 'Settings',
    newPrescription: 'New Prescription',
    helpCenter: 'Help Center',
    signOut: 'Sign Out',
    searchPlaceholder: 'Search prescriptions, medications, or patients...',
    title: 'Pharmacy Operations',
    subTitle: 'Good morning, Pharmacist Minh Anh. Here is today\'s operational report.',
    exportReport: 'Export Report',
    stockCount: 'Periodic Inventory',
    totalPrescriptions: 'Total Prescriptions Today',
    vsYesterday: 'vs yesterday',
    pendingVerification: 'Pending',
    avgWait: 'Avg wait time',
    inventoryWarning: 'Low Stock Warnings',
    reorderRequired: 'Needs Reorder',
    systemAlerts: 'System Alerts',
    outOfStock: 'Out of Stock',
    nearingExpiry: 'Nearing Expiry',
    expiryIn: 'expiry',
    prescriptionQueue: 'Prescription Dispensing Queue',
    all: 'All',
    preparing: 'Preparing',
    ready: 'Ready',
    delivered: 'Delivered',
    patient: 'Patient',
    medicationDose: 'Medication & Dosage',
    prescribedBy: 'Prescribed By',
    status: 'Status',
    action: 'Action',
    complete: 'Complete',
    prepare: 'Prepare',
    viewAllPrescriptions: 'View All Prescriptions',
    inventoryManagement: 'Medications Inventory',
    lastUpdated: 'Last updated 09:45 AM today',
    filterByMedication: 'Filter by medication category...',
    addNew: 'Add New',
    restock: 'RESTOCK',
    details: 'DETAILS',
    showingCount: 'Showing 4 of 856 medications in pharmacy',
    pharmacistTitle: 'Chief Pharmacist',
    centralPharmacy: 'Central Pharmacy'
  }
};

export default function PharmacistDashboard({ onNavigate, theme: propTheme, setTheme: propSetTheme, lang: propLang, setLang: propSetLang }) {
  const [localLang, setLocalLang] = useState('vi');
  const lang = propLang !== undefined ? propLang : localLang;
  const setLang = propSetLang !== undefined ? propSetLang : setLocalLang;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [localTheme, setLocalTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  const currentTheme = propTheme !== undefined ? propTheme : localTheme;
  const isDark = currentTheme === 'dark';

  const t = translations[lang];

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

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Dashboard state and handlers moved to PharmacistDashboardTab.js

  return (
    <div className="bg-background dark:bg-slate-900 text-on-surface dark:text-slate-100 min-h-screen transition-colors duration-200 text-left">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className={`fixed left-0 top-0 h-full w-[260px] bg-white dark:bg-slate-950 border-r border-outline-variant dark:border-slate-800 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Brand Header */}
        <div className="px-6 py-6 flex items-center justify-between border-b border-outline-variant dark:border-slate-800 md:border-none">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                medical_services
              </span>
            </div>
            <div>
              <h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed-dim">MedCore</h1>
              <p className="text-[11px] text-on-surface-variant dark:text-slate-400">
                {lang === 'vi' ? 'Cổng Dược Sĩ' : 'Pharmacy Portal'}
              </p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-grow space-y-1 py-4 text-left">
          {[
            { label: 'Dashboard', key: 'dashboard', icon: 'dashboard' },
            { label: 'Bệnh nhân', key: 'patients', icon: 'group' },
            { label: 'Đơn thuốc chờ duyệt', key: 'pendingPrescriptions', icon: 'prescription' },
            { label: 'Kết quả xét nghiệm', key: 'labResults', icon: 'biotech' },
            { label: 'Nhà thuốc', key: 'pharmacy', icon: 'inventory_2' },
            { label: 'Cài đặt', key: 'settings', icon: 'settings' }
          ].map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => { setActiveTab(item.label); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-6 py-3 border-l-4 transition-colors text-left ${isActive
                  ? 'text-primary dark:text-primary-fixed-dim border-primary dark:border-primary-fixed-dim font-bold bg-surface-container-low dark:bg-slate-900'
                  : 'text-on-surface-variant dark:text-slate-400 border-transparent hover:bg-surface-container-high dark:hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md">{t[item.key]}</span>
              </button>
            );
          })}
        </nav>

        {/* CTA & Help */}
        <div className="p-4 mt-auto">
          <button 
            onClick={() => alert(lang === 'vi' ? 'Mở phiếu lập đơn thuốc mới...' : 'Opening new prescription dispatch form...')}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all active:scale-[0.98] mb-4 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            {t.newPrescription}
          </button>
          
          <div className="border-t border-outline-variant dark:border-slate-800 pt-4 space-y-1 text-left">
            <button 
              onClick={() => alert('Hỗ trợ vận hành nhà thuốc MedCore')}
              className="w-full flex items-center gap-3 px-2 py-2 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              <span className="material-symbols-outlined">help</span>
              <span className="font-label-md text-label-md">{t.helpCenter}</span>
            </button>
            <button 
              onClick={() => onNavigate('home')}
              className="w-full flex items-center gap-3 px-2 py-2 text-error hover:bg-error-container/20 rounded-md transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-md text-label-md">{t.signOut}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* TOP HEADER BAR */}
      <header className="flex justify-between items-center h-16 px-6 md:ml-[260px] bg-white dark:bg-slate-950 sticky top-0 z-40 border-b border-outline-variant dark:border-slate-800 transition-colors">
        
        {/* Left Side: Mobile burger & Search */}
        <div className="flex items-center gap-md w-full max-w-md">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 md:hidden text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-sm text-body-sm text-on-surface dark:text-white transition-all" 
              placeholder={t.searchPlaceholder}
              type="text"
            />
          </div>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-md">
          
          {/* Theme Switcher */}
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
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 relative transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          
          {/* Emergency STAT */}
          <button 
            onClick={() => alert('Liên hệ cấp cứu nội viện STAT')}
            className="w-10 h-10 flex items-center justify-center rounded-full text-error hover:bg-error-container/20 transition-colors"
          >
            <span className="material-symbols-outlined text-red-500">emergency</span>
          </button>

          {/* Profile User Info Placed inside Header */}
          <div className="flex items-center gap-3 pl-3 border-l border-outline-variant dark:border-slate-800">
            <img 
              className="w-10 h-10 rounded-full object-cover border border-primary-fixed dark:border-slate-700" 
              alt="Pharmacist profile portrait" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCWBx--muJr6FqcILr-lvj4712YIjEDVXqQKvIbKSG5TRx-kBu4nbxAeWZWT2nRVSROrVxf-O6j-90ZNMgM5Nvpn54rVEVG5Uofek8_3c_iULCSeWQZc7uPzXrKFNj2y-tSl0WwAeOxWsxjejTqpHr-f3imD3HvQCwCdi2S0VfsWznnrSOeAfZvA1BneHutXAyVSWQhS0AIS06MXC3UqpjSaYIiFWuYUdcFuKGQ_EJk4hpb_VZ5tPQ"
            />
            <div className="hidden sm:block text-left">
              <p className="font-label-md text-label-md font-bold text-on-surface dark:text-white leading-tight">
                {lang === 'vi' ? 'Dược sĩ Minh Anh' : 'Pharmacist Minh Anh'}
              </p>
              <p className="text-[10px] text-on-surface-variant dark:text-slate-400">
                {t.pharmacistTitle}
              </p>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN CANVAS */}
      <main className="md:ml-[260px] p-8 min-h-[calc(100vh-64px)]">
        
        {activeTab === 'Dashboard' ? (
          <PharmacistDashboardTab lang={lang} t={t} />
        ) : activeTab === 'Bệnh nhân' ? (
          <PharmacistPatientsTab 
            lang={lang} 
            t={t} 
          />
        ) : activeTab === 'Đơn thuốc chờ duyệt' ? (
          <PharmacistPendingRxTab 
            lang={lang} 
            t={t} 
          />
        ) : activeTab === 'Kết quả xét nghiệm' ? (
          <PharmacistLabResultsTab 
            lang={lang} 
            t={t} 
          />
        ) : activeTab === 'Nhà thuốc' ? (
          <PharmacistPharmacyTab 
            lang={lang} 
          />
        ) : activeTab === 'Cài đặt' ? (
          <PharmacistSettingsTab 
            lang={lang} 
          />
        ) : (
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-xl shadow-sm text-center min-h-[400px] flex flex-col items-center justify-center space-y-md">
            <span className="material-symbols-outlined text-[64px] text-primary dark:text-primary-fixed-dim animate-pulse">
              construction
            </span>
            <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold">
              {activeTab} Portal Tab
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 max-w-md">
              {lang === 'vi' 
                ? `Phần chức năng ${activeTab} dành cho dược sĩ hiện đang được đồng bộ hóa hệ thống dữ liệu.` 
                : `${activeTab} interface features are being synchronized with the clinical database.`}
            </p>
          </div>
        )}

      </main>

      {/* Quick Action Floating Action Button */}
      <button 
        onClick={() => alert(lang === 'vi' ? 'Mở phiếu lập đơn thuốc nhanh...' : 'Opening quick prescription creation...')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center group z-50 border-none cursor-pointer"
      >
        <span className="material-symbols-outlined text-[28px]">add</span>
        <span className="absolute right-16 bg-inverse-surface text-inverse-on-surface px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {lang === 'vi' ? 'Kê đơn mới' : 'Prescribe New'}
        </span>
      </button>

    </div>
  );
}
