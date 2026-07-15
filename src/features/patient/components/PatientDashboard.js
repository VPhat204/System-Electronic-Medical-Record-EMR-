import React, { useState, useEffect } from 'react';
import PatientDashboardTab from '../pages/Dashboard/PatientDashboardTab';
import PatientProfileTab from '../pages/Profile/PatientProfileTab';
import PatientAppointmentsTab from '../pages/Appointments/PatientAppointmentsTab';
import PatientBillingTab from '../pages/Billing/PatientBillingTab';
import PatientRecordsTab from '../pages/Records/PatientRecordsTab';
import PatientSettingsTab from '../pages/Settings/PatientSettingsTab';

const translations = {
  vi: {
    dashboard: 'Bảng điều khiển',
    records: 'Hồ sơ bệnh án',
    profile: 'Hồ sơ cá nhân',
    appointments: 'Lịch hẹn khám',
    billing: 'Hóa đơn thanh toán',
    settings: 'Cài đặt cổng bệnh nhân',
    helpCenter: 'Trợ giúp',
    signOut: 'Đăng xuất',
    patientPortal: 'Cổng Bệnh nhân',
    searchPlaceholder: 'Tìm kiếm hồ sơ, thuốc, lịch hẹn...',
    emergencyHotline: 'Đường dây khẩn cấp'
  },
  en: {
    dashboard: 'Dashboard',
    records: 'Medical Records',
    profile: 'Personal Profile',
    appointments: 'Appointments',
    billing: 'Billing Invoices',
    settings: 'Portal Settings',
    helpCenter: 'Help Center',
    signOut: 'Sign Out',
    patientPortal: 'Patient Portal',
    searchPlaceholder: 'Search prescriptions, appointments...',
    emergencyHotline: 'Emergency Hotline'
  }
};

export default function PatientDashboard({ onNavigate, theme: propTheme, setTheme: propSetTheme }) {
  const [lang, setLang] = useState('vi'); // 'vi' or 'en'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

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

  const handleOpenBooking = () => {
    alert(lang === 'vi' ? 'Đang mở hộp thoại đặt lịch hẹn khám...' : 'Opening consultation booking modal...');
  };

  return (
    <div className="bg-background dark:bg-slate-900 text-on-surface dark:text-slate-100 min-h-screen transition-colors duration-200">
      
      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* SIDE NAV BAR */}
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
              <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{t.patientPortal}</p>
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
            { label: 'Records', key: 'records', icon: 'receipt_long' },
            { label: 'Appointments', key: 'appointments', icon: 'calendar_today' },
            { label: 'Billing', key: 'billing', icon: 'payments' },
            { label: 'Profile', key: 'profile', icon: 'person' },
            { label: 'Settings', key: 'settings', icon: 'settings' }
          ].map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => { setActiveTab(item.label); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${isActive
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

        {/* CTA & Footer */}
        <div className="p-4 mt-auto">
          <div className="border-t border-outline-variant dark:border-slate-800 pt-4 space-y-1 text-left">
            <button 
              onClick={() => alert('Liên hệ trung tâm hỗ trợ MedCore EMR')}
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

      {/* TOP NAV BAR */}
      <header className="flex justify-between items-center h-16 px-6 md:ml-[260px] bg-white dark:bg-slate-950 sticky top-0 z-40 border-b border-outline-variant dark:border-slate-800 transition-colors">
        
        {/* Left Side: Mobile burger and Search */}
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
              placeholder={t.searchPlaceholder}
              className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-sm text-body-sm text-on-surface dark:text-white transition-all"
            />
          </div>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-md">
          {/* Theme switcher */}
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

          {/* Notifications Button */}
          <button 
            onClick={() => alert(lang === 'vi' ? 'Không có thông báo mới.' : 'No new notifications.')}
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 relative transition-colors"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>

          {/* Profile Details */}
          <div className="flex items-center gap-3 pl-3 border-l border-outline-variant dark:border-slate-800">
            <img 
              className="w-10 h-10 rounded-full object-cover border border-primary-fixed dark:border-slate-700" 
              alt="Patient avatar" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwo2C_dk0HpwFKTj4wKewVviyYkbYQz5hKgbX0B5qb1THrUqzrllVUp6S-j8Nn52jKu4IIwDQWg-NdtbXP7V79F1o5L2JTynJImEjQqz8Doz18ihOvxIC4p6ndawaKQEle39nuMPJF1L67lIl-qIGkeq3-hJ8E8BzNA22t5MIzXvflazLoE7oYn0kUXqcF2EBwMYySIVeubwZPGv0sBbqd84GImY1wLXJUxjNEux-FRl0uMMGv3zjx"
            />
            <div className="hidden sm:block text-left w-36">
              <p className="font-label-md text-label-md text-on-surface dark:text-white truncate">Nguyễn Văn An</p>
              <p className="text-[10px] text-on-surface-variant dark:text-slate-400 uppercase tracking-widest font-semibold truncate">VN-782-990-CL</p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="md:ml-[260px] p-6 min-h-screen">
        <div className="max-w-[1600px] mx-auto space-y-6">
          
          {activeTab === 'Dashboard' && (
            <PatientDashboardTab 
              lang={lang} 
              t={t} 
              setActiveTab={setActiveTab}
              onOpenBooking={handleOpenBooking}
            />
          )}

          {activeTab === 'Records' && (
            <PatientRecordsTab 
              lang={lang} 
              t={t} 
            />
          )}

          {activeTab === 'Profile' && (
            <PatientProfileTab 
              lang={lang} 
              t={t} 
            />
          )}

          {activeTab === 'Appointments' && (
            <PatientAppointmentsTab 
              lang={lang} 
              t={t} 
              onOpenBooking={handleOpenBooking}
            />
          )}

          {activeTab === 'Billing' && (
            <PatientBillingTab 
              lang={lang} 
              t={t} 
            />
          )}

          {activeTab === 'Settings' && (
            <PatientSettingsTab 
              lang={lang} 
              t={t} 
            />
          )}

        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-950 border-t border-outline-variant dark:border-slate-800 z-50 flex justify-around py-2">
        {[
          { label: 'Dashboard', icon: 'dashboard', key: 'dashboard' },
          { label: 'Records', icon: 'receipt_long', key: 'records' },
          { label: 'Appointments', icon: 'calendar_today', key: 'appointments' },
          { label: 'Billing', icon: 'payments', key: 'billing' }
        ].map((item) => {
          const isActive = activeTab === item.label;
          return (
            <button 
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              <span className="text-[10px]">{t[item.key]}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
