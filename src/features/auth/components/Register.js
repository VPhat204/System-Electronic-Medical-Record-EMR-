import React, { useState, useEffect, useContext } from 'react';

import { ToastContext } from '../../../shared/context/ToastContext';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../../../shared/context/LanguageContext';

export default function Register({ onNavigate }) {
  const { register } = useContext(AuthContext);
  const { success, error } = useContext(ToastContext);
  const { lang, setLang, t } = useContext(LanguageContext);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Form States
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    name: '',
    dob: '',
    gender: '',
    idNumber: '',
    // Step 2: Contact Info
    phone: '',
    email: '',
    province: '',
    district: '',
    ward: '',
    street: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    // Step 3: Account Security
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [provincesList, setProvincesList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [wardsList, setWardsList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/location/provinces')
      .then(res => res.json())
      .then(data => setProvincesList(data))
      .catch(err => console.error('Error fetching provinces:', err));
  }, []);

  const handleProvinceChange = (provinceName) => {
    handleInputChange('province', provinceName);
    setFormData(prev => ({ ...prev, district: '', ward: '' }));
    setDistrictsList([]);
    setWardsList([]);

    const selectedProv = provincesList.find(p => p.name === provinceName);
    if (selectedProv) {
      fetch(`http://localhost:5000/api/location/districts?provinceId=${selectedProv.id}`)
        .then(res => res.json())
        .then(data => setDistrictsList(data))
        .catch(err => console.error('Error fetching districts:', err));
    }
  };

  const handleDistrictChange = (districtName) => {
    handleInputChange('district', districtName);
    setFormData(prev => ({ ...prev, ward: '' }));
    setWardsList([]);

    const selectedDist = districtsList.find(d => d.name === districtName);
    if (selectedDist) {
      fetch(`http://localhost:5000/api/location/wards?districtId=${selectedDist.id}`)
        .then(res => res.json())
        .then(data => setWardsList(data))
        .catch(err => console.error('Error fetching wards:', err));
    }
  };

  // Validate password strength
  useEffect(() => {
    const val = formData.password;
    let strength = 0;
    if (val.length > 6) strength += 25;
    if (val.match(/[A-Z]/)) strength += 25;
    if (val.match(/[0-9]/)) strength += 25;
    if (val.match(/[^a-zA-Z0-9]/)) strength += 25;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const getStrengthText = () => {
    if (passwordStrength <= 25) {
      return { 
        text: lang === 'en' ? 'Weak password' : 'Mật khẩu yếu', 
        color: 'text-error', 
        barColor: 'bg-error' 
      };
    } else if (passwordStrength <= 75) {
      return { 
        text: lang === 'en' ? 'Medium password' : 'Mật khẩu trung bình', 
        color: 'text-tertiary-container dark:text-amber-400', 
        barColor: 'bg-tertiary-container' 
      };
    } else {
      return { 
        text: lang === 'en' ? 'Strong password' : 'Mật khẩu mạnh', 
        color: 'text-secondary dark:text-teal-400', 
        barColor: 'bg-secondary' 
      };
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = lang === 'en' ? 'Full Legal Name is required.' : 'Họ và tên hợp pháp là bắt buộc.';
      if (!formData.dob) newErrors.dob = lang === 'en' ? 'Date of Birth is required.' : 'Ngày sinh là bắt buộc.';
      if (!formData.gender) newErrors.gender = lang === 'en' ? 'Gender is required.' : 'Giới tính là bắt buộc.';
      if (!formData.idNumber.trim()) newErrors.idNumber = lang === 'en' ? 'ID / Passport Number is required.' : 'Số CMND/CCCD/Hộ chiếu là bắt buộc.';
    } else if (currentStep === 2) {
      if (!formData.phone.trim()) newErrors.phone = lang === 'en' ? 'Phone Number is required.' : 'Số điện thoại là bắt buộc.';
      if (!formData.email.trim()) {
        newErrors.email = lang === 'en' ? 'Email Address is required.' : 'Địa chỉ Email là bắt buộc.';
      } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email.trim())) {
        newErrors.email = lang === 'en' ? 'Email must end with @gmail.com.' : 'Email đăng ký phải có đuôi @gmail.com.';
      }
      if (!formData.province) newErrors.province = lang === 'en' ? 'Province / City is required.' : 'Tỉnh / Thành phố là bắt buộc.';
      if (!formData.street.trim()) newErrors.street = lang === 'en' ? 'Street Address is required.' : 'Số nhà, Tên đường là bắt buộc.';
      if (!formData.emergencyName.trim()) newErrors.emergencyName = lang === 'en' ? 'Emergency contact full name is required.' : 'Họ tên người liên hệ khẩn cấp là bắt buộc.';
      if (!formData.emergencyRelationship) newErrors.emergencyRelationship = lang === 'en' ? 'Relationship is required.' : 'Mối quan hệ là bắt buộc.';
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = lang === 'en' ? 'Emergency phone is required.' : 'Số điện thoại liên hệ khẩn cấp là bắt buộc.';
    } else if (currentStep === 3) {
      if (!formData.password) {
        newErrors.password = lang === 'en' ? 'Password is required.' : 'Mật khẩu là bắt buộc.';
      } else if (formData.password.length < 8) {
        newErrors.password = lang === 'en' ? 'Password must be at least 8 characters.' : 'Mật khẩu phải dài ít nhất 8 ký tự.';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = lang === 'en' ? 'Passwords do not match.' : 'Mật khẩu xác nhận không khớp.';
      }
      if (!formData.securityQuestion) newErrors.securityQuestion = lang === 'en' ? 'Security Question is required.' : 'Câu hỏi bảo mật là bắt buộc.';
      if (!formData.securityAnswer.trim()) newErrors.securityAnswer = lang === 'en' ? 'Security Answer is required.' : 'Câu trả lời bảo mật là bắt buộc.';
      if (!formData.termsAccepted) newErrors.termsAccepted = lang === 'en' ? 'You must accept the Terms and HIPAA Privacy Policy.' : 'Bạn phải đồng ý với Điều khoản và Chính sách bảo mật HIPAA.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      register(formData)
        .then(() => {
          setIsSubmitting(false);
          success(lang === 'en' ? 'Account registration successful! Please log in.' : 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
          onNavigate('login');
        })
        .catch((err) => {
          setIsSubmitting(false);
          const errMsg = err.message || (lang === 'en' ? 'Registration failed. Please try again.' : 'Đăng ký không thành công. Vui lòng thử lại.');
          error(errMsg);
          setErrors({
            apiError: errMsg
          });
        });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const strengthDetails = getStrengthText();

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 text-on-surface dark:text-slate-100 transition-colors duration-200 bg-cover bg-center"
      style={{ backgroundImage: "url('/emr_login_bg.png')" }}
    >
      {/* Dark/Light Contrast Overlay Mask */}
      <div className="absolute inset-0 bg-slate-950/30 dark:bg-slate-950/60 z-0 pointer-events-none" />

      {/* Aurora Ambient Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 dark:bg-primary/35 blur-[120px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/20 dark:bg-teal-500/35 blur-[120px] pointer-events-none z-0 animate-pulse" />

      {/* Top Bar Header */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-10 relative z-10">
        <div className="flex items-center gap-md cursor-pointer select-none" onClick={() => onNavigate('home')}>
          <span className="material-symbols-outlined text-primary dark:text-sky-400 text-headline-md" style={{ fontVariationSettings: "'FILL' 1" }}>
            medical_services
          </span>
          <h1 className="font-headline-sm text-headline-sm font-semibold text-slate-900 dark:text-white">
            MedEMR
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className="font-label-md text-label-md text-slate-500 dark:text-slate-300 hover:text-primary dark:hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            {lang === 'en' ? 'Home' : 'Trang chủ'}
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button 
            onClick={() => onNavigate('login')}
            className="font-label-md text-label-md text-slate-500 dark:text-slate-300 hover:text-primary dark:hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            {lang === 'en' ? 'Login' : 'Đăng nhập'}
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          
          {/* Language Switcher (Login Style) */}
          <div className="flex gap-sm bg-surface-container-low dark:bg-slate-800 p-xs rounded shadow-sm border border-outline-variant dark:border-slate-700 transition-colors duration-200 select-none">
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
        </div>
      </header>

      {/* Main Grid Wrapper */}
      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Navigation / Progress Stepper */}
        <div className="md:col-span-4 bg-white/85 dark:bg-slate-800/85 backdrop-blur-md p-8 rounded-xl border border-outline-variant/30 dark:border-slate-700 flex flex-col gap-8 h-full md:min-h-[500px] transition-colors duration-200 relative z-10 text-left">
          <h2 className="font-headline-md text-headline-md text-slate-900 dark:text-white leading-tight select-none">
            {t('register.sidebarTitle')}
          </h2>
          <p className="font-body-sm text-body-sm text-slate-500 dark:text-slate-400">
            {t('register.sidebarDesc')}
          </p>

          <nav className="flex flex-col gap-6 relative select-none">
            <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-slate-200 dark:bg-slate-700" />
            
            {/* Step 1 */}
            <div className={`flex items-center gap-4 relative z-10 ${currentStep === 1 ? 'text-blue-600 dark:text-blue-400 font-semibold' : currentStep > 1 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
              <div className={`w-8 h-8 rounded-full border-2 font-bold text-sm flex items-center justify-center transition-all ${
                currentStep === 1 
                  ? 'bg-blue-600 border-blue-600 text-white font-bold' 
                  : currentStep > 1 
                    ? 'bg-emerald-100 dark:bg-emerald-950/30 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500'
              }`}>
                {currentStep > 1 ? <span className="material-symbols-outlined text-[18px]">check</span> : '1'}
              </div>
              <div>
                <p className="font-label-md text-label-md">{t('register.stepLabel')} 1</p>
                <p className="font-body-sm text-body-sm truncate">{t('register.step1Title')}</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`flex items-center gap-4 relative z-10 ${currentStep === 2 ? 'text-blue-600 dark:text-blue-400 font-semibold' : currentStep > 2 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
              <div className={`w-8 h-8 rounded-full border-2 font-bold text-sm flex items-center justify-center transition-all ${
                currentStep === 2 
                  ? 'bg-blue-600 border-blue-600 text-white font-bold' 
                  : currentStep > 2 
                    ? 'bg-emerald-100 dark:bg-emerald-950/30 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500'
              }`}>
                {currentStep > 2 ? <span className="material-symbols-outlined text-[18px]">check</span> : '2'}
              </div>
              <div>
                <p className="font-label-md text-label-md">{t('register.stepLabel')} 2</p>
                <p className="font-body-sm text-body-sm truncate">{t('register.step2Title')}</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`flex items-center gap-4 relative z-10 ${currentStep === 3 ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
              <div className={`w-8 h-8 rounded-full border-2 font-bold text-sm flex items-center justify-center transition-all ${
                currentStep === 3 
                  ? 'bg-blue-600 border-blue-600 text-white font-bold' 
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500'
              }`}>
                3
              </div>
              <div>
                <p className="font-label-md text-label-md">{t('register.stepLabel')} 3</p>
                <p className="font-body-sm text-body-sm truncate">{t('register.step3Title')}</p>
              </div>
            </div>
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700 select-none">
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-primary dark:text-sky-400 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                lock
              </span>
              <span className="font-body-sm text-body-sm">{t('register.hipaaLabel')}</span>
            </div>
          </div>
        </div>

        {/* Form Content Area Card */}
        <div className="md:col-span-8 bg-white/85 dark:bg-slate-800/85 backdrop-blur-md p-8 rounded-xl border border-outline-variant/30 dark:border-slate-700 shadow-sm min-h-[500px] flex flex-col transition-colors duration-200 relative z-10">
          <form className="flex-grow animate-fade-in text-left" onSubmit={(e) => e.preventDefault()}>
            
            {/* STEP 1 CONTENT */}
            {currentStep === 1 && (
              <div className="step-pane animate-in fade-in duration-300">
                <div className="mb-6">
                  <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-2">{t('register.personalInfo')}</h3>
                  <div className="h-1 w-20 bg-primary-container rounded-full mb-6 animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 mb-1 select-none">{t('register.fullNameLabel')}</label>
                    <input 
                      type="text" 
                      placeholder={t('register.fullNamePlaceholder')}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full h-10 px-3 bg-surface dark:bg-slate-900 border border-outline dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-on-surface dark:text-white"
                    />
                    {errors.name && <p className="text-red-500 text-body-sm mt-xs">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 mb-1 select-none">{t('register.dobLabel')}</label>
                    <input 
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      className="w-full h-10 px-3 bg-surface dark:bg-slate-900 border border-outline dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-on-surface dark:text-white"
                    />
                    {errors.dob && <p className="text-red-500 text-body-sm mt-xs">{errors.dob}</p>}
                  </div>

                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 mb-1 select-none">{t('register.genderLabel')}</label>
                    <select 
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full h-10 px-3 bg-surface dark:bg-slate-900 border border-outline dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-on-surface dark:text-white"
                    >
                      <option value="">{t('register.selectGender')}</option>
                      <option value="male">{t('register.male')}</option>
                      <option value="female">{t('register.female')}</option>
                      <option value="non-binary">{t('register.nonBinary')}</option>
                      <option value="prefer-not-to-say">{t('register.preferNotToSay')}</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-body-sm mt-xs">{errors.gender}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 mb-1 select-none">{t('register.idNumberLabel')}</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400 text-[18px] select-none">
                        badge
                      </span>
                      <input 
                        type="text" 
                        placeholder="XXXX-XXXX-XXXX"
                        value={formData.idNumber}
                        onChange={(e) => handleInputChange('idNumber', e.target.value)}
                        className="w-full h-10 pl-10 pr-3 bg-surface dark:bg-slate-900 border border-outline dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-on-surface dark:text-white"
                      />
                    </div>
                    {errors.idNumber && <p className="text-red-500 text-body-sm mt-xs">{errors.idNumber}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 CONTENT */}
            {currentStep === 2 && (
              <div className="step-pane animate-in fade-in duration-300">
                <div className="mb-6">
                  <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-2">{t('register.contactDetails')}</h3>
                  <div className="h-1 w-20 bg-primary-container rounded-full mb-6 animate-pulse"></div>
                </div>

                <div className="space-y-lg">
                  {/* Basic Contacts */}
                  <div className="bg-surface-container-lowest dark:bg-slate-900/40 p-lg rounded-xl border border-outline-variant dark:border-slate-700">
                    <div className="flex items-center gap-sm mb-lg border-b border-outline-variant dark:border-slate-700 pb-md select-none">
                      <span className="material-symbols-outlined text-primary dark:text-sky-400">call</span>
                      <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t('register.basicContact')}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none">{t('register.phoneLabel')}</label>
                        <input 
                          type="tel" 
                          placeholder="0xxx xxx xxx"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg font-body-md text-body-md bg-surface dark:bg-slate-900 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        />
                        {errors.phone && <p className="text-red-500 text-body-sm mt-xs">{errors.phone}</p>}
                      </div>
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none">{t('register.emailLabel')}</label>
                        <input 
                          type="email" 
                          placeholder="example@gmail.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg font-body-md text-body-md bg-surface dark:bg-slate-900 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        />
                        {errors.email && <p className="text-red-500 text-body-sm mt-xs">{errors.email}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Permanent Address */}
                  <div className="bg-surface-container-lowest dark:bg-slate-900/40 p-lg rounded-xl border border-outline-variant dark:border-slate-700">
                    <div className="flex items-center gap-sm mb-lg border-b border-outline-variant dark:border-slate-700 pb-md select-none">
                      <span className="material-symbols-outlined text-primary dark:text-sky-400">location_on</span>
                      <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t('register.permanentAddress')}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-lg">
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none">{t('register.provinceLabel')}</label>
                        <select 
                          value={formData.province}
                          onChange={(e) => handleProvinceChange(e.target.value)}
                          className="w-full px-md py-sm border border-slate-200 dark:border-slate-700 rounded-lg font-body-md text-body-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                        >
                          <option value="">{t('register.selectProvince')}</option>
                          {provincesList.map(p => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                        {errors.province && <p className="text-red-500 text-body-sm mt-xs">{errors.province}</p>}
                      </div>
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none">{t('register.districtLabel')}</label>
                        <select 
                          value={formData.district}
                          onChange={(e) => handleDistrictChange(e.target.value)}
                          disabled={!formData.province}
                          className="w-full px-md py-sm border border-slate-200 dark:border-slate-700 rounded-lg font-body-md text-body-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none disabled:opacity-50"
                        >
                          <option value="">{t('register.selectDistrict')}</option>
                          {districtsList.map(d => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none">{t('register.wardLabel')}</label>
                        <select 
                          value={formData.ward}
                          onChange={(e) => handleInputChange('ward', e.target.value)}
                          disabled={!formData.district}
                          className="w-full px-md py-sm border border-slate-200 dark:border-slate-700 rounded-lg font-body-md text-body-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none disabled:opacity-50"
                        >
                          <option value="">{t('register.selectWard')}</option>
                          {wardsList.map(w => (
                            <option key={w.id} value={w.name}>{w.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-xs">
                      <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none">{t('register.streetLabel')}</label>
                      <input 
                        type="text" 
                        placeholder={t('register.streetPlaceholder')}
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg font-body-md text-body-md bg-surface dark:bg-slate-900 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                      {errors.street && <p className="text-red-500 text-body-sm mt-xs">{errors.street}</p>}
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-surface-container-lowest dark:bg-slate-900/40 p-lg rounded-xl border border-outline-variant dark:border-slate-700">
                    <div className="flex items-center gap-sm mb-lg border-b border-outline-variant dark:border-slate-700 pb-md select-none">
                      <span className="material-symbols-outlined text-error">contact_emergency</span>
                      <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t('register.emergencyContact')}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none">{t('register.emergencyNameLabel')}</label>
                        <input 
                          type="text" 
                          placeholder={t('register.emergencyNamePlaceholder')}
                          value={formData.emergencyName}
                          onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                          className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg font-body-md text-body-md bg-surface dark:bg-slate-900 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        />
                        {errors.emergencyName && <p className="text-red-500 text-body-sm mt-xs">{errors.emergencyName}</p>}
                      </div>
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none">{t('register.emergencyRelationshipLabel')}</label>
                        <select 
                          value={formData.emergencyRelationship}
                          onChange={(e) => handleInputChange('emergencyRelationship', e.target.value)}
                          className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg font-body-md text-body-md bg-surface dark:bg-slate-900 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                        >
                          <option value="">{t('register.selectRelationship')}</option>
                          <option value="ba-me">{t('register.relParent')}</option>
                          <option value="vo-chong">{t('register.relSpouse')}</option>
                          <option value="con">{t('register.relChild')}</option>
                          <option value="anh-chi-em">{t('register.relSibling')}</option>
                          <option value="khac">{t('register.relOther')}</option>
                        </select>
                        {errors.emergencyRelationship && <p className="text-red-500 text-body-sm mt-xs">{errors.emergencyRelationship}</p>}
                      </div>
                      <div className="md:col-span-2 space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none">{t('register.emergencyPhoneLabel')}</label>
                        <input 
                          type="tel" 
                          placeholder="0xxx xxx xxx"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                          className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg font-body-md text-body-md bg-surface dark:bg-slate-900 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        />
                        {errors.emergencyPhone && <p className="text-red-500 text-body-sm mt-xs">{errors.emergencyPhone}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 CONTENT */}
            {currentStep === 3 && (
                <div className="step-pane animate-in fade-in duration-300">
                  {errors.apiError && (
                    <div className="bg-red-500/10 text-red-500 p-md rounded-lg text-body-md mb-6 flex items-center gap-sm border border-red-500/20">
                      <span className="material-symbols-outlined">error</span>
                      <span>{errors.apiError}</span>
                    </div>
                  )}
                  <div className="mb-6 flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-2">{t('register.accountSecurity')}</h3>
                      <div className="h-1 w-20 bg-primary-container rounded-full mb-6 animate-pulse"></div>
                    </div>
                    <div className="bg-secondary-container/30 text-on-secondary-container dark:text-teal-300 px-md py-xs rounded-full flex items-center gap-xs select-none">
                      <span className="material-symbols-outlined text-[16px]">shield</span>
                      <span className="font-label-md text-[11px] uppercase tracking-wider">{t('register.dataSafeBadge')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {/* Username (disabled) */}
                    <div className="space-y-xs">
                      <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none">{t('register.usernameLabel')}</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          disabled 
                          value={formData.phone || '090 123 4567'}
                          className="w-full h-10 bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-400 border border-outline-variant dark:border-slate-700 px-md py-sm rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-not-allowed font-body-md"
                        />
                        <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/50">lock</span>
                      </div>
                    </div>

                    {/* Password inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none" htmlFor="newPassword">{t('register.newPasswordLabel')}</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? 'text' : 'password'}
                            id="newPassword" 
                            placeholder={t('register.passwordPlaceholder')}
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="w-full h-10 px-3 bg-surface dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-on-surface dark:text-white pr-12"
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400 hover:text-primary transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined">
                              {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                        {/* Password strength bar */}
                        <div className="h-1 w-full bg-surface-container-high dark:bg-slate-700 rounded-full overflow-hidden mt-xs">
                          <div 
                            className={`h-full strength-bar ${strengthDetails.barColor}`} 
                            style={{ width: `${passwordStrength}%` }}
                          />
                        </div>
                        <p className={`text-[11px] font-medium mt-base uppercase tracking-tighter select-none ${strengthDetails.color}`}>
                          {strengthDetails.text}
                        </p>
                        {errors.password && <p className="text-red-500 text-body-sm mt-xs">{errors.password}</p>}
                      </div>

                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none" htmlFor="confirmPassword">{t('register.confirmPasswordLabel')}</label>
                        <input 
                          type={showPassword ? 'text' : 'password'}
                          id="confirmPassword" 
                          placeholder={t('register.confirmPasswordPlaceholder')}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="w-full h-10 px-3 bg-surface dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-on-surface dark:text-white"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-body-sm mt-xs">{errors.confirmPassword}</p>}
                      </div>
                    </div>

                    {/* Security Question Section */}
                    <div className="space-y-md p-md bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg">
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none">{t('register.securityQuestionLabel')}</label>
                        <select 
                          value={formData.securityQuestion}
                          onChange={(e) => handleInputChange('securityQuestion', e.target.value)}
                          className="w-full bg-surface dark:bg-slate-900 border border-outline-variant dark:border-slate-700 px-md py-sm rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md text-on-surface dark:text-white"
                        >
                          <option value="">{t('register.selectQuestion')}</option>
                          <option value="1">{t('register.qPet')}</option>
                          <option value="2">{t('register.qCity')}</option>
                          <option value="3">{t('register.qMother')}</option>
                          <option value="4">{t('register.qFood')}</option>
                        </select>
                        {errors.securityQuestion && <p className="text-red-500 text-body-sm mt-xs">{errors.securityQuestion}</p>}
                      </div>
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 select-none">{t('register.securityAnswerLabel')}</label>
                        <input 
                          type="text" 
                          placeholder={t('register.securityAnswerPlaceholder')}
                          value={formData.securityAnswer}
                          onChange={(e) => handleInputChange('securityAnswer', e.target.value)}
                          className="w-full h-10 px-3 bg-surface dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-on-surface dark:text-white"
                        />
                        {errors.securityAnswer && <p className="text-red-500 text-body-sm mt-xs">{errors.securityAnswer}</p>}
                      </div>
                    </div>

                    {/* Terms Check */}
                    <div className="flex items-start gap-sm mt-md">
                      <input 
                        type="checkbox"
                        id="terms"
                        checked={formData.termsAccepted}
                        onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary transition-all cursor-pointer mt-[3px]"
                      />
                      <label htmlFor="terms" className="text-body-sm text-on-surface-variant dark:text-slate-300 leading-tight cursor-pointer select-none">
                        {t('register.termsLabel')}
                        <a className="text-primary dark:text-primary-fixed-dim font-bold hover:underline" href="#terms">{t('register.termsLink')}</a>
                        {t('register.andLabel')}
                        <a className="text-primary dark:text-primary-fixed-dim font-bold hover:underline" href="#privacy">{t('register.privacyLink')}</a>
                        {t('register.termsNote')}
                      </label>
                    </div>
                    {errors.termsAccepted && <p className="text-red-500 text-body-sm mt-xs">{errors.termsAccepted}</p>}
                  </div>
                </div>
              )}

            </form>

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between items-center select-none">
              <button 
                onClick={handlePrev}
                className={`px-6 py-2 rounded-lg font-label-md text-label-md text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors flex items-center gap-2 cursor-pointer ${
                  currentStep === 1 ? 'invisible' : 'visible'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                {t('register.prevBtn')}
              </button>

              <button 
                onClick={handleNext}
                disabled={isSubmitting}
                className={`px-8 py-2 text-white rounded-lg font-label-md text-label-md shadow transition-all flex items-center gap-2 cursor-pointer ${
                  currentStep === totalSteps 
                    ? 'bg-secondary hover:bg-teal-700' 
                    : 'bg-primary hover:bg-primary-container'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    {t('register.processing')}
                  </>
                ) : currentStep === totalSteps ? (
                  <>
                    {t('register.completeBtn')}
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                  </>
                ) : (
                  <>
                    {t('register.nextBtn')}
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </>
                )}
              </button>
            </div>
          </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full max-w-4xl mt-12 py-6 border-t border-outline-variant dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-on-surface-variant dark:text-slate-400 relative z-10 select-none">
        <p className="font-body-sm text-body-sm">{t('register.footerCopyright')}</p>
        <div className="flex gap-4 mt-4 md:mt-0 font-body-sm text-body-sm">
          <a className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors hover:underline" href="#privacy">{t('register.privacyPolicy')}</a>
          <a className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors hover:underline" href="#security">{t('register.securityStandards')}</a>
          <a className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors hover:underline" href="#support">{t('register.support')}</a>
        </div>
      </footer>

    </div>
  );
}
