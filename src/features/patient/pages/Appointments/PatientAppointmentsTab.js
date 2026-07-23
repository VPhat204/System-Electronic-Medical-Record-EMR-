import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../auth/context/AuthContext';
import appointmentService from '../../../appointments/services/appointmentService';

export default function PatientAppointmentsTab({ lang, t, onOpenBooking }) {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError('');
      const data = await appointmentService.getPatientAppointments(token);
      setAppointments(data || []);
    } catch (err) {
      console.error(err);
      setError(lang === 'vi' ? 'Không thể tải danh sách lịch hẹn.' : 'Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [token]);

  // Helper formatting helper
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300';
      case 'PENDING':
      default:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300';
    }
  };

  return (
    <div className="space-y-lg text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md border-b border-outline-variant dark:border-slate-800 pb-md">
        <div>
          <h2 className="font-headline-lg text-2xl font-bold text-on-surface dark:text-white">
            {lang === 'vi' ? 'Lịch hẹn khám bệnh' : 'My Appointments'}
          </h2>
          <p className="text-body-sm text-on-surface-variant dark:text-slate-400">
            {lang === 'vi' ? 'Theo dõi các lịch khám đã đăng ký và đặt lịch mới' : 'Track your scheduled consultations and book new visits'}
          </p>
        </div>
        <button
          onClick={onOpenBooking}
          className="flex items-center gap-sm bg-primary hover:bg-primary-container text-white py-2.5 px-md rounded-lg font-label-md text-label-md transition-all active:scale-[0.98] shadow-sm cursor-pointer border-none"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          {lang === 'vi' ? 'Đặt lịch khám mới' : 'Book New Appointment'}
        </button>
      </div>

      {error && (
        <div className="p-md bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-lg text-body-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-md">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
          <p className="text-on-surface-variant dark:text-slate-450 text-body-md animate-pulse">
            {lang === 'vi' ? 'Đang tải danh sách lịch hẹn...' : 'Loading appointments...'}
          </p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-xl text-center min-h-[350px] flex flex-col items-center justify-center space-y-md shadow-sm">
          <span className="material-symbols-outlined text-[64px] text-primary/50 dark:text-primary-fixed-dim/50">
            calendar_today
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">
            {lang === 'vi' ? 'Chưa có lịch hẹn khám nào' : 'No Scheduled Appointments'}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 max-w-md mx-auto">
            {lang === 'vi' 
              ? 'Bạn hiện không có lịch khám nào được xếp lịch. Hãy đặt lịch khám đầu tiên của bạn để được các bác sĩ MedCore chăm sóc.' 
              : 'You do not have any upcoming consultations scheduled. Book an appointment to consult with our medical professionals.'}
          </p>
          <button
            onClick={onOpenBooking}
            className="bg-primary hover:bg-primary-container text-white py-2 px-lg rounded-lg font-label-md text-label-md transition-all active:scale-[0.98] border-none cursor-pointer mt-sm"
          >
            {lang === 'vi' ? 'Đặt lịch ngay' : 'Book Appointment Now'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {appointments.map((appt) => (
            <div 
              key={appt.id} 
              className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary dark:text-primary-fixed-dim shrink-0">
                      <span className="material-symbols-outlined text-[28px]">
                        {appt.department?.DepartmentCode === 'KB' || appt.department?.DepartmentCode === 'CC' ? 'emergency' : 'medical_services'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-[16px] font-bold text-on-surface dark:text-white">
                        {appt.department?.DepartmentName || (lang === 'vi' ? 'Khám tổng quát' : 'General Checkup')}
                      </h4>
                      <p className="text-body-sm text-secondary dark:text-teal-400 font-medium">
                        {appt.doctor?.fullName ? `${lang === 'vi' ? 'Bác sĩ' : 'Dr.'} ${appt.doctor.fullName}` : (lang === 'vi' ? 'Chưa chỉ định bác sĩ' : 'Unassigned Doctor')}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase ${getStatusColor(appt.status)}`}>
                    {appt.status}
                  </span>
                </div>

                <div className="border-t border-b border-outline-variant dark:border-slate-700 py-sm grid grid-cols-2 gap-sm">
                  <div className="flex items-center gap-xs text-body-sm text-on-surface-variant dark:text-slate-450">
                    <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
                    <span>{formatDate(appt.appointmentDate)}</span>
                  </div>
                  <div className="flex items-center gap-xs text-body-sm text-on-surface-variant dark:text-slate-450">
                    <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                    <span>{appt.appointmentTime}</span>
                  </div>
                </div>

                {appt.symptoms && (
                  <div className="text-left bg-slate-50 dark:bg-slate-900/50 p-sm rounded-lg text-body-sm">
                    <span className="font-bold text-on-surface dark:text-slate-350 block mb-1">
                      {lang === 'vi' ? 'Triệu chứng lâm sàng:' : 'Clinical Symptoms:'}
                    </span>
                    <p className="text-on-surface-variant dark:text-slate-400 line-clamp-3">
                      {appt.symptoms}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-md flex justify-between items-center text-[12px] text-outline">
                <span>Ref ID: HMS-{appt.id}</span>
                <span>
                  {appt.hasInsurance 
                    ? (lang === 'vi' ? 'Áp dụng BHYT' : 'Insurance covered') 
                    : (lang === 'vi' ? 'Thanh toán trực tiếp' : 'Direct payment')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
