import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../../auth/context/AuthContext';
import { ToastContext } from '../../../../shared/context/ToastContext';

export default function PatientProfileTab({ lang, t }) {
  const { user, verifyAccount, resendOtp, updateUserSettings, getUserProfile, updateUserProfile } = useContext(AuthContext);
  const { success, error } = useContext(ToastContext);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [idNumber, setIdNumber] = useState('');
  
  // Address states
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [street, setStreet] = useState('');

  // Emergency contact states
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelationship, setEmergencyRelationship] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Patient medical states
  const [bloodType, setBloodType] = useState('O+');
  const [allergies, setAllergies] = useState('');
  const [chronicDiseases, setChronicDiseases] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [insuranceExpiry, setInsuranceExpiry] = useState('');

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
        
        // Populate form fields
        setFullName(data.user.fullName || '');
        setPhone(data.user.phone || '');
        setDob(data.user.dob || '');
        setGender(data.user.gender || 'male');
        setIdNumber(data.user.idNumber || '');
        
        setProvince(data.user.province || '');
        setDistrict(data.user.district || '');
        setWard(data.user.ward || '');
        setStreet(data.user.street || '');

        setEmergencyName(data.user.emergencyName || '');
        setEmergencyRelationship(data.user.emergencyRelationship || 'vo-chong');
        setEmergencyPhone(data.user.emergencyPhone || '');

        const patProf = data.user.patientProfile || {};
        setBloodType(patProf.bloodType || 'O+');
        setAllergies(patProf.allergies || '');
        setChronicDiseases(patProf.chronicDiseases || '');
        setInsuranceNumber(patProf.insuranceNumber || '');
        setInsuranceProvider(patProf.insuranceProvider || '');
        setInsuranceExpiry(patProf.insuranceExpiry || '');
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
        idNumber,
        province,
        district,
        ward,
        street,
        emergencyName,
        emergencyRelationship,
        emergencyPhone,
        profileData: {
          bloodType,
          allergies,
          chronicDiseases,
          insuranceNumber,
          insuranceProvider,
          insuranceExpiry: insuranceExpiry || null
        }
      });
      success(lang === 'vi' ? 'Cập nhật hồ sơ bệnh nhân thành công!' : 'Patient profile updated successfully!');
      setIsEditing(false);
      await loadData();
    } catch (err) {
      error(err.message || (lang === 'vi' ? 'Cập nhật thất bại.' : 'Update failed.'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 6) {
      error(lang === 'vi' ? 'Vui lòng nhập đúng 6 chữ số mã OTP.' : 'Please enter the 6-digit OTP code.');
      return;
    }
    setVerifying(true);
    try {
      await verifyAccount(user?.email, otpCode);
      setLocalVerified(true);
      success(lang === 'vi' ? 'Tài khoản đã được xác thực thành công! Email xác nhận đã được gửi.' : 'Account verified successfully! A confirmation email has been sent.');
    } catch (err) {
      error(err.message || (lang === 'vi' ? 'Mã OTP không đúng. Vui lòng kiểm tra lại email.' : 'Invalid OTP code. Please check your email.'));
    } finally {
      setVerifying(false);
    }
  };

  const handleRequestOtp = async () => {
    setSendingOtp(true);
    try {
      await resendOtp(user?.email);
      success(lang === 'vi' ? 'Mã OTP đã được gửi đến email của bạn!' : 'OTP has been sent to your email!');
    } catch (err) {
      error(err.message || (lang === 'vi' ? 'Không thể gửi mã OTP. Vui lòng thử lại.' : 'Failed to send OTP. Please try again.'));
    } finally {
      setSendingOtp(false);
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

  const getFullAddress = () => {
    const parts = [street, ward, district, province].filter(Boolean);
    return parts.join(', ') || (lang === 'vi' ? 'Chưa cập nhật địa chỉ' : 'Address not updated');
  };

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center p-xl min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const patProf = profile?.patientProfile || {};

  return (
    <div className="space-y-lg text-left">
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700">
        <div>
          <h3 className="text-headline-md font-bold text-on-surface dark:text-white">
            {lang === 'vi' ? 'Hồ Sơ Y Tế Bệnh Nhân' : 'Patient Health Record'}
          </h3>
          <p className="text-body-sm text-outline dark:text-slate-400">
            {lang === 'vi' ? 'Quản lý thông tin cá nhân và chỉ số sức khỏe của bạn' : 'Manage your personal profile and health conditions'}
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-xs px-md py-2 rounded-lg font-label-md border transition-all ${
            isEditing 
              ? 'bg-outline-variant dark:bg-slate-700 text-on-surface dark:text-white border-transparent'
              : 'bg-primary text-white border-transparent hover:bg-primary-hover shadow-sm'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isEditing ? 'close' : 'edit'}
          </span>
          {isEditing ? (lang === 'vi' ? 'Hủy bỏ' : 'Cancel') : (lang === 'vi' ? 'Chỉnh sửa' : 'Edit Profile')}
        </button>
      </div>

      {isEditing ? (
        // ── EDIT PROFILE FORM ──
        <form onSubmit={handleSave} className="space-y-lg animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            
            {/* Left Block: Personal Information */}
            <div className="bg-white dark:bg-slate-800 p-lg rounded-xl border border-outline-variant dark:border-slate-700 space-y-md">
              <h3 className="text-title-lg font-bold text-primary dark:text-primary-fixed-dim flex items-center gap-xs">
                <span className="material-symbols-outlined">badge</span>
                {lang === 'vi' ? 'Thông tin cá nhân' : 'Personal Info'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Họ và tên' : 'Full Name'}</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                  />
                </div>
                <div className="space-y-xs">
                  <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Số điện thoại' : 'Phone'}</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                  />
                </div>
                <div className="space-y-xs">
                  <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Ngày sinh' : 'Date of Birth'}</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                  />
                </div>
                <div className="space-y-xs">
                  <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Giới tính' : 'Gender'}</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800"
                  >
                    <option value="male">{lang === 'vi' ? 'Nam' : 'Male'}</option>
                    <option value="female">{lang === 'vi' ? 'Nữ' : 'Female'}</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-xs">
                  <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Mã số BHYT / CCCD' : 'Health Insurance / ID Card'}</label>
                  <input
                    type="text"
                    value={idNumber}
                    onChange={e => setIdNumber(e.target.value)}
                    className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                  />
                </div>
              </div>

              <div className="border-t border-outline-variant dark:border-slate-700 pt-md space-y-md">
                <h4 className="text-label-lg font-bold uppercase text-outline">{lang === 'vi' ? 'Địa chỉ thường trú' : 'Permanent Address'}</h4>
                <div className="grid grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Tỉnh / Thành phố' : 'Province'}</label>
                    <input type="text" value={province} onChange={e => setProvince(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Quận / Huyện' : 'District'}</label>
                    <input type="text" value={district} onChange={e => setDistrict(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Phường / Xã' : 'Ward'}</label>
                    <input type="text" value={ward} onChange={e => setWard(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Đường / Số nhà' : 'Street'}</label>
                    <input type="text" value={street} onChange={e => setStreet(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Block: Medical Conditions & Insurance */}
            <div className="space-y-lg">
              <div className="bg-white dark:bg-slate-800 p-lg rounded-xl border border-outline-variant dark:border-slate-700 space-y-md">
                <h3 className="text-title-lg font-bold text-tertiary dark:text-amber-500 flex items-center gap-xs">
                  <span className="material-symbols-outlined">medical_information</span>
                  {lang === 'vi' ? 'Hồ sơ y tế nâng cao' : 'Medical File Details'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Nhóm máu' : 'Blood Group'}</label>
                    <select
                      value={bloodType}
                      onChange={e => setBloodType(e.target.value)}
                      className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => (
                        <option key={bt} value={bt}>{bt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Mã số bảo hiểm y tế' : 'Insurance Card No.'}</label>
                    <input
                      type="text"
                      value={insuranceNumber}
                      onChange={e => setInsuranceNumber(e.target.value)}
                      className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                    />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Nhà cung cấp bảo hiểm' : 'Insurance Provider'}</label>
                    <input
                      type="text"
                      value={insuranceProvider}
                      onChange={e => setInsuranceProvider(e.target.value)}
                      className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                    />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Ngày hết hạn bảo hiểm' : 'Insurance Expiry'}</label>
                    <input
                      type="date"
                      value={insuranceExpiry}
                      onChange={e => setInsuranceExpiry(e.target.value)}
                      className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Tiền sử dị ứng (Thuốc, thức ăn...)' : 'Allergies'}</label>
                    <textarea
                      rows={2}
                      value={allergies}
                      onChange={e => setAllergies(e.target.value)}
                      className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Bệnh mãn tính' : 'Chronic Diseases'}</label>
                    <textarea
                      rows={2}
                      value={chronicDiseases}
                      onChange={e => setChronicDiseases(e.target.value)}
                      className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact Edit */}
              <div className="bg-white dark:bg-slate-800 p-lg rounded-xl border border-outline-variant dark:border-slate-700 space-y-md">
                <h3 className="text-title-lg font-bold text-error flex items-center gap-xs">
                  <span className="material-symbols-outlined">person_alert</span>
                  {lang === 'vi' ? 'Liên hệ khẩn cấp' : 'Emergency Contact'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Tên liên hệ' : 'Name'}</label>
                    <input type="text" value={emergencyName} onChange={e => setEmergencyName(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Số điện thoại' : 'Phone'}</label>
                    <input type="text" value={emergencyPhone} onChange={e => setEmergencyPhone(e.target.value)} className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white" />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-xs font-semibold text-outline">{lang === 'vi' ? 'Quan hệ' : 'Relationship'}</label>
                    <select
                      value={emergencyRelationship}
                      onChange={e => setEmergencyRelationship(e.target.value)}
                      className="w-full px-md py-2 border border-outline-variant dark:border-slate-700 rounded bg-transparent text-on-surface dark:text-white dark:bg-slate-800"
                    >
                      <option value="vo-chong">{lang === 'vi' ? 'Vợ/Chồng' : 'Spouse'}</option>
                      <option value="ba-me">{lang === 'vi' ? 'Bố/Mẹ' : 'Parent'}</option>
                      <option value="anh-chi-em">{lang === 'vi' ? 'Anh/Chị/Em' : 'Sibling'}</option>
                      <option value="khac">{lang === 'vi' ? 'Khác' : 'Other'}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-md">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-lg py-2 rounded-lg border border-outline text-on-surface dark:text-slate-300 font-label-md"
            >
              {lang === 'vi' ? 'Hủy' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-lg py-2 rounded-lg bg-primary text-white font-label-md hover:bg-primary-hover shadow-sm"
            >
              {lang === 'vi' ? 'Lưu thông tin' : 'Save Profile'}
            </button>
          </div>
        </form>
      ) : (
        // ── VIEW PROFILE DETAILS ──
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg animate-in fade-in duration-200">
          
          {/* Personal Info & Contact Card (Span 8) */}
          <div className="md:col-span-8 space-y-lg">
            <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <div className="p-lg border-b border-outline-variant dark:border-slate-700">
                <h2 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim flex items-center gap-xs">
                  <span className="material-symbols-outlined">badge</span>
                  {lang === 'vi' ? 'Thông tin cá nhân & Liên hệ' : 'Personal & Contact Info'}
                </h2>
              </div>
              <div className="p-lg flex flex-col sm:flex-row gap-xl items-start">
                <div onClick={() => fileInputRef.current.click()} className="relative group cursor-pointer shrink-0">
                  <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container dark:border-slate-700 ring-1 ring-outline-variant shadow-md">
                    <img
                      className="w-full h-full object-cover"
                      alt="User avatar"
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
                    <p className="text-xs font-bold text-outline uppercase">{lang === 'vi' ? 'Mã bệnh nhân' : 'Patient ID'}</p>
                    <p className="font-data-mono text-primary dark:text-primary-fixed-dim font-bold mt-1">
                      {profile?.id ? `MED-${10000 + profile.id}` : 'N/A'}
                    </p>
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
                  <div>
                    <p className="text-xs font-bold text-outline uppercase">{lang === 'vi' ? 'Số điện thoại' : 'Phone'}</p>
                    <p className="font-body-lg text-on-surface dark:text-slate-300 mt-1">{profile?.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-outline uppercase">Email</p>
                    <p className="font-body-lg text-on-surface dark:text-slate-300 mt-1">{profile?.email}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs font-bold text-outline uppercase">{lang === 'vi' ? 'Địa chỉ' : 'Address'}</p>
                    <p className="font-body-lg text-on-surface dark:text-slate-300 mt-1">{getFullAddress()}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Medical Info & Insurance Card */}
            <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <div className="p-lg border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/50">
                <h2 className="font-headline-md text-headline-md text-tertiary dark:text-amber-500 flex items-center gap-xs">
                  <span className="material-symbols-outlined">medical_information</span>
                  {lang === 'vi' ? 'Hồ sơ sức khỏe & Bảo hiểm y tế' : 'Medical File & Health Insurance'}
                </h2>
              </div>
              <div className="p-lg grid grid-cols-1 sm:grid-cols-2 gap-lg">
                <div className="flex justify-between items-center p-md bg-surface-container-low dark:bg-slate-900/40 rounded-lg">
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-error">bloodtype</span>
                    <span className="font-label-md text-on-surface dark:text-slate-300">{lang === 'vi' ? 'Nhóm máu' : 'Blood Group'}</span>
                  </div>
                  <span className="font-headline-sm font-bold text-error dark:text-red-400">{bloodType}</span>
                </div>
                <div className="flex justify-between items-center p-md bg-surface-container-low dark:bg-slate-900/40 rounded-lg">
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">featured_play_list</span>
                    <span className="font-label-md text-on-surface dark:text-slate-300">{lang === 'vi' ? 'Số thẻ bảo hiểm' : 'Insurance Card No.'}</span>
                  </div>
                  <span className="font-body-lg font-bold text-on-surface dark:text-white">{insuranceNumber || 'N/A'}</span>
                </div>
                <div className="sm:col-span-2 p-md bg-slate-50 dark:bg-slate-900/40 rounded-lg space-y-xs">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-outline">{lang === 'vi' ? 'Nhà cung cấp bảo hiểm:' : 'Insurance Provider:'}</span>
                    <span className="font-bold text-on-surface dark:text-white">{insuranceProvider || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-outline">{lang === 'vi' ? 'Ngày hết hạn bảo hiểm:' : 'Expiry Date:'}</span>
                    <span className="font-bold text-on-surface dark:text-white">{insuranceExpiry || 'N/A'}</span>
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-xs">
                  <p className="text-xs font-bold text-outline uppercase">{lang === 'vi' ? 'Dị ứng thuốc / thức ăn' : 'Allergies'}</p>
                  <p className="font-body-lg text-on-surface dark:text-slate-300 bg-surface-container-low dark:bg-slate-900/30 p-md rounded border border-outline-variant/30 min-h-[50px]">
                    {allergies || (lang === 'vi' ? 'Không phát hiện dị ứng' : 'No allergies reported')}
                  </p>
                </div>
                <div className="sm:col-span-2 space-y-xs">
                  <p className="text-xs font-bold text-outline uppercase">{lang === 'vi' ? 'Bệnh nền / Bệnh mãn tính' : 'Chronic Diseases'}</p>
                  <p className="font-body-lg text-on-surface dark:text-slate-300 bg-surface-container-low dark:bg-slate-900/30 p-md rounded border border-outline-variant/30 min-h-[50px]">
                    {chronicDiseases || (lang === 'vi' ? 'Không có bệnh lý nền' : 'No chronic diseases reported')}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Side: Emergency Contact & OTP Verification (Span 4) */}
          <div className="md:col-span-4 space-y-lg">
            {/* Emergency Contact Info */}
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
                      {emergencyRelationship === 'vo-chong' 
                        ? (lang === 'vi' ? 'Vợ/Chồng' : 'Spouse')
                        : emergencyRelationship === 'ba-me'
                          ? (lang === 'vi' ? 'Bố/Mẹ' : 'Parent')
                          : emergencyRelationship === 'anh-chi-em'
                            ? (lang === 'vi' ? 'Anh/Chị/Em' : 'Sibling')
                            : (emergencyRelationship || 'N/A')}
                    </p>
                  </div>
                </div>
                <div className="p-md bg-surface-container-low dark:bg-slate-900/40 rounded border border-outline-variant/30 text-center">
                  <p className="text-xs text-outline">{lang === 'vi' ? 'Số điện thoại khẩn cấp' : 'Emergency Phone'}</p>
                  <p className="font-body-lg font-bold text-error dark:text-red-400 mt-1">{emergencyPhone || 'N/A'}</p>
                </div>
              </div>
            </section>

            {/* OTP Verification Info */}
            <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <div className="p-lg border-b border-outline-variant dark:border-slate-700">
                <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-xs">
                  <span className="material-symbols-outlined">security</span>
                  {lang === 'vi' ? 'Xác thực bảo mật' : 'Security Identity'}
                </h2>
              </div>
              <div className="p-lg space-y-md">
                {localVerified ? (
                  <div className="flex items-center gap-sm p-md bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800/50">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400">verified</span>
                    <div>
                      <p className="text-sm font-bold text-green-800 dark:text-green-300">
                        {lang === 'vi' ? 'Tài khoản đã xác thực' : 'Verified Account'}
                      </p>
                      <p className="text-xs text-outline mt-0.5">{profile?.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-sm">
                    <form onSubmit={handleVerify} className="flex gap-sm">
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="Mã OTP"
                        className="flex-1 text-center font-bold tracking-wider px-sm py-1.5 rounded border border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900 text-on-surface dark:text-white"
                      />
                      <button type="submit" disabled={verifying} className="px-md py-1.5 bg-primary text-white font-label-md rounded hover:bg-primary-hover disabled:opacity-60">
                        {verifying ? '...' : (lang === 'vi' ? 'Xác thực' : 'Verify')}
                      </button>
                    </form>
                    <div className="flex flex-col gap-xs text-left">
                      <p className="text-[11px] text-amber-600 dark:text-amber-500 italic">
                        {lang === 'vi' ? `Nhập 6 số từ email ${profile?.email}` : `Enter 6 digits from ${profile?.email}`}
                      </p>
                      <button type="button" disabled={sendingOtp} onClick={handleRequestOtp} className="text-xs text-primary dark:text-primary-fixed-dim hover:underline font-bold flex items-center gap-xs disabled:opacity-50">
                        <span className="material-symbols-outlined text-[14px]">send</span>
                        {sendingOtp ? '...' : (lang === 'vi' ? 'Nhận mã OTP qua email' : 'Get OTP via email')}
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
