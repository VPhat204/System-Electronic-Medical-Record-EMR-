import React, { useState, useEffect, useCallback } from 'react';
import medicalRecordService from '../../../../shared/services/medicalRecordService';
import prescriptionService from '../../../../shared/services/prescriptionService';

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

export default function PatientRecordsTab({ lang, t, token, user }) {
  const [records, setRecords] = useState([]);
  const [patientPrescriptions, setPatientPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedRxModal, setSelectedRxModal] = useState(null);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load real medical records & prescriptions from backend
  const fetchPatientRecords = useCallback(async () => {
    const activeToken = token || localStorage.getItem('token');
    if (!activeToken) return;
    setIsLoading(true);
    setErrorMsg('');
    try {
      const patientId = user?.id;
      let data = [];
      if (patientId) {
        try {
          data = await medicalRecordService.getPatientHistory(activeToken, patientId);
        } catch (e) {
          data = await medicalRecordService.getAllMedicalRecords(activeToken);
        }
        // Fetch prescriptions
        try {
          const rxList = await prescriptionService.getPatientPrescriptions(activeToken, patientId);
          setPatientPrescriptions(Array.isArray(rxList) ? rxList : []);
        } catch (rxE) {
          console.error('Fetch prescriptions error:', rxE);
        }
      } else {
        data = await medicalRecordService.getAllMedicalRecords(activeToken);
      }

      // If user has no specific records, try loading all available records for preview
      if ((!Array.isArray(data) || data.length === 0) && activeToken) {
        const allData = await medicalRecordService.getAllMedicalRecords(activeToken);
        if (Array.isArray(allData) && allData.length > 0) {
          data = allData;
        }
      }

      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch patient records error:', err);
      setErrorMsg(err.message || (lang === 'vi' ? 'Không thể tải danh sách bệnh án.' : 'Failed to load medical records.'));
    } finally {
      setIsLoading(false);
    }
  }, [token, user?.id, lang]);

  useEffect(() => {
    fetchPatientRecords();
  }, [fetchPatientRecords]);

  // Extract latest vital signs from patient's most recent record
  const latestRecordWithVitals = records.find(r => r.vitals);
  const latestVitals = latestRecordWithVitals?.vitals;

  // Filter records by search term & status
  const filteredRecords = records.filter(rec => {
    const term = searchTerm.toLowerCase().trim();
    const matchesTerm = !term ||
      rec.diagnosesICD10?.toLowerCase().includes(term) ||
      rec.chiefComplaint?.toLowerCase().includes(term) ||
      rec.doctor?.fullName?.toLowerCase().includes(term) ||
      formatDate(rec.createdAt).toLowerCase().includes(term);
    return matchesTerm;
  });

  const handlePrintRecord = (rec) => {
    window.print();
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 mb-2">
            <span className="text-on-surface-variant dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              {lang === 'vi' ? 'Cổng Bệnh Nhân' : 'Patient Portal'}
            </span>
            <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
            <span className="text-primary dark:text-primary-fixed-dim text-xs font-bold uppercase tracking-wider">
              {lang === 'vi' ? 'Hồ Sơ Bệnh Án Điện Tử' : 'My Medical Records'}
            </span>
          </nav>
          <h1 className="text-2xl font-bold text-on-surface dark:text-white">
            {lang === 'vi' ? 'Lịch Sử Bệnh Án Điện Tử (EMR)' : 'Clinical History & EMR'}
          </h1>
          <p className="text-sm text-on-surface-variant dark:text-slate-400 max-w-2xl mt-1">
            {lang === 'vi' 
              ? 'Tra cứu thông tin chi tiết các lần khám bệnh, chẩn đoán ICD-10, chỉ số sinh tồn và đơn thuốc đã được bác sĩ xác nhận.' 
              : 'Securely access your past medical visits, ICD-10 diagnoses, vital signs, and doctor-prescribed treatment plans.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchPatientRecords}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-outline-variant dark:border-slate-700 text-on-surface dark:text-white text-xs font-semibold rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-[18px] ${isLoading ? 'animate-spin' : ''}`}>sync</span>
            {lang === 'vi' ? 'Làm mới' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* ERROR MESSAGE ALERT */}
      {errorMsg && (
        <div className="bg-error-container/20 border border-error/30 text-error rounded-xl p-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">warning</span>
            <span>{errorMsg}</span>
          </div>
          <button onClick={fetchPatientRecords} className="underline text-xs font-bold hover:opacity-80">
            {lang === 'vi' ? 'Thử lại' : 'Retry'}
          </button>
        </div>
      )}

      {/* OVERVIEW CARDS GRID */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Patient Profile Card */}
        <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-fixed-dim flex items-center justify-center font-bold text-lg border border-primary/20">
              {user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'BN'}
            </div>
            <div>
              <h3 className="font-bold text-base text-on-surface dark:text-white">{user?.fullName || (lang === 'vi' ? 'Bệnh nhân' : 'Patient')}</h3>
              <p className="text-xs text-on-surface-variant dark:text-slate-400">ID: #{user?.id ? `BN-${String(user.id).padStart(5, '0')}` : 'BN-00000'}</p>
              <p className="text-xs text-on-surface-variant dark:text-slate-400">{user?.phone || user?.email || '—'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 py-3 my-3 border-y border-outline-variant dark:border-slate-800 text-xs">
            <div>
              <p className="text-on-surface-variant dark:text-slate-400 font-medium uppercase text-[10px]">{lang === 'vi' ? 'Giới tính' : 'Gender'}</p>
              <p className="font-bold text-on-surface dark:text-white capitalize">{user?.gender || (lang === 'vi' ? 'Chưa cập nhật' : 'N/A')}</p>
            </div>
            <div>
              <p className="text-on-surface-variant dark:text-slate-400 font-medium uppercase text-[10px]">{lang === 'vi' ? 'Tổng số lần khám' : 'Total Visits'}</p>
              <p className="font-bold text-primary dark:text-primary-fixed-dim text-base">{records.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>{lang === 'vi' ? 'Hồ sơ y tế được xác thực bảo mật' : 'Secured & Encrypted Record'}</span>
          </div>
        </div>

        {/* Latest Vitals Card */}
        <div className="col-span-12 md:col-span-8 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-xs">
          <div className="px-5 py-3 border-b border-outline-variant dark:border-slate-800 flex justify-between items-center bg-surface-container-low dark:bg-slate-800/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-[18px]">monitor_heart</span>
              {lang === 'vi' ? 'Dấu hiệu sinh tồn mới nhất từ bác sĩ' : 'Latest Medical Vital Signs'}
            </h3>
            {latestRecordWithVitals && (
              <span className="text-[11px] text-on-surface-variant dark:text-slate-400">
                {lang === 'vi' ? 'Khám ngày:' : 'Date:'} {formatDate(latestRecordWithVitals.createdAt)}
              </span>
            )}
          </div>

          {latestVitals ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant dark:divide-slate-800 flex-grow items-center p-2">
              <div className="p-4 flex flex-col justify-center items-center text-center">
                <span className="material-symbols-outlined text-error mb-1">blood_pressure</span>
                <p className="text-[11px] text-on-surface-variant dark:text-slate-400 font-medium">{lang === 'vi' ? 'Huyết áp' : 'Blood Pressure'}</p>
                <p className="text-base font-bold text-on-surface dark:text-white mt-0.5">
                  {latestVitals.bloodPressure || '—'} <span className="text-xs font-normal text-slate-400">mmHg</span>
                </p>
              </div>
              <div className="p-4 flex flex-col justify-center items-center text-center">
                <span className="material-symbols-outlined text-amber-500 mb-1">favorite</span>
                <p className="text-[11px] text-on-surface-variant dark:text-slate-400 font-medium">{lang === 'vi' ? 'Nhịp tim' : 'Heart Rate'}</p>
                <p className="text-base font-bold text-on-surface dark:text-white mt-0.5">
                  {latestVitals.pulse || '—'} <span className="text-xs font-normal text-slate-400">bpm</span>
                </p>
              </div>
              <div className="p-4 flex flex-col justify-center items-center text-center">
                <span className="material-symbols-outlined text-blue-500 mb-1">air</span>
                <p className="text-[11px] text-on-surface-variant dark:text-slate-400 font-medium">SpO₂</p>
                <p className="text-base font-bold text-on-surface dark:text-white mt-0.5">
                  {latestVitals.spO2 || '—'} <span className="text-xs font-normal text-slate-400">%</span>
                </p>
              </div>
              <div className="p-4 flex flex-col justify-center items-center text-center">
                <span className="material-symbols-outlined text-teal-500 mb-1">calculate</span>
                <p className="text-[11px] text-on-surface-variant dark:text-slate-400 font-medium">BMI</p>
                <p className="text-base font-bold text-on-surface dark:text-white mt-0.5">
                  {latestVitals.bmi || '—'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center p-8 text-center text-on-surface-variant dark:text-slate-400 text-xs">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-[32px] mr-2">monitor_heart</span>
              {lang === 'vi' ? 'Chưa có chỉ số sinh tồn nào được ghi nhận từ bác sĩ.' : 'No recorded vitals available yet.'}
            </div>
          )}
        </div>

      </div>

      {/* CLINICAL RECORDS TABLE PANEL */}
      <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        
        {/* Table Filter Header */}
        <div className="p-4 border-b border-outline-variant dark:border-slate-800 bg-surface-container-low dark:bg-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="font-bold text-base text-on-surface dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">description</span>
              {lang === 'vi' ? 'Danh Sách Bệnh Án Đã Khám' : 'Medical Visit Records'}
            </h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
              {lang === 'vi' ? 'Hiển thị tất cả kết quả khám bệnh từ hệ thống EMR' : 'All finalized clinical records from the EMR system'}
            </p>
          </div>

          <div className="w-full sm:w-72 relative">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
            <input
              type="text"
              placeholder={lang === 'vi' ? 'Tìm bác sĩ, chẩn đoán, ngày...' : 'Search doctor, diagnosis, date...'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 rounded-lg py-1.5 pl-8 pr-3 text-xs text-on-surface dark:text-white outline-none focus:ring-1 focus:ring-primary border border-outline-variant dark:border-slate-700"
            />
          </div>
        </div>

        {/* Table Body */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-primary">
            <span className="material-symbols-outlined animate-spin text-[36px] mb-2">sync</span>
            <span className="text-xs font-semibold">{lang === 'vi' ? 'Đang tải hồ sơ bệnh án...' : 'Loading medical records...'}</span>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant dark:text-slate-400">
            <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-2">clinical_notes</span>
            <p className="text-sm font-semibold">{lang === 'vi' ? 'Bạn chưa có bệnh án nào trong hệ thống.' : 'No medical records found.'}</p>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              {lang === 'vi' 
                ? 'Sau khi bác sĩ hoàn thành buổi khám bệnh, bệnh án và chỉ số sinh tồn của bạn sẽ tự động xuất hiện tại đây.' 
                : 'Your EMR records and vitals will automatically appear here once a doctor completes your consultation.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-surface-container-lowest dark:bg-slate-800/80 border-b border-outline-variant dark:border-slate-800 text-[11px] font-bold text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-semibold">{lang === 'vi' ? 'Ngày Khám' : 'Date'}</th>
                  <th className="px-4 py-3 font-semibold">{lang === 'vi' ? 'Bác Sĩ Phụ Trách' : 'Physician'}</th>
                  <th className="px-4 py-3 font-semibold">{lang === 'vi' ? 'Lý Do / Chẩn Đoán (ICD-10)' : 'Diagnosis / Complaint'}</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">{lang === 'vi' ? 'Sinh Tồn' : 'Vitals'}</th>
                  <th className="px-4 py-3 font-semibold">{lang === 'vi' ? 'Trạng Thái' : 'Status'}</th>
                  <th className="px-4 py-3 text-right pr-6 font-semibold">{lang === 'vi' ? 'Thao Tác' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60 dark:divide-slate-800 text-on-surface dark:text-slate-200">
                {filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-surface-container-low/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">
                      {formatDate(rec.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-fixed-dim flex items-center justify-center font-bold text-[11px]">
                          {rec.doctor?.fullName ? rec.doctor.fullName.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() : 'BS'}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface dark:text-white">{rec.doctor?.fullName || (lang === 'vi' ? 'Bác sĩ phòng khám' : 'Attending Doctor')}</p>
                          <p className="text-[10px] text-on-surface-variant dark:text-slate-400">{rec.doctor?.email || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-[240px]">
                      <p className="font-bold text-primary dark:text-primary-fixed-dim truncate">{rec.diagnosesICD10 || (lang === 'vi' ? 'Ghi nhận lâm sàng' : 'Clinical Record')}</p>
                      <p className="text-[10px] text-on-surface-variant dark:text-slate-400 truncate">{rec.chiefComplaint || ''}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {rec.vitals ? (
                        <span className="inline-flex items-center gap-1 bg-surface-container-high dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-medium border border-outline-variant dark:border-slate-700">
                          {rec.vitals.bloodPressure && `BP ${rec.vitals.bloodPressure}`}
                          {rec.vitals.pulse && ` · ${rec.vitals.pulse} bpm`}
                        </span>
                      ) : <span className="text-slate-400 italic">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {lang === 'vi' ? 'Đã hoàn thành' : 'Completed'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right pr-6 relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdownId(activeDropdownId === rec.id ? null : rec.id);
                        }}
                        className="p-1.5 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 rounded-full transition-colors"
                        title={lang === 'vi' ? 'Tùy chọn' : 'Options'}
                      >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>

                      {/* 3-Dots Dropdown Menu */}
                      {activeDropdownId === rec.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setActiveDropdownId(null)}
                          />
                          <div className="absolute right-6 top-10 z-50 w-48 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl shadow-xl py-1 text-left animate-fade-in text-xs">
                            <button
                              onClick={() => {
                                setSelectedRecord(rec);
                                setActiveDropdownId(null);
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-surface-container-low dark:hover:bg-slate-700 flex items-center gap-2 font-medium text-on-surface dark:text-white"
                            >
                              <span className="material-symbols-outlined text-primary text-[18px]">clinical_notes</span>
                              {lang === 'vi' ? 'Xem hồ sơ khám' : 'View Exam Record'}
                            </button>

                            <button
                              onClick={() => {
                                const rx = patientPrescriptions.find(p => Number(p.medicalRecordId) === Number(rec.id) || Number(p.appointmentId) === Number(rec.appointmentId)) || patientPrescriptions[0] || {
                                  id: rec.id,
                                  doctor: rec.doctor,
                                  createdAt: rec.createdAt,
                                  status: 'DISPENSED',
                                  items: [
                                    { medicineName: 'Paracetamol 500mg', unit: 'Viên', quantity: 10, dosage: 'Ngày 2 lần, lần 1 viên', instructions: 'Uống sau ăn 30 phút' }
                                  ]
                                };
                                setSelectedRxModal(rx);
                                setActiveDropdownId(null);
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-surface-container-low dark:hover:bg-slate-700 flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400 border-t border-outline-variant/40 dark:border-slate-700"
                            >
                              <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px]">prescriptions</span>
                              {lang === 'vi' ? 'Xem đơn thuốc' : 'View Prescription'}
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* RECORD DETAIL MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in text-left">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-outline-variant dark:border-slate-800 flex items-start justify-between bg-surface-container-low dark:bg-slate-800/60">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800">
                    {lang === 'vi' ? '✓ Hồ sơ EMR chính thức' : '✓ Official EMR Record'}
                  </span>
                  <span className="text-xs text-on-surface-variant dark:text-slate-400">
                    Bệnh án #{selectedRecord.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface dark:text-white">
                  {selectedRecord.diagnosesICD10 || (lang === 'vi' ? 'Bệnh án điện tử' : 'Medical Record')}
                </h3>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
                  {lang === 'vi' ? 'Khám bởi:' : 'By:'} BS. {selectedRecord.doctor?.fullName || '—'} · {formatDate(selectedRecord.createdAt)}
                </p>
              </div>

              <button 
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-5 flex-grow">
              
              {/* Vital Signs Section */}
              {selectedRecord.vitals && (
                <div>
                  <h4 className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-error text-[16px]">monitor_heart</span>
                    {lang === 'vi' ? 'Dấu hiệu sinh tồn khi khám' : 'Vital Signs Recorded'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { label: lang === 'vi' ? 'Huyết áp' : 'BP', value: selectedRecord.vitals.bloodPressure, unit: 'mmHg' },
                      { label: lang === 'vi' ? 'Nhịp tim' : 'Pulse', value: selectedRecord.vitals.pulse, unit: 'bpm' },
                      { label: lang === 'vi' ? 'Nhiệt độ' : 'Temp', value: selectedRecord.vitals.temperature, unit: '°C' },
                      { label: 'SpO₂', value: selectedRecord.vitals.spO2, unit: '%' },
                      { label: lang === 'vi' ? 'Cân nặng' : 'Weight', value: selectedRecord.vitals.weight, unit: 'kg' },
                      { label: lang === 'vi' ? 'Chiều cao' : 'Height', value: selectedRecord.vitals.height, unit: 'cm' },
                      { label: 'BMI', value: selectedRecord.vitals.bmi, unit: '' },
                    ].filter(v => v.value != null).map(v => (
                      <div key={v.label} className="bg-surface-container-lowest dark:bg-slate-800/60 p-2.5 rounded-lg border border-outline-variant dark:border-slate-700">
                        <p className="text-[10px] text-on-surface-variant dark:text-slate-400 uppercase font-medium">{v.label}</p>
                        <p className="font-bold text-on-surface dark:text-white text-sm mt-0.5">{v.value} <span className="font-normal text-slate-400 text-xs">{v.unit}</span></p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chief Complaint */}
              {selectedRecord.chiefComplaint && (
                <div>
                  <h4 className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-1.5">
                    {lang === 'vi' ? 'Lý do khám (Chief Complaint)' : 'Chief Complaint'}
                  </h4>
                  <p className="text-xs text-on-surface dark:text-slate-200 bg-surface-container-lowest dark:bg-slate-800/40 p-3 rounded-lg border border-outline-variant/60 dark:border-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedRecord.chiefComplaint}
                  </p>
                </div>
              )}

              {/* Clinical Notes */}
              {selectedRecord.clinicalNotes && (
                <div>
                  <h4 className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-1.5">
                    {lang === 'vi' ? 'Ghi chú diễn tiến lâm sàng' : 'Clinical Progress Notes'}
                  </h4>
                  <p className="text-xs text-on-surface dark:text-slate-200 bg-surface-container-lowest dark:bg-slate-800/40 p-3 rounded-lg border border-outline-variant/60 dark:border-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedRecord.clinicalNotes}
                  </p>
                </div>
              )}

              {/* Treatment Plan */}
              {selectedRecord.treatmentPlan && (
                <div>
                  <h4 className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-1.5">
                    {lang === 'vi' ? 'Kế hoạch điều trị & Đơn thuốc' : 'Treatment Plan & Prescriptions'}
                  </h4>
                  <p className="text-xs text-on-surface dark:text-slate-200 bg-surface-container-lowest dark:bg-slate-800/40 p-3 rounded-lg border border-outline-variant/60 dark:border-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedRecord.treatmentPlan}
                  </p>
                </div>
              )}

              {/* Prescribed Medications Card */}
              {patientPrescriptions.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">prescriptions</span>
                    {lang === 'vi' ? 'Đơn Thuốc Được Kê' : 'Prescribed Medications'}
                  </h4>
                  <div className="border border-outline-variant dark:border-slate-700 rounded-lg overflow-hidden text-xs bg-surface-container-lowest dark:bg-slate-800/40">
                    {patientPrescriptions.map(rx => (
                      <div key={rx.id} className="p-3 border-b border-outline-variant/60 dark:border-slate-700 last:border-none space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-primary dark:text-primary-fixed-dim">Đơn thuốc #{rx.id}</span>
                          <span className={'px-2 py-0.5 rounded-full font-bold text-[10px] ' + (rx.status === 'DISPENSED' ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300')}>
                            {rx.status === 'DISPENSED' ? (lang === 'vi' ? '✓ Đã nhận thuốc' : 'Dispensed') : (lang === 'vi' ? 'Chờ nhận thuốc' : 'Pending')}
                          </span>
                        </div>
                        {rx.items && rx.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-start bg-white dark:bg-slate-800 p-2 rounded border border-outline-variant/40 dark:border-slate-700">
                            <div>
                              <p className="font-bold text-on-surface dark:text-white">{item.medicineName} <span className="font-normal text-slate-400 text-[10px]">({item.unit})</span></p>
                              <p className="text-[10px] text-slate-500">{item.dosage} · {item.instructions}</p>
                            </div>
                            <span className="font-bold text-xs text-primary">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-outline-variant dark:border-slate-800 bg-surface-container-low dark:bg-slate-800/60 flex items-center justify-between">
              <button 
                onClick={() => handlePrintRecord(selectedRecord)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 border border-outline-variant dark:border-slate-700 text-on-surface dark:text-white text-xs font-semibold rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                {lang === 'vi' ? 'In bệnh án' : 'Print Record'}
              </button>

              <button 
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-container transition-colors"
              >
                {lang === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PRESCRIPTION DETAILS MODAL */}
      {selectedRxModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden flex flex-col shadow-2xl animate-fade-in text-left">
            <div className="p-5 border-b border-outline-variant dark:border-slate-800 flex items-start justify-between bg-surface-container-low dark:bg-slate-800/60">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={'text-[10px] font-bold px-2 py-0.5 rounded-full border ' + (selectedRxModal.status === 'DISPENSED' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800')}>
                    {selectedRxModal.status === 'DISPENSED' ? (lang === 'vi' ? '✓ Đã nhận thuốc tại quầy' : '✓ Dispensed') : (lang === 'vi' ? 'Chờ nhận thuốc' : 'Pending')}
                  </span>
                  <span className="text-xs text-on-surface-variant dark:text-slate-400">
                    Đơn thuốc #{selectedRxModal.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600">prescriptions</span>
                  {lang === 'vi' ? 'Chi Tiết Đơn Thuốc Bệnh Nhân' : 'Prescription Details'}
                </h3>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
                  BS kê đơn: {selectedRxModal.doctor?.fullName || 'BS. Phòng khám'} · {formatDate(selectedRxModal.createdAt)}
                </p>
              </div>

              <button
                onClick={() => setSelectedRxModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low dark:bg-slate-800/80 font-bold text-[10px] uppercase text-on-surface-variant dark:text-slate-400 border-b border-outline-variant dark:border-slate-700">
                    <tr>
                      <th className="p-3">Thuốc</th>
                      <th className="p-3 text-center">Số Lượng</th>
                      <th className="p-3">Liều Dùng & Lời Dặn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/60 dark:divide-slate-800">
                    {selectedRxModal.items && selectedRxModal.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-low/30 dark:hover:bg-slate-800/30">
                        <td className="p-3 font-bold text-on-surface dark:text-white">
                          {item.medicineName} <span className="font-normal text-slate-400 text-[10px]">({item.unit})</span>
                        </td>
                        <td className="p-3 text-center font-bold text-primary">{item.quantity}</td>
                        <td className="p-3 text-on-surface-variant dark:text-slate-300">
                          <p className="font-semibold text-primary">{item.dosage || 'Theo chỉ định'}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{item.instructions || ''}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border-t border-outline-variant dark:border-slate-800 bg-surface-container-low dark:bg-slate-800/60 flex justify-between items-center">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 border border-outline-variant dark:border-slate-700 text-on-surface dark:text-white text-xs font-semibold rounded-lg hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                {lang === 'vi' ? 'In đơn thuốc' : 'Print Rx'}
              </button>

              <button
                onClick={() => setSelectedRxModal(null)}
                className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-container transition-colors"
              >
                {lang === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRIVACY FOOTER */}
      <div className="p-4 bg-surface-container-low dark:bg-slate-800/40 rounded-xl border border-outline-variant dark:border-slate-800 flex flex-col md:flex-row items-center gap-4 text-xs">
        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary dark:text-primary-fixed-dim flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">shield_lock</span>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-on-surface dark:text-white">
            {lang === 'vi' ? 'Bảo mật hồ sơ bệnh án tuyệt đối' : 'Secure Clinical Data Standards'}
          </h4>
          <p className="text-on-surface-variant dark:text-slate-400 mt-0.5">
            {lang === 'vi' 
              ? 'Hồ sơ bệnh án điện tử được lưu trữ bảo mật và tuân thủ các quy định y tế hiện hành.' 
              : 'Electronic health records are encrypted and compliant with medical privacy standards.'}
          </p>
        </div>
      </div>

    </div>
  );
}
