import React, { useState } from 'react';

export default function PatientAppointmentsTab({ lang, t }) {
  const [step, setStep] = useState(1);
  const [specialty, setSpecialty] = useState('Cardiology');
  const [doctor, setDoctor] = useState('Dr. Alexander Sterling');
  const [selectedDate, setSelectedDate] = useState('Oct 24, 2026');
  const [selectedTime, setSelectedTime] = useState('02:00 PM - 02:30 PM');
  const [reason, setReason] = useState('');

  const specialties = [
    { id: 'Cardiology', name: lang === 'vi' ? 'Tim mạch' : 'Cardiology', desc: lang === 'vi' ? '4 chuyên gia trực sẵn hôm nay' : '4 Specialists available today', icon: 'cardiology' },
    { id: 'Neurology', name: lang === 'vi' ? 'Thần kinh' : 'Neurology', desc: lang === 'vi' ? '2 chuyên gia làm việc' : '2 Specialists available', icon: 'neurology' }
  ];

  const doctors = {
    Cardiology: [
      {
        name: 'Dr. Alexander Sterling',
        role: lang === 'vi' ? 'Trưởng khoa Tim mạch' : 'Chief of Cardiology',
        rating: '4.9 (120 reviews)',
        available: lang === 'vi' ? 'Hôm nay, 2:00 PM' : 'Today, 2:00 PM',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAahH73Uzv24Zo7SN8jwROZ4vYwEyqHuZGC_vtzBVZPKLrKnFBRmmfGLNQeMUaIUw4pulRmknvxh9NDoOhrhwSeEhEVx3-MPxqyUE5SFrz-ztFwPr5nWT8uSKW7nELRAFk7IWVMcUhgEaT2iGUDxm5JLy3rT5Q5v-kcKblzaMR78M1_g1_vYuLkcJ79Jyz3uqB7avluotARMjcSJJAOZ2fhDqtMnUrAtQ4S4EgJvr3dbvXBAROO78KE'
      },
      {
        name: 'Dr. Sarah Jenkins',
        role: lang === 'vi' ? 'Bác sĩ Tim mạch can thiệp' : 'Interventional Cardiologist',
        rating: '4.8 (95 reviews)',
        available: lang === 'vi' ? 'Ngày mai, 9:00 AM' : 'Tomorrow, 9:00 AM',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXCZA8iOgavQFu1pchXmdLhE3Ti_qIMkUsGWHBqpk6luA0VlRw3-gIUkeK2gs_cI2suoO-2fljNrPd_wcPdgFydohP3u3eRRYIySm8wJCku0XcQQP_HIoUOCFXmr0bd-9jkgtvNv0cVwWjtw9dPMZrO3kNFZiKGXXgUb5UTIzgkHMsvx5jiJd1cml2VxDcvexxWl3r3iQkpT6uNy6VQ1xPC4oJm-ZH_5pvfc2CKg_pcB73cH9zJlBB'
      }
    ],
    Neurology: [
      {
        name: 'Dr. Robert Chen',
        role: lang === 'vi' ? 'Trưởng khoa Thần kinh' : 'Chief of Neurology',
        rating: '4.7 (80 reviews)',
        available: lang === 'vi' ? 'Ngày mai, 10:30 AM' : 'Tomorrow, 10:30 AM',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO0qF7sZAPmSvu21x2jAN-YjKqVtEhbaP4kYFUusTXaEzrnkJZWDVxxiMmvq8iCTIMqNNLwVVcmDwLXVkItLnKlmq8VEwHc5DskJmX-1HqvjZczx4DQkZZDL0G_GVAvtQgmLYpE0ziRJ8iG3J1D2jO0twzidMQArR5rArc0BcYHff24kMZoGYzvk3llv3quk9nlEiVJU05WD33e8rKEgeJVFyhrZwGPMB9nWzm7qlCmRSn1TBjzCaZ'
      }
    ]
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else {
      alert(lang === 'vi' ? 'Đăng ký lịch hẹn thành công!' : 'Appointment scheduled successfully!');
      setStep(1);
    }
  };

  const currentDoctorObj = (doctors[specialty] || []).find(d => d.name === doctor) || doctors.Cardiology[0];

  return (
    <div className="space-y-lg text-left">
      
      {/* STEP INDICATOR */}
      <div className="max-w-5xl mx-auto mb-xl">
        <div className="flex items-center justify-between relative px-xl">
          {/* Line background */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-container-highest dark:bg-slate-700 -z-10 -translate-y-1/2"></div>
          
          {[
            { id: 1, label: lang === 'vi' ? 'Khoa khám' : 'Specialty' },
            { id: 2, label: lang === 'vi' ? 'Thời gian' : 'Schedule' },
            { id: 3, label: lang === 'vi' ? 'Triệu chứng' : 'Reason' },
            { id: 4, label: lang === 'vi' ? 'Xác nhận' : 'Confirm' }
          ].map((s) => {
            const isActive = step >= s.id;
            return (
              <div 
                key={s.id} 
                onClick={() => { if (step > s.id) setStep(s.id); }}
                className={`flex flex-col items-center gap-sm bg-background dark:bg-slate-900 px-2 ${step > s.id ? 'cursor-pointer group' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm transition-all ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-container-highest dark:bg-slate-800 text-on-surface-variant dark:text-slate-400 border border-outline-variant dark:border-slate-700'
                } ${step > s.id ? 'group-hover:scale-105' : ''}`}>
                  {s.id}
                </div>
                <span className={`font-label-md text-label-md transition-colors ${isActive ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'} ${step > s.id ? 'group-hover:underline' : ''}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex flex-col lg:flex-row gap-lg">
        
        {/* LEFT PANEL: THE BOOKING STEPS */}
        <div className="flex-[3] space-y-lg">
          
          {/* SECTION 1: Select Specialty & Doctor */}
          <div className={`bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg transition-opacity duration-300 ${step !== 1 ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex items-center justify-between mb-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">
                {lang === 'vi' ? 'Chọn Chuyên khoa & Bác sĩ' : 'Select Department & Specialist'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {specialties.map((spec) => {
                const isActive = specialty === spec.id;
                return (
                  <div 
                    key={spec.id}
                    onClick={() => {
                      setSpecialty(spec.id);
                      const defaultDoc = doctors[spec.id]?.[0]?.name || '';
                      setDoctor(defaultDoc);
                    }}
                    className={`border-2 rounded-lg p-md cursor-pointer transition-all ${
                      isActive 
                        ? 'border-primary bg-primary-container/10 dark:bg-blue-950/20' 
                        : 'border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary'
                    }`}
                  >
                    <div className="flex items-start gap-md">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isActive ? 'bg-primary text-white' : 'bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-300'}`}>
                        <span className="material-symbols-outlined text-3xl">
                          {spec.id === 'Cardiology' ? 'cardiology' : 'neurology'}
                        </span>
                      </div>
                      <div>
                        <h3 className={`font-headline-sm text-lg font-bold ${isActive ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface dark:text-white'}`}>{spec.name}</h3>
                        <p className="text-body-sm text-on-surface-variant dark:text-slate-400">{spec.desc}</p>
                      </div>
                      {isActive && <span className="material-symbols-outlined ml-auto text-primary dark:text-primary-fixed-dim">check_circle</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <h4 className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 mt-xl mb-md uppercase tracking-wider">
              {lang === 'vi' ? `BÁC SĨ CHUYÊN KHOA ${specialty === 'Cardiology' ? 'TIM MẠCH' : 'THẦN KINH'} CÓ SẴN` : `AVAILABLE ${specialty.toUpperCase()} SPECIALISTS`}
            </h4>
            
            <div className="grid grid-cols-1 gap-sm">
              {(doctors[specialty] || []).map((doc) => {
                const isSelected = doctor === doc.name;
                return (
                  <div 
                    key={doc.name}
                    onClick={() => setDoctor(doc.name)}
                    className={`flex items-center p-md border rounded-lg transition-colors cursor-pointer ${
                      isSelected 
                        ? 'border-primary ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900 bg-surface-container-low dark:bg-slate-900/40' 
                        : 'border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <img className="w-14 h-14 rounded-full object-cover mr-md border border-outline-variant" alt={doc.name} src={doc.avatar} />
                    <div className="flex-1">
                      <p className="font-headline-sm text-base font-bold text-on-surface dark:text-white">{doc.name}</p>
                      <p className="text-body-sm text-secondary dark:text-teal-400 font-medium">{doc.role}</p>
                      <div className="flex items-center gap-xs mt-xs text-body-sm text-on-surface-variant dark:text-slate-400">
                        <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                        <span>{doc.rating}</span>
                        <span className="mx-xs">•</span>
                        <span>{lang === 'vi' ? `Kế tiếp: ${doc.available}` : `Next available: ${doc.available}`}</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">
                      {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: Choose Date & Time */}
          <div className={`bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg transition-opacity duration-300 ${step !== 2 ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-md mb-lg">
              <span className="w-8 h-8 rounded-full bg-surface-container-highest dark:bg-slate-700 flex items-center justify-center font-bold text-on-surface-variant dark:text-slate-400">2</span>
              <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">
                {lang === 'vi' ? 'Chọn Ngày & Giờ khám' : 'Choose Date & Time'}
              </h2>
            </div>
            
            {step === 2 ? (
              <div className="space-y-md">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
                  {['Oct 24, 2026', 'Oct 25, 2026', 'Oct 26, 2026'].map((d) => (
                    <button 
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`p-md border rounded-lg text-center font-bold transition-all ${selectedDate === d ? 'border-primary bg-primary/5 text-primary dark:text-primary-fixed-dim' : 'border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-800 text-on-surface dark:text-white'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md pt-md">
                  {['09:00 AM - 09:30 AM', '10:30 AM - 11:00 AM', '02:00 PM - 02:30 PM', '03:30 PM - 04:00 PM'].map((tVal) => (
                    <button 
                      key={tVal}
                      onClick={() => setSelectedTime(tVal)}
                      className={`p-md border rounded-lg text-center transition-all ${selectedTime === tVal ? 'border-primary bg-primary/5 text-primary dark:text-primary-fixed-dim font-bold' : 'border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-800 text-on-surface dark:text-white'}`}
                    >
                      {tVal}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center border-2 border-dashed border-outline-variant dark:border-slate-700 rounded-lg">
                <p className="text-on-surface-variant dark:text-slate-400 font-label-md">
                  {lang === 'vi' ? 'Hoàn thành Bước 1 để chọn lịch hẹn' : 'Complete Step 1 to select availability'}
                </p>
              </div>
            )}
          </div>

          {/* SECTION 3: Visit Reason */}
          <div className={`bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg transition-opacity duration-300 ${step !== 3 ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-md mb-lg">
              <span className="w-8 h-8 rounded-full bg-surface-container-highest dark:bg-slate-700 flex items-center justify-center font-bold text-on-surface-variant dark:text-slate-400">3</span>
              <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">
                {lang === 'vi' ? 'Lý do khám bệnh & Triệu chứng' : 'Reason for Visit'}
              </h2>
            </div>
            
            {step === 3 && (
              <textarea 
                rows="4"
                placeholder={lang === 'vi' ? 'Nhập chi tiết các triệu chứng hoặc lý do đăng ký khám định kỳ...' : 'Enter your symptoms or routine checkup details...'}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-md bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-body-md text-on-surface dark:text-white placeholder-slate-400"
              />
            )}
          </div>

        </div>

        {/* RIGHT PANEL: SUMMARY SIDEBAR */}
        <div className="flex-1">
          <div className="sticky top-24 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-primary p-md text-white text-left">
              <h3 className="font-headline-sm text-lg font-bold">{lang === 'vi' ? 'Tóm tắt lịch hẹn' : 'Booking Summary'}</h3>
            </div>
            <div className="p-lg space-y-lg text-left">
              {/* Doctor Details */}
              <div className="flex items-center gap-md">
                <div className="w-16 h-16 rounded-xl bg-surface-container dark:bg-slate-900 overflow-hidden shrink-0 border border-outline-variant">
                  <img className="w-full h-full object-cover" alt="Doctor profile avatar" src={currentDoctorObj.avatar} />
                </div>
                <div>
                  <p className="text-body-sm text-on-surface-variant dark:text-slate-400 font-medium">{lang === 'vi' ? 'Bác sĩ phụ trách' : 'Selected Specialist'}</p>
                  <p className="font-headline-sm text-base font-bold text-on-surface dark:text-white">{currentDoctorObj.name}</p>
                  <p className="text-body-sm text-secondary dark:text-teal-400">{lang === 'vi' ? `Khoa ${specialty === 'Cardiology' ? 'Tim mạch' : 'Thần kinh'}` : `${specialty} Department`}</p>
                </div>
              </div>
              
              <hr className="border-outline-variant dark:border-slate-700" />
              
              {/* Schedule Slots */}
              <div className="space-y-sm">
                <div className="flex items-center justify-between text-body-md text-on-surface dark:text-white">
                  <span className="text-on-surface-variant dark:text-slate-400 flex items-center gap-xs">
                    <span className="material-symbols-outlined text-lg">calendar_today</span> 
                    {lang === 'vi' ? 'Ngày hẹn' : 'Date'}
                  </span>
                  <span className="font-semibold">{selectedDate}</span>
                </div>
                <div className="flex items-center justify-between text-body-md text-on-surface dark:text-white">
                  <span className="text-on-surface-variant dark:text-slate-400 flex items-center gap-xs">
                    <span className="material-symbols-outlined text-lg">schedule</span> 
                    {lang === 'vi' ? 'Thời gian' : 'Time'}
                  </span>
                  <span className="font-semibold">{selectedTime}</span>
                </div>
              </div>
              
              <hr className="border-outline-variant dark:border-slate-700" />
              
              {/* Estimated Consultation Fee */}
              <div className="bg-surface-container-low dark:bg-slate-900/60 p-md rounded-lg">
                <div className="flex justify-between items-center mb-xs text-body-sm text-on-surface-variant dark:text-slate-400">
                  <span>{lang === 'vi' ? 'Phí tư vấn tạm tính' : 'Consultation Fee'}</span>
                  <span className="font-data-mono">150,000 ₫</span>
                </div>
                <div className="flex justify-between items-center text-primary dark:text-primary-fixed-dim font-bold">
                  <span>{lang === 'vi' ? 'Tổng tiền dự kiến' : 'Total Estimated'}</span>
                  <span>150,000 ₫</span>
                </div>
              </div>

              {/* Steps control button */}
              <div className="flex gap-md">
                {step > 1 && (
                  <button 
                    onClick={() => setStep(prev => prev - 1)}
                    className="flex-1 border border-outline dark:border-slate-700 text-on-surface-variant dark:text-slate-350 py-md rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-sm active:scale-95"
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                    {lang === 'vi' ? 'Quay lại' : 'Back'}
                  </button>
                )}
                <button 
                  onClick={handleNextStep}
                  className={`bg-primary text-white py-md rounded-lg font-bold hover:opacity-95 transition-all flex items-center justify-center gap-sm active:scale-95 shadow-sm ${step > 1 ? 'flex-[2]' : 'w-full'}`}
                >
                  {step === 1 && (lang === 'vi' ? 'Tiếp tục chọn ngày giờ' : 'Continue to Schedule')}
                  {step === 2 && (lang === 'vi' ? 'Tiếp tục điền lý do' : 'Continue to Reason')}
                  {step === 3 && (lang === 'vi' ? 'Xác nhận đăng ký' : 'Confirm Registration')}
                  {step === 4 && (lang === 'vi' ? 'Đặt lịch ngay' : 'Book Appointment Now')}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
              <p className="text-body-sm text-center text-on-surface-variant dark:text-slate-400 italic">
                {lang === 'vi' ? '* Chưa yêu cầu thanh toán ở bước này.' : '* No payment required at this step.'}
              </p>
            </div>
          </div>

          {/* Safety Protocols Card */}
          <div className="mt-lg p-lg bg-surface-container-high/40 dark:bg-slate-800/30 rounded-xl border border-outline-variant dark:border-slate-700 text-left">
            <div className="flex items-start gap-sm">
              <span className="material-symbols-outlined text-secondary dark:text-teal-400">verified_user</span>
              <div>
                <p className="font-label-md text-on-surface dark:text-white">{lang === 'vi' ? 'Giao thức An toàn & Vô trùng' : 'Safety Protocols'}</p>
                <p className="text-body-sm text-on-surface-variant dark:text-slate-400 mt-xs">
                  {lang === 'vi' 
                    ? 'Tất cả các phòng khám đều tuân thủ các quy tắc tiệt trùng lâm sàng nghiêm ngặt bảo vệ sức khỏe của bạn.' 
                    : 'All our facilities follow strict clinical sterilization guidelines for your safety.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
