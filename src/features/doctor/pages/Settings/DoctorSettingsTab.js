import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../../auth/context/AuthContext';
import { ToastContext } from '../../../../shared/context/ToastContext';

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
  const { getUserProfile, updateUserProfile, updateUserSettings } = useContext(AuthContext);
  const { success, error } = useContext(ToastContext);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [lookups, setLookups] = useState({ departments: [], credentials: [], specializations: [], rooms: [] });
  const [isEditing, setIsEditing] = useState(false);

  // Doctor Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [street, setStreet] = useState('');

  // Doctor Profile fields
  const [credentialId, setCredentialId] = useState('');
  const [specializationId, setSpecializationId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [yearOfExperience, setYearOfExperience] = useState('');
  const [biography, setBiography] = useState('');
  const [consultationFee, setConsultationFee] = useState('');

  const fileInputRef = useRef(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile();
      if (data) {
        setProfile(data.user);
        setLookups(data.lookups || { departments: [], credentials: [], specializations: [], rooms: [] });

        setFullName(data.user.fullName || '');
        setPhone(data.user.phone || '');
        setDob(data.user.dob || '');
        setGender(data.user.gender || 'male');
        setProvince(data.user.province || '');
        setDistrict(data.user.district || '');
        setWard(data.user.ward || '');
        setStreet(data.user.street || '');

        const docProf = data.user.doctorProfile || {};
        setCredentialId(docProf.credentialId || '');
        setSpecializationId(docProf.specializationId || '');
        setDepartmentId(docProf.departmentId || '');
        setRoomId(docProf.roomId || '');
        setLicenseNumber(docProf.licenseNumber || '');
        setYearOfExperience(docProf.yearOfExperience || '');
        setBiography(docProf.biography || '');
        setConsultationFee(docProf.consultationFee || '');
      }
    } catch (err) {
      error(lang === 'vi' ? 'Không thể tải thông tin profile.' : 'Failed to load profile details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUserProfile({
        fullName,
        phone,
        dob: dob || null,
        gender,
        province,
        district,
        ward,
        street,
        profileData: {
          credentialId: credentialId ? Number(credentialId) : null,
          specializationId: specializationId ? Number(specializationId) : null,
          departmentId: departmentId ? Number(departmentId) : null,
          roomId: roomId ? Number(roomId) : null,
          licenseNumber,
          yearOfExperience: yearOfExperience ? Number(yearOfExperience) : null,
          biography,
          consultationFee: consultationFee ? Number(consultationFee) : null
        }
      });
      success(lang === 'vi' ? 'Cập nhật hồ sơ bác sĩ thành công!' : 'Physician profile updated successfully!');
      setIsEditing(false);
      await loadData();
    } catch (err) {
      error(err.message || (lang === 'vi' ? 'Cập nhật thất bại.' : 'Update failed.'));
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      error(lang === 'vi' ? 'Vui lòng chọn ảnh nhỏ hơn 2MB.' : 'Please select an image smaller than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64String = reader.result;
        await updateUserSettings({ avatar: base64String });
        success(lang === 'vi' ? 'Cập nhật ảnh đại diện thành công!' : 'Avatar updated successfully!');
        await loadData();
      } catch (err) {
        error(lang === 'vi' ? 'Cập nhật ảnh đại diện thất bại.' : 'Failed to update avatar.');
      }
    };
    reader.readAsDataURL(file);
  };

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
            <div className="space-y-gutter animate-in fade-in duration-200 text-left">
              {loading && !profile ? (
                <div className="flex items-center justify-center p-xl min-h-[300px]">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
              ) : isEditing ? (
                // ── DOCTOR PROFILE EDIT FORM ──
                <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs space-y-lg">
                  <div className="flex items-center justify-between border-b border-outline-variant dark:border-slate-700 pb-md">
                    <h3 className="text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
                      {lang === 'vi' ? 'Chỉnh Sửa Hồ Sơ Bác Sĩ' : 'Edit Physician Profile'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="text-on-surface-variant dark:text-slate-400 font-label-md hover:underline"
                    >
                      {lang === 'vi' ? 'Hủy' : 'Cancel'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
                    {/* Basic info */}
                    <div className="space-y-sm">
                      <label className="text-label-md font-bold text-outline uppercase">{lang === 'vi' ? 'Họ và tên' : 'Full Name'}</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                      />
                    </div>
                    <div className="space-y-sm">
                      <label className="text-label-md font-bold text-outline uppercase">{lang === 'vi' ? 'Số điện thoại' : 'Phone'}</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                      />
                    </div>
                    <div className="space-y-sm">
                      <label className="text-label-md font-bold text-outline uppercase">{lang === 'vi' ? 'Ngày sinh' : 'Date of Birth'}</label>
                      <input
                        type="date"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                        className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                      />
                    </div>
                    <div className="space-y-sm">
                      <label className="text-label-md font-bold text-outline uppercase">{lang === 'vi' ? 'Giới tính' : 'Gender'}</label>
                      <select
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800"
                      >
                        <option value="male">{lang === 'vi' ? 'Nam' : 'Male'}</option>
                        <option value="female">{lang === 'vi' ? 'Nữ' : 'Female'}</option>
                      </select>
                    </div>

                    {/* Doctor specific */}
                    <div className="space-y-sm">
                      <label className="text-label-md font-bold text-outline uppercase">{lang === 'vi' ? 'Số giấy phép hành nghề' : 'License Number'}</label>
                      <input
                        type="text"
                        value={licenseNumber}
                        onChange={e => setLicenseNumber(e.target.value)}
                        className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                      />
                    </div>
                    <div className="space-y-sm">
                      <label className="text-label-md font-bold text-outline uppercase">{lang === 'vi' ? 'Số năm kinh nghiệm' : 'Years of Experience'}</label>
                      <input
                        type="number"
                        value={yearOfExperience}
                        onChange={e => setYearOfExperience(e.target.value)}
                        className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                      />
                    </div>
                    <div className="space-y-sm">
                      <label className="text-label-md font-bold text-outline uppercase">{lang === 'vi' ? 'Học vị / Học hàm' : 'Credentials / Academic Title'}</label>
                      <select
                        value={credentialId}
                        onChange={e => setCredentialId(e.target.value)}
                        className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800"
                      >
                        <option value="">{lang === 'vi' ? '-- Chọn chức danh --' : '-- Select credential --'}</option>
                        {lookups.credentials.map(c => (
                          <option key={c.id} value={c.id}>{c.CredentialName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-sm">
                      <label className="text-label-md font-bold text-outline uppercase">{lang === 'vi' ? 'Chuyên khoa sâu' : 'Specialization'}</label>
                      <select
                        value={specializationId}
                        onChange={e => setSpecializationId(e.target.value)}
                        className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800"
                      >
                        <option value="">{lang === 'vi' ? '-- Chọn chuyên khoa --' : '-- Select specialty --'}</option>
                        {lookups.specializations.map(s => (
                          <option key={s.id} value={s.id}>{s.SpecializationName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-sm">
                      <label className="text-label-md font-bold text-outline uppercase">{lang === 'vi' ? 'Khoa công tác' : 'Department'}</label>
                      <select
                        value={departmentId}
                        onChange={e => setDepartmentId(e.target.value)}
                        className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800"
                      >
                        <option value="">{lang === 'vi' ? '-- Chọn khoa --' : '-- Select department --'}</option>
                        {lookups.departments.map(d => (
                          <option key={d.id} value={d.id}>{d.DepartmentName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-sm">
                      <label className="text-label-md font-bold text-outline uppercase">{lang === 'vi' ? 'Phòng khám bệnh' : 'Room Location'}</label>
                      <select
                        value={roomId}
                        onChange={e => setRoomId(e.target.value)}
                        className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800"
                      >
                        <option value="">{lang === 'vi' ? '-- Chọn phòng khám --' : '-- Select room --'}</option>
                        {lookups.rooms.map(r => (
                          <option key={r.id} value={r.id}>{r.RoomName} ({r.RoomCode})</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-sm">
                      <label className="text-label-md font-bold text-outline uppercase">{lang === 'vi' ? 'Phí tư vấn / khám (VND)' : 'Consultation Fee (VND)'}</label>
                      <input
                        type="number"
                        value={consultationFee}
                        onChange={e => setConsultationFee(e.target.value)}
                        className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-sm">
                      <label className="text-label-md font-bold text-outline uppercase">{lang === 'vi' ? 'Tiểu sử tóm tắt' : 'Professional Biography'}</label>
                      <textarea
                        rows={3}
                        value={biography}
                        onChange={e => setBiography(e.target.value)}
                        className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-md pt-md border-t border-outline-variant dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-lg py-2 border border-outline rounded-lg text-on-surface dark:text-slate-300 font-label-md"
                    >
                      {lang === 'vi' ? 'Hủy' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-lg py-2 bg-primary text-white font-label-md rounded-lg hover:bg-primary-hover shadow-sm"
                    >
                      {lang === 'vi' ? 'Lưu hồ sơ' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              ) : (
                // ── DOCTOR PROFILE VIEW MODE ──
                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-md mb-lg">
                    <div className="flex flex-col sm:flex-row gap-lg items-center text-center sm:text-left">
                      <div onClick={() => fileInputRef.current.click()} className="relative group cursor-pointer shrink-0">
                        <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                        <img
                          className="w-24 h-24 rounded-xl border border-outline-variant dark:border-slate-700 object-cover"
                          alt="Physician portrait"
                          src={profile?.avatar ? (profile.avatar.startsWith('http') || profile.avatar.startsWith('data:image') ? profile.avatar : `http://localhost:5000${profile.avatar}`) : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwo2C_dk0HpwFKTj4wKewVviyYkbYQz5hKgbX0B5qb1THrUqzrllVUp6S-j8Nn52jKu4IIwDQWg-NdtbXP7V79F1o5L2JTynJImEjQqz8Doz18ihOvxIC4p6ndawaKQEle39nuMPJF1L67lIl-qIGkeq3-hJ8E8BzNA22t5MIzXvflazLoE7oYn0kUXqcF2EBwMYySIVeubwZPGv0sBbqd84GImY1wLXJUxjNEux-FRl0uMMGv3zjx'}
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-white">photo_camera</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">
                          {profile?.fullName || 'Julian Reed'}
                        </h3>
                        <p className="text-body-md text-on-surface-variant dark:text-slate-400">
                          {lang === 'vi' ? 'Số giấy phép: ' : 'License: '} {licenseNumber || '#N/A'}
                        </p>
                        <span className="inline-block mt-sm bg-primary-fixed text-primary dark:text-teal-900 px-sm py-xs rounded text-body-sm font-bold border border-primary/10">
                          {profile?.doctorProfile?.credential?.CredentialName || (lang === 'vi' ? 'Bác sĩ trực' : 'Attending Physician')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsEditing(true)}
                      className="border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim px-md py-sm rounded font-label-md text-label-md hover:bg-primary-fixed/20 transition-colors w-full sm:w-auto"
                    >
                      {lang === 'vi' ? 'Chỉnh sửa Profile' : 'Edit Profile'}
                    </button>
                  </div>

                  {/* Fields details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg pt-lg border-t border-outline-variant dark:border-slate-700">
                    <div className="space-y-base">
                      <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">
                        {lang === 'vi' ? 'Họ và tên bác sĩ' : 'Full Legal Name'}
                      </label>
                      <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                        {profile?.fullName}
                      </p>
                    </div>

                    <div className="space-y-base">
                      <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">
                        {lang === 'vi' ? 'Hộp thư Email' : 'Primary Email'}
                      </label>
                      <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                        {profile?.email}
                      </p>
                    </div>

                    <div className="space-y-base">
                      <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">
                        {lang === 'vi' ? 'Chuyên khoa' : 'Specialty'}
                      </label>
                      <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                        {profile?.doctorProfile?.specialization?.SpecializationName || (lang === 'vi' ? 'Chưa cập nhật' : 'Not set')}
                      </p>
                    </div>

                    <div className="space-y-base">
                      <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">
                        {lang === 'vi' ? 'Khoa công tác & Phòng khám' : 'Department & Room'}
                      </label>
                      <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                        {profile?.doctorProfile?.department?.DepartmentName || 'N/A'} - {profile?.doctorProfile?.room?.RoomName || 'N/A'}
                      </p>
                    </div>

                    <div className="space-y-base">
                      <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">
                        {lang === 'vi' ? 'Số năm kinh nghiệm' : 'Years of Experience'}
                      </label>
                      <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                        {yearOfExperience ? `${yearOfExperience} ` + (lang === 'vi' ? 'năm kinh nghiệm' : 'years') : 'N/A'}
                      </p>
                    </div>

                    <div className="space-y-base">
                      <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">
                        {lang === 'vi' ? 'Phí tư vấn' : 'Consultation Fee'}
                      </label>
                      <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200 font-data-mono">
                        {consultationFee ? Number(consultationFee).toLocaleString() + ' VND' : 'N/A'}
                      </p>
                    </div>

                    <div className="sm:col-span-2 space-y-base">
                      <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">
                        {lang === 'vi' ? 'Tiểu sử tóm tắt' : 'Professional Biography'}
                      </label>
                      <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200 leading-relaxed whitespace-pre-line">
                        {biography || (lang === 'vi' ? 'Chưa cập nhật tiểu sử' : 'No biography added yet.')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter mt-lg">

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
