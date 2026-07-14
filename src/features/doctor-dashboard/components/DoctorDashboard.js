import React, { useState, useEffect } from 'react';

const translations = {
  vi: {
    dashboard: 'Bảng điều khiển',
    patients: 'Danh sách bệnh nhân',
    appointments: 'Quản lý lịch hẹn',
    labResults: 'Kết quả xét nghiệm',
    pharmacy: 'Kê đơn thuốc',
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

export default function DoctorDashboard({ onNavigate, theme: propTheme, setTheme: propSetTheme }) {
  const [localTheme, setLocalTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const currentTheme = propTheme !== undefined ? propTheme : localTheme;
  const settingsDark = currentTheme === 'dark';
  const [schedule, setSchedule] = useState(initialSchedule);
  const [activePatientId, setActivePatientId] = useState(1); // Default is Sarah Connor
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [commsOpen, setCommsOpen] = useState(false);
  const [lang, setLang] = useState('vi'); // 'vi' (Vietnamese) or 'en' (English)

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
        <div className="max-w-[1400px] mx-auto space-y-6">

          {/* Dashboard Tab Content */}
          {activeTab === 'Dashboard' && (
            <>
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md">
                <div className="text-left">
                  <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white">
                    {lang === 'vi' ? 'Bảng điều khiển Bác sĩ' : 'Doctor Dashboard'}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">
                    {lang === 'vi' ? 'Thứ Hai, Ngày 24 Tháng 10 • Lịch trình Lâm sàng' : 'Monday, Oct 24 • Clinical Schedule'}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => alert('Danh sách bệnh nhân vừa kiểm tra')}
                    className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface dark:text-slate-200 hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">history</span>
                    {lang === 'vi' ? 'Bệnh nhân Gần đây' : 'Recent Patients'}
                  </button>
                  <button
                    onClick={handleNewConsultation}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg font-label-md text-label-md hover:shadow-lg transition-all active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                    {lang === 'vi' ? 'Bắt đầu Khám' : 'Start Consultation'}
                  </button>
                </div>
              </div>

              {/* Bento Grid Wrapper */}
              <div className="grid grid-cols-12 gap-gutter">

                {/* Left Column: Stats & Schedule Table */}
                <div className="col-span-12 lg:col-span-8 space-y-gutter">

                  {/* Summary Stats Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
                    <div
                      onClick={() => setActiveTab('Appointments')}
                      className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary-fixed-dim transition-colors cursor-pointer group text-left"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary-fixed rounded-lg text-primary">
                          <span className="material-symbols-outlined">event_note</span>
                        </div>
                        <span className="text-secondary dark:text-teal-400 font-label-md text-[11px]">+2 vs yesterday</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">{lang === 'vi' ? 'Lịch hẹn hôm nay' : 'Appointments Today'}</p>
                      <h3 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mt-1">12</h3>
                      <div className="mt-4 w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div className="bg-primary dark:bg-primary-fixed-dim h-full w-[65%]"></div>
                      </div>
                    </div>

                    <div
                      onClick={() => alert('Danh sách bệnh nhân đang đợi')}
                      className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary-fixed-dim transition-colors cursor-pointer group text-left"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-secondary-fixed rounded-lg text-on-secondary-container">
                          <span className="material-symbols-outlined">hourglass_empty</span>
                        </div>
                        <span className="text-error font-label-md text-[11px]">Avg. 14min wait</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">{lang === 'vi' ? 'Bệnh nhân đang chờ' : 'Patients Waiting'}</p>
                      <h3 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mt-1">4</h3>
                      <div className="mt-4 w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div className="bg-secondary h-full w-[30%]"></div>
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveTab('Lab Results')}
                      className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-5 rounded-xl shadow-sm hover:border-error transition-colors cursor-pointer group text-left"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-error-container rounded-lg text-error">
                          <span className="material-symbols-outlined">warning</span>
                        </div>
                        <span className="text-error font-label-md text-[11px] animate-pulse">Critical Action</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">{lang === 'vi' ? 'Xét nghiệm khẩn' : 'Urgent Labs'}</p>
                      <h3 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mt-1">3</h3>
                      <div className="mt-4 w-full bg-surface-container-high dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div className="bg-error h-full w-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Table */}
                  <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">{lang === 'vi' ? 'Lịch trình khám hôm nay' : "Today's Schedule"}</h4>
                        <div className="flex bg-surface-container-low dark:bg-slate-700 rounded-lg p-0.5 border border-outline-variant dark:border-slate-600">
                          <button className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md shadow-sm font-label-md text-label-md text-primary dark:text-white">List</button>
                          <button onClick={() => alert('Mở lịch làm việc tổng quan')} className="px-3 py-1 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 hover:text-on-surface">Calendar</button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => alert('Lọc lịch khám')} className="p-2 hover:bg-surface-container-high dark:hover:bg-slate-700 rounded-lg text-on-surface-variant dark:text-slate-400">
                          <span className="material-symbols-outlined text-[20px]">filter_list</span>
                        </button>
                        <button onClick={() => window.print()} className="p-2 hover:bg-surface-container-high dark:hover:bg-slate-700 rounded-lg text-on-surface-variant dark:text-slate-400">
                          <span className="material-symbols-outlined text-[20px]">print</span>
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="bg-surface-container-low dark:bg-slate-900/20 border-b border-outline-variant dark:border-slate-700">
                            <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{lang === 'vi' ? 'Giờ khám' : 'Time'}</th>
                            <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{lang === 'vi' ? 'Họ và tên bệnh nhân' : 'Patient Name'}</th>
                            <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{lang === 'vi' ? 'Lý do khám' : 'Reason'}</th>
                            <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{lang === 'vi' ? 'Trạng thái' : 'Status'}</th>
                            <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant dark:divide-slate-700">
                          {filteredSchedule.map((p) => {
                            const isConsulting = p.status === 'IN CONSULT';
                            const isArrived = p.status === 'ARRIVED';
                            const isWaiting = p.status === 'WAITING';
                            return (
                              <tr
                                key={p.id}
                                onClick={() => setActivePatientId(p.id)}
                                className={`clinical-table-row group hover:bg-primary-fixed/5 dark:hover:bg-slate-700/50 transition-colors cursor-pointer ${activePatientId === p.id ? 'bg-primary-fixed/10 dark:bg-slate-700/30' : ''
                                  }`}
                              >
                                <td className={`px-4 py-4 font-data-mono text-data-mono font-bold ${isConsulting ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}>
                                  {p.time}
                                </td>
                                <td className="px-4 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[13px] ${isWaiting
                                      ? 'bg-secondary-fixed-dim text-on-secondary-fixed'
                                      : 'bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-white'
                                      }`}>
                                      {p.initials}
                                    </div>
                                    <span className="font-body-md text-body-md text-on-surface dark:text-white font-semibold">{p.name}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-4 font-body-sm text-body-sm text-on-surface-variant dark:text-slate-350">
                                  {p.reason}
                                </td>
                                <td className="px-4 py-4">
                                  {isConsulting ? (
                                    <span className="bg-primary-fixed text-primary dark:text-teal-900 px-3 py-1 rounded-full font-label-md text-[11px] flex items-center gap-1 w-fit">
                                      <span className="w-1.5 h-1.5 bg-primary dark:bg-teal-500 rounded-full animate-pulse"></span>
                                      IN CONSULT
                                    </span>
                                  ) : isWaiting ? (
                                    <span className="bg-secondary-container text-on-secondary-container dark:text-teal-900 px-3 py-1 rounded-full font-label-md text-[11px] w-fit block">
                                      WAITING (5m)
                                    </span>
                                  ) : isArrived ? (
                                    <span className="bg-secondary-container text-on-secondary-container dark:text-teal-900 px-3 py-1 rounded-full font-label-md text-[11px] w-fit block">
                                      ARRIVED
                                    </span>
                                  ) : (
                                    <span className="bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-400 px-3 py-1 rounded-full font-label-md text-[11px] w-fit block">
                                      PENDING
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-4 text-right">
                                  {isConsulting ? (
                                    <button onClick={(e) => { e.stopPropagation(); alert(`Báo cáo bệnh án cho ${p.name}`); }} className="text-primary dark:text-primary-fixed-dim hover:underline font-label-md text-label-md">Open Chart</button>
                                  ) : (
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleStartConsult(p.id); }}
                                      className="bg-primary hover:bg-primary-container text-white px-3 py-1.5 rounded-lg font-label-md text-[12px] opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      Start Now
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-3 bg-surface-container-lowest dark:bg-slate-800 border-t border-outline-variant dark:border-slate-700 flex justify-center">
                      <button onClick={() => alert('Xem toàn bộ lịch trình')} className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:underline">
                        View Full Day Schedule
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Urgent Alerts & Active Case Details */}
                <div className="col-span-12 lg:col-span-4 space-y-gutter">
                  <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-sm text-left">
                    <div className="p-4 border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface dark:bg-slate-900/50">
                      <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">{lang === 'vi' ? 'Cảnh báo khẩn cấp' : 'Urgent Alerts'}</h4>
                      <span className="bg-error text-white text-[10px] px-2 py-0.5 rounded-full font-bold">3 NEW</span>
                    </div>
                    <div className="flex-grow overflow-y-auto max-h-[290px] custom-scrollbar">
                      <div onClick={() => alert('Xét nghiệm máu Robert Chen critical')} className="p-4 border-b border-outline-variant dark:border-slate-700 hover:bg-error-container/5 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-error-container rounded-full flex items-center justify-center text-error">
                            <span className="material-symbols-outlined text-[20px]">biotech</span>
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-on-surface dark:text-white">Lab: Potassium Critical</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-0.5">Patient: Robert Chen (MRN-9210)</p>
                            <p className="text-error font-data-mono text-[13px] mt-2 font-bold">Value: 6.2 mmol/L</p>
                            <p className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400 mt-1">Received: 14 mins ago</p>
                          </div>
                        </div>
                      </div>

                      <div onClick={() => alert('Kết quả điện tim abnormal rhythm')} className="p-4 border-b border-outline-variant dark:border-slate-700 hover:bg-error-container/5 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-error-container rounded-full flex items-center justify-center text-error">
                            <span className="material-symbols-outlined text-[20px]">ecg</span>
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-on-surface dark:text-white">STAT ECG: Abnormal Rhythm</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-0.5">Patient: Elena Rodriguez (MRN-4421)</p>
                            <p className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400 mt-2">Received: 32 mins ago</p>
                          </div>
                        </div>
                      </div>

                      <div onClick={() => alert('Xác minh liều thuốc Warfarin')} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-surface-container-high dark:bg-slate-700 rounded-full flex items-center justify-center text-on-surface-variant dark:text-slate-350">
                            <span className="material-symbols-outlined text-[20px]">medication</span>
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-on-surface dark:text-white">Pharmacy Callback Required</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-0.5">Warfarin dose verification needed</p>
                            <p className="font-body-sm text-[11px] text-on-surface-variant dark:text-slate-400 mt-2">Received: 1 hour ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => alert('Mở tất cả cảnh báo')} className="p-4 text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:bg-primary-fixed/20 transition-colors border-t border-outline-variant dark:border-slate-700 text-center">
                      {lang === 'vi' ? 'Xem toàn bộ cảnh báo' : 'View All Critical Notifications'}
                    </button>
                  </div>

                  <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-5 shadow-sm text-left">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase">
                        Vitals: {activePatient.name}
                      </h5>
                      <button onClick={() => alert(`Chi tiết sinh hiệu ${activePatient.name}`)} className="text-primary dark:text-primary-fixed-dim">
                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-error-container/10 border border-error-container/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
                            favorite
                          </span>
                          <span className="font-body-md text-body-md text-on-surface dark:text-slate-300">BP</span>
                        </div>
                        <span className="font-data-mono text-data-mono font-bold text-error">
                          {activePatient.vitals.bp}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-surface-container-low dark:bg-slate-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">air</span>
                          <span className="font-body-md text-body-md text-on-surface dark:text-slate-300">SpO2</span>
                        </div>
                        <span className="font-data-mono text-data-mono font-bold text-on-surface dark:text-white">
                          {activePatient.vitals.spo2}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-surface-container-low dark:bg-slate-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-tertiary dark:text-amber-500">device_thermostat</span>
                          <span className="font-body-md text-body-md text-on-surface dark:text-slate-300">Temp</span>
                        </div>
                        <span className="font-data-mono text-data-mono font-bold text-on-surface dark:text-white">
                          {activePatient.vitals.temp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-48 rounded-xl overflow-hidden border border-outline-variant dark:border-slate-800 group">
                    <div
                      className="absolute inset-0 bg-cover bg-center filter brightness-[0.4]"
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-g4VCTBWpxusGm5S2tw_9-G3ytEsM_ihlGl-OkIk5x5uWs94DsGt2IM2lX62R2axBTWQrRf_JqTBQjfW0uiirwpOPMQVDsww9TaWKlJhzhITtRkc50Le51avkiy_d1MDGdypH_2VNfxlrEA-xHOZwzfy0FWFqdqA3VIPM5RpTalIkyCcapjuaPrz0ZrEm7pMkcDbOTirfr0PrF_TT2cmGeb3o4HkD3sAIJuVg3oU5CyQP1HSi47kO')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent p-5 flex flex-col justify-end text-white text-left z-10">
                      <h6 className="font-headline-md text-headline-md text-white">AI Insights Active</h6>
                      <p className="font-body-sm text-body-sm text-white/90">
                        Predictive risk analysis is running for 12 patient records. View updated scoring in the patient tab.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}

          {/* Patients Tab Content */}
          {activeTab === 'Patients' && (
            <>
              {/* Header / Breadcrumbs */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md">
                <div className="text-left">
                  <h2 className="text-headline-xl font-headline-xl text-on-surface dark:text-white">{lang === 'vi' ? 'Thư mục Bệnh nhân' : 'Patient Directory'}</h2>
                  <p className="text-body-md font-body-md text-on-surface-variant dark:text-slate-400 mt-xs">
                    {lang === 'vi' ? `Quản lý hồ sơ bệnh án toàn diện cho ${filteredPatients.length} bệnh nhân đăng ký.` : `Manage and access comprehensive medical records for ${filteredPatients.length} registered patients.`}
                  </p>
                </div>
                <button
                  onClick={handleNewPatient}
                  className="bg-primary hover:bg-primary-container text-white px-lg py-md rounded-xl font-bold flex items-center justify-center gap-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98] w-fit"
                >
                  <span className="material-symbols-outlined">person_add</span>
                  {lang === 'vi' ? 'Thêm Bệnh nhân' : 'New Patient'}
                </button>
              </div>

              {/* Filters Section */}
              <div className="grid grid-cols-12 gap-gutter text-left">
                <div className="col-span-12 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-xl flex flex-wrap items-center gap-md">
                  <div className="flex items-center gap-sm text-on-surface-variant dark:text-slate-350">
                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                    <span className="text-label-md font-bold">Filters:</span>
                  </div>

                  <select
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md text-on-surface-variant dark:text-slate-200 focus:ring-1 focus:ring-primary focus:border-transparent outline-none min-w-[160px]"
                  >
                    <option value="All Departments">All Departments</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Oncology">Oncology</option>
                  </select>

                  <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md text-on-surface-variant dark:text-slate-200 focus:ring-1 focus:ring-primary focus:border-transparent outline-none min-w-[120px]"
                  >
                    <option value="Gender">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md text-on-surface-variant dark:text-slate-200 focus:ring-1 focus:ring-primary focus:border-transparent outline-none min-w-[120px]"
                  >
                    <option value="Status">Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Critical Alert">Critical Alert</option>
                  </select>

                  <div className="h-8 w-[1px] bg-outline-variant dark:bg-slate-700 mx-base"></div>
                  <button
                    onClick={() => { setDeptFilter('All Departments'); setGenderFilter('Gender'); setStatusFilter('Status'); setSearchQuery(''); }}
                    className="text-primary dark:text-primary-fixed-dim text-label-md font-bold hover:underline"
                  >
                    Clear all
                  </button>

                  <div className="ml-auto text-body-sm text-on-surface-variant dark:text-slate-400">
                    Showing {filteredPatients.length} of {patients.length} patients
                  </div>
                </div>
              </div>

              {/* Patients Data Table */}
              <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-surface-container dark:bg-slate-900/50 text-on-surface-variant dark:text-slate-300 border-b border-outline-variant dark:border-slate-700">
                        <th className="px-lg py-md text-label-md font-bold">{lang === 'vi' ? 'Họ và tên bệnh nhân' : 'Patient Name'}</th>
                        <th className="px-md py-md text-label-md font-bold">ID</th>
                        <th className="px-md py-md text-label-md font-bold">{lang === 'vi' ? 'Giới tính' : 'Gender'}</th>
                        <th className="px-md py-md text-label-md font-bold">{lang === 'vi' ? 'Tuổi' : 'Age'}</th>
                        <th className="px-md py-md text-label-md font-bold">{lang === 'vi' ? 'Chuyên khoa' : 'Department'}</th>
                        <th className="px-md py-md text-label-md font-bold">{lang === 'vi' ? 'Lần cuối' : 'Last Visit'}</th>
                        <th className="px-md py-md text-label-md font-bold">Status</th>
                        <th className="px-lg py-md text-label-md font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-on-surface dark:text-slate-200 text-body-md divide-y divide-outline-variant dark:divide-slate-700">
                      {filteredPatients.map((pat, idx) => (
                        <tr
                          key={pat.id}
                          className={`${idx % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-900/30' : 'bg-white dark:bg-slate-800'} hover:bg-surface-container-low dark:hover:bg-slate-700/50 transition-colors group`}
                        >
                          <td className="px-lg py-md">
                            <div className="flex items-center gap-md">
                              <div className="w-10 h-10 rounded-full border border-outline-variant dark:border-slate-700 overflow-hidden">
                                <img className="w-full h-full object-cover" alt={pat.name} src={pat.avatar} />
                              </div>
                              <div className="text-left">
                                <div className="font-bold text-on-surface dark:text-white">{pat.name}</div>
                                <div className="text-body-sm text-on-surface-variant dark:text-slate-400">{pat.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-md py-md font-data-mono text-left">{pat.id}</td>
                          <td className="px-md py-md text-left">{pat.gender}</td>
                          <td className="px-md py-md text-left">{pat.age}</td>
                          <td className="px-md py-md text-left">{pat.department}</td>
                          <td className="px-md py-md text-left">{pat.lastVisit}</td>
                          <td className="px-md py-md text-left">
                            {pat.status === 'Active' ? (
                              <span className="px-sm py-base rounded bg-secondary-container/30 text-on-secondary-container dark:text-teal-400 text-body-sm font-bold border border-secondary-container/50 dark:border-teal-500/20">Active</span>
                            ) : pat.status === 'Critical Alert' ? (
                              <span className="px-sm py-base rounded bg-error-container text-on-error-container text-body-sm font-bold border border-error/20">Critical Alert</span>
                            ) : (
                              <span className="px-sm py-base rounded bg-surface-variant dark:bg-slate-700 text-on-surface-variant dark:text-slate-400 text-body-sm font-bold border border-outline-variant dark:border-slate-700">Inactive</span>
                            )}
                          </td>
                          <td className="px-lg py-md text-right">
                            <button onClick={() => alert(`Chi tiết hồ sơ bệnh án: ${pat.name}`)} className="p-base text-outline hover:text-primary dark:hover:text-primary-fixed-dim transition-colors">
                              <span className="material-symbols-outlined">more_vert</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredPatients.length === 0 && (
                        <tr>
                          <td colSpan="8" className="px-lg py-xl text-center text-on-surface-variant dark:text-slate-400">
                            Không tìm thấy bệnh nhân nào khớp với bộ lọc.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-lg py-md border-t border-outline-variant dark:border-slate-700 flex items-center justify-between">
                  <div className="text-body-sm text-on-surface-variant dark:text-slate-400">
                    Page 1 of 1
                  </div>
                  <div className="flex items-center gap-sm">
                    <button disabled className="p-sm rounded border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-400 disabled:opacity-30">
                      <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    </button>
                    <button className="w-8 h-8 rounded bg-primary text-on-primary text-label-md font-bold">1</button>
                    <button disabled className="p-sm rounded border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-400 disabled:opacity-30">
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* System Stats Cards at bottom */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter text-left">

                {/* Patient Inflow */}
                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md">
                  <div className="flex items-center justify-between border-b border-outline-variant dark:border-slate-700 pb-sm mb-md">
                    <h3 className="text-label-md font-bold text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">Patient Inflow</h3>
                    <span className="text-secondary dark:text-teal-400 font-bold text-body-sm">+12% vs last month</span>
                  </div>
                  <div className="flex items-end gap-md">
                    <div className="text-headline-xl font-headline-xl text-primary dark:text-primary-fixed-dim">342</div>
                    <div className="text-body-sm text-on-surface-variant dark:text-slate-400 mb-base">New admissions this month</div>
                  </div>
                </div>

                {/* Bed Occupancy */}
                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md">
                  <div className="flex items-center justify-between border-b border-outline-variant dark:border-slate-700 pb-sm mb-md">
                    <h3 className="text-label-md font-bold text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">Bed Occupancy</h3>
                    <span className="text-on-surface-variant dark:text-slate-400 font-bold text-body-sm">Target: 85%</span>
                  </div>
                  <div className="flex items-end gap-md">
                    <div className="text-headline-xl font-headline-xl text-primary dark:text-primary-fixed-dim">92%</div>
                    <div className="flex-1">
                      <div className="w-full h-2 bg-surface-container dark:bg-slate-700 rounded-full mt-base">
                        <div className="h-full bg-primary dark:bg-primary-fixed-dim rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Critical Alerts */}
                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md">
                  <div className="flex items-center justify-between border-b border-outline-variant dark:border-slate-700 pb-sm mb-md">
                    <h3 className="text-label-md font-bold text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">Critical Alerts</h3>
                    <span className="text-error font-bold text-body-sm">Requires Attention</span>
                  </div>
                  <div className="flex items-end gap-md">
                    <div className="text-headline-xl font-headline-xl text-error">08</div>
                    <div className="text-body-sm text-on-surface-variant dark:text-slate-400 mb-base">Active emergency triggers</div>
                  </div>
                </div>

              </div>
            </>
          )}

          {/* Appointments Tab Content */}
          {activeTab === 'Appointments' && (
            <>
              {/* Breadcrumbs & Header Section */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md text-left">
                <div>
                  <h2 className="text-headline-xl font-headline-xl text-on-surface dark:text-white">{lang === 'vi' ? 'Quản lý lịch hẹn' : 'Appointments'}</h2>
                </div>

                <div className="flex gap-md w-fit">
                  <div className="bg-surface-container dark:bg-slate-800 rounded-lg p-base flex border border-outline-variant dark:border-slate-700">
                    <button
                      onClick={() => setCalendarMode('Monthly')}
                      className={`px-md py-xs text-label-md font-label-md rounded transition-all ${calendarMode === 'Monthly'
                        ? 'bg-white dark:bg-slate-700 clinical-shadow text-primary dark:text-white font-bold'
                        : 'text-outline dark:text-slate-400 hover:text-on-surface'
                        }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setCalendarMode('Weekly')}
                      className={`px-md py-xs text-label-md font-label-md rounded transition-all ${calendarMode === 'Weekly'
                        ? 'bg-white dark:bg-slate-700 clinical-shadow text-primary dark:text-white font-bold'
                        : 'text-outline dark:text-slate-400 hover:text-on-surface'
                        }`}
                    >
                      Weekly
                    </button>
                  </div>

                  <button
                    onClick={handleBookAppointment}
                    className="bg-primary hover:bg-primary-container text-white px-lg py-sm font-label-md text-label-md rounded-lg flex items-center gap-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[20px]">event</span>
                    {lang === 'vi' ? 'Đặt Lịch khám' : 'Book Appointment'}
                  </button>
                </div>
              </div>

              {/* Dynamic Highlights Summary Grid (Full 12 cols width) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter text-left">
                {/* Total Patients */}
                <div className="bg-primary/5 dark:bg-slate-800 p-md border border-primary/20 dark:border-slate-700 rounded-xl">
                  <div className="flex items-center gap-sm text-primary dark:text-primary-fixed-dim mb-sm">
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                    <span className="text-label-md font-label-md">TOTAL PATIENTS</span>
                  </div>
                  <p className="text-headline-lg font-headline-lg text-on-surface dark:text-white">{totalPatientsCount}</p>
                  <p className="text-body-sm font-body-sm text-outline dark:text-slate-400">
                    {lang === 'vi' ? 'Lượt khám hoạt động trong tháng' : 'Active appointments this month'}
                  </p>
                </div>

                {/* Confirmed */}
                <div className="bg-secondary/5 dark:bg-slate-800 p-md border border-secondary/20 dark:border-slate-700 rounded-xl">
                  <div className="flex items-center gap-sm text-secondary dark:text-teal-400 mb-sm">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    <span className="text-label-md font-label-md">CONFIRMED</span>
                  </div>
                  <p className="text-headline-lg font-headline-lg text-on-surface dark:text-white">{confirmedCount}</p>
                  <p className="text-body-sm font-body-sm text-outline dark:text-slate-400">
                    {lang === 'vi' ? 'Đã xác nhận lịch hẹn' : 'Confirmed bookings'}
                  </p>
                </div>

                {/* Pending */}
                <div className="bg-tertiary-container/10 dark:bg-slate-800 p-md border border-tertiary-container/30 dark:border-slate-700 rounded-xl">
                  <div className="flex items-center gap-sm text-tertiary dark:text-amber-500 mb-sm">
                    <span className="material-symbols-outlined text-[20px]">pending_actions</span>
                    <span className="text-label-md font-label-md">PENDING</span>
                  </div>
                  <p className="text-headline-lg font-headline-lg text-on-surface dark:text-white">{pendingCount}</p>
                  <p className="text-body-sm font-body-sm text-outline dark:text-slate-400">
                    {lang === 'vi' ? 'Đang chờ xử lý' : 'Awaiting confirmation'}
                  </p>
                </div>

                {/* Cancelled */}
                <div className="bg-error-container/10 dark:bg-slate-800 p-md border border-error/20 dark:border-slate-700 rounded-xl">
                  <div className="flex items-center gap-sm text-error mb-sm">
                    <span className="material-symbols-outlined text-[20px]">cancel</span>
                    <span className="text-label-md font-label-md">CANCELLED</span>
                  </div>
                  <p className="text-headline-lg font-headline-lg text-error">{cancelledCount}</p>
                  <p className="text-body-sm font-body-sm text-outline dark:text-slate-400">
                    {lang === 'vi' ? 'Số ca đã hủy hẹn' : 'Cancelled appointments'}
                  </p>
                </div>
              </div>

              {/* Dashboard Grid Layout */}
              <div className="grid grid-cols-12 gap-gutter items-stretch">

                {/* Left Side: Calendar View (8 Cols) */}
                <section className="col-span-12 lg:col-span-8 flex flex-col">
                  <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden clinical-shadow flex flex-col h-full">

                    {/* Calendar Month Header */}
                    <div className="p-md flex justify-between items-center border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50">
                      <div className="flex items-center gap-md">
                        {/* Month Selection */}
                        <select
                          value={calMonth}
                          onChange={(e) => {
                            const newM = parseInt(e.target.value);
                            setCalMonth(newM);
                            const maxDays = new Date(calYear, newM + 1, 0).getDate();
                            if (selectedDay > maxDays) {
                              setSelectedDay(maxDays);
                            }
                          }}
                          className="px-md py-xs bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded text-body-md font-bold text-on-surface dark:text-slate-200 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                        >
                          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((mName, i) => {
                            const mNamesVi = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
                            return (
                              <option key={i} value={i}>
                                {lang === 'vi' ? mNamesVi[i] : mName}
                              </option>
                            );
                          })}
                        </select>

                        {/* Year Selection */}
                        <select
                          value={calYear}
                          onChange={(e) => {
                            const newY = parseInt(e.target.value);
                            setCalYear(newY);
                            const maxDays = new Date(newY, calMonth + 1, 0).getDate();
                            if (selectedDay > maxDays) {
                              setSelectedDay(maxDays);
                            }
                          }}
                          className="px-md py-xs bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded text-body-md font-bold text-on-surface dark:text-slate-200 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                        >
                          {Array.from({ length: 11 }, (_, i) => {
                            const yr = 2020 + i;
                            return (
                              <option key={yr} value={yr}>
                                {yr}
                              </option>
                            );
                          })}
                        </select>

                        {/* Chevrons to change month */}
                        <div className="flex border border-outline-variant dark:border-slate-700 rounded bg-white dark:bg-slate-800">
                          <button
                            onClick={() => {
                              setCalMonth(prev => {
                                if (prev === 0) {
                                  setCalYear(y => y - 1);
                                  return 11;
                                }
                                return prev - 1;
                              });
                            }}
                            className="p-1 border-r border-outline-variant dark:border-slate-700 hover:bg-surface-container dark:hover:bg-slate-700"
                            title={lang === 'vi' ? 'Tháng trước' : 'Previous Month'}
                          >
                            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                          </button>
                          <button
                            onClick={() => {
                              setCalMonth(prev => {
                                if (prev === 11) {
                                  setCalYear(y => y + 1);
                                  return 0;
                                }
                                return prev + 1;
                              });
                            }}
                            className="p-1 hover:bg-surface-container dark:hover:bg-slate-700"
                            title={lang === 'vi' ? 'Tháng sau' : 'Next Month'}
                          >
                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const today = new Date();
                          setCalMonth(today.getMonth());
                          setCalYear(today.getFullYear());
                          setSelectedDay(today.getDate());
                        }}
                        className="text-primary dark:text-primary-fixed-dim text-label-md font-label-md hover:underline"
                      >
                        {lang === 'vi' ? 'Hôm nay' : 'Today'}
                      </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 text-center bg-outline-variant dark:bg-slate-700 gap-px flex-grow">

                      {/* Weekday Titles */}
                      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                        <div key={day} className="bg-surface-container dark:bg-slate-900/85 py-2 text-label-md font-label-md text-outline dark:text-slate-400">
                          {day}
                        </div>
                      ))}

                      {/* Previous month padding days */}
                      {Array.from({ length: startDayOfWeek }, (_, i) => {
                        const prevMonthDays = new Date(calYear, calMonth, 0).getDate();
                        const dNum = prevMonthDays - startDayOfWeek + 1 + i;
                        return (
                          <div key={`prev-${dNum}`} className="bg-slate-50 dark:bg-slate-900/40 p-2 text-right text-outline opacity-40 text-body-sm select-none min-h-[90px] flex flex-col justify-between">
                            <span>{dNum}</span>
                            <div className="mt-1"></div>
                          </div>
                        );
                      })}

                      {/* Current Month Active Days */}
                      {Array.from({ length: daysInMonth }, (_, i) => {
                        const dayNum = i + 1;
                        const isSelected = selectedDay === dayNum;
                        const dayEvents = agenda.filter(ev =>
                          ev.day === dayNum &&
                          (ev.month === undefined || ev.month === calMonth) &&
                          (ev.year === undefined || ev.year === calYear)
                        );

                        return (
                          <div
                            key={`curr-${dayNum}`}
                            onClick={() => setSelectedDay(dayNum)}
                            className={`p-2 text-right text-body-sm flex flex-col justify-between transition-all cursor-pointer relative min-h-[90px] ${isSelected
                              ? 'bg-primary-fixed/20 dark:bg-slate-700 ring-2 ring-primary dark:ring-primary-fixed-dim ring-inset'
                              : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                              }`}
                          >
                            <span className={`font-bold ${isSelected ? 'text-primary dark:text-white' : 'text-on-surface dark:text-slate-200'}`}>
                              {dayNum}
                            </span>
                            <div className="mt-1 space-y-1 text-left overflow-y-auto no-scrollbar max-h-[60px]">
                              {dayEvents.slice(0, 3).map(ev => {
                                const isErr = ev.status === 'Cancelled' || ev.type.toLowerCase().includes('emergency');
                                const isPending = ev.status === 'Pending';
                                return (
                                  <div
                                    key={ev.id}
                                    className={`p-0.5 rounded border-l-2 text-[9px] leading-tight font-bold truncate ${isErr
                                      ? 'bg-error/10 text-error border-error dark:bg-red-950/30'
                                      : isPending
                                        ? 'bg-tertiary-fixed/30 text-tertiary border-tertiary dark:bg-amber-950/20'
                                        : 'bg-primary/10 text-primary border-primary dark:bg-slate-900/50 dark:text-primary-fixed-dim'
                                      }`}
                                  >
                                    {ev.time.split(' ')[0]} {ev.patient}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}

                      {/* Next month padding days */}
                      {Array.from({ length: (Math.ceil((startDayOfWeek + daysInMonth) / 7) * 7) - (startDayOfWeek + daysInMonth) }, (_, i) => {
                        const dNum = i + 1;
                        return (
                          <div key={`next-${dNum}`} className="bg-slate-50 dark:bg-slate-900/40 p-2 text-right text-outline opacity-40 text-body-sm select-none min-h-[90px] flex flex-col justify-between">
                            <span>{dNum}</span>
                            <div className="mt-1"></div>
                          </div>
                        );
                      })}

                    </div>
                  </div>
                </section>

                {/* Right Side: Daily Agenda List (4 Cols) */}
                <section className="col-span-12 lg:col-span-4 flex flex-col">
                  <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden clinical-shadow flex flex-col h-full text-left">

                    {/* Agenda Header */}
                    <div className="p-md border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface dark:bg-slate-900/50">
                      <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">Daily Agenda</h3>
                      <span className="text-label-md font-label-md text-outline dark:text-slate-400 uppercase font-bold">
                        {(() => {
                          const mNamesVi = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
                          const mNamesEn = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                          return lang === 'vi' ? `${mNamesVi[calMonth]} ${selectedDay}, ${calYear}` : `${mNamesEn[calMonth]} ${selectedDay}, ${calYear}`;
                        })()}
                      </span>
                    </div>

                    {/* Scrollable list area */}
                    <div className="flex-grow overflow-y-auto p-md space-y-md h-[400px] lg:h-0 min-h-[350px]">
                      {filteredAgenda.map(item => {
                        const isConfirmed = item.status === 'Confirmed';
                        const isPending = item.status === 'Pending';
                        const isCancelled = item.status === 'Cancelled';

                        return (
                          <div
                            key={item.id}
                            className={`p-md border border-outline-variant dark:border-slate-700 rounded-lg hover:border-primary dark:hover:border-primary-fixed-dim transition-colors cursor-pointer group ${isCancelled ? 'opacity-50' : ''
                              }`}
                          >
                            <div className="flex justify-between items-start mb-sm">
                              {isConfirmed && (
                                <span className="bg-secondary-container/20 text-on-secondary-container dark:text-teal-400 px-sm py-base rounded text-label-md font-label-md flex items-center gap-xs">
                                  <span className="w-1.5 h-1.5 rounded-full bg-on-secondary-container dark:bg-teal-500"></span> Confirmed
                                </span>
                              )}
                              {isPending && (
                                <span className="bg-tertiary-fixed/30 text-tertiary dark:text-amber-500 px-sm py-base rounded text-label-md font-label-md flex items-center gap-xs">
                                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary dark:bg-amber-500"></span> Pending
                                </span>
                              )}
                              {isCancelled && (
                                <span className="bg-error-container text-on-error-container px-sm py-base rounded text-label-md font-label-md flex items-center gap-xs">
                                  <span className="w-1.5 h-1.5 rounded-full bg-on-error-container"></span> Cancelled
                                </span>
                              )}
                              <span className="text-body-sm font-body-sm text-outline dark:text-slate-400">{item.time}</span>
                            </div>

                            <h4 className={`text-body-lg font-bold group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors ${isCancelled ? 'line-through' : 'text-on-surface dark:text-white'}`}>
                              {item.patient}
                            </h4>
                            <p className="text-body-md font-body-md text-on-surface-variant dark:text-slate-300">{item.type}</p>

                            <div className="mt-md flex items-center gap-sm pt-sm border-t border-outline-variant/30 dark:border-slate-700">
                              <img className="w-6 h-6 rounded-full object-cover" alt={item.doctor} src={item.avatar} />
                              <span className="text-label-md font-label-md text-outline dark:text-slate-400">{item.doctor}</span>
                            </div>
                          </div>
                        );
                      })}

                      {filteredAgenda.length === 0 && (
                        <div className="py-xl text-center text-on-surface-variant dark:text-slate-400 h-full flex flex-col justify-center items-center">
                          <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-md">
                            calendar_today
                          </span>
                          <p className="font-body-md">{lang === 'vi' ? 'Không có lịch hẹn nào cho ngày này.' : 'No appointments registered for this day.'}</p>
                        </div>
                      )}
                    </div>

                    <div className="p-md bg-surface-container-low dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 mt-auto">
                      <button
                        onClick={() => alert(lang === 'vi' ? 'Xem danh sách lịch hẹn chi tiết' : 'View detailed list of appointments')}
                        className="w-full border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim py-sm font-label-md text-label-md rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        {lang === 'vi' ? 'Xem Danh Sách Chi Tiết' : 'View Detailed List'}
                      </button>
                    </div>
                  </div>
                </section>

              </div>
            </>
          )}

          {/* Lab Results Tab Content */}
          {activeTab === 'Lab Results' && (
            <>
              {/* Header section */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md text-left">
                <div>
                  <h2 className="text-headline-xl font-headline-xl text-on-surface dark:text-white">{lang === 'vi' ? 'Theo dõi Xét nghiệm' : 'Laboratory Command'}</h2>
                  <p className="text-body-md text-on-surface-variant dark:text-slate-400">Real-time diagnostics and specimen monitoring for Facility A-102</p>
                </div>
                <div className="flex gap-sm w-fit">
                  <button onClick={() => alert('Lọc kết quả xét nghiệm')} className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 px-md py-sm rounded flex items-center gap-xs text-on-surface dark:text-slate-200 font-label-md hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                    Filter View
                  </button>
                  <button onClick={() => alert('Xuất báo cáo tổng quan lab')} className="bg-primary hover:bg-primary-container text-white px-md py-sm rounded flex items-center gap-xs font-label-md shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                    <span className="material-symbols-outlined text-[20px]">file_download</span>
                    Export Summary
                  </button>
                </div>
              </div>

              {/* Bento Grid Metrics */}
              <div className="grid grid-cols-12 gap-gutter text-left">

                {/* Critical Alerts Widget */}
                <div className="col-span-12 lg:col-span-4 bg-error-container/20 border border-error/20 p-md rounded-lg flex flex-col justify-between min-h-[140px] relative overflow-hidden">
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[11px] font-bold text-error uppercase tracking-widest">Critical Results</span>
                    <span className="bg-error text-white text-[11px] font-bold px-2 py-0.5 rounded">04 Urgent</span>
                  </div>
                  <div className="flex items-center gap-md z-10">
                    <span className="material-symbols-outlined text-error text-[44px]">priority_high</span>
                    <div>
                      <div className="text-headline-md font-bold text-on-error-container dark:text-red-300">Urgent Review</div>
                      <p className="text-body-sm text-on-surface-variant dark:text-slate-400">Avg turnaround: 18m (Target: &lt; 15m)</p>
                    </div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-5 dark:opacity-10 text-error">
                    <span className="material-symbols-outlined text-[100px]">ecg</span>
                  </div>
                </div>

                {/* Pending Specimen Queue Widget */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-lg flex flex-col justify-between min-h-[140px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase">Specimen Queue</span>
                    <span className="text-primary dark:text-primary-fixed-dim font-bold text-body-md">28 Pending</span>
                  </div>
                  <div className="w-full bg-surface-container dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary dark:bg-primary-fixed-dim h-full w-[66%]"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-xs text-center border-t border-outline-variant/30 dark:border-slate-700 pt-2">
                    <div>
                      <div className="text-headline-md font-bold text-on-surface dark:text-white">12</div>
                      <div className="text-[9px] text-outline dark:text-slate-400 font-bold uppercase">Hematology</div>
                    </div>
                    <div className="border-x border-outline-variant dark:border-slate-700">
                      <div className="text-headline-md font-bold text-on-surface dark:text-white">09</div>
                      <div className="text-[9px] text-outline dark:text-slate-400 font-bold uppercase">Biopsy</div>
                    </div>
                    <div>
                      <div className="text-headline-md font-bold text-on-surface dark:text-white">07</div>
                      <div className="text-[9px] text-outline dark:text-slate-400 font-bold uppercase">Cytology</div>
                    </div>
                  </div>
                </div>

                {/* Process Efficiency Widget */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-lg flex items-center gap-md min-h-[140px]">
                  <div className="w-16 h-16 rounded-full border-[6px] border-secondary dark:border-teal-500 border-t-outline-variant dark:border-t-slate-700 flex items-center justify-center">
                    <span className="text-body-md font-bold text-secondary dark:text-teal-400">94%</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase block">Process Efficiency</span>
                    <div className="text-headline-md font-bold text-on-surface dark:text-white">Optimum Flow</div>
                    <p className="text-body-sm text-on-surface-variant dark:text-slate-400">+2.4% from last shift</p>
                  </div>
                </div>

              </div>

              {/* Split view diagnostic queue + Specimen tracking */}
              <div className="grid grid-cols-12 gap-gutter text-left">

                {/* Left diagnostic list */}
                <div className="col-span-12 xl:col-span-8 space-y-gutter">

                  {/* Table Queue */}
                  <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg overflow-hidden shadow-sm flex flex-col">
                    <div className="px-md py-sm border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50 flex items-center justify-between flex-wrap gap-sm">
                      <h3 className="text-label-md font-bold text-on-surface dark:text-white uppercase flex items-center gap-sm">
                        <span className="material-symbols-outlined text-[18px]">list_alt</span>
                        Diagnostic Review Queue
                      </h3>
                      <div className="flex bg-surface-container dark:bg-slate-700 rounded p-0.5 border border-outline-variant dark:border-slate-600">
                        {['All', 'Pending', 'Completed'].map(tab => (
                          <button
                            key={tab}
                            onClick={() => setLabFilter(tab)}
                            className={`px-md py-1 rounded text-body-sm font-bold transition-all ${labFilter === tab
                              ? 'bg-white dark:bg-slate-600 shadow-xs text-primary dark:text-white'
                              : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface'
                              }`}
                          >
                            {tab === 'All' ? 'All Tests' : tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="text-left border-b border-outline-variant dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 text-on-surface-variant dark:text-slate-300">
                            <th className="px-md py-sm text-label-md font-bold uppercase">Patient ID</th>
                            <th className="px-md py-sm text-label-md font-bold uppercase">Test Type</th>
                            <th className="px-md py-sm text-label-md font-bold uppercase">Requesting Doctor</th>
                            <th className="px-md py-sm text-label-md font-bold uppercase">Status</th>
                            <th className="px-md py-sm text-label-md font-bold uppercase text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-body-md text-on-surface dark:text-slate-200 divide-y divide-outline-variant dark:divide-slate-700/50">
                          {filteredLabTests.map((test, index) => {
                            const isCrit = test.status === 'CRITICAL' || test.status === 'ABNORMAL';
                            const isComp = test.status === 'COMPLETED';
                            return (
                              <tr
                                key={test.id}
                                className={`hover:bg-surface-container-low dark:hover:bg-slate-700/40 transition-colors ${index % 2 === 1 ? 'bg-slate-50/30 dark:bg-slate-900/10' : ''
                                  }`}
                              >
                                <td className="px-md py-sm font-data-mono text-primary dark:text-primary-fixed-dim">{test.id}</td>
                                <td className="px-md py-sm">
                                  <div className="flex flex-col">
                                    <span className="font-bold">{test.type}</span>
                                    <span className="text-body-sm text-on-surface-variant dark:text-slate-400">Specimen: {test.specimen}</span>
                                  </div>
                                </td>
                                <td className="px-md py-sm text-on-surface-variant dark:text-slate-350">{test.doctor}</td>
                                <td className="px-md py-sm">
                                  {isCrit ? (
                                    <span className="bg-error-container text-on-error-container text-[10px] font-bold px-sm py-0.5 rounded border border-error/20 flex items-center gap-xs w-fit">
                                      <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                                      {test.status}
                                    </span>
                                  ) : isComp ? (
                                    <span className="bg-secondary-container/50 text-on-secondary-container dark:text-teal-400 text-[10px] font-bold px-sm py-0.5 rounded border border-secondary/20 flex items-center gap-xs w-fit">
                                      <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-teal-500"></span>
                                      COMPLETED
                                    </span>
                                  ) : (
                                    <span className="bg-surface-container-highest dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 text-[10px] font-bold px-sm py-0.5 rounded flex items-center gap-xs w-fit border border-outline-variant/30">
                                      <span className="w-1.5 h-1.5 rounded-full bg-outline dark:bg-slate-400"></span>
                                      {test.status}
                                    </span>
                                  )}
                                </td>
                                <td className="px-md py-sm text-right">
                                  {isComp || isCrit ? (
                                    <button
                                      onClick={() => alert(`Đang tải kết quả chẩn đoán hình ảnh và phân tích cho: ${test.id}`)}
                                      className="text-primary dark:text-primary-fixed-dim hover:underline font-label-md text-[12px] flex items-center gap-xs ml-auto"
                                    >
                                      {test.type.includes('MRI') ? 'Review DICOM' : 'View Result'}
                                      <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                    </button>
                                  ) : (
                                    <span className="text-body-sm text-outline dark:text-slate-400 italic">Processing...</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="px-md py-sm border-t border-outline-variant dark:border-slate-700 flex justify-between items-center text-body-sm text-on-surface-variant dark:text-slate-400">
                      <span>Showing {filteredLabTests.length} of {labTests.length} results</span>
                      <div className="flex gap-xs">
                        <button disabled className="p-1 border border-outline-variant dark:border-slate-700 hover:bg-surface-container dark:hover:bg-slate-700 rounded disabled:opacity-30">
                          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                        </button>
                        <button disabled className="p-1 border border-outline-variant dark:border-slate-700 hover:bg-surface-container dark:hover:bg-slate-700 rounded disabled:opacity-30">
                          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Trends Visualizer */}
                  <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg p-md shadow-sm">
                    <div className="flex items-center justify-between mb-lg flex-wrap gap-sm">
                      <div>
                        <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">Glucose &amp; A1c Trends</h3>
                        <p className="text-body-sm text-on-surface-variant dark:text-slate-400">Aggregate diagnostic values for the current patient cohort</p>
                      </div>
                      <select className="bg-surface-container dark:bg-slate-700 border border-outline-variant dark:border-slate-600 rounded px-md py-sm text-body-sm text-on-surface-variant dark:text-slate-200 outline-none focus:ring-1 focus:ring-primary">
                        <option>Last 30 Days</option>
                        <option>Last 90 Days</option>
                      </select>
                    </div>

                    {/* Chart Container */}
                    <div className="h-64 flex items-end justify-between gap-2 relative border-b border-outline-variant dark:border-slate-700 pb-1">

                      {/* Grid background lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        <div className="border-b border-outline-variant/20 dark:border-slate-700/30 h-0 w-full text-[9px] text-outline font-bold text-left">MAX 180 mg/dL</div>
                        <div className="border-b border-outline-variant/20 dark:border-slate-700/30 h-0 w-full text-[9px] text-outline font-bold text-left">AVG 120 mg/dL</div>
                        <div className="border-b border-outline-variant/20 dark:border-slate-700/30 h-0 w-full text-[9px] text-outline font-bold text-left">MIN 70 mg/dL</div>
                      </div>

                      {/* Mock Chart Columns */}
                      {[40, 55, 48, 65, 72, 85, 95, 60, 45, 50].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className="flex-1 bg-primary/10 dark:bg-primary-fixed-dim/10 rounded-t hover:bg-primary/30 dark:hover:bg-primary-fixed-dim/30 transition-all cursor-pointer relative group"
                        >
                          <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface dark:bg-slate-900 text-white dark:text-slate-100 text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">
                            Week {i + 1}: {Math.floor(70 + h * 1.15)} mg/dL
                          </div>
                        </div>
                      ))}

                    </div>

                    <div className="flex justify-between mt-sm text-body-sm font-bold text-outline dark:text-slate-400">
                      <span>MAR 01</span>
                      <span>MAR 15</span>
                      <span>MAR 31</span>
                    </div>
                  </div>

                </div>

                {/* Right Side: Specimen Tracking & Logistics */}
                <div className="col-span-12 xl:col-span-4 space-y-gutter">

                  {/* Logistics tracker */}
                  <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg p-md overflow-hidden relative shadow-sm">
                    <h3 className="text-label-md font-bold text-on-surface dark:text-white uppercase mb-md">Specimen Logistics</h3>
                    <div className="space-y-md">

                      <div className="flex gap-md">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-secondary dark:bg-teal-500 text-on-secondary dark:text-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">check</span>
                          </div>
                          <div className="w-[2px] h-full bg-secondary dark:bg-teal-500 min-h-[30px]"></div>
                        </div>
                        <div className="pb-md">
                          <div className="text-body-md font-bold text-on-surface dark:text-white">Arrived at Central Lab</div>
                          <p className="text-body-sm text-on-surface-variant dark:text-slate-400">#SPEC-9921 (Blood) | 08:42 AM</p>
                        </div>
                      </div>

                      <div className="flex gap-md">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">science</span>
                          </div>
                          <div className="w-[2px] h-full bg-outline-variant dark:bg-slate-700 min-h-[30px]"></div>
                        </div>
                        <div className="pb-md">
                          <div className="text-body-md font-bold text-on-surface dark:text-white">Under Analysis</div>
                          <p className="text-body-sm text-on-surface-variant dark:text-slate-400">#SPEC-9877 (Histology) | In Centrifuge</p>
                        </div>
                      </div>

                      <div className="flex gap-md">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high dark:bg-slate-700 border border-outline-variant dark:border-slate-700 text-outline dark:text-slate-400 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-body-md font-bold text-outline dark:text-slate-400">Awaiting Courier</div>
                          <p className="text-body-sm text-outline dark:text-slate-400">#SPEC-0012 (Scheduled for 11:30 AM)</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Audit activity feed */}
                  <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg p-md shadow-sm">
                    <h3 className="text-label-md font-bold text-on-surface dark:text-white uppercase mb-md">Clinical Activity</h3>
                    <div className="space-y-sm">

                      <div className="p-sm bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg">
                        <div className="flex justify-between items-start mb-xs">
                          <span className="text-body-sm font-bold text-primary dark:text-primary-fixed-dim">Dr. Chen Reviewed MRI</span>
                          <span className="text-[10px] text-outline dark:text-slate-400">2m ago</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant dark:text-slate-350">Final report uploaded for PAT-90122. No significant lesions found.</p>
                      </div>

                      <div className="p-sm bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg">
                        <div className="flex justify-between items-start mb-xs">
                          <span className="text-body-sm font-bold text-error">New Critical Result</span>
                          <span className="text-[10px] text-outline dark:text-slate-400">15m ago</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant dark:text-slate-350">PAT-11023 Potassium: 6.8 mmol/L. Alert sent to Dr. Stone.</p>
                      </div>

                      <div className="p-sm bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg">
                        <div className="flex justify-between items-start mb-xs">
                          <span className="text-body-sm font-bold text-on-surface dark:text-white">Equipment Status</span>
                          <span className="text-[10px] text-outline dark:text-slate-400">1h ago</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant dark:text-slate-350">Analyzer-B calibration complete. Ready for routine testing.</p>
                      </div>

                    </div>
                    <button onClick={() => alert('Đang tải nhật ký kiểm tra đầy đủ...')} className="w-full mt-md text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:underline text-center">
                      View Full Audit Log
                    </button>
                  </div>

                  {/* Microscopic slide visual insight */}
                  <div className="relative h-48 rounded-lg overflow-hidden group border border-outline-variant dark:border-slate-800">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter brightness-[0.5]"
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-yQF9Wreu6t09iXNJdduAb95JiKErceOEArT2tHnOJ6aqHH7dTUjWuPKGUiomSnjKsnvH7uExwL30jupoVUJX5NtTpR80LxmsDbMRJdBvoU5x_Fu87qkIsklGgsyoiUaxGDAMDY1sqVb5xcZdx2ou2DqmcSrh4C76HTxD3ZxqnF53r_sXr_5ezzhStjiaw58x8ytLoZYFo9TWrpTlolUcccwWu9NP0pcmIHe-s0WP7GAUbAE2WUyY')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent p-4 flex flex-col justify-end text-white z-10">
                      <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-xs block">Clinical Insight</span>
                      <h4 className="text-white text-body-md font-bold">Hematology Accuracy Update</h4>
                      <p className="text-white/80 text-body-sm">
                        New calibration protocols are active for all blood panels.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </>
          )}

          {/* Pharmacy Tab Content */}
          {activeTab === 'Pharmacy' && (
            <>
              {/* Breadcrumbs & Header Section */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md text-left">
                <div>
                  <h2 className="text-headline-xl font-headline-xl text-on-surface dark:text-white">{lang === 'vi' ? 'Quầy kê đơn thuốc' : 'Prescription Desk'}</h2>
                </div>
                <div className="flex gap-md w-fit">
                  <button
                    onClick={() => alert('In báo cáo đơn thuốc trong ngày')}
                    className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 px-md py-sm rounded flex items-center gap-xs text-on-surface dark:text-slate-200 font-label-md hover:bg-surface-container-high dark:hover:bg-slate-700 transition-all active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[20px]">print</span>
                    Print Summary
                  </button>
                  <button
                    onClick={handleSendPrescription}
                    className="bg-primary hover:bg-primary-container text-white px-lg py-sm font-label-md text-label-md rounded-lg flex items-center gap-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[20px]">send</span>
                    Sign & Dispatch
                  </button>
                </div>
              </div>

              {/* Prescription Creation Workspace */}
              <div className="grid grid-cols-12 gap-gutter text-left">

                {/* Left Column: Form (7 cols) */}
                <div className="col-span-12 lg:col-span-7 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md shadow-sm space-y-md">
                  <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white pb-2 border-b border-outline-variant/35 dark:border-slate-700 flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">edit_note</span>
                    Prescribe Medication
                  </h3>

                  {/* Row 1: Target Patient & Diagnosis */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-350">Target Patient</label>
                      <select
                        value={prescPatientId}
                        onChange={(e) => setPrescPatientId(e.target.value)}
                        className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none dark:text-white"
                      >
                        {patients.map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-xs">
                      <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-350">Diagnosis / Reason</label>
                      <input
                        type="text"
                        placeholder="e.g. Hypertension, Pneumonia..."
                        value={prescDiagnosis}
                        onChange={(e) => setPrescDiagnosis(e.target.value)}
                        className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none text-on-surface dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-outline-variant/35 dark:border-slate-700 my-2"></div>

                  {/* Row 2: Drug Name & Dosage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-350">Drug Name</label>
                      <input
                        type="text"
                        placeholder="Search or enter e.g. Amoxicillin, Metformin..."
                        value={draftMedName}
                        onChange={(e) => setDraftMedName(e.target.value)}
                        className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none text-on-surface dark:text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-xs">
                      <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-350">Dosage</label>
                      <input
                        type="text"
                        placeholder="e.g. 500mg, 10mg..."
                        value={draftMedDosage}
                        onChange={(e) => setDraftMedDosage(e.target.value)}
                        className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none text-on-surface dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Row 3: Frequency & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-350">Frequency</label>
                      <select
                        value={draftMedFreq}
                        onChange={(e) => setDraftMedFreq(e.target.value)}
                        className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none dark:text-white"
                      >
                        <option>Once daily</option>
                        <option>Twice daily</option>
                        <option>Three times daily</option>
                        <option>Four times daily</option>
                        <option>Every 8 hours</option>
                        <option>Every 4 hours</option>
                        <option>As needed (PRN)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-xs">
                      <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-350">Duration</label>
                      <select
                        value={draftMedDuration}
                        onChange={(e) => setDraftMedDuration(e.target.value)}
                        className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none dark:text-white"
                      >
                        <option>3 days</option>
                        <option>5 days</option>
                        <option>7 days</option>
                        <option>14 days</option>
                        <option>30 days</option>
                        <option>90 days</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Directions / Notes */}
                  <div className="flex flex-col gap-xs">
                    <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-350">Directions & Special Instructions</label>
                    <textarea
                      rows="2"
                      placeholder="e.g. Take with food, Avoid dairy products..."
                      value={draftMedNotes}
                      onChange={(e) => setDraftMedNotes(e.target.value)}
                      className="p-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none text-on-surface dark:text-white"
                    />
                  </div>

                  {/* Add Medication Trigger Button */}
                  <button
                    onClick={handleAddMedication}
                    className="w-full bg-secondary-container text-on-secondary-container dark:bg-teal-900 dark:text-teal-400 border border-secondary-container dark:border-slate-700 hover:bg-secondary/15 py-3 rounded-lg font-bold flex items-center justify-center gap-sm transition-all active:scale-[0.98] mt-4"
                  >
                    <span className="material-symbols-outlined">add_circle</span>
                    Add to Prescription Draft
                  </button>

                </div>

                {/* Right Column: Draft Summary (5 cols) */}
                <div className="col-span-12 lg:col-span-5 flex flex-col bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl shadow-sm overflow-hidden min-h-[400px]">

                  {/* Draft Header */}
                  <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50">
                    <h3 className="text-label-md font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest">Active Prescription Draft</h3>
                    <div className="mt-2 text-body-md text-on-surface dark:text-white font-semibold">
                      Patient: {patients.find(p => p.id === prescPatientId)?.name || 'Unknown Patient'}
                    </div>
                    <div className="text-body-sm text-outline dark:text-slate-400 mt-1">
                      Diagnosis: {prescDiagnosis || 'Not specified'}
                    </div>
                  </div>

                  {/* Medications List */}
                  <div className="flex-grow p-md space-y-md overflow-y-auto max-h-[300px]">
                    {currentMedList.map((med, idx) => (
                      <div
                        key={idx}
                        className="p-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant/60 dark:border-slate-700 rounded-lg flex justify-between items-center group"
                      >
                        <div className="space-y-1">
                          <h4 className="font-bold text-primary dark:text-primary-fixed-dim">{med.name} - {med.dosage}</h4>
                          <p className="text-body-sm text-on-surface-variant dark:text-slate-350">{med.frequency} • {med.duration}</p>
                          <p className="text-[11px] text-outline dark:text-slate-400 italic">Notes: {med.notes}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveMedication(idx)}
                          className="p-sm text-error hover:bg-error-container/20 rounded-full opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    ))}

                    {currentMedList.length === 0 && (
                      <div className="h-full flex flex-col justify-center items-center text-center text-on-surface-variant dark:text-slate-400 py-12">
                        <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-md">
                          prescriptions
                        </span>
                        <p className="font-body-md max-w-xs">Đơn thuốc trống. Hãy chọn loại thuốc và tần suất sử dụng ở bảng bên trái.</p>
                      </div>
                    )}
                  </div>

                  {/* Submit dispatch actions */}
                  <div className="p-md bg-surface-container-lowest dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 flex gap-md">
                    <button
                      onClick={() => { setCurrentMedList([]); setPrescDiagnosis(''); }}
                      disabled={currentMedList.length === 0}
                      className="flex-1 border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-300 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors font-bold"
                    >
                      Clear Draft
                    </button>
                    <button
                      onClick={handleSendPrescription}
                      disabled={currentMedList.length === 0}
                      className="flex-1 bg-primary text-white py-2.5 rounded-lg hover:bg-primary-container disabled:opacity-30 transition-all active:scale-[0.98] font-bold shadow-sm"
                    >
                      Dispatch Order
                    </button>
                  </div>

                </div>

              </div>

              {/* Prescriptions Dispatch History */}
              <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm text-left">

                {/* Table Header */}
                <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50 flex justify-between items-center">
                  <h3 className="text-label-md font-bold text-on-surface dark:text-white uppercase flex items-center gap-sm">
                    <span className="material-symbols-outlined text-[18px]">history</span>
                    Recently Prescribed History
                  </h3>
                  <span className="text-body-sm text-on-surface-variant dark:text-slate-400">{filteredPrescriptions.length} Records</span>
                </div>

                {/* Dispatch Grid List */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-900/30 text-on-surface-variant dark:text-slate-300 border-b border-outline-variant dark:border-slate-700 text-left">
                        <th className="px-lg py-sm text-label-md font-bold uppercase">Presc ID</th>
                        <th className="px-md py-sm text-label-md font-bold uppercase">Patient Name</th>
                        <th className="px-md py-sm text-label-md font-bold uppercase">Diagnosis</th>
                        <th className="px-md py-sm text-label-md font-bold uppercase">Medications</th>
                        <th className="px-md py-sm text-label-md font-bold uppercase">Date Issued</th>
                        <th className="px-md py-sm text-label-md font-bold uppercase">Status</th>
                        <th className="px-lg py-sm text-label-md font-bold uppercase text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-body-md text-on-surface dark:text-slate-200 divide-y divide-outline-variant dark:divide-slate-700/50">
                      {filteredPrescriptions.map((p, idx) => (
                        <tr
                          key={p.id}
                          className={`hover:bg-surface-container-low dark:hover:bg-slate-700/40 transition-colors ${idx % 2 === 1 ? 'bg-slate-50/30 dark:bg-slate-900/10' : ''
                            }`}
                        >
                          <td className="px-lg py-md font-data-mono text-primary dark:text-primary-fixed-dim">{p.id}</td>
                          <td className="px-md py-md font-semibold">{p.patient}</td>
                          <td className="px-md py-md text-on-surface-variant dark:text-slate-350">{p.diagnosis}</td>
                          <td className="px-md py-md max-w-xs truncate">
                            {p.medications.map(m => `${m.name} (${m.dosage})`).join(', ')}
                          </td>
                          <td className="px-md py-md text-body-sm text-outline dark:text-slate-400">{p.date}</td>
                          <td className="px-md py-md">
                            {p.status === 'Dispatched' ? (
                              <span className="bg-secondary-container/50 text-on-secondary-container dark:text-teal-400 text-[10px] font-bold px-sm py-0.5 rounded border border-secondary/20 flex items-center gap-xs w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-teal-500"></span> Dispatched
                              </span>
                            ) : p.status === 'Preparing' ? (
                              <span className="bg-primary-fixed/30 text-primary dark:text-primary-fixed-dim text-[10px] font-bold px-sm py-0.5 rounded border border-primary/20 flex items-center gap-xs w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Preparing
                              </span>
                            ) : (
                              <span className="bg-tertiary-fixed/30 text-tertiary dark:text-amber-500 text-[10px] font-bold px-sm py-0.5 rounded border border-tertiary/20 flex items-center gap-xs w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Pending Review
                              </span>
                            )}
                          </td>
                          <td className="px-lg py-md text-right">
                            <button
                              onClick={() => alert(`In đơn thuốc: ${p.id}`)}
                              className="text-primary dark:text-primary-fixed-dim hover:underline font-label-md text-[12px] flex items-center gap-xs ml-auto"
                            >
                              Print Presc
                              <span className="material-symbols-outlined text-[14px]">print</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </>
          )}

          {/* Settings Tab Content */}
          {activeTab === 'Settings' && (
            <>
              {/* Settings Header */}
              <div className="text-left mb-lg">
                <h2 className="text-headline-xl font-headline-xl text-on-surface dark:text-white">System Settings</h2>
                <p className="text-body-lg text-on-surface-variant dark:text-slate-400">Configure your professional preferences and hospital-wide administration controls.</p>
              </div>

              <div className="grid grid-cols-12 gap-gutter text-left">

                {/* Settings Sidebar Links (3 cols) */}
                <nav className="col-span-12 lg:col-span-3 space-y-sm">
                  {[
                    { id: 'profile', label: 'User Profile', icon: 'person' },
                    { id: 'security', label: 'Security', icon: 'security' },
                    { id: 'notifications', label: 'Notifications', icon: 'notifications_active' },
                    { id: 'hospital', label: 'Hospital Info', icon: 'domain' }
                  ].map(btn => (
                    <button
                      key={btn.id}
                      onClick={() => setSettingsTab(btn.id)}
                      className={`w-full flex items-center gap-md px-md py-3 rounded-lg border transition-all ${settingsTab === btn.id
                        ? 'bg-white dark:bg-slate-800 text-primary dark:text-primary-fixed-dim font-bold shadow-xs border-outline-variant dark:border-slate-700'
                        : 'bg-transparent text-on-surface-variant dark:text-slate-400 border-transparent hover:bg-surface-container dark:hover:bg-slate-900/50'
                        }`}
                    >
                      <span className="material-symbols-outlined">{btn.icon}</span>
                      <span className="text-body-md font-body-md">{btn.label}</span>
                    </button>
                  ))}

                  <div className="pt-md mt-md border-t border-outline-variant dark:border-slate-800">
                    <p className="px-md mb-sm text-[10px] text-outline dark:text-slate-400 font-bold uppercase tracking-widest">Admin Controls</p>
                    <button
                      onClick={() => setSettingsTab('management')}
                      className={`w-full flex items-center gap-md px-md py-3 rounded-lg border transition-all ${settingsTab === 'management'
                        ? 'bg-white dark:bg-slate-800 text-primary dark:text-primary-fixed-dim font-bold shadow-xs border-outline-variant dark:border-slate-700'
                        : 'bg-transparent text-on-surface-variant dark:text-slate-400 border-transparent hover:bg-surface-container dark:hover:bg-slate-900/50'
                        }`}
                    >
                      <span className="material-symbols-outlined">manage_accounts</span>
                      <span className="text-body-md font-body-md">User Management</span>
                    </button>
                  </div>
                </nav>

                {/* Settings Details Canvas Panels (9 cols) */}
                <div className="col-span-12 lg:col-span-9 space-y-gutter">

                  {/* Pane Profile */}
                  {settingsTab === 'profile' && (
                    <div className="space-y-gutter animate-in fade-in duration-200">

                      {/* Personal physician card */}
                      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-md mb-lg">
                          <div className="flex flex-col sm:flex-row gap-lg items-center text-center sm:text-left">
                            <div className="relative group cursor-pointer">
                              <img
                                className="w-24 h-24 rounded-xl border border-outline-variant dark:border-slate-700 object-cover"
                                alt="Dr. Julian Reed portrait"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgDdkNPSPv2lbk-3io6wmPK00Xyx2_g2Ty273agQuBiThZ2vKscJ2S87oDY87aYlPiee1VNVtH8gmtafIGJtyPYDTA-eDCl9f_-mziOpUJ8OAihbnpOueSr-h8HCm1hdQI85szzkllnuoBLKTKt7h5cZ-_Hd05THVIk9R_XZdLVIdE47Ywuiby3srajUGQFNlAWoAqpWEUTlQF0wfptp26HR2VMhmxCuMuRo3LB3UgP9gRHT-99Y3k"
                              />
                              <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-white">edit</span>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">Dr. Julian Reed</h3>
                              <p className="text-body-md text-on-surface-variant dark:text-slate-400">License: #MD-80419-RE</p>
                              <span className="inline-block mt-sm bg-primary-fixed text-primary dark:text-teal-900 px-sm py-xs rounded text-body-sm font-bold border border-primary/10">
                                Attending Physician
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => alert('Sửa thông tin tài khoản')}
                            className="border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim px-md py-sm rounded font-label-md text-label-md hover:bg-primary-fixed/20 transition-colors w-full sm:w-auto"
                          >
                            Edit Profile
                          </button>
                        </div>

                        {/* Fields details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg pt-lg border-t border-outline-variant dark:border-slate-700">
                          <div className="space-y-base">
                            <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">Full Legal Name</label>
                            <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                              Julian Reed, MD
                            </p>
                          </div>

                          <div className="space-y-base">
                            <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">Primary Email</label>
                            <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                              j.reed@medcore.emr
                            </p>
                          </div>

                          <div className="space-y-base">
                            <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">Specialty</label>
                            <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                              Cardiology & Electrophysiology
                            </p>
                          </div>

                          <div className="space-y-base">
                            <label className="text-label-md font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">Department</label>
                            <p className="text-body-md font-medium px-md py-sm bg-slate-50 dark:bg-slate-900 rounded border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200">
                              Cardiac ICU Wing
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Preferences Toggles */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">

                        {/* Appearance Block */}
                        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                          <h4 className="text-headline-md font-headline-md text-on-surface dark:text-white mb-md">Appearance</h4>
                          <div className="space-y-md">

                            <div className="flex items-center justify-between">
                              <span className="text-body-md text-on-surface dark:text-slate-200">Dark Mode</span>
                              <div
                                onClick={handleToggleDark}
                                className={`w-12 h-6 rounded-full relative cursor-pointer border transition-all ${settingsDark
                                  ? 'bg-primary-container border-primary'
                                  : 'bg-surface-container border-outline-variant dark:border-slate-600'
                                  }`}
                              >
                                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all bg-white ${settingsDark ? 'right-1' : 'left-1 bg-outline dark:bg-slate-400'
                                  }`}></div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-body-md text-on-surface dark:text-slate-200">High Contrast Mode</span>
                              <div
                                onClick={() => setSettingsContrast(!settingsContrast)}
                                className={`w-12 h-6 rounded-full relative cursor-pointer border transition-all ${settingsContrast
                                  ? 'bg-primary-container border-primary'
                                  : 'bg-surface-container border-outline-variant dark:border-slate-600'
                                  }`}
                              >
                                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all bg-white ${settingsContrast ? 'right-1' : 'left-1 bg-outline dark:bg-slate-400'
                                  }`}></div>
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Workflow Block */}
                        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                          <h4 className="text-headline-md font-headline-md text-on-surface dark:text-white mb-md">Workflow</h4>
                          <div className="space-y-md">

                            <div className="flex items-center justify-between">
                              <span className="text-body-md text-on-surface dark:text-slate-200">Auto-lock Screen (15m)</span>
                              <div
                                onClick={() => setSettingsLock(!settingsLock)}
                                className={`w-12 h-6 rounded-full relative cursor-pointer border transition-all ${settingsLock
                                  ? 'bg-primary-container border-primary'
                                  : 'bg-surface-container border-outline-variant dark:border-slate-600'
                                  }`}
                              >
                                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all bg-white ${settingsLock ? 'right-1' : 'left-1 bg-outline dark:bg-slate-400'
                                  }`}></div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-body-md text-on-surface dark:text-slate-200">Compact Table View</span>
                              <div
                                onClick={() => setSettingsCompact(!settingsCompact)}
                                className={`w-12 h-6 rounded-full relative cursor-pointer border transition-all ${settingsCompact
                                  ? 'bg-primary-container border-primary'
                                  : 'bg-surface-container border-outline-variant dark:border-slate-600'
                                  }`}
                              >
                                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all bg-white ${settingsCompact ? 'right-1' : 'left-1 bg-outline dark:bg-slate-400'
                                  }`}></div>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>

                    </div>
                  )}

                  {/* Pane Security */}
                  {settingsTab === 'security' && (
                    <div className="space-y-gutter animate-in fade-in duration-200">

                      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                        <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white mb-lg">Security &amp; Authentication</h3>

                        <div className="space-y-lg">

                          <div className="flex flex-col sm:flex-row items-center justify-between p-md bg-slate-50 dark:bg-slate-900 rounded-lg border border-outline-variant dark:border-slate-700 gap-md">
                            <div className="flex items-center gap-md self-start sm:self-center">
                              <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">password</span>
                              </div>
                              <div>
                                <p className="text-body-md font-bold text-on-surface dark:text-white">Password Management</p>
                                <p className="text-body-sm text-on-surface-variant dark:text-slate-400">Last changed 42 days ago</p>
                              </div>
                            </div>
                            <button
                              onClick={() => alert('Thay đổi mật khẩu tài khoản')}
                              className="bg-primary hover:bg-primary-container text-white px-md py-sm rounded font-label-md text-label-md w-full sm:w-auto transition-colors"
                            >
                              Change Password
                            </button>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between p-md bg-slate-50 dark:bg-slate-900 rounded-lg border border-outline-variant dark:border-slate-700 gap-md">
                            <div className="flex items-center gap-md self-start sm:self-center">
                              <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-on-secondary-container">
                                <span className="material-symbols-outlined">vibration</span>
                              </div>
                              <div>
                                <p className="text-body-md font-bold text-on-surface dark:text-white">Two-Factor Authentication (2FA)</p>
                                <p className="text-body-sm text-secondary dark:text-teal-400 font-medium">Status: ACTIVE</p>
                              </div>
                            </div>
                            <button
                              onClick={() => alert('Vô hiệu hóa xác minh hai bước 2FA')}
                              className="text-error font-label-md text-label-md hover:bg-error-container/20 px-md py-sm rounded w-full sm:w-auto transition-colors"
                            >
                              Disable 2FA
                            </button>
                          </div>

                        </div>
                      </div>

                      {/* Active sessions list */}
                      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                        <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white mb-lg">Active Sessions</h3>

                        <div className="overflow-x-auto rounded-lg border border-outline-variant dark:border-slate-700">
                          <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead className="bg-surface-container dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-350">
                              <tr>
                                <th className="px-md py-sm text-label-md font-bold uppercase">Device</th>
                                <th className="px-md py-sm text-label-md font-bold uppercase">Location</th>
                                <th className="px-md py-sm text-label-md font-bold uppercase">Time</th>
                                <th className="px-md py-sm text-label-md font-bold uppercase text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="text-body-sm text-on-surface dark:text-slate-200 divide-y divide-outline-variant dark:divide-slate-700">
                              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                                <td className="px-md py-sm font-semibold">MedCore Terminal (Ward 4B)</td>
                                <td className="px-md py-sm">City General Hospital</td>
                                <td className="px-md py-sm font-data-mono">Current Session</td>
                                <td className="px-md py-sm text-right"><button disabled className="text-outline dark:text-slate-500 font-bold opacity-30">Active</button></td>
                              </tr>
                              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                                <td className="px-md py-sm font-semibold">iPhone 15 Pro (Mobile App)</td>
                                <td className="px-md py-sm">Chicago, IL</td>
                                <td className="px-md py-sm font-data-mono">2h 15m ago</td>
                                <td className="px-md py-sm text-right">
                                  <button onClick={() => alert('Revoked session on iPhone')} className="text-primary dark:text-primary-fixed-dim hover:underline">Revoke</button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Pane Management */}
                  {settingsTab === 'management' && (
                    <div className="space-y-gutter animate-in fade-in duration-200">

                      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-md mb-lg">
                          <div>
                            <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">Administrative User Management</h3>
                            <p className="text-body-md text-on-surface-variant dark:text-slate-400">Control access rights and system permissions for hospital staff.</p>
                          </div>
                          <button
                            onClick={() => {
                              const name = prompt('Nhập tên nhân viên mới:');
                              if (!name) return;
                              const email = prompt('Nhập email:');
                              const role = prompt('Nhập chức vụ/vai trò:') || 'General Practitioner';
                              const newStaff = {
                                id: staffList.length + 1,
                                name,
                                email: email || `${name.toLowerCase().replace(/\s+/g, '')}@hospital.com`,
                                role,
                                status: 'Active',
                                lastLogin: 'Just now',
                                initials: name.split(' ').map(x => x[0]).join('').toUpperCase().slice(0, 2)
                              };
                              setStaffList([...staffList, newStaff]);
                            }}
                            className="bg-primary hover:bg-primary-container text-white px-lg py-sm rounded-lg flex items-center justify-center gap-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-[0.98] w-full sm:w-auto"
                          >
                            <span className="material-symbols-outlined">person_add</span>
                            Add New Provider
                          </button>
                        </div>

                        {/* Staff filters row */}
                        <div className="flex flex-wrap gap-md mb-md">
                          {['All', 'Doctors', 'Nursing', 'Admin'].map(role => {
                            const isAct = staffRoleFilter === role;
                            return (
                              <button
                                key={role}
                                onClick={() => setStaffRoleFilter(role)}
                                className={`px-md py-1.5 rounded-full text-label-md font-bold transition-colors ${isAct
                                  ? 'bg-primary-container text-primary dark:text-white'
                                  : 'bg-surface-container dark:bg-slate-700 text-on-surface-variant dark:text-slate-350 hover:bg-surface-container-high'
                                  }`}
                              >
                                {role} ({role === 'All' ? staffList.length : role === 'Doctors' ? staffList.filter(x => x.role.toLowerCase().includes('specialist')).length : role === 'Nursing' ? staffList.filter(x => x.role.toLowerCase().includes('nurse')).length : staffList.filter(x => x.role.toLowerCase().includes('manager')).length})
                              </button>
                            );
                          })}
                        </div>

                        {/* Staff directory table */}
                        <div className="overflow-x-auto border border-outline-variant dark:border-slate-700 rounded-lg">
                          <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead className="bg-surface-container dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-300">
                              <tr>
                                <th className="px-md py-sm text-label-md font-bold uppercase">User</th>
                                <th className="px-md py-sm text-label-md font-bold uppercase">Role</th>
                                <th className="px-md py-sm text-label-md font-bold uppercase">Status</th>
                                <th className="px-md py-sm text-label-md font-bold uppercase">Last Login</th>
                                <th className="px-md py-sm text-label-md font-bold uppercase text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="text-body-sm text-on-surface dark:text-slate-200 divide-y divide-outline-variant dark:divide-slate-700">
                              {filteredStaff.map((staff) => (
                                <tr key={staff.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                                  <td className="px-md py-sm">
                                    <div className="flex items-center gap-sm">
                                      <div className="w-8 h-8 rounded-full bg-surface-container-high dark:bg-slate-700 flex items-center justify-center font-bold text-primary dark:text-primary-fixed-dim">
                                        {staff.initials}
                                      </div>
                                      <div>
                                        <p className="font-bold">{staff.name}</p>
                                        <p className="text-[11px] text-outline dark:text-slate-400">{staff.email}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-md py-sm font-semibold">{staff.role}</td>
                                  <td className="px-md py-sm">
                                    {staff.status === 'Active' ? (
                                      <span className="bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400 px-sm py-0.5 rounded-full text-xs font-bold border border-green-500/10">Active</span>
                                    ) : (
                                      <span className="bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-400 px-sm py-0.5 rounded-full text-xs font-bold border border-slate-600/10">Suspended</span>
                                    )}
                                  </td>
                                  <td className="px-md py-sm font-data-mono">{staff.lastLogin}</td>
                                  <td className="px-md py-sm text-right">
                                    <button
                                      onClick={() => alert(`Chỉnh sửa quyền nhân viên: ${staff.name}`)}
                                      className="text-primary dark:text-primary-fixed-dim hover:bg-primary-fixed/20 p-1 rounded transition-colors"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        setStaffList(prev => prev.map(s => {
                                          if (s.id === staff.id) {
                                            return { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' };
                                          }
                                          return s;
                                        }));
                                      }}
                                      className="text-error hover:bg-error-container/20 p-1 rounded transition-colors ml-1"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">
                                        {staff.status === 'Active' ? 'block' : 'settings_backup_restore'}
                                      </span>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Pane Notifications */}
                  {settingsTab === 'notifications' && (
                    <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-xl text-center animate-in fade-in duration-200">
                      <span className="material-symbols-outlined text-outline dark:text-slate-500 text-6xl mb-md">notifications_off</span>
                      <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">Notification Preferences</h3>
                      <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-sm mx-auto">This module is currently being optimized for high-volume clinical alerts. Please check back after the next system sync.</p>
                    </div>
                  )}

                  {/* Pane Hospital Info */}
                  {settingsTab === 'hospital' && (
                    <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-xl text-center animate-in fade-in duration-200">
                      <span className="material-symbols-outlined text-outline dark:text-slate-500 text-6xl mb-md">domain_disabled</span>
                      <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">Hospital Information</h3>
                      <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-sm mx-auto">Central records management is currently read-only. Contact System Administration for updates to facility branding or compliance data.</p>
                    </div>
                  )}

                </div>

              </div>
            </>
          )}

          {/* Simple Placeholders for other tabs */}
          {activeTab !== 'Dashboard' && activeTab !== 'Patients' && activeTab !== 'Appointments' && activeTab !== 'Lab Results' && activeTab !== 'Pharmacy' && activeTab !== 'Settings' && (
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
