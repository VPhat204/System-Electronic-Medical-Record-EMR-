import React, { useState, useEffect, useCallback } from 'react';
import medicalRecordService from '../../../../shared/services/medicalRecordService';
import prescriptionService from '../../../../shared/services/prescriptionService';

// ─── Constants ──────────────────────────────────────────────────────────────
const NOTE_TYPES = [
  { key: 'progress', viLabel: 'Ghi chú tiến triển', enLabel: 'Progress Note', icon: 'edit_note' },
  { key: 'discharge', viLabel: 'Tóm tắt xuất viện', enLabel: 'Discharge Summary', icon: 'assignment_return' },
  { key: 'consultation', viLabel: 'Ghi chú hội chẩn', enLabel: 'Consultation Note', icon: 'groups' },
  { key: 'procedure', viLabel: 'Biên bản thủ thuật', enLabel: 'Procedure Note', icon: 'surgical' },
];

const TYPE_COLOR = {
  progress: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700',
  discharge: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700',
  consultation: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700',
  procedure: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700',
};

const EMPTY_VITALS = {
  bloodPressure: '',
  pulse: '',
  temperature: '',
  spO2: '',
  weight: '',
  height: '',
};

const EMPTY_NEW_RECORD = {
  appointmentId: '',
  patientId: '',
  type: 'progress',
  title: '',
  chiefComplaint: '',
  clinicalNotes: '',
  diagnosesICD10: '',
  treatmentPlan: '',
};

// ─── Utils ───────────────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const computeBMI = (weight, height) => {
  const w = parseFloat(weight);
  const h = parseInt(height);
  if (!w || !h || h === 0) return null;
  return (w / Math.pow(h / 100, 2)).toFixed(1);
};

// ─── VitalsRow: Single vital sign input ──────────────────────────────────────
function VitalsRow({ icon, label, value, unit, field, onChange, inputType = 'text', placeholder = '' }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-surface-container-lowest dark:bg-slate-800/50 rounded-lg border border-outline-variant dark:border-slate-700">
      <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide">{label}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <input
            type={inputType}
            value={value}
            onChange={e => onChange(field, e.target.value)}
            placeholder={placeholder || '—'}
            className="w-full bg-transparent text-sm font-semibold text-on-surface dark:text-white outline-none placeholder-outline dark:placeholder-slate-600"
          />
          {unit && <span className="text-xs text-on-surface-variant dark:text-slate-400 whitespace-nowrap">{unit}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── NoteCard: Item in the left list ─────────────────────────────────────────
function NoteCard({ record, isSelected, onClick, lang }) {
  const noteType = record.noteType || 'progress';
  const labelKey = lang === 'vi' ? 'viLabel' : 'enLabel';
  const typeObj = NOTE_TYPES.find(nt => nt.key === noteType);

  return (
    <button
      onClick={onClick}
      className={'w-full text-left p-4 transition-colors ' + (isSelected ? 'bg-primary/5 dark:bg-primary/10 border-l-2 border-primary' : 'hover:bg-surface-container-low dark:hover:bg-slate-800')}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <p className="font-semibold text-sm text-on-surface dark:text-white leading-tight line-clamp-2">{record.title || record.diagnosesICD10 || (lang === 'vi' ? 'Bệnh án' : 'Medical Record')}</p>
        <span className="flex-shrink-0 text-[9px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-full font-bold uppercase">
          {lang === 'vi' ? 'Xác nhận' : 'Finalized'}
        </span>
      </div>
      <p className="text-xs text-on-surface-variant dark:text-slate-400 mb-2">{record.patient?.fullName || '—'}</p>
      <div className="flex items-center justify-between">
        <span className={'text-[10px] px-2 py-0.5 rounded-full border font-semibold ' + (TYPE_COLOR[noteType] || TYPE_COLOR.progress)}>
          {typeObj?.[labelKey] || 'Progress Note'}
        </span>
        <span className="text-[10px] text-on-surface-variant dark:text-slate-500">{formatDate(record.createdAt)}</span>
      </div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DoctorClinicalNotesTab({ lang, token, schedule = [], onRecordSaved }) {
  const [records, setRecords] = useState([]);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [showNewForm, setShowNewForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // New record form state
  const [newRecord, setNewRecord] = useState(EMPTY_NEW_RECORD);
  const [vitals, setVitals] = useState(EMPTY_VITALS);

  // Active appointments that are IN_PROGRESS (available to create a medical record for)
  const inProgressAppointments = schedule.filter(s => s.status === 'IN_PROGRESS');

  // Load medical records (all or by patientId) and optional selectRecordId
  const loadRecords = useCallback(async (patientId = null, selectRecordId = null) => {
    if (!token) return;
    setIsLoading(true);
    try {
      let data = [];
      if (patientId) {
        data = await medicalRecordService.getPatientHistory(token, patientId);
      } else {
        data = await medicalRecordService.getAllMedicalRecords(token);
      }
      setRecords(data);
      if (selectRecordId) {
        setSelectedRecordId(selectRecordId);
      } else if (data.length > 0) {
        setSelectedRecordId(prev => prev || data[0].id);
      }
    } catch (err) {
      console.error('Load records error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Load all records on component mount
  useEffect(() => {
    loadRecords();
  }, [token]);

  // Handle appointment change in form → auto-fill patientId and reload history
  const handleApptChange = (apptId) => {
    const appt = inProgressAppointments.find(a => String(a.id) === String(apptId));
    setNewRecord(prev => ({
      ...prev,
      appointmentId: apptId,
      patientId: appt?.patientDbId || '',
    }));
    if (appt?.patientDbId) {
      loadRecords(appt.patientDbId);
    }
  };

  const handleVitalChange = (field, value) => {
    setVitals(prev => ({ ...prev, [field]: value }));
  };

  // Medicines & Prescription state
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const [prescriptionItems, setPrescriptionItems] = useState([]);
  const [selectedMedicineId, setSelectedMedicineId] = useState('');
  const [medQty, setMedQty] = useState(1);
  const [medDosage, setMedDosage] = useState('Ngày 2 lần, lần 1 viên');
  const [medInstructions, setMedInstructions] = useState('Uống sau khi ăn 30 phút');
  const [activeRecordPrescription, setActiveRecordPrescription] = useState(null);

  // Fetch prescription for currently selected record
  useEffect(() => {
    if (selectedRecordId && token) {
      const rec = records.find(r => String(r.id) === String(selectedRecordId));
      const pId = rec?.patientId || rec?.patient?.id;
      if (pId) {
        prescriptionService.getPatientPrescriptions(token, pId).then(rxList => {
          if (Array.isArray(rxList) && rxList.length > 0) {
            const matched = rxList.find(x => Number(x.medicalRecordId) === Number(selectedRecordId) || Number(x.appointmentId) === Number(rec?.appointmentId)) || rxList[0];
            setActiveRecordPrescription(matched);
          } else {
            setActiveRecordPrescription(null);
          }
        }).catch(() => setActiveRecordPrescription(null));
      }
    }
  }, [selectedRecordId, token, records]);

  // Load pharmacy catalog on component mount
  useEffect(() => {
    if (token) {
      prescriptionService.getAllMedicines(token).then(data => {
        if (Array.isArray(data)) setAvailableMedicines(data);
      }).catch(err => console.error('Load medicines error:', err));
    }
  }, [token]);

  const handleAddMedicineToRx = () => {
    if (!selectedMedicineId) return;
    const med = availableMedicines.find(m => String(m.id) === String(selectedMedicineId));
    if (!med) return;

    const newItem = {
      medicineId: med.id,
      medicineName: med.name,
      unit: med.unit || 'Viên',
      price: med.price,
      quantity: Number(medQty) || 1,
      dosage: medDosage,
      instructions: medInstructions,
    };

    setPrescriptionItems(prev => [...prev, newItem]);
    setSelectedMedicineId('');
    setMedQty(1);
  };

  const handleRemoveRxItem = (index) => {
    setPrescriptionItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveMedicalRecord = async () => {
    setErrorMsg('');
    if (!newRecord.appointmentId || !newRecord.patientId) {
      setErrorMsg(lang === 'vi' ? 'Vui lòng chọn lịch hẹn trước khi lưu bệnh án.' : 'Please select an appointment before saving.');
      return;
    }

    setIsSaving(true);
    try {
      const bmi = computeBMI(vitals.weight, vitals.height);
      const payload = {
        appointmentId: Number(newRecord.appointmentId),
        patientId: Number(newRecord.patientId),
        chiefComplaint: newRecord.chiefComplaint,
        clinicalNotes: newRecord.clinicalNotes,
        diagnosesICD10: newRecord.diagnosesICD10,
        treatmentPlan: newRecord.treatmentPlan,
        bloodPressure: vitals.bloodPressure,
        pulse: vitals.pulse ? Number(vitals.pulse) : undefined,
        temperature: vitals.temperature ? parseFloat(vitals.temperature) : undefined,
        spO2: vitals.spO2 ? Number(vitals.spO2) : undefined,
        weight: vitals.weight ? parseFloat(vitals.weight) : undefined,
        height: vitals.height ? Number(vitals.height) : undefined,
        bmi: bmi ? parseFloat(bmi) : undefined,
      };

      const resData = await medicalRecordService.createMedicalRecord(token, payload);
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 3000);

      const createdId = resData.medicalRecord?.id;

      // If prescription items exist, create prescription linked to medical record
      if (prescriptionItems.length > 0) {
        try {
          await prescriptionService.createPrescription(token, {
            medicalRecordId: createdId,
            appointmentId: Number(newRecord.appointmentId),
            patientId: Number(newRecord.patientId),
            items: prescriptionItems,
          });
        } catch (rxErr) {
          console.error('Prescription create error:', rxErr);
        }
      }

      // Reload records and automatically select the newly created record!
      await loadRecords(null, createdId);

      // Notify parent to refresh schedule (appointment now COMPLETED)
      if (onRecordSaved) onRecordSaved();

      // Reset form
      setShowNewForm(false);
      setNewRecord(EMPTY_NEW_RECORD);
      setVitals(EMPTY_VITALS);
      setPrescriptionItems([]);
    } catch (err) {
      setErrorMsg(err.message || (lang === 'vi' ? 'Lỗi khi lưu bệnh án.' : 'Failed to save medical record.'));
    } finally {
      setIsSaving(false);
    }
  };

  const [viewMode, setViewMode] = useState('notes'); // 'notes' | 'history'
  const [searchTerm, setSearchTerm] = useState('');

  const selectedRecord = records.find(r => String(r.id) === String(selectedRecordId));
  const filteredRecords = records.filter(r => {
    const rType = r.noteType || 'progress';
    const matchesType = filterType === 'all' || rType === filterType;
    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesType;
    const matchesName = r.patient?.fullName?.toLowerCase().includes(term);
    const matchesDiag = r.diagnosesICD10?.toLowerCase().includes(term);
    const matchesPhone = r.patient?.phone?.includes(term);
    return matchesType && (matchesName || matchesDiag || matchesPhone);
  });

  // Derived unique patients history list
  const patientHistoryMap = new Map();
  records.forEach(r => {
    const pId = r.patientId || r.patient?.id || r.id;
    if (!patientHistoryMap.has(pId)) {
      patientHistoryMap.set(pId, {
        patient: r.patient,
        latestRecord: r,
        totalRecords: 1,
        records: [r]
      });
    } else {
      const existing = patientHistoryMap.get(pId);
      existing.totalRecords += 1;
      existing.records.push(r);
    }
  });
  const patientHistoryList = Array.from(patientHistoryMap.values());

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white">
            {lang === 'vi' ? 'Bệnh Án Điện Tử & Ghi Chú Lâm Sàng' : 'Electronic Medical Records & Clinical Notes'}
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-1">
            {lang === 'vi'
              ? 'Ghi nhận kết quả khám bệnh, xem lịch sử bệnh án và quản lý thông tin bệnh nhân'
              : 'Record examination results, view patient record history, and manage clinical data'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Switcher */}
          <div className="flex bg-surface-container dark:bg-slate-800 rounded-lg p-1 border border-outline-variant dark:border-slate-700">
            <button
              onClick={() => setViewMode('notes')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'notes'
                  ? 'bg-white dark:bg-slate-700 text-primary dark:text-primary-fixed-dim shadow-xs'
                  : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">clinical_notes</span>
              {lang === 'vi' ? 'Sổ Bệnh Án' : 'Notes Viewer'}
            </button>
            <button
              onClick={() => setViewMode('history')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'history'
                  ? 'bg-white dark:bg-slate-700 text-primary dark:text-primary-fixed-dim shadow-xs'
                  : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">history_edu</span>
              {lang === 'vi' ? 'Lịch Sử Ghi Chú' : 'Clinical History'}
              {records.length > 0 && (
                <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded-full">
                  {records.length}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={() => { setShowNewForm(true); setErrorMsg(''); setViewMode('notes'); }}
            disabled={inProgressAppointments.length === 0}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-container transition-all active:scale-95 font-label-md text-label-md shadow-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            {lang === 'vi' ? 'Tạo bệnh án mới' : 'New Medical Record'}
          </button>
        </div>
      </div>

      {/* No in-progress appointments warning */}
      {inProgressAppointments.length === 0 && !showNewForm && (
        <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4">
          <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">info</span>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            {lang === 'vi'
              ? 'Chưa có bệnh nhân nào trong trạng thái đang khám (IN_PROGRESS). Bấm "Bắt đầu Khám" từ tab Bảng Điều Khiển để tiếp tục.'
              : 'No patient is currently in consultation (IN_PROGRESS). Go to Dashboard and click "Start Now" to begin a consultation.'}
          </p>
        </div>
      )}

      {/* New Record Form */}
      {showNewForm && (
        <div className="bg-white dark:bg-slate-900 border border-primary/30 dark:border-primary/20 rounded-xl p-6 shadow-lg space-y-6">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">clinical_notes</span>
            {lang === 'vi' ? 'Lập Bệnh Án Điện Tử' : 'Create Medical Record'}
          </h3>

          {/* Appointment Picker */}
          <div>
            <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-400 mb-1.5 uppercase tracking-wide">
              {lang === 'vi' ? 'Lịch hẹn đang khám (IN_PROGRESS)' : 'Active Consultation'}
            </label>
            <select
              value={newRecord.appointmentId}
              onChange={e => handleApptChange(e.target.value)}
              className="w-full bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">{lang === 'vi' ? '— Chọn lịch hẹn đang khám —' : '— Select active appointment —'}</option>
              {inProgressAppointments.map(appt => (
                <option key={appt.id} value={appt.id}>
                  {appt.name} – {appt.time} ({appt.reason})
                </option>
              ))}
            </select>
          </div>

          {/* Vitals Section */}
          <div>
            <h4 className="text-sm font-bold text-on-surface dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-error">monitor_heart</span>
              {lang === 'vi' ? 'Dấu hiệu sinh tồn (Vitals)' : 'Vital Signs'}
              {vitals.weight && vitals.height && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                  BMI: {computeBMI(vitals.weight, vitals.height)}
                </span>
              )}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <VitalsRow icon="blood_pressure" label={lang === 'vi' ? 'Huyết áp' : 'Blood Pressure'} value={vitals.bloodPressure} unit="mmHg" field="bloodPressure" onChange={handleVitalChange} placeholder="120/80" />
              <VitalsRow icon="favorite" label={lang === 'vi' ? 'Nhịp tim' : 'Pulse'} value={vitals.pulse} unit="bpm" field="pulse" inputType="number" onChange={handleVitalChange} placeholder="72" />
              <VitalsRow icon="thermostat" label={lang === 'vi' ? 'Nhiệt độ' : 'Temperature'} value={vitals.temperature} unit="°C" field="temperature" inputType="number" onChange={handleVitalChange} placeholder="36.5" />
              <VitalsRow icon="air" label="SpO₂" value={vitals.spO2} unit="%" field="spO2" inputType="number" onChange={handleVitalChange} placeholder="98" />
              <VitalsRow icon="scale" label={lang === 'vi' ? 'Cân nặng' : 'Weight'} value={vitals.weight} unit="kg" field="weight" inputType="number" onChange={handleVitalChange} placeholder="65" />
              <VitalsRow icon="height" label={lang === 'vi' ? 'Chiều cao' : 'Height'} value={vitals.height} unit="cm" field="height" inputType="number" onChange={handleVitalChange} placeholder="170" />
            </div>
          </div>

          {/* Clinical Notes Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                {lang === 'vi' ? 'Lý do khám (Chief Complaint)' : 'Chief Complaint'}
              </label>
              <textarea
                rows={3}
                value={newRecord.chiefComplaint}
                onChange={e => setNewRecord(prev => ({ ...prev, chiefComplaint: e.target.value }))}
                placeholder={lang === 'vi' ? 'Bệnh nhân phàn nàn về...' : 'Patient complains of...'}
                className="w-full bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                {lang === 'vi' ? 'Chẩn đoán (ICD-10)' : 'Diagnosis (ICD-10)'}
              </label>
              <input
                type="text"
                value={newRecord.diagnosesICD10}
                onChange={e => setNewRecord(prev => ({ ...prev, diagnosesICD10: e.target.value }))}
                placeholder="I10 – Tăng huyết áp / Hypertension"
                className="w-full bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                {lang === 'vi' ? 'Ghi chú lâm sàng' : 'Clinical Notes'}
              </label>
              <textarea
                rows={4}
                value={newRecord.clinicalNotes}
                onChange={e => setNewRecord(prev => ({ ...prev, clinicalNotes: e.target.value }))}
                placeholder={lang === 'vi' ? 'Mô tả quá trình khám, triệu chứng...' : 'Describe examination findings, symptoms...'}
                className="w-full bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                {lang === 'vi' ? 'Kế hoạch điều trị' : 'Treatment Plan'}
              </label>
              <textarea
                rows={3}
                value={newRecord.treatmentPlan}
                onChange={e => setNewRecord(prev => ({ ...prev, treatmentPlan: e.target.value }))}
                placeholder={lang === 'vi' ? 'Kê đơn thuốc, hướng xử trí...' : 'Prescriptions, follow-up instructions...'}
                className="w-full bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>

          {/* E-Prescribing Section */}
          <div className="border-t border-outline-variant dark:border-slate-700 pt-4 space-y-3">
            <h4 className="text-sm font-bold text-on-surface dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">prescriptions</span>
              {lang === 'vi' ? 'Kê Đơn Thuốc Điện Tử (E-Prescribing)' : 'E-Prescribing'}
            </h4>

            {/* Medicine Adder Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 bg-surface-container-lowest dark:bg-slate-800/40 p-3 rounded-lg border border-outline-variant/60 dark:border-slate-700">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-on-surface-variant dark:text-slate-400 uppercase mb-1">
                  {lang === 'vi' ? 'Chọn Thuốc (Kho Dược)' : 'Select Medicine'}
                </label>
                <select
                  value={selectedMedicineId}
                  onChange={e => setSelectedMedicineId(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-on-surface dark:text-white outline-none"
                >
                  <option value="">{lang === 'vi' ? '— Tìm / Chọn tên thuốc —' : '— Select medicine —'}</option>
                  {availableMedicines.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.unit}) - {m.category || 'Dược phẩm'} [{m.stockQuantity} tồn]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant dark:text-slate-400 uppercase mb-1">
                  {lang === 'vi' ? 'Số lượng' : 'Quantity'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={medQty}
                  onChange={e => setMedQty(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-on-surface dark:text-white outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddMedicineToRx}
                  disabled={!selectedMedicineId}
                  className="w-full bg-primary/10 hover:bg-primary/20 text-primary dark:bg-primary/20 dark:text-primary-fixed-dim text-xs font-bold py-1.5 px-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  {lang === 'vi' ? 'Thêm thuốc' : 'Add Item'}
                </button>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-on-surface-variant dark:text-slate-400 uppercase mb-1">
                  {lang === 'vi' ? 'Liều dùng' : 'Dosage'}
                </label>
                <input
                  type="text"
                  value={medDosage}
                  onChange={e => setMedDosage(e.target.value)}
                  placeholder="Ngày 2 lần, lần 1 viên"
                  className="w-full bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-on-surface dark:text-white outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-on-surface-variant dark:text-slate-400 uppercase mb-1">
                  {lang === 'vi' ? 'Lời dặn bác sĩ' : 'Instructions'}
                </label>
                <input
                  type="text"
                  value={medInstructions}
                  onChange={e => setMedInstructions(e.target.value)}
                  placeholder="Uống sau khi ăn 30 phút"
                  className="w-full bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-on-surface dark:text-white outline-none"
                />
              </div>
            </div>

            {/* Added Prescription Items List */}
            {prescriptionItems.length > 0 && (
              <div className="border border-outline-variant dark:border-slate-700 rounded-lg overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low dark:bg-slate-800/80 font-bold text-[10px] uppercase text-on-surface-variant dark:text-slate-400 border-b border-outline-variant dark:border-slate-700">
                    <tr>
                      <th className="p-2">Tên Thuốc</th>
                      <th className="p-2">SL</th>
                      <th className="p-2">Liều Dùng & Cách Dùng</th>
                      <th className="p-2 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/60 dark:divide-slate-800">
                    {prescriptionItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-low/40 dark:hover:bg-slate-800/40">
                        <td className="p-2 font-bold text-on-surface dark:text-white">
                          {item.medicineName} <span className="text-[10px] font-normal text-slate-400">({item.unit})</span>
                        </td>
                        <td className="p-2 font-bold">{item.quantity}</td>
                        <td className="p-2 text-on-surface-variant dark:text-slate-300">
                          <p>{item.dosage}</p>
                          <p className="text-[10px] text-slate-400">{item.instructions}</p>
                        </td>
                        <td className="p-2 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveRxItem(idx)}
                            className="text-error hover:bg-error/10 p-1 rounded-full"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Error message */}
          {errorMsg && (
            <div className="flex items-center gap-2 bg-error-container/20 border border-error/30 text-error rounded-lg px-4 py-2.5 text-sm">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {errorMsg}
            </div>
          )}

          <div className="flex gap-3 justify-end pt-2 border-t border-outline-variant dark:border-slate-700">
            <button
              onClick={() => { setShowNewForm(false); setErrorMsg(''); setNewRecord(EMPTY_NEW_RECORD); setVitals(EMPTY_VITALS); }}
              className="px-5 py-2 text-sm text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {lang === 'vi' ? 'Hủy' : 'Cancel'}
            </button>
            <button
              onClick={handleSaveMedicalRecord}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-container transition-colors font-semibold disabled:opacity-60"
            >
              {isSaving ? (
                <><span className="material-symbols-outlined text-[16px] animate-spin">sync</span>{lang === 'vi' ? 'Đang lưu...' : 'Saving...'}</>
              ) : savedFlash ? (
                <><span className="material-symbols-outlined text-[16px]">check_circle</span>{lang === 'vi' ? 'Đã lưu!' : 'Saved!'}</>
              ) : (
                <><span className="material-symbols-outlined text-[16px]">save</span>{lang === 'vi' ? 'Lưu Bệnh Án & Hoàn Thành Khám' : 'Save Record & Complete Exam'}</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Conditional Main Layout: 'history' view vs 'notes' view */}
      {viewMode === 'history' ? (
        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden shadow-sm text-left">
          {/* Table Header / Filter Bar */}
          <div className="p-4 bg-surface-container-low dark:bg-slate-800/60 border-b border-outline-variant dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-base text-on-surface dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history_edu</span>
                {lang === 'vi' ? 'Lịch Sử Ghi Chú Lâm Sàng Bệnh Nhân' : 'Patient Clinical Notes History'}
              </h3>
              <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
                {lang === 'vi' ? 'Danh sách bệnh nhân đã được ghi nhận bệnh án & chỉ số sinh tồn trong hệ thống' : 'List of patients with recorded medical notes & vital signs'}
              </p>
            </div>

            <div className="w-full sm:w-72 relative">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
              <input
                type="text"
                placeholder={lang === 'vi' ? 'Tìm theo tên, chẩn đoán...' : 'Search name, diagnosis...'}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 rounded-lg py-1.5 pl-8 pr-3 text-xs text-on-surface dark:text-white outline-none focus:ring-1 focus:ring-primary border border-outline-variant dark:border-slate-700"
              />
            </div>
          </div>

          {/* Table Content */}
          {filteredRecords.length === 0 ? (
            <div className="py-16 text-center text-on-surface-variant dark:text-slate-400">
              <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-2">description</span>
              <p className="text-sm font-semibold">{lang === 'vi' ? 'Chưa có lịch sử bệnh án nào được ghi nhận.' : 'No clinical note history found.'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-lowest dark:bg-slate-800/80 border-b border-outline-variant dark:border-slate-800 text-[11px] font-bold text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">{lang === 'vi' ? 'Bệnh Nhân' : 'Patient'}</th>
                    <th className="px-4 py-3">{lang === 'vi' ? 'Chẩn Đoán (ICD-10)' : 'Diagnosis'}</th>
                    <th className="px-4 py-3 hidden md:table-cell">{lang === 'vi' ? 'Dấu Hiệu Sinh Tồn' : 'Vitals Summary'}</th>
                    <th className="px-4 py-3 hidden sm:table-cell">{lang === 'vi' ? 'Bác Sĩ' : 'Doctor'}</th>
                    <th className="px-4 py-3">{lang === 'vi' ? 'Ngày Lập' : 'Date'}</th>
                    <th className="px-4 py-3 text-right">{lang === 'vi' ? 'Thao Tác' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/60 dark:divide-slate-800 text-xs">
                  {filteredRecords.map(rec => (
                    <tr key={rec.id} className="hover:bg-surface-container-low/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary dark:bg-primary/20 flex items-center justify-center font-bold text-xs">
                            {rec.patient?.fullName?.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() || 'BN'}
                          </div>
                          <div>
                            <p className="font-bold text-on-surface dark:text-white">{rec.patient?.fullName || '—'}</p>
                            <p className="text-[10px] text-on-surface-variant dark:text-slate-400">{rec.patient?.phone || rec.patient?.email || ''}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-[220px]">
                        <p className="font-semibold text-on-surface dark:text-slate-200 truncate">{rec.diagnosesICD10 || '—'}</p>
                        <p className="text-[10px] text-on-surface-variant dark:text-slate-400 truncate">{rec.chiefComplaint || ''}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {rec.vitals ? (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {rec.vitals.bloodPressure && <span className="bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-800 px-1.5 py-0.5 rounded text-[10px] font-semibold">{rec.vitals.bloodPressure}</span>}
                            {rec.vitals.pulse && <span className="bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-1.5 py-0.5 rounded text-[10px] font-semibold">{rec.vitals.pulse} bpm</span>}
                            {rec.vitals.bmi && <span className="bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded text-[10px] font-semibold">BMI {rec.vitals.bmi}</span>}
                          </div>
                        ) : <span className="text-slate-400 italic">—</span>}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell font-medium text-on-surface-variant dark:text-slate-300">
                        {rec.doctor?.fullName || '—'}
                      </td>
                      <td className="px-4 py-3 text-on-surface-variant dark:text-slate-400 font-medium whitespace-nowrap">
                        {formatDate(rec.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedRecordId(rec.id);
                            setViewMode('notes');
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 hover:bg-primary/20 text-primary dark:bg-primary/20 dark:text-primary-fixed-dim text-xs font-bold rounded-lg transition-all active:scale-95 ml-auto"
                        >
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                          {lang === 'vi' ? 'Xem chi tiết' : 'View'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Main Layout: List + Viewer */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Records List */}
          <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden flex flex-col">
            {/* Patient Search Input */}
            <div className="p-3 border-b border-outline-variant dark:border-slate-800">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                <input
                  type="text"
                  placeholder={lang === 'vi' ? 'Tìm bệnh nhân, chẩn đoán...' : 'Search patient name, diagnosis...'}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-surface-container-low dark:bg-slate-800 rounded-lg py-1.5 pl-8 pr-3 text-xs text-on-surface dark:text-white outline-none focus:ring-1 focus:ring-primary border border-outline-variant/60 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="border-b border-outline-variant dark:border-slate-800 p-2 flex gap-1 overflow-x-auto">
              <button
                onClick={() => setFilterType('all')}
                className={'px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ' + (filterType === 'all' ? 'bg-primary text-white' : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800')}
              >
                {lang === 'vi' ? 'Tất cả' : 'All'} ({records.length})
              </button>
              {NOTE_TYPES.map(nt => (
                <button
                  key={nt.key}
                  onClick={() => setFilterType(nt.key)}
                  className={'px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ' + (filterType === nt.key ? 'bg-primary text-white' : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800')}
                >
                  {lang === 'vi' ? nt.viLabel : nt.enLabel}
                </button>
              ))}
            </div>

            <div className="divide-y divide-outline-variant dark:divide-slate-800 max-h-[600px] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <span className="material-symbols-outlined animate-spin text-primary text-[32px]">sync</span>
                </div>
              ) : filteredRecords.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <span className="material-symbols-outlined text-[40px] text-outline dark:text-slate-600 mb-2">description</span>
                  <p className="text-sm text-on-surface-variant dark:text-slate-400">
                    {lang === 'vi' ? 'Chưa có bệnh án nào.' : 'No records found.'}
                  </p>
                </div>
              ) : (
                filteredRecords.map(record => (
                  <NoteCard
                    key={record.id}
                    record={record}
                    isSelected={selectedRecordId === record.id}
                    onClick={() => setSelectedRecordId(record.id)}
                    lang={lang}
                  />
                ))
              )}
            </div>
          </div>

          {/* Record Detail Viewer */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl flex flex-col min-h-[500px]">
            {selectedRecord ? (
              <>
                {/* Header */}
                <div className="border-b border-outline-variant dark:border-slate-800 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold border border-green-200 dark:border-green-700">
                          {lang === 'vi' ? '✓ Đã xác nhận' : '✓ Finalized'}
                        </span>
                        <span className="text-[10px] bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-400 px-2 py-0.5 rounded-full border border-outline-variant dark:border-slate-700">
                          #{selectedRecord.id}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-white">
                        {selectedRecord.diagnosesICD10 || (lang === 'vi' ? 'Bệnh án không có chẩn đoán' : 'No Diagnosis Code')}
                      </h3>
                      <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1">
                        {selectedRecord.patient?.fullName || '—'} · {lang === 'vi' ? 'Bác sĩ:' : 'Dr.'} {selectedRecord.doctor?.fullName || '—'} · {formatDate(selectedRecord.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-grow p-5 space-y-5 overflow-y-auto">
                  {/* Vitals Display */}
                  {selectedRecord.vitals && (
                    <div>
                      <h4 className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-error">monitor_heart</span>
                        {lang === 'vi' ? 'Dấu hiệu sinh tồn' : 'Vital Signs'}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { icon: 'blood_pressure', label: lang === 'vi' ? 'Huyết áp' : 'Blood Pressure', value: selectedRecord.vitals.bloodPressure, unit: 'mmHg' },
                          { icon: 'favorite', label: lang === 'vi' ? 'Nhịp tim' : 'Pulse', value: selectedRecord.vitals.pulse, unit: 'bpm' },
                          { icon: 'thermostat', label: lang === 'vi' ? 'Nhiệt độ' : 'Temp', value: selectedRecord.vitals.temperature, unit: '°C' },
                          { icon: 'air', label: 'SpO₂', value: selectedRecord.vitals.spO2, unit: '%' },
                          { icon: 'scale', label: lang === 'vi' ? 'Cân nặng' : 'Weight', value: selectedRecord.vitals.weight, unit: 'kg' },
                          { icon: 'height', label: lang === 'vi' ? 'Chiều cao' : 'Height', value: selectedRecord.vitals.height, unit: 'cm' },
                          { icon: 'calculate', label: 'BMI', value: selectedRecord.vitals.bmi, unit: '' },
                        ].filter(v => v.value != null).map(v => (
                          <div key={v.label} className="bg-surface-container-lowest dark:bg-slate-800/50 rounded-lg p-3 border border-outline-variant dark:border-slate-700">
                            <p className="text-[10px] text-on-surface-variant dark:text-slate-400 uppercase tracking-wide">{v.label}</p>
                            <p className="font-bold text-on-surface dark:text-white text-sm mt-0.5">{v.value} <span className="font-normal text-on-surface-variant dark:text-slate-400 text-xs">{v.unit}</span></p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Clinical Notes */}
                  {selectedRecord.chiefComplaint && (
                    <div>
                      <h4 className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-2">{lang === 'vi' ? 'Lý do khám' : 'Chief Complaint'}</h4>
                      <p className="text-sm text-on-surface dark:text-slate-200 leading-relaxed whitespace-pre-wrap bg-surface-container-lowest dark:bg-slate-800/30 rounded-lg p-3">{selectedRecord.chiefComplaint}</p>
                    </div>
                  )}
                  {selectedRecord.clinicalNotes && (
                    <div>
                      <h4 className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-2">{lang === 'vi' ? 'Ghi chú lâm sàng' : 'Clinical Notes'}</h4>
                      <p className="text-sm text-on-surface dark:text-slate-200 leading-relaxed whitespace-pre-wrap bg-surface-container-lowest dark:bg-slate-800/30 rounded-lg p-3">{selectedRecord.clinicalNotes}</p>
                    </div>
                  )}
                  {selectedRecord.treatmentPlan && (
                    <div>
                      <h4 className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-2">{lang === 'vi' ? 'Kế hoạch điều trị' : 'Treatment Plan'}</h4>
                      <p className="text-sm text-on-surface dark:text-slate-200 leading-relaxed whitespace-pre-wrap bg-surface-container-lowest dark:bg-slate-800/30 rounded-lg p-3">{selectedRecord.treatmentPlan}</p>
                    </div>
                  )}

                  {/* Prescribed Medications Display */}
                  {activeRecordPrescription && activeRecordPrescription.items && activeRecordPrescription.items.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[18px]">prescriptions</span>
                        {lang === 'vi' ? 'Đơn thuốc điện tử đã kê' : 'E-Prescription Details'}
                      </h4>
                      <div className="border border-outline-variant dark:border-slate-700 rounded-lg overflow-hidden text-xs bg-surface-container-lowest dark:bg-slate-800/30">
                        <table className="w-full text-left border-collapse">
                          <thead className="bg-surface-container-low dark:bg-slate-800 font-bold text-[10px] uppercase text-on-surface-variant dark:text-slate-400 border-b border-outline-variant dark:border-slate-700">
                            <tr>
                              <th className="p-2.5">Tên Thuốc</th>
                              <th className="p-2.5 text-center">Số Lượng</th>
                              <th className="p-2.5">Liều Dùng & Lời Dặn</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-outline-variant/60 dark:divide-slate-800">
                            {activeRecordPrescription.items.map((item, idx) => (
                              <tr key={idx}>
                                <td className="p-2.5 font-bold text-on-surface dark:text-white">
                                  {item.medicineName} <span className="font-normal text-slate-400 text-[10px]">({item.unit})</span>
                                </td>
                                <td className="p-2.5 text-center font-bold text-primary">{item.quantity}</td>
                                <td className="p-2.5 text-on-surface-variant dark:text-slate-300">
                                  <p className="font-semibold">{item.dosage}</p>
                                  <p className="text-[10px] text-slate-400">{item.instructions}</p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-outline-variant dark:border-slate-800 p-4 flex items-center justify-between text-[11px] text-on-surface-variant dark:text-slate-500">
                  <span>Appointment #{selectedRecord.appointmentId}</span>
                  <span>{lang === 'vi' ? 'BS.' : 'Dr.'} {selectedRecord.doctor?.fullName || '—'}</span>
                  <span>{formatDate(selectedRecord.createdAt)}</span>
                </div>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
                <span className="material-symbols-outlined text-[64px] text-outline dark:text-slate-600 mb-4">clinical_notes</span>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">
                  {lang === 'vi' ? 'Chọn bệnh án để xem chi tiết.' : 'Select a record to view details.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
