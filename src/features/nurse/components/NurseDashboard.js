import React, { useState, useEffect, useMemo } from 'react';
import NurseDashboardTab from '../pages/Dashboard/NurseDashboardTab';
import NurseWardMapTab from '../pages/WardMap/NurseWardMapTab';
import NursePatientsTab from '../pages/Patients/NursePatientsTab';
import NurseClinicalNotesTab from '../pages/ClinicalNotes/NurseClinicalNotesTab';
import NurseMedicationTab from '../pages/Medication/NurseMedicationTab';
import NurseVitalsTab from '../pages/Vitals/NurseVitalsTab';
import NurseLabResultsTab from '../pages/LabResults/NurseLabResultsTab';
import NurseSettingsTab from '../pages/Settings/NurseSettingsTab';

const translations = {
  vi: {
    dashboard: 'Bảng điều khiển',
    wardMap: 'Sơ đồ phòng',
    patientList: 'Danh sách bệnh nhân',
    medication: 'Cấp phát thuốc',
    vitals: 'Chỉ số sinh tồn',
    reports: 'Báo cáo',
    signOut: 'Đăng xuất',
    searchPlaceholder: 'Tìm kiếm bệnh nhân, hồ sơ hoặc thuốc...',
    shiftLead: 'Trưởng Ca Trực',
    bedOccupancy: 'Tỷ lệ giường bệnh',
    activeRounds: 'Lượt kiểm tra',
    medsDue: 'Lịch uống thuốc',
    vitalsAlerts: 'Cảnh báo chỉ số',
    completed: 'Đã hoàn thành',
    dueNow: 'Cần uống ngay',
    nextIn: 'Lần tới sau',
    critical: 'NGUY KỊCH',
    requiresAttention: 'Cần xử lý khẩn cấp',
    observationsTitle: 'Theo Dõi Người Bệnh & Kiểm Tra Buồng',
    startAllRounds: 'Bắt đầu kiểm tra toàn bộ',
    roomBed: 'Phòng / Giường',
    patientName: 'Họ và tên bệnh nhân',
    condition: 'Tình trạng',
    nextObservation: 'Lần kiểm tra tới',
    status: 'Trạng thái',
    checkVitals: 'Đo sinh hiệu',
    highRisk: 'Nguy cơ cao',
    stable: 'Ổn định',
    monitoring: 'Đang theo dõi',
    postOp: 'Hậu phẫu',
    overdue: 'Quá hạn',
    onTrack: 'Đúng giờ',
    pending: 'Đang chờ',
    patientAlert: 'Cảnh báo người bệnh: {bed}',
    live: 'Trực tiếp',
    heartRate: 'Nhịp tim (BPM)',
    bp: 'Huyết áp',
    spo2: 'SpO2',
    acknowledgeRespond: 'Xác nhận & Xử lý',
    vitalsSummary: 'Tóm tắt sinh hiệu: {bed}',
    lastUpdated: 'Cập nhật: {time} trước',
    temp: 'Nhiệt độ',
    viewTrends: 'Xem đồ thị',
    medsSchedule: 'Lịch Cấp Phát Thuốc',
    fullChart: 'Hồ sơ đầy đủ',
    urgent: 'KHẨN CẤP',
    administer: 'Cấp thuốc',
    administered: 'Đã cấp',
    stationFeed: 'Thông báo ca trực',
    viewAllComms: 'Xem toàn bộ hội thoại',
    floorName: 'Tầng 4 Phía Bắc',
    codeBlueDrill: 'Phòng 203: Diễn tập Code Blue sau {time}h',
    newRole: 'Thêm mới',
    cancel: 'Hủy',
    save: 'Lưu',
    addPatient: 'Nhập viện bệnh nhân mới',
    id: 'Mã BN',
    age: 'Tuổi',
    gender: 'Giới tính',
    male: 'Nam',
    female: 'Nữ',
    admissionDate: 'Ngày nhập viện',
    primaryDoctor: 'Bác sĩ phụ trách',
    actions: 'Thao tác',
    all: 'Tất cả',
    vitalsLogger: 'Ghi Nhận Chỉ Số Sinh Tồn',
    enterVitalsText: 'Nhập thông số đo thực tế để lưu vào hồ sơ lâm sàng bệnh nhân.',
    recordSuccess: 'Đã lưu chỉ số sinh tồn của bệnh nhân thành công!',
    historyLogs: 'Nhật ký đo sinh hiệu gần đây',
    bpPlaceholder: 'Ví dụ: 120/80',
    hrPlaceholder: 'Nhịp tim',
    tempPlaceholder: 'Nhiệt độ °C',
    spo2Placeholder: 'SpO2 %',
    selectPatient: 'Chọn bệnh nhân',
    nurseTitle: 'Điều dưỡng',
    clinicalPortal: 'Cổng Điều Dưỡng',
    recordVitals: 'Ghi nhận sinh hiệu',
    helpCenter: 'Trợ giúp',
    clinicalNotes: 'Ghi chú lâm sàng',
    labResults: 'Kết quả xét nghiệm',
    settings: 'Cài đặt'
  },
  en: {
    dashboard: 'Dashboard',
    wardMap: 'Ward Map',
    patientList: 'Patient List',
    medication: 'Medication',
    vitals: 'Vitals',
    reports: 'Reports',
    signOut: 'Sign Out',
    searchPlaceholder: 'Search Patients, Records, or Meds...',
    shiftLead: 'Shift Lead',
    bedOccupancy: 'Bed Occupancy',
    activeRounds: 'Active Rounds',
    medsDue: 'Medications Due',
    vitalsAlerts: 'Vitals Alerts',
    completed: 'Completed',
    dueNow: 'Due Now',
    nextIn: 'Next in',
    critical: 'CRITICAL',
    requiresAttention: 'Requires immediate attn',
    observationsTitle: 'Patient Rounds & Observations',
    startAllRounds: 'Start All Rounds',
    roomBed: 'Room / Bed',
    patientName: 'Patient Name',
    condition: 'Condition',
    nextObservation: 'Next Observation',
    status: 'Status',
    checkVitals: 'Check Vitals',
    highRisk: 'High Risk',
    stable: 'Stable',
    monitoring: 'Monitoring',
    postOp: 'Post-Op',
    overdue: 'Overdue',
    onTrack: 'On Track',
    pending: 'Pending',
    patientAlert: 'Patient Alert: {bed}',
    live: 'Live',
    heartRate: 'Heart Rate (BPM)',
    bp: 'BP',
    spo2: 'SpO2',
    acknowledgeRespond: 'Acknowledge & Respond',
    vitalsSummary: 'Vitals Summary: {bed}',
    lastUpdated: 'Last updated: {time} ago',
    temp: 'Temp',
    viewTrends: 'View Trends',
    medsSchedule: 'Meds Schedule',
    fullChart: 'Full Chart',
    urgent: 'URGENT',
    administer: 'Administer',
    administered: 'Administered',
    stationFeed: 'Station Feed',
    viewAllComms: 'View All Communications',
    floorName: 'Floor 4 North',
    codeBlueDrill: 'Room 203: Code Blue drills in {time}h',
    newRole: 'New',
    cancel: 'Cancel',
    save: 'Save',
    addPatient: 'Admit New Patient',
    id: 'ID',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    admissionDate: 'Admission Date',
    primaryDoctor: 'Primary Doctor',
    actions: 'Actions',
    all: 'All',
    vitalsLogger: 'Record Vital Signs',
    enterVitalsText: 'Enter clinical vital readings to save directly to the patient record.',
    recordSuccess: 'Patient vital signs logged successfully!',
    historyLogs: 'Recent Vitals Log',
    bpPlaceholder: 'e.g. 120/80',
    hrPlaceholder: 'Heart rate',
    tempPlaceholder: 'Temp °C',
    spo2Placeholder: 'SpO2 %',
    selectPatient: 'Select patient',
    nurseTitle: 'Nurse',
    clinicalPortal: 'Nursing Portal',
    recordVitals: 'Record Vitals',
    helpCenter: 'Help Center',
    clinicalNotes: 'Clinical Notes',
    settings: 'Settings'
  }
};

export default function NurseDashboard({ onNavigate, theme: propTheme, setTheme: propSetTheme, lang: propLang, setLang: propSetLang }) {
  const [localLang, setLocalLang] = useState('vi');
  const lang = propLang !== undefined ? propLang : localLang;
  const setLang = propSetLang !== undefined ? propSetLang : setLocalLang;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [localTheme, setLocalTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const currentTheme = propTheme !== undefined ? propTheme : localTheme;
  const isDark = currentTheme === 'dark';

  const t = translations[lang];

  useEffect(() => {
    if (propTheme === undefined) {
      if (localTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', localTheme);
    }
  }, [localTheme, propTheme]);

  const handleToggleDark = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    if (propSetTheme) {
      propSetTheme(nextTheme);
    } else {
      setLocalTheme(nextTheme);
    }
  };

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Floor Map states
  const [visiblePopover, setVisiblePopover] = useState(null);
  const [isWardAlertAcknowledged, setIsWardAlertAcknowledged] = useState(false);
  const [patientFilterMode, setPatientFilterMode] = useState('my');
  const [selectedNotesPatId, setSelectedNotesPatId] = useState('#BN-99283-A');
  const [selectedFloor, setSelectedFloor] = useState(null);
  
  // Settings States
  const [hospitalName, setHospitalName] = useState('Bệnh viện Đa khoa MedCore');
  const [hospitalAddress, setHospitalAddress] = useState('123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh');
  const [is2faEnabled, setIs2faEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30 phút');

  // SOAP Note Editor States
  const [soapSubjective, setSoapSubjective] = useState('');
  const [soapObjective, setSoapObjective] = useState('');
  const [soapAssessment, setSoapAssessment] = useState('');
  const [soapPlan, setSoapPlan] = useState('');
  const [isSoapSaving, setIsSoapSaving] = useState(false);
  const [soapFinished, setSoapFinished] = useState(false);

  // ---------------- MOCK DATA & STATES ----------------

  // 1. Patient List & Rounds State
  const [patients, setPatients] = useState([
    {
      id: '#BN-99283-A',
      roomBed: '4C-01',
      name: 'Jameson, Robert',
      age: 78,
      gender: 'M',
      condition: 'High Risk',
      nextObs: '10:30 AM',
      status: 'OVERDUE',
      admissionDate: '2026-07-10',
      doctor: 'Dr. Aris Thorne',
      bpm: 114,
      bp: '145/95',
      spo2: 91,
      temp: 38.5,
      diagnosis: 'Congestive Heart Failure',
      diagnosisDetail: 'Stage C, New Onset AFib',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1OOETf-Hl9aYzROY4USIBvPI5yUdKGhM7niRXW8uPH0RgoJ3ABM3lTHo3v4sZxQZp9gcDjiWajNHPBlp0UYFksNyI_dfYr26BmXt4qtZwiL3fSJOr0LHJDj_BLtQau7X9R_sVJUOuBR-ZmflSOow8MGdl6ipjTZu7wOD2g8J-LB_z37FmECTZ1ZRJKEpFIuBryPAZIqJvjVtyeh13zEVh2_booM8EiTrp-H9mNxcNNERo6h5qchbl',
      assignedToMe: true,
      bloodType: 'O+',
      notes: [
        { id: 1, type: 'Daily Round', date: 'Oct 24, 09:15 AM', title: 'Post-op follow up', text: 'Patient reports improved pain levels since morning medication. Wound site shows no signs of erythema or exudate.', author: 'Dr. Elena Rodriguez', avatarColor: 'bg-secondary-container' },
        { id: 2, type: 'Specialist Consultation', date: 'Oct 22, 02:30 PM', title: 'Cardiology Review', text: 'Echocardiogram results pending. Advised increasing dosage of Lisinopril to 20mg OD.', author: 'Dr. Simon K. Stern', avatarColor: 'bg-primary-container' },
        { id: 3, type: 'Nursing Note', date: 'Oct 22, 08:00 AM', title: 'Morning Vitals', text: 'Vitals stable. Temperature 37.2°C. BP 134/82. Regular breakfast tolerated well.', author: 'Nurse Mark J.', avatarColor: 'bg-secondary-fixed' }
      ]
    },
    {
      id: '#BN-44102-C',
      roomBed: '4C-04',
      name: 'Patel, Meera',
      age: 54,
      gender: 'F',
      condition: 'Stable',
      nextObs: '11:00 AM',
      status: 'ON_TRACK',
      admissionDate: '2026-07-12',
      doctor: 'Dr. Elena Vance',
      bpm: 78,
      bp: '120/80',
      spo2: 98,
      temp: 37.2,
      diagnosis: 'Post-Op Appendectomy',
      diagnosisDetail: 'Stable, Monitoring for Fever',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIyho1jswSOnqu5AxiFqcGhXoLsvnXbHRxLrzW3KHwXkMy2plBUknQDXU73SFJxHl5F8VwIeIP20WK9JNy9tYTjKF6jrdQbRaFiHnqwL9rFmGaOUICLMxnF5VH-foRK1ZN7wimTX7cP77z0xsg7hny8HveDKij1ifYfCEo8_Gxaw6KwVtY0-jEeX74RYpibgJifU1d_6SKlQxwajjI1OpJEXh73cv9O3Y0nGS77pdFixEgbQfZkOEt',
      assignedToMe: true,
      bloodType: 'B-',
      notes: [
        { id: 1, type: 'Nursing Note', date: 'Oct 24, 08:30 AM', title: 'Pain management adequate', text: 'Patient reports mild incision pain. Ambulated around the ward wing twice. Vital signs within normal parameters.', author: 'Nurse Sarah Miller', avatarColor: 'bg-secondary-fixed' }
      ]
    },
    {
      id: '#BN-11822-L',
      roomBed: '4C-09',
      name: 'Dixon, Marcus',
      age: 22,
      gender: 'M',
      condition: 'Monitoring',
      nextObs: '11:15 AM',
      status: 'ON_TRACK',
      admissionDate: '2026-07-14',
      doctor: 'Dr. Michael Ross',
      bpm: 82,
      bp: '125/82',
      spo2: 96,
      temp: 36.8,
      diagnosis: 'Pneumonia, Bacterial',
      diagnosisDetail: 'IV Antibiotics Day 2',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsOL5azWyGuSdNUvNFJ3Gwq958xy0Mu45Jg3-FMqImnSH2woKrfRcCTGEvqQsh0gy7ZgOEoCgwNBhdVG4oYKaJySxY0Y3xZp9jPjzDGQ0PT0Xf9mCg_W409uKNbHuxAl7zpFbdFhto8SixX_dgW_6VLgbZL4t37-HSsdr7mek5C1LP4rSkw4N3I4vVmKOibnTBwRJRTRZ5_kUYBgEGWrVInK07hHXYns4c7u4bCjp0gLnGmhKqC5tn',
      assignedToMe: true,
      bloodType: 'A+',
      notes: [
        { id: 1, type: 'Daily Round', date: 'Oct 24, 07:45 AM', title: 'Auscultation check', text: 'Bilateral breath sounds show coarse rhonchi. Cough productive of yellow sputum. Antibiotics tolerated well.', author: 'Dr. Michael Ross', avatarColor: 'bg-primary-container' }
      ]
    },
    {
      id: '#BN-66720-X',
      roomBed: '4C-12',
      name: 'Whitaker, Linda',
      age: 63,
      gender: 'F',
      condition: 'High Risk',
      nextObs: '10:45 AM',
      status: 'PENDING',
      admissionDate: '2026-07-13',
      doctor: 'Dr. Aris Thorne',
      bpm: 88,
      bp: '130/85',
      spo2: 94,
      temp: 37.5,
      diagnosis: 'Type 2 Diabetes Flare-up',
      diagnosisDetail: 'Ketoacidosis, Insulin Infusion',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGCl_PQnofxENihw6R6CnULaQSr9aRlMuWTRTtX-uc1ZiXSlft3ua9xAiloZ3_-SKh0ZBy3En4hiEPZbFlaRKdTxcU6rM8tYtkUYJceAquT__jozY9vxoi-oDiSen2QO2sSO0Fmzcx8QcDUD6CmLECT8QK00DoENxcLGZiqafehUvfEdjQ3Vcm4N8igXIO9bLzp_xjjxHUZ9eFAmorSFTCwbsfVoz-HF-LWJKgKfaodF2a6jY3PEho',
      assignedToMe: false,
      bloodType: 'AB+',
      notes: [
        { id: 1, type: 'Specialist Consultation', date: 'Oct 23, 03:00 PM', title: 'Endocrinology Review', text: 'Blood glucose levels stabilized at 145 mg/dL. Reconfigured insulin infusion rate.', author: 'Dr. Julian Reed', avatarColor: 'bg-primary-container' }
      ]
    },
    {
      id: '#BN-33209-B',
      roomBed: '4C-15',
      name: 'Garcia, Carlos',
      age: 47,
      gender: 'M',
      condition: 'Stable',
      nextObs: '12:00 PM',
      status: 'ON_TRACK',
      admissionDate: '2026-07-15',
      doctor: 'Dr. Elena Vance',
      bpm: 72,
      bp: '118/76',
      spo2: 95,
      temp: 36.9,
      diagnosis: 'Acute Bronchitis',
      diagnosisDetail: 'Oxygen support at 2L',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfmFm31i9eWbASTna4klOMx7oI1FiEmtDmjC0_CRZGwIHgA14BM6rP9yNaHDWNsNSqhXT7DSzf1784dSXPqO__GxWIKn_KbDPT4tjvDQ_WeVElACVCR5M0bb7MxrjZdhhkrF7PM5UJaB6wbbd_71MzGMnE-se7d5V9asq3Pz62DaCrTy1cb-FzTU9FCXQw-yB-__9uqw_Krv0edHutX0nxEj4sB77tcrlVWT8uD6lTblN67hUJXhUc',
      assignedToMe: false,
      bloodType: 'O-',
      notes: [
        { id: 1, type: 'Nursing Note', date: 'Oct 24, 11:20 AM', title: 'Oxygen therapy tolerated', text: 'Patient reports feeling less short of breath. SpO2 stable on 2L nasal cannula.', author: 'Nurse Sarah Miller', avatarColor: 'bg-secondary-fixed' }
      ]
    }
  ]);

  // 2. Alert Status State for 204-A
  const [isAlertAcknowledged, setIsAlertAcknowledged] = useState(false);

  // 3. Vitals logs history for Vitals Log Tab
  const [vitalsHistory, setVitalsHistory] = useState([
    { id: 1, time: '13:58', patient: 'Robert Sullivan (204-A)', bp: '142/93', bpm: 112, temp: '38.4°C', spo2: '92%' },
    { id: 2, time: '13:45', patient: 'Elena Rodriguez (204-B)', bp: '120/80', bpm: 78, temp: '37.2°C', spo2: '98%' },
    { id: 3, time: '13:12', patient: 'Samuel Park (205-A)', bp: '125/82', bpm: 82, temp: '36.8°C', spo2: '96%' }
  ]);

  // Vitals Form State
  const [selectedPatId, setSelectedPatId] = useState('');
  const [inputBP, setInputBP] = useState('');
  const [inputBPM, setInputBPM] = useState('');
  const [inputTemp, setInputTemp] = useState('');
  const [inputSpO2, setInputSpO2] = useState('');

  // 3.1 Vitals Dashboard States
  const [vitalsPatients, setVitalsPatients] = useState([
    { id: 'sj-12', bed: '12', name: 'Sarah Jenkins', bp: '195/110', hr: 112, spo2: 94, temp: 38.2, lastLog: '2m ago', age: 65, idNum: 'SJ-8812', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD83fPAfS9dNuhQ1lhJR_FaoRFDafKOEG-n9g6nsKCidHYxNoXH6iZbbfmZ7qOnspqf-rB9HiRIyIorL4itSdicsGkF1yiHOElaJnd-AQamrAinuLITItrPHg54F9QH8Q-OKoJ17-H2vOc94_abarwyTRwysqXYQ9PJrxoFEOFdHvwbj5yVRqYot9TXQMG98MtKvP2V7JXX17dTLydqJxlqPJO7_PFMufBRf9epb7NJ1JzqKjs0aIDv', readings: [120, 130, 195, 170, 185, 195] },
    { id: 'rt-08', bed: '08', name: 'Robert Thompson', bp: '122/80', hr: 72, spo2: 98, temp: 36.6, lastLog: '15m ago', age: 72, idNum: 'RT-9921', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQjJMTqqJpHDb517tmnTd35OG2ccb4AkTUjZBaECXOcOuojzQwwu4XMrVPAXK08uCanZcUY6Ei4jHlhFhFkf2sWToWUNKOj2U0uSZsahi4DMWNb7sk4F06xQv6eBNVFRvs7Cu95I5qcU4itleZTEkkPiz8kSB7tHqihrQqLi9hwkxeFY8_vF-jfWSiJ08tbQP2YSGvYY_YbMUR6jgshY9bfwpHdp3BuhVjCz1qZYS4Cmk1U2pVlKhE', readings: [120, 125, 158, 132, 122, 128] },
    { id: 'mc-21', bed: '21', name: 'Michael Chen', bp: '118/76', hr: 48, spo2: 99, temp: 36.5, lastLog: '42m ago', age: 58, idNum: 'MC-7732', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO0qF7sZAPmSvu21x2jAN-YjKqVtEhbaP4kYFUusTXaEzrnkJZWDVxxiMmvq8iCTIMqNNLwVVcmDwLXVkItLnKlmq8VEwHc5DskJmX-1HqvjZczx4DQkZZDL0G_GVAvtQgmLYpE0ziRJ8iG3J1D2jO0twzidMQArR5rArc0BcYHff24kMZoGYzvk3llv3quk9nlEiVJU05WD33e8rKEgeJVFyhrZwGPMB9nWzm7qlCmRSn1TBjzCaZ', readings: [115, 118, 118, 120, 117, 118] },
    { id: 'ao-15', bed: '15', name: 'Amara Okafor', bp: '128/84', hr: 88, spo2: 89, temp: 37.1, lastLog: '1h ago', age: 41, idNum: 'AO-5510', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIyho1jswSOnqu5AxiFqcGhXoLsvnXbHRxLrzW3KHwXkMy2plBUknQDXU73SFJxHl5F8VwIeIP20WK9JNy9tYTjKF6jrdQbRaFiHnqwL9rFmGaOUICLMxnF5VH-foRK1ZN7wimTX7cP77z0xsg7hny8HveDKij1ifYfCEo8_Gxaw6KwVtY0-jEeX74RYpibgJifU1d_6SKlQxwajjI1OpJEXh73cv9O3Y0nGS77pdFixEgbQfZkOEt', readings: [122, 124, 128, 126, 128, 127] }
  ]);
  const [selectedVitalsPatId, setSelectedVitalsPatId] = useState('rt-08');
  const [isVitalsAlertTickerVisible, setIsVitalsAlertTickerVisible] = useState(true);
  const [vitalsTimeRange, setVitalsTimeRange] = useState('24H');
  const [vitalsAuditLog, setVitalsAuditLog] = useState([
    { id: 1, text: 'Dr. Adams updated Patient Robert Thompson (#RT-9921)', time: 'Today, 04:12 PM', isError: false },
    { id: 2, text: 'Alert Triggered: High BP - Patient Sarah Jenkins (#SJ-8812)', time: 'Today, 04:05 PM', isError: true },
    { id: 3, text: 'Nurse Miller logged vitals for 8 patients', time: 'Today, 03:50 PM', isError: false }
  ]);
  const [inputSystolic, setInputSystolic] = useState('');
  const [inputDiastolic, setInputDiastolic] = useState('');

  // 4. Medications Schedule State
  const [meds, setMeds] = useState([
    { id: 1, time: '10:00 AM', name: 'Insulin Aspart (Novolog)', details: '12 Units, SQ - Rm 204A', urgent: true, status: 'DUE' },
    { id: 2, time: '10:30 AM', name: 'Metformin 500mg', details: '1 Tablet, PO - Rm 205B', urgent: false, status: 'DUE' },
    { id: 3, time: '11:00 AM', name: 'Lisinopril 10mg', details: '1 Tablet, PO - Rm 204B', urgent: false, status: 'DUE' },
    { id: 4, time: '12:00 PM', name: 'Ceftriaxone 1g', details: 'IV Drip - Rm 206A', urgent: false, status: 'DUE' }
  ]);

  // 5. Active Bed Selected in Ward Map State
  const [selectedBedMap, setSelectedBedMap] = useState('204-A');

  // Interactive functions
  const handleAcknowledgeAlert = () => {
    setIsAlertAcknowledged(true);
    setPatients(prev => prev.map(p => p.roomBed === '204 - A' ? { ...p, condition: 'Stable', status: 'ON_TRACK', bpm: 85 } : p));
  };

  const handleAdministerMed = (id) => {
    setMeds(prev => prev.map(m => m.id === id ? { ...m, status: 'ADMINISTERED' } : m));
  };

  const handleStartAllRounds = () => {
    setPatients(prev => prev.map(p => ({ ...p, status: 'ON_TRACK' })));
    alert(lang === 'vi' ? 'Đã khởi động quy trình kiểm tra toàn bộ các phòng!' : 'Started all observations and ward rounds!');
  };

  const handleLogVitals = (e) => {
    e.preventDefault();
    if (!selectedPatId) {
      alert(lang === 'vi' ? 'Vui lòng chọn một bệnh nhân!' : 'Please select a patient!');
      return;
    }

    // Find patient in vitals list or general roster
    const vitalsPat = vitalsPatients.find(vp => vp.id === selectedPatId);
    const generalPat = patients.find(p => p.id === selectedPatId);
    const patName = vitalsPat ? vitalsPat.name : (generalPat ? generalPat.name : 'Unknown Patient');
    const patBed = vitalsPat ? vitalsPat.bed : (generalPat ? generalPat.roomBed : 'N/A');

    const bpString = (inputSystolic && inputDiastolic) ? `${inputSystolic}/${inputDiastolic}` : (inputBP || '120/80');
    const hrVal = parseInt(inputBPM) || 72;
    const spo2Val = parseInt(inputSpO2) || 98;
    const tempVal = parseFloat(inputTemp) || 36.6;

    // Update vitalsPatients state if patient is there
    if (vitalsPat) {
      setVitalsPatients(prev => prev.map(vp => {
        if (vp.id === selectedPatId) {
          const updatedReadings = [...vp.readings];
          if (inputSystolic) {
            // Append systolic reading to trend chart array (keep last 6 values)
            updatedReadings.shift();
            updatedReadings.push(parseInt(inputSystolic));
          }
          return {
            ...vp,
            bp: bpString,
            hr: hrVal,
            spo2: spo2Val,
            temp: tempVal,
            lastLog: 'Just now',
            readings: updatedReadings
          };
        }
        return vp;
      }));
    }

    // Update general patients state too
    if (generalPat) {
      setPatients(prev => prev.map(p => p.id === selectedPatId ? {
        ...p,
        bpm: hrVal,
        bp: bpString,
        spo2: spo2Val,
        temp: tempVal,
        status: 'ON_TRACK'
      } : p));
    }

    // Append to vitals log history
    const newHistoryLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      patient: `${patName} (${patBed})`,
      bp: bpString,
      bpm: hrVal,
      temp: `${tempVal}°C`,
      spo2: `${spo2Val}%`
    };
    setVitalsHistory([newHistoryLog, ...vitalsHistory]);

    // Append to Vitals Audit Log
    const isErr = parseInt(inputSystolic) > 140 || hrVal > 100 || hrVal < 50 || spo2Val < 90;
    const newAudit = {
      id: Date.now(),
      text: isErr
        ? `Alert Triggered: Abn Vitals - Patient ${patName} (Bed ${patBed}) - BP ${bpString}, HR ${hrVal}, SpO2 ${spo2Val}%`
        : `Nurse Miller logged vitals for Patient ${patName} (Bed ${patBed})`,
      time: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      isError: isErr
    };
    setVitalsAuditLog([newAudit, ...vitalsAuditLog]);

    // Reset inputs
    setInputBP('');
    setInputBPM('');
    setInputTemp('');
    setInputSpO2('');
    setInputSystolic('');
    setInputDiastolic('');
    setSelectedPatId('');
    alert(lang === 'vi' ? 'Ghi nhận chỉ số sinh hiệu thành công!' : 'Vitals logged successfully!');
  };

  const handleFinalizeSoapNote = (e) => {
    e.preventDefault();
    if (!soapSubjective && !soapObjective && !soapAssessment && !soapPlan) {
      alert(lang === 'vi' ? 'Vui lòng nhập ít nhất một trường SOAP!' : 'Please enter at least one SOAP field!');
      return;
    }
    setIsSoapSaving(true);
    setTimeout(() => {
      setIsSoapSaving(false);
      setSoapFinished(true);

      const patName = patients.find(p => p.id === selectedNotesPatId)?.name || 'Patient';
      // Construct new note
      const newNote = {
        id: Date.now(),
        type: 'Nursing Note',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        title: soapSubjective ? (soapSubjective.split('.').shift().substring(0, 40) + '...') : 'Nursing SOAP Progress Note',
        text: `S: ${soapSubjective || 'N/A'} | O: ${soapObjective || 'N/A'} | A: ${soapAssessment || 'N/A'} | P: ${soapPlan || 'N/A'}`,
        author: 'Nurse Nguyen, RN',
        avatarColor: 'bg-secondary-fixed'
      };

      // Update patients notes state
      setPatients(prev => prev.map(p => {
        if (p.id === selectedNotesPatId) {
          return {
            ...p,
            notes: [newNote, ...(p.notes || [])]
          };
        }
        return p;
      }));

      // Reset inputs
      setSoapSubjective('');
      setSoapObjective('');
      setSoapAssessment('');
      setSoapPlan('');

      setTimeout(() => {
        setSoapFinished(false);
      }, 3000);

      alert(lang === 'vi' ? `Ghi chú lâm sàng cho bệnh nhân ${patName} đã được ký và hoàn tất thành công!` : `Clinical note for ${patName} has been signed and finalized successfully!`);
    }, 1500);
  };

  // Filter patients by query
  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      const search = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(search) || p.id.toLowerCase().includes(search) || p.roomBed.toLowerCase().includes(search);
    });
  }, [patients, searchQuery]);

  // Bed status indicators for map
  const getBedStatusClass = (bedCode) => {
    if (bedCode === '203') return 'bg-error text-on-error border-error animate-pulse';
    if (bedCode === '204') {
      const patA = patients.find(p => p.roomBed === '204 - A');
      return patA && patA.condition === 'High Risk' && !isAlertAcknowledged ? 'bg-error/30 text-error border-error animate-pulse-subtle' : 'bg-primary-container text-on-primary-container border-primary';
    }
    if (bedCode === '205' || bedCode === '206' || bedCode === '201' || bedCode === '202') return 'bg-white/10 dark:bg-slate-800/40 text-on-surface dark:text-slate-300 border-outline-variant dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800';
    if (bedCode === 'NS') return 'bg-primary text-white border-primary';
    return 'bg-white/5 dark:bg-slate-900/10 text-on-surface dark:text-slate-600 opacity-50 border-outline-variant/30';
  };

  return (
    <div className="bg-background dark:bg-slate-950 text-on-surface dark:text-slate-100 min-h-screen transition-colors duration-200 text-left">

      {/* SIDEBAR NAVIGATION */}
      <aside className={`fixed left-0 top-0 h-full w-[260px] bg-white dark:bg-slate-950 border-r border-outline-variant dark:border-slate-800 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Brand Header */}
        <div className="px-6 py-6 flex items-center justify-between border-b border-outline-variant dark:border-slate-800 md:border-none">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                medical_services
              </span>
            </div>
            <div>
              <h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed-dim">MedCore</h1>
              <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{t.clinicalPortal}</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full border-none bg-transparent cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-grow space-y-1 py-4 text-left">
          {[
            { label: 'Dashboard', key: 'dashboard', icon: 'dashboard' },
            { label: 'Sơ đồ phòng', key: 'wardMap', icon: 'map' },
            { label: 'Danh sách bệnh nhân', key: 'patientList', icon: 'patient_list' },
            { label: 'Ghi chú lâm sàng', key: 'clinicalNotes', icon: 'clinical_notes' },
            { label: 'Cấp phát thuốc', key: 'medication', icon: 'medication' },
            { label: 'Chỉ số sinh tồn', key: 'vitals', icon: 'biotech' },
            { label: 'Kết quả xét nghiệm', key: 'labResults', icon: 'labs' },
            { label: 'Cài đặt', key: 'settings', icon: 'settings' }
          ].map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => { setActiveTab(item.label); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-6 py-3 border-l-4 transition-colors text-left border-none cursor-pointer ${isActive
                  ? 'text-primary dark:text-primary-fixed-dim border-primary dark:border-primary-fixed-dim font-bold bg-surface-container-low dark:bg-slate-900'
                  : 'text-on-surface-variant dark:text-slate-400 border-transparent hover:bg-surface-container-high dark:hover:bg-slate-800'
                  }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md">{t[item.key]}</span>
              </button>
            );
          })}
        </nav>

        {/* CTA & Footer */}
        <div className="p-4 mt-auto">
          <button
            onClick={() => setActiveTab('Chỉ số sinh tồn')}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all active:scale-[0.98] mb-4 shadow-sm border-none cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            {t.recordVitals}
          </button>
          <div className="border-t border-outline-variant dark:border-slate-800 pt-4 space-y-1 text-left">
            <button
              onClick={() => alert('Trợ giúp hệ thống EMR')}
              className="w-full flex items-center gap-3 px-2 py-2 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 rounded-md transition-colors border-none bg-transparent cursor-pointer"
            >
              <span className="material-symbols-outlined">help</span>
              <span className="font-label-md text-label-md">{t.helpCenter}</span>
            </button>
            <button
              onClick={() => onNavigate('home', true)}
              className="w-full flex items-center gap-3 px-2 py-2 text-error hover:bg-error-container/20 rounded-md transition-colors border-none bg-transparent cursor-pointer"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-md text-label-md">{t.signOut}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* TOP NAV BAR */}
      <header className="flex justify-between items-center h-16 px-6 md:ml-[260px] bg-white dark:bg-slate-950 sticky top-0 z-40 border-b border-outline-variant dark:border-slate-800 transition-colors">

        {/* Left Side: Mobile burger and Search */}
        <div className="flex items-center gap-md w-full max-w-md">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 md:hidden text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full border-none bg-transparent cursor-pointer"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-sm text-body-sm text-on-surface dark:text-white transition-all"
            />
          </div>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-md">

          {/* Theme switcher */}
          <button
            onClick={handleToggleDark}
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors border-none bg-transparent cursor-pointer"
            title={isDark ? 'Giao diện sáng (Light Mode)' : 'Giao diện tối (Dark Mode)'}
          >
            <span className="material-symbols-outlined">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high dark:hover:bg-slate-800 text-label-md font-bold text-primary dark:text-primary-fixed-dim transition-colors border-none bg-transparent cursor-pointer"
            title="Chuyển đổi ngôn ngữ / Switch Language"
          >
            {lang.toUpperCase()}
          </button>

          <button
            onClick={() => alert('Thông báo lâm sàng mới')}
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 relative transition-colors border-none bg-transparent cursor-pointer"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button
            onClick={() => alert('Liên hệ cấp cứu nội viện STAT')}
            className="w-10 h-10 flex items-center justify-center rounded-full text-error hover:bg-error-container/20 transition-colors border-none bg-transparent cursor-pointer"
          >
            <span className="material-symbols-outlined text-red-500">emergency</span>
          </button>
          <div className="flex items-center gap-3 pl-3 border-l border-outline-variant dark:border-slate-800">
            <img
              className="w-10 h-10 rounded-full object-cover border border-primary-fixed dark:border-slate-700"
              alt="Nurse profile portrait"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAUthjViAv9_UIehEEpii0Jwi-oiRZrQM3ye57vgXvOp7VILPFVO1g8LnudQQLsr4mdo_W8Hngpv_qmD0yczlz1uSgTRjHUTAo1ST7SZcq01l_GbBzG_ctapZWR0ANtVxuBaQpowEefYlC5NtEwibZQMCTdLgS0LTp_wOB7ir8czGHL042cz42AtFvoyCP8ADAzqJfGHRvJ-H1sXKKe5PLxe5JelIZAuBgrNaz1kYarEp4gqMYq-i7"
            />
            <div className="hidden sm:block text-left w-44">
              <p className="font-label-md text-label-md text-on-surface dark:text-white truncate" title="Nurse Nguyen">Nurse Nguyen</p>
              <p className="text-[10px] text-on-surface-variant dark:text-slate-400 uppercase tracking-widest font-semibold truncate" title={t.shiftLead}>{t.shiftLead}</p>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN CANVAS */}
      <main className="md:ml-[260px] p-8 min-h-[calc(100vh-64px)] bg-background dark:bg-slate-950 transition-colors">

        {/* Render Tab Content */}
        {activeTab === 'Dashboard' ? (
          <NurseDashboardTab
            lang={lang}
            t={t}
            isDark={isDark}
            patients={patients}
            meds={meds}
            isAlertAcknowledged={isAlertAcknowledged}
            setActiveTab={setActiveTab}
            setSelectedPatId={setSelectedPatId}
            handleAcknowledgeAlert={handleAcknowledgeAlert}
            handleStartAllRounds={handleStartAllRounds}
            handleAdministerMed={handleAdministerMed}
          />
        ) : activeTab === 'Sơ đồ phòng' ? (
          <NurseWardMapTab
            lang={lang}
            t={t}
            isDark={isDark}
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
            visiblePopover={visiblePopover}
            setVisiblePopover={setVisiblePopover}
            isWardAlertAcknowledged={isWardAlertAcknowledged}
            setIsWardAlertAcknowledged={setIsWardAlertAcknowledged}
            setActiveTab={setActiveTab}
            setSelectedPatId={setSelectedPatId}
          />
        ) : activeTab === 'Danh sách bệnh nhân' ? (
          <NursePatientsTab
            lang={lang}
            t={t}
            isDark={isDark}
            patients={patients}
            setPatients={setPatients}
            patientFilterMode={patientFilterMode}
            setPatientFilterMode={setPatientFilterMode}
            searchQuery={searchQuery}
            setActiveTab={setActiveTab}
            setSelectedPatId={setSelectedPatId}
            setSelectedNotesPatId={setSelectedNotesPatId}
          />
        ) : activeTab === 'Ghi chú lâm sàng' ? (
          <NurseClinicalNotesTab
            lang={lang}
            t={t}
            isDark={isDark}
            patients={patients}
            selectedNotesPatId={selectedNotesPatId}
            setSelectedNotesPatId={setSelectedNotesPatId}
            soapSubjective={soapSubjective}
            setSoapSubjective={setSoapSubjective}
            soapObjective={soapObjective}
            setSoapObjective={setSoapObjective}
            soapAssessment={soapAssessment}
            setSoapAssessment={setSoapAssessment}
            soapPlan={soapPlan}
            setSoapPlan={setSoapPlan}
            isSoapSaving={isSoapSaving}
            soapFinished={soapFinished}
            handleFinalizeSoapNote={handleFinalizeSoapNote}
          />
        ) : activeTab === 'Cấp phát thuốc' ? (
          <NurseMedicationTab
            lang={lang}
            t={t}
            isDark={isDark}
            meds={meds}
            handleAdministerMed={handleAdministerMed}
          />
        ) : activeTab === 'Kết quả xét nghiệm' ? (
          <NurseLabResultsTab
            lang={lang}
            t={t}
            isDark={isDark}
          />
        ) : activeTab === 'Cài đặt' ? (
          <NurseSettingsTab
            lang={lang}
            t={t}
            isDark={isDark}
            hospitalName={hospitalName}
            setHospitalName={setHospitalName}
            hospitalAddress={hospitalAddress}
            setHospitalAddress={setHospitalAddress}
            is2faEnabled={is2faEnabled}
            setIs2faEnabled={setIs2faEnabled}
            sessionTimeout={sessionTimeout}
            setSessionTimeout={setSessionTimeout}
          />
        ) : (
          <NurseVitalsTab
            lang={lang}
            t={t}
            isDark={isDark}
            patients={patients}
            vitalsPatients={vitalsPatients}
            setVitalsPatients={setVitalsPatients}
            selectedVitalsPatId={selectedVitalsPatId}
            setSelectedVitalsPatId={setSelectedVitalsPatId}
            isVitalsAlertTickerVisible={isVitalsAlertTickerVisible}
            setIsVitalsAlertTickerVisible={setIsVitalsAlertTickerVisible}
            vitalsTimeRange={vitalsTimeRange}
            setVitalsTimeRange={setVitalsTimeRange}
            vitalsAuditLog={vitalsAuditLog}
            setVitalsAuditLog={setVitalsAuditLog}
            inputSystolic={inputSystolic}
            setInputSystolic={setInputSystolic}
            inputDiastolic={inputDiastolic}
            setInputDiastolic={setInputDiastolic}
            inputBPM={inputBPM}
            setInputBPM={setInputBPM}
            inputTemp={inputTemp}
            setInputTemp={setInputTemp}
            inputSpO2={inputSpO2}
            setInputSpO2={setInputSpO2}
            selectedPatId={selectedPatId}
            setSelectedPatId={setSelectedPatId}
            handleLogVitals={handleLogVitals}
          />
        )}

      </main>

    </div>
  );
}
