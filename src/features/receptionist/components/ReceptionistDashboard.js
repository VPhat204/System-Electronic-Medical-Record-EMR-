import React, { useState, useEffect } from 'react';
import ReceptionistDashboardTab from '../pages/Dashboard/ReceptionistDashboardTab';
import ReceptionistPatientsTab from '../pages/Patients/ReceptionistPatientsTab';
import ReceptionistAppointmentsTab from '../pages/Appointments/ReceptionistAppointmentsTab';
import ReceptionistBillingTab from '../pages/Billing/ReceptionistBillingTab';
import ReceptionistSettingsTab from '../pages/Settings/ReceptionistSettingsTab';

const translations = {
  vi: {
    dashboard: 'Bảng điều khiển',
    patients: 'Danh sách bệnh nhân',
    appointments: 'Quản lý lịch hẹn',
    labResults: 'Kết quả xét nghiệm',
    billing: 'Quản lý thanh toán',
    pharmacy: 'Quầy thuốc',
    settings: 'Cài đặt hệ thống',
    newConsultation: 'Khám lâm sàng mới',
    receptionistDashboard: 'Bảng điều khiển Lễ tân',
    centralAdmissionsBilling: 'Khu trung tâm - Đón tiếp & Thanh toán',
    newPatientCheckin: 'Đăng ký Khám mới',
    processPayment: 'Thanh toán viện phí',
    activeWaitingQueue: 'Hàng đợi Bệnh nhân Chờ khám',
    allDepts: 'Tất cả khoa phòng',
    patientName: 'Tên bệnh nhân',
    dept: 'Khoa chuyên môn',
    waitTime: 'Thời gian chờ',
    status: 'Trạng thái',
    action: 'Hành động',
    assignRoom: 'Gán phòng bệnh',
    billingInsurance: 'Thanh toán & Bảo hiểm',
    pendingBills: 'Hóa đơn chưa thanh toán',
    unverifiedInsurance: 'Bảo hiểm chưa xác thực',
    recentInsuranceTasks: 'Công việc Bảo hiểm gần đây',
    verify: 'XÁC THỰC',
    appeal: 'KHIẾU NẠI',
    wardAvailability: 'Trạng thái giường bệnh Khoa 4-A',
    occupied: 'Đang nằm điều trị',
    available: 'Giường trống',
    cleaning: 'Đang vệ sinh',
    patientCheckinPortal: 'Cổng tiếp đón Bệnh nhân',
    registerNewReturning: 'Đăng ký khám mới hoặc tiếp đón bệnh nhân cũ',
    returning: 'Bệnh nhân cũ',
    newPatient: 'Bệnh nhân mới',
    searchLabel: 'Tên bệnh nhân đăng ký',
    searchPlaceholder: 'Tìm kiếm nhanh...',
    appointmentType: 'Loại hình khám',
    validateEntry: 'Xác thực & Tiếp đón',
    scanQrCode: 'Quét mã QR Code',
    scanQrSub: 'Đón tiếp nhanh qua ứng dụng di động bệnh nhân',
    biometricId: 'Xác thực Sinh trắc học',
    biometricSub: 'Xác minh danh tính nhanh qua vân tay',
    kioskSupport: 'Hỗ trợ Kiosk',
    kioskSub: 'Lượt tiếp đón đang hoạt động tại Kiosk sảnh (3)',
    systemOnline: 'Hệ thống Trực tuyến',
    lastSync: 'Đồng bộ lần cuối: Vừa xong',
    viewAllBilling: 'Xem tất cả hồ sơ thanh toán →',
    assignRoomTitle: 'Gán phòng & giường bệnh',
    selectBedFor: 'Chọn giường trống cho bệnh nhân: ',
    confirm: 'Xác nhận',
    cancel: 'Hủy',
    roomAssignedSuccess: 'Đã gán phòng thành công cho bệnh nhân!',
    noPatientsInQueue: 'Không có bệnh nhân nào trong hàng đợi.',
    emergencyAdmission: 'Tiếp đón Cấn cấp STAT',
    frontDeskLead: 'Trưởng nhóm Lễ tân',
    admissionsLead: 'Trưởng Ban Đón tiếp',
    searchAriaLabel: 'Tìm kiếm bệnh nhân hoặc giường bệnh...',
    helpCenter: 'Trợ giúp',
    signOut: 'Đăng xuất',
    clinicalPortal: 'Cổng Đón tiếp',

    // Patients tab translations
    patientsTitle: 'Danh sách bệnh nhân',
    patientsSubtitle: 'Quản lý hồ sơ hành chính và lịch sử tiếp nhận.',
    checkinHistory: 'Lịch sử Check-in',
    updateInsurance: 'Cập nhật Bảo hiểm',
    registerNewPatientBtn: 'Đăng ký bệnh nhân mới',
    totalPatients: 'Tổng số bệnh nhân',
    trendingUp: '+12% tháng này',
    checkinToday: 'Check-in hôm nay',
    newPatientsCount: '8 bệnh nhân mới',
    expiredInsurance: 'Bảo hiểm hết hạn',
    needUrgentUpdate: 'Cần cập nhật gấp',
    appointmentsToday: 'Hẹn trong ngày',
    punctualityRate: '92% tỷ lệ đúng giờ',
    searchPatientPlaceholder: 'Tên, ID hoặc SĐT...',
    allInsurance: 'Tất cả bảo hiểm',
    activeInsurance: 'Còn hiệu lực',
    expiredInsuranceFilter: 'Hết hạn',
    pendingVerification: 'Chờ xác minh',
    noInsurance: 'Không có',
    showingRecords: 'Hiển thị {start}-{end} của {total}',
    fullName: 'HỌ VÀ TÊN',
    patientID: 'ID BỆNH NHÂN',
    phoneNumber: 'SỐ ĐIỆN THOẠI',
    insuranceStatus: 'TRẠNG THÁI BẢO HIỂM',
    lastVisit: 'LẦN KHÁM CUỐI',
    actions: 'HÀNH ĐỘNG',
    showingTotalPatientsCount: 'Hiển thị {count} trên {total} bệnh nhân',
    genderLabel: 'Giới tính',
    ageLabel: 'Tuổi',
    addNewPatientTitle: 'Thêm Bệnh nhân Mới',
    phoneLabel: 'Số điện thoại',
    insuranceLabel: 'Trạng thái bảo hiểm',
    lastVisitLabel: 'Lần khám cuối',
    addSuccess: 'Đã thêm bệnh nhân mới thành công!',
    checkInSuccessPat: 'Đã check-in thành công cho bệnh nhân {name} và thêm vào hàng đợi chờ khám!',
    alreadyInQueue: 'Bệnh nhân này đã có tên trong hàng đợi chờ khám!',

    // Appointments tab translations
    appointmentsTitle: 'Quản lý Lịch hẹn',
    appointmentsTodayLabel: 'Hôm nay: Thứ Hai, 24 Tháng 5, 2024',
    dayTab: 'Ngày',
    weekTab: 'Tuần',
    monthTab: 'Tháng',
    yearTab: 'Năm',
    timeHeader: 'GIỜ',
    appointmentsListHeader: 'LỊCH HẸN TRONG NGÀY',
    inRoom: 'Trong phòng',
    completed: 'Hoàn tất',
    waitingAppt: 'Đang chờ',
    bookAppointmentAction: 'Book Appointment',
    printSlip: 'In phiếu hẹn',
    quickBookHeader: 'Đặt lịch nhanh',
    cancelReschedule: 'Hủy/Dời lịch',
    patientTypeLabel: 'Loại bệnh nhân',
    newPatRadio: 'Mới',
    returningPatRadio: 'Quay lại',
    patientNameField: 'Họ tên Bệnh nhân',
    patientNamePlaceholder: 'Nhập tên...',
    phoneNumberField: 'Số điện thoại',
    appointmentDateField: 'Ngày hẹn',
    specialtyDoctorField: 'Chuyên khoa / Bác sĩ',
    confirmBookingBtn: 'Xác nhận Đặt lịch',
    doctorsClinicsHeader: 'Bác sĩ & Phòng khám',
    availableStatus: 'Trống',
    busyStatus: 'Bận',
    roomText: 'Phòng',
    priorityStatus: 'Ưu tiên',
    checkedInStatus: 'Đã check-in',
    apptTimeField: 'Giờ hẹn',
    apptDoctorSelectError: 'Vui lòng chọn bác sĩ phù hợp!',

    // Billing tab translations
    billingTitle: 'Quản Lý Thanh Toán',
    billingSubtitle: 'Theo dõi và xử lý các giao dịch tài chính tại phòng khám.',
    exportInvoiceBtn: 'Xuất Hóa Đơn',
    newPaymentBtn: 'Thanh toán Mới',
    pendingInvoiceLabel: 'Hóa đơn chờ',
    pendingInsuranceLabel: 'Chờ Bảo Hiểm',
    dailyRevenueLabel: 'Doanh thu ngày',
    completionRateLabel: 'Tỉ lệ hoàn tất',
    pendingInvoicesSection: 'Hóa đơn chờ xử lý',
    allTab: 'Tất cả',
    unpaidTab: 'Chưa thanh toán',
    insuranceTab: 'Bảo hiểm',
    patientCol: 'BỆNH NHÂN',
    serviceCol: 'DỊCH VỤ',
    totalCol: 'TỔNG TIỀN',
    statusCol: 'TRẠNG THÁI',
    insuranceCol: 'BẢO HIỂM',
    showingInvoicesText: 'Hiển thị {count} trên {total} hóa đơn',
    processPaymentHeader: 'Xử lý thanh toán',
    selectedInvoiceLabel: 'Đang chọn hóa đơn:',
    changeBtn: 'Thay đổi',
    examFeeText: 'Phí khám',
    labFeeText: 'Xét nghiệm',
    discountLabel: 'Giảm giá',
    methodLabel: 'Phương thức',
    cashOption: 'Tiền mặt',
    transferOption: 'Chuyển khoản',
    cardOption: 'Thẻ (POS)',
    totalLabel: 'Tổng cộng',
    confirmPaymentBtn: 'Xác Nhận Thanh Toán',
    applyDiscountBtn: 'Áp Dụng Mã Giảm Giá',
    recentHistoryHeader: 'Lịch sử vừa xong',
    unpaidStatus: 'Chưa trả',
    pendingBhStatus: 'Đang chờ BH',
    completedStatus: 'Hoàn tất',
    overdueStatus: 'Quá hạn',
    individualText: 'Cá nhân',
    supportText: 'Hỗ trợ',
    billingSearchPlaceholder: 'Tìm kiếm hóa đơn hoặc bệnh nhân...',
    printVATSuccess: 'Đã in lại thành công hóa đơn giá trị gia tăng (VAT)!',

    // Settings tab translations
    settingsTitle: 'Cài đặt hệ thống',
    settingsSearchPlaceholder: 'Tìm kiếm cài đặt...',
    settingsSubtitle: 'Workspace configuration and profile management.',
    empCodeLabel: 'MÃ NHÂN VIÊN',
    facilityLabel: 'CƠ SỞ',
    languageLabel: 'Ngôn ngữ',
    vietnameseLabel: 'Tiếng Việt',
    englishLabel: 'English (US)',
    notificationConfigHeader: 'Cấu hình thông báo',
    newRegAlertTitle: 'Đăng ký mới',
    newRegAlertDesc: 'Nhận thông báo khi có bệnh nhân mới đăng ký tại quầy hoặc trực tuyến.',
    paymentAlertTitle: 'Cảnh báo thanh toán',
    paymentAlertDesc: 'Thông báo ngay khi giao dịch thanh toán viện phí thành công hoặc bị lỗi.',
    apptAlertTitle: 'Thay đổi lịch hẹn',
    apptAlertDesc: 'Cập nhật khi bác sĩ hoặc bệnh nhân dời lịch khám đột xuất.',
    emergencyAlertTitle: 'Cấp cứu (Bắt buộc)',
    emergencyAlertDesc: 'Cảnh báo hệ thống ưu tiên cao nhất. Không thể tắt để đảm bảo an toàn.',
    workspacePrefsHeader: 'Không gian làm việc',
    queueDisplayModeLabel: 'Chế độ hiển thị hàng đợi',
    listViewOption: 'Danh sách',
    gridViewOption: 'Ô lưới',
    splitViewOption: 'Chia màn hình',
    autoRefreshLabel: 'Làm mới tự động',
    autoRefreshDesc: 'Cập nhật dữ liệu hàng đợi sau mỗi 30 giây.',
    soundNotifyLabel: 'Âm thanh thông báo',
    soundNotifyDesc: 'Phát âm thanh nhẹ khi có bệnh nhân mới đến.',
    cancelBtn: 'Hủy bỏ',
    saveChangesBtn: 'Lưu thay đổi',
    saveSuccessMsg: 'Đã lưu cấu hình cài đặt hệ thống thành công!'
  },
  en: {
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    labResults: 'Lab Results',
    billing: 'Billing',
    pharmacy: 'Pharmacy',
    settings: 'Settings',
    newConsultation: 'New Consultation',
    receptionistDashboard: 'Receptionist Dashboard',
    centralAdmissionsBilling: 'Central Wing - Admissions & Billing',
    newPatientCheckin: 'New Patient Check-in',
    processPayment: 'Process Payment',
    activeWaitingQueue: 'Active Waiting Queue',
    allDepts: 'All Depts',
    patientName: 'Patient Name',
    dept: 'Dept',
    waitTime: 'Wait Time',
    status: 'Status',
    action: 'Action',
    assignRoom: 'Assign Room',
    billingInsurance: 'Billing & Insurance',
    pendingBills: 'Pending Bills',
    unverifiedInsurance: 'Unverified Insurance',
    recentInsuranceTasks: 'Recent Insurance Tasks',
    verify: 'VERIFY',
    appeal: 'APPEAL',
    wardAvailability: 'Ward 4-A Room Availability',
    occupied: 'Occupied',
    available: 'Available',
    cleaning: 'Cleaning',
    patientCheckinPortal: 'Patient Check-in Portal',
    registerNewReturning: 'Register new patients or check-in returning visitors',
    returning: 'Returning',
    newPatient: 'New Patient',
    searchLabel: 'Registered Patient Name',
    searchPlaceholder: 'Quick search...',
    appointmentType: 'Appointment Type',
    validateEntry: 'Validate Entry',
    scanQrCode: 'Scan QR Code',
    scanQrSub: 'Instant mobile check-in via patient app',
    biometricId: 'Biometric ID',
    biometricSub: 'Fast identity verification using touch sensor',
    kioskSupport: 'Kiosk Support',
    kioskSub: 'Active sessions at lobby terminals (3)',
    systemOnline: 'System Online',
    lastSync: 'Last Sync: Just Now',
    viewAllBilling: 'View All Billing Records →',
    assignRoomTitle: 'Assign Room & Bed',
    selectBedFor: 'Select an available bed for: ',
    confirm: 'Confirm',
    cancel: 'Cancel',
    roomAssignedSuccess: 'Successfully assigned room to patient!',
    noPatientsInQueue: 'No patients in the waiting queue.',
    emergencyAdmission: 'Emergency Admission STAT',
    frontDeskLead: 'Front Desk Lead',
    admissionsLead: 'Admissions Lead',
    searchAriaLabel: 'Global patient or bed search...',
    helpCenter: 'Help Center',
    signOut: 'Sign Out',
    clinicalPortal: 'Admissions Portal',

    // Patients tab translations
    patientsTitle: 'Patient List',
    patientsSubtitle: 'Manage administrative profiles and admissions history.',
    checkinHistory: 'Check-in History',
    updateInsurance: 'Update Insurance',
    registerNewPatientBtn: 'Register New Patient',
    totalPatients: 'Total Patients',
    trendingUp: '+12% this month',
    checkinToday: 'Check-in Today',
    newPatientsCount: '8 new patients',
    expiredInsurance: 'Expired Insurance',
    needUrgentUpdate: 'Needs urgent update',
    appointmentsToday: 'Appointments Today',
    punctualityRate: '92% punctuality rate',
    searchPatientPlaceholder: 'Name, ID or phone...',
    allInsurance: 'All insurance',
    activeInsurance: 'Active',
    expiredInsuranceFilter: 'Expired',
    pendingVerification: 'Pending verification',
    noInsurance: 'None',
    showingRecords: 'Showing {start}-{end} of {total}',
    fullName: 'FULL NAME',
    patientID: 'PATIENT ID',
    phoneNumber: 'PHONE NUMBER',
    insuranceStatus: 'INSURANCE STATUS',
    lastVisit: 'LAST VISIT',
    actions: 'ACTIONS',
    showingTotalPatientsCount: 'Showing {count} of {total} patients',
    genderLabel: 'Gender',
    ageLabel: 'Age',
    addNewPatientTitle: 'Add New Patient',
    phoneLabel: 'Phone number',
    insuranceLabel: 'Insurance status',
    lastVisitLabel: 'Last visit',
    addSuccess: 'Successfully registered new patient!',
    checkInSuccessPat: 'Successfully checked in {name} and added them to the waiting queue!',
    alreadyInQueue: 'This patient is already in the waiting queue!',

    // Appointments tab translations
    appointmentsTitle: 'Appointments Directory',
    appointmentsTodayLabel: 'Today: Monday, May 24, 2024',
    dayTab: 'Day',
    weekTab: 'Week',
    monthTab: 'Month',
    yearTab: 'Year',
    timeHeader: 'TIME',
    appointmentsListHeader: 'TODAY\'S APPOINTMENTS',
    inRoom: 'In Room',
    completed: 'Completed',
    waitingAppt: 'Waiting',
    bookAppointmentAction: 'Book Appointment',
    printSlip: 'Print Slip',
    quickBookHeader: 'Quick Booking',
    cancelReschedule: 'Cancel/Reschedule',
    patientTypeLabel: 'Patient Type',
    newPatRadio: 'New',
    returningPatRadio: 'Returning',
    patientNameField: 'Patient Name',
    patientNamePlaceholder: 'Enter name...',
    phoneNumberField: 'Phone number',
    appointmentDateField: 'Date',
    specialtyDoctorField: 'Specialty / Doctor',
    confirmBookingBtn: 'Confirm Booking',
    doctorsClinicsHeader: 'Doctors & Clinics',
    availableStatus: 'Available',
    busyStatus: 'Busy',
    roomText: 'Room',
    priorityStatus: 'Priority',
    checkedInStatus: 'Checked-in',
    apptTimeField: 'Time Slot',
    apptDoctorSelectError: 'Please select a valid doctor!',

    // Billing tab translations
    billingTitle: 'Billing Management',
    billingSubtitle: 'Track and process clinic financial transactions.',
    exportInvoiceBtn: 'Export Invoice',
    newPaymentBtn: 'New Payment',
    pendingInvoiceLabel: 'Pending Invoices',
    pendingInsuranceLabel: 'Pending Insurance',
    dailyRevenueLabel: 'Daily Revenue',
    completionRateLabel: 'Completion Rate',
    pendingInvoicesSection: 'Invoices Awaiting Processing',
    allTab: 'All',
    unpaidTab: 'Unpaid',
    insuranceTab: 'Insurance',
    patientCol: 'PATIENT',
    serviceCol: 'SERVICE',
    totalCol: 'TOTAL AMOUNT',
    statusCol: 'STATUS',
    insuranceCol: 'INSURANCE',
    showingInvoicesText: 'Showing {count} of {total} invoices',
    processPaymentHeader: 'Process Payment',
    selectedInvoiceLabel: 'Selected Invoice:',
    changeBtn: 'Change',
    examFeeText: 'Consultation fee',
    labFeeText: 'Laboratory test',
    discountLabel: 'Discount',
    methodLabel: 'Method',
    cashOption: 'Cash',
    transferOption: 'Bank Transfer',
    cardOption: 'Card (POS)',
    totalLabel: 'Total',
    confirmPaymentBtn: 'Confirm Payment',
    applyDiscountBtn: 'Apply Discount',
    recentHistoryHeader: 'Recent Activities',
    unpaidStatus: 'Unpaid',
    pendingBhStatus: 'Awaiting Ins',
    completedStatus: 'Completed',
    overdueStatus: 'Overdue',
    individualText: 'Individual',
    supportText: 'Co-pay',
    billingSearchPlaceholder: 'Search invoice or patient...',
    printVATSuccess: 'Successfully printed VAT invoice copy!',

    // Settings tab translations
    settingsTitle: 'System Settings',
    settingsSearchPlaceholder: 'Search settings...',
    settingsSubtitle: 'Workspace configuration and profile management.',
    empCodeLabel: 'EMPLOYEE CODE',
    facilityLabel: 'FACILITY',
    languageLabel: 'Language',
    vietnameseLabel: 'Vietnamese',
    englishLabel: 'English (US)',
    notificationConfigHeader: 'Notification Configurations',
    newRegAlertTitle: 'New Registration',
    newRegAlertDesc: 'Receive alerts when new patients register at front desk or online.',
    paymentAlertTitle: 'Payment Alerts',
    paymentAlertDesc: 'Get notified immediately upon payment transaction completion or error.',
    apptAlertTitle: 'Appointment Updates',
    apptAlertDesc: 'Updates when doctor or patient reschedules appointments.',
    emergencyAlertTitle: 'Emergency (Mandatory)',
    emergencyAlertDesc: 'Highest priority system warnings. Locked to ensure safety.',
    workspacePrefsHeader: 'Workspace Preferences',
    queueDisplayModeLabel: 'Queue Display Mode',
    listViewOption: 'List View',
    gridViewOption: 'Grid View',
    splitViewOption: 'Split Screen',
    autoRefreshLabel: 'Auto Refresh',
    autoRefreshDesc: 'Update waiting queue database every 30 seconds.',
    soundNotifyLabel: 'Sound Alert',
    soundNotifyDesc: 'Chime when new patients are added.',
    cancelBtn: 'Cancel',
    saveChangesBtn: 'Save changes',
    saveSuccessMsg: 'System configurations successfully saved!'
  }
};

const initialQueue = [
  { id: 1, name: 'Sarah Jenkins', mrn: '#BN-8921-X', department: 'Cardiology', waitTime: '42 mins', status: 'Delayed' },
  { id: 2, name: 'Robert Miller', mrn: '#BN-4432-Z', department: 'General Med', waitTime: '15 mins', status: 'Normal' },
  { id: 3, name: 'Eleanor Rigby', mrn: '#BN-1109-M', department: 'Orthopedics', waitTime: '5 mins', status: 'Checking In' },
  { id: 4, name: 'Marco Verratti', mrn: '#BN-990-11', department: 'Neurology', waitTime: '28 mins', status: 'Normal' }
];

const initialBeds = [
  { id: '401A', status: 'Occupied' },
  { id: '401B', status: 'Available' },
  { id: '402A', status: 'Occupied' },
  { id: '402B', status: 'Cleaning' },
  { id: '403A', status: 'Occupied' },
  { id: '403B', status: 'Occupied' },
  { id: '404A', status: 'Available' },
  { id: '404B', status: 'Available' },
  { id: '405A', status: 'Occupied' },
  { id: '405B', status: 'Available' },
  { id: '406A', status: 'Occupied' },
  { id: '406B', status: 'Occupied' },
  { id: '407A', status: 'Available' },
  { id: '407B', status: 'Cleaning' },
  { id: '408A', status: 'Available' },
  { id: '408B', status: 'Available' }
];

const initialPatients = [
  { id: 101, name: 'Nguyễn Thị Mai', gender: 'Nữ', genderEn: 'Female', age: 45, mrn: '#BN-8921-X', phone: '090 123 4567', insurance: 'Còn hiệu lực', insuranceEn: 'Active', lastVisit: '12/10/2023', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOGtlepiWpiXD-VU0g6G0BEw3kmUlO5aHe1l5aWnh93frNRjjMq0JsYxCk9NMFqxJrnqGze_gRUZvolaYrwqnnaUEX8o_tOHcvu9dgrCwyplkJ3-xAFbL78W4RCoPgij8qhSWmdx0s0YE-EsfoenhzeEzAnMUOucnHdJrcFcXHoFp9MIyegD_hs2DxDSIWz3GrwG7lTDkZoIWDU62s__nwAmaOaBd_-ALplJudAG3-Z3DqStpYA2mQ' },
  { id: 102, name: 'Trần Văn Hoàng', gender: 'Nam', genderEn: 'Male', age: 29, mrn: '#BN-4432-Z', phone: '098 765 4321', insurance: 'Hết hạn', insuranceEn: 'Expired', lastVisit: '28/09/2023', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdk7RKynJuPbGbeHPVSUiLO9jkID5GwuDSux6xktM3kdCd3OZgbxj1pk0s_Yht5PUK0azTkSA8Sc5-GH47NiTQxdoMn-IGlO8zkB35-jCMHvxBzmxfwL-LPuU7rzs-o5738s0kcpQbFDn-k42vZkhKb4RAQMrUiCfXaY4k-eetc_Pssx5PNtJA49pUrzeBwUlE2gqqsvd2-VpEXSblJpm77-uc-F5XWCH8cGv_yZTqFL9aRdgASmcV' },
  { id: 103, name: 'Lê Thị Hoa', gender: 'Nữ', genderEn: 'Female', age: 72, mrn: '#BN-1109-M', phone: '091 445 8899', insurance: 'Chờ xác minh', insuranceEn: 'Pending Verification', lastVisit: 'Hôm nay', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9CL561PvtA4MuhF6j3O7IIr9QSA3Vv5biRRHqkjuHqEN2e1SnTril85B3qKA2RZBvqWls1MtV0bXmYp5tFXSQex_UNlSz7Rs-ue1ZOkxbyZNP6cMIV7OCg_rRDSBITy9aMZMfuLa7XEFgp8DoSXRaHQu5vdDc8SpdsWMapX-HR_AKgtZo14x0hI_P2xDPuswgSB6AdlfuSdSEqvj5vz3fRR6pOPSG1MzuOO_hL7tSvtsoWxrJQ5FF' },
  { id: 104, name: 'Phạm Minh Anh', gender: 'Nam', genderEn: 'Male', age: 10, mrn: '#BN-5567-K', phone: '093 332 1122', insurance: 'Còn hiệu lực', insuranceEn: 'Active', lastVisit: '05/11/2023', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqDHA1pUauiTC4nRme0Id5htSy9QruqxcO8A0WnMlC72QSDEGOrscdXf0zhfzF14rnHA81vZsD9vIMTVEN3Ag2NyGf69HA8GUxNBPD130H9ojwABJ_qTaJrdeDa6asyvT6GaNPW9jJx0tGUo6ywzSVNoG88Ihq2N-spzr0w78QSH3E23SopOIJTyPvQMssroew5CTw7V28ywT8IVx4o0Vn2OjmY0WiRtFbUrcLaO18789u4E587bi6' },
  { id: 105, name: 'Đỗ Kiến Quốc', gender: 'Nam', genderEn: 'Male', age: 64, mrn: '#BN-2298-L', phone: '097 111 2233', insurance: 'Không có', insuranceEn: 'None', lastVisit: '15/08/2023', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzobUnkkGOsgDOxK0q3wXodbSKpTirpneGp-PFaW5mUqTPRgnmr6FIJDxBejRglRn9c-IQTkJXOrSlNmvKbitEYtUVUbnaEofPCKf01tF-R8StPB7-3H4JtP06OHSpyFPRvMxJCsrsQwBXpW0jZVKV-5S3-dIyZhkkKIyDl1K6yzn1wmi-FJf8RMwYIcaHbStrsy1_2DsT58wRUCgQz4Jknn2xls1PAf8nSUlB82XOc3O_ML6BL9Lq' }
];

const initialAppointments = [
  { id: 201, name: 'Nguyễn Văn An', time: '08:15', date: '2024-05-24', type: 'Khám tổng quát', doctor: 'BS. Trần Hùng', status: 'Đã check-in', priority: false, durationMins: 45 },
  { id: 202, name: 'Lê Thị Bình', time: '09:30', date: '2024-05-24', type: 'Nha khoa', doctor: 'BS. Mỹ Linh', status: 'Đang chờ', priority: false, durationMins: 30 },
  { id: 203, name: 'Phạm Minh Tuấn', time: '11:00', date: '2024-05-24', type: 'Khám Tim mạch', doctor: 'BS. Hoàng Nam', status: 'Ưu tiên', priority: true, durationMins: 60 },
  { id: 204, name: 'Đặng Minh Khoa', time: '10:30', date: '2024-05-27', type: 'Khám mắt', doctor: 'BS. Mỹ Linh', status: 'Đang chờ', priority: false, durationMins: 30 },
  { id: 205, name: 'Nguyễn Thị Hà', time: '14:00', date: '2024-05-28', type: 'Khám nội tiết', doctor: 'BS. Hoàng Nam', status: 'Đã check-in', priority: false, durationMins: 45 },
  { id: 206, name: 'Trần Văn Long', time: '08:45', date: '2024-06-03', type: 'Khám thần kinh', doctor: 'BS. Trần Hùng', status: 'Đang chờ', priority: true, durationMins: 45 }
];

const initialInvoices = [
  { id: 401, patientName: 'Trần Thị Bích', mrn: 'BN-2023-4412', service: 'Khám tổng quát, Xét nghiệm máu', total: 1250000, status: 'Chưa trả', statusEn: 'Unpaid', insurance: 'N/A', fees: { exam: 500000, lab: 750000 } },
  { id: 402, patientName: 'Lê Văn Nam', mrn: 'BN-2023-8821', service: 'Siêu âm bụng, Thuốc điều trị', total: 850000, status: 'Đang chờ BH', statusEn: 'Awaiting Ins', insurance: 'Bảo Việt', fees: { exam: 300000, lab: 550000 } },
  { id: 403, patientName: 'Nguyễn Minh Quang', mrn: 'BN-2023-1029', service: 'Phẫu thuật nội soi, Hồi sức', total: 18400000, status: 'Chưa trả', statusEn: 'Unpaid', insurance: 'Hỗ trợ 80%', fees: { exam: 5400000, lab: 13000000 } },
  { id: 404, patientName: 'Phạm Hoàng Yến', mrn: 'BN-2023-9942', service: 'Tiêm chủng mở rộng', total: 450000, status: 'Hoàn tất', statusEn: 'Completed', insurance: 'Cá nhân', fees: { exam: 450000, lab: 0 } },
  { id: 405, patientName: 'Đặng Văn Khoa', mrn: 'BN-2023-2287', service: 'Kiểm tra thị lực', total: 200000, status: 'Quá hạn', statusEn: 'Overdue', insurance: 'N/A', fees: { exam: 200000, lab: 0 } }
];

export default function ReceptionistDashboard({ onNavigate, theme: propTheme, setTheme: propSetTheme }) {
  const [lang, setLang] = useState('vi'); // 'vi' or 'en'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [localTheme, setLocalTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const currentTheme = propTheme !== undefined ? propTheme : localTheme;
  const isDark = currentTheme === 'dark';

  const [activeTab, setActiveTab] = useState('Settings'); // Default to Settings as requested!

  // Receptionist States
  const [queue, setQueue] = useState(initialQueue);
  const [beds, setBeds] = useState(initialBeds);
  const [searchQuery, setSearchQuery] = useState('');

  // Patients Database State
  const [patients, setPatients] = useState(initialPatients);
  const [patientSearch, setPatientSearch] = useState('');
  const [insuranceFilter, setInsuranceFilter] = useState('Tất cả bảo hiểm');

  // Appointments Directory States
  const [appointments, setAppointments] = useState(initialAppointments);
  const [apptView, setApptView] = useState('day'); // 'day' | 'week' | 'month' | 'year'
  const [selectedDate, setSelectedDate] = useState(() => new Date('2024-05-24'));
  const [apptWaiting, setApptWaiting] = useState(12);
  const [apptInRoom, setApptInRoom] = useState(5);
  const [apptCompleted, setApptCompleted] = useState(28);

  const [doctorsList, setDoctorsList] = useState([
    { id: 301, name: 'BS. Trần Hùng', clinic: 'Phòng 102 - Nội tổng quát', status: 'Trống', statusEn: 'Available', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtWr4DtmR8B0_in-_gqoKoZVzPdHwgxOleFY_FKFj_wErPD6UsQQqs6ZJw0QdiIoDJYQ_2mCa4dsKrZ3q6b1B2LlP4_ySXqj2BuRPZy1UG3SMtAK1hgxGJPUTYE0t0MddfC2sT-A6WWGOMintZelgmuI-VNTxbHfHm20n86USjV9ylra6OtdGybma8CS0KSegsXALWLV18QNiDhl7FioTutX6vn6gWU7zUNEeABBzoRjMZbBTIJakb' },
    { id: 302, name: 'BS. Mỹ Linh', clinic: 'Phòng 205 - Nha khoa', status: 'Bận', statusEn: 'Busy', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy-wRgNAR2-drmpzY0o77qP79AqFM7JPbv19gM7GDEcrxlX-vH5U3058C1HeImfYDnq35_ZJtAxYQlvOK1zH1yr5UvWSJowHBm2HtHGPcYrzUWMn73JCODsvaM8wT_UlhXPkC8gwBpfSrkSsjeD2JWMcYjFPe83oYa2oes-9etNOEa6DrV9P9wnhxNBXcnNkStXqi0JioUNwm3SvJXUr97IKyFt8VfTv3fyCAKdMlzUf4rO4a_-VVz' },
    { id: 303, name: 'BS. Hoàng Nam', clinic: 'Phòng 301 - Tim mạch', status: 'Trống', statusEn: 'Available', avatar: null }
  ]);

  // Appt Quick Booking Form State
  const [apptForm, setApptForm] = useState({
    patientType: 'new',
    name: '',
    phone: '',
    date: '2024-05-24',
    time: '08:00',
    doctor: 'BS. Trần Hùng'
  });

  // Billing States
  const [invoices, setInvoices] = useState(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState(initialInvoices[0]);
  const [discountPercent, setDiscountPercent] = useState('0%');
  const [paymentMethod, setPaymentMethod] = useState('Tiền mặt');
  const [billingTabFilter, setBillingTabFilter] = useState('Tất cả');

  // Billing Statistics
  const [billingWaitingCount, setBillingWaitingCount] = useState(12);
  const [billingInsWaitingCount, setBillingInsWaitingCount] = useState(8);
  const [dailyRevAmount, setDailyRevAmount] = useState(42500000);

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 501, title: 'Hóa đơn BN-9942', subtitle: 'Đã thanh toán bởi Phạm Hoàng Yến', badge: '450k', isPrint: false },
    { id: 502, title: 'BN-8801 - In lại', subtitle: 'Lễ tân vừa in lại hóa đơn VAT', badge: 'print', isPrint: true }
  ]);

  // Settings States
  const [operatorProfile, setOperatorProfile] = useState({
    name: 'Nguyễn Thu Thảo',
    role: 'Lễ tân trưởng',
    roleEn: 'Front Desk Lead',
    code: 'EMR-2024-089',
    clinicBranch: 'Phòng khám Trung tâm',
    clinicBranchEn: 'Central Clinic'
  });

  const [settingsForm, setSettingsForm] = useState({
    notifyNewRegistration: true,
    notifyPayment: true,
    notifyApptChange: false,
    workspaceViewMode: 'list', // 'list' | 'grid' | 'split'
    autoRefreshQueue: true,
    soundChimeNotification: false
  });

  // Modal State for adding new patient
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [newPatientForm, setNewPatientForm] = useState({
    name: '',
    gender: 'Nam',
    age: '',
    phone: '',
    insurance: 'Còn hiệu lực',
    lastVisit: 'Hôm nay'
  });

  // Stats Counters
  const [pendingBills, setPendingBills] = useState(24);
  const [unverifiedInsurance, setUnverifiedInsurance] = useState(8);
  const [checkinsTodayCount, setCheckinsTodayCount] = useState(48);

  // Insurance tasks list
  const [anthemVerified, setAnthemVerified] = useState(false);
  const [unitedAppealed, setUnitedAppealed] = useState(false);

  // Check-in Form States
  const [patientType, setPatientType] = useState('returning'); // 'returning' or 'new'
  const [checkInName, setCheckInName] = useState('');
  const [checkInDept, setCheckInDept] = useState('Cardiology');
  const [checkInType, setCheckInType] = useState('Consultation');

  // Room Assignment Modal / Picker State
  const [assigningPatient, setAssigningPatient] = useState(null); // Patient currently being assigned a bed

  const t = translations[lang];

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
    const nextTheme = isDark ? 'light' : 'dark';
    if (propSetTheme) {
      propSetTheme(nextTheme);
    } else {
      setLocalTheme(nextTheme);
    }
  };

  const handleCheckInSubmit = (e) => {
    e.preventDefault();
    if (!checkInName.trim()) {
      alert(lang === 'vi' ? 'Vui lòng nhập tên bệnh nhân!' : 'Please enter patient name!');
      return;
    }

    const newPat = {
      id: Date.now(),
      name: checkInName.trim(),
      mrn: `#BN-${Math.floor(1000 + Math.random() * 9000)}-K`,
      department: checkInDept,
      waitTime: '0 mins',
      status: 'Checking In'
    };

    setQueue([...queue, newPat]);
    setCheckinsTodayCount(prev => prev + 1);
    setCheckInName('');
    alert(lang === 'vi' ? `Tiếp đón bệnh nhân ${checkInName} thành công! Đã thêm vào hàng đợi.` : `Successfully checked in ${checkInName}! Added to wait queue.`);
  };

  // Check-in a patient from the patient registry list directly
  const handleCheckInPatientFromList = (pat) => {
    // Check if patient already in queue
    const exists = queue.some(q => q.mrn === pat.mrn);
    if (exists) {
      alert(t.alreadyInQueue);
      return;
    }

    const newQueueItem = {
      id: Date.now(),
      name: pat.name,
      mrn: pat.mrn,
      department: 'General Med',
      waitTime: '5 mins',
      status: 'Checking In'
    };

    setQueue([...queue, newQueueItem]);
    setCheckinsTodayCount(prev => prev + 1);

    // Replace text placeholders with actual values
    const msg = t.checkInSuccessPat.replace('{name}', pat.name);
    alert(msg);
  };

  const handleVerifyInsurance = (provider) => {
    if (provider === 'Anthem') {
      setAnthemVerified(true);
      setUnverifiedInsurance(prev => Math.max(0, prev - 1));
      alert(lang === 'vi' ? 'Đã xác thực bảo hiểm Anthem thành công!' : 'Anthem insurance successfully verified!');
    }
  };

  const handleAppealInsurance = (provider) => {
    if (provider === 'United') {
      setUnitedAppealed(true);
      alert(lang === 'vi' ? 'Đã gửi khiếu nại bảo hiểm United HealthCare!' : 'United HealthCare insurance appeal submitted!');
    }
  };

  // Assign Patient to Bed
  const assignPatientToBed = (patientId, bedId) => {
    const patObj = queue.find(p => p.id === patientId);
    if (!patObj) return;

    // Update beds array: mark selected bed as Occupied
    setBeds(prev => prev.map(b => {
      if (b.id === bedId) {
        return { ...b, status: 'Occupied' };
      }
      return b;
    }));

    // Remove patient from waiting queue
    setQueue(prev => prev.filter(p => p.id !== patientId));
    setAssigningPatient(null);
    alert(lang === 'vi' ? `Gán giường bệnh ${bedId} thành công cho ${patObj.name}!` : `Successfully assigned bed ${bedId} to ${patObj.name}!`);
  };

  // Cycle Bed Status manually by clicking
  const handleToggleBed = (bedId) => {
    setBeds(prev => prev.map(b => {
      if (b.id === bedId) {
        if (b.status === 'Occupied') {
          return { ...b, status: 'Cleaning' };
        } else if (b.status === 'Cleaning') {
          return { ...b, status: 'Available' };
        } else {
          // Available -> Occupied directly or triggers assignment if queue exists
          if (queue.length > 0) {
            setAssigningPatient(queue[0]); // Suggest first patient in queue
            return b;
          }
          return { ...b, status: 'Occupied' };
        }
      }
      return b;
    }));
  };

  const handleProcessPayment = () => {
    const amt = prompt(lang === 'vi' ? 'Nhập số tiền thanh toán (VNĐ):' : 'Enter billing payment amount ($):');
    if (!amt) return;
    setPendingBills(prev => Math.max(0, prev - 1));
    alert(lang === 'vi' ? 'Thanh toán hóa đơn viện phí thành công!' : 'Billing payment processed successfully!');
  };

  const handleEmergencyCheckIn = () => {
    const name = prompt(lang === 'vi' ? 'Nhập tên bệnh nhân CẤP CỨU:' : 'Enter EMERGENCY patient name:');
    if (!name) return;

    const newPat = {
      id: Date.now(),
      name: `[STAT] ${name}`,
      mrn: `#EMER-${Math.floor(1000 + Math.random() * 9000)}`,
      department: 'Emergency Wing',
      waitTime: '0 mins',
      status: 'Delayed'
    };

    setQueue([newPat, ...queue]);
    setCheckinsTodayCount(prev => prev + 1);
    alert(lang === 'vi' ? 'Đã kích hoạt tiếp nhận STAT! Bệnh nhân được ưu tiên hàng đầu.' : 'STAT Admission triggered! Patient placed at the front of the queue.');
  };

  const handleAddPatientSubmit = (e) => {
    e.preventDefault();
    if (!newPatientForm.name.trim() || !newPatientForm.age || !newPatientForm.phone) {
      alert(lang === 'vi' ? 'Vui lòng điền đầy đủ các trường thông tin bắt buộc!' : 'Please fill all required fields!');
      return;
    }

    const newPat = {
      id: Date.now(),
      name: newPatientForm.name.trim(),
      gender: newPatientForm.gender,
      genderEn: newPatientForm.gender === 'Nam' ? 'Male' : 'Female',
      age: parseInt(newPatientForm.age),
      mrn: `#BN-${Math.floor(1000 + Math.random() * 9000)}-G`,
      phone: newPatientForm.phone,
      insurance: newPatientForm.insurance,
      insuranceEn: newPatientForm.insurance === 'Còn hiệu lực'
        ? 'Active'
        : newPatientForm.insurance === 'Hết hạn'
          ? 'Expired'
          : newPatientForm.insurance === 'Chờ xác minh'
            ? 'Pending Verification'
            : 'None',
      lastVisit: newPatientForm.lastVisit,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdk7RKynJuPbGbeHPVSUiLO9jkID5GwuDSux6xktM3kdCd3OZgbxj1pk0s_Yht5PUK0azTkSA8Sc5-GH47NiTQxdoMn-IGlO8zkB35-jCMHvxBzmxfwL-LPuU7rzs-o5738s0kcpQbFDn-k42vZkhKb4RAQMrUiCfXaY4k-eetc_Pssx5PNtJA49pUrzeBwUlE2gqqsvd2-VpEXSblJpm77-uc-F5XWCH8cGv_yZTqFL9aRdgASmcV'
    };

    setPatients([newPat, ...patients]);
    setIsAddPatientOpen(false);
    setNewPatientForm({
      name: '',
      gender: 'Nam',
      age: '',
      phone: '',
      insurance: 'Còn hiệu lực',
      lastVisit: 'Hôm nay'
    });
    alert(t.addSuccess);
  };

  const toDateKey = (dateValue) => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getWeekDates = (dateValue) => {
    const base = new Date(dateValue);
    const day = base.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const start = new Date(base);
    start.setDate(base.getDate() + diff);
    return Array.from({ length: 7 }, (_, index) => {
      const current = new Date(start);
      current.setDate(start.getDate() + index);
      return current;
    });
  };

  const shiftSelectedDate = (offset) => {
    const nextDate = new Date(selectedDate);
    if (apptView === 'day') {
      nextDate.setDate(nextDate.getDate() + offset);
    } else if (apptView === 'week') {
      nextDate.setDate(nextDate.getDate() + offset * 7);
    } else if (apptView === 'month') {
      nextDate.setMonth(nextDate.getMonth() + offset);
    } else {
      nextDate.setFullYear(nextDate.getFullYear() + offset);
    }
    setSelectedDate(nextDate);
  };

  // Helper to calculate top offsets for Appointments scheduler
  const calculateTopOffset = (timeStr) => {
    try {
      const [hr, min] = timeStr.split(':').map(Number);
      const startHr = 8;
      const diffHrs = hr - startHr;
      const pixelsPerHour = 80;
      const totalPixels = diffHrs * pixelsPerHour + (min / 60) * pixelsPerHour;
      return `${Math.max(0, totalPixels)}px`;
    } catch (err) {
      return '20px';
    }
  };

  const visibleAppointments = appointments.filter(appt => {
    const apptDateKey = appt.date || toDateKey(selectedDate);
    const apptDate = new Date(`${apptDateKey}T00:00:00`);
    const selectedKey = toDateKey(selectedDate);

    if (apptView === 'day') {
      return apptDateKey === selectedKey;
    }

    if (apptView === 'week') {
      return getWeekDates(selectedDate).some(day => toDateKey(day) === apptDateKey);
    }

    if (apptView === 'month') {
      return apptDate.getMonth() === selectedDate.getMonth() && apptDate.getFullYear() === selectedDate.getFullYear();
    }

    return apptDate.getFullYear() === selectedDate.getFullYear();
  }).filter(appt => appt.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleBookingConfirmSubmit = (e) => {
    e.preventDefault();
    if (!apptForm.name.trim() || !apptForm.phone) {
      alert(lang === 'vi' ? 'Vui lòng điền họ tên và số điện thoại!' : 'Please enter patient name and phone number!');
      return;
    }

    const docObj = doctorsList.find(d => d.name === apptForm.doctor);
    const specialtyStr = docObj ? docObj.clinic.split(' - ')[1] : 'Nội tổng quát';

    const newAppt = {
      id: Date.now(),
      name: apptForm.name.trim(),
      time: apptForm.time,
      date: apptForm.date || toDateKey(selectedDate),
      type: specialtyStr,
      doctor: apptForm.doctor,
      status: 'Đang chờ',
      priority: false,
      durationMins: 45
    };

    setAppointments([...appointments, newAppt]);
    setApptWaiting(prev => prev + 1);

    // Reset form fields
    setApptForm({
      patientType: 'new',
      name: '',
      phone: '',
      date: '2024-05-24',
      time: '08:00',
      doctor: 'BS. Trần Hùng'
    });

    alert(lang === 'vi' ? 'Đặt lịch hẹn khám bệnh thành công!' : 'Appointment booked successfully!');
  };

  // Filter patients list
  const filteredPatients = patients.filter(p => {
    const term = patientSearch.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(term) || p.mrn.toLowerCase().includes(term) || p.phone.includes(term);

    if (insuranceFilter === 'Tất cả bảo hiểm' || insuranceFilter === 'All insurance') {
      return matchesSearch;
    }

    const filterKey = lang === 'vi' ? insuranceFilter : (
      insuranceFilter === 'Active' ? 'Còn hiệu lực' :
        insuranceFilter === 'Expired' ? 'Hết hạn' :
          insuranceFilter === 'Pending verification' ? 'Chờ xác minh' : 'Không có'
    );

    return matchesSearch && p.insurance === filterKey;
  });

  // Cycle appointment status on card click
  const handleToggleApptStatus = (apptId) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === apptId) {
        let nextStatus = 'Đang chờ';
        if (a.status === 'Đang chờ') {
          nextStatus = 'Đã check-in';
          const newQueueItem = {
            id: Date.now(),
            name: a.name,
            mrn: `#BN-${Math.floor(1000 + Math.random() * 9000)}-Q`,
            department: a.type,
            waitTime: '5 mins',
            status: 'Checking In'
          };
          setQueue(q => [...q, newQueueItem]);
          setCheckinsTodayCount(c => c + 1);
          setApptWaiting(w => Math.max(0, w - 1));
          setApptInRoom(r => r + 1);
          alert(lang === 'vi' ? `Đã xác nhận check-in và đưa ${a.name} vào hàng đợi tiếp đón!` : `Check-in confirmed and ${a.name} added to wait queue!`);
        } else if (a.status === 'Đã check-in') {
          nextStatus = 'Hoàn tất';
          setApptInRoom(r => Math.max(0, r - 1));
          setApptCompleted(c => c + 1);
        } else if (a.status === 'Ưu tiên') {
          nextStatus = 'Đã check-in';
          const newQueueItem = {
            id: Date.now(),
            name: a.name,
            mrn: `#BN-${Math.floor(1000 + Math.random() * 9000)}-Q`,
            department: a.type,
            waitTime: '0 mins',
            status: 'Delayed'
          };
          setQueue(q => [newQueueItem, ...q]);
          setCheckinsTodayCount(c => c + 1);
          setApptInRoom(r => r + 1);
        }
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  // Toggle Doctor's availability status
  const handleToggleDoctorStatus = (docId) => {
    setDoctorsList(prev => prev.map(d => {
      if (d.id === docId) {
        const nextStatus = d.status === 'Trống' ? 'Bận' : 'Trống';
        return {
          ...d,
          status: nextStatus,
          statusEn: nextStatus === 'Trống' ? 'Available' : 'Busy'
        };
      }
      return d;
    }));
  };

  // Billing specific actions
  const calculateBillingTotal = () => {
    if (!selectedInvoice) return 0;
    const base = (selectedInvoice.fees?.exam || 0) + (selectedInvoice.fees?.lab || 0);
    const disc = parseInt(discountPercent.replace('%', '')) || 0;
    return base * (1 - disc / 100);
  };

  const handleConfirmInvoicePayment = () => {
    if (!selectedInvoice) return;

    // Set invoice completed
    setInvoices(prev => prev.map(inv => {
      if (inv.id === selectedInvoice.id) {
        return { ...inv, status: 'Hoàn tất', statusEn: 'Completed' };
      }
      return inv;
    }));

    // Update stats
    setBillingWaitingCount(prev => Math.max(0, prev - 1));
    const paidAmt = calculateBillingTotal();
    setDailyRevAmount(prev => prev + paidAmt);

    // Add recent transaction log
    const logItem = {
      id: Date.now(),
      title: `Hóa đơn ${selectedInvoice.mrn}`,
      subtitle: lang === 'vi' ? `Đã thanh toán bởi ${selectedInvoice.patientName}` : `Paid by ${selectedInvoice.patientName}`,
      badge: `${Math.round(paidAmt / 1000)}k`,
      isPrint: false
    };
    setRecentTransactions([logItem, ...recentTransactions]);

    alert(lang === 'vi' ? `Đã ghi nhận thanh toán thành công cho hóa đơn ${selectedInvoice.mrn}!` : `Successfully recorded payment for invoice ${selectedInvoice.mrn}!`);
    setSelectedInvoice(null);
  };

  const handleApplyDiscount = () => {
    const code = prompt(lang === 'vi' ? 'Nhập mã giảm giá (MÃ: GIAM20, GIAM50):' : 'Enter discount code (CODES: GIAM20, GIAM50):');
    if (!code) return;

    if (code.toUpperCase() === 'GIAM20') {
      setDiscountPercent('20%');
      alert(lang === 'vi' ? 'Áp dụng mã giảm giá 20% thành công!' : 'Successfully applied 20% discount code!');
    } else if (code.toUpperCase() === 'GIAM50') {
      setDiscountPercent('50%');
      alert(lang === 'vi' ? 'Áp dụng mã giảm giá 50% thành công!' : 'Successfully applied 50% discount code!');
    } else {
      alert(lang === 'vi' ? 'Mã giảm giá không hợp lệ!' : 'Invalid discount code!');
    }
  };

  const handlePrintVATInvoiceLog = (logId) => {
    alert(t.printVATSuccess);
  };

  // Filter invoices table
  const filteredInvoices = invoices.filter(inv => {
    const term = searchQuery.toLowerCase();
    const matchesSearch = inv.patientName.toLowerCase().includes(term) || inv.mrn.toLowerCase().includes(term) || inv.service.toLowerCase().includes(term);

    if (billingTabFilter === 'Tất cả' || billingTabFilter === 'All') {
      return matchesSearch;
    } else if (billingTabFilter === 'Chưa thanh toán' || billingTabFilter === 'Unpaid') {
      return matchesSearch && (inv.status === 'Chưa trả' || inv.status === 'Quá hạn');
    } else {
      return matchesSearch && inv.status === 'Đang chờ BH';
    }
  });

  // Settings: Edit operator profile name/role
  const handleEditOperatorProfile = () => {
    const nextName = prompt(lang === 'vi' ? 'Nhập họ tên lễ tân trưởng mới:' : 'Enter new Operator name:', operatorProfile.name);
    if (!nextName) return;
    setOperatorProfile({
      ...operatorProfile,
      name: nextName
    });
  };

  const handleSaveChangesSettings = () => {
    alert(t.saveSuccessMsg);
  };

  const handleCancelSettings = () => {
    // Reset configurations to default
    setSettingsForm({
      notifyNewRegistration: true,
      notifyPayment: true,
      notifyApptChange: false,
      workspaceViewMode: 'list',
      autoRefreshQueue: true,
      soundChimeNotification: false
    });
    alert(lang === 'vi' ? 'Đã hoàn tác các thay đổi chưa lưu!' : 'Discarded unsaved setting modifications!');
  };

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
            { label: 'Billing', key: 'billing', icon: 'payments' },
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
            onClick={handleEmergencyCheckIn}
            className="w-full flex items-center justify-center gap-2 bg-error text-white py-3 rounded-lg font-label-md text-label-md hover:bg-red-700 transition-all active:scale-[0.98] mb-4 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">emergency</span>
            {lang === 'vi' ? 'Tiếp Nhận Cấp Cứu' : 'Emergency Check-in'}
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
              placeholder={activeTab === 'Billing' ? t.billingSearchPlaceholder : activeTab === 'Settings' ? t.settingsSearchPlaceholder : t.searchPlaceholder}
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
            title={isDark ? 'Giao diện sáng (Light Mode)' : 'Giao diện tối (Dark Mode)'}
          >
            <span className="material-symbols-outlined">
              {isDark ? 'light_mode' : 'dark_mode'}
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

          {/* Notifications Button */}
          <button
            onClick={() => alert('Thông báo lễ tân')}
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 relative transition-colors"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>

          {/* Emergency Admission */}
          <button
            onClick={handleEmergencyCheckIn}
            className="w-10 h-10 flex items-center justify-center rounded-full text-error hover:bg-error-container/20 transition-colors"
            title={t.emergencyAdmission}
          >
            <span className="material-symbols-outlined text-red-500">emergency</span>
          </button>

          {/* Profile Details */}
          <div className="flex items-center gap-3 pl-3 border-l border-outline-variant dark:border-slate-800">
            <img
              className="w-10 h-10 rounded-full object-cover border border-primary-fixed dark:border-slate-700"
              alt="Admissions Operator avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO0qF7sZAPmSvu21x2jAN-YjKqVtEhbaP4kYFUusTXaEzrnkJZWDVxxiMmvq8iCTIMqNNLwVVcmDwLXVkItLnKlmq8VEwHc5DskJmX-1HqvjZczx4DQkZZDL0G_GVAvtQgmLYpE0ziRJ8iG3J1D2jO0twzidMQArR5rArc0BcYHff24kMZoGYzvk3llv3quk9nlEiVJU05WD33e8rKEgeJVFyhrZwGPMB9nWzm7qlCmRSn1TBjzCaZ"
            />
            <div className="hidden sm:block text-left w-44">
              <p className="font-label-md text-label-md text-on-surface dark:text-white truncate" title={operatorProfile.name}>{operatorProfile.name}</p>
              <p className="text-[10px] text-on-surface-variant dark:text-slate-400 uppercase tracking-widest font-semibold truncate" title={lang === 'vi' ? operatorProfile.role : operatorProfile.roleEn}>{lang === 'vi' ? operatorProfile.role : operatorProfile.roleEn}</p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="md:ml-[260px] p-6 min-h-screen">
        <div className="max-w-[1600px] mx-auto space-y-6">

          {/* Tab 1: Dashboard */}
          {activeTab === 'Dashboard' && (
            <ReceptionistDashboardTab
              lang={lang}
              t={t}
              handleProcessPayment={handleProcessPayment}
              queue={queue}
              searchQuery={searchQuery}
              setAssigningPatient={setAssigningPatient}
              pendingBills={pendingBills}
              unverifiedInsurance={unverifiedInsurance}
              anthemVerified={anthemVerified}
              handleVerifyInsurance={handleVerifyInsurance}
              unitedAppealed={unitedAppealed}
              handleAppealInsurance={handleAppealInsurance}
              beds={beds}
              handleToggleBed={handleToggleBed}
              patientType={patientType}
              setPatientType={setPatientType}
              checkInName={checkInName}
              setCheckInName={setCheckInName}
              checkInType={checkInType}
              setCheckInType={setCheckInType}
              handleCheckInSubmit={handleCheckInSubmit}
            />
          )}

          {activeTab === 'Patients' && (
            <ReceptionistPatientsTab
              lang={lang}
              t={t}
              setIsAddPatientOpen={setIsAddPatientOpen}
              checkinsTodayCount={checkinsTodayCount}
              patientSearch={patientSearch}
              setPatientSearch={setPatientSearch}
              insuranceFilter={insuranceFilter}
              setInsuranceFilter={setInsuranceFilter}
              filteredPatients={filteredPatients}
              patients={patients}
              handleCheckInPatientFromList={handleCheckInPatientFromList}
            />
          )}

          {activeTab === 'Appointments' && (
            <ReceptionistAppointmentsTab
              lang={lang}
              t={t}
              apptView={apptView}
              setApptView={setApptView}
              shiftSelectedDate={shiftSelectedDate}
              selectedDate={selectedDate}
              getWeekDates={getWeekDates}
              toDateKey={toDateKey}
              appointments={appointments}
              visibleAppointments={visibleAppointments}
              handleToggleApptStatus={handleToggleApptStatus}
              calculateTopOffset={calculateTopOffset}
              apptWaiting={apptWaiting}
              apptInRoom={apptInRoom}
              apptCompleted={apptCompleted}
              apptForm={apptForm}
              setApptForm={setApptForm}
              doctorsList={doctorsList}
              handleToggleDoctorStatus={handleToggleDoctorStatus}
              handleBookingConfirmSubmit={handleBookingConfirmSubmit}
            />
          )}

          {activeTab === 'Billing' && (
            <ReceptionistBillingTab
              lang={lang}
              t={t}
              invoices={invoices}
              setInvoices={setInvoices}
              billingWaitingCount={billingWaitingCount}
              setBillingWaitingCount={setBillingWaitingCount}
              billingInsWaitingCount={billingInsWaitingCount}
              dailyRevAmount={dailyRevAmount}
              billingTabFilter={billingTabFilter}
              setBillingTabFilter={setBillingTabFilter}
              filteredInvoices={filteredInvoices}
              selectedInvoice={selectedInvoice}
              setSelectedInvoice={setSelectedInvoice}
              discountPercent={discountPercent}
              setDiscountPercent={setDiscountPercent}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              calculateBillingTotal={calculateBillingTotal}
              handleConfirmInvoicePayment={handleConfirmInvoicePayment}
              handleApplyDiscount={handleApplyDiscount}
              recentTransactions={recentTransactions}
              handlePrintVATInvoiceLog={handlePrintVATInvoiceLog}
            />
          )}

          {activeTab === 'Settings' && (
            <ReceptionistSettingsTab
              lang={lang}
              setLang={setLang}
              t={t}
              operatorProfile={operatorProfile}
              handleEditOperatorProfile={handleEditOperatorProfile}
              settingsForm={settingsForm}
              setSettingsForm={setSettingsForm}
              handleCancelSettings={handleCancelSettings}
              handleSaveChangesSettings={handleSaveChangesSettings}
            />
          )}

          {/* Coming Soon for other tabs */}
          {activeTab !== 'Dashboard' && activeTab !== 'Patients' && activeTab !== 'Appointments' && activeTab !== 'Billing' && activeTab !== 'Settings' && (
            <div className="py-20 text-center bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl clinical-shadow">
              <span className="material-symbols-outlined text-[64px] text-outline dark:text-slate-500 mb-4">
                construction
              </span>
              <h3 className="text-headline-md font-bold text-on-surface dark:text-white mb-2">
                {activeTab} - Coming Soon
              </h3>
              <p className="text-body-md text-on-surface-variant dark:text-slate-400">
                {lang === 'vi'
                  ? `Tính năng ${activeTab} cho bộ phận lễ tân đang được xây dựng.`
                  : `${activeTab} features for the receptionist team are currently under construction.`
                }
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button for Emergency Admission */}
      <button
        onClick={handleEmergencyCheckIn}
        className="fixed bottom-8 right-8 w-14 h-14 bg-error text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-[0.92] transition-all z-50 animate-bounce"
        title={t.emergencyAdmission}
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          medical_information
        </span>
      </button>

      {/* ROOM ASSIGNMENT PICKER MODAL/DIALOG POPUP */}
      {assigningPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 w-full max-w-md p-6 rounded-xl shadow-2xl animate-in zoom-in-95 duration-150 text-left">
            <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white mb-md">{t.assignRoomTitle}</h3>
            <p className="text-body-md text-on-surface-variant dark:text-slate-300 mb-lg">
              {t.selectBedFor} <strong className="text-primary dark:text-primary-fixed-dim">{assigningPatient.name}</strong> ({assigningPatient.department})
            </p>

            <div className="grid grid-cols-4 gap-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar mb-lg">
              {beds.map(bed => {
                const isAvail = bed.status === 'Available';
                return (
                  <button
                    key={bed.id}
                    disabled={!isAvail}
                    onClick={() => assignPatientToBed(assigningPatient.id, bed.id)}
                    className={`py-3 text-body-sm font-bold rounded border transition-all ${isAvail
                      ? 'bg-secondary/10 dark:bg-teal-950/20 text-secondary dark:text-teal-400 border-secondary dark:border-teal-600 hover:bg-secondary/20 hover:scale-105'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-55'
                      }`}
                  >
                    {bed.id}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end gap-md">
              <button
                onClick={() => setAssigningPatient(null)}
                className="px-md py-sm border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-semibold"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW PATIENT REGISTRATION MODAL */}
      {isAddPatientOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 w-full max-w-md p-6 rounded-xl shadow-2xl animate-in zoom-in-95 duration-150 text-left">
            <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white mb-md">{t.addNewPatientTitle}</h3>

            <form onSubmit={handleAddPatientSubmit} className="space-y-md">
              <div className="flex flex-col gap-xs">
                <label className="text-body-sm font-semibold text-on-surface dark:text-white">{lang === 'vi' ? 'Họ và tên *' : 'Full Name *'}</label>
                <input
                  type="text"
                  required
                  value={newPatientForm.name}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, name: e.target.value })}
                  className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg px-md py-2 text-body-md outline-none focus:ring-1 focus:ring-primary dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="text-body-sm font-semibold text-on-surface dark:text-white">{t.genderLabel}</label>
                  <select
                    value={newPatientForm.gender}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, gender: e.target.value })}
                    className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg px-md py-2 text-body-md outline-none focus:ring-1 focus:ring-primary dark:text-white"
                  >
                    <option value="Nam">{lang === 'vi' ? 'Nam' : 'Male'}</option>
                    <option value="Nữ">{lang === 'vi' ? 'Nữ' : 'Female'}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="text-body-sm font-semibold text-on-surface dark:text-white">{t.ageLabel} *</label>
                  <input
                    type="number"
                    required
                    value={newPatientForm.age}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, age: e.target.value })}
                    className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg px-md py-2 text-body-md outline-none focus:ring-1 focus:ring-primary dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="text-body-sm font-semibold text-on-surface dark:text-white">{t.phoneLabel} *</label>
                <input
                  type="text"
                  required
                  value={newPatientForm.phone}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, phone: e.target.value })}
                  className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg px-md py-2 text-body-md outline-none focus:ring-1 focus:ring-primary dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="text-body-sm font-semibold text-on-surface dark:text-white">{t.insuranceLabel}</label>
                <select
                  value={newPatientForm.insurance}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, insurance: e.target.value })}
                  className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg px-md py-2 text-body-md outline-none focus:ring-1 focus:ring-primary dark:text-white"
                >
                  <option value="Còn hiệu lực">{lang === 'vi' ? 'Còn hiệu lực' : 'Active'}</option>
                  <option value="Hết hạn">{lang === 'vi' ? 'Hết hạn' : 'Expired'}</option>
                  <option value="Chờ xác minh">{lang === 'vi' ? 'Chờ xác minh' : 'Pending verification'}</option>
                  <option value="Không có">{lang === 'vi' ? 'Không có' : 'None'}</option>
                </select>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="text-body-sm font-semibold text-on-surface dark:text-white">{t.lastVisitLabel}</label>
                <input
                  type="text"
                  value={newPatientForm.lastVisit}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, lastVisit: e.target.value })}
                  className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg px-md py-2 text-body-md outline-none focus:ring-1 focus:ring-primary dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-md pt-md">
                <button
                  type="button"
                  onClick={() => setIsAddPatientOpen(false)}
                  className="px-md py-sm border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-semibold"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-md py-sm bg-primary text-white hover:bg-primary-container rounded-lg transition-all font-semibold shadow-xs"
                >
                  {t.confirm}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}