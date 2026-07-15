import React, { useState, useRef } from 'react';

const localTranslations = {
  vi: {
    title: 'Cài Đặt Nhà Thuốc',
    subtitle: 'Quản lý vận hành nhà thuốc bệnh viện, ngưỡng tồn kho cảnh báo và phân quyền nhân viên.',
    hoursTab: 'Giờ hoạt động',
    inventoryTab: 'Cảnh báo tồn kho',
    permissionsTab: 'Phân quyền người dùng',
    integrationsTab: 'Tích hợp hệ thống',
    
    hoursTitle: 'Giờ Hoạt Động Nhà Thuốc',
    autoSaved: 'Đã tự động lưu',
    dayMondayFriday: 'Thứ Hai - Thứ Sáu',
    daySaturday: 'Thứ Bảy',
    daySunday: 'Chủ Nhật',
    to: 'đến',
    openLabel: 'Mở cửa',
    
    alertTitle: 'Ngưỡng Cảnh Báo Tồn Kho',
    lowStockLabel: 'Ngưỡng cảnh báo hết hàng chung',
    lowStockDesc: 'đơn vị (kích hoạt cảnh báo cấp 1)',
    criticalStockLabel: 'Mức tồn kho khẩn cấp',
    criticalStockDesc: 'đơn vị (gửi thông báo đẩy khẩn cấp)',
    autoReorderTitle: 'Tự động gửi yêu cầu nhập hàng đang bật',
    autoReorderDesc: 'Hệ thống sẽ tự động tạo đơn nháp đặt hàng khi số lượng tồn kho giảm dưới ngưỡng quy định đối với thuốc nhóm A.',
    
    permissionsTitle: 'Phân Quyền Theo Bộ Phận',
    addRole: 'Thêm vai trò',
    roleType: 'Vai trò',
    narcoticsAccess: 'Thuốc đặc biệt/Hướng thần',
    auditLogs: 'Xem nhật ký hệ thống',
    inventoryEdit: 'Chỉnh sửa kho hàng',
    roles: {
      chief: 'Dược sĩ Trưởng',
      clinical: 'Dược sĩ Lâm sàng',
      tech: 'Kỹ thuật viên Dược'
    },
    
    integrationTitle: 'Tích Hợp Hệ Thống Bệnh Viện Trung Ương',
    syncLabel: 'Đồng bộ hóa kho trung tâm',
    syncTime: 'Đồng bộ lần cuối: Hôm nay, {time}',
    apiEndpointLabel: 'API Endpoint (Kho trung tâm)',
    syncNow: 'Đồng bộ ngay',
    syncing: 'Đang đồng bộ...',
    configureApiKey: 'Cấu hình API Key',
    
    discard: 'Hủy thay đổi',
    saveAll: 'Lưu tất cả cài đặt',
    saveSuccess: 'Đã lưu tất cả cài đặt thành công!',
    syncSuccess: 'Đồng bộ hóa kho dược phẩm trung tâm thành công!',
    discardConfirm: 'Bạn có chắc chắn muốn hủy toàn bộ các thay đổi chưa lưu?',
    
    modalAddRoleTitle: 'Thêm Vai Trò Người Dùng',
    roleNamePlaceholder: 'Tên vai trò mới...',
    save: 'Lưu',
    cancel: 'Hủy'
  },
  en: {
    title: 'Pharmacy Settings',
    subtitle: 'Manage hospital pharmacy operations, inventory thresholds, and staff access.',
    hoursTab: 'Operating Hours',
    inventoryTab: 'Inventory Alerts',
    permissionsTab: 'User Permissions',
    integrationsTab: 'System Integrations',
    
    hoursTitle: 'Pharmacy Operating Hours',
    autoSaved: 'Auto-saved',
    dayMondayFriday: 'Monday - Friday',
    daySaturday: 'Saturday',
    daySunday: 'Sunday',
    to: 'to',
    openLabel: 'Open',
    
    alertTitle: 'Inventory Alert Thresholds',
    lowStockLabel: 'Global Low Stock Threshold',
    lowStockDesc: 'units (triggers primary alert)',
    criticalStockLabel: 'Critical Stock Level',
    criticalStockDesc: 'units (urgent push notification)',
    autoReorderTitle: 'Automatic Re-ordering Enabled',
    autoReorderDesc: 'The system will generate a draft purchase order when units drop below the Low Stock Threshold for Class A drugs.',
    
    permissionsTitle: 'Department Permissions',
    addRole: 'Add Role',
    roleType: 'Role Type',
    narcoticsAccess: 'Narcotics Access',
    auditLogs: 'Audit Logs',
    inventoryEdit: 'Inventory Edit',
    roles: {
      chief: 'Chief Pharmacist',
      clinical: 'Clinical Pharmacist',
      tech: 'Pharmacy Tech'
    },
    
    integrationTitle: 'Central Hospital Integration',
    syncLabel: 'Central Stock Synchronization',
    syncTime: 'Last synced: Today, {time}',
    apiEndpointLabel: 'API Endpoint (Central Warehouse)',
    syncNow: 'Sync Now',
    syncing: 'Syncing...',
    configureApiKey: 'Configure API Key',
    
    discard: 'Discard Changes',
    saveAll: 'Save All Settings',
    saveSuccess: 'All settings saved successfully!',
    syncSuccess: 'Central stock synchronization completed successfully!',
    discardConfirm: 'Are you sure you want to discard all unsaved changes?',
    
    modalAddRoleTitle: 'Add User Role',
    roleNamePlaceholder: 'New role name...',
    save: 'Save',
    cancel: 'Cancel'
  }
};

export default function PharmacistSettingsTab({ lang = 'vi' }) {
  const t = localTranslations[lang];



  // Form State - Hours
  const [monFriOpen, setMonFriOpen] = useState(true);
  const [monFriStart, setMonFriStart] = useState('08:00');
  const [monFriEnd, setMonFriEnd] = useState('22:00');

  const [satOpen, setSatOpen] = useState(true);
  const [satStart, setSatStart] = useState('09:00');
  const [satEnd, setSatEnd] = useState('18:00');

  const [sunOpen, setSunOpen] = useState(false);
  const [sunStart, setSunStart] = useState('09:00');
  const [sunEnd, setSunEnd] = useState('17:00');

  // Form State - Inventory
  const [lowStockThreshold, setLowStockThreshold] = useState(50);
  const [criticalStockLevel, setCriticalStockLevel] = useState(10);
  const [autoReorder, setAutoReorder] = useState(true);

  // Form State - Integration
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [apiEndpoint, setApiEndpoint] = useState('https://central-inv.hospital-cloud.com/v4/query');
  const [lastSyncTime, setLastSyncTime] = useState('14:32');
  const [isSyncing, setIsSyncing] = useState(false);

  // Form State - Permissions Roles
  const [roles, setRoles] = useState([
    { id: 1, type: t.roles.chief, typeKey: 'chief', narcotics: true, audit: true, edit: true },
    { id: 2, type: t.roles.clinical, typeKey: 'clinical', narcotics: true, audit: false, edit: true },
    { id: 3, type: t.roles.tech, typeKey: 'tech', narcotics: false, audit: false, edit: true }
  ]);

  // Modal Add Role State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleNarcotics, setNewRoleNarcotics] = useState(false);
  const [newRoleAudit, setNewRoleAudit] = useState(false);
  const [newRoleEdit, setNewRoleEdit] = useState(false);



  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(timeStr);
      alert(t.syncSuccess);
    }, 1500);
  };

  const handleToggleSync = () => {
    setSyncEnabled(!syncEnabled);
  };

  const handleAddRoleSubmit = (e) => {
    e.preventDefault();
    if (!newRoleName) return;

    const newRole = {
      id: roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1,
      type: newRoleName,
      narcotics: newRoleNarcotics,
      audit: newRoleAudit,
      edit: newRoleEdit
    };

    setRoles([...roles, newRole]);
    setNewRoleName('');
    setNewRoleNarcotics(false);
    setNewRoleAudit(false);
    setNewRoleEdit(false);
    setIsModalOpen(false);
  };

  const handleTogglePermission = (roleId, field) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        return { ...role, [field]: !role[field] };
      }
      return role;
    }));
  };

  const handleSaveAll = () => {
    alert(t.saveSuccess);
  };

  const handleDiscard = () => {
    if (window.confirm(t.discardConfirm)) {
      // Reset state to default values
      setMonFriOpen(true);
      setMonFriStart('08:00');
      setMonFriEnd('22:00');
      setSatOpen(true);
      setSatStart('09:00');
      setSatEnd('18:00');
      setSunOpen(false);
      setLowStockThreshold(50);
      setCriticalStockLevel(10);
      setSyncEnabled(true);
      setApiEndpoint('https://central-inv.hospital-cloud.com/v4/query');
    }
  };

  return (
    <div className="space-y-lg text-left">
      
      {/* Page Header */}
      <div className="mb-lg">
        <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mb-xs">{t.title}</h2>
        <p className="text-on-surface-variant dark:text-slate-400 font-body-md text-body-md mt-1">{t.subtitle}</p>
      </div>

      {/* Settings Container */}
      <div className="pb-xl">
        
        {/* Form Canvas (Bento/Card Layout) */}
        <div className="space-y-lg">
          
          {/* Section: Pharmacy Hours */}
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-colors">
            <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface-bright dark:bg-slate-900/50">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">calendar_month</span>
                <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{t.hoursTitle}</h3>
              </div>
              <span className="text-secondary dark:text-teal-400 font-label-md text-label-md flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>{t.autoSaved}</span>
              </span>
            </div>
            <div className="p-lg">
              <div className="space-y-sm">
                
                {/* Mon - Fri Row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center py-base border-b border-surface-container dark:border-slate-700 last:border-0 gap-sm sm:gap-none">
                  <span className="font-label-md text-label-md text-on-surface dark:text-slate-200">{t.dayMondayFriday}</span>
                  <div className="sm:col-span-3 flex items-center gap-md">
                    <input 
                      disabled={!monFriOpen}
                      value={monFriStart}
                      onChange={(e) => setMonFriStart(e.target.value)}
                      className="bg-surface-container-low dark:bg-slate-900 dark:text-white border border-outline-variant dark:border-slate-700 rounded px-2 py-1 font-data-mono text-data-mono focus:ring-primary focus:border-primary disabled:opacity-55 outline-none" 
                      type="time" 
                    />
                    <span className="text-on-surface-variant dark:text-slate-400">{t.to}</span>
                    <input 
                      disabled={!monFriOpen}
                      value={monFriEnd}
                      onChange={(e) => setMonFriEnd(e.target.value)}
                      className="bg-surface-container-low dark:bg-slate-900 dark:text-white border border-outline-variant dark:border-slate-700 rounded px-2 py-1 font-data-mono text-data-mono focus:ring-primary focus:border-primary disabled:opacity-55 outline-none" 
                      type="time" 
                    />
                    <label className="flex items-center gap-2 ml-auto cursor-pointer select-none">
                      <input 
                        checked={monFriOpen}
                        onChange={(e) => setMonFriOpen(e.target.checked)}
                        className="w-4 h-4 text-primary rounded border-outline-variant dark:border-slate-700 focus:ring-primary dark:bg-slate-900" 
                        type="checkbox" 
                      />
                      <span className="font-body-sm text-body-sm dark:text-slate-300">{t.openLabel}</span>
                    </label>
                  </div>
                </div>

                {/* Sat Row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center py-base border-b border-surface-container dark:border-slate-700 last:border-0 gap-sm sm:gap-none">
                  <span className="font-label-md text-label-md text-on-surface dark:text-slate-200">{t.daySaturday}</span>
                  <div className="sm:col-span-3 flex items-center gap-md">
                    <input 
                      disabled={!satOpen}
                      value={satStart}
                      onChange={(e) => setSatStart(e.target.value)}
                      className="bg-surface-container-low dark:bg-slate-900 dark:text-white border border-outline-variant dark:border-slate-700 rounded px-2 py-1 font-data-mono text-data-mono focus:ring-primary focus:border-primary disabled:opacity-55 outline-none" 
                      type="time" 
                    />
                    <span className="text-on-surface-variant dark:text-slate-400">{t.to}</span>
                    <input 
                      disabled={!satOpen}
                      value={satEnd}
                      onChange={(e) => setSatEnd(e.target.value)}
                      className="bg-surface-container-low dark:bg-slate-900 dark:text-white border border-outline-variant dark:border-slate-700 rounded px-2 py-1 font-data-mono text-data-mono focus:ring-primary focus:border-primary disabled:opacity-55 outline-none" 
                      type="time" 
                    />
                    <label className="flex items-center gap-2 ml-auto cursor-pointer select-none">
                      <input 
                        checked={satOpen}
                        onChange={(e) => setSatOpen(e.target.checked)}
                        className="w-4 h-4 text-primary rounded border-outline-variant dark:border-slate-700 focus:ring-primary dark:bg-slate-900" 
                        type="checkbox" 
                      />
                      <span className="font-body-sm text-body-sm dark:text-slate-300">{t.openLabel}</span>
                    </label>
                  </div>
                </div>

                {/* Sun Row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center py-base border-b border-surface-container dark:border-slate-700 last:border-0 gap-sm sm:gap-none">
                  <span className="font-label-md text-label-md text-on-surface dark:text-slate-200">{t.daySunday}</span>
                  <div className={`sm:col-span-3 flex items-center gap-md ${!sunOpen ? 'opacity-50' : ''}`}>
                    <input 
                      disabled={!sunOpen}
                      value={sunStart}
                      onChange={(e) => setSunStart(e.target.value)}
                      className="bg-surface-container-low dark:bg-slate-900 dark:text-white border border-outline-variant dark:border-slate-700 rounded px-2 py-1 font-data-mono text-data-mono focus:ring-primary focus:border-primary disabled:opacity-55 outline-none" 
                      type="time" 
                    />
                    <span className="text-on-surface-variant dark:text-slate-400">{t.to}</span>
                    <input 
                      disabled={!sunOpen}
                      value={sunEnd}
                      onChange={(e) => setSunEnd(e.target.value)}
                      className="bg-surface-container-low dark:bg-slate-900 dark:text-white border border-outline-variant dark:border-slate-700 rounded px-2 py-1 font-data-mono text-data-mono focus:ring-primary focus:border-primary disabled:opacity-55 outline-none" 
                      type="time" 
                    />
                    <label className="flex items-center gap-2 ml-auto cursor-pointer select-none opacity-100">
                      <input 
                        checked={sunOpen}
                        onChange={(e) => setSunOpen(e.target.checked)}
                        className="w-4 h-4 text-primary rounded border-outline-variant dark:border-slate-700 focus:ring-primary dark:bg-slate-900" 
                        type="checkbox" 
                      />
                      <span className="font-body-sm text-body-sm dark:text-slate-300">{t.openLabel}</span>
                    </label>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section: Inventory Thresholds */}
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-colors">
            <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 bg-surface-bright dark:bg-slate-900/50 flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">notification_important</span>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{t.alertTitle}</h3>
            </div>
            <div className="p-lg space-y-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
                <div className="space-y-base text-left">
                  <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-400 mb-1">{t.lowStockLabel}</label>
                  <div className="flex items-center gap-md">
                    <input 
                      value={lowStockThreshold}
                      onChange={(e) => setLowStockThreshold(parseInt(e.target.value) || 0)}
                      className="w-24 bg-surface-container-low dark:bg-slate-900 dark:text-white border border-outline-variant dark:border-slate-700 rounded-lg px-md py-sm font-data-mono text-data-mono focus:ring-primary focus:border-primary outline-none" 
                      type="number" 
                    />
                    <span className="text-on-surface-variant dark:text-slate-400 font-body-sm text-body-sm">{t.lowStockDesc}</span>
                  </div>
                </div>
                
                <div className="space-y-base text-left">
                  <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-400 mb-1">{t.criticalStockLabel}</label>
                  <div className="flex items-center gap-md">
                    <input 
                      value={criticalStockLevel}
                      onChange={(e) => setCriticalStockLevel(parseInt(e.target.value) || 0)}
                      className="w-24 bg-surface-container-low dark:bg-slate-900 text-error border border-outline-variant dark:border-slate-700 rounded-lg px-md py-sm font-data-mono text-data-mono focus:ring-primary focus:border-primary outline-none" 
                      type="number" 
                    />
                    <span className="text-on-surface-variant dark:text-slate-400 font-body-sm text-body-sm">{t.criticalStockDesc}</span>
                  </div>
                </div>
              </div>

              {/* Automatic reorder notification banner */}
              <div className="p-md bg-error-container/10 border border-error/20 rounded-lg flex gap-md items-start text-left">
                <span className="material-symbols-outlined text-error dark:text-red-400">report</span>
                <div>
                  <p className="font-label-md text-label-md text-error dark:text-red-400 font-bold">{t.autoReorderTitle}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{t.autoReorderDesc}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: User Permissions */}
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-colors">
            <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 bg-surface-bright dark:bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">groups</span>
                <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{t.permissionsTitle}</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md flex items-center gap-1 hover:underline border-none bg-transparent cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>{t.addRole}</span>
              </button>
            </div>
            <div className="p-lg">
              <div className="overflow-x-auto">
                <table className="w-full font-body-md text-body-md text-left min-w-[500px]">
                  <thead>
                    <tr className="border-b border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-400">
                      <th className="py-sm font-label-md text-label-md">{t.roleType}</th>
                      <th className="py-sm font-label-md text-label-md text-center">{t.narcoticsAccess}</th>
                      <th className="py-sm font-label-md text-label-md text-center">{t.auditLogs}</th>
                      <th className="py-sm font-label-md text-label-md text-center">{t.inventoryEdit}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container dark:divide-slate-700">
                    {roles.map(role => (
                      <tr key={role.id} className="hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors">
                        <td className="py-md font-label-md text-on-surface dark:text-white">{role.type}</td>
                        
                        <td className="py-md text-center">
                          <button 
                            type="button"
                            onClick={() => handleTogglePermission(role.id, 'narcotics')}
                            className="bg-transparent border-none cursor-pointer text-secondary dark:text-teal-400 hover:scale-105 transition-transform"
                          >
                            {role.narcotics ? (
                              <span className="material-symbols-outlined text-secondary dark:text-teal-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            ) : (
                              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-500">cancel</span>
                            )}
                          </button>
                        </td>
                        
                        <td className="py-md text-center">
                          <button 
                            type="button"
                            onClick={() => handleTogglePermission(role.id, 'audit')}
                            className="bg-transparent border-none cursor-pointer text-secondary dark:text-teal-400 hover:scale-105 transition-transform"
                          >
                            {role.audit ? (
                              <span className="material-symbols-outlined text-secondary dark:text-teal-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            ) : (
                              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-500">cancel</span>
                            )}
                          </button>
                        </td>

                        <td className="py-md text-center">
                          <button 
                            type="button"
                            onClick={() => handleTogglePermission(role.id, 'edit')}
                            className="bg-transparent border-none cursor-pointer text-secondary dark:text-teal-400 hover:scale-105 transition-transform"
                          >
                            {role.edit ? (
                              <span className="material-symbols-outlined text-secondary dark:text-teal-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            ) : (
                              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-500">cancel</span>
                            )}
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section: Integration Settings */}
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-colors">
            <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 bg-surface-bright dark:bg-slate-900/50 flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">dns</span>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{t.integrationTitle}</h3>
            </div>
            <div className="p-lg">
              
              {/* Sync status toggler box */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-md bg-surface-container-low dark:bg-slate-900 rounded-lg mb-md gap-md">
                <div className="flex items-center gap-md">
                  <div className="p-2 bg-secondary/15 rounded-full text-secondary dark:text-teal-400">
                    <span className="material-symbols-outlined">sync</span>
                  </div>
                  <div className="text-left">
                    <p className="font-label-md text-label-md text-on-surface dark:text-white font-bold">{t.syncLabel}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{t.syncTime.replace('{time}', lastSyncTime)}</p>
                  </div>
                </div>

                {/* Custom Toggle Switch */}
                <button 
                  type="button"
                  onClick={handleToggleSync}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors cursor-pointer border-none outline-none ${
                    syncEnabled ? 'bg-secondary dark:bg-teal-600' : 'bg-outline-variant dark:bg-slate-700'
                  }`}
                >
                  <span 
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      syncEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* API and Actions */}
              <div className="space-y-md text-left">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-400 mb-1">{t.apiEndpointLabel}</label>
                  <input 
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    className="w-full bg-surface-container dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-slate-400 rounded-lg px-md py-sm font-data-mono text-data-mono outline-none" 
                    type="text" 
                  />
                </div>
                <div className="flex flex-wrap items-center gap-md">
                  <button 
                    disabled={isSyncing}
                    onClick={handleSyncNow}
                    className="bg-primary dark:bg-primary-container text-white dark:text-on-primary-container px-lg py-sm rounded-lg font-label-md text-label-md hover:brightness-115 transition-all shadow-sm cursor-pointer border-none flex items-center gap-sm font-semibold disabled:opacity-50"
                  >
                    {isSyncing && <span className="w-3.5 h-3.5 border-2 border-white dark:border-slate-900 border-t-transparent rounded-full animate-spin"></span>}
                    <span>{isSyncing ? t.syncing : t.syncNow}</span>
                  </button>
                  <button 
                    onClick={() => alert('API Key Config Modal')}
                    className="border border-outline dark:border-slate-700 text-on-surface dark:text-slate-200 px-lg py-sm rounded-lg font-label-md text-label-md hover:bg-surface-container dark:hover:bg-slate-750 transition-colors cursor-pointer bg-transparent"
                  >
                    {t.configureApiKey}
                  </button>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="sticky bottom-0 bg-white dark:bg-slate-800 border-t border-outline-variant dark:border-slate-700 px-xl py-md flex justify-end gap-md z-40 transition-colors">
        <button 
          onClick={handleDiscard}
          className="px-lg py-sm text-on-surface-variant dark:text-slate-300 font-label-md text-label-md hover:bg-surface-container-low dark:hover:bg-slate-750 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
        >
          {t.discard}
        </button>
        <button 
          onClick={handleSaveAll}
          className="bg-primary text-white dark:bg-primary-container dark:text-on-primary-container px-xl py-sm rounded-lg font-label-md text-label-md shadow-sm hover:scale-[1.02] transition-all cursor-pointer border-none font-semibold"
        >
          {t.saveAll}
        </button>
      </div>

      {/* 5. Add User Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[100] p-md">
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 w-full max-w-md rounded-xl shadow-2xl overflow-hidden transition-all text-left">
            <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/80 flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{t.modalAddRoleTitle}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 p-1 rounded-full border-none bg-transparent cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddRoleSubmit} className="p-lg space-y-md">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">{t.roleType} *</label>
                <input 
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  type="text" 
                  placeholder={t.roleNamePlaceholder}
                  className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Permissions checkboxes */}
              <div className="space-y-sm pt-sm">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    checked={newRoleNarcotics}
                    onChange={(e) => setNewRoleNarcotics(e.target.checked)}
                    className="w-4 h-4 text-primary rounded border-outline-variant dark:border-slate-700 focus:ring-primary dark:bg-slate-900" 
                    type="checkbox" 
                  />
                  <span className="font-body-md text-body-md dark:text-slate-300">{t.narcoticsAccess}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    checked={newRoleAudit}
                    onChange={(e) => setNewRoleAudit(e.target.checked)}
                    className="w-4 h-4 text-primary rounded border-outline-variant dark:border-slate-700 focus:ring-primary dark:bg-slate-900" 
                    type="checkbox" 
                  />
                  <span className="font-body-md text-body-md dark:text-slate-300">{t.auditLogs}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    checked={newRoleEdit}
                    onChange={(e) => setNewRoleEdit(e.target.checked)}
                    className="w-4 h-4 text-primary rounded border-outline-variant dark:border-slate-700 focus:ring-primary dark:bg-slate-900" 
                    type="checkbox" 
                  />
                  <span className="font-body-md text-body-md dark:text-slate-300">{t.inventoryEdit}</span>
                </label>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-end gap-md pt-md border-t border-outline-variant dark:border-slate-700">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-lg py-2 border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200 rounded-lg font-label-md text-label-md bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-lg py-2 bg-primary text-white rounded-lg font-label-md text-label-md hover:brightness-110 shadow-sm transition-all cursor-pointer border-none font-semibold"
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
