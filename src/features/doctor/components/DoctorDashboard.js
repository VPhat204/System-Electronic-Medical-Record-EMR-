import React, { useState, useEffect } from 'react';
import DoctorDashboardTab from '../pages/Dashboard/DoctorDashboardTab';
import DoctorPatientsTab from '../pages/Patients/DoctorPatientsTab';
import DoctorAppointmentsTab from '../pages/Appointments/DoctorAppointmentsTab';
import DoctorLabResultsTab from '../pages/LabResults/DoctorLabResultsTab';
import DoctorPharmacyTab from '../pages/Pharmacy/DoctorPharmacyTab';
import DoctorClinicalNotesTab from '../pages/ClinicalNotes/DoctorClinicalNotesTab';
import DoctorBillingTab from '../pages/Billing/DoctorBillingTab';
import DoctorSettingsTab from '../pages/Settings/DoctorSettingsTab';

const translations = {
  vi: {
    dashboard: 'Bảng điều khiển',
    patients: 'Danh sách bệnh nhân',
    appointments: 'Quản lý lịch hẹn',
    labResults: 'Kết quả xét nghiệm',
    pharmacy: 'Kê đơn thuốc',
    clinicalNotes: 'Ghi chú lâm sàng',
    billing: 'Chi phí điều trị',
    settings: 'Cài đặt hệ thống',
    clinicalPortal: 'Cổng lâm sàng',
    newConsultation: 'Khám lâm sàng mới',
    helpCenter: 'Trợ giúp',
    signOut: 'Đăng xuất',
    searchPlaceholder: 'Tìm bệnh nhân, mã số, triệu chứng...',
    seniorCardiologist: 'Bác sĩ Tim mạch Cấp cao'
  },
  en: {
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    labResults: 'Lab Results',
    pharmacy: 'Pharmacy',
    clinicalNotes: 'Clinical Notes',
    billing: 'Billing Summary',
    settings: 'Settings',
    clinicalPortal: 'Clinical Portal',
    newConsultation: 'New Consultation',
    helpCenter: 'Help Center',
    signOut: 'Sign Out',
    searchPlaceholder: 'Search patients, IDs, or symptoms...',
    seniorCardiologist: 'Senior Cardiologist'
  }
};

const initialSchedule = [
  {
    id: 1,
    time: '09:00 AM',
    initials: 'SC',
    name: 'Sarah Connor',
    reason: 'Hypertension Follow-up',
    status: 'IN CONSULT',
    vitals: { bp: '158 / 94', spo2: '98%', temp: '98.6°F' }
  },
  {
    id: 2,
    time: '09:30 AM',
    initials: 'MB',
    name: 'Markus Bauer',
    reason: 'Post-Op Recovery',
    status: 'WAITING',
    vitals: { bp: '120 / 80', spo2: '99%', temp: '97.9°F' }
  },
  {
    id: 3,
    time: '10:00 AM',
    initials: 'JA',
    name: 'James Anderson',
    reason: 'Chest Pain Eval',
    status: 'ARRIVED',
    vitals: { bp: '142 / 90', spo2: '95%', temp: '99.1°F' }
  },
  {
    id: 4,
    time: '10:45 AM',
    initials: 'LW',
    name: 'Linda White',
    reason: 'Routine Checkup',
    status: 'PENDING',
    vitals: { bp: '118 / 75', spo2: '98%', temp: '98.4°F' }
  }
];

const initialPatients = [
  {
    id: 'MC-40192',
    name: 'Arthur Morgan',
    email: 'arthur.m@email.com',
    gender: 'Male',
    age: 68,
    lastVisit: 'Oct 24, 2023',
    status: 'Active',
    department: 'Cardiology',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7eRzPPic1Vfyw-BJJjfbQQBGXla1uYUosbYoY1MAHm7uaPNvS-a2x4Qz-3lKCjZCg2MhEz2y0RPjT9sGYGQTnwhMc1YHeSeQHnrX4ygovrvo6PxDqFwHj0EVddaUX0XQZpfPswadK7ooWpn0haskhRln0VPc28vQHH8UU3g6RgF_Fdv9r4GYPcd4r04S6idC8ZpuNYncf3DNAgMI8N8IeJuOBGMdu37IoElN1Yzu_TQMr-xDiPkoA'
  },
  {
    id: 'MC-99210',
    name: 'Elena Rodriguez',
    email: 'e.rodriguez@email.com',
    gender: 'Female',
    age: 42,
    lastVisit: 'Nov 02, 2023',
    status: 'Active',
    department: 'Neurology',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcUtvCmGMtmLXDSe3ELGr1dPrUzZboeM6ppLtOtfYC44pdcSH4GV1dWnzuP4KVRI7rUuC9x7nE6kazED19brrtg1GiUy1SbL3Wg9116V47qLWYZHGZQy5kSkGJV33gjddp7AOMvwyRccLcNK2YfTrw9SxxflN-mAWpO16_szzwdrV0Q4znDk_Ta9psss6Y9A_H1aeqDq5pyMFxses1Dg9Esb46h_y1AD8LZM4a7jBuFIOtz6VV-tc9'
  },
  {
    id: 'MC-12055',
    name: 'Jordan Smith',
    email: 'jordan.s@email.com',
    gender: 'Non-binary',
    age: 29,
    lastVisit: 'Aug 15, 2023',
    status: 'Inactive',
    department: 'Pediatrics',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO0qF7sZAPmSvu21x2jAN-YjKqVtEhbaP4kYFUusTXaEzrnkJZWDVxxiMmvq8iCTIMqNNLwVVcmDwLXVkItLnKlmq8VEwHc5DskJmX-1HqvjZczx4DQkZZDL0G_GVAvtQgmLYpE0ziRJ8iG3J1D2jO0twzidMQArR5rArc0BcYHff24kMZoGYzvk3llv3quk9nlEiVJU05WD33e8rKEgeJVFyhrZwGPMB9nWzm7qlCmRSn1TBjzCaZ'
  },
  {
    id: 'MC-88334',
    name: 'Margaret Thatcher',
    email: 'm.thatcher@provider.net',
    gender: 'Female',
    age: 75,
    lastVisit: 'Oct 12, 2023',
    status: 'Critical Alert',
    department: 'Cardiology',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaJPXW3IOAMlbwVsQbhrapa1pRxqxDoZnd7kMkKEs03knyMSMXR6jn6xT-8vLwv5YNktSno9f8jSP3tDqxFjauAukqTGWc6a51n52p6w2OVcYCX_dwUYzlDH84uk9Rqbgn8qtwRBCkW8cPaFqwAePdXCmbX1bkZDl2uTmWCXT6pEU1BtTLV9DMhYtk_HaPORQyK8DnRHGy4WBI93Z1dqACYY3Gf-ITLiiu0aMmgmR6n4XDbdRnUoVX'
  },
  {
    id: 'MC-77215',
    name: 'James Wilson',
    email: 'j.wilson@mail.co',
    gender: 'Male',
    age: 51,
    lastVisit: 'Nov 01, 2023',
    status: 'Active',
    department: 'Oncology',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCJ9O9pIe80Q2k3akgb2FdG0vSW15tYcr7iN3bRbfwES1T-NxT8zigVxtVlJIHoWifZb90oqh5u955hq3vFOft7KYo1cFNLkn5i6LgF551E3874gRH20_3C9bJdOPxcyas_G53biP4CekkOYpaAstYFjIYC9nqoR_JaL16U7ndG9_y4LCyGjlg9xXFSutAlITzQw0YO2scNcHXo8FE60H4KKInTslbndlKgaVrWASh6en1HmFQfhn6'
  }
];

const initialAgenda = [
  {
    id: 1,
    time: '09:00 AM',
    patient: 'Sarah Jenkins',
    type: 'General Checkup',
    status: 'Confirmed',
    doctor: 'Dr. Emily Stone',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz5TOxSjvGbtdZ8xlKU-e4OlDaVD75bEE7vsxj4GiO3o1XXPgcVB5TFoo7DkK1IgNYe4QR4a3fXasHL9scsSIsrOuKHHKXD5V9WXsOw1GXpfgCk0bKaFlAOq04r4vPc1iaMCkZLpGaTnEaZ3REmJ0NtL9ag7nBoaHrxGjwFgF2n1QTwqDQIMBu4Gp6U6ZgyHT1lqwipUSJ_cdJ54fK9pwTjyFlOtMEv3ZR8z9JxjJmeVizz3c6sTe6',
    day: 8,
    month: 9,
    year: 2024
  },
  {
    id: 2,
    time: '10:30 AM',
    patient: 'Jane Cooper',
    type: 'Lab Result Follow-up',
    status: 'Pending',
    doctor: 'Dr. Aaron Vane',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3rHqHBxfIOn7WUlZxtyRlQkkxzFeXptA4fmLji4FX_5xBP0kXFXXjsozcgRtBmD42KupMJMXJWhsqTvfGvMOesP8IFGWGja1UCDmQtZ9en-oDPhiklBeTyxPKaUvRHOJpgsJZmEz0gXnXZkAU3TtHztwrgWD963A0EGslHMz_yewg5aZ6nuzoUmktINgcA8peFxRIIMlCZksn8ye8MPBGdfqsEm1GeWKvqQ4F0XKtQAMb0-N24xcK',
    day: 8,
    month: 9,
    year: 2024
  },
  {
    id: 3,
    time: '12:00 PM',
    patient: 'Tom Richards',
    type: 'Initial Consultation',
    status: 'Cancelled',
    doctor: 'Dr. Professional',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdbf9AMx1vpqK9Qd6NCb_dWXtD33-TvyrULpLivgfxqXE4g-3SA8dbd4pAuPzGQebeQWDSqbUTL6wooGHkI0Ndn55TqqvzN5jKI9iBUf_k5JplZQExoyuuU4UjtlJ75YKAqyelsymaYXgB4QKsT7ZLfz5xCDfkOL92M4osR5j5Q8cF1xmOiRoDb0WpMuGcgdT4arc8wpMLynvd_3UMmyMw1An3HnMeLYngZx11LxJzLHEsFs_tNNTN',
    day: 8,
    month: 9,
    year: 2024
  },
  {
    id: 4,
    time: '02:30 PM',
    patient: 'Mark Stevenson',
    type: 'Post-Op Review',
    status: 'Confirmed',
    doctor: 'Dr. Lisa Ray',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5Nefl2Tm2QaC_Mp97nBRV-aDhkOmnO89dHAVCUn3NqH8uzbSaN3H8aXwARprQvmSv8Rm6QsCA7X54xwLhEE4Y94mrniUJTNo0BzxOlLdCMsOPZUldYZWoL1b7jV4W2QkRlWW1oMVC6mM_VKch2oO1rRK9NxvQKiCA0YzurZsv6FzpLq-fBJ_-HzM4ONjUnVCE02SWLl8zRctmfAIBk6IR6zZsIJMuQxC4mlzMmADy2UPrIjWTef7Q',
    day: 8,
    month: 9,
    year: 2024
  },
  {
    id: 5,
    time: '09:00 AM',
    patient: 'Sarah Jenkins',
    type: 'Hypertension Check',
    status: 'Confirmed',
    doctor: 'Dr. Emily Stone',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz5TOxSjvGbtdZ8xlKU-e4OlDaVD75bEE7vsxj4GiO3o1XXPgcVB5TFoo7DkK1IgNYe4QR4a3fXasHL9scsSIsrOuKHHKXD5V9WXsOw1GXpfgCk0bKaFlAOq04r4vPc1iaMCkZLpGaTnEaZ3REmJ0NtL9ag7nBoaHrxGjwFgF2n1QTwqDQIMBu4Gp6U6ZgyHT1lqwipUSJ_cdJ54fK9pwTjyFlOtMEv3ZR8z9JxjJmeVizz3c6sTe6',
    day: 2,
    month: 9,
    year: 2024
  },
  {
    id: 6,
    time: '02:30 PM',
    patient: 'Mark Stevenson',
    type: 'Post-Op Review',
    status: 'Confirmed',
    doctor: 'Dr. Lisa Ray',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5Nefl2Tm2QaC_Mp97nBRV-aDhkOmnO89dHAVCUn3NqH8uzbSaN3H8aXwARprQvmSv8Rm6QsCA7X54xwLhEE4Y94mrniUJTNo0BzxOlLdCMsOPZUldYZWoL1b7jV4W2QkRlWW1oMVC6mM_VKch2oO1rRK9NxvQKiCA0YzurZsv6FzpLq-fBJ_-HzM4ONjUnVCE02SWLl8zRctmfAIBk6IR6zZsIJMuQxC4mlzMmADy2UPrIjWTef7Q',
    day: 2,
    month: 9,
    year: 2024
  }
];

const initialLabTests = [
  {
    id: '#PAT-88210',
    type: 'Comprehensive Metabolic Panel',
    specimen: 'Venous Blood',
    doctor: 'Dr. Sarah Jenkins',
    status: 'CRITICAL'
  },
  {
    id: '#PAT-90122',
    type: 'Brain MRI (Contrast)',
    specimen: 'Imaging Scan',
    doctor: 'Dr. Michael Chen',
    status: 'COMPLETED'
  },
  {
    id: '#PAT-44319',
    type: 'CBC with Differential',
    specimen: 'Venous Blood',
    doctor: 'Dr. Robert Vance',
    status: 'IN-PROGRESS'
  },
  {
    id: '#PAT-77201',
    type: 'Lipid Profile',
    specimen: 'Venous Blood',
    doctor: 'Dr. Sarah Jenkins',
    status: 'COMPLETED'
  },
  {
    id: '#PAT-11023',
    type: 'Urinalysis (Microscopic)',
    specimen: 'Urine Specimen',
    doctor: 'Dr. Emily Stone',
    status: 'ABNORMAL'
  },
  {
    id: '#PAT-88543',
    type: 'Glucose Tolerance',
    specimen: 'Venous Blood',
    doctor: 'Dr. Michael Chen',
    status: 'PENDING SPECIMEN'
  }
];

const initialPrescriptions = [
  {
    id: 'PRSC-00401',
    patient: 'Arthur Morgan',
    date: 'Oct 24, 2026',
    diagnosis: 'Mild Hypertension',
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days', notes: 'Take in morning' }
    ],
    status: 'Dispatched'
  },
  {
    id: 'PRSC-00402',
    patient: 'Margaret Thatcher',
    date: 'Oct 23, 2026',
    diagnosis: 'Angina Prevention & Cardiac Care',
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days', notes: 'Take with food' },
      { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', duration: '90 days', notes: 'Do not crush' }
    ],
    status: 'Preparing'
  }
];

const initialStaff = [
  { id: 1, name: 'David Richardson', email: 'd.richardson@hospital.com', role: 'Oncology Specialist', status: 'Active', lastLogin: '10m ago', initials: 'DR' },
  { id: 2, name: 'Maria Sanchez', email: 'm.sanchez@hospital.com', role: 'Nurse Practitioner', status: 'Active', lastLogin: '1h 05m ago', initials: 'MS' },
  { id: 3, name: 'George Klein', email: 'g.klein@hospital.com', role: 'Pharmacy Manager', status: 'Suspended', lastLogin: '14 days ago', initials: 'GK' }
];

export default function DoctorDashboard({ onNavigate, theme: propTheme, setTheme: propSetTheme, lang: propLang, setLang: propSetLang }) {
  const [localTheme, setLocalTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const currentTheme = propTheme !== undefined ? propTheme : localTheme;
  const settingsDark = currentTheme === 'dark';
  const [schedule, setSchedule] = useState(initialSchedule);
  const [activePatientId, setActivePatientId] = useState(1); // Default is Sarah Connor
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [commsOpen, setCommsOpen] = useState(false);
  const [localLang, setLocalLang] = useState('vi');
  const lang = propLang !== undefined ? propLang : localLang;
  const setLang = propSetLang !== undefined ? propSetLang : setLocalLang;

  const t = translations[lang];

  // Patients states
  const [patients, setPatients] = useState(initialPatients);
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [genderFilter, setGenderFilter] = useState('Gender');
  const [statusFilter, setStatusFilter] = useState('Status');

  // Appointments states
  const [agenda, setAgenda] = useState(initialAgenda);
  const [selectedDay, setSelectedDay] = useState(8); // Default Oct 8 (Today)
  const [calMonth, setCalMonth] = useState(9); // October (0-indexed: 9)
  const [calYear, setCalYear] = useState(2024); // 2024
  const [calendarMode, setCalendarMode] = useState('Monthly'); // 'Monthly' or 'Weekly'

  // Lab Results states
  const [labTests, setLabTests] = useState(initialLabTests);
  const [labFilter, setLabFilter] = useState('All'); // 'All', 'Pending', 'Completed'

  // Pharmacy states
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [currentMedList, setCurrentMedList] = useState([]);
  const [prescPatientId, setPrescPatientId] = useState(initialPatients[0].id);
  const [prescDiagnosis, setPrescDiagnosis] = useState('');
  const [draftMedName, setDraftMedName] = useState('');
  const [draftMedDosage, setDraftMedDosage] = useState('');
  const [draftMedFreq, setDraftMedFreq] = useState('Once daily');
  const [draftMedDuration, setDraftMedDuration] = useState('7 days');
  const [draftMedNotes, setDraftMedNotes] = useState('');

  // Settings states
  const [settingsTab, setSettingsTab] = useState('profile'); // 'profile', 'security', 'notifications', 'hospital', 'management'
  // settingsDark is derived from props/localStorage
  const [settingsContrast, setSettingsContrast] = useState(true);
  const [settingsLock, setSettingsLock] = useState(true);
  const [settingsCompact, setSettingsCompact] = useState(false);
  const [staffList, setStaffList] = useState(initialStaff);
  const [staffRoleFilter, setStaffRoleFilter] = useState('All'); // 'All', 'Doctors', 'Nursing', 'Admin'

  const activePatient = schedule.find(p => p.id === activePatientId) || schedule[0];

  // Sync state with document dark class on mount and change (only if propTheme is not provided)
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
    const nextTheme = settingsDark ? 'light' : 'dark';
    if (propSetTheme) {
      propSetTheme(nextTheme);
    } else {
      setLocalTheme(nextTheme);
    }
  };

  const handleStartConsult = (id) => {
    setSchedule(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: 'IN CONSULT' };
      }
      if (p.status === 'IN CONSULT') {
        return { ...p, status: 'ARRIVED' }; // revert other consulting
      }
      return p;
    }));
    setActivePatientId(id);
  };

  const handleNewConsultation = () => {
    alert('Bắt đầu một hồ sơ khám bệnh lâm sàng mới. (Clinical consultation initialized)');
  };

  const handleNewPatient = () => {
    const name = prompt('Nhập tên bệnh nhân mới:');
    if (!name) return;
    const email = prompt('Nhập email:');
    const gender = prompt('Nhập giới tính (Male/Female/Non-binary):') || 'Male';
    const age = parseInt(prompt('Nhập tuổi:')) || 30;
    const dept = prompt('Nhập khoa chuyên môn (Cardiology/Neurology/Pediatrics/Oncology):') || 'Cardiology';

    const newPat = {
      id: `MC-${Math.floor(10000 + Math.random() * 90000)}`,
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@email.com`,
      gender,
      age,
      lastVisit: 'Oct 24, 2026',
      status: 'Active',
      department: dept,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO0qF7sZAPmSvu21x2jAN-YjKqVtEhbaP4kYFUusTXaEzrnkJZWDVxxiMmvq8iCTIMqNNLwVVcmDwLXVkItLnKlmq8VEwHc5DskJmX-1HqvjZczx4DQkZZDL0G_GVAvtQgmLYpE0ziRJ8iG3J1D2jO0twzidMQArR5rArc0BcYHff24kMZoGYzvk3llv3quk9nlEiVJU05WD33e8rKEgeJVFyhrZwGPMB9nWzm7qlCmRSn1TBjzCaZ'
    };

    setPatients([newPat, ...patients]);
  };

  const handleBookAppointment = () => {
    const name = prompt(lang === 'vi' ? 'Nhập tên bệnh nhân đăng ký lịch hẹn:' : 'Enter patient name for appointment:');
    if (!name) return;
    const type = prompt(lang === 'vi' ? 'Lý do khám (General Checkup, Post-Op Review...):' : 'Reason for consultation:') || 'General Checkup';
    const time = prompt(lang === 'vi' ? 'Thời gian (e.g. 11:00 AM):' : 'Time (e.g. 11:00 AM):') || '11:00 AM';

    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const dayInput = parseInt(prompt(lang === 'vi' ? `Ngày hẹn trong tháng (1-${daysInMonth}):` : `Enter day of month (1-${daysInMonth}):`, selectedDay)) || selectedDay;

    const newAppointment = {
      id: agenda.length + 1,
      time,
      patient: name,
      type,
      status: 'Confirmed',
      doctor: 'Dr. Julian Reed',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMX1aPedjPxdUlJNhnBhNhn4htrwliBQj0yOMVjD-H2TJsnk45dFsHlSYXUcLiGyizabvLLxhrkm5urISYrsqIslmtlT3gJxhZUMsT3OoHuqom1n9DlKYT9wMDkRuMRMOEZjzAeJPmNm5o6xjfndE6TLd7-sU-3pKzIlR4eSPmSjTz_icKSTeDsiAVNQmsZuS73AhCyyHOlT5GMBzQsNGiAuT5MB2BKgM1vmkKgyQmCZkvgEggGa9A',
      day: dayInput,
      month: calMonth,
      year: calYear
    };

    setAgenda([...agenda, newAppointment]);
    setSelectedDay(dayInput);
  };

  const handleAddMedication = () => {
    if (!draftMedName.trim()) {
      alert('Vui lòng nhập tên thuốc! (Please enter medication name)');
      return;
    }
    const newMed = {
      name: draftMedName,
      dosage: draftMedDosage || 'N/A',
      frequency: draftMedFreq,
      duration: draftMedDuration,
      notes: draftMedNotes || 'No special notes'
    };
    setCurrentMedList([...currentMedList, newMed]);
    setDraftMedName('');
    setDraftMedDosage('');
    setDraftMedNotes('');
  };

  const handleRemoveMedication = (idx) => {
    setCurrentMedList(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSendPrescription = () => {
    if (currentMedList.length === 0) {
      alert('Vui lòng thêm ít nhất một loại thuốc vào đơn thuốc! (Please add at least one medication)');
      return;
    }
    const patName = patients.find(p => p.id === prescPatientId)?.name || 'Unknown Patient';
    const newPresc = {
      id: `PRSC-${Math.floor(10000 + Math.random() * 90000)}`,
      patient: patName,
      date: 'Oct 24, 2026',
      diagnosis: prescDiagnosis || 'Routine Follow-up',
      medications: currentMedList,
      status: 'Pending Pharmacist Review'
    };

    setPrescriptions([newPresc, ...prescriptions]);
    setCurrentMedList([]);
    setPrescDiagnosis('');
    alert(`Đơn thuốc kê cho bệnh nhân ${patName} đã được ký số và chuyển trực tiếp tới hệ thống Nhà thuốc!`);
  };

  // Filter schedule based on search query
  const filteredSchedule = schedule.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter patients based on query and dropdown filters
  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = deptFilter === 'All Departments' || p.department === deptFilter;
    const matchesGender = genderFilter === 'Gender' || p.gender === genderFilter;
    const matchesStatus = statusFilter === 'Status' || p.status === statusFilter;

    return matchesSearch && matchesDept && matchesGender && matchesStatus;
  });

  // Filter agenda based on selected calendar day, month, year and topbar search
  const filteredAgenda = agenda.filter(item => {
    const matchesDay = item.day === selectedDay &&
      (item.month === undefined || item.month === calMonth) &&
      (item.year === undefined || item.year === calYear);
    const matchesSearch = searchQuery === '' ||
      item.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDay && matchesSearch;
  });

  // Filter Lab Results based on search query and sub-tabs
  const filteredLabTests = labTests.filter(test => {
    const matchesSearch = searchQuery === '' ||
      test.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.doctor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = labFilter === 'All' ||
      (labFilter === 'Pending' && (test.status === 'IN-PROGRESS' || test.status === 'PENDING SPECIMEN')) ||
      (labFilter === 'Completed' && (test.status === 'COMPLETED' || test.status === 'CRITICAL' || test.status === 'ABNORMAL'));

    return matchesSearch && matchesStatus;
  });

  // Filter Pharmacy Prescriptions based on search query
  const filteredPrescriptions = prescriptions.filter(p => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      p.patient.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query) ||
      p.diagnosis.toLowerCase().includes(query) ||
      p.medications.some(m => m.name.toLowerCase().includes(query));
    return matchesSearch;
  });

  // Filter Staff list based on search and settings staff filters
  const filteredStaff = staffList.filter(s => {
    const matchesRole = staffRoleFilter === 'All' ||
      (staffRoleFilter === 'Doctors' && s.role.toLowerCase().includes('specialist')) ||
      (staffRoleFilter === 'Nursing' && s.role.toLowerCase().includes('nurse')) ||
      (staffRoleFilter === 'Admin' && s.role.toLowerCase().includes('manager'));

    const matchesSearch = searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRole && matchesSearch;
  });
  // Appointments calculations:
  // Get number of days in current calMonth/calYear
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  // Get starting weekday (0-6) of current calMonth/calYear
  const startDayOfWeek = new Date(calYear, calMonth, 1).getDay();

  // Statistics calculated dynamically from agenda for current month/year
  const monthlyAppointments = agenda.filter(ev =>
    (ev.month === undefined || ev.month === calMonth) &&
    (ev.year === undefined || ev.year === calYear)
  );

  const totalPatientsCount = monthlyAppointments.filter(ev => ev.status !== 'Cancelled').length;
  const confirmedCount = monthlyAppointments.filter(ev => ev.status === 'Confirmed').length;
  const pendingCount = monthlyAppointments.filter(ev => ev.status === 'Pending').length;
  const cancelledCount = monthlyAppointments.filter(ev => ev.status === 'Cancelled').length;

  return (
    <div className="bg-background dark:bg-slate-900 text-on-surface dark:text-slate-100 min-h-screen transition-colors duration-200">

      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* SIDE NAV BAR */}
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
          <button onClick={() => setIsSidebarOpen(false)} className="p-1 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-grow space-y-1 py-4 text-left">
          {[
            { label: 'Dashboard', key: 'dashboard', icon: 'dashboard' },
            { label: 'Patients', key: 'patients', icon: 'group' },
            { label: 'Appointments', key: 'appointments', icon: 'calendar_today' },
            { label: 'Lab Results', key: 'labResults', icon: 'biotech' },
            { label: 'Pharmacy', key: 'pharmacy', icon: 'medical_services' },
            { label: 'Clinical Notes', key: 'clinicalNotes', icon: 'edit_note' },
            { label: 'Billing', key: 'billing', icon: 'receipt_long' },
            { label: 'Settings', key: 'settings', icon: 'settings' }
          ].map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => { setActiveTab(item.label); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${isActive
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
            onClick={handleNewConsultation}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all active:scale-[0.98] mb-4 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            {t.newConsultation}
          </button>
          <div className="border-t border-outline-variant dark:border-slate-800 pt-4 space-y-1 text-left">
            <button
              onClick={() => alert('Trợ giúp hệ thống EMR')}
              className="w-full flex items-center gap-3 px-2 py-2 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              <span className="material-symbols-outlined">help</span>
              <span className="font-label-md text-label-md">{t.helpCenter}</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full flex items-center gap-3 px-2 py-2 text-error hover:bg-error-container/20 rounded-md transition-colors"
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
            className="p-2 md:hidden text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
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
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors"
            title={settingsDark ? 'Giao diện sáng (Light Mode)' : 'Giao diện tối (Dark Mode)'}
          >
            <span className="material-symbols-outlined">
              {settingsDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high dark:hover:bg-slate-800 text-label-md font-bold text-primary dark:text-primary-fixed-dim transition-colors"
            title="Chuyển đổi ngôn ngữ / Switch Language"
          >
            {lang.toUpperCase()}
          </button>

          <button
            onClick={() => alert('Thông báo lâm sàng mới')}
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 relative transition-colors"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button
            onClick={() => alert('Liên hệ cấp cứu nội viện STAT')}
            className="w-10 h-10 flex items-center justify-center rounded-full text-error hover:bg-error-container/20 transition-colors"
          >
            <span className="material-symbols-outlined text-red-500">emergency</span>
          </button>
          <div className="flex items-center gap-3 pl-3 border-l border-outline-variant dark:border-slate-800">
            <img
              className="w-10 h-10 rounded-full object-cover border border-primary-fixed dark:border-slate-700"
              alt="Doctor profile portrait"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgDdkNPSPv2lbk-3io6wmPK00Xyx2_g2Ty273agQuBiThZ2vKscJ2S87oDY87aYlPiee1VNVtH8gmtafIGJtyPYDTA-eDCl9f_-mziOpUJ8OAihbnpOueSr-h8HCm1hdQI85szzkllnuoBLKTKt7h5cZ-_Hd05THVIk9R_XZdLVIdE47Ywuiby3srajUGQFNlAWoAqpWEUTlQF0wfptp26HR2VMhmxCuMuRo3LB3UgP9gRHT-99Y3k"
            />

            {/* Set fixed width (w-44 / 11rem) to prevent right-to-left layout shifting during language swap */}
            <div className="hidden sm:block text-left w-44">
              <p className="font-label-md text-label-md text-on-surface dark:text-white truncate" title="Dr. Julian Reed">Dr. Julian Reed</p>
              <p className="text-[10px] text-on-surface-variant dark:text-slate-400 uppercase tracking-widest font-semibold truncate" title={t.seniorCardiologist}>{t.seniorCardiologist}</p>
            </div>

          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="md:ml-[260px] p-6 min-h-screen">
        <div className="max-w-[1600px] mx-auto space-y-6">

          {/* Dashboard Tab Content */}
          {activeTab === 'Dashboard' && (
            <DoctorDashboardTab
              lang={lang}
              t={t}
              handleNewConsultation={handleNewConsultation}
              setActiveTab={setActiveTab}
              filteredSchedule={filteredSchedule}
              activePatientId={activePatientId}
              setActivePatientId={setActivePatientId}
              handleStartConsult={handleStartConsult}
              activePatient={activePatient}
            />
          )}

          {activeTab === 'Patients' && (
            <DoctorPatientsTab
              lang={lang}
              t={t}
              filteredPatients={filteredPatients}
              handleNewPatient={handleNewPatient}
              deptFilter={deptFilter}
              setDeptFilter={setDeptFilter}
              genderFilter={genderFilter}
              setGenderFilter={setGenderFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              setSearchQuery={setSearchQuery}
              patients={patients}
            />
          )}

          {activeTab === 'Appointments' && (
            <DoctorAppointmentsTab
              lang={lang}
              t={t}
              calendarMode={calendarMode}
              setCalendarMode={setCalendarMode}
              handleBookAppointment={handleBookAppointment}
              totalPatientsCount={totalPatientsCount}
              confirmedCount={confirmedCount}
              pendingCount={pendingCount}
              cancelledCount={cancelledCount}
              calMonth={calMonth}
              setCalMonth={setCalMonth}
              calYear={calYear}
              setCalYear={setCalYear}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              agenda={agenda}
              setAgenda={setAgenda}
              daysInMonth={daysInMonth}
              startDayOfWeek={startDayOfWeek}
              filteredAgenda={filteredAgenda}
            />
          )}

          {activeTab === 'Lab Results' && (
            <DoctorLabResultsTab
              lang={lang}
              t={t}
              labFilter={labFilter}
              setLabFilter={setLabFilter}
              filteredLabTests={filteredLabTests}
              labTests={labTests}
            />
          )}

          {activeTab === 'Pharmacy' && (
            <DoctorPharmacyTab
              lang={lang}
              t={t}
              handleSendPrescription={handleSendPrescription}
              prescPatientId={prescPatientId}
              setPrescPatientId={setPrescPatientId}
              patients={patients}
              prescDiagnosis={prescDiagnosis}
              setPrescDiagnosis={setPrescDiagnosis}
              draftMedName={draftMedName}
              setDraftMedName={setDraftMedName}
              draftMedDosage={draftMedDosage}
              setDraftMedDosage={setDraftMedDosage}
              draftMedFreq={draftMedFreq}
              setDraftMedFreq={setDraftMedFreq}
              draftMedDuration={draftMedDuration}
              setDraftMedDuration={setDraftMedDuration}
              draftMedNotes={draftMedNotes}
              setDraftMedNotes={setDraftMedNotes}
              handleAddMedication={handleAddMedication}
              currentMedList={currentMedList}
              handleRemoveMedication={handleRemoveMedication}
              setCurrentMedList={setCurrentMedList}
              filteredPrescriptions={filteredPrescriptions}
            />
          )}

          {activeTab === 'Clinical Notes' && (
            <DoctorClinicalNotesTab
              lang={lang}
              t={t}
              patients={patients}
            />
          )}

          {activeTab === 'Billing' && (
            <DoctorBillingTab
              lang={lang}
              t={t}
              patients={patients}
            />
          )}

          {activeTab === 'Settings' && (
            <DoctorSettingsTab
              lang={lang}
              t={t}
              settingsTab={settingsTab}
              setSettingsTab={setSettingsTab}
              settingsContrast={settingsContrast}
              setSettingsContrast={setSettingsContrast}
              settingsLock={settingsLock}
              setSettingsLock={setSettingsLock}
              settingsCompact={settingsCompact}
              setSettingsCompact={setSettingsCompact}
              staffList={staffList}
              setStaffList={setStaffList}
              staffRoleFilter={staffRoleFilter}
              setStaffRoleFilter={setStaffRoleFilter}
              filteredStaff={filteredStaff}
              settingsDark={settingsDark}
              handleToggleDark={handleToggleDark}
            />
          )}

          {/* Simple Placeholders for other tabs */}
          {activeTab !== 'Dashboard' && activeTab !== 'Patients' && activeTab !== 'Appointments' && activeTab !== 'Lab Results' && activeTab !== 'Pharmacy' && activeTab !== 'Clinical Notes' && activeTab !== 'Billing' && activeTab !== 'Settings' && (
            <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-xl shadow-sm text-center min-h-[400px] flex flex-col items-center justify-center space-y-md">
              <span className="material-symbols-outlined text-[64px] text-primary dark:text-primary-fixed-dim animate-pulse">
                construction
              </span>
              <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white">
                {activeTab} Portal
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 max-w-md">
                Phân hệ này đang được cấu hình đồng bộ trực tuyến với hệ thống MedCore EMR nội viện.
              </p>
            </div>
          )}

        </div>
      </main>

      {/* Nurse Communications Modal */}
      {commsOpen && (
        <div className="fixed bottom-24 right-8 w-80 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex justify-between items-center border-b border-outline-variant dark:border-slate-700 pb-2 mb-3">
            <h5 className="font-headline-md text-[16px] text-on-surface dark:text-white flex items-center gap-sm">
              <span className="material-symbols-outlined text-[20px] text-primary">chat</span>
              Nurse Comms
            </h5>
            <button onClick={() => setCommsOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
          <div className="space-y-sm max-h-60 overflow-y-auto pr-1">
            <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded text-left">
              <p className="text-[11px] font-bold text-primary">Nurse Linda</p>
              <p className="text-body-sm text-on-surface dark:text-slate-300">Robert Chen BP has climbed slightly to 160/95. Double checking if STAT med is required.</p>
              <span className="text-[9px] text-outline">10:48 AM</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/20 p-2 rounded text-left">
              <p className="text-[11px] font-bold text-primary">Nurse Dan</p>
              <p className="text-body-sm text-on-surface dark:text-slate-300">James Anderson (Chest Pain Eval) has arrived at examination room B.</p>
              <span className="text-[9px] text-outline">10:52 AM</span>
            </div>
          </div>
          <div className="mt-3 flex gap-xs">
            <input
              type="text"
              placeholder="Reply to nurses..."
              className="w-full text-body-sm p-1.5 border border-outline-variant dark:border-slate-700 bg-background dark:bg-slate-900 rounded outline-none"
            />
            <button onClick={() => { alert('Message sent!'); setCommsOpen(false); }} className="bg-primary text-white p-1.5 rounded hover:bg-primary-container">
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </div>
        </div>
      )}

      {/* FLOATING ACTION BUTTON */}
      <button
        onClick={() => setCommsOpen(!commsOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary hover:bg-primary-container text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-[0.95] transition-all z-50 group"
      >
        <span className="material-symbols-outlined text-[28px]">chat_bubble</span>
        <span className="absolute right-full mr-4 bg-on-surface dark:bg-slate-800 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Nurse Comms (2)
        </span>
      </button>

    </div>
  );
}
