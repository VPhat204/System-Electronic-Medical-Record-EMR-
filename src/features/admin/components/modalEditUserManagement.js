import React from 'react';

const getDepartmentsForRole = (role, currentLang) => {
  const isVi = currentLang === 'vi';
  switch (role) {
    case 'doctor':
      return isVi
        ? ['Nội khoa', 'Ngoại khoa', 'Nhi khoa', 'Cấp cứu', 'Xét nghiệm', 'Chẩn đoán hình ảnh']
        : ['Internal Medicine', 'Surgery', 'Pediatrics', 'Emergency', 'Laboratory', 'Imaging'];
    case 'nurse':
      return isVi
        ? ['Khoa Nội', 'Khoa Ngoại', 'Khoa Nhi', 'Cấp cứu', 'Hồi sức tích cực']
        : ['Internal Medicine Ward', 'Surgery Ward', 'Pediatrics Ward', 'Emergency Room', 'ICU'];
    case 'receptionist':
      return isVi
        ? ['Quầy đón tiếp', 'Phòng Hành chính', 'Chăm sóc khách hàng']
        : ['Front Desk', 'Administration', 'Customer Service'];
    case 'pharmacist':
      return isVi
        ? ['Khoa Dược', 'Nhà thuốc bệnh viện']
        : ['Main Pharmacy', 'Inpatient Pharmacy'];
    case 'admin':
      return isVi
        ? ['Công nghệ thông tin', 'Hành chính', 'Ban giám đốc']
        : ['IT Department', 'Administration', 'Board of Directors'];
    case 'patient':
    default:
      return isVi ? ['Không'] : ['None'];
  }
};

export default function modalEditUserManagement({
  showEditUserModal,
  setShowEditUserModal,
  editingUser,
  setEditingUser,
  handleEditInputChange,
  handleEditUserSubmit,
  lang,
  t
}) {
  if (!showEditUserModal) return null;

  const handleEditRoleChange = (role) => {
    const depts = getDepartmentsForRole(role, lang);
    const defaultDept = depts && depts.length > 0 ? depts[0] : '';
    setEditingUser(prev => ({
      ...prev,
      role: role,
      dept: defaultDept
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 w-full max-w-md p-6 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 text-left">
        <div className="flex justify-between items-center mb-6 select-none">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">
            {lang === 'vi' ? 'Sửa thông tin tài khoản' : 'Edit User Profile'}
          </h3>
          <button
            onClick={() => setShowEditUserModal(false)}
            className="text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 p-1.5 rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleEditUserSubmit} className="space-y-4">
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">
              {lang === 'vi' ? 'Họ và tên' : 'Full Name'} *
            </label>
            <input
              type="text"
              value={editingUser.fullName}
              onChange={(e) => handleEditInputChange('fullName', e.target.value)}
              className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">
              {lang === 'vi' ? 'Email' : 'Email Address'} *
            </label>
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => handleEditInputChange('email', e.target.value)}
              className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">
              {lang === 'vi' ? 'Số điện thoại' : 'Phone Number'}
            </label>
            <input
              type="text"
              value={editingUser.phone}
              onChange={(e) => handleEditInputChange('phone', e.target.value)}
              className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">{t.role}</label>
              <select
                value={editingUser.role}
                onChange={(e) => handleEditRoleChange(e.target.value)}
                className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md"
              >
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="receptionist">Receptionist</option>
                <option value="pharmacist">Pharmacist</option>
                <option value="admin">Admin</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">{t.department}</label>
              <select
                value={editingUser.dept || ''}
                onChange={(e) => handleEditInputChange('dept', e.target.value)}
                className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md"
              >
                {getDepartmentsForRole(editingUser.role, lang).map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">{t.status}</label>
            <select
              value={editingUser.status}
              onChange={(e) => handleEditInputChange('status', e.target.value)}
              className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md w-full"
            >
              <option value="Sẵn sàng">{lang === 'vi' ? 'Sẵn sàng' : 'Ready'}</option>
              <option value="Đang trực">{lang === 'vi' ? 'Đang trực' : 'On-Duty'}</option>
              <option value="Ngoại tuyến">{lang === 'vi' ? 'Ngoại tuyến' : 'Offline'}</option>
            </select>
          </div>

          <div className="pt-6 border-t border-outline-variant dark:border-slate-700 flex justify-end gap-md select-none">
            <button
              type="button"
              onClick={() => setShowEditUserModal(false)}
              className="px-4 py-2 border border-outline dark:border-slate-700 text-on-surface dark:text-slate-200 font-label-md rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white font-label-md rounded-lg hover:bg-surface-tint transition-colors active:scale-95 cursor-pointer"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
