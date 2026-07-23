import React, { useState, useEffect, useCallback } from 'react';
import prescriptionService from '../../../../shared/services/prescriptionService';
import medicalRecordService from '../../../../shared/services/medicalRecordService';

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export default function DoctorPharmacyTab({
  lang = 'vi',
  token,
  patients = [],
  schedule = [],
}) {
  const activeToken = token || localStorage.getItem('token');

  // Real backend prescription history
  const [dbPrescriptions, setDbPrescriptions] = useState([]);
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ type: '', text: '' });

  // Form & Edit State
  const [editingPrescId, setEditingPrescId] = useState(null);
  const [prescPatientId, setPrescPatientId] = useState('');
  const [prescDiagnosis, setPrescDiagnosis] = useState('');
  const [currentMedList, setCurrentMedList] = useState([]);

  // Draft Medicine Inputs
  const [selectedCatalogMedId, setSelectedCatalogMedId] = useState('');
  const [draftMedName, setDraftMedName] = useState('');
  const [draftMedUnit, setDraftMedUnit] = useState('Viên');
  const [draftMedPrice, setDraftMedPrice] = useState(0);
  const [draftMedDosage, setDraftMedDosage] = useState('');
  const [draftMedQty, setDraftMedQty] = useState(1);
  const [draftMedFreq, setDraftMedFreq] = useState('Sáng 1 viên, Tối 1 viên');
  const [draftMedDuration, setDraftMedDuration] = useState('7 ngày');
  const [draftMedNotes, setDraftMedNotes] = useState('Uống sau khi ăn 30 phút');

  // Medical Record creation state (when prescribing for a new patient without existing EMR)
  const [showNewMRModal, setShowNewMRModal] = useState(false);
  const [newMR, setNewMR] = useState({
    appointmentId: '',
    patientId: '',
    chiefComplaint: '',
    clinicalNotes: '',
    diagnosesICD10: '',
    treatmentPlan: '',
  });
  const [newMRVitals, setNewMRVitals] = useState({
    bloodPressure: '',
    pulse: '',
    temperature: '',
    spO2: '',
    weight: '',
    height: '',
  });
  const [isSavingMR, setIsSavingMR] = useState(false);
  const [realDoctorAppts, setRealDoctorAppts] = useState([]);
  // Real system patients from backend CSDL
  const [dbPatients, setDbPatients] = useState([]);

  // Fetch real appointments & patients directly from backend CSDL
  useEffect(() => {
    if (activeToken) {
      prescriptionService.getSystemPatients(activeToken).then(data => {
        if (Array.isArray(data)) setDbPatients(data);
      }).catch(err => console.error('Fetch system patients error:', err));

      fetch('http://localhost:5000/api/appointments/doctor', {
        headers: { 'Authorization': `Bearer ${activeToken}` }
      })
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) {
          setRealDoctorAppts(data.map(a => ({
            id: a.id,
            patientDbId: a.patientId,
            name: a.patient?.fullName || `Bệnh nhân #${a.patientId}`,
            time: `${a.appointmentDate} ${a.appointmentTime}`,
            reason: a.symptoms || 'Khám bệnh',
          })));
        }
      })
      .catch(err => console.error('Fetch real doctor appointments error:', err));
    }
  }, [activeToken]);

  const handleSaveNewMedicalRecord = async () => {
    if (!newMR.appointmentId && !newMR.patientId) {
      setAlertMsg({ type: 'error', text: lang === 'vi' ? 'Vui lòng chọn lịch hẹn hoặc bệnh nhân trước khi lập bệnh án!' : 'Please select an appointment or patient!' });
      return;
    }

    setIsSavingMR(true);
    try {
      const appt = schedule.find(s => String(s.id) === String(newMR.appointmentId) || String(s.patientDbId) === String(newMR.patientId));
      const targetApptId = appt?.id || Number(newMR.appointmentId) || 1;
      const targetPatientId = appt?.patientDbId || Number(newMR.patientId) || Number(patients[0]?.id) || 1;

      const payload = {
        appointmentId: Number(targetApptId),
        patientId: Number(targetPatientId),
        chiefComplaint: newMR.chiefComplaint || 'Khám tổng quát',
        clinicalNotes: newMR.clinicalNotes || 'Ghi nhận lâm sàng',
        diagnosesICD10: newMR.diagnosesICD10 || 'I10 - Tăng huyết áp',
        treatmentPlan: newMR.treatmentPlan || 'Kê đơn thuốc ngoại trú',
        bloodPressure: newMRVitals.bloodPressure,
        pulse: newMRVitals.pulse ? Number(newMRVitals.pulse) : undefined,
        temperature: newMRVitals.temperature ? parseFloat(newMRVitals.temperature) : undefined,
        spO2: newMRVitals.spO2 ? Number(newMRVitals.spO2) : undefined,
        weight: newMRVitals.weight ? parseFloat(newMRVitals.weight) : undefined,
        height: newMRVitals.height ? Number(newMRVitals.height) : undefined,
      };

      await medicalRecordService.createMedicalRecord(activeToken, payload);

      setPrescPatientId(String(targetPatientId));
      setPrescDiagnosis(payload.diagnosesICD10);
      setHasMedicalRecord(true);
      setShowNewMRModal(false);

      setAlertMsg({
        type: 'success',
        text: lang === 'vi'
          ? `Đã khởi tạo Bệnh án điện tử thành công! Chẩn đoán "${payload.diagnosesICD10}" đã áp dụng. Bạn có thể chọn thuốc bên dưới để kê đơn.`
          : 'Successfully created EMR medical record! You can now prescribe medications below.'
      });
    } catch (err) {
      console.error('Create medical record error:', err);
      setAlertMsg({ type: 'error', text: err.message || (lang === 'vi' ? 'Không thể tạo bệnh án mới.' : 'Failed to create medical record.') });
    } finally {
      setIsSavingMR(false);
    }
  };

  // Fetch real doctor prescription history
  const fetchDoctorHistory = useCallback(async () => {
    if (!activeToken) return;
    setIsLoading(true);
    try {
      const data = await prescriptionService.getDoctorPrescriptions(activeToken);
      setDbPrescriptions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch doctor prescriptions error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [activeToken]);

  // Fetch medicines catalog
  useEffect(() => {
    if (activeToken) {
      prescriptionService.getAllMedicines(activeToken).then(data => {
        if (Array.isArray(data)) setAvailableMedicines(data);
      }).catch(err => console.error('Fetch medicines catalog error:', err));

      fetchDoctorHistory();
    }
  }, [activeToken, fetchDoctorHistory]);

  // Handle select medicine from catalog
  const handleSelectCatalogMed = (e) => {
    const medId = e.target.value;
    setSelectedCatalogMedId(medId);
    if (!medId) return;

    const med = availableMedicines.find(m => String(m.id) === String(medId));
    if (med) {
      setDraftMedName(med.name);
      setDraftMedUnit(med.unit || 'Viên');
      setDraftMedPrice(parseFloat(med.price) || 0);
      setDraftMedDosage(`${med.unit} - ${med.activeIngredient || ''}`);
    }
  };

  // State checking if selected patient has an existing EMR MedicalRecord
  const [hasMedicalRecord, setHasMedicalRecord] = useState(null);
  const [isCheckingMR, setIsCheckingMR] = useState(false);

  const checkPatientMedicalRecord = useCallback(async (pId) => {
    if (!pId || !activeToken) {
      setHasMedicalRecord(null);
      return;
    }
    setIsCheckingMR(true);
    try {
      const records = await medicalRecordService.getAllMedicalRecords(activeToken, pId);
      const exists = Array.isArray(records) && records.length > 0;
      setHasMedicalRecord(exists);

      if (!exists) {
        setAlertMsg({
          type: 'warning',
          text: lang === 'vi'
            ? `⚠️ Bệnh nhân "${patientMap.get(String(pId)) || ''}" chưa có Bệnh án điện tử trong CSDL. Bắt buộc phải lập Bệnh án mới trước khi tạo đơn thuốc!`
            : 'Patient has no medical record. Create medical record first.'
        });
      } else {
        setAlertMsg({ type: '', text: '' });
      }
    } catch (err) {
      console.error('Check medical record error:', err);
      setHasMedicalRecord(true);
    } finally {
      setIsCheckingMR(false);
    }
  }, [activeToken, lang]);

  const handlePatientSelectChange = (pId) => {
    setPrescPatientId(pId);
    if (pId) {
      const appt = schedule.find(s => String(s.patientDbId) === String(pId) || String(s.id) === String(pId));
      if (appt && appt.reason) {
        setPrescDiagnosis(appt.reason);
      }
      checkPatientMedicalRecord(pId);
    } else {
      setHasMedicalRecord(null);
    }
  };

  // Add medication to draft list with strict medical record check
  const handleAddMedication = () => {
    if (!prescPatientId) {
      setAlertMsg({ type: 'error', text: lang === 'vi' ? 'Vui lòng chọn bệnh nhân trước khi kê đơn thuốc!' : 'Please select a patient first!' });
      return;
    }

    if (hasMedicalRecord === false) {
      setAlertMsg({
        type: 'error',
        text: lang === 'vi'
          ? `Bệnh nhân "${patientMap.get(String(prescPatientId)) || ''}" chưa có Bệnh án điện tử. Vui lòng lập bệnh án mới trước!`
          : 'Patient has no medical record. Create medical record first!'
      });
      setShowNewMRModal(true);
      return;
    }

    if (!draftMedName.trim()) {
      setAlertMsg({ type: 'error', text: lang === 'vi' ? 'Vui lòng chọn hoặc nhập tên thuốc!' : 'Please enter medicine name!' });
      return;
    }

    const newItem = {
      medicineId: selectedCatalogMedId ? Number(selectedCatalogMedId) : null,
      name: draftMedName,
      unit: draftMedUnit,
      price: draftMedPrice,
      quantity: Number(draftMedQty) || 1,
      dosage: draftMedDosage || 'Theo chỉ định',
      frequency: draftMedFreq,
      duration: draftMedDuration,
      notes: draftMedNotes,
    };

    setCurrentMedList(prev => [...prev, newItem]);
    setDraftMedName('');
    setSelectedCatalogMedId('');
    setDraftMedDosage('');
    setDraftMedNotes('Uống sau khi ăn 30 phút');
    setAlertMsg({ type: '', text: '' });
  };

  const handleRemoveMedication = (idx) => {
    setCurrentMedList(prev => prev.filter((_, i) => i !== idx));
  };

  // Merge real patients from DB, doctor appointments, and prescription history into a single lookup map
  const patientMap = new Map();

  // 1. Real Patients from MySQL User table
  dbPatients.forEach(p => {
    patientMap.set(String(p.id), p.fullName || p.name || `Bệnh nhân #${p.id}`);
  });

  // 2. Real Appointments from DB
  realDoctorAppts.concat(schedule).forEach(s => {
    if (s.patientDbId && !patientMap.has(String(s.patientDbId))) {
      patientMap.set(String(s.patientDbId), s.name);
    }
  });

  // 3. Props patients
  patients.forEach(p => {
    if (p.id && !patientMap.has(String(p.id))) {
      patientMap.set(String(p.id), p.name || p.fullName || `Bệnh nhân #${p.id}`);
    }
  });

  // 4. DB Prescriptions
  dbPrescriptions.forEach(p => {
    const pId = p.patientId || p.patient?.id;
    const pName = p.patient?.fullName || `Bệnh nhân #${pId}`;
    if (pId && !patientMap.has(String(pId))) {
      patientMap.set(String(pId), pName);
    }
  });

  const patientOptions = Array.from(patientMap.entries()).map(([id, name]) => ({ id, name }));

  // Populate form for editing existing prescription
  const handleEditPrescription = (rx) => {
    if (rx.status === 'DISPENSED') {
      setAlertMsg({ type: 'error', text: lang === 'vi' ? 'Đơn thuốc này đã được quầy dược phát thuốc, không thể chỉnh sửa!' : 'This prescription has already been dispensed and cannot be edited.' });
      return;
    }

    const targetPatientId = rx.patientId || rx.patient?.id;
    const patientName = rx.patient?.fullName || patientMap.get(String(targetPatientId)) || `Bệnh nhân #${targetPatientId}`;
    const diagnosisText = rx.notes || rx.medicalRecord?.diagnosesICD10 || rx.appointment?.symptoms || rx.diagnosis || '';

    setEditingPrescId(rx.id);
    setPrescPatientId(String(targetPatientId || ''));
    setPrescDiagnosis(diagnosisText);

    const mappedItems = (rx.items || []).map(item => ({
      medicineId: item.medicineId,
      name: item.medicineName,
      unit: item.unit || 'Viên',
      price: item.price || 0,
      quantity: item.quantity || 1,
      dosage: item.dosage || '',
      frequency: '',
      duration: '',
      notes: item.instructions || '',
    }));

    setCurrentMedList(mappedItems);
    setAlertMsg({
      type: 'info',
      text: lang === 'vi'
        ? `Đã nạp đơn thuốc #${rx.id} của bệnh nhân "${patientName}" (Chẩn đoán: "${diagnosisText || 'Chưa nhập'}"). Bạn có thể chỉnh sửa và bấm Cập Nhật.`
        : `Loaded Prescription #${rx.id} for patient "${patientName}".`
    });
  };

  const handleCancelEdit = () => {
    setEditingPrescId(null);
    setPrescPatientId('');
    setPrescDiagnosis('');
    setCurrentMedList([]);
    setAlertMsg({ type: '', text: '' });
  };

  // Submit / Update Prescription to Backend
  const handleSaveOrUpdatePrescription = async () => {
    if (currentMedList.length === 0) {
      setAlertMsg({ type: 'error', text: lang === 'vi' ? 'Vui lòng thêm ít nhất một loại thuốc vào đơn!' : 'Please add at least one medication to draft!' });
      return;
    }

    const patientId = prescPatientId || (patients[0]?.id) || 1;
    const targetAppt = schedule.find(s => String(s.patientDbId) === String(patientId)) || schedule[0];
    const appointmentId = targetAppt?.id || 1;

    try {
      const items = currentMedList.map(med => ({
        medicineId: med.medicineId ? Number(med.medicineId) : null,
        medicineName: med.name,
        unit: med.unit || 'Viên',
        quantity: Number(med.quantity) || 1,
        price: parseFloat(med.price) || 0,
        dosage: `${med.dosage || ''} ${med.frequency ? `(${med.frequency})` : ''}`.trim(),
        instructions: `${med.duration || ''} ${med.notes ? `- ${med.notes}` : ''}`.trim(),
      }));

      if (editingPrescId) {
        // UPDATE Existing Prescription
        await prescriptionService.updatePrescription(activeToken, editingPrescId, {
          notes: prescDiagnosis,
          items,
        });

        setAlertMsg({ type: 'success', text: lang === 'vi' ? `Cập nhật thành công Đơn thuốc #${editingPrescId}!` : `Successfully updated Prescription #${editingPrescId}!` });
      } else {
        // CREATE New Prescription
        await prescriptionService.createPrescription(activeToken, {
          appointmentId: Number(appointmentId),
          patientId: Number(patientId),
          notes: prescDiagnosis,
          items,
        });

        setAlertMsg({ type: 'success', text: lang === 'vi' ? 'Đã ký số và gửi đơn thuốc mới sang Quầy dược thành công!' : 'Prescription signed & dispatched to Pharmacy successfully!' });
      }

      handleCancelEdit();
      fetchDoctorHistory();
      setTimeout(() => setAlertMsg({ type: '', text: '' }), 5000);
    } catch (err) {
      console.error('Save prescription error:', err);
      setAlertMsg({ type: 'error', text: err.message || (lang === 'vi' ? 'Lỗi khi lưu đơn thuốc.' : 'Failed to save prescription.') });
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md text-left">
        <div>
          <h2 className="text-headline-xl font-headline-xl font-bold text-on-surface dark:text-white">
            {lang === 'vi' ? 'Quầy Kê Đơn Thuốc Bác Sĩ' : 'Doctor Prescription Desk'}
          </h2>
          <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1">
            {lang === 'vi' ? 'Kê đơn thuốc điện tử, chỉnh sửa đơn thuốc cho bệnh nhân và tự động lưu vào CSDL' : 'E-Prescribe medications, edit patient prescriptions & save to database'}
          </p>
        </div>
        <div className="flex gap-md w-fit">
          <button
            onClick={() => window.print()}
            className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 px-md py-sm rounded-lg flex items-center gap-xs text-on-surface dark:text-slate-200 font-label-md hover:bg-surface-container-high dark:hover:bg-slate-700 transition-all active:scale-[0.98] text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            {lang === 'vi' ? 'In báo cáo' : 'Print Summary'}
          </button>
          <button
            onClick={handleSaveOrUpdatePrescription}
            disabled={currentMedList.length === 0}
            className="bg-primary hover:bg-primary-container text-white px-lg py-sm font-label-md text-xs font-bold rounded-lg flex items-center gap-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">{editingPrescId ? 'save' : 'send'}</span>
            {editingPrescId ? (lang === 'vi' ? 'Lưu Cập Nhật Đơn' : 'Save Changes') : (lang === 'vi' ? 'Ký Số & Gửi Quầy Dược' : 'Sign & Dispatch')}
          </button>
        </div>
      </div>

      {/* ALERT BANNER */}
      {alertMsg.text && (
        <div className={'p-4 rounded-xl text-xs font-semibold flex items-center gap-2 text-left shadow-xs border ' + (alertMsg.type === 'error' ? 'bg-error-container/20 border-error/30 text-error' : alertMsg.type === 'success' ? 'bg-green-100 dark:bg-green-950/40 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300' : 'bg-blue-100 dark:bg-blue-950/40 border-blue-300 text-blue-800 dark:text-blue-300')}>
          <span className="material-symbols-outlined text-[20px]">
            {alertMsg.type === 'error' ? 'warning' : alertMsg.type === 'success' ? 'check_circle' : 'info'}
          </span>
          {alertMsg.text}
        </div>
      )}

      {/* Prescription Creation Workspace */}
      <div className="grid grid-cols-12 gap-gutter text-left">

        {/* Left Column: Form (7 cols) */}
        <div className="col-span-12 lg:col-span-7 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md shadow-sm space-y-md">
          <div className="flex justify-between items-center pb-2 border-b border-outline-variant/35 dark:border-slate-700">
            <h3 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white flex items-center gap-sm text-sm">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">edit_note</span>
              {editingPrescId ? (lang === 'vi' ? `Chỉnh Sửa Đơn Thuốc #${editingPrescId}` : `Edit Prescription #${editingPrescId}`) : (lang === 'vi' ? 'Lập Đơn Thuốc Mới' : 'Prescribe Medication')}
            </h3>

            {editingPrescId && (
              <button
                onClick={handleCancelEdit}
                className="text-xs text-error font-semibold hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">cancel</span>
                {lang === 'vi' ? 'Hủy chỉnh sửa' : 'Cancel Edit'}
              </button>
            )}
          </div>

          {/* Row 1: Target Patient & Diagnosis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <div className="flex justify-between items-center">
                <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">
                  {lang === 'vi' ? 'Chọn bệnh nhân' : 'Target Patient'}
                </label>
                <button
                  type="button"
                  onClick={() => setShowNewMRModal(true)}
                  className="text-[11px] text-primary dark:text-primary-fixed-dim hover:underline font-bold flex items-center gap-0.5"
                  title="Khởi tạo bệnh án mới nếu bệnh nhân chưa có thông tin trong CSDL"
                >
                  <span className="material-symbols-outlined text-[14px]">add_circle</span>
                  {lang === 'vi' ? '+ Lập bệnh án mới' : '+ Create EMR'}
                </button>
              </div>
              <select
                value={prescPatientId}
                onChange={(e) => handlePatientSelectChange(e.target.value)}
                className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-xs focus:ring-1 focus:ring-primary outline-none dark:text-white"
              >
                <option value="">{lang === 'vi' ? '— Chọn bệnh nhân —' : '— Select patient —'}</option>
                {patientOptions.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (ID: #{p.id})</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">
                {lang === 'vi' ? 'Chẩn đoán / Lý do' : 'Diagnosis / Reason'}
              </label>
              <input
                type="text"
                placeholder={lang === 'vi' ? 'Tăng huyết áp, Viêm phế quản...' : 'Hypertension, Pneumonia...'}
                value={prescDiagnosis}
                onChange={(e) => setPrescDiagnosis(e.target.value)}
                className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-xs outline-none text-on-surface dark:text-white"
              />
            </div>
          </div>

          {/* Warning Banner if patient has no medical record */}
          {prescPatientId && hasMedicalRecord === false && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-amber-600 text-[20px]">warning</span>
                <span>Bệnh nhân chưa có Hồ sơ Bệnh án điện tử. Bắt buộc phải tạo bệnh án mới trước khi kê đơn!</span>
              </div>
              <button
                type="button"
                onClick={() => setShowNewMRModal(true)}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs whitespace-nowrap shadow-xs transition-all flex items-center gap-1 active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                + Lập Bệnh Án Ngay
              </button>
            </div>
          )}

          {/* Quick Select from Pharmacy Catalog */}
          {availableMedicines.length > 0 && (
            <div className="flex flex-col gap-xs bg-surface-container-lowest dark:bg-slate-900/50 p-3 rounded-lg border border-outline-variant/50 dark:border-slate-700">
              <label className="text-xs font-bold text-primary dark:text-primary-fixed-dim uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">local_pharmacy</span>
                {lang === 'vi' ? 'Chọn nhanh từ Kho Dược Phẩm' : 'Select from Pharmacy Catalog'}
              </label>
              <select
                value={selectedCatalogMedId}
                onChange={handleSelectCatalogMed}
                className="h-9 px-md bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg text-xs outline-none text-on-surface dark:text-white"
              >
                <option value="">{lang === 'vi' ? '— Tìm / Chọn tên thuốc —' : '— Select medicine —'}</option>
                {availableMedicines.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.unit}) - {m.category || 'Dược phẩm'} [Tồn: {m.stockQuantity}]
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Row 2: Drug Name & Dosage */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
            <div className="sm:col-span-2 flex flex-col gap-xs">
              <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">
                {lang === 'vi' ? 'Tên thuốc' : 'Drug Name'}
              </label>
              <input
                type="text"
                placeholder={lang === 'vi' ? 'Tên thuốc kê đơn...' : 'Enter medication name...'}
                value={draftMedName}
                onChange={(e) => setDraftMedName(e.target.value)}
                className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-xs outline-none text-on-surface dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">
                {lang === 'vi' ? 'Số lượng' : 'Quantity'}
              </label>
              <input
                type="number"
                min="1"
                value={draftMedQty}
                onChange={(e) => setDraftMedQty(e.target.value)}
                className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-xs outline-none text-on-surface dark:text-white"
              />
            </div>
          </div>

          {/* Row 3: Frequency & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">
                {lang === 'vi' ? 'Tần suất dùng' : 'Frequency'}
              </label>
              <input
                type="text"
                value={draftMedFreq}
                onChange={(e) => setDraftMedFreq(e.target.value)}
                placeholder="Sáng 1 viên, Tối 1 viên"
                className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-xs outline-none text-on-surface dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">
                {lang === 'vi' ? 'Thời gian dùng' : 'Duration'}
              </label>
              <input
                type="text"
                value={draftMedDuration}
                onChange={(e) => setDraftMedDuration(e.target.value)}
                placeholder="7 ngày"
                className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-xs outline-none text-on-surface dark:text-white"
              />
            </div>
          </div>

          {/* Row 4: Directions / Notes */}
          <div className="flex flex-col gap-xs">
            <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">
              {lang === 'vi' ? 'Lời dặn bác sĩ' : 'Instructions'}
            </label>
            <textarea
              rows="2"
              placeholder={lang === 'vi' ? 'Uống sau khi ăn 30 phút...' : 'Take after meals...'}
              value={draftMedNotes}
              onChange={(e) => setDraftMedNotes(e.target.value)}
              className="p-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-xs outline-none text-on-surface dark:text-white resize-none"
            />
          </div>

          {/* Add Medication Trigger Button */}
          <button
            onClick={handleAddMedication}
            className="w-full bg-secondary-container text-on-secondary-container dark:bg-teal-900 dark:text-teal-400 border border-secondary-container dark:border-slate-700 hover:bg-secondary/15 py-2.5 rounded-lg font-bold flex items-center justify-center gap-sm transition-all active:scale-[0.98] text-xs mt-2"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            {lang === 'vi' ? 'Thêm Thuốc Vào Đơn Nháp' : 'Add to Prescription Draft'}
          </button>

        </div>

        {/* Right Column: Draft Summary (5 cols) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl shadow-sm overflow-hidden min-h-[400px]">

          {/* Draft Header */}
          <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50">
            <h3 className="text-label-md font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest text-[11px]">
              {editingPrescId ? (lang === 'vi' ? `ĐANG SỬA ĐƠN THUỐC #${editingPrescId}` : `EDITING PRESCRIPTION #${editingPrescId}`) : (lang === 'vi' ? 'ĐƠN THUỐC NHÁP ĐANG KÊ' : 'ACTIVE PRESCRIPTION DRAFT')}
            </h3>
            <div className="mt-1 text-sm text-on-surface dark:text-white font-bold">
              {lang === 'vi' ? 'Bệnh nhân:' : 'Patient:'} {patientMap.get(String(prescPatientId)) || (lang === 'vi' ? 'Chưa chọn bệnh nhân' : 'Select Patient')}
            </div>
            <div className="text-xs text-outline dark:text-slate-400 mt-0.5">
              {lang === 'vi' ? 'Chẩn đoán:' : 'Diagnosis:'} {prescDiagnosis || (lang === 'vi' ? 'Chưa nhập' : 'Not specified')}
            </div>
          </div>

          {/* Medications List */}
          <div className="flex-grow p-md space-y-2 overflow-y-auto max-h-[320px]">
            {currentMedList.map((med, idx) => (
              <div
                key={idx}
                className="p-3 bg-surface-container-low dark:bg-slate-900 border border-outline-variant/60 dark:border-slate-700 rounded-lg flex justify-between items-center group text-xs"
              >
                <div className="space-y-0.5">
                  <h4 className="font-bold text-primary dark:text-primary-fixed-dim">
                    {med.name} <span className="text-on-surface font-semibold dark:text-white">x{med.quantity} {med.unit || ''}</span>
                  </h4>
                  <p className="text-on-surface-variant dark:text-slate-300 font-medium">{med.dosage} {med.frequency ? `· ${med.frequency}` : ''}</p>
                  <p className="text-[10px] text-slate-400 italic">{med.notes}</p>
                </div>
                <button
                  onClick={() => handleRemoveMedication(idx)}
                  className="p-1 text-error hover:bg-error-container/20 rounded-full transition-opacity"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}

            {currentMedList.length === 0 && (
              <div className="h-full flex flex-col justify-center items-center text-center text-on-surface-variant dark:text-slate-400 py-12">
                <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-md">
                  prescriptions
                </span>
                <p className="font-body-md text-xs max-w-xs">
                  {lang === 'vi'
                    ? 'Đơn thuốc nháp đang trống. Chọn loại thuốc ở bảng bên trái và bấm Thêm.'
                    : 'Prescription draft is empty. Select a medication on the left and click Add.'}
                </p>
              </div>
            )}
          </div>

          {/* Submit dispatch actions */}
          <div className="p-md bg-surface-container-lowest dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 flex gap-md">
            <button
              onClick={handleCancelEdit}
              disabled={currentMedList.length === 0 && !editingPrescId}
              className="flex-1 border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-300 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors font-bold text-xs"
            >
              {editingPrescId ? (lang === 'vi' ? 'Hủy Sửa' : 'Cancel') : (lang === 'vi' ? 'Xóa Nháp' : 'Clear')}
            </button>
            <button
              onClick={handleSaveOrUpdatePrescription}
              disabled={currentMedList.length === 0}
              className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-container disabled:opacity-30 transition-all active:scale-[0.98] font-bold text-xs shadow-sm"
            >
              {editingPrescId ? (lang === 'vi' ? 'Cập Nhật Đơn' : 'Update') : (lang === 'vi' ? 'Gửi Quầy Dược' : 'Dispatch')}
            </button>
          </div>

        </div>

      </div>

      {/* Prescriptions History Table from Backend DB */}
      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm text-left">

        {/* Table Header */}
        <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50 flex justify-between items-center">
          <h3 className="text-label-md font-bold text-on-surface dark:text-white uppercase flex items-center gap-sm text-xs">
            <span className="material-symbols-outlined text-[18px]">history</span>
            {lang === 'vi' ? 'Lịch Sử Kê Đơn Của Bác Sĩ (Từ CSDL)' : 'Doctor Prescription History (Real DB)'}
          </h3>
          <span className="text-xs text-on-surface-variant dark:text-slate-400">{dbPrescriptions.length} {lang === 'vi' ? 'đơn thuốc' : 'prescriptions'}</span>
        </div>

        {/* Dispatch Grid List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-primary">
            <span className="material-symbols-outlined animate-spin text-[32px] mr-2">sync</span>
            <span className="text-xs font-semibold">{lang === 'vi' ? 'Đang tải lịch sử kê đơn từ CSDL...' : 'Loading prescription history...'}</span>
          </div>
        ) : dbPrescriptions.length === 0 ? (
          <div className="py-12 text-center text-on-surface-variant dark:text-slate-400 text-xs">
            <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-2">history</span>
            <p className="font-semibold">{lang === 'vi' ? 'Chưa có đơn thuốc nào được lưu trong hệ thống.' : 'No prescription records found.'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/30 text-on-surface-variant dark:text-slate-300 border-b border-outline-variant dark:border-slate-700 text-left text-[11px] uppercase">
                  <th className="px-4 py-3 font-bold">Mã Đơn</th>
                  <th className="px-4 py-3 font-bold">Bệnh Nhân</th>
                  <th className="px-4 py-3 font-bold">Ghi Chú / Chẩn Đoán</th>
                  <th className="px-4 py-3 font-bold">Thuốc Kê Đơn</th>
                  <th className="px-4 py-3 font-bold">Thời Gian</th>
                  <th className="px-4 py-3 font-bold">Trạng Thái</th>
                  <th className="px-4 py-3 font-bold text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="text-on-surface dark:text-slate-200 divide-y divide-outline-variant dark:divide-slate-700/50">
                {dbPrescriptions.map((p, idx) => (
                  <tr
                    key={p.id}
                    className={`hover:bg-surface-container-low dark:hover:bg-slate-700/40 transition-colors ${idx % 2 === 1 ? 'bg-slate-50/30 dark:bg-slate-900/10' : ''}`}
                  >
                    <td className="px-4 py-3 font-bold text-primary dark:text-primary-fixed-dim">
                      #{p.id}
                    </td>
                    <td className="px-4 py-3 font-bold">
                      {p.patient?.fullName || (lang === 'vi' ? `Bệnh nhân #${p.patientId}` : `Patient #${p.patientId}`)}
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant dark:text-slate-300 max-w-[180px] truncate font-medium">
                      {p.notes || p.medicalRecord?.diagnosesICD10 || p.appointment?.symptoms || '—'}
                    </td>
                    <td className="px-4 py-3 max-w-[240px]">
                      {p.items && p.items.length > 0 ? (
                        <div className="space-y-0.5">
                          {p.items.map((item, i) => (
                            <span key={i} className="inline-block bg-surface-container-high dark:bg-slate-700/60 text-[10px] px-2 py-0.5 rounded mr-1 font-medium">
                              {item.medicineName} x{item.quantity}
                            </span>
                          ))}
                        </div>
                      ) : <span className="text-slate-400 italic">—</span>}
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant dark:text-slate-400 whitespace-nowrap">
                      {formatDate(p.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      {p.status === 'DISPENSED' ? (
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800 flex items-center gap-1 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {lang === 'vi' ? 'Đã cấp phát' : 'Dispensed'}
                        </span>
                      ) : (
                        <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 flex items-center gap-1 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> {lang === 'vi' ? 'Chờ quầy dược' : 'Pending'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => handleEditPrescription(p)}
                          disabled={p.status === 'DISPENSED'}
                          className="px-2.5 py-1 bg-primary/10 hover:bg-primary/20 text-primary dark:bg-primary/20 dark:text-primary-fixed-dim rounded font-bold text-[11px] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                          title={lang === 'vi' ? 'Nạp đơn này lên form để chỉnh sửa' : 'Edit Prescription'}
                        >
                          <span className="material-symbols-outlined text-[14px]">edit</span>
                          {lang === 'vi' ? 'Sửa đơn' : 'Edit'}
                        </button>
                        <button
                          onClick={() => window.print()}
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                          title={lang === 'vi' ? 'In đơn thuốc' : 'Print'}
                        >
                          <span className="material-symbols-outlined text-[16px]">print</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Modal: Lập Bệnh Án Mới Cho Bệnh Nhân Mới */}
      {showNewMRModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh] text-left">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-on-surface dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">clinical_notes</span>
                  {lang === 'vi' ? 'Lập Bệnh Án Điện Tử & Khám Lâm Sàng Mới' : 'Create New EMR Medical Record'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'vi' ? 'Điền thông tin chẩn đoán & sinh hiệu trước khi kê đơn thuốc' : 'Fill in diagnosis & vitals before prescribing'}
                </p>
              </div>
              <button onClick={() => setShowNewMRModal(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Chọn Lịch Hẹn / Bệnh Nhân *</label>
                <select
                  value={newMR.appointmentId || newMR.patientId}
                  onChange={(e) => {
                    const val = e.target.value;
                    const appt = schedule.find(s => String(s.id) === String(val) || String(s.patientDbId) === String(val));
                    setNewMR(prev => ({
                      ...prev,
                      appointmentId: appt ? String(appt.id) : val,
                      patientId: appt ? String(appt.patientDbId) : val,
                      chiefComplaint: appt?.reason || prev.chiefComplaint,
                    }));
                  }}
                  className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-primary dark:text-white"
                >
                  <option value="">— Chọn bệnh nhân trong danh sách —</option>
                  {schedule.map(s => (
                    <option key={s.id} value={s.id}>{s.name} - {s.time} ({s.reason || 'Khám'})</option>
                  ))}
                  {patients.map(p => (
                    <option key={`p-${p.id}`} value={p.id}>{p.name} (Bệnh nhân #{p.id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Chẩn Đoán ICD-10 *</label>
                <input
                  type="text"
                  placeholder="e.g. I10 - Tăng huyết áp, J20 - Viêm phế quản..."
                  value={newMR.diagnosesICD10}
                  onChange={(e) => setNewMR(prev => ({ ...prev, diagnosesICD10: e.target.value }))}
                  className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-primary dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Lý Do Khám / Triệu Chứng (Chief Complaint)</label>
              <input
                type="text"
                placeholder="Ví dụ: Đau đầu, sốt nhẹ, ho kéo dài..."
                value={newMR.chiefComplaint}
                onChange={(e) => setNewMR(prev => ({ ...prev, chiefComplaint: e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-primary dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Ghi Chú Diễn Tiến Lâm Sàng</label>
                <textarea
                  rows="2"
                  value={newMR.clinicalNotes}
                  onChange={(e) => setNewMR(prev => ({ ...prev, clinicalNotes: e.target.value }))}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-primary dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Kế Hoạch Điều Trị</label>
                <textarea
                  rows="2"
                  value={newMR.treatmentPlan}
                  onChange={(e) => setNewMR(prev => ({ ...prev, treatmentPlan: e.target.value }))}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-primary dark:text-white resize-none"
                />
              </div>
            </div>

            {/* Vital Signs Grid */}
            <div className="p-3 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">monitor_heart</span>
                Dấu Hiệu Sinh Tồn (Vital Signs)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 block">Huyết áp (mmHg)</span>
                  <input
                    type="text"
                    value={newMRVitals.bloodPressure}
                    onChange={(e) => setNewMRVitals(v => ({ ...v, bloodPressure: e.target.value }))}
                    className="w-full h-8 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs text-on-surface dark:text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 block">Nhịp tim (lần/phút)</span>
                  <input
                    type="text"
                    value={newMRVitals.pulse}
                    onChange={(e) => setNewMRVitals(v => ({ ...v, pulse: e.target.value }))}
                    className="w-full h-8 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs text-on-surface dark:text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 block">Nhiệt độ (°C)</span>
                  <input
                    type="text"
                    value={newMRVitals.temperature}
                    onChange={(e) => setNewMRVitals(v => ({ ...v, temperature: e.target.value }))}
                    className="w-full h-8 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs text-on-surface dark:text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 block">SpO2 (%)</span>
                  <input
                    type="text"
                    value={newMRVitals.spO2}
                    onChange={(e) => setNewMRVitals(v => ({ ...v, spO2: e.target.value }))}
                    className="w-full h-8 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs text-on-surface dark:text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 block">Cân nặng (kg)</span>
                  <input
                    type="text"
                    value={newMRVitals.weight}
                    onChange={(e) => setNewMRVitals(v => ({ ...v, weight: e.target.value }))}
                    className="w-full h-8 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs text-on-surface dark:text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 block">Chiều cao (cm)</span>
                  <input
                    type="text"
                    value={newMRVitals.height}
                    onChange={(e) => setNewMRVitals(v => ({ ...v, height: e.target.value }))}
                    className="w-full h-8 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs text-on-surface dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewMRModal(false)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={handleSaveNewMedicalRecord}
                disabled={isSavingMR}
                className="px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-lg text-xs font-bold shadow-sm transition-all disabled:opacity-50 flex items-center gap-1"
              >
                {isSavingMR ? <span className="material-symbols-outlined animate-spin text-[16px]">sync</span> : <span className="material-symbols-outlined text-[16px]">check_circle</span>}
                Lưu Bệnh Án & Bắt Đầu Kê Đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
