import React from 'react';

export default function DoctorSettingsTab({
  lang,
  t,
  settingsTab,
  setSettingsTab,
  settingsContrast,
  setSettingsContrast,
  settingsLock,
  setSettingsLock,
  settingsCompact,
  setSettingsCompact,
  staffList,
  setStaffList,
  staffRoleFilter,
  setStaffRoleFilter,
  filteredStaff,
  settingsDark,
  handleToggleDark,
}) {
  return (
    <>
      {/* Settings Header */}
      <div className="text-left mb-lg">
        <h2 className="text-headline-xl font-headline-xl text-on-surface dark:text-white">System Settings</h2>
        <p className="text-body-lg text-on-surface-variant dark:text-slate-400">Configure your professional preferences and hospital-wide administration controls.</p>
      </div>

      <div className="grid grid-cols-12 gap-gutter text-left">

        {/* Settings Sidebar Links (3 cols) */}
        <nav className="col-span-12 lg:col-span-3 space-y-sm">
          {[
            { id: 'profile', label: 'User Profile', icon: 'person' },
            { id: 'security', label: 'Security', icon: 'security' },
            { id: 'notifications', label: 'Notifications', icon: 'notifications_active' },
            { id: 'hospital', label: 'Hospital Info', icon: 'domain' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setSettingsTab(btn.id)}
              className={`w-full flex items-center gap-md px-md py-3 rounded-lg border transition-all ${settingsTab === btn.id
                ? 'bg-white dark:bg-slate-800 text-primary dark:text-primary-fixed-dim font-bold shadow-xs border-outline-variant dark:border-slate-700'
                : 'bg-transparent text-on-surface-variant dark:text-slate-400 border-transparent hover:bg-surface-container dark:hover:bg-slate-900/50'
                }`}
            >
              <span className="material-symbols-outlined">{btn.icon}</span>
              <span className="text-body-md font-body-md">{btn.label}</span>
            </button>
          ))}

          <div className="pt-md mt-md border-t border-outline-variant dark:border-slate-800">
            <p className="px-md mb-sm text-[10px] text-outline dark:text-slate-400 font-bold uppercase tracking-widest">Admin Controls</p>
            <button
              onClick={() => setSettingsTab('management')}
              className={`w-full flex items-center gap-md px-md py-3 rounded-lg border transition-all ${settingsTab === 'management'
                ? 'bg-white dark:bg-slate-800 text-primary dark:text-primary-fixed-dim font-bold shadow-xs border-outline-variant dark:border-slate-700'
                : 'bg-transparent text-on-surface-variant dark:text-slate-400 border-transparent hover:bg-surface-container dark:hover:bg-slate-900/50'
                }`}
            >
              <span className="material-symbols-outlined">manage_accounts</span>
              <span className="text-body-md font-body-md">User Management</span>
            </button>
          </div>
        </nav>

        {/* Settings Details Canvas Panels (9 cols) */}
        <div className="col-span-12 lg:col-span-9 space-y-gutter">

          {/* Pane Profile */}
          {settingsTab === 'profile' && (
            <div className="space-y-gutter animate-in fade-in duration-200">

              {/* Personal physician card */}
              <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-md mb-lg">
                  <div className="flex flex-col sm:flex-row gap-lg items-center text-center sm:text-left">
                    <div className="relative group cursor-pointer">
                      <img
                        className="w-24 h-24 rounded-xl border border-outline-variant dark:border-slate-700 object-cover"
                        alt="Dr. Julian Reed portrait"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgDdkNPSPv2lbk-3io6wmPK00Xyx2_g2Ty273agQuBiThZ2vKscJ2S87oDY87aYlPiee1VNVtH8gmtafIGJtyPYDTA-eDCl9f_-mziOpUJ8OAihbnpOueSr-h8HCm1hdQI85szzkllnuoBLKTKt7h5cZ-_Hd05THVIk9R_XZdLVIdE47Ywuiby3srajUGQFNlAWoAqpWEUTlQF0wfptp26HR2VMhmxCuMuRo3LB3UgP9gRHT-99Y3k"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-white">edit</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">Dr. Julian Reed</h3>
                      <p className="text-body-md text-on-surface-variant dark:text-slate-400">License: #MD-80419-RE</p>
                      <span className="inline-block mt-sm bg-primary-fixed text-primary dark:text-teal-900 px-sm py-xs rounded text-body-sm font-bold border border-primary/10">
                        Attending Physician
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert('Sửa thông tin tài khoản')}
                    className="border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim px-md py-sm rounded font-label-md text-label-md hover:bg-primary-fixed/20 transition-colors w-full sm:w-auto"
                  >
                    Edit Profile
                  </button>
                </div>

                {/* Fields details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg pt-lg border-t border-outline-variant dark:border-slate-700">
                  <div className="space-y-base">
                    <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">Full Legal Name</label>
                    <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                      Julian Reed, MD
                    </p>
                  </div>

                  <div className="space-y-base">
                    <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">Primary Email</label>
                    <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                      j.reed@medcore.emr
                    </p>
                  </div>

                  <div className="space-y-base">
                    <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">Specialty</label>
                    <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                      Cardiology & Electrophysiology
                    </p>
                  </div>

                  <div className="space-y-base">
                    <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">Department</label>
                    <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                      Cardiac ICU Wing
                    </p>
                  </div>
                </div>

              </div>

              {/* Preferences Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">

                {/* Appearance Block */}
                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                  <h4 className="text-headline-md font-headline-md text-on-surface dark:text-white mb-md">Appearance</h4>
                  <div className="space-y-md">

                    <div className="flex items-center justify-between">
                      <span className="text-body-md text-on-surface dark:text-slate-200">Dark Mode</span>
                      <div
                        onClick={handleToggleDark}
                        className={`w-12 h-6 rounded-full relative cursor-pointer border transition-all ${settingsDark
                          ? 'bg-primary-container border-primary'
                          : 'bg-surface-container border-outline-variant dark:border-slate-600'
                          }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all bg-white ${settingsDark ? 'right-1' : 'left-1 bg-outline dark:bg-slate-400'
                          }`}></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-body-md text-on-surface dark:text-slate-200">High Contrast Mode</span>
                      <div
                        onClick={() => setSettingsContrast(!settingsContrast)}
                        className={`w-12 h-6 rounded-full relative cursor-pointer border transition-all ${settingsContrast
                          ? 'bg-primary-container border-primary'
                          : 'bg-surface-container border-outline-variant dark:border-slate-600'
                          }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all bg-white ${settingsContrast ? 'right-1' : 'left-1 bg-outline dark:bg-slate-400'
                          }`}></div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Workflow Block */}
                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                  <h4 className="text-headline-md font-headline-md text-on-surface dark:text-white mb-md">Workflow</h4>
                  <div className="space-y-md">

                    <div className="flex items-center justify-between">
                      <span className="text-body-md text-on-surface dark:text-slate-200">Auto-lock Screen (15m)</span>
                      <div
                        onClick={() => setSettingsLock(!settingsLock)}
                        className={`w-12 h-6 rounded-full relative cursor-pointer border transition-all ${settingsLock
                          ? 'bg-primary-container border-primary'
                          : 'bg-surface-container border-outline-variant dark:border-slate-600'
                          }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all bg-white ${settingsLock ? 'right-1' : 'left-1 bg-outline dark:bg-slate-400'
                          }`}></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-body-md text-on-surface dark:text-slate-200">Compact Table View</span>
                      <div
                        onClick={() => setSettingsCompact(!settingsCompact)}
                        className={`w-12 h-6 rounded-full relative cursor-pointer border transition-all ${settingsCompact
                          ? 'bg-primary-container border-primary'
                          : 'bg-surface-container border-outline-variant dark:border-slate-600'
                          }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all bg-white ${settingsCompact ? 'right-1' : 'left-1 bg-outline dark:bg-slate-400'
                          }`}></div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Pane Security */}
          {settingsTab === 'security' && (
            <div className="space-y-gutter animate-in fade-in duration-200">

              <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white mb-lg">Security &amp; Authentication</h3>

                <div className="space-y-lg">

                  <div className="flex flex-col sm:flex-row items-center justify-between p-md bg-slate-50 dark:bg-slate-900 rounded-lg border border-outline-variant dark:border-slate-700 gap-md">
                    <div className="flex items-center gap-md self-start sm:self-center">
                      <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">password</span>
                      </div>
                      <div>
                        <p className="text-body-md font-bold text-on-surface dark:text-white">Password Management</p>
                        <p className="text-body-sm text-on-surface-variant dark:text-slate-400">Last changed 42 days ago</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert('Thay đổi mật khẩu tài khoản')}
                      className="bg-primary hover:bg-primary-container text-white px-md py-sm rounded font-label-md text-label-md w-full sm:w-auto transition-colors"
                    >
                      Change Password
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between p-md bg-slate-50 dark:bg-slate-900 rounded-lg border border-outline-variant dark:border-slate-700 gap-md">
                    <div className="flex items-center gap-md self-start sm:self-center">
                      <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-on-secondary-container">
                        <span className="material-symbols-outlined">vibration</span>
                      </div>
                      <div>
                        <p className="text-body-md font-bold text-on-surface dark:text-white">Two-Factor Authentication (2FA)</p>
                        <p className="text-body-sm text-secondary dark:text-teal-400 font-medium">Status: ACTIVE</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert('Vô hiệu hóa xác minh hai bước 2FA')}
                      className="text-error font-label-md text-label-md hover:bg-error-container/20 px-md py-sm rounded w-full sm:w-auto transition-colors"
                    >
                      Disable 2FA
                    </button>
                  </div>

                </div>
              </div>

              {/* Active sessions list */}
              <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white mb-lg">Active Sessions</h3>

                <div className="overflow-x-auto rounded-lg border border-outline-variant dark:border-slate-700">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead className="bg-surface-container dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-300">
                      <tr>
                        <th className="px-md py-sm text-label-md font-bold uppercase">Device</th>
                        <th className="px-md py-sm text-label-md font-bold uppercase">Location</th>
                        <th className="px-md py-sm text-label-md font-bold uppercase">Time</th>
                        <th className="px-md py-sm text-label-md font-bold uppercase text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-body-sm text-on-surface dark:text-slate-200 divide-y divide-outline-variant dark:divide-slate-700">
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                        <td className="px-md py-sm font-semibold">MedCore Terminal (Ward 4B)</td>
                        <td className="px-md py-sm">City General Hospital</td>
                        <td className="px-md py-sm font-data-mono">Current Session</td>
                        <td className="px-md py-sm text-right"><button disabled className="text-outline dark:text-slate-500 font-bold opacity-30">Active</button></td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                        <td className="px-md py-sm font-semibold">iPhone 15 Pro (Mobile App)</td>
                        <td className="px-md py-sm">Chicago, IL</td>
                        <td className="px-md py-sm font-data-mono">2h 15m ago</td>
                        <td className="px-md py-sm text-right">
                          <button onClick={() => alert('Revoked session on iPhone')} className="text-primary dark:text-primary-fixed-dim hover:underline">Revoke</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* Pane Management */}
          {settingsTab === 'management' && (
            <div className="space-y-gutter animate-in fade-in duration-200">

              <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-md mb-lg">
                  <div>
                    <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">Administrative User Management</h3>
                    <p className="text-body-md text-on-surface-variant dark:text-slate-400">Control access rights and system permissions for hospital staff.</p>
                  </div>
                  <button
                    onClick={() => {
                      const name = prompt('Nhập tên nhân viên mới:');
                      if (!name) return;
                      const email = prompt('Nhập email:');
                      const role = prompt('Nhập chức vụ/vai trò:') || 'General Practitioner';
                      const newStaff = {
                        id: staffList.length + 1,
                        name,
                        email: email || `${name.toLowerCase().replace(/\s+/g, '')}@hospital.com`,
                        role,
                        status: 'Active',
                        lastLogin: 'Just now',
                        initials: name.split(' ').map(x => x[0]).join('').toUpperCase().slice(0, 2)
                      };
                      setStaffList([...staffList, newStaff]);
                    }}
                    className="bg-primary hover:bg-primary-container text-white px-lg py-sm rounded-lg flex items-center justify-center gap-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-[0.98] w-full sm:w-auto"
                  >
                    <span className="material-symbols-outlined">person_add</span>
                    Add New Provider
                  </button>
                </div>

                {/* Staff filters row */}
                <div className="flex flex-wrap gap-md mb-md">
                  {['All', 'Doctors', 'Nursing', 'Admin'].map(role => {
                    const isAct = staffRoleFilter === role;
                    return (
                      <button
                        key={role}
                        onClick={() => setStaffRoleFilter(role)}
                        className={`px-md py-1.5 rounded-full text-label-md font-bold transition-colors ${isAct
                          ? 'bg-primary-container text-primary dark:text-white'
                          : 'bg-surface-container dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high'
                          }`}
                      >
                        {role} ({role === 'All' ? staffList.length : role === 'Doctors' ? staffList.filter(x => x.role.toLowerCase().includes('specialist')).length : role === 'Nursing' ? staffList.filter(x => x.role.toLowerCase().includes('nurse')).length : staffList.filter(x => x.role.toLowerCase().includes('manager')).length})
                      </button>
                    );
                  })}
                </div>

                {/* Staff directory table */}
                <div className="overflow-x-auto border border-outline-variant dark:border-slate-700 rounded-lg">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead className="bg-surface-container dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-300">
                      <tr>
                        <th className="px-md py-sm text-label-md font-bold uppercase">User</th>
                        <th className="px-md py-sm text-label-md font-bold uppercase">Role</th>
                        <th className="px-md py-sm text-label-md font-bold uppercase">Status</th>
                        <th className="px-md py-sm text-label-md font-bold uppercase">Last Login</th>
                        <th className="px-md py-sm text-label-md font-bold uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-body-sm text-on-surface dark:text-slate-200 divide-y divide-outline-variant dark:divide-slate-700">
                      {filteredStaff.map((staff) => (
                        <tr key={staff.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                          <td className="px-md py-sm">
                            <div className="flex items-center gap-sm">
                              <div className="w-8 h-8 rounded-full bg-surface-container-high dark:bg-slate-700 flex items-center justify-center font-bold text-primary dark:text-primary-fixed-dim">
                                {staff.initials}
                              </div>
                              <div>
                                <p className="font-bold">{staff.name}</p>
                                <p className="text-[11px] text-outline dark:text-slate-400">{staff.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-md py-sm font-semibold">{staff.role}</td>
                          <td className="px-md py-sm">
                            {staff.status === 'Active' ? (
                              <span className="bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400 px-sm py-0.5 rounded-full text-xs font-bold border border-green-500/10">Active</span>
                            ) : (
                              <span className="bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-400 px-sm py-0.5 rounded-full text-xs font-bold border border-slate-600/10">Suspended</span>
                            )}
                          </td>
                          <td className="px-md py-sm font-data-mono">{staff.lastLogin}</td>
                          <td className="px-md py-sm text-right">
                            <button
                              onClick={() => alert(`Chỉnh sửa quyền nhân viên: ${staff.name}`)}
                              className="text-primary dark:text-primary-fixed-dim hover:bg-primary-fixed/20 p-1 rounded transition-colors"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              onClick={() => {
                                setStaffList(prev => prev.map(s => {
                                  if (s.id === staff.id) {
                                    return { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' };
                                  }
                                  return s;
                                }));
                              }}
                              className="text-error hover:bg-error-container/20 p-1 rounded transition-colors ml-1"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                {staff.status === 'Active' ? 'block' : 'settings_backup_restore'}
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* Pane Notifications */}
          {settingsTab === 'notifications' && (
            <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-xl text-center animate-in fade-in duration-200">
              <span className="material-symbols-outlined text-outline dark:text-slate-500 text-6xl mb-md">notifications_off</span>
              <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">Notification Preferences</h3>
              <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-sm mx-auto">This module is currently being optimized for high-volume clinical alerts. Please check back after the next system sync.</p>
            </div>
          )}

          {/* Pane Hospital Info */}
          {settingsTab === 'hospital' && (
            <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-xl text-center animate-in fade-in duration-200">
              <span className="material-symbols-outlined text-outline dark:text-slate-500 text-6xl mb-md">domain_disabled</span>
              <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">Hospital Information</h3>
              <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-sm mx-auto">Central records management is currently read-only. Contact System Administration for updates to facility branding or compliance data.</p>
            </div>
          )}

        </div>

      </div>
    </>
  );
}
