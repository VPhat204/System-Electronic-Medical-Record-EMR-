import React, { useContext } from 'react';
import adminService from '../services/adminService';
import { ToastContext } from '../../../shared/context/ToastContext';

export default function UserTable({
  paginatedUsers,
  getRoleDisplayName,
  openMenuUserId,
  setOpenMenuUserId,
  setEditingUser,
  setShowEditUserModal,
  token,
  fetchUsers,
  lang,
  t
}) {
  const { success: toastSuccess, error: toastError } = useContext(ToastContext);

  return (
    <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low dark:bg-slate-900/40 border-b border-outline-variant dark:border-slate-700">
              <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">
                {lang === 'vi' ? 'Thành viên' : 'Member'}
              </th>
              <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">
                {t.role}
              </th>
              <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">
                {lang === 'vi' ? 'Khoa / Phòng' : 'Dept / Ward'}
              </th>
              <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">
                {t.status}
              </th>
              <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">
                {lang === 'vi' ? 'Số điện thoại' : 'Phone'}
              </th>
              <th className="px-lg py-md font-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold text-right">
                {t.action}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30 dark:divide-slate-700 font-body-sm text-on-surface dark:text-slate-200">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, idx) => {
                const displayName = user.fullName || user.name || '';
                const avatarUrl = user.avatar
                  ? (user.avatar.startsWith('http') || user.avatar.startsWith('data:')
                    ? user.avatar
                    : `http://localhost:5000${user.avatar.startsWith('/') ? '' : '/'}${user.avatar}`)
                  : null;
                return (
                  <tr key={user.id} className={`${idx % 2 === 1 ? 'bg-slate-50/20 dark:bg-slate-900/10' : 'bg-white dark:bg-slate-800'} hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group`}>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-md">
                        {avatarUrl ? (
                          <img className="w-10 h-10 rounded-full object-cover" src={avatarUrl} alt={displayName} />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold font-label-md select-none">
                            {displayName.split(' ').pop().slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="text-left">
                          <p className="font-bold text-on-surface dark:text-white text-body-md">{displayName}</p>
                          <p className="text-xs text-on-surface-variant dark:text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-lg py-md text-left capitalize">
                      <span className="font-semibold text-body-md">{getRoleDisplayName(user.role, lang)}</span>
                    </td>
                    <td className="px-lg py-md text-left">
                      <span className="text-on-surface-variant dark:text-slate-355">{user.dept || '-'}</span>
                    </td>
                    <td className="px-lg py-md text-left">
                      <span className={`px-sm py-1 rounded-full text-xs font-semibold select-none ${
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
                      <span className="text-on-surface-variant dark:text-slate-400 text-xs">{user.phone || '-'}</span>
                    </td>
                    <td className="px-lg py-md text-right relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuUserId(openMenuUserId === user.id ? null : user.id);
                        }}
                        className="p-1 hover:bg-surface-container-high dark:hover:bg-slate-700 rounded-full text-on-surface-variant dark:text-slate-300 cursor-pointer"
                      >
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>

                      {/* Dropdown menu */}
                      {openMenuUserId === user.id && (
                        <div className="absolute right-lg top-[70%] z-30 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg shadow-lg w-40 py-1 animate-in fade-in slide-in-from-top-2 duration-100 text-left">
                          <button
                            onClick={() => {
                              setEditingUser({
                                id: user.id,
                                fullName: displayName,
                                email: user.email || '',
                                role: user.role || 'doctor',
                                dept: user.dept || 'Nội khoa',
                                status: user.status || 'Sẵn sàng',
                                phone: user.phone || ''
                              });
                              setShowEditUserModal(true);
                              setOpenMenuUserId(null);
                            }}
                            className="w-full text-left px-md py-2 text-sm text-on-surface dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                            {lang === 'vi' ? 'Sửa thông tin' : 'Edit Details'}
                          </button>
                          <div className="border-t border-outline-variant dark:border-slate-700 my-1"></div>
                          <button
                            onClick={async () => {
                              if (window.confirm(lang === 'vi' ? `Bạn chắc chắn muốn xóa tài khoản ${displayName}?` : `Delete employee ${displayName}?`)) {
                                try {
                                  await adminService.deleteUser(token, user.id);
                                  toastSuccess(lang === 'vi' ? 'Xóa tài khoản người dùng thành công!' : 'User account deleted successfully!');
                                  fetchUsers();
                                } catch (err) {
                                  toastError(err.message || (lang === 'vi' ? 'Lỗi khi xóa tài khoản' : 'Failed to delete user'));
                                }
                              }
                            }}
                            className="w-full text-left px-md py-2 text-sm text-error hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            {lang === 'vi' ? 'Xóa tài khoản' : 'Delete Account'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
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
    </div>
  );
}
