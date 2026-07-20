import { useState, useEffect, useContext, useCallback } from 'react';
import adminService from '../services/adminService';
import { AuthContext } from '../../auth/context/AuthContext';
import { ToastContext } from '../../../shared/context/ToastContext';

export default function useAdminUsers(lang) {
  const { token } = useContext(AuthContext);
  const { success: toastSuccess, error: toastError } = useContext(ToastContext);

  const [usersList, setUsersList] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [userDeptFilter, setUserDeptFilter] = useState('All');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('doctor');
  const [newUserDept, setNewUserDept] = useState('Nội khoa');
  const [openMenuUserId, setOpenMenuUserId] = useState(null);

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    try {
      const data = await adminService.getUsers(token, {});
      setUsersList(data);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      toastError(lang === 'vi' ? 'Vui lòng điền đầy đủ thông tin!' : 'Please enter all information!');
      return;
    }
    try {
      await adminService.createUser(token, {
        fullName: newUserName.trim(),
        email: newUserEmail.trim(),
        role: newUserRole,
        dept: newUserDept,
        status: 'Sẵn sàng',
        password: 'password123'
      });
      toastSuccess(lang === 'vi' ? 'Thêm người dùng mới thành công!' : 'New user created successfully!');
      setNewUserName('');
      setNewUserEmail('');
      setShowAddUserModal(false);
      fetchUsers();
    } catch (err) {
      toastError(err.message || (lang === 'vi' ? 'Lỗi khi thêm người dùng mới' : 'Failed to create user'));
    }
  };

  const filteredUsers = usersList.filter(u => {
    const name = u.fullName || u.name || '';
    const email = u.email || '';
    const matchSearch =
      name.toLowerCase().includes(userSearch.toLowerCase()) ||
      email.toLowerCase().includes(userSearch.toLowerCase());

    const matchRole = userRoleFilter === 'All' || u.role === userRoleFilter;
    const matchDept = userDeptFilter === 'All' || u.dept === userDeptFilter;

    return matchSearch && matchRole && matchDept;
  });

  return {
    usersList,
    setUsersList,
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
  };
}
