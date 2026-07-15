import React from 'react';

export default function AdminUserManagementTab({
  lang,
  t,
  userSearch,
  setUserSearch,
  userRoleFilter,
  setUserRoleFilter,
  userDeptFilter,
  setUserDeptFilter,
  filteredUsers,
  usersList,
  setUsersList,
  openMenuUserId,
  setOpenMenuUserId,
  setShowAddUserModal,
}) {
  return (
    <div className="space-y-6">
      {/* Page Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md">
        <div className="text-left">
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
      <div className="grid grid-cols-12 gap-gutter text-left">
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md flex flex-col sm:flex-row items-start sm:items-center gap-md shadow-sm">
          <div className="flex-1 flex flex-wrap items-center gap-sm">
            <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider">{lang === 'vi' ? 'Lọc theo:' : 'Filter by:'}</span>
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
            <p className="text-[10px] text-outline dark:text-slate-500 font-semibold">{lang === 'vi' ? 'Hoạt động: 98%' : 'Active: 98%'}</p>
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
            <tbody className="divide-y divide-outline-variant/30 dark:divide-slate-700 font-body-sm text-on-surface dark:text-slate-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <tr key={user.id} className={`${idx % 2 === 1 ? 'bg-slate-50/20 dark:bg-slate-900/10' : 'bg-white dark:bg-slate-800'} hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group`}>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-md">
                        {user.avatar ? (
                          <img className="w-10 h-10 rounded-full object-cover" src={user.avatar} alt={user.name} />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold font-label-md">
                            {user.name.split(' ').pop().slice(0,2).toUpperCase()}
                          </div>
                        )}
                        <div className="text-left">
                          <p className="font-bold text-on-surface dark:text-white text-body-md">{user.name}</p>
                          <p className="text-xs text-on-surface-variant dark:text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-lg py-md text-left">
                      <span className="font-semibold text-body-md">{user.role}</span>
                    </td>
                    <td className="px-lg py-md text-left">
                      <span className="text-on-surface-variant dark:text-slate-350">{user.dept}</span>
                    </td>
                    <td className="px-lg py-md text-left">
                      <span className={`px-sm py-1 rounded-full text-xs font-semibold ${
                        user.status === 'Đang trực' || user.statusEn === 'On-Duty'
                          ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' 
                          : user.status === 'Sẵn sàng' || user.statusEn === 'Ready'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' 
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                      }`}>
                        {lang === 'vi' ? user.status : user.statusEn || user.status}
                      </span>
                    </td>
                    <td className="px-lg py-md text-left">
                      <span className="text-on-surface-variant dark:text-slate-400 text-xs">{user.load}</span>
                    </td>
                    <td className="px-lg py-md text-right relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuUserId(openMenuUserId === user.id ? null : user.id);
                        }}
                        className="p-1 hover:bg-surface-container-high dark:hover:bg-slate-700 rounded-full text-on-surface-variant dark:text-slate-300"
                      >
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>

                      {/* Dropdown menu */}
                      {openMenuUserId === user.id && (
                        <div className="absolute right-lg top-[70%] z-30 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg shadow-lg w-40 py-1 animate-in fade-in slide-in-from-top-2 duration-100">
                          <button 
                            onClick={() => alert(`Xem hồ sơ: ${user.name}`)}
                            className="w-full text-left px-md py-2 text-sm text-on-surface dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                            {lang === 'vi' ? 'Xem hồ sơ' : 'View Profile'}
                          </button>
                          <button 
                            onClick={() => alert(`Sửa vai trò của: ${user.name}`)}
                            className="w-full text-left px-md py-2 text-sm text-on-surface dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                            {lang === 'vi' ? 'Sửa vai trò' : 'Edit Role'}
                          </button>
                          <div className="border-t border-outline-variant dark:border-slate-700 my-1"></div>
                          <button 
                            onClick={() => {
                              if (window.confirm(lang === 'vi' ? `Bạn chắc chắn muốn xóa tài khoản ${user.name}?` : `Delete employee ${user.name}?`)) {
                                setUsersList(prev => prev.filter(u => u.id !== user.id));
                              }
                            }}
                            className="w-full text-left px-md py-2 text-sm text-error hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            {lang === 'vi' ? 'Xóa tài khoản' : 'Delete Account'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-lg py-12 text-center text-on-surface-variant dark:text-slate-400 italic">
                    {lang === 'vi' ? 'Không tìm thấy kết quả phù hợp.' : 'No users found matching filters.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-md bg-surface-container-lowest dark:bg-slate-900/60 border-t border-outline-variant dark:border-slate-700 flex items-center justify-between">
          <p className="text-body-sm text-outline dark:text-slate-400 font-semibold">
            {lang === 'vi' ? `Hiển thị ${filteredUsers.length} trên ${usersList.length} nhân viên` : `Showing ${filteredUsers.length} of ${usersList.length} employees`}
          </p>
          <div className="flex items-center gap-sm">
            <button className="p-xs border border-outline-variant dark:border-slate-700 rounded disabled:opacity-50 hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors" disabled={true}>
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <div className="flex items-center gap-xs">
              <button className="w-8 h-8 flex items-center justify-center bg-primary text-on-primary rounded font-label-md">1</button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-low dark:hover:bg-slate-800 rounded font-label-md dark:text-white font-bold">2</button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-low dark:hover:bg-slate-800 rounded font-label-md dark:text-white font-bold">3</button>
              <span className="px-xs text-outline dark:text-slate-500">...</span>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-low dark:hover:bg-slate-800 rounded font-label-md dark:text-white font-bold">257</button>
            </div>
            <button className="p-xs border border-outline-variant dark:border-slate-700 rounded hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
