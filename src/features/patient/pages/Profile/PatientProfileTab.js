import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../../../auth/context/AuthContext';
import { ToastContext } from '../../../../shared/context/ToastContext';

export default function PatientProfileTab({ lang, t }) {
  const { user, verifyAccount, resendOtp, updateUserSettings } = useContext(AuthContext);
  const { success, error } = useContext(ToastContext);

  const displayUser = user || {};

  const getFullAddress = () => {
    const parts = [
      displayUser.street,
      displayUser.ward,
      displayUser.district,
      displayUser.province
    ].filter(Boolean);
    return parts.join(', ') || (lang === 'vi' ? 'Chưa cập nhật địa chỉ' : 'Address not updated');
  };

  const [otpCode, setOtpCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [localVerified, setLocalVerified] = useState(user?.isVerified || false);

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

  const fileInputRef = useRef(null);

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
      } catch (err) {
        error(lang === 'vi' ? 'Cập nhật ảnh đại diện thất bại.' : 'Failed to update avatar.');
      }
    };
    reader.onerror = () => {
      error(lang === 'vi' ? 'Đọc file ảnh thất bại.' : 'Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-lg">

      {/* ── Existing Profile Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">

      {/* 1. Personal Information Card (Span 8) */}
      <section className="md:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm text-left">
        <div className="p-lg border-b border-outline-variant dark:border-slate-700 flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim flex items-center gap-sm">
            <span className="material-symbols-outlined">badge</span> 
            {lang === 'vi' ? 'Thông tin cá nhân' : 'Personal Information'}
          </h2>
        </div>
        <div className="p-lg flex flex-col md:flex-row gap-xl items-start">
          <div 
            onClick={() => fileInputRef.current.click()}
            className="relative group cursor-pointer shrink-0"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
              style={{ display: 'none' }} 
              accept="image/*" 
            />
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container dark:border-slate-700 ring-1 ring-outline-variant shadow-md">
              <img 
                className="w-full h-full object-cover" 
                alt="Patient profile avatar" 
                src={user?.avatar ? (user.avatar.startsWith('http') || user.avatar.startsWith('data:image') ? user.avatar : `http://localhost:5000${user.avatar}`) : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwo2C_dk0HpwFKTj4wKewVviyYkbYQz5hKgbX0B5qb1THrUqzrllVUp6S-j8Nn52jKu4IIwDQWg-NdtbXP7V79F1o5L2JTynJImEjQqz8Doz18ihOvxIC4p6ndawaKQEle39nuMPJF1L67lIl-qIGkeq3-hJ8E8BzNA22t5MIzXvflazLoE7oYn0kUXqcF2EBwMYySIVeubwZPGv0sBbqd84GImY1wLXJUxjNEux-FRl0uMMGv3zjx'}
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </div>
          </div>
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-y-md gap-x-xl w-full">
            <div className="space-y-1">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Họ và Tên' : 'Full Name'}
              </p>
              <p className="font-headline-md text-on-surface dark:text-white">{displayUser.fullName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Mã bệnh nhân' : 'Patient ID'}
              </p>
              <p className="font-data-mono text-primary dark:text-primary-fixed-dim font-bold">
                {displayUser.id ? `MED-${10000 + displayUser.id}` : 'VN-782-990-CL'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Ngày sinh' : 'Date of Birth'}
              </p>
              <p className="font-body-lg text-on-surface dark:text-slate-300">
                {displayUser.dob || '1982-08-15'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Giới tính' : 'Gender'}
              </p>
              <p className="font-body-lg text-on-surface dark:text-slate-300">
                {displayUser.gender === 'male' 
                  ? (lang === 'vi' ? 'Nam' : 'Male') 
                  : displayUser.gender === 'female' 
                    ? (lang === 'vi' ? 'Nữ' : 'Female') 
                    : (displayUser.gender || 'Nam')}
              </p>
            </div>
            <div className="sm:col-span-2 space-y-1">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Mã số BHYT / CCCD' : 'Health Insurance / ID Card'}
              </p>
              <p className="font-data-mono text-on-surface dark:text-slate-300">
                {displayUser.idNumber || 'GD4791234567890'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Medical Basics Card (Span 4) */}
      <section className="md:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-sm text-left">
        <div className="p-lg border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/50">
          <h2 className="font-headline-md text-headline-md text-tertiary dark:text-amber-500 flex items-center gap-sm">
            <span className="material-symbols-outlined">medical_information</span> 
            {lang === 'vi' ? 'Chỉ số cơ bản' : 'Basic Indicators'}
          </h2>
        </div>
        <div className="p-lg space-y-lg flex-grow">
          <div className="flex justify-between items-center p-md bg-surface-container-low dark:bg-slate-900/40 rounded-lg">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-error">bloodtype</span>
              <span className="font-label-md text-on-surface dark:text-slate-300">{lang === 'vi' ? 'Nhóm máu' : 'Blood Group'}</span>
            </div>
            <span className="font-headline-sm text-headline-sm font-bold text-error dark:text-red-400">O+</span>
          </div>
          <div className="flex justify-between items-center p-md bg-surface-container-low dark:bg-slate-900/40 rounded-lg">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">scale</span>
              <span className="font-label-md text-on-surface dark:text-slate-300">{lang === 'vi' ? 'Cân nặng' : 'Weight'}</span>
            </div>
            <span className="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed-dim">68 kg</span>
          </div>
          <div className="flex justify-between items-center p-md bg-surface-container-low dark:bg-slate-900/40 rounded-lg">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary dark:text-teal-400">straighten</span>
              <span className="font-label-md text-on-surface dark:text-slate-300">{lang === 'vi' ? 'Chiều cao' : 'Height'}</span>
            </div>
            <span className="font-headline-sm text-headline-sm font-bold text-secondary dark:text-teal-400">172 cm</span>
          </div>
        </div>
      </section>

      {/* 3. Contact Info Card (Span 6) */}
      <section className="md:col-span-6 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm text-left">
        <div className="p-lg border-b border-outline-variant dark:border-slate-700 flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim flex items-center gap-sm">
            <span className="material-symbols-outlined">contact_phone</span> 
            {lang === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}
          </h2>
        </div>
        <div className="p-lg space-y-md">
          <div className="flex items-start gap-md">
            <div className="w-10 h-10 rounded bg-surface-container dark:bg-slate-900 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-300">call</span>
            </div>
            <div>
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase">{lang === 'vi' ? 'Điện thoại' : 'Phone'}</p>
              <p className="font-body-lg text-on-surface dark:text-slate-300">{displayUser.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-md">
            <div className="w-10 h-10 rounded bg-surface-container dark:bg-slate-900 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-300">mail</span>
            </div>
            <div>
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase">Email</p>
              <p className="font-body-lg text-on-surface dark:text-slate-300">{displayUser.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-md">
            <div className="w-10 h-10 rounded bg-surface-container dark:bg-slate-900 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-300">location_on</span>
            </div>
            <div>
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase">{lang === 'vi' ? 'Địa chỉ thường trú' : 'Permanent Address'}</p>
              <p className="font-body-lg text-on-surface dark:text-slate-300 leading-relaxed break-words">
                {getFullAddress()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Emergency Contact Card (Span 6) */}
      <section className="md:col-span-6 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm text-left">
        <div className="p-lg border-b border-outline-variant dark:border-slate-700 flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-error flex items-center gap-sm">
            <span className="material-symbols-outlined">emergency_share</span> 
            {lang === 'vi' ? 'Liên hệ khẩn cấp' : 'Emergency Contacts'}
          </h2>
          <button 
            onClick={() => alert(lang === 'vi' ? 'Yêu cầu chỉnh sửa liên hệ khẩn cấp đã gửi.' : 'Emergency contact update request sent.')} 
            className="text-primary dark:text-primary-fixed-dim font-label-md hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span> 
            {lang === 'vi' ? 'Sửa' : 'Edit'}
          </button>
        </div>
        <div className="p-lg bg-error-container/10 dark:bg-red-950/10 flex-grow">
          <div className="flex items-center gap-lg mb-md">
            <div className="w-16 h-16 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-error-container text-4xl">person_alert</span>
            </div>
            <div>
              <p className="font-headline-md text-on-surface dark:text-white">
                {displayUser.emergencyName || 'Lê Thị Mai'}
              </p>
              <p className="text-on-surface-variant dark:text-slate-400 font-body-md italic">
                {displayUser.emergencyRelationship === 'vo-chong' 
                  ? (lang === 'vi' ? 'Vợ/Chồng (Người bảo hộ)' : 'Spouse (Guardian)')
                  : displayUser.emergencyRelationship === 'ba-me'
                    ? (lang === 'vi' ? 'Bố/Mẹ (Người bảo hộ)' : 'Parent (Guardian)')
                    : (displayUser.emergencyRelationship || (lang === 'vi' ? 'Vợ' : 'Spouse'))}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="p-md bg-white dark:bg-slate-900 rounded border border-outline-variant/30 dark:border-slate-700">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase">{lang === 'vi' ? 'Điện thoại' : 'Phone'}</p>
              <p className="font-body-lg font-bold text-on-surface dark:text-white">
                {displayUser.emergencyPhone || '090 987 6543'}
              </p>
            </div>
            <div className="p-md bg-white dark:bg-slate-900 rounded border border-outline-variant/30 dark:border-slate-700">
              <p className="text-xs font-label-md text-outline dark:text-slate-400 uppercase">{lang === 'vi' ? 'Quan hệ' : 'Relationship'}</p>
              <p className="font-body-lg text-on-surface dark:text-slate-300">
                {displayUser.emergencyRelationship === 'vo-chong' 
                  ? (lang === 'vi' ? 'Vợ/Chồng' : 'Spouse')
                  : displayUser.emergencyRelationship === 'ba-me'
                    ? (lang === 'vi' ? 'Bố/Mẹ' : 'Parent')
                    : (displayUser.emergencyRelationship || (lang === 'vi' ? 'Vợ' : 'Spouse'))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Security Settings Card (Full Width) */}
      <section className="md:col-span-12 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm text-left">
        <div className="p-lg border-b border-outline-variant dark:border-slate-700">
          <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-sm">
            <span className="material-symbols-outlined">security</span> 
            {lang === 'vi' ? 'Cài đặt an ninh & Đăng nhập' : 'Security Settings & Logins'}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-outline-variant dark:divide-slate-700">
          
          {/* Change Password */}
          <div className="p-lg space-y-md">
            <div>
              <p className="font-label-md text-on-surface dark:text-white">{lang === 'vi' ? 'Mật khẩu' : 'Password'}</p>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">
                {lang === 'vi' ? 'Thay đổi mật khẩu đăng nhập cổng thông tin của bạn.' : 'Update your patient portal login password.'}
              </p>
            </div>
            <div className="flex items-center justify-between p-md bg-surface-container-low dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400">key</span>
                <span className="font-data-mono dark:text-slate-300">••••••••••••••</span>
              </div>
              <button 
                onClick={() => alert(lang === 'vi' ? 'Mở hộp thoại đổi mật khẩu...' : 'Opening password update modal...')}
                className="px-md py-1.5 border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim font-label-md rounded hover:bg-primary/5 transition-colors"
              >
                {lang === 'vi' ? 'Đổi mật khẩu' : 'Change Password'}
              </button>
            </div>
            <p className="text-[11px] text-outline dark:text-slate-400 italic">
              {lang === 'vi' ? 'Lần thay đổi cuối: 3 tháng trước' : 'Last modified: 3 months ago'}
            </p>
          </div>

          {/* 2FA */}
          <div className="p-lg space-y-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-label-md text-on-surface dark:text-white">{lang === 'vi' ? 'Xác thực 2 yếu tố (2FA)' : 'Two-Factor Authentication (2FA)'}</p>
                <p className="text-sm text-on-surface-variant dark:text-slate-400">
                  {lang === 'vi' ? 'Thêm một lớp bảo mật bằng cách sử dụng mã OTP.' : 'Secure your account with OTP login verification.'}
                </p>
              </div>
              <span className="px-sm py-1 bg-secondary-container dark:bg-teal-950 text-on-secondary-container dark:text-teal-400 text-[10px] font-bold rounded uppercase">
                {lang === 'vi' ? 'Đang bật' : 'Enabled'}
              </span>
            </div>
            <div className="flex items-center justify-between p-md bg-surface-container-low dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-secondary dark:text-teal-400">verified_user</span>
                <span className="text-sm font-body-md dark:text-slate-300">SMS +84 *** *** 67</span>
              </div>
              <button 
                onClick={() => alert(lang === 'vi' ? 'Cấu hình cài đặt 2FA...' : 'Opening 2FA setups...')}
                className="px-md py-1.5 border border-outline dark:border-slate-600 text-on-surface-variant dark:text-slate-300 rounded hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors"
              >
                {lang === 'vi' ? 'Cấu hình' : 'Configure'}
              </button>
            </div>
            <div className="flex items-center gap-sm p-sm bg-secondary-container/10 dark:bg-teal-950/20 rounded">
              <span className="material-symbols-outlined text-secondary dark:text-teal-400 text-sm">info</span>
              <p className="text-xs text-on-secondary-container dark:text-teal-400">
                {lang === 'vi' 
                  ? 'Tài khoản của bạn được bảo vệ bởi các tiêu chuẩn HIPAA.' 
                  : 'Your account is secured under HIPAA data protection protocols.'}
              </p>
            </div>
          </div>

          {/* Account Verification */}
          <div className="p-lg space-y-md">
            <div>
              <p className="font-label-md text-on-surface dark:text-white">
                {lang === 'vi' ? 'Xác thực tài khoản' : 'Account Verification'}
              </p>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">
                {lang === 'vi' 
                  ? 'Kích hoạt tài khoản bằng email của bạn để đảm bảo bảo mật y tế.'
                  : 'Activate your account using your email to ensure medical security.'}
              </p>
            </div>

            {localVerified ? (
              <div className="flex items-center gap-sm p-md bg-green-50 dark:bg-green-950/30 rounded border border-green-300 dark:border-green-800">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[24px]">verified</span>
                <div>
                  <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                    {lang === 'vi' ? 'Tài khoản đã xác thực' : 'Account Verified'}
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-400">
                    {user?.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-sm">
                <form onSubmit={handleVerify} className="flex gap-sm">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Mã OTP"
                    className="flex-1 text-center font-bold tracking-wider px-sm py-1.5 rounded border border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900 text-on-surface dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={verifying}
                    className="px-md py-1.5 bg-primary text-white font-label-md rounded hover:bg-primary-hover transition-colors disabled:opacity-60 text-sm shrink-0"
                  >
                    {verifying ? (lang === 'vi' ? 'Đang gửi...' : 'Sending...') : (lang === 'vi' ? 'Xác thực' : 'Verify')}
                  </button>
                </form>
                <div className="flex flex-col gap-xs text-left">
                  <p className="text-[11px] text-amber-600 dark:text-amber-500 italic">
                    {lang === 'vi' 
                      ? `Nhập mã 6 số từ email ${user?.email}` 
                      : `Enter the 6-digit code from email ${user?.email}`}
                  </p>
                  <button
                    type="button"
                    disabled={sendingOtp}
                    onClick={handleRequestOtp}
                    className="text-xs text-primary dark:text-primary-fixed-dim hover:underline font-semibold flex items-center gap-xs disabled:opacity-50 mt-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">send</span>
                    {sendingOtp 
                      ? (lang === 'vi' ? 'Đang gửi...' : 'Sending...') 
                      : (lang === 'vi' ? 'Nhận mã OTP qua email' : 'Get OTP via email')}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      </div> {/* end grid */}
    </div>
  );
}
