import React, { useState, useEffect } from 'react';

const doctorsData = [
  { name: 'Dr. Robert Sterling', department: 'Cardiology' },
  { name: 'Dr. Elena Rodriguez', department: 'Pediatrics' },
  { name: 'Dr. James Chen', department: 'Neurology' },
  { name: 'Dr. Sarah Thompson', department: 'Orthopedics' },
];

export default function BookingModal({ isOpen, onClose, initialDoctor, initialDepartment }) {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    phone: '',
    email: '',
    symptoms: '',
    hasInsurance: false,
  });

  const [errors, setErrors] = useState({});
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedDoctor(initialDoctor || '');
      setSelectedDepartment(initialDepartment || '');
      setSelectedDate('');
      setSelectedTime('');
      setPatientDetails({
        name: '',
        phone: '',
        email: '',
        symptoms: '',
        hasInsurance: false,
      });
      setErrors({});
    }
  }, [isOpen, initialDoctor, initialDepartment]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    const errs = {};
    if (step === 1) {
      if (!selectedDepartment) errs.department = 'Please select a department.';
      if (!selectedDoctor) errs.doctor = 'Please select a doctor.';
    } else if (step === 2) {
      if (!selectedDate) errs.date = 'Please pick a date.';
      if (!selectedTime) errs.time = 'Please pick a time slot.';
    } else if (step === 3) {
      if (!patientDetails.name.trim()) errs.name = 'Patient name is required.';
      if (!patientDetails.phone.trim()) errs.phone = 'Phone number is required.';
      if (!patientDetails.email.trim()) {
        errs.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientDetails.email)) {
        errs.email = 'Enter a valid email.';
      }
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    if (step === 3) {
      const randomRef = 'HMS-' + Math.floor(100000 + Math.random() * 900000);
      setBookingId(randomRef);
      setStep(4);
    } else {
      setStep(step + 1);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const timeSlots = ['08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-md">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-outline-variant dark:border-slate-700 transition-colors duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-lg border-b border-outline-variant dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">
              event_available
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">
              Schedule Consultation
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Step Progress Indicators */}
        {step < 4 && (
          <div className="flex justify-between px-xl pt-lg">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center gap-xs">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-body-sm font-semibold transition-all ${
                  step === num 
                    ? 'bg-primary-container text-white scale-110' 
                    : step > num 
                      ? 'bg-green-500 text-white' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                }`}>
                  {step > num ? (
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  ) : num}
                </div>
                <span className={`text-[12px] font-medium hidden sm:inline ${
                  step === num ? 'text-primary dark:text-primary-fixed-dim' : 'text-slate-400'
                }`}>
                  {num === 1 ? 'Specialist' : num === 2 ? 'Schedule' : 'Details'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Modal Body / Steps Content */}
        <div className="p-lg">
          
          {/* STEP 1: SELECT SPECIALIST & DEPT */}
          {step === 1 && (
            <div className="space-y-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface dark:text-slate-300 mb-xs">
                  Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setSelectedDoctor('');
                    setErrors({ ...errors, department: '' });
                  }}
                  className="w-full p-sm bg-white dark:bg-slate-800 text-on-surface dark:text-white border border-outline-variant dark:border-slate-700 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="">-- Choose Department --</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Diagnostics">Diagnostics</option>
                </select>
                {errors.department && <p className="text-red-500 text-body-sm mt-xs">{errors.department}</p>}
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface dark:text-slate-300 mb-xs">
                  Available Specialists
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => {
                    setSelectedDoctor(e.target.value);
                    setErrors({ ...errors, doctor: '' });
                  }}
                  disabled={!selectedDepartment}
                  className="w-full p-sm bg-white dark:bg-slate-800 text-on-surface dark:text-white border border-outline-variant dark:border-slate-700 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                >
                  <option value="">-- Choose Specialist --</option>
                  {doctorsData
                    .filter((d) => d.department === selectedDepartment)
                    .map((d, idx) => (
                      <option key={idx} value={d.name}>{d.name}</option>
                    ))}
                  {selectedDepartment && doctorsData.filter((d) => d.department === selectedDepartment).length === 0 && (
                    <option value="Duty Medical Specialist">Duty Medical Specialist ({selectedDepartment})</option>
                  )}
                </select>
                {errors.doctor && <p className="text-red-500 text-body-sm mt-xs">{errors.doctor}</p>}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT DATE & TIME */}
          {step === 2 && (
            <div className="space-y-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface dark:text-slate-300 mb-xs">
                  Consultation Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setErrors({ ...errors, date: '' });
                  }}
                  className="w-full p-sm bg-white dark:bg-slate-800 text-on-surface dark:text-white border border-outline-variant dark:border-slate-700 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                {errors.date && <p className="text-red-500 text-body-sm mt-xs">{errors.date}</p>}
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface dark:text-slate-300 mb-sm">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-3 gap-sm">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setSelectedTime(slot);
                        setErrors({ ...errors, time: '' });
                      }}
                      className={`py-sm text-body-sm font-semibold rounded border transition-all duration-150 ${
                        selectedTime === slot
                          ? 'bg-primary-container text-white border-transparent shadow'
                          : 'bg-slate-50 dark:bg-slate-700 text-on-surface dark:text-slate-200 border-outline-variant dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="text-red-500 text-body-sm mt-xs">{errors.time}</p>}
              </div>
            </div>
          )}

          {/* STEP 3: PATIENT INFORMATION */}
          {step === 3 && (
            <div className="space-y-sm max-h-[350px] overflow-y-auto pr-xs">
              <div>
                <label className="block font-label-md text-label-md text-on-surface dark:text-slate-300 mb-xs">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={patientDetails.name}
                  onChange={(e) => {
                    setPatientDetails({ ...patientDetails, name: e.target.value });
                    setErrors({ ...errors, name: '' });
                  }}
                  className="w-full p-sm bg-white dark:bg-slate-800 text-on-surface dark:text-white border border-outline-variant dark:border-slate-700 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                {errors.name && <p className="text-red-500 text-body-sm mt-xs">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface dark:text-slate-300 mb-xs">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (555) 000-1111"
                    value={patientDetails.phone}
                    onChange={(e) => {
                      setPatientDetails({ ...patientDetails, phone: e.target.value });
                      setErrors({ ...errors, phone: '' });
                    }}
                    className="w-full p-sm bg-white dark:bg-slate-800 text-on-surface dark:text-white border border-outline-variant dark:border-slate-700 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                  {errors.phone && <p className="text-red-500 text-body-sm mt-xs">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface dark:text-slate-300 mb-xs">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={patientDetails.email}
                    onChange={(e) => {
                      setPatientDetails({ ...patientDetails, email: e.target.value });
                      setErrors({ ...errors, email: '' });
                    }}
                    className="w-full p-sm bg-white dark:bg-slate-800 text-on-surface dark:text-white border border-outline-variant dark:border-slate-700 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                  {errors.email && <p className="text-red-500 text-body-sm mt-xs">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface dark:text-slate-300 mb-xs">
                  Brief Medical Symptoms
                </label>
                <textarea
                  rows="2"
                  placeholder="Describe your current symptoms or reason for visit..."
                  value={patientDetails.symptoms}
                  onChange={(e) => setPatientDetails({ ...patientDetails, symptoms: e.target.value })}
                  className="w-full p-sm bg-white dark:bg-slate-800 text-on-surface dark:text-white border border-outline-variant dark:border-slate-700 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="flex items-center gap-sm mt-md">
                <input
                  type="checkbox"
                  id="insurance-checkbox"
                  checked={patientDetails.hasInsurance}
                  onChange={(e) => setPatientDetails({ ...patientDetails, hasInsurance: e.target.checked })}
                  className="rounded border-slate-300 text-primary-container focus:ring-primary w-4 h-4 cursor-pointer"
                />
                <label htmlFor="insurance-checkbox" className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 cursor-pointer select-none">
                  Billing via covered health insurance partner
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && (
            <div className="text-center py-md space-y-md">
              <span className="material-symbols-outlined text-[64px] text-green-500 block animate-bounce">
                check_circle
              </span>
              <h4 className="font-headline-lg text-headline-lg text-on-surface dark:text-white">
                Appointment Booked!
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 max-w-sm mx-auto">
                Your consultation has been scheduled successfully. An appointment card and receipt has been sent to <strong className="text-primary dark:text-primary-fixed-dim">{patientDetails.email}</strong>.
              </p>

              {/* Summary Receipt Box */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-outline-variant dark:border-slate-700 p-md rounded-lg text-left text-body-sm space-y-[6px] max-w-xs mx-auto">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-[6px] font-semibold text-on-surface dark:text-white">
                  <span>Booking Ref:</span>
                  <span className="text-primary dark:text-primary-fixed-dim">{bookingId}</span>
                </div>
                <div className="flex justify-between pt-[4px]">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-medium text-on-surface dark:text-slate-300">{patientDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-medium text-on-surface dark:text-slate-300">{selectedDoctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dept:</span>
                  <span className="font-medium text-on-surface dark:text-slate-300">{selectedDepartment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Schedule:</span>
                  <span className="font-medium text-on-surface dark:text-slate-300">{selectedDate} @ {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Billing:</span>
                  <span className="font-medium text-on-surface dark:text-slate-300">
                    {patientDetails.hasInsurance ? 'Insurance Cover' : 'Direct Billing'}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex justify-between p-lg border-t border-outline-variant dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          {step > 1 && step < 4 ? (
            <button 
              onClick={handleBackStep}
              className="px-md py-sm border border-outline dark:border-slate-600 text-outline dark:text-slate-300 font-label-md text-label-md rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button 
              onClick={handleNextStep}
              className="px-xl py-sm bg-primary-container text-white font-label-md text-label-md rounded hover:bg-primary transition-all flex items-center gap-xs"
            >
              {step === 3 ? 'Confirm Appointment' : 'Next'}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          ) : (
            <button 
              onClick={onClose}
              className="w-full py-sm bg-primary-container text-white font-label-md text-label-md rounded hover:bg-primary transition-colors text-center"
            >
              Finish
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
