import React, { useState, useEffect } from 'react';

export default function Register({ onNavigate }) {
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
      return { text: 'Mật khẩu yếu', color: 'text-error', barColor: 'bg-error' };
    } else if (passwordStrength <= 75) {
      return { text: 'Mật khẩu trung bình', color: 'text-tertiary-container dark:text-amber-400', barColor: 'bg-tertiary-container' };
    } else {
      return { text: 'Mật khẩu mạnh', color: 'text-secondary dark:text-teal-400', barColor: 'bg-secondary' };
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full Legal Name is required.';
      if (!formData.dob) newErrors.dob = 'Date of Birth is required.';
      if (!formData.gender) newErrors.gender = 'Gender is required.';
      if (!formData.idNumber.trim()) newErrors.idNumber = 'ID / Passport Number is required.';
    } else if (currentStep === 2) {
      if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required.';
      if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (!formData.province) newErrors.province = 'Tỉnh / Thành phố is required.';
      if (!formData.street.trim()) newErrors.street = 'Số nhà, Tên đường is required.';
      if (!formData.emergencyName.trim()) newErrors.emergencyName = 'Emergency contact full name is required.';
      if (!formData.emergencyRelationship) newErrors.emergencyRelationship = 'Relationship is required.';
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required.';
    } else if (currentStep === 3) {
      if (!formData.password) {
        newErrors.password = 'Password is required.';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters.';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
      if (!formData.securityQuestion) newErrors.securityQuestion = 'Security Question is required.';
      if (!formData.securityAnswer.trim()) newErrors.securityAnswer = 'Security Answer is required.';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the Terms and HIPAA Privacy Policy.';
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
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Registration submitted successfully! Please check your email for verification.');
        onNavigate('home');
      }, 1500);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const strengthDetails = getStrengthText();

  // Mock location lists
  const districts = {
    hanoi: ['Quận Ba Đình', 'Quận Cầu Giấy', 'Quận Hoàn Kiếm', 'Quận Hai Bà Trưng'],
    hcm: ['Quận 1', 'Quận 3', 'Quận Bình Thạnh', 'Quận Tân Bình', 'Thủ Đức'],
    danang: ['Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn']
  };

  const wards = {
    'Quận Cầu Giấy': ['Phường Dịch Vọng', 'Phường Quan Hoa', 'Phường Nghĩa Đô'],
    'Quận 1': ['Phường Bến Nghé', 'Phường Bến Thành', 'Phường Đa Kao'],
    'Quận Hải Châu': ['Phường Hòa Cường Bắc', 'Phường Hòa Cường Nam', 'Phường Thạch Thang']
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background dark:bg-slate-900 text-on-surface dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Bar Header */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-8 h-8 bg-primary-container dark:bg-slate-800 rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container dark:text-primary-fixed-dim text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              health_and_safety
            </span>
          </div>
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
            MedCore EMR
          </span>
        </div>
        <button 
          onClick={() => { window.location.hash = '#login'; }}
          className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Login
        </button>
      </header>

      {/* Main Grid Wrapper */}
      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Navigation / Progress Stepper */}
        <div className="md:col-span-4 bg-surface-container-low dark:bg-slate-800 p-8 rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col gap-8 h-full md:min-h-[500px] transition-colors duration-200">
          <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">
            Patient Registration
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">
            Please complete the following steps to establish your electronic medical record.
          </p>

          <nav className="flex flex-col gap-6 relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-outline-variant dark:bg-slate-700" />
            
            {/* Step 1 */}
            <div className={`flex items-center gap-4 relative z-10 ${currentStep === 1 ? 'step-active' : currentStep > 1 ? 'text-secondary' : 'step-inactive text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full border-2 font-bold text-sm flex items-center justify-center transition-all ${
                currentStep === 1 
                  ? 'bg-primary border-primary text-white font-bold' 
                  : currentStep > 1 
                    ? 'bg-secondary-container border-secondary text-on-secondary-container' 
                    : 'bg-surface-container-high dark:bg-slate-700 border-outline-variant dark:border-slate-600 text-on-surface-variant'
              }`}>
                {currentStep > 1 ? <span className="material-symbols-outlined text-[18px]">check</span> : '1'}
              </div>
              <div>
                <p className="font-label-md text-label-md">Step 1</p>
                <p className="font-body-sm text-body-sm">Personal Information</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`flex items-center gap-4 relative z-10 ${currentStep === 2 ? 'step-active' : currentStep > 2 ? 'text-secondary' : 'step-inactive text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full border-2 font-bold text-sm flex items-center justify-center transition-all ${
                currentStep === 2 
                  ? 'bg-primary border-primary text-white font-bold' 
                  : currentStep > 2 
                    ? 'bg-secondary-container border-secondary text-on-secondary-container' 
                    : 'bg-surface-container-high dark:bg-slate-700 border-outline-variant dark:border-slate-600 text-on-surface-variant'
              }`}>
                {currentStep > 2 ? <span className="material-symbols-outlined text-[18px]">check</span> : '2'}
              </div>
              <div>
                <p className="font-label-md text-label-md">Step 2</p>
                <p className="font-body-sm text-body-sm">Contact Details</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`flex items-center gap-4 relative z-10 ${currentStep === 3 ? 'step-active' : 'step-inactive text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full border-2 font-bold text-sm flex items-center justify-center transition-all ${
                currentStep === 3 
                  ? 'bg-primary border-primary text-white font-bold' 
                  : 'bg-surface-container-high dark:bg-slate-700 border-outline-variant dark:border-slate-600 text-on-surface-variant'
              }`}>
                3
              </div>
              <div>
                <p className="font-label-md text-label-md">Step 3</p>
                <p className="font-body-sm text-body-sm">Account Security</p>
              </div>
            </div>
          </nav>

          <div className="mt-auto pt-6 border-t border-outline-variant dark:border-slate-700">
            <div className="flex items-center gap-3 text-on-surface-variant dark:text-slate-400">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                lock
              </span>
              <span className="font-body-sm text-body-sm">HIPAA Compliant Data Encryption</span>
            </div>
          </div>
        </div>

        {/* Form Content Area Card */}
        <div className="md:col-span-8 bg-white dark:bg-slate-800 p-8 rounded-xl border border-outline-variant dark:border-slate-700 shadow-sm min-h-[500px] flex flex-col transition-colors duration-200">
          <form className="flex-grow animate-fade-in" onSubmit={(e) => e.preventDefault()}>
            
            {/* STEP 1 CONTENT */}
            {currentStep === 1 && (
              <div className="step-pane animate-in fade-in duration-300">
                <div className="mb-6">
                  <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-2">Personal Information</h3>
                  <div className="h-1 w-20 bg-primary-container rounded-full mb-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 mb-1">Full Legal Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full h-10 px-3 bg-surface dark:bg-slate-900 border border-outline dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-on-surface dark:text-white"
                    />
                    {errors.name && <p className="text-red-500 text-body-sm mt-xs">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 mb-1">Date of Birth</label>
                    <input 
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      className="w-full h-10 px-3 bg-surface dark:bg-slate-900 border border-outline dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-on-surface dark:text-white"
                    />
                    {errors.dob && <p className="text-red-500 text-body-sm mt-xs">{errors.dob}</p>}
                  </div>

                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 mb-1">Gender</label>
                    <select 
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full h-10 px-3 bg-surface dark:bg-slate-900 border border-outline dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-on-surface dark:text-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-body-sm mt-xs">{errors.gender}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300 mb-1">ID / Passport Number</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400 text-[18px]">
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
                  <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-2">Contact Details</h3>
                  <div className="h-1 w-20 bg-primary-container rounded-full mb-6"></div>
                </div>

                <div className="space-y-lg">
                  {/* Basic Contacts */}
                  <div className="bg-surface-container-lowest dark:bg-slate-900/40 p-lg rounded-xl border border-outline-variant dark:border-slate-700">
                    <div className="flex items-center gap-sm mb-lg border-b border-outline-variant dark:border-slate-700 pb-md">
                      <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">call</span>
                      <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">Liên hệ cơ bản</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">Số điện thoại di động *</label>
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
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">Địa chỉ Email</label>
                        <input 
                          type="email" 
                          placeholder="example@medcore.vn"
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
                    <div className="flex items-center gap-sm mb-lg border-b border-outline-variant dark:border-slate-700 pb-md">
                      <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">location_on</span>
                      <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">Địa chỉ thường trú</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-lg">
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">Tỉnh/Thành phố *</label>
                        <select 
                          value={formData.province}
                          onChange={(e) => {
                            handleInputChange('province', e.target.value);
                            setFormData(prev => ({ ...prev, district: '', ward: '' }));
                          }}
                          className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg font-body-md text-body-md bg-surface dark:bg-slate-900 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                        >
                          <option value="">Chọn Tỉnh/Thành phố</option>
                          <option value="hanoi">Hà Nội</option>
                          <option value="hcm">TP. Hồ Chí Minh</option>
                          <option value="danang">Đà Nẵng</option>
                        </select>
                        {errors.province && <p className="text-red-500 text-body-sm mt-xs">{errors.province}</p>}
                      </div>
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">Quận/Huyện *</label>
                        <select 
                          value={formData.district}
                          onChange={(e) => {
                            handleInputChange('district', e.target.value);
                            setFormData(prev => ({ ...prev, ward: '' }));
                          }}
                          disabled={!formData.province}
                          className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg font-body-md text-body-md bg-surface dark:bg-slate-900 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none disabled:opacity-50"
                        >
                          <option value="">Chọn Quận/Huyện</option>
                          {formData.province && districts[formData.province].map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">Phường/Xã *</label>
                        <select 
                          value={formData.ward}
                          onChange={(e) => handleInputChange('ward', e.target.value)}
                          disabled={!formData.district || !wards[formData.district]}
                          className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg font-body-md text-body-md bg-surface dark:bg-slate-900 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none disabled:opacity-50"
                        >
                          <option value="">Chọn Phường/Xã</option>
                          {formData.district && wards[formData.district] && wards[formData.district].map((w) => (
                            <option key={w} value={w}>{w}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-xs">
                      <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">Số nhà, Tên đường *</label>
                      <input 
                        type="text" 
                        placeholder="Ví dụ: 123 Đường Lê Lợi"
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg font-body-md text-body-md bg-surface dark:bg-slate-900 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                      {errors.street && <p className="text-red-500 text-body-sm mt-xs">{errors.street}</p>}
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-surface-container-lowest dark:bg-slate-900/40 p-lg rounded-xl border border-outline-variant dark:border-slate-700">
                    <div className="flex items-center gap-sm mb-lg border-b border-outline-variant dark:border-slate-700 pb-md">
                      <span className="material-symbols-outlined text-error">contact_emergency</span>
                      <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">Liên hệ khẩn cấp</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">Họ và tên người thân *</label>
                        <input 
                          type="text" 
                          placeholder="Nhập họ và tên"
                          value={formData.emergencyName}
                          onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                          className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg font-body-md text-body-md bg-surface dark:bg-slate-900 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        />
                        {errors.emergencyName && <p className="text-red-500 text-body-sm mt-xs">{errors.emergencyName}</p>}
                      </div>
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">Mối quan hệ *</label>
                        <select 
                          value={formData.emergencyRelationship}
                          onChange={(e) => handleInputChange('emergencyRelationship', e.target.value)}
                          className="w-full px-md py-sm border border-outline-variant dark:border-slate-700 rounded-lg font-body-md text-body-md bg-surface dark:bg-slate-900 text-on-surface dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                        >
                          <option value="">Chọn mối quan hệ</option>
                          <option value="ba-me">Bố/Mẹ</option>
                          <option value="vo-chong">Vợ/Chồng</option>
                          <option value="con">Con</option>
                          <option value="anh-chi-em">Anh/Chị/Em</option>
                          <option value="khac">Khác</option>
                        </select>
                        {errors.emergencyRelationship && <p className="text-red-500 text-body-sm mt-xs">{errors.emergencyRelationship}</p>}
                      </div>
                      <div className="md:col-span-2 space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">Số điện thoại liên hệ khẩn cấp *</label>
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
                  <div className="mb-6 flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-2">Account Security</h3>
                      <div className="h-1 w-20 bg-primary-container rounded-full mb-6"></div>
                    </div>
                    <div className="bg-secondary-container/30 text-on-secondary-container dark:text-teal-300 px-md py-xs rounded-full flex items-center gap-xs select-none">
                      <span className="material-symbols-outlined text-[16px]">shield</span>
                      <span className="font-label-md text-[11px] uppercase tracking-wider">Dữ liệu an toàn</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {/* Username (disabled) */}
                    <div className="space-y-xs">
                      <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">Tên đăng nhập (Mặc định là Số điện thoại)</label>
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
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300" htmlFor="newPassword">Mật khẩu mới</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? 'text' : 'password'}
                            id="newPassword" 
                            placeholder="Nhập mật khẩu"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="w-full h-10 px-3 bg-surface dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-md text-on-surface dark:text-white pr-12"
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400 hover:text-primary transition-colors"
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
                        <p className={`text-[11px] font-medium mt-base uppercase tracking-tighter ${strengthDetails.color}`}>
                          {strengthDetails.text}
                        </p>
                        {errors.password && <p className="text-red-500 text-body-sm mt-xs">{errors.password}</p>}
                      </div>

                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300" htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
                        <input 
                          type={showPassword ? 'text' : 'password'}
                          id="confirmPassword" 
                          placeholder="Xác nhận mật khẩu"
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
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">Security Question</label>
                        <select 
                          value={formData.securityQuestion}
                          onChange={(e) => handleInputChange('securityQuestion', e.target.value)}
                          className="w-full bg-surface dark:bg-slate-900 border border-outline-variant dark:border-slate-700 px-md py-sm rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md text-on-surface dark:text-white"
                        >
                          <option value="">Select a question</option>
                          <option value="1">What was the name of your first pet?</option>
                          <option value="2">What city were you born in?</option>
                          <option value="3">What is your mother's maiden name?</option>
                          <option value="4">Món ăn yêu thích của bạn thời thơ ấu?</option>
                        </select>
                        {errors.securityQuestion && <p className="text-red-500 text-body-sm mt-xs">{errors.securityQuestion}</p>}
                      </div>
                      <div className="space-y-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-300">Security Answer</label>
                        <input 
                          type="text" 
                          placeholder="Your Answer"
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
                        Tôi đồng ý với các <a className="text-primary dark:text-primary-fixed-dim font-bold hover:underline" href="#terms">Điều khoản Dịch vụ</a> và <a className="text-primary dark:text-primary-fixed-dim font-bold hover:underline" href="#privacy">Chính sách Bảo mật HIPAA</a>. Tôi hiểu rằng thông tin của mình sẽ được lưu trữ an toàn.
                      </label>
                    </div>
                    {errors.termsAccepted && <p className="text-red-500 text-body-sm mt-xs">{errors.termsAccepted}</p>}
                  </div>
                </div>
              )}

            </form>

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between items-center">
              <button 
                onClick={handlePrev}
                className={`px-6 py-2 rounded-lg font-label-md text-label-md text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors flex items-center gap-2 ${
                  currentStep === 1 ? 'invisible' : 'visible'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                Previous
              </button>

              <button 
                onClick={handleNext}
                disabled={isSubmitting}
                className={`px-8 py-2 text-white rounded-lg font-label-md text-label-md shadow transition-all flex items-center gap-2 ${
                  currentStep === totalSteps 
                    ? 'bg-secondary hover:bg-teal-700' 
                    : 'bg-primary hover:bg-primary-container'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    Processing...
                  </>
                ) : currentStep === totalSteps ? (
                  <>
                    Complete Registration
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                  </>
                ) : (
                  <>
                    Next Step
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </>
                )}
              </button>
            </div>
          </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full max-w-4xl mt-12 py-6 border-t border-outline-variant dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-on-surface-variant dark:text-slate-400">
        <p className="font-body-sm text-body-sm">© 2026 MedCore Systems. HIPAA Compliant Interface.</p>
        <div className="flex gap-4 mt-4 md:mt-0 font-body-sm text-body-sm">
          <a className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors hover:underline" href="#privacy">Privacy Policy</a>
          <a className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors hover:underline" href="#security">Security Standards</a>
          <a className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors hover:underline" href="#support">Support</a>
        </div>
      </footer>

    </div>
  );
}
