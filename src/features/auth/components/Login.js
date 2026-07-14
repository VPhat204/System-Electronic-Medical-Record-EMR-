import React, { useState } from 'react';

export default function Login({ onNavigate }) {
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

    // Simulate login processing
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(lang === 'EN' ? 'Login successful! Redirecting...' : 'Đăng nhập thành công! Đang chuyển hướng...');
      setTimeout(() => {
        const lowerId = identity.toLowerCase();
        if (lowerId.includes('doctor')) {
          onNavigate('doctor-dashboard');
        } else if (lowerId.includes('receptionist') || lowerId.includes('letan') || lowerId.includes('le tan')) {
          onNavigate('receptionist-dashboard');
        } else {
          onNavigate('home');
        }
      }, 1500);
    }, 1500);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-0 md:p-0 transition-colors duration-200">
      
      {/* Language Switcher (Top Right) */}
      <div className="fixed top-lg right-lg z-50 flex gap-sm bg-surface-container-low dark:bg-slate-800 p-xs rounded shadow-sm border border-outline-variant dark:border-slate-700 transition-colors duration-200">
        <button 
          onClick={() => setLang('EN')}
          className={`px-sm py-xs font-label-md text-label-md rounded shadow-sm transition-all ${
            lang === 'EN' 
              ? 'text-primary dark:text-primary-fixed-dim bg-surface-container-lowest dark:bg-slate-700 font-semibold' 
              : 'text-on-surface-variant dark:text-slate-400 hover:text-primary'
          }`}
        >
          EN
        </button>
        <button 
          onClick={() => setLang('VN')}
          className={`px-sm py-xs font-label-md text-label-md rounded shadow-sm transition-all ${
            lang === 'VN' 
              ? 'text-primary dark:text-primary-fixed-dim bg-surface-container-lowest dark:bg-slate-700 font-semibold' 
              : 'text-on-surface-variant dark:text-slate-400 hover:text-primary'
          }`}
        >
          VN
        </button>
      </div>

      {/* Split Screen Container */}
      <main className="flex w-full min-h-screen overflow-hidden">
        
        {/* Left Side: Clinical Visuals (Hidden on Mobile) */}
        <section className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-primary-container">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary/45 to-transparent"></div>
          <div 
            className="w-full h-full bg-cover bg-center mix-blend-overlay opacity-80 scale-105 transform hover:scale-100 transition-all duration-700" 
            style={{ 
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA70VivwEQaKHhfUtoShE-qaqBYrPir8mQqZkgGaevDwnJ-Xv5xMVahYFs-fMGrx69s7zxf__T_n8aTOJGqO-1AG-8SD2BVTuzF2Py5lV5pnsGW2TwFc1t5lsb473Ogmxm2R9xmiLXTU1OOnRY5U-vu3Gbxow5gye4DWY5JQU34b9nh943aozHHRXaJ6iLU0Jh9PlftojDgHjwZ18X8nbZL_dRT7HS8CwSFqGMMWzpKOwUCt9BO_cvf')" 
            }}
            data-alt="Modern clinical reception dawn lobby"
          />
          
          {/* Branding Overlay */}
          <div className="absolute bottom-xl left-xl z-20 max-w-lg">
            <h1 className="font-headline-xl text-headline-xl text-surface-container-lowest mb-sm cursor-pointer" onClick={() => onNavigate('home')}>
              MedCore EMR
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed">
              {lang === 'EN' 
                ? 'Precision-engineered electronic medical records for the next generation of healthcare providers. Empowering clinical excellence through intuitive data management.'
                : 'Hồ sơ bệnh án điện tử được thiết kế chính xác cho thế hệ nhà cung cấp dịch vụ y tế tiếp theo. Nâng cao hiệu quả lâm sàng thông qua quản lý dữ liệu trực quan.'
              }
            </p>
            <div className="mt-lg flex items-center gap-md">
              <div className="flex items-center gap-xs text-surface-container-lowest opacity-90">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span className="font-label-md text-label-md">HIPAA Compliant</span>
              </div>
              <div className="w-1 h-1 bg-surface-container-lowest rounded-full opacity-40"></div>
              <div className="flex items-center gap-xs text-surface-container-lowest opacity-90">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span className="font-label-md text-label-md">256-bit Encryption</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Login Form */}
        <section className="w-full lg:w-2/5 flex flex-col justify-center bg-surface-container-lowest dark:bg-slate-900 px-margin md:px-xl py-xl border-l border-outline-variant dark:border-slate-800 transition-colors duration-200">
          <div className="max-w-md w-full mx-auto">
            
            {/* Mobile Logo */}
            <div className="lg:hidden mb-xl">
              <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim cursor-pointer" onClick={() => onNavigate('home')}>
                MedCore EMR
              </span>
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
                  {/* Username/Email Field */}
                  <div className="space-y-xs">
                    <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300" htmlFor="identity">
                      {lang === 'EN' ? 'Username or Email' : 'Tên tài khoản hoặc Email'}
                    </label>
                    <div className="relative group">
                      <span className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant dark:text-slate-400 transition-colors duration-200 group-focus-within:text-primary">
                        person
                      </span>
                      <input 
                        type="text"
                        id="identity" 
                        placeholder={lang === 'EN' ? 'Enter your credentials' : 'Nhập tài khoản của bạn'}
                        value={identity}
                        onChange={(e) => { setIdentity(e.target.value); setErrors({...errors, identity: ''}); }}
                        required
                        className="w-full pl-xl pr-md py-md bg-surface dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-on-surface dark:text-white transition-all placeholder-slate-400 dark:placeholder-slate-500"
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
                        onClick={() => alert(lang === 'EN' ? 'Password recovery link has been sent!' : 'Liên kết khôi phục mật khẩu đã được gửi!')}
                        className="font-label-md text-label-md text-primary dark:text-primary-fixed-dim hover:underline"
                      >
                        {lang === 'EN' ? 'Forgot Password?' : 'Quên mật khẩu?'}
                      </button>
                    </div>
                    <div className="relative group">
                      <span className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant dark:text-slate-400 transition-colors duration-200 group-focus-within:text-primary">
                        lock
                      </span>
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        id="password" 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setErrors({...errors, password: ''}); }}
                        required
                        className="w-full pl-xl pr-[48px] py-md bg-surface dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-on-surface dark:text-white transition-all placeholder-slate-400 dark:placeholder-slate-500"
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
                      className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                    <label className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 cursor-pointer select-none" htmlFor="remember">
                      {lang === 'EN' ? 'Remember this device' : 'Ghi nhớ thiết bị này'}
                    </label>
                  </div>

                  {/* Login Button */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary-container text-white py-md rounded-lg font-label-md text-label-md uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-sm disabled:opacity-50"
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
                    onClick={() => { window.location.hash = '#register'; }}
                    className="inline-flex items-center gap-xs font-label-md text-label-md text-primary dark:text-primary-fixed-dim bg-secondary-fixed/20 dark:bg-slate-800 hover:bg-secondary-fixed/40 dark:hover:bg-slate-700 px-lg py-sm rounded-full transition-all"
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
        </section>

      </main>

    </div>
  );
}
