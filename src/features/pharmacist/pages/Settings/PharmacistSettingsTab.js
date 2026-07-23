import React, { useState } from 'react';
import UserProfileTab from '../../../../shared/components/UserProfileTab';

const localTranslations = {
  vi: {
    title: 'Cấu Hình & Cài Đặt Dược Sĩ',
    subtitle: 'Quản lý thông tin hồ sơ chuyên môn dược và các thiết lập vận hành nhà thuốc.',
    profileTab: 'Hồ sơ cá nhân',
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
    lowStockDesc: 'đơn vị',
    criticalStockLabel: 'Mức tồn kho khẩn cấp',
    criticalStockDesc: 'đơn vị',
    autoReorderTitle: 'Tự động gửi yêu cầu nhập hàng đang bật',
    autoReorderDesc: 'Hệ thống sẽ tự động tạo đơn nháp đặt hàng khi số lượng tồn kho giảm dưới ngưỡng.',
    
    permissionsTitle: 'Phân Quyền Theo Bộ Phận',
    addRole: 'Thêm vai trò',
    roleType: 'Vai trò',
    narcoticsAccess: 'Thuốc hướng thần',
    auditLogs: 'Xem nhật ký hệ thống',
    inventoryEdit: 'Chỉnh sửa kho hàng',
    roles: {
      chief: 'Dược sĩ Trưởng',
      clinical: 'Dược sĩ Lâm sàng',
      tech: 'Kỹ thuật viên Dược'
    },
    
    integrationTitle: 'Tích Hợp Hệ Thống Bệnh Viện',
    syncLabel: 'Đồng bộ hóa kho trung tâm',
    syncTime: 'Đồng bộ lần cuối: Hôm nay, {time}',
    apiEndpointLabel: 'API Endpoint',
    syncNow: 'Đồng bộ ngay',
    syncing: 'Đang đồng bộ...',
    configureApiKey: 'Cấu hình API Key',
    
    discard: 'Hủy thay đổi',
    saveAll: 'Lưu tất cả cài đặt',
    saveSuccess: 'Đã lưu cài đặt vận hành thành công!',
    syncSuccess: 'Đồng bộ hóa kho dược phẩm thành công!',
    discardConfirm: 'Bạn có chắc muốn hủy các thay đổi chưa lưu?',
    modalAddRoleTitle: 'Thêm Vai Trò Người Dùng',
    roleNamePlaceholder: 'Tên vai trò mới...',
    save: 'Lưu',
    cancel: 'Hủy'
  },
  en: {
    title: 'Pharmacy Settings & Profile',
    subtitle: 'Manage chief pharmacist credentials and hospital pharmacy configurations.',
    profileTab: 'Personal Profile',
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
    lowStockDesc: 'units',
    criticalStockLabel: 'Critical Stock Level',
    criticalStockDesc: 'units',
    autoReorderTitle: 'Automatic Re-ordering Enabled',
    autoReorderDesc: 'The system will generate a draft purchase order when units drop below threshold.',
    
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
    apiEndpointLabel: 'API Endpoint',
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
  const t = localTranslations[lang] || localTranslations['vi'];

  const [activeSubTab, setActiveSubTab] = useState('profile');

  // Form State - Hours
  const [monFriOpen, setMonFriOpen] = useState(true);
  const [monFriStart, setMonFriStart] = useState('08:00');
  const [monFriEnd, setMonFriEnd] = useState('22:00');
  const [satOpen, setSatOpen] = useState(true);
  const [satStart, setSatStart] = useState('09:00');
  const [satEnd, setSatEnd] = useState('18:00');
  const [sunOpen, setSunOpen] = useState(false);

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
      setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      alert(t.syncSuccess);
    }, 1200);
  };

  const handleAddRoleSubmit = (e) => {
    e.preventDefault();
    if (!newRoleName) return;
    setRoles([...roles, {
      id: roles.length + 1,
      type: newRoleName,
      narcotics: newRoleNarcotics,
      audit: newRoleAudit,
      edit: newRoleEdit
    }]);
    setNewRoleName('');
    setIsModalOpen(false);
  };

  const handleTogglePermission = (roleId, field) => {
    setRoles(prev => prev.map(role => role.id === roleId ? { ...role, [field]: !role[field] } : role));
  };

  return (
    <div className="space-y-lg text-left">
      {/* Page Header */}
      <div className="mb-lg">
        <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mb-xs">{t.title}</h2>
        <p className="text-on-surface-variant dark:text-slate-400 font-body-md text-body-md mt-1">{t.subtitle}</p>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex border-b border-outline-variant dark:border-slate-800 gap-md">
        {[
          { id: 'profile', label: t.profileTab, icon: 'person' },
          { id: 'hours', label: t.hoursTab, icon: 'schedule' },
          { id: 'inventory', label: t.inventoryTab, icon: 'inventory' },
          { id: 'permissions', label: t.permissionsTab, icon: 'groups' },
          { id: 'integrations', label: t.integrationsTab, icon: 'sync' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`flex items-center gap-xs px-md py-3 font-label-md text-label-md transition-all border-b-2 bg-transparent cursor-pointer outline-none ${
              activeSubTab === tab.id
                ? 'border-primary text-primary dark:text-primary-fixed-dim font-bold'
                : 'border-transparent text-on-surface-variant dark:text-slate-400 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="pb-xl">
        {activeSubTab === 'profile' && (
          <div className="animate-in fade-in duration-200">
            <UserProfileTab lang={lang} />
          </div>
        )}

        {activeSubTab === 'hours' && (
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm p-lg space-y-md animate-in fade-in duration-200">
            <h3 className="font-headline-md text-on-surface dark:text-white font-bold">{t.hoursTitle}</h3>
            <div className="space-y-sm">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center py-base border-b border-surface-container dark:border-slate-700 last:border-0 gap-sm">
                <span className="font-label-md text-on-surface dark:text-slate-200">{t.dayMondayFriday}</span>
                <div className="sm:col-span-3 flex items-center gap-md">
                  <input disabled={!monFriOpen} value={monFriStart} onChange={e=>setMonFriStart(e.target.value)} className="bg-surface-container-low dark:bg-slate-900 border border-outline-variant rounded px-2 py-1 dark:text-white" type="time" />
                  <span>{t.to}</span>
                  <input disabled={!monFriOpen} value={monFriEnd} onChange={e=>setMonFriEnd(e.target.value)} className="bg-surface-container-low dark:bg-slate-900 border border-outline-variant rounded px-2 py-1 dark:text-white" type="time" />
                  <label className="flex items-center gap-2 ml-auto cursor-pointer"><input checked={monFriOpen} onChange={e=>setMonFriOpen(e.target.checked)} type="checkbox" /> <span>{t.openLabel}</span></label>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center py-base border-b border-surface-container dark:border-slate-700 last:border-0 gap-sm">
                <span className="font-label-md text-on-surface dark:text-slate-200">{t.daySaturday}</span>
                <div className="sm:col-span-3 flex items-center gap-md">
                  <input disabled={!satOpen} value={satStart} onChange={e=>setSatStart(e.target.value)} className="bg-surface-container-low dark:bg-slate-900 border border-outline-variant rounded px-2 py-1 dark:text-white" type="time" />
                  <span>{t.to}</span>
                  <input disabled={!satOpen} value={satEnd} onChange={e=>setSatEnd(e.target.value)} className="bg-surface-container-low dark:bg-slate-900 border border-outline-variant rounded px-2 py-1 dark:text-white" type="time" />
                  <label className="flex items-center gap-2 ml-auto cursor-pointer"><input checked={satOpen} onChange={e=>setSatOpen(e.target.checked)} type="checkbox" /> <span>{t.openLabel}</span></label>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSubTab === 'inventory' && (
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm p-lg space-y-md animate-in fade-in duration-200">
            <h3 className="font-headline-md text-on-surface dark:text-white font-bold">{t.alertTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
              <div className="space-y-base">
                <label className="block text-on-surface-variant dark:text-slate-400 mb-1">{t.lowStockLabel}</label>
                <input value={lowStockThreshold} onChange={e=>setLowStockThreshold(parseInt(e.target.value)||0)} className="w-24 bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm dark:bg-slate-900 dark:text-white" type="number" />
              </div>
              <div className="space-y-base">
                <label className="block text-on-surface-variant dark:text-slate-400 mb-1">{t.criticalStockLabel}</label>
                <input value={criticalStockLevel} onChange={e=>setCriticalStockLevel(parseInt(e.target.value)||0)} className="w-24 bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm dark:bg-slate-900 dark:text-white" type="number" />
              </div>
            </div>
          </section>
        )}

        {activeSubTab === 'permissions' && (
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-sm animate-in fade-in duration-200">
            <div className="flex justify-between items-center pb-md border-b border-outline-variant dark:border-slate-700">
              <h3 className="font-headline-md text-on-surface dark:text-white font-bold">{t.permissionsTitle}</h3>
              <button onClick={()=>setIsModalOpen(true)} className="text-primary font-bold hover:underline bg-transparent border-none cursor-pointer">+{t.addRole}</button>
            </div>
            <table className="w-full text-left mt-md">
              <thead>
                <tr className="text-outline border-b border-outline-variant dark:border-slate-700">
                  <th className="py-sm">{t.roleType}</th>
                  <th className="py-sm text-center">{t.narcoticsAccess}</th>
                  <th className="py-sm text-center">{t.inventoryEdit}</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr key={role.id} className="border-b border-outline-variant last:border-0 dark:border-slate-700">
                    <td className="py-md text-on-surface dark:text-white">{role.type}</td>
                    <td className="py-md text-center">
                      <button onClick={()=>handleTogglePermission(role.id, 'narcotics')} className="bg-transparent border-none cursor-pointer">
                        {role.narcotics ? <span className="material-symbols-outlined text-secondary">check_circle</span> : <span className="material-symbols-outlined text-outline">cancel</span>}
                      </button>
                    </td>
                    <td className="py-md text-center">
                      <button onClick={()=>handleTogglePermission(role.id, 'edit')} className="bg-transparent border-none cursor-pointer">
                        {role.edit ? <span className="material-symbols-outlined text-secondary">check_circle</span> : <span className="material-symbols-outlined text-outline">cancel</span>}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeSubTab === 'integrations' && (
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-sm space-y-md animate-in fade-in duration-200">
            <h3 className="font-headline-md text-on-surface dark:text-white font-bold">{t.integrationTitle}</h3>
            <div className="flex justify-between p-md bg-surface-container-low dark:bg-slate-900 rounded-lg">
              <div>
                <p className="font-bold text-on-surface dark:text-white">{t.syncLabel}</p>
                <p className="text-xs text-outline">{t.syncTime.replace('{time}', lastSyncTime)}</p>
              </div>
              <button disabled={isSyncing} onClick={handleSyncNow} className="bg-primary text-white px-md py-1.5 rounded-lg disabled:opacity-50 font-semibold cursor-pointer border-none">{isSyncing ? t.syncing : t.syncNow}</button>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-outline mb-1">{t.apiEndpointLabel}</label>
              <input value={apiEndpoint} onChange={e=>setApiEndpoint(e.target.value)} className="w-full bg-surface-container dark:bg-slate-900 border border-outline-variant rounded-lg px-md py-2 dark:text-white" type="text" />
            </div>
          </section>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[100] p-md">
          <form onSubmit={handleAddRoleSubmit} className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 w-full max-w-md rounded-xl p-lg space-y-md text-left">
            <h3 className="text-headline-md font-bold text-on-surface dark:text-white">{t.modalAddRoleTitle}</h3>
            <input required value={newRoleName} onChange={e=>setNewRoleName(e.target.value)} type="text" placeholder={t.roleNamePlaceholder} className="w-full px-md py-2 border rounded bg-transparent dark:text-white" />
            <div className="flex justify-end gap-md">
              <button type="button" onClick={()=>setIsModalOpen(false)} className="px-md py-1.5 border rounded">{t.cancel}</button>
              <button type="submit" className="px-md py-1.5 bg-primary text-white rounded font-bold">{t.save}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
