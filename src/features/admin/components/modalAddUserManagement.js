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

export default function modalAddUserManagement({
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
  handleAddUserSubmit,
  lang,
  t
}) {
  if (!showAddUserModal) return null;

  const handleRoleChange = (role) => {
    setNewUserRole(role);
    const depts = getDepartmentsForRole(role, lang);
    if (depts && depts.length > 0) {
      setNewUserDept(depts[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 w-full max-w-md p-6 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 text-left">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.addUser}</h3>
          <button
            onClick={() => setShowAddUserModal(false)}
            className="text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 p-1.5 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleAddUserSubmit} className="space-y-4">
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">{t.name} *</label>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="e.g. Dr. Arthur Conan"
              className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">{t.email} *</label>
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="e.g. a.conan@medcore.com"
              className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300">{t.role}</label>
              <select
                value={newUserRole}
                onChange={(e) => handleRoleChange(e.target.value)}
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
                value={newUserDept}
                onChange={(e) => setNewUserDept(e.target.value)}
                className="border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-2.5 outline-none dark:text-white text-body-md"
              >
                {getDepartmentsForRole(newUserRole, lang).map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-outline-variant dark:border-slate-700 flex justify-end gap-md">
            <button
              type="button"
              onClick={() => setShowAddUserModal(false)}
              className="px-4 py-2 border border-outline dark:border-slate-700 text-on-surface dark:text-slate-200 font-label-md rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white font-label-md rounded-lg hover:bg-surface-tint transition-colors active:scale-95"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
