import React, { useState, useContext } from 'react';
import adminService from '../../services/adminService';
import { exportToExcel } from '../../utils/ExportToExcelForUserManagement';
import ModalEditUserManagement from '../../components/modalEditUserManagement';
import ModalAddUserManagement from '../../components/modalAddUserManagement';
import { ToastContext } from '../../../../shared/context/ToastContext';
import UserFilterBar from '../../components/UserFilterBar';
import UserTable from '../../components/UserTable';
import UserPagination from '../../components/UserPagination';
import useAdminUsers from '../../hooks/useAdminUsers';

const getRoleDisplayName = (role, currentLang) => {
  if (!role) return '';
  if (currentLang !== 'vi') {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }
  const roleMap = {
    admin: 'Quản trị viên',
    doctor: 'Bác sĩ',
    nurse: 'Điều dưỡng',
    receptionist: 'Lễ tân',
    pharmacist: 'Dược sĩ',
    patient: 'Bệnh nhân',
    guest: 'Khách'
  };
  return roleMap[role.toLowerCase()] || role;
};

export default function AdminUserManagementTab({ lang, t }) {
  const { success: toastSuccess, error: toastError } = useContext(ToastContext);
  
  const {
    usersList,
    userSearch,
    setUserSearch,
    userRoleFilter,
    setUserRoleFilter,
    userDeptFilter,
    setUserDeptFilter,
    showAddUserModal,
    setShowAddUserModal,
    newUserName,
    setNewUserName,
    newUserEmail,
    setNewUserEmail,
    newUserRole,
    setNewUserRole,
    newUserDept,
    setNewUserDept,
    openMenuUserId,
    setOpenMenuUserId,
    fetchUsers,
    handleAddUserSubmit,
    filteredUsers,
    token
  } = useAdminUsers(lang);

  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState({
    id: '',
    fullName: '',
    email: '',
    role: 'doctor',
    dept: 'Nội khoa',
    status: 'Sẵn sàng',
    phone: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [userSearch, userRoleFilter, userDeptFilter]);

  const handleEditInputChange = (field, value) => {
    setEditingUser(prev => ({ ...prev, [field]: value }));
  };

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    if (!editingUser.fullName.trim() || !editingUser.email.trim()) {
      toastError(lang === 'vi' ? 'Vui lòng điền đầy đủ thông tin!' : 'Please enter all required information!');
      return;
    }
    try {
      await adminService.updateUser(token, editingUser.id, {
        fullName: editingUser.fullName.trim(),
        email: editingUser.email.trim(),
        role: editingUser.role,
        dept: editingUser.dept,
        status: editingUser.status,
        phone: editingUser.phone ? editingUser.phone.trim() : null
      });
      toastSuccess(lang === 'vi' ? 'Cập nhật thông tin người dùng thành công!' : 'User profile updated successfully!');
      setShowEditUserModal(false);
      fetchUsers();
    } catch (err) {
      toastError(err.message || (lang === 'vi' ? 'Lỗi khi cập nhật người dùng' : 'Failed to update user'));
    }
  };

  const uniqueRoles = Array.from(new Set(usersList.map(u => u.role).filter(Boolean)));
  const uniqueDepts = Array.from(new Set(usersList.map(u => u.dept).filter(Boolean)));

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

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
          className="flex items-center gap-sm bg-primary text-on-primary px-lg py-sm rounded-lg font-label-md hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
          {t.addUser}
        </button>
      </div>

      {/* Dashboard Filters & Controls */}
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-8">
          <UserFilterBar
            lang={lang}
            userRoleFilter={userRoleFilter}
            setUserRoleFilter={setUserRoleFilter}
            userDeptFilter={userDeptFilter}
            setUserDeptFilter={setUserDeptFilter}
            userSearch={userSearch}
            setUserSearch={setUserSearch}
            uniqueRoles={uniqueRoles}
            uniqueDepts={uniqueDepts}
            getRoleDisplayName={getRoleDisplayName}
            fetchUsers={fetchUsers}
            handleExportExcel={() => exportToExcel(filteredUsers, lang)}
          />
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-md">
            <div className="p-sm bg-primary-fixed dark:bg-slate-700 rounded-lg">
              <span className="material-symbols-outlined text-primary">groups</span>
            </div>
            <div className="text-left">
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
      <UserTable
        paginatedUsers={paginatedUsers}
        getRoleDisplayName={getRoleDisplayName}
        openMenuUserId={openMenuUserId}
        setOpenMenuUserId={setOpenMenuUserId}
        setEditingUser={setEditingUser}
        setShowEditUserModal={setShowEditUserModal}
        token={token}
        fetchUsers={fetchUsers}
        lang={lang}
        t={t}
      />

      {/* Pagination Controls */}
      <UserPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        totalPages={totalPages}
        lang={lang}
      />

      {/* Add User Modal */}
      <ModalAddUserManagement
        showAddUserModal={showAddUserModal}
        setShowAddUserModal={setShowAddUserModal}
        newUserName={newUserName}
        setNewUserName={setNewUserName}
        newUserEmail={newUserEmail}
        setNewUserEmail={setNewUserEmail}
        newUserRole={newUserRole}
        setNewUserRole={setNewUserRole}
        newUserDept={newUserDept}
        setNewUserDept={setNewUserDept}
        handleAddUserSubmit={handleAddUserSubmit}
        lang={lang}
        t={t}
      />

      {/* Edit User Modal */}
      <ModalEditUserManagement
        showEditUserModal={showEditUserModal}
        setShowEditUserModal={setShowEditUserModal}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        handleEditInputChange={handleEditInputChange}
        handleEditUserSubmit={handleEditUserSubmit}
        lang={lang}
        t={t}
      />
    </div>
  );
}
