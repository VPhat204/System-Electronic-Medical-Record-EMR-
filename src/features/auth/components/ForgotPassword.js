import React, { useState, useContext } from 'react';
import { ToastContext } from '../../../shared/context/ToastContext';
import { LanguageContext } from '../../../shared/context/LanguageContext';

export default function ForgotPassword({ onNavigate }) {
  const { success, error } = useContext(ToastContext);
  const { lang, setLang, t } = useContext(LanguageContext);
  const [step, setStep] = useState(1); // 1: enter email, 2: enter OTP & new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      error(t('forgot.validation.emailRequired'));
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error occurred');
      
      success(t('forgot.successMsg'));
      setStep(2);
    } catch (err) {
      error(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !password || !confirmPassword) {
      error(lang === 'en' ? 'All fields are required' : 'Vui lòng điền đầy đủ các thông tin.');
      return;
    }
    if (password.length < 6) {
      error(lang === 'en' ? 'Password must be at least 6 characters' : 'Mật khẩu phải dài ít nhất 6 ký tự.');
      return;
    }
    if (password !== confirmPassword) {
      error(lang === 'en' ? 'Passwords do not match' : 'Mật khẩu xác nhận không khớp.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error occurred');

      success(lang === 'en' ? 'Password updated successfully!' : 'Đổi mật khẩu thành công! Đang chuyển hướng...');
      setTimeout(() => {
        onNavigate('login');
      }, 1500);
    } catch (err) {
      error(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="text-on-background min-h-screen flex items-center justify-center p-6 transition-colors duration-200 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/emr_login_bg.png')" }}
    >
      {/* Dark/Light Contrast Overlay Mask */}
      <div className="absolute inset-0 bg-slate-950/30 dark:bg-slate-950/60 z-0 pointer-events-none" />

      {/* Aurora Ambient Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 dark:bg-primary/35 blur-[120px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/20 dark:bg-teal-500/35 blur-[120px] pointer-events-none z-0 animate-pulse" />
      
      {/* Language Switcher (Top Right) */}
      <div className="fixed top-lg right-lg z-50 flex gap-sm bg-surface-container-low dark:bg-slate-800 p-xs rounded shadow-sm border border-outline-variant dark:border-slate-700 transition-colors duration-200 select-none">
        <button 
          onClick={() => setLang('en')}
          className={`px-sm py-xs font-label-md text-label-md rounded shadow-sm transition-all cursor-pointer ${
            lang === 'en' 
              ? 'text-primary dark:text-sky-400 bg-surface-container-lowest dark:bg-slate-700 font-semibold' 
              : 'text-on-surface-variant dark:text-slate-400 hover:text-primary'
          }`}
        >
          EN
        </button>
        <button 
          onClick={() => setLang('vi')}
          className={`px-sm py-xs font-label-md text-label-md rounded shadow-sm transition-all cursor-pointer ${
            lang === 'vi' || lang === 'vn'
              ? 'text-primary dark:text-sky-400 bg-surface-container-lowest dark:bg-slate-700 font-semibold' 
              : 'text-on-surface-variant dark:text-slate-400 hover:text-primary'
          }`}
        >
          VN
        </button>
      </div>

      {/* Centered Recovery Card */}
      <main className="w-full max-w-md bg-white/85 dark:bg-slate-900/90 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-outline-variant/30 dark:border-slate-800 shadow-2xl relative z-10 my-8">
        
        {/* Back to Login Button */}
        <button 
          onClick={() => onNavigate('login')}
          className="absolute top-4 left-4 inline-flex items-center gap-1 font-semibold text-xs text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-sky-400 transition-colors cursor-pointer z-20"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          {t('forgot.backLogin')}
        </button>

        <div className="w-full mx-auto mt-4 text-left">

          {/* Logo Header */}
          <div className="flex flex-col items-center gap-sm mb-lg text-center select-none">
            <div className="flex items-center gap-md cursor-pointer hover:scale-105 transition-transform animate-in fade-in duration-300" onClick={() => onNavigate('home')}>
              <span className="material-symbols-outlined text-primary dark:text-sky-400 text-headline-xl animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
                medical_services
              </span>
              <h1 className="font-headline-md text-headline-md font-semibold text-slate-900 dark:text-white">
                MedEMR
              </h1>
            </div>
          </div>

          <div>
            <header className="mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-xs min-h-[32px]">
                {t('forgot.title')}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 min-h-[48px]">
                {step === 1 
                  ? t('forgot.desc')
                  : (lang === 'en' 
                    ? 'Check your inbox for OTP, and enter your new password.'
                    : 'Kiểm tra hộp thư để lấy mã OTP, và điền mật khẩu mới của bạn.')
                }
              </p>
            </header>

            {step === 1 ? (
              <form onSubmit={handleRequestOtp} className="space-y-lg">
                <div className="space-y-xs">
                  <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none" htmlFor="email">
                    {t('forgot.emailLabel')}
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant dark:text-slate-400 transition-colors duration-200 group-focus-within:text-primary">
                      mail
                    </span>
                    <input 
                      type="email"
                      id="email" 
                      placeholder={t('forgot.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-md py-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-slate-900 dark:text-white transition-all placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 dark:bg-sky-600 dark:hover:bg-sky-500 text-white py-md rounded-lg font-label-md text-label-md uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-sm disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      {t('forgot.submitBtn')}
                      <span className="material-symbols-outlined text-[20px]">send</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-lg">
                {/* OTP Code field */}
                <div className="space-y-xs">
                  <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none" htmlFor="otp">
                    {lang === 'en' ? 'OTP Verification Code' : 'Mã xác thực OTP'}
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant dark:text-slate-400 transition-colors duration-200 group-focus-within:text-primary">
                      key
                    </span>
                    <input 
                      type="text"
                      id="otp" 
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength={6}
                      className="w-full pl-12 pr-md py-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-slate-900 dark:text-white transition-all placeholder-slate-400 dark:placeholder-slate-500 text-center tracking-widest font-semibold"
                    />
                  </div>
                </div>

                {/* New Password field */}
                <div className="space-y-xs">
                  <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none" htmlFor="password">
                    {lang === 'en' ? 'New Password' : 'Mật khẩu mới'}
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant dark:text-slate-400 transition-colors duration-200 group-focus-within:text-primary">
                      lock
                    </span>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      id="password" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-[48px] py-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-slate-900 dark:text-white transition-all placeholder-slate-400 dark:placeholder-slate-500"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Confirm Password field */}
                <div className="space-y-xs">
                  <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none" htmlFor="confirmPassword">
                    {lang === 'en' ? 'Confirm New Password' : 'Xác nhận mật khẩu mới'}
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant dark:text-slate-400 transition-colors duration-200 group-focus-within:text-primary">
                      lock_reset
                    </span>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword" 
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-md py-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-slate-900 dark:text-white transition-all placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 dark:bg-sky-600 dark:hover:bg-sky-500 text-white py-md rounded-lg font-label-md text-label-md uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-sm disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      {lang === 'en' ? 'Update Password' : 'Cập nhật mật khẩu'}
                      <span className="material-symbols-outlined text-[20px]">save</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <footer className="mt-xl pt-xl border-t border-outline-variant dark:border-slate-800 text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-500 opacity-50 select-none">
                © 2026 MedCore Systems. HIPAA Compliant Interface.
              </p>
            </footer>
          </div>

        </div>
      </main>
    </div>
  );
}
