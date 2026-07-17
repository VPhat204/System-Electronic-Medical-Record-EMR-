import React, { useState, useContext } from 'react';

import { ToastContext } from '../../../shared/context/ToastContext';
import { AuthContext } from '../context/AuthContext';

export default function Login({ onNavigate }) {
  const { login } = useContext(AuthContext);
  const { success, error } = useContext(ToastContext);

  const [lang, setLang] = useState('EN'); // 'EN' or 'VN'
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!identity.trim()) {
      newErrors.identity = lang === 'EN' ? 'Username or Email is required.' : 'Tài khoản hoặc Email là bắt buộc.';
    }
    
    if (!password) {
      newErrors.password = lang === 'EN' ? 'Password is required.' : 'Mật khẩu là bắt buộc.';
    } else if (password.length < 6) {
      newErrors.password = lang === 'EN' ? 'Password must be at least 6 characters.' : 'Mật khẩu phải dài ít nhất 6 ký tự.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    login(identity, password)
      .then((user) => {
        setLoading(false);
        const msg = lang === 'EN' ? 'Login successful! Redirecting...' : 'Đăng nhập thành công! Đang chuyển hướng...';
        success(msg);
        setSuccessMsg(msg);
        setTimeout(() => {
          onNavigate(`${user.role}-dashboard`);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        const errMsg = err.message || (lang === 'EN' ? 'Invalid credentials.' : 'Thông tin đăng nhập không chính xác.');
        error(errMsg);
        setErrors({
          apiError: errMsg
        });
      });
  };

  return (
    <div 
      className="text-on-background min-h-screen flex items-center justify-center p-0 md:p-0 transition-colors duration-200 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/emr_login_bg.png')" }}
    >
      {/* Dark/Light Contrast Overlay Mask */}
      <div className="absolute inset-0 bg-slate-950/30 dark:bg-slate-950/60 z-0 pointer-events-none" />

      {/* Aurora Ambient Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 dark:bg-primary/35 blur-[120px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/20 dark:bg-teal-500/35 blur-[120px] pointer-events-none z-0 animate-pulse" />
      
      {/* Language Switcher (Top Right) */}
      <div className="fixed top-lg right-lg z-50 flex gap-sm bg-surface-container-low dark:bg-slate-800 p-xs rounded shadow-sm border border-outline-variant dark:border-slate-700 transition-colors duration-200">
        <button 
          onClick={() => setLang('EN')}
          className={`px-sm py-xs font-label-md text-label-md rounded shadow-sm transition-all ${
            lang === 'EN' 
              ? 'text-primary dark:text-sky-400 bg-surface-container-lowest dark:bg-slate-700 font-semibold' 
              : 'text-on-surface-variant dark:text-slate-400 hover:text-primary'
          }`}
        >
          EN
        </button>
        <button 
          onClick={() => setLang('VN')}
          className={`px-sm py-xs font-label-md text-label-md rounded shadow-sm transition-all ${
            lang === 'VN' 
              ? 'text-primary dark:text-sky-400 bg-surface-container-lowest dark:bg-slate-700 font-semibold' 
              : 'text-on-surface-variant dark:text-slate-400 hover:text-primary'
          }`}
        >
          VN
        </button>
      </div>

      {/* Centered Login Card */}
      <main className="w-full max-w-md bg-white/85 dark:bg-slate-900/90 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-outline-variant/30 dark:border-slate-800 shadow-2xl relative z-10 my-8">
        
        {/* Back to Home Button */}
        <button 
          onClick={() => onNavigate('home')}
          className="absolute top-4 left-4 inline-flex items-center gap-1 font-semibold text-xs text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-sky-400 transition-colors cursor-pointer z-20"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          {lang === 'EN' ? 'Back to Home' : 'Quay lại Trang chủ'}
        </button>

        <div className="w-full mx-auto mt-4">

          {/* Logo Header */}
          <div className="flex flex-col items-center gap-sm mb-lg text-center">
            <div className="flex items-center gap-md cursor-pointer hover:scale-105 transition-transform" onClick={() => onNavigate('home')}>
              <span className="material-symbols-outlined text-primary dark:text-sky-400 text-headline-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                medical_services
              </span>
              <h1 className="font-headline-md text-headline-md font-semibold text-slate-900 dark:text-white">
                MedEMR
              </h1>
            </div>
          </div>

            {successMsg ? (
              <div className="text-center py-xl flex flex-col items-center justify-center space-y-md animate-fade-in">
                <span className="material-symbols-outlined text-[64px] text-green-500 animate-bounce">
                  check_circle
                </span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white">
                  {successMsg}
                </h3>
              </div>
            ) : (
              <div>
                <header className="mb-xl">
                  <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-xs">
                    {lang === 'EN' ? 'Professional Portal' : 'Cổng thông tin chuyên nghiệp'}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">
                    {lang === 'EN' 
                      ? 'Sign in to access patient records and clinical tools.'
                      : 'Đăng nhập để truy cập hồ sơ bệnh nhân và công cụ lâm sàng.'
                    }
                  </p>
                </header>

                <form onSubmit={handleLoginSubmit} className="space-y-lg">
                  {errors.apiError && (
                    <div className="bg-red-500/10 text-red-500 p-md rounded-lg text-body-md flex items-center gap-sm border border-red-500/20">
                      <span className="material-symbols-outlined">error</span>
                      <span>{errors.apiError}</span>
                    </div>
                  )}
                  {/* Username/Email Field */}
                  <div className="space-y-xs">
                    <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300" htmlFor="identity">
                      {lang === 'EN' ? 'Username or Email' : 'Tên tài khoản hoặc Email'}
                    </label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant dark:text-slate-400 transition-colors duration-200 group-focus-within:text-primary">
                        person
                      </span>
                      <input 
                        type="text"
                        id="identity" 
                        placeholder={lang === 'EN' ? 'Enter your credentials' : 'Nhập tài khoản của bạn'}
                        value={identity}
                        onChange={(e) => { setIdentity(e.target.value); setErrors({...errors, identity: ''}); }}
                        required
                        className="w-full pl-12 pr-md py-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-slate-900 dark:text-white transition-all placeholder-slate-400 dark:placeholder-slate-500"
                      />
                    </div>
                    {errors.identity && (
                      <p className="text-red-500 text-body-sm flex items-center gap-[2px] mt-xs">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        {errors.identity}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-xs">
                    <div className="flex justify-between items-center">
                      <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300" htmlFor="password">
                        {lang === 'EN' ? 'Password' : 'Mật khẩu'}
                      </label>
                      <button 
                        type="button"
                        onClick={() => onNavigate('forgot-password')}
                        className="font-label-md text-label-md text-primary dark:text-sky-400 hover:underline"
                      >
                        {lang === 'EN' ? 'Forgot Password?' : 'Quên mật khẩu?'}
                      </button>
                    </div>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant dark:text-slate-400 transition-colors duration-200 group-focus-within:text-primary">
                        lock
                      </span>
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        id="password" 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setErrors({...errors, password: ''}); }}
                        required
                        className="w-full pl-12 pr-[48px] py-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-slate-900 dark:text-white transition-all placeholder-slate-400 dark:placeholder-slate-500"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-body-sm flex items-center gap-[2px] mt-xs">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center gap-sm">
                    <input 
                      type="checkbox"
                      id="remember" 
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-primary dark:bg-slate-800 focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                    <label className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 cursor-pointer select-none" htmlFor="remember">
                      {lang === 'EN' ? 'Remember this device' : 'Ghi nhớ thiết bị này'}
                    </label>
                  </div>

                  {/* Login Button */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 dark:bg-sky-600 dark:hover:bg-sky-500 text-white py-md rounded-lg font-label-md text-label-md uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        {lang === 'EN' ? 'Login to Dashboard' : 'Đăng nhập vào bảng điều khiển'}
                        <span className="material-symbols-outlined text-[20px]">login</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Support & Registration */}
                <footer className="mt-xl pt-xl border-t border-outline-variant dark:border-slate-800 text-center space-y-md">
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">
                    {lang === 'EN' ? 'Patient seeking medical history?' : 'Bệnh nhân đang tìm kiếm lịch sử y tế?'}
                  </p>
                  <button 
                    onClick={() => onNavigate('register')}
                    className="inline-flex items-center gap-xs font-label-md text-label-md text-primary dark:text-sky-400 bg-primary/10 dark:bg-sky-500/10 hover:bg-primary/20 dark:hover:bg-sky-500/20 px-lg py-sm rounded-full transition-all"
                  >
                    {lang === 'EN' ? 'Register for a Patient Account' : 'Đăng ký tài khoản bệnh nhân'}
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                  
                  <div className="pt-xl flex flex-wrap justify-center gap-md font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 opacity-60">
                    <button className="hover:text-primary hover:underline">{lang === 'EN' ? 'Support Center' : 'Trung tâm hỗ trợ'}</button>
                    <span>•</span>
                    <button className="hover:text-primary hover:underline">{lang === 'EN' ? 'Privacy Standards' : 'Tiêu chuẩn bảo mật'}</button>
                    <span>•</span>
                    <button className="hover:text-primary hover:underline">{lang === 'EN' ? 'Terms' : 'Điều khoản'}</button>
                  </div>
                  
                  <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-500 opacity-50 mt-sm">
                    © 2026 MedCore Systems. HIPAA Compliant Interface.
                  </p>
                </footer>
              </div>
            )}

        </div>
      </main>

    </div>
  );
}
