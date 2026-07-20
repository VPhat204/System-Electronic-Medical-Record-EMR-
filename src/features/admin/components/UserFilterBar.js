import React from 'react';

export default function UserFilterBar({
  lang,
  userRoleFilter,
  setUserRoleFilter,
  userDeptFilter,
  setUserDeptFilter,
  userSearch,
  setUserSearch,
  uniqueRoles,
  uniqueDepts,
  getRoleDisplayName,
  fetchUsers,
  handleExportExcel
}) {
  return (
    <div className="grid grid-cols-12 gap-gutter text-left">
      <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md flex flex-col sm:flex-row items-start sm:items-center gap-md shadow-sm">
        <div className="flex-1 flex flex-wrap items-center gap-sm">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider">
            {lang === 'vi' ? 'Lọc theo:' : 'Filter by:'}
          </span>
          
          <select
            value={userRoleFilter}
            onChange={(e) => setUserRoleFilter(e.target.value)}
            className="bg-surface-container-low dark:bg-slate-900 border-none rounded px-md py-xs font-label-md text-on-surface dark:text-white focus:ring-1 focus:ring-primary outline-none text-body-sm font-semibold cursor-pointer"
          >
            <option value="All">{lang === 'vi' ? 'Tất cả vai trò' : 'All Roles'}</option>
            {uniqueRoles.map(r => (
              <option key={r} value={r}>{getRoleDisplayName(r, lang)}</option>
            ))}
          </select>

          <select
            value={userDeptFilter}
            onChange={(e) => setUserDeptFilter(e.target.value)}
            className="bg-surface-container-low dark:bg-slate-900 border-none rounded px-md py-xs font-label-md text-on-surface dark:text-white focus:ring-1 focus:ring-primary outline-none text-body-sm font-semibold cursor-pointer"
          >
            <option value="All">{lang === 'vi' ? 'Tất cả khoa' : 'All Departments'}</option>
            {uniqueDepts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="hidden sm:block h-6 w-px bg-outline-variant dark:bg-slate-700"></div>

        <div className="flex items-center gap-sm">
          <button
            onClick={() => {
              setUserSearch('');
              setUserRoleFilter('All');
              setUserDeptFilter('All');
              fetchUsers();
            }}
            className="p-xs hover:bg-surface-container-low dark:hover:bg-slate-700 rounded text-on-surface-variant dark:text-slate-400 transition-colors cursor-pointer"
            title={lang === 'vi' ? 'Làm mới' : 'Refresh'}
          >
            <span className="material-symbols-outlined">refresh</span>
          </button>
          
          <button
            onClick={handleExportExcel}
            className="p-xs hover:bg-surface-container-low dark:hover:bg-slate-700 rounded text-on-surface-variant dark:text-slate-400 transition-colors cursor-pointer"
            title={lang === 'vi' ? 'Xuất báo cáo' : 'Export Report'}
          >
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
