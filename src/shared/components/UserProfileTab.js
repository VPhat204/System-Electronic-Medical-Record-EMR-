import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../features/auth/context/AuthContext';
import { ToastContext } from '../context/ToastContext';

export default function UserProfileTab({ lang, t }) {
  const { user, verifyAccount, resendOtp, updateUserSettings, getUserProfile, updateUserProfile } = useContext(AuthContext);
  const { success, error } = useContext(ToastContext);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [lookups, setLookups] = useState({ departments: [], credentials: [], specializations: [], rooms: [] });
  const [isEditing, setIsEditing] = useState(false);

  // General Form states (User table)
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [street, setStreet] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelationship, setEmergencyRelationship] = useState('vo-chong');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Role specific states (depends on user.role)
  const [bloodType, setBloodType] = useState('O+');
  const [allergies, setAllergies] = useState('');
  const [chronicDiseases, setChronicDiseases] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [insuranceExpiry, setInsuranceExpiry] = useState('');

  const [credentialId, setCredentialId] = useState('');
  const [specializationId, setSpecializationId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [yearOfExperience, setYearOfExperience] = useState('');
  const [biography, setBiography] = useState('');
  const [consultationFee, setConsultationFee] = useState('');
  const [shiftType, setShiftType] = useState('Ca sang');
  const [adminLevel, setAdminLevel] = useState('standard');

  const [otpCode, setOtpCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [localVerified, setLocalVerified] = useState(user?.isVerified || false);

  const fileInputRef = useRef(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile();
      if (data) {
        setProfile(data.user);
        setLookups(data.lookups || { departments: [], credentials: [], specializations: [], rooms: [] });

        // General
        setFullName(data.user.fullName || '');
        setPhone(data.user.phone || '');
        setDob(data.user.dob || '');
        setGender(data.user.gender || 'male');
        setProvince(data.user.province || '');
        setDistrict(data.user.district || '');
        setWard(data.user.ward || '');
        setStreet(data.user.street || '');
        setEmergencyName(data.user.emergencyName || '');
        setEmergencyRelationship(data.user.emergencyRelationship || 'vo-chong');
        setEmergencyPhone(data.user.emergencyPhone || '');

        const role = data.user.role;
        if (role === 'patient') {
          const pat = data.user.patientProfile || {};
          setBloodType(pat.bloodType || 'O+');
          setAllergies(pat.allergies || '');
          setChronicDiseases(pat.chronicDiseases || '');
          setInsuranceNumber(pat.insuranceNumber || '');
          setInsuranceProvider(pat.insuranceProvider || '');
          setInsuranceExpiry(pat.insuranceExpiry || '');
        } else if (role === 'doctor') {
          const doc = data.user.doctorProfile || {};
          setCredentialId(doc.credentialId || '');
          setSpecializationId(doc.specializationId || '');
          setDepartmentId(doc.departmentId || '');
          setRoomId(doc.roomId || '');
          setLicenseNumber(doc.licenseNumber || '');
          setYearOfExperience(doc.yearOfExperience || '');
          setBiography(doc.biography || '');
          setConsultationFee(doc.consultationFee || '');
        } else if (role === 'nurse') {
          const nur = data.user.nurseProfile || {};
          setCredentialId(nur.credentialId || '');
          setDepartmentId(nur.departmentId || '');
          setRoomId(nur.roomId || '');
          setShiftType(nur.shiftType || 'Ca sang');
        } else if (role === 'pharmacist') {
          const phar = data.user.pharmacistProfile || {};
          setCredentialId(phar.credentialId || '');
          setDepartmentId(phar.departmentId || '');
          setLicenseNumber(phar.licenseNumber || '');
        } else if (role === 'receptionist') {
          const rec = data.user.receptionistProfile || {};
          setDepartmentId(rec.departmentId || '');
          setShiftType(rec.shiftType || 'Ca sang');
        } else if (role === 'admin') {
          const adm = data.user.adminProfile || {};
          setAdminLevel(adm.adminLevel || 'standard');
        }
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
      const role = user?.role;
      let roleProfileData = {};

      if (role === 'patient') {
        roleProfileData = {
          bloodType, allergies, chronicDiseases,
          insuranceNumber, insuranceProvider,
          insuranceExpiry: insuranceExpiry || null
        };
      } else if (role === 'doctor') {
        roleProfileData = {
          credentialId: credentialId ? Number(credentialId) : null,
          specializationId: specializationId ? Number(specializationId) : null,
          departmentId: departmentId ? Number(departmentId) : null,
          roomId: roomId ? Number(roomId) : null,
          licenseNumber,
          yearOfExperience: yearOfExperience ? Number(yearOfExperience) : null,
          biography,
          consultationFee: consultationFee ? Number(consultationFee) : null
        };
      } else if (role === 'nurse') {
        roleProfileData = {
          credentialId: credentialId ? Number(credentialId) : null,
          departmentId: departmentId ? Number(departmentId) : null,
          roomId: roomId ? Number(roomId) : null,
          shiftType
        };
      } else if (role === 'pharmacist') {
        roleProfileData = {
          credentialId: credentialId ? Number(credentialId) : null,
          departmentId: departmentId ? Number(departmentId) : null,
          licenseNumber
        };
      } else if (role === 'receptionist') {
        roleProfileData = {
          departmentId: departmentId ? Number(departmentId) : null,
          shiftType
        };
      } else if (role === 'admin') {
        roleProfileData = {
          adminLevel
        };
      }

      await updateUserProfile({
        fullName, phone, dob: dob || null, gender,
        province, district, ward, street,
        emergencyName, emergencyRelationship, emergencyPhone,
        profileData: roleProfileData
      });

      success(lang === 'vi' ? 'Cập nhật thông tin profile thành công!' : 'Profile updated successfully!');
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
      error(lang === 'vi' ? 'Ảnh quá lớn. Giới hạn 2MB.' : 'Image size limit 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await updateUserSettings({ avatar: reader.result });
        success(lang === 'vi' ? 'Đã đổi ảnh đại diện thành công!' : 'Avatar changed successfully!');
        await loadData();
      } catch (err) {
        error(lang === 'vi' ? 'Đổi ảnh đại diện thất bại.' : 'Failed to update avatar.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 6) return;
    setVerifying(true);
    try {
      await verifyAccount(user?.email, otpCode);
      setLocalVerified(true);
      success(lang === 'vi' ? 'Xác thực tài khoản thành công!' : 'Account verified successfully!');
    } catch (err) {
      error(lang === 'vi' ? 'Sai mã OTP.' : 'Invalid OTP.');
    } finally {
      setVerifying(false);
    }
  };

  const handleRequestOtp = async () => {
    setSendingOtp(true);
    try {
      await resendOtp(user?.email);
      success(lang === 'vi' ? 'Mã OTP mới đã gửi đến Email!' : 'New OTP code sent!');
    } catch (err) {
      error(lang === 'vi' ? 'Gửi OTP thất bại.' : 'OTP request failed.');
    } finally {
      setSendingOtp(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center p-xl min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  const role = user?.role;

  return (
    <div className="space-y-lg text-left">
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700">
        <div>
          <h3 className="text-headline-md font-bold text-on-surface dark:text-white uppercase">
            {lang === 'vi' ? `HỒ SƠ CÁ NHÂN (${role})` : `PERSONAL PROFILE (${role})`}
          </h3>
          <p className="text-body-sm text-outline dark:text-slate-400">
            {lang === 'vi' ? 'Quản lý thông tin định danh và chuyên môn y tế' : 'Manage legal identity and medical credentials'}
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-xs px-md py-2 rounded-lg font-label-md transition-all ${
            isEditing 
              ? 'bg-outline-variant dark:bg-slate-700 text-on-surface dark:text-white' 
              : 'bg-primary text-white hover:bg-primary-hover shadow-sm'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isEditing ? 'close' : 'edit'}
          </span>
          {isEditing ? (lang === 'vi' ? 'Hủy' : 'Cancel') : (lang === 'vi' ? 'Chỉnh sửa' : 'Edit Profile')}
        </button>
      </div>

      {isEditing ? (
        // ── EDIT MODE ──
        <form onSubmit={handleSave} className="space-y-lg bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            
            {/* General Fields */}
            <div className="space-y-md">
              <h4 className="font-bold text-primary dark:text-primary-fixed-dim border-b border-outline-variant dark:border-slate-700 pb-sm uppercase text-sm">
                {lang === 'vi' ? 'Thông tin cơ bản' : 'Basic Identity'}
              </h4>
              <div className="grid grid-cols-2 gap-md">
                <div className="col-span-2 space-y-xs">
                  <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Họ và tên' : 'Full Name'}</label>
                  <input type="text" required value={fullName} onChange={e=>setFullName(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                </div>
                <div className="space-y-xs">
                  <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Số điện thoại' : 'Phone'}</label>
                  <input type="text" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                </div>
                <div className="space-y-xs">
                  <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Ngày sinh' : 'Date of Birth'}</label>
                  <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                </div>
                <div className="space-y-xs">
                  <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Giới tính' : 'Gender'}</label>
                  <select value={gender} onChange={e=>setGender(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                    <option value="male">{lang === 'vi' ? 'Nam' : 'Male'}</option>
                    <option value="female">{lang === 'vi' ? 'Nữ' : 'Female'}</option>
                  </select>
                </div>
                <div className="space-y-xs">
                  <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'CCCD / ID Card' : 'ID Card Number'}</label>
                  <input type="text" value={idNumber} onChange={e=>setIdNumber(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                </div>
              </div>

              {/* Address Fields */}
              <div className="pt-md space-y-md border-t border-outline-variant dark:border-slate-700">
                <p className="text-xs font-bold text-outline uppercase">{lang === 'vi' ? 'Địa chỉ liên hệ' : 'Address Info'}</p>
                <div className="grid grid-cols-2 gap-md">
                  <input type="text" placeholder={lang === 'vi' ? 'Tỉnh/Thành' : 'Province'} value={province} onChange={e=>setProvince(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  <input type="text" placeholder={lang === 'vi' ? 'Quận/Huyện' : 'District'} value={district} onChange={e=>setDistrict(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  <input type="text" placeholder={lang === 'vi' ? 'Phường/Xã' : 'Ward'} value={ward} onChange={e=>setWard(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  <input type="text" placeholder={lang === 'vi' ? 'Đường/Số nhà' : 'Street'} value={street} onChange={e=>setStreet(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                </div>
              </div>
            </div>

            {/* Role Specific Fields */}
            <div className="space-y-md">
              <h4 className="font-bold text-tertiary dark:text-amber-500 border-b border-outline-variant dark:border-slate-700 pb-sm uppercase text-sm">
                {lang === 'vi' ? 'Thông tin chuyên môn y tế' : 'Medical & Professional Info'}
              </h4>

              {role === 'patient' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Nhóm máu' : 'Blood type'}</label>
                    <select value={bloodType} onChange={e=>setBloodType(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => <option key={bt} value={bt}>{bt}</option>)}
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Số thẻ bảo hiểm' : 'Insurance Card No.'}</label>
                    <input type="text" value={insuranceNumber} onChange={e=>setInsuranceNumber(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Nhà bảo hiểm' : 'Provider'}</label>
                    <input type="text" value={insuranceProvider} onChange={e=>setInsuranceProvider(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Ngày hết hạn BHYT' : 'Expiry'}</label>
                    <input type="date" value={insuranceExpiry} onChange={e=>setInsuranceExpiry(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                  <div className="col-span-2 space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Dị ứng thuốc/thức ăn' : 'Allergies'}</label>
                    <textarea rows={2} value={allergies} onChange={e=>setAllergies(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white resize-none" />
                  </div>
                </div>
              )}

              {role === 'doctor' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Học vị' : 'Academic title'}</label>
                    <select value={credentialId} onChange={e=>setCredentialId(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      <option value="">-- Choose credential --</option>
                      {lookups.credentials.map(c => <option key={c.id} value={c.id}>{c.CredentialName}</option>)}
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Chuyên khoa' : 'Specialization'}</label>
                    <select value={specializationId} onChange={e=>setSpecializationId(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      <option value="">-- Choose specialty --</option>
                      {lookups.specializations.map(s => <option key={s.id} value={s.id}>{s.SpecializationName}</option>)}
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Khoa công tác' : 'Department'}</label>
                    <select value={departmentId} onChange={e=>setDepartmentId(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      <option value="">-- Choose department --</option>
                      {lookups.departments.map(d => <option key={d.id} value={d.id}>{d.DepartmentName}</option>)}
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Phòng khám bệnh' : 'Room location'}</label>
                    <select value={roomId} onChange={e=>setRoomId(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      <option value="">-- Choose room --</option>
                      {lookups.rooms.map(r => <option key={r.id} value={r.id}>{r.RoomName} ({r.RoomCode})</option>)}
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Số năm kinh nghiệm' : 'Years of Exp'}</label>
                    <input type="number" value={yearOfExperience} onChange={e=>setYearOfExperience(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Mã giấy phép' : 'License Number'}</label>
                    <input type="text" value={licenseNumber} onChange={e=>setLicenseNumber(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Phí tư vấn' : 'Consult Fee'}</label>
                    <input type="number" value={consultationFee} onChange={e=>setConsultationFee(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                </div>
              )}

              {role === 'nurse' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Học vị Điều dưỡng' : 'Credential'}</label>
                    <select value={credentialId} onChange={e=>setCredentialId(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      <option value="">-- Choose credential --</option>
                      {lookups.credentials.map(c => <option key={c.id} value={c.id}>{c.CredentialName}</option>)}
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Khoa công tác' : 'Department'}</label>
                    <select value={departmentId} onChange={e=>setDepartmentId(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      <option value="">-- Choose department --</option>
                      {lookups.departments.map(d => <option key={d.id} value={d.id}>{d.DepartmentName}</option>)}
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Trực tại phòng' : 'Room Location'}</label>
                    <select value={roomId} onChange={e=>setRoomId(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      <option value="">-- Choose room --</option>
                      {lookups.rooms.map(r => <option key={r.id} value={r.id}>{r.RoomName}</option>)}
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Ca trực thường trực' : 'Default Shift'}</label>
                    <select value={shiftType} onChange={e=>setShiftType(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      <option value="Ca sang">{lang === 'vi' ? 'Ca Sáng' : 'Morning'}</option>
                      <option value="Ca chieu">{lang === 'vi' ? 'Ca Chiều' : 'Afternoon'}</option>
                      <option value="Ca toi">{lang === 'vi' ? 'Ca Tối (Đêm)' : 'Night'}</option>
                    </select>
                  </div>
                </div>
              )}

              {role === 'pharmacist' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Chứng chỉ dược' : 'Credential'}</label>
                    <select value={credentialId} onChange={e=>setCredentialId(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      <option value="">-- Choose credential --</option>
                      {lookups.credentials.map(c => <option key={c.id} value={c.id}>{c.CredentialName}</option>)}
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Khoa công tác' : 'Department'}</label>
                    <select value={departmentId} onChange={e=>setDepartmentId(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      <option value="">-- Choose department --</option>
                      {lookups.departments.map(d => <option key={d.id} value={d.id}>{d.DepartmentName}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2 space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Số giấy phép hành nghề dược' : 'Pharmacy License Number'}</label>
                    <input type="text" value={licenseNumber} onChange={e=>setLicenseNumber(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                </div>
              )}

              {role === 'receptionist' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Khoa làm việc' : 'Work Department'}</label>
                    <select value={departmentId} onChange={e=>setDepartmentId(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      <option value="">-- Choose department --</option>
                      {lookups.departments.map(d => <option key={d.id} value={d.id}>{d.DepartmentName}</option>)}
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Ca trực lễ tân' : 'Shift Type'}</label>
                    <select value={shiftType} onChange={e=>setShiftType(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                      <option value="Ca sang">{lang === 'vi' ? 'Ca Sáng' : 'Morning'}</option>
                      <option value="Ca chieu">{lang === 'vi' ? 'Ca Chiều' : 'Afternoon'}</option>
                      <option value="Ca toi">{lang === 'vi' ? 'Ca Đêm' : 'Night'}</option>
                    </select>
                  </div>
                </div>
              )}

              {role === 'admin' && (
                <div className="space-y-xs">
                  <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Cấp độ Quản trị viên' : 'Admin Level'}</label>
                  <select value={adminLevel} onChange={e=>setAdminLevel(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800">
                    <option value="super">{lang === 'vi' ? 'Cấp cao nhất (Super)' : 'Super Administrator'}</option>
                    <option value="manager">{lang === 'vi' ? 'Quản lý bộ phận' : 'Manager'}</option>
                    <option value="standard">{lang === 'vi' ? 'Nhân viên vận hành' : 'Standard Operator'}</option>
                  </select>
                </div>
              )}
            </div>

          </div>

          <div className="flex justify-end gap-md pt-md border-t border-outline-variant dark:border-slate-700 mt-md">
            <button type="button" onClick={() => setIsEditing(false)} className="px-lg py-2 border border-outline rounded-lg text-on-surface dark:text-slate-300 font-label-md">{lang === 'vi' ? 'Hủy' : 'Cancel'}</button>
            <button type="submit" className="px-lg py-2 bg-primary text-white font-label-md rounded-lg hover:bg-primary-hover shadow-sm">{lang === 'vi' ? 'Lưu thông tin' : 'Save Changes'}</button>
          </div>
        </form>
      ) : (
        // ── VIEW DETAILS MODE ──
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg animate-in fade-in duration-200">
          
          {/* Main Info Card */}
          <div className="md:col-span-8 space-y-lg">
            <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <div className="p-lg border-b border-outline-variant dark:border-slate-700">
                <h2 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim flex items-center gap-xs">
                  <span className="material-symbols-outlined">badge</span>
                  {lang === 'vi' ? 'Hồ Sơ Nhận Diện Cá Nhân' : 'Personal Identification'}
                </h2>
              </div>
              <div className="p-lg flex flex-col sm:flex-row gap-xl items-start">
                <div onClick={() => fileInputRef.current.click()} className="relative group cursor-pointer shrink-0">
                  <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container dark:border-slate-700 ring-1 ring-outline-variant shadow-md">
                    <img
                      className="w-full h-full object-cover"
                      alt="Avatar"
                      src={profile?.avatar ? (profile.avatar.startsWith('http') || profile.avatar.startsWith('data:image') ? profile.avatar : `http://localhost:5000${profile.avatar}`) : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwo2C_dk0HpwFKTj4wKewVviyYkbYQz5hKgbX0B5qb1THrUqzrllVUp6S-j8Nn52jKu4IIwDQWg-NdtbXP7V79F1o5L2JTynJImEjQqz8Doz18ihOvxIC4p6ndawaKQEle39nuMPJF1L67lIl-qIGkeq3-hJ8E8BzNA22t5MIzXvflazLoE7oYn0kUXqcF2EBwMYySIVeubwZPGv0sBbqd84GImY1wLXJUxjNEux-FRl0uMMGv3zjx'}
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  </div>
                </div>

                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-md w-full">
                  <div>
                    <p className="text-xs font-bold text-outline uppercase">{lang === 'vi' ? 'Họ và Tên' : 'Full Name'}</p>
                    <p className="font-headline-md text-on-surface dark:text-white mt-1">{profile?.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-outline uppercase">{lang === 'vi' ? 'Số điện thoại' : 'Phone'}</p>
                    <p className="font-body-lg text-on-surface dark:text-slate-300 mt-1">{profile?.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-outline uppercase">{lang === 'vi' ? 'Ngày sinh' : 'Date of Birth'}</p>
                    <p className="font-body-lg text-on-surface dark:text-slate-300 mt-1">{profile?.dob || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-outline uppercase">{lang === 'vi' ? 'Giới tính' : 'Gender'}</p>
                    <p className="font-body-lg text-on-surface dark:text-slate-300 mt-1">
                      {profile?.gender === 'male' ? (lang === 'vi' ? 'Nam' : 'Male') : profile?.gender === 'female' ? (lang === 'vi' ? 'Nữ' : 'Female') : (profile?.gender || 'N/A')}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs font-bold text-outline uppercase">{lang === 'vi' ? 'Địa chỉ' : 'Address'}</p>
                    <p className="font-body-lg text-on-surface dark:text-slate-300 mt-1">
                      {province || district || ward || street ? `${street ? street + ', ' : ''}${ward ? ward + ', ' : ''}${district ? district + ', ' : ''}${province ? province : ''}` : (lang === 'vi' ? 'Chưa cập nhật địa chỉ' : 'Not set')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Role Specific Details View */}
            <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <div className="p-lg border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/50">
                <h2 className="font-headline-md text-headline-md text-tertiary dark:text-amber-500 flex items-center gap-xs">
                  <span className="material-symbols-outlined">medical_information</span>
                  {lang === 'vi' ? 'Thông tin nghiệp vụ y khoa' : 'Medical Credentials & Workplaces'}
                </h2>
              </div>
              
              <div className="p-lg">
                {role === 'patient' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
                    <div className="flex justify-between items-center p-md bg-slate-50 dark:bg-slate-900/40 rounded-lg">
                      <span className="font-label-md text-outline">{lang === 'vi' ? 'Nhóm máu' : 'Blood Group'}</span>
                      <span className="font-headline-sm font-bold text-error">{bloodType}</span>
                    </div>
                    <div className="flex justify-between items-center p-md bg-slate-50 dark:bg-slate-900/40 rounded-lg">
                      <span className="font-label-md text-outline">{lang === 'vi' ? 'Số BHYT' : 'Insurance Card'}</span>
                      <span className="font-body-lg font-bold text-on-surface dark:text-white">{insuranceNumber || 'N/A'}</span>
                    </div>
                    <div className="col-span-2 p-md bg-slate-50 dark:bg-slate-900/40 rounded-lg space-y-sm">
                      <div className="flex justify-between">
                        <span className="text-outline">{lang === 'vi' ? 'Hãng bảo hiểm' : 'Insurance Provider'}</span>
                        <span className="font-semibold">{insuranceProvider || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-outline">{lang === 'vi' ? 'Ngày hết hạn bảo hiểm' : 'Expiry Date'}</span>
                        <span className="font-semibold">{insuranceExpiry || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {role === 'doctor' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Học vị / Học hàm' : 'Credentials'}</p>
                      <p className="text-body-lg font-semibold mt-1">{profile?.doctorProfile?.credential?.CredentialName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Chuyên khoa sâu' : 'Specialization'}</p>
                      <p className="text-body-lg font-semibold mt-1">{profile?.doctorProfile?.specialization?.SpecializationName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Khoa công tác & Phòng' : 'Department & Room'}</p>
                      <p className="text-body-lg font-semibold mt-1">
                        {profile?.doctorProfile?.department?.DepartmentName || 'N/A'} - {profile?.doctorProfile?.room?.RoomName || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Số năm kinh nghiệm' : 'Experience'}</p>
                      <p className="text-body-lg font-semibold mt-1">{yearOfExperience ? `${yearOfExperience} ` + (lang === 'vi' ? 'năm' : 'years') : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Số giấy phép' : 'License'}</p>
                      <p className="text-body-lg font-semibold mt-1">{licenseNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Phí tư vấn' : 'Consult Fee'}</p>
                      <p className="text-body-lg font-bold text-primary dark:text-primary-fixed-dim mt-1">
                        {consultationFee ? Number(consultationFee).toLocaleString() + ' VND' : 'N/A'}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Tiểu sử tóm tắt' : 'Biography'}</p>
                      <p className="text-body-md mt-1 whitespace-pre-line bg-surface-container-low dark:bg-slate-900/30 p-md rounded min-h-[60px]">{biography || 'N/A'}</p>
                    </div>
                  </div>
                )}

                {role === 'nurse' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Chức danh Điều dưỡng' : 'Credential'}</p>
                      <p className="text-body-lg font-semibold mt-1">{profile?.nurseProfile?.credential?.CredentialName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Khoa lâm nghiệp' : 'Department'}</p>
                      <p className="text-body-lg font-semibold mt-1">{profile?.nurseProfile?.department?.DepartmentName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Phòng trực bệnh án' : 'Room Location'}</p>
                      <p className="text-body-lg font-semibold mt-1">{profile?.nurseProfile?.room?.RoomName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Ca trực được phân' : 'Shift Schedule'}</p>
                      <p className="text-body-lg font-semibold mt-1">
                        {shiftType === 'Ca sang' ? (lang === 'vi' ? 'Ca Sáng' : 'Morning') : shiftType === 'Ca chieu' ? (lang === 'vi' ? 'Ca Chiều' : 'Afternoon') : (lang === 'vi' ? 'Ca Tối (Đêm)' : 'Night')}
                      </p>
                    </div>
                  </div>
                )}

                {role === 'pharmacist' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Chức danh Dược khoa' : 'Credential'}</p>
                      <p className="text-body-lg font-semibold mt-1">{profile?.pharmacistProfile?.credential?.CredentialName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Nhà thuốc / Khoa dược' : 'Department'}</p>
                      <p className="text-body-lg font-semibold mt-1">{profile?.pharmacistProfile?.department?.DepartmentName || 'N/A'}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Giấy phép hành nghề dược' : 'License Number'}</p>
                      <p className="text-body-lg font-semibold mt-1">{licenseNumber || 'N/A'}</p>
                    </div>
                  </div>
                )}

                {role === 'receptionist' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Quầy lễ tân khoa' : 'Work Department'}</p>
                      <p className="text-body-lg font-semibold mt-1">{profile?.receptionistProfile?.department?.DepartmentName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Ca làm việc thường trực' : 'Active Shift'}</p>
                      <p className="text-body-lg font-semibold mt-1">
                        {shiftType === 'Ca sang' ? (lang === 'vi' ? 'Ca Sáng' : 'Morning') : shiftType === 'Ca chieu' ? (lang === 'vi' ? 'Ca Chiều' : 'Afternoon') : (lang === 'vi' ? 'Ca Đêm' : 'Night')}
                      </p>
                    </div>
                  </div>
                )}

                {role === 'admin' && (
                  <div>
                    <p className="text-xs text-outline font-bold uppercase">{lang === 'vi' ? 'Cấp độ tài khoản' : 'Operator Level'}</p>
                    <p className="text-body-lg font-bold text-primary dark:text-primary-fixed-dim mt-1">
                      {adminLevel === 'super' ? 'SUPER ADMINISTRATOR' : adminLevel === 'manager' ? 'DEPARTMENT MANAGER' : 'STANDARD OPERATOR'}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Side: Emergency Contact & Verification */}
          <div className="md:col-span-4 space-y-lg">
            {role === 'patient' && (
              <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                <div className="p-lg border-b border-outline-variant dark:border-slate-700 bg-error-container/5">
                  <h2 className="font-headline-md text-headline-md text-error flex items-center gap-xs">
                    <span className="material-symbols-outlined">emergency_share</span>
                    {lang === 'vi' ? 'Liên hệ khẩn cấp' : 'Emergency Contact'}
                  </h2>
                </div>
                <div className="p-lg space-y-md">
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-3xl">person_alert</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface dark:text-white">{emergencyName || 'N/A'}</p>
                      <p className="text-xs text-outline italic">
                        {emergencyRelationship === 'vo-chong' ? (lang === 'vi' ? 'Vợ/Chồng' : 'Spouse') : (lang === 'vi' ? 'Bố/Mẹ' : 'Parent')}
                      </p>
                    </div>
                  </div>
                  <div className="p-md bg-slate-50 dark:bg-slate-900 rounded text-center">
                    <p className="text-xs text-outline">{lang === 'vi' ? 'Số điện thoại khẩn cấp' : 'Emergency Phone'}</p>
                    <p className="font-body-lg font-bold text-error dark:text-red-400 mt-1">{emergencyPhone || 'N/A'}</p>
                  </div>
                </div>
              </section>
            )}

            <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <div className="p-lg border-b border-outline-variant dark:border-slate-700">
                <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-xs">
                  <span className="material-symbols-outlined">security</span>
                  {lang === 'vi' ? 'Xác thực bảo mật' : 'Identity Security'}
                </h2>
              </div>
              <div className="p-lg space-y-md">
                {localVerified ? (
                  <div className="flex items-center gap-sm p-md bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800/50">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400">verified</span>
                    <div>
                      <p className="text-sm font-bold text-green-800 dark:text-green-300">{lang === 'vi' ? 'Tài khoản đã xác thực' : 'Verified'}</p>
                      <p className="text-xs text-outline">{profile?.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-sm">
                    <form onSubmit={handleVerify} className="flex gap-sm">
                      <input type="text" maxLength={6} value={otpCode} onChange={e=>setOtpCode(e.target.value.replace(/\D/g, ''))} placeholder="Mã OTP" className="flex-1 text-center font-bold tracking-wider px-sm py-1.5 rounded border border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900 text-on-surface dark:text-white" />
                      <button type="submit" disabled={verifying} className="px-md py-1.5 bg-primary text-white font-label-md rounded disabled:opacity-60">{verifying ? '...' : (lang === 'vi' ? 'Xác thực' : 'Verify')}</button>
                    </form>
                    <div className="flex flex-col gap-xs text-left">
                      <button type="button" disabled={sendingOtp} onClick={handleRequestOtp} className="text-xs text-primary dark:text-primary-fixed-dim hover:underline font-bold flex items-center gap-xs disabled:opacity-50">
                        <span className="material-symbols-outlined text-[14px]">send</span>
                        {sendingOtp ? '...' : (lang === 'vi' ? 'Gửi OTP' : 'Request OTP')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

        </div>
      )}
    </div>
  );
}
