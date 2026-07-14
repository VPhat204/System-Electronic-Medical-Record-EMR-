import React, { useState, useEffect } from 'react';

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
            <>
              {/* Quick Action Row */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md text-left">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.receptionistDashboard}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-450">{t.centralAdmissionsBilling}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('patient-checkin-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary-container rounded font-label-md text-label-md hover:shadow-lg transition-all active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined">person_add</span>
                    {t.newPatientCheckin}
                  </button>
                  <button
                    onClick={handleProcessPayment}
                    className="flex items-center gap-2 px-6 py-3 border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim rounded font-label-md text-label-md hover:bg-primary/5 transition-all"
                  >
                    <span className="material-symbols-outlined">payments</span>
                    {t.processPayment}
                  </button>
                </div>
              </div>

              {/* Bento Grid Panel Layout */}
              <div className="grid grid-cols-12 gap-gutter">

                {/* Active waiting queue list (7 columns) */}
                <section className="col-span-12 lg:col-span-7 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden clinical-shadow flex flex-col">
                  <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50 flex justify-between items-center">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">groups</span>
                      {t.activeWaitingQueue}
                    </h3>
                    <span className="bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 px-md py-xs rounded text-[10px] font-bold uppercase tracking-wider">
                      {queue.length} {lang === 'vi' ? 'Đang Chờ' : 'Waiting'}
                    </span>
                  </div>
                  <div className="flex-grow overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-surface-container-low dark:bg-slate-900 text-on-surface-variant dark:text-slate-355 border-b border-outline-variant dark:border-slate-700">
                        <tr>
                          <th className="px-md py-3 font-label-md text-label-md">{t.patientName}</th>
                          <th className="px-md py-3 font-label-md text-label-md">{t.dept}</th>
                          <th className="px-md py-3 font-label-md text-label-md">{t.waitTime}</th>
                          <th className="px-md py-3 font-label-md text-label-md">{t.status}</th>
                          <th className="px-md py-3 font-label-md text-label-md text-right">{t.action}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant dark:divide-slate-700/60 text-body-md text-on-surface dark:text-slate-200">
                        {queue.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((p, idx) => (
                          <tr key={p.id} className={`${idx % 2 === 1 ? 'bg-slate-50/30 dark:bg-slate-900/10' : 'bg-white dark:bg-slate-800'} hover:bg-surface-container-low dark:hover:bg-slate-700/40 transition-colors`}>
                            <td className="px-md py-4">
                              <p className="font-semibold text-on-surface dark:text-white">{p.name}</p>
                              <p className="text-[11px] text-on-surface-variant dark:text-slate-400">MRN: {p.mrn}</p>
                            </td>
                            <td className="px-md py-4 font-medium">{p.department}</td>
                            <td className={`px-md py-4 font-semibold ${p.waitTime.includes('42') || p.waitTime.includes('30') ? 'text-error' : 'text-on-surface dark:text-slate-355'}`}>{p.waitTime}</td>
                            <td className="px-md py-4">
                              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${p.status === 'Delayed'
                                ? 'bg-error-container text-on-error-container'
                                : p.status === 'Normal'
                                  ? 'bg-secondary-container/20 text-on-secondary-container dark:text-teal-400'
                                  : 'bg-tertiary-fixed/30 text-tertiary dark:text-amber-500'
                                }`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="px-md py-4 text-right">
                              <button
                                onClick={() => setAssigningPatient(p)}
                                className="text-primary dark:text-primary-fixed-dim hover:underline font-bold text-label-md whitespace-nowrap"
                              >
                                {t.assignRoom}
                              </button>
                            </td>
                          </tr>
                        ))}
                        {queue.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                          <tr>
                            <td colSpan="5" className="py-8 text-center text-on-surface-variant dark:text-slate-455">
                              <span className="material-symbols-outlined text-[48px] block mb-2 opacity-30">
                                inpatient
                              </span>
                              {t.noPatientsInQueue}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Billing & Insurance dashboard panel (5 columns) */}
                <section className="col-span-12 lg:col-span-5 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden clinical-shadow flex flex-col text-left">
                  <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed-dim">receipt_long</span>
                      {t.billingInsurance}
                    </h3>
                  </div>
                  <div className="p-md space-y-4 flex-grow">
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        onClick={handleProcessPayment}
                        className="bg-surface-container-low dark:bg-slate-900/55 p-md rounded-lg border border-outline-variant/30 dark:border-slate-700 cursor-pointer hover:border-primary transition-colors text-left"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-slate-400">{t.pendingBills}</p>
                        <p className="text-headline-md font-bold text-tertiary dark:text-tertiary-fixed-dim mt-1">{pendingBills}</p>
                      </div>
                      <div className="bg-surface-container-low dark:bg-slate-900/55 p-md rounded-lg border border-outline-variant/30 dark:border-slate-700 text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-slate-400">{t.unverifiedInsurance}</p>
                        <p className="text-headline-md font-bold text-error dark:text-red-405 mt-1">{unverifiedInsurance}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-355 uppercase tracking-widest">{t.recentInsuranceTasks}</p>

                      {/* Task item Anthem */}
                      <div className={`flex items-center justify-between p-3 border border-outline-variant dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-xs ${anthemVerified ? 'opacity-55' : ''}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded flex items-center justify-center ${anthemVerified ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : 'bg-primary-fixed dark:bg-slate-700 text-primary dark:text-primary-fixed-dim'}`}>
                            <span className="material-symbols-outlined text-[18px]">{anthemVerified ? 'check' : 'verified_user'}</span>
                          </div>
                          <div>
                            <p className="font-bold text-on-surface dark:text-white">Anthem Blue Cross</p>
                            <p className="text-[11px] text-on-surface-variant dark:text-slate-400">For Patient: David G.</p>
                          </div>
                        </div>
                        {anthemVerified ? (
                          <span className="text-body-sm font-semibold text-green-500">VERIFIED</span>
                        ) : (
                          <button
                            onClick={() => handleVerifyInsurance('Anthem')}
                            className="bg-secondary-container hover:bg-secondary/15 text-on-secondary-container dark:text-teal-400 text-[10px] font-bold px-3 py-1.5 rounded active:scale-[0.97]"
                          >
                            {t.verify}
                          </button>
                        )}
                      </div>

                      {/* Task item United */}
                      <div className={`flex items-center justify-between p-3 border border-outline-variant dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-xs ${unitedAppealed ? 'opacity-55' : ''}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-error-container text-on-error-container flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">warning</span>
                          </div>
                          <div>
                            <p className="font-bold text-on-surface dark:text-white">United HealthCare</p>
                            <p className="text-[11px] text-on-surface-variant dark:text-slate-400">Denied: #RX-2921</p>
                          </div>
                        </div>
                        {unitedAppealed ? (
                          <span className="text-body-sm font-semibold text-amber-500">APPEALED</span>
                        ) : (
                          <button
                            onClick={() => handleAppealInsurance('United')}
                            className="text-primary dark:text-primary-fixed-dim text-[10px] font-bold px-3 py-1.5 hover:underline"
                          >
                            {t.appeal}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-md bg-surface-container-low dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 text-center">
                    <button
                      onClick={() => alert('Xem danh sách lịch sử bảo hiểm...')}
                      className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:underline"
                    >
                      {t.viewAllBilling}
                    </button>
                  </div>
                </section>

                {/* Bed availability management (12 columns) */}
                <section className="col-span-12 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden clinical-shadow text-left">
                  <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary dark:text-teal-400">bed</span>
                      {t.wardAvailability}
                    </h3>

                    {/* Bed status color indicator legends */}
                    <div className="flex flex-wrap items-center gap-md">
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 bg-surface-container-highest dark:bg-slate-700 rounded border border-outline dark:border-slate-600"></div>
                        <span className="text-[11px] font-medium text-on-surface-variant dark:text-slate-350">{t.occupied} ({beds.filter(b => b.status === 'Occupied').length})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 bg-white dark:bg-slate-800 rounded border border-secondary dark:border-teal-500"></div>
                        <span className="text-[11px] font-medium text-on-surface-variant dark:text-slate-355">{t.available} ({beds.filter(b => b.status === 'Available').length})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 bg-error/15 rounded border border-error"></div>
                        <span className="text-[11px] font-medium text-on-surface-variant dark:text-slate-355">{t.cleaning} ({beds.filter(b => b.status === 'Cleaning').length})</span>
                      </div>
                    </div>
                  </div>

                  {/* Grid map array */}
                  <div className="p-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {beds.map(bed => {
                      const isOcc = bed.status === 'Occupied';
                      const isAvail = bed.status === 'Available';
                      const isClean = bed.status === 'Cleaning';

                      return (
                        <div
                          key={bed.id}
                          onClick={() => handleToggleBed(bed.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded border transition-all cursor-pointer relative group ${isOcc
                            ? 'bg-surface-container-highest dark:bg-slate-700 border-outline dark:border-slate-600'
                            : isAvail
                              ? 'bg-white dark:bg-slate-800 border-2 border-secondary dark:border-teal-500 hover:shadow-md'
                              : 'bg-error/10 dark:bg-red-950/20 border border-error/40'
                            }`}
                          title={lang === 'vi' ? `Giường ${bed.id}: Nhấp để đổi trạng thái` : `Bed ${bed.id}: Click to cycle status`}
                        >
                          <span className={`text-[10px] font-bold mb-1 ${isOcc ? 'text-on-surface-variant dark:text-slate-300' : isAvail ? 'text-secondary dark:text-teal-400' : 'text-error'}`}>
                            {bed.id}
                          </span>
                          <span className={`material-symbols-outlined text-2xl ${isOcc ? 'text-on-surface-variant dark:text-slate-300' : isAvail ? 'text-secondary dark:text-teal-400' : 'text-error'}`}>
                            {isOcc ? 'person' : isAvail ? 'bed' : 'cleaning_services'}
                          </span>

                          {/* Hover action overlay */}
                          <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center pointer-events-none">
                            <span className="bg-white dark:bg-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs text-on-surface dark:text-white">
                              CYCLE
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* Detailed Patient Registration Check-in Portal form section */}
              <section id="patient-checkin-form" className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 text-left clinical-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-outline-variant/35 dark:border-slate-700 pb-4 mb-6 gap-md">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white">{t.patientCheckinPortal}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{t.registerNewReturning}</p>
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-body-md font-semibold text-on-surface dark:text-white">
                      <input
                        checked={patientType === 'returning'}
                        onChange={() => setPatientType('returning')}
                        className="text-primary dark:text-primary-fixed-dim focus:ring-primary h-4 w-4 bg-transparent border-outline-variant"
                        name="patient_type"
                        type="radio"
                      />
                      <span>{t.returning}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-body-md font-semibold text-on-surface dark:text-white">
                      <input
                        checked={patientType === 'new'}
                        onChange={() => setPatientType('new')}
                        className="text-primary dark:text-primary-fixed-dim focus:ring-primary h-4 w-4 bg-transparent border-outline-variant"
                        name="patient_type"
                        type="radio"
                      />
                      <span>{t.newPatient}</span>
                    </label>
                  </div>
                </div>

                <form onSubmit={handleCheckInSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="col-span-1 md:col-span-2 flex flex-col gap-xs">
                    <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-355">{t.searchLabel}</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400">
                        person_search
                      </span>
                      <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={checkInName}
                        onChange={(e) => setCheckInName(e.target.value)}
                        className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg pl-10 pr-4 py-2 text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="block font-label-md text-label-md text-on-surface-variant dark:text-slate-355">{t.appointmentType}</label>
                    <select
                      value={checkInType}
                      onChange={(e) => setCheckInType(e.target.value)}
                      className="w-full h-10 border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg text-body-md px-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none dark:text-white"
                    >
                      <option value="Consultation">Consultation</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Emergency">Emergency Wing</option>
                      <option value="Lab Work">Lab Diagnostics</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-primary text-white h-10 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all active:scale-[0.98] shadow-xs"
                    >
                      {t.validateEntry}
                    </button>
                  </div>
                </form>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-outline-variant/30 dark:border-slate-700/60">
                  <div onClick={() => alert('Quét mã vạch tiếp nhận di động...')} className="flex gap-4 p-4 rounded-lg bg-surface-container-low dark:bg-slate-900 border border-transparent hover:border-outline-variant/40 transition-colors cursor-pointer text-left">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 flex items-center justify-center rounded-full border border-outline-variant dark:border-slate-700 shadow-xs">
                      <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">qr_code_scanner</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface dark:text-white">{t.scanQrCode}</p>
                      <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{t.scanQrSub}</p>
                    </div>
                  </div>

                  <div onClick={() => alert('Đang kết nối đầu đọc vân tay USB...')} className="flex gap-4 p-4 rounded-lg bg-surface-container-low dark:bg-slate-900 border border-transparent hover:border-outline-variant/40 transition-colors cursor-pointer text-left">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 flex items-center justify-center rounded-full border border-outline-variant dark:border-slate-700 shadow-xs">
                      <span className="material-symbols-outlined text-secondary dark:text-teal-400">fingerprint</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface dark:text-white">{t.biometricId}</p>
                      <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{t.biometricSub}</p>
                    </div>
                  </div>

                  <div onClick={() => alert('Lượt tải Kiosk sảnh đợi: 3 thiết bị hoạt động bình thường.')} className="flex gap-4 p-4 rounded-lg bg-surface-container-low dark:bg-slate-900 border border-transparent hover:border-outline-variant/40 transition-colors cursor-pointer text-left">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 flex items-center justify-center rounded-full border border-outline-variant dark:border-slate-700 shadow-xs">
                      <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed-dim">assignment_ind</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface dark:text-white">{t.kioskSupport}</p>
                      <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{t.kioskSub}</p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Tab 2: Patients */}
          {activeTab === 'Patients' && (
            <>
              {/* Header Actions */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-lg text-left">
                <div>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mb-xs">{t.patientsTitle}</h1>
                  <p className="text-body-md text-on-surface-variant dark:text-slate-400">{t.patientsSubtitle}</p>
                </div>
                <div className="flex flex-wrap gap-md">
                  <button
                    onClick={() => alert(lang === 'vi' ? 'Hiển thị nhật ký check-in hành chính bệnh nhân gần đây.' : 'Showing recent patient check-in log details.')}
                    className="bg-surface-container-lowest dark:bg-slate-800 border border-outline dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-700 px-lg py-2 rounded-lg text-label-md text-primary dark:text-primary-fixed-dim flex items-center gap-2 transition-colors active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined">history</span>
                    {t.checkinHistory}
                  </button>
                  <button
                    onClick={() => alert(lang === 'vi' ? 'Vui lòng chọn bệnh nhân trong bảng để cập nhật bảo hiểm.' : 'Please select a patient in the grid to update insurance.')}
                    className="bg-surface-container-lowest dark:bg-slate-800 border border-outline dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-700 px-lg py-2 rounded-lg text-label-md text-primary dark:text-primary-fixed-dim flex items-center gap-2 transition-colors active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined">verified_user</span>
                    {t.updateInsurance}
                  </button>
                  <button
                    onClick={() => setIsAddPatientOpen(true)}
                    className="bg-primary hover:bg-primary-container text-white px-lg py-2 rounded-lg text-label-md flex items-center gap-2 transition-all shadow-xs active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined">add</span>
                    {t.registerNewPatientBtn}
                  </button>
                </div>
              </div>

              {/* Stats Summary Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md mb-xl text-left">
                {/* Total patients */}
                <div className="bg-surface-container-lowest dark:bg-slate-800 p-md border border-outline-variant dark:border-slate-700 rounded-xl">
                  <div className="flex justify-between items-start mb-sm">
                    <span className="text-label-md text-on-surface-variant dark:text-slate-450 uppercase">{t.totalPatients}</span>
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">groups</span>
                  </div>
                  <p className="font-headline-lg text-headline-lg text-on-surface dark:text-white">12,482</p>
                  <p className="text-body-sm text-secondary dark:text-teal-400 mt-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    {t.trendingUp}
                  </p>
                </div>

                {/* Checkin Today */}
                <div className="bg-surface-container-lowest dark:bg-slate-800 p-md border border-outline-variant dark:border-slate-700 rounded-xl">
                  <div className="flex justify-between items-start mb-sm">
                    <span className="text-label-md text-on-surface-variant dark:text-slate-450 uppercase">{t.checkinToday}</span>
                    <span className="material-symbols-outlined text-secondary dark:text-teal-400">person_check</span>
                  </div>
                  <p className="font-headline-lg text-headline-lg text-on-surface dark:text-white">{checkinsTodayCount}</p>
                  <p className="text-body-sm text-on-surface-variant dark:text-slate-400 mt-xs">{t.newPatientsCount}</p>
                </div>

                {/* Expired insurance count */}
                <div className="bg-surface-container-lowest dark:bg-slate-800 p-md border border-outline-variant dark:border-slate-700 rounded-xl">
                  <div className="flex justify-between items-start mb-sm">
                    <span className="text-label-md text-on-surface-variant dark:text-slate-450 uppercase">{t.expiredInsurance}</span>
                    <span className="material-symbols-outlined text-error">warning</span>
                  </div>
                  <p className="font-headline-lg text-headline-lg text-error">15</p>
                  <p className="text-body-sm text-error mt-xs font-semibold">{t.needUrgentUpdate}</p>
                </div>

                {/* Appointments today */}
                <div className="bg-surface-container-lowest dark:bg-slate-800 p-md border border-outline-variant dark:border-slate-700 rounded-xl">
                  <div className="flex justify-between items-start mb-sm">
                    <span className="text-label-md text-on-surface-variant dark:text-slate-450 uppercase">{t.appointmentsToday}</span>
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">event_available</span>
                  </div>
                  <p className="font-headline-lg text-headline-lg text-on-surface dark:text-white">32</p>
                  <p className="text-body-sm text-on-surface-variant dark:text-slate-400 mt-xs">{t.punctualityRate}</p>
                </div>
              </div>

              {/* Table Card container */}
              <div className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-xs text-left">

                {/* Filters block */}
                <div className="p-md border-b border-outline-variant dark:border-slate-700 flex flex-col md:flex-row gap-md justify-between items-center bg-surface-container-low/30 dark:bg-slate-900/30">
                  <div className="flex items-center gap-sm w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400">
                        search
                      </span>
                      <input
                        type="text"
                        placeholder={t.searchPatientPlaceholder}
                        value={patientSearch}
                        onChange={(e) => setPatientSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest dark:bg-slate-905 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none dark:text-white"
                      />
                    </div>
                    <button className="p-2 border border-outline-variant dark:border-slate-700 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-300">filter_list</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-md w-full md:w-auto">
                    <select
                      value={insuranceFilter}
                      onChange={(e) => setInsuranceFilter(e.target.value)}
                      className="bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg px-md py-2 text-body-md focus:ring-1 focus:ring-primary outline-none cursor-pointer dark:text-white"
                    >
                      <option value={t.allInsurance}>{t.allInsurance}</option>
                      <option value={lang === 'vi' ? 'Còn hiệu lực' : 'Active'}>{t.activeInsurance}</option>
                      <option value={lang === 'vi' ? 'Hết hạn' : 'Expired'}>{t.expiredInsuranceFilter}</option>
                      <option value={lang === 'vi' ? 'Chờ xác minh' : 'Pending verification'}>{t.pendingVerification}</option>
                      <option value={lang === 'vi' ? 'Không có' : 'None'}>{t.noInsurance}</option>
                    </select>
                    <span className="text-body-sm text-on-surface-variant dark:text-slate-400 whitespace-nowrap">
                      {t.showingRecords.replace('{start}', '1').replace('{end}', filteredPatients.length.toString()).replace('{total}', filteredPatients.length.toString())}
                    </span>
                  </div>
                </div>

                {/* Table list view */}
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-surface-container-low dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700">
                        <th className="px-md py-4 font-label-md text-on-surface-variant dark:text-slate-350">{t.fullName}</th>
                        <th className="px-md py-4 font-label-md text-on-surface-variant dark:text-slate-355">{t.patientID}</th>
                        <th className="px-md py-4 font-label-md text-on-surface-variant dark:text-slate-355">{t.phoneNumber}</th>
                        <th className="px-md py-4 font-label-md text-on-surface-variant dark:text-slate-355">{t.insuranceStatus}</th>
                        <th className="px-md py-4 font-label-md text-on-surface-variant dark:text-slate-355">{t.lastVisit}</th>
                        <th className="px-md py-4 font-label-md text-on-surface-variant dark:text-slate-355 text-right pr-6">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant dark:divide-slate-700/60 text-body-md text-on-surface dark:text-slate-200">
                      {filteredPatients.map((pat, idx) => {
                        const activeIns = pat.insurance === 'Còn hiệu lực';
                        const expiredIns = pat.insurance === 'Hết hạn';
                        const pendingIns = pat.insurance === 'Chờ xác minh';

                        return (
                          <tr key={pat.id} className={`${idx % 2 === 1 ? 'bg-slate-50/20 dark:bg-slate-900/10' : 'bg-white dark:bg-slate-800'} hover:bg-surface-container-low/50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer group`}>
                            <td className="px-md py-3">
                              <div className="flex items-center gap-md">
                                <img
                                  className="w-9 h-9 rounded-full overflow-hidden bg-surface-container-highest dark:bg-slate-700 object-cover"
                                  alt={pat.name}
                                  src={pat.avatar}
                                />
                                <div>
                                  <p className="font-semibold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">
                                    {pat.name}
                                  </p>
                                  <p className="text-body-sm text-on-surface-variant dark:text-slate-400">
                                    {lang === 'vi' ? pat.gender : pat.genderEn} • {pat.age} {lang === 'vi' ? 'tuổi' : 'y/o'}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-md py-3 text-data-mono font-medium">{pat.mrn}</td>
                            <td className="px-md py-3 font-medium">{pat.phone}</td>
                            <td className="px-md py-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${activeIns
                                ? 'bg-secondary-container/20 text-on-secondary-container dark:text-teal-400'
                                : expiredIns
                                  ? 'bg-error-container text-on-error-container'
                                  : pendingIns
                                    ? 'bg-tertiary-fixed/30 text-on-tertiary-fixed-variant'
                                    : 'bg-surface-container-highest dark:bg-slate-700 text-on-surface-variant dark:text-slate-300'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${activeIns ? 'bg-secondary dark:bg-teal-500' : expiredIns ? 'bg-error' : pendingIns ? 'bg-tertiary dark:bg-amber-500' : 'bg-outline'
                                  }`}></span>
                                {lang === 'vi' ? pat.insurance : pat.insuranceEn}
                              </span>
                            </td>
                            <td className="px-md py-3 text-on-surface-variant dark:text-slate-350">{lang === 'vi' ? pat.lastVisit : (pat.lastVisit === 'Hôm nay' ? 'Today' : pat.lastVisit)}</td>
                            <td className="px-md py-3 text-right pr-6">
                              <div className="flex gap-sm justify-end">
                                <button
                                  onClick={() => handleCheckInPatientFromList(pat)}
                                  className="p-2 hover:bg-primary-container/20 text-primary dark:text-primary-fixed-dim rounded-lg transition-all"
                                  title={lang === 'vi' ? 'Đón tiếp' : 'Check-in'}
                                >
                                  <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                                </button>
                                <button
                                  onClick={() => alert(`${lang === 'vi' ? 'Hồ sơ bệnh nhân' : 'Patient details'}: ${pat.name} - MRN: ${pat.mrn}`)}
                                  className="p-2 hover:bg-surface-container-high dark:hover:bg-slate-700 rounded-lg transition-all"
                                  title={lang === 'vi' ? 'Chi tiết' : 'Details'}
                                >
                                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant dark:text-slate-300">more_vert</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination bar */}
                <div className="p-md border-t border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface-container-low/30 dark:bg-slate-900/30">
                  <div className="hidden sm:block text-body-sm text-on-surface-variant dark:text-slate-400">
                    {t.showingTotalPatientsCount.replace('{count}', filteredPatients.length.toString()).replace('{total}', patients.length.toString())}
                  </div>
                  <div className="flex items-center gap-xs">
                    <button className="p-2 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700 disabled:opacity-30" disabled>
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-primary text-white text-label-md">1</button>
                    <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700 text-label-md">2</button>
                    <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700 text-label-md">3</button>
                    <span className="px-1 text-on-surface-variant">...</span>
                    <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700 text-label-md">125</button>
                    <button className="p-2 rounded-lg hover:bg-surface-container-high dark:hover:bg-slate-700">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>

              </div>
            </>
          )}

          {/* Tab 3: Appointments */}
          {activeTab === 'Appointments' && (
            <>
              {/* Header Actions */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-lg gap-md text-left">
                <div>
                  <h1 className="font-headline-xl text-headline-xl text-primary font-bold mb-xs">{t.appointmentsTitle}</h1>
                  <p className="text-on-surface-variant font-body-sm dark:text-slate-400">
                    {lang === 'vi' ? 'Quản lý lịch khám, tiếp nhận bệnh nhân và theo dõi phòng khám trực quan.' : 'Manage consultation slots, check in patients, and view live clinic metrics.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-md">
                  {/* View Selector segmented control */}
                  <div className="flex bg-surface-container dark:bg-slate-800 rounded-lg p-xs border border-outline-variant dark:border-slate-700">
                    {[
                      { key: 'day', label: t.dayTab },
                      { key: 'week', label: t.weekTab },
                      { key: 'month', label: t.monthTab },
                      { key: 'year', label: t.yearTab }
                    ].map(viewOpt => (
                      <button
                        key={viewOpt.key}
                        onClick={() => setApptView(viewOpt.key)}
                        className={`px-md py-xs rounded transition-all font-body-md text-body-md ${apptView === viewOpt.key
                          ? 'bg-surface-container-lowest dark:bg-slate-700 shadow-sm font-bold text-primary dark:text-primary-fixed-dim'
                          : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-700'
                          }`}
                      >
                        {viewOpt.label}
                      </button>
                    ))}
                  </div>

                  {/* Date Navigation Pill */}
                  <div className="flex items-center bg-surface-container-lowest dark:bg-slate-800 px-sm py-xs rounded-lg border border-outline-variant dark:border-slate-700 gap-xs">
                    <button
                      onClick={() => shiftSelectedDate(-1)}
                      className="p-1 rounded hover:bg-surface-container-high dark:hover:bg-slate-700 text-primary dark:text-primary-fixed-dim transition-colors flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-[20px] font-bold">chevron_left</span>
                    </button>
                    <span className="inline-block w-[180px] text-center px-sm font-bold text-body-md text-on-surface dark:text-white select-none">
                      {apptView === 'day'
                        ? selectedDate.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })
                        : apptView === 'week'
                          ? `${getWeekDates(selectedDate)[0].toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { day: '2-digit', month: '2-digit' })} - ${getWeekDates(selectedDate)[6].toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { day: '2-digit', month: '2-digit' })}`
                          : apptView === 'month'
                            ? selectedDate.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { month: 'long', year: 'numeric' })
                            : selectedDate.getFullYear()}
                    </span>
                    <button
                      onClick={() => shiftSelectedDate(1)}
                      className="p-1 rounded hover:bg-surface-container-high dark:hover:bg-slate-700 text-primary dark:text-primary-fixed-dim transition-colors flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-[20px] font-bold">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Grid Layout */}
              <div className="grid grid-cols-12 gap-gutter items-stretch">
                {/* Left Column (8/12 Cols) */}
                <div className="col-span-12 lg:col-span-8 space-y-gutter flex flex-col justify-between">
                  {/* Calendar Widget Container */}
                  <section className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg overflow-hidden shadow-sm flex flex-col text-left flex-grow">
                    {/* Header bar of calendar */}
                    <div className="grid grid-cols-7 border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/60 items-center">
                      <div className="col-span-1 p-md text-right border-r border-outline-variant dark:border-slate-700 font-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">
                        {t.timeHeader}
                      </div>
                      <div className="col-span-6 p-md font-bold text-primary dark:text-primary-fixed-dim text-body-md uppercase tracking-wider">
                        {apptView === 'day' ? t.appointmentsListHeader : (
                          apptView === 'week' ? (lang === 'vi' ? 'LỊCH TRÌNH TRONG TUẦN' : 'WEEKLY SCHEDULE') : (
                            apptView === 'month' ? (lang === 'vi' ? 'LỊCH TRÌNH TRONG THÁNG' : 'MONTHLY OVERVIEW') : (
                              lang === 'vi' ? 'TỔNG QUAN CẢ NĂM' : 'YEARLY SUMMARY'
                            )
                          )
                        )}
                      </div>
                    </div>

                    {/* Scrollable contents grid */}
                    <div className={`relative flex-1 ${apptView === 'day' ? 'overflow-y-auto custom-scrollbar' : ''} bg-surface-container-lowest dark:bg-slate-900`}>
                      {apptView === 'day' ? (
                        <div className="grid grid-cols-7 min-h-full">
                          {/* Hour lines labels */}
                          <div className="col-span-1 border-r border-outline-variant dark:border-slate-700 divide-y divide-outline-variant/60 dark:divide-slate-800 select-none bg-surface-container-lowest dark:bg-slate-900">
                            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(slot => (
                              <div key={slot} className="h-20 p-sm text-right text-body-sm text-outline dark:text-slate-450 font-medium">
                                {slot}
                              </div>
                            ))}
                          </div>

                          {/* Grid slots area */}
                          <div
                            className="col-span-6 p-md relative bg-repeat min-h-full"
                            style={{
                              backgroundImage: isDark 
                                ? "radial-gradient(circle, #475569 0.8px, transparent 0.8px)" 
                                : "radial-gradient(circle, #c2c6d4 0.8px, transparent 0.8px)",
                              backgroundSize: "20px 20px"
                            }}
                          >
                            {visibleAppointments.length > 0 ? (
                              visibleAppointments.map(appt => {
                                const isCheck = appt.status === 'Đã check-in';
                                const isWait = appt.status === 'Đang chờ';
                                const isPri = appt.status === 'Ưu tiên';
                                const isFin = appt.status === 'Hoàn tất';

                                return (
                                  <div
                                    key={appt.id}
                                    onClick={() => handleToggleApptStatus(appt.id)}
                                    className={`absolute left-4 right-4 p-sm rounded-lg border flex justify-between items-start hover:shadow-md hover:translate-y-[-1px] active:scale-[0.99] transition-all cursor-pointer group select-none border-l-[6px] ${isCheck
                                      ? 'bg-primary-container/10 dark:bg-blue-950/20 border-primary text-primary dark:text-primary-fixed-dim'
                                      : isWait
                                        ? 'bg-amber-500/5 dark:bg-amber-950/10 border-amber-500 text-amber-800 dark:text-amber-300 hover:border-amber-600'
                                        : isPri
                                          ? 'bg-error-container/10 dark:bg-red-950/20 border-error text-error'
                                          : 'bg-green-500/5 dark:bg-green-950/10 border-green-500 text-green-700 dark:text-green-300 opacity-70 hover:opacity-100'
                                      }`}
                                    style={{ top: calculateTopOffset(appt.time), height: `${Math.max(60, (appt.durationMins || 45) / 60 * 80)}px` }}
                                    title={lang === 'vi' ? 'Nhấp để đổi trạng thái lịch hẹn' : 'Click to cycle appointment status'}
                                  >
                                    <div className="text-left flex-1 min-w-0 pr-sm">
                                      <div className="flex items-center gap-xs mb-[2px]">
                                        {isPri && (
                                          <span className="material-symbols-outlined text-[16px] text-error animate-pulse">emergency</span>
                                        )}
                                        <p className="font-bold text-body-md truncate group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">
                                          {appt.name}
                                        </p>
                                        <span className="text-body-sm font-semibold opacity-80 select-none">
                                          ({appt.time})
                                        </span>
                                      </div>
                                      <p className="text-body-sm opacity-90 truncate leading-normal">
                                        {appt.type} • <span className="font-medium">{appt.doctor}</span>
                                      </p>
                                    </div>
                                    <span className={`text-[10px] font-bold px-sm py-[2px] rounded uppercase tracking-wider border select-none ${isCheck
                                      ? 'bg-primary-container/20 border-primary/20 text-primary dark:text-primary-fixed-dim'
                                      : isWait
                                        ? 'bg-amber-100 dark:bg-amber-950/40 border-amber-500/20 text-amber-700 dark:text-amber-300'
                                        : isPri
                                          ? 'bg-error-container/20 border-error/20 text-error'
                                          : 'bg-green-100 dark:bg-green-950/40 border-green-500/20 text-green-700 dark:text-green-300'
                                      }`}>
                                      {lang === 'vi' ? appt.status : (
                                        isCheck ? t.checkedInStatus :
                                          isWait ? t.waitingAppt :
                                            isPri ? t.priorityStatus : t.completed
                                      )}
                                    </span>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant dark:text-slate-500 bg-surface-container-lowest/50 dark:bg-slate-900/40 select-none">
                                <span className="material-symbols-outlined text-[48px] mb-sm opacity-50">calendar_today</span>
                                <p className="font-body-md">{lang === 'vi' ? 'Không có lịch hẹn nào trong ngày này.' : 'No appointments scheduled for this day.'}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : apptView === 'week' ? (
                        <div className="grid grid-cols-7 gap-sm p-md h-full">
                          {getWeekDates(selectedDate).map(day => {
                            const dayKey = toDateKey(day);
                            const dayAppointments = visibleAppointments.filter(appt => appt.date === dayKey);
                            const isToday = toDateKey(new Date()) === dayKey;
                            return (
                              <div 
                                key={dayKey} 
                                className={`rounded-lg border p-sm min-h-[360px] flex flex-col transition-all ${isToday
                                  ? 'border-primary bg-primary-container/5 dark:border-primary-fixed-dim dark:bg-blue-950/10 shadow-xs'
                                  : 'border-outline-variant dark:border-slate-700 bg-surface-container-low/40 dark:bg-slate-900/20'
                                  }`}
                              >
                                <div className="text-center border-b border-outline-variant/60 dark:border-slate-700/60 pb-sm mb-sm flex flex-col items-center justify-center">
                                  <p className={`text-[11px] uppercase tracking-wider font-semibold ${isToday ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}>
                                    {day.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { weekday: 'short' })}
                                  </p>
                                  <p className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-body-lg mt-xs ${isToday ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface dark:text-white'}`}>
                                    {day.getDate()}
                                  </p>
                                </div>
                                <div className="space-y-sm flex-1 overflow-y-auto custom-scrollbar max-h-[260px]">
                                  {dayAppointments.length > 0 ? (
                                    dayAppointments.sort((a, b) => a.time.localeCompare(b.time)).map(appt => {
                                      const isCheck = appt.status === 'Đã check-in';
                                      const isWait = appt.status === 'Đang chờ';
                                      const isPri = appt.status === 'Ưu tiên';
                                      
                                      return (
                                        <div 
                                          key={appt.id} 
                                          onClick={() => handleToggleApptStatus(appt.id)}
                                          className={`rounded border p-xs text-left cursor-pointer transition-all hover:translate-y-[-1px] hover:shadow-xs border-l-4 ${isCheck
                                            ? 'bg-primary-container/10 border-primary dark:bg-blue-950/20'
                                            : isWait
                                              ? 'bg-amber-500/5 border-amber-500 dark:bg-amber-950/10'
                                              : isPri
                                                ? 'bg-error-container/10 border-error dark:bg-red-950/20'
                                                : 'bg-green-500/5 border-green-500 dark:bg-green-950/10 opacity-70'
                                            }`}
                                          title={lang === 'vi' ? 'Nhấp để đổi trạng thái lịch hẹn' : 'Click to cycle appointment status'}
                                        >
                                          <p className="font-bold text-body-sm truncate text-on-surface dark:text-white">
                                            {appt.time} • {appt.name}
                                          </p>
                                          <p className="text-[11px] text-on-surface-variant dark:text-slate-400 truncate">
                                            {appt.type}
                                          </p>
                                        </div>
                                      );
                                    })
                                  ) : (
                                    <p className="text-center text-[11px] text-on-surface-variant/60 dark:text-slate-500 mt-md italic">
                                      {lang === 'vi' ? 'Không có hẹn' : 'No Appts'}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : apptView === 'month' ? (
                        <div className="p-md h-full">
                          <div className="grid grid-cols-7 gap-sm">
                            {Array.from({ length: 35 }, (_, index) => {
                              const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                              const startOffset = (firstDay.getDay() + 6) % 7;
                              const date = new Date(firstDay);
                              date.setDate(firstDay.getDate() + index - startOffset);
                              const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                              const dayKey = toDateKey(date);
                              const dayAppointments = appointments.filter(appt => appt.date === dayKey);
                              const isToday = toDateKey(new Date()) === dayKey;
                              const isSelected = toDateKey(selectedDate) === dayKey;

                              return (
                                <div 
                                  key={dayKey + index} 
                                  onClick={() => setSelectedDate(date)}
                                  className={`min-h-24 rounded-lg border p-sm flex flex-col text-left transition-all cursor-pointer ${isCurrentMonth 
                                    ? isSelected
                                      ? 'border-primary bg-primary-container/10 dark:border-primary-fixed-dim dark:bg-blue-950/20 shadow-xs'
                                      : isToday
                                        ? 'border-primary/50 bg-primary/5 dark:border-primary-fixed-dim/50'
                                        : 'border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary dark:hover:border-primary-fixed-dim' 
                                    : 'border-transparent bg-surface-container-low/20 dark:bg-slate-900/10 opacity-40 hover:opacity-60'
                                    }`}
                                >
                                  <div className="flex items-center justify-between text-body-sm mb-xs select-none">
                                    <span className={`font-bold ${isToday ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface dark:text-white'}`}>
                                      {date.getDate()}
                                    </span>
                                    {dayAppointments.length > 0 && (
                                      <span className="rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-primary-fixed-dim px-2 py-0.5 text-[10px] font-bold">
                                        {dayAppointments.length}
                                      </span>
                                    )}
                                  </div>
                                  <div className="space-y-1 flex-1 overflow-y-auto custom-scrollbar max-h-[60px]">
                                    {dayAppointments.slice(0, 3).map(appt => (
                                      <div key={appt.id} className="text-[10px] rounded bg-surface-container-high dark:bg-slate-700 px-xs py-0.5 truncate text-on-surface dark:text-slate-200 font-medium">
                                        {appt.time} • {appt.name}
                                      </div>
                                    ))}
                                    {dayAppointments.length > 3 && (
                                      <p className="text-[9px] text-primary dark:text-primary-fixed-dim font-bold pl-xs">
                                        + {dayAppointments.length - 3} {lang === 'vi' ? 'lịch hẹn' : 'more'}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="p-md grid grid-cols-4 gap-sm h-full">
                          {Array.from({ length: 12 }, (_, index) => {
                            const monthDate = new Date(selectedDate.getFullYear(), index, 1);
                            const monthAppointments = appointments.filter(appt => {
                              const apptDate = new Date(`${appt.date}T00:00:00`);
                              return apptDate.getMonth() === monthDate.getMonth() && apptDate.getFullYear() === monthDate.getFullYear();
                            });
                            const isCurrentMonth = new Date().getMonth() === index && new Date().getFullYear() === selectedDate.getFullYear();

                            return (
                              <div 
                                key={monthDate.toString()} 
                                onClick={() => {
                                  setSelectedDate(monthDate);
                                  setApptView('month');
                                }}
                                className={`rounded-lg border p-md flex flex-col text-left transition-colors cursor-pointer hover:border-primary dark:hover:border-primary-fixed-dim ${isCurrentMonth
                                  ? 'border-primary bg-primary-container/5 dark:border-primary-fixed-dim dark:bg-blue-950/10 shadow-xs'
                                  : 'border-outline-variant dark:border-slate-700 bg-surface-container-low/40 dark:bg-slate-900/20 hover:bg-white dark:hover:bg-slate-800'
                                  }`}
                              >
                                <p className="text-body-sm font-bold text-on-surface dark:text-white uppercase tracking-wider mb-xs">
                                  {monthDate.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { month: 'long' })}
                                </p>
                                <div className="mt-auto flex items-center gap-xs text-[12px] font-semibold text-primary dark:text-primary-fixed-dim">
                                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                                  {monthAppointments.length} {lang === 'vi' ? 'lịch hẹn' : 'appointments'}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Bento Status Counters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-md text-left">
                    {/* Waiting card */}
                    <div className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-lg rounded-lg hover:border-primary dark:hover:border-primary-fixed-dim hover:shadow-md transition-all duration-300 flex items-start gap-md">
                      <div className="w-12 h-12 rounded-lg bg-surface-container-high dark:bg-slate-700 flex items-center justify-center text-on-surface-variant dark:text-slate-350 flex-shrink-0">
                        <span className="material-symbols-outlined text-[28px]">hourglass_empty</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-md text-[11px] text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mb-xs">{t.waitingAppt}</p>
                        <p className="font-headline-xl text-[28px] font-bold text-on-surface dark:text-white leading-none mb-sm">{apptWaiting}</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant dark:text-slate-400 leading-tight">
                          {lang === 'vi' ? 'Bệnh nhân đang chờ tới lượt khám tại sảnh.' : 'Patients waiting in the lobby for their turn.'}
                        </p>
                      </div>
                    </div>

                    {/* In Room card */}
                    <div className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-lg rounded-lg hover:border-secondary dark:hover:border-secondary-fixed-dim hover:shadow-md transition-all duration-300 flex items-start gap-md">
                      <div className="w-12 h-12 rounded-lg bg-secondary-container dark:bg-teal-950/40 flex items-center justify-center text-on-secondary-container dark:text-teal-300 flex-shrink-0">
                        <span className="material-symbols-outlined text-[28px]">meeting_room</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-md text-[11px] text-on-secondary-container dark:text-teal-300 uppercase tracking-wider mb-xs">{t.inRoom}</p>
                        <p className="font-headline-xl text-[28px] font-bold text-secondary dark:text-teal-400 leading-none mb-sm">{apptInRoom}</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant dark:text-slate-400 leading-tight">
                          {lang === 'vi' ? 'Bệnh nhân hiện đang được bác sĩ thăm khám.' : 'Patients currently inside active consultation rooms.'}
                        </p>
                      </div>
                    </div>

                    {/* Completed card */}
                    <div className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-lg rounded-lg hover:border-primary dark:hover:border-primary-fixed-dim hover:shadow-md transition-all duration-300 flex items-start gap-md">
                      <div className="w-12 h-12 rounded-lg bg-primary-container dark:bg-blue-950/40 flex items-center justify-center text-on-primary-container dark:text-primary-fixed-dim flex-shrink-0">
                        <span className="material-symbols-outlined text-[28px]">check_circle</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-md text-[11px] text-primary dark:text-primary-fixed-dim uppercase tracking-wider mb-xs">{t.completed}</p>
                        <p className="font-headline-xl text-[28px] font-bold text-primary dark:text-primary-fixed-dim leading-none mb-sm">{apptCompleted}</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant dark:text-slate-400 leading-tight">
                          {lang === 'vi' ? 'Bệnh nhân đã hoàn tất lượt khám & thanh toán.' : 'Patients who finished checks & billing today.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (4/12 Cols) */}
                <div className="col-span-12 lg:col-span-4 space-y-gutter text-left">
                  {/* Quick Action buttons */}
                  <div className="grid grid-cols-2 gap-sm">
                    <button
                      onClick={() => {
                        const el = document.getElementById('quick-booking-card');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-primary text-on-primary font-bold py-md rounded-lg flex items-center justify-center gap-sm active:scale-[0.98] transition-all hover:bg-surface-tint shadow-md hover:shadow-lg text-label-md select-none"
                    >
                      <span className="material-symbols-outlined text-[20px]">add_box</span>
                      {t.bookAppointmentAction}
                    </button>
                    <button
                      onClick={() => alert(lang === 'vi' ? 'Đang in phiếu số thứ tự tiếp nhận...' : 'Printing receipt queue ticket...')}
                      className="bg-surface-container-lowest dark:bg-slate-800 border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim font-bold py-md rounded-lg flex items-center justify-center gap-sm active:scale-[0.98] transition-all hover:bg-primary/5 shadow-sm text-label-md select-none"
                    >
                      <span className="material-symbols-outlined text-[20px]">print</span>
                      {t.printSlip}
                    </button>
                  </div>

                  {/* Quick Booking Form Card */}
                  <section id="quick-booking-card" className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg shadow-sm overflow-hidden flex flex-col">
                    <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/60 flex justify-between items-center">
                      <h3 className="font-bold text-primary dark:text-primary-fixed-dim text-body-lg uppercase tracking-wider">{t.quickBookHeader}</h3>
                      <button
                        type="button"
                        onClick={() => alert(lang === 'vi' ? 'Nhấp vào một lịch hẹn trong danh sách bên trái để hủy/dời lịch khám.' : 'Click on an appointment item in the left scheduler to cancel/reschedule.')}
                        className="text-error font-bold text-body-sm flex items-center gap-xs hover:underline transition-colors"
                      >
                        <span className="material-symbols-outlined text-body-sm">cancel</span>
                        {t.cancelReschedule}
                      </button>
                    </div>

                    <form onSubmit={handleBookingConfirmSubmit} className="p-md space-y-md">
                      <div>
                        <label className="block text-label-md text-on-surface-variant dark:text-slate-400 mb-xs uppercase tracking-wider">{t.patientTypeLabel}</label>
                        {/* Custom Selectable Cards styled like Language settings */}
                        <div className="grid grid-cols-2 gap-sm">
                          <label
                            className={`flex items-center justify-between p-sm border rounded-lg cursor-pointer transition-all ${apptForm.patientType === 'new'
                              ? 'border-primary bg-primary-container/10 font-bold dark:border-primary-fixed-dim dark:bg-blue-950/20'
                              : 'border-outline-variant dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-700'
                              }`}
                          >
                            <input
                              type="radio"
                              name="appt_patient_type"
                              className="sr-only"
                              checked={apptForm.patientType === 'new'}
                              onChange={() => setApptForm({ ...apptForm, patientType: 'new' })}
                            />
                            <span className="font-body-md text-body-md text-on-surface dark:text-white">{t.newPatRadio}</span>
                            {apptForm.patientType === 'new' ? (
                              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[20px]">check_circle</span>
                            ) : (
                              <span className="w-5 h-5 rounded-[9999px] border-2 border-outline dark:border-slate-600"></span>
                            )}
                          </label>

                          <label
                            className={`flex items-center justify-between p-sm border rounded-lg cursor-pointer transition-all ${apptForm.patientType === 'returning'
                              ? 'border-primary bg-primary-container/10 font-bold dark:border-primary-fixed-dim dark:bg-blue-950/20'
                              : 'border-outline-variant dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-700'
                              }`}
                          >
                            <input
                              type="radio"
                              name="appt_patient_type"
                              className="sr-only"
                              checked={apptForm.patientType === 'returning'}
                              onChange={() => setApptForm({ ...apptForm, patientType: 'returning' })}
                            />
                            <span className="font-body-md text-body-md text-on-surface dark:text-white">{t.returningPatRadio}</span>
                            {apptForm.patientType === 'returning' ? (
                              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[20px]">check_circle</span>
                            ) : (
                              <span className="w-5 h-5 rounded-[9999px] border-2 border-outline dark:border-slate-600"></span>
                            )}
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-label-md text-on-surface-variant dark:text-slate-400 mb-xs uppercase tracking-wider">{t.patientNameField} *</label>
                        <input
                          type="text"
                          required
                          placeholder={t.patientNamePlaceholder}
                          value={apptForm.name}
                          onChange={(e) => setApptForm({ ...apptForm, name: e.target.value })}
                          className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:text-white text-body-md transition-all placeholder:text-outline/70 dark:placeholder:text-slate-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-md">
                        <div>
                          <label className="block text-label-md text-on-surface-variant dark:text-slate-400 mb-xs uppercase tracking-wider">{t.phoneNumberField} *</label>
                          <input
                            type="tel"
                            required
                            placeholder="09xx..."
                            value={apptForm.phone}
                            onChange={(e) => setApptForm({ ...apptForm, phone: e.target.value })}
                            className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:text-white text-body-md transition-all placeholder:text-outline/70 dark:placeholder:text-slate-500"
                          />
                        </div>
                        <div>
                          <label className="block text-label-md text-on-surface-variant dark:text-slate-400 mb-xs uppercase tracking-wider">{t.apptTimeField}</label>
                          <select
                            value={apptForm.time}
                            onChange={(e) => setApptForm({ ...apptForm, time: e.target.value })}
                            className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:text-white text-body-md transition-all dark:bg-slate-800"
                          >
                            {['08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '13:00', '13:30', '14:00', '14:30', '15:00'].map(tSlot => (
                              <option key={tSlot} value={tSlot} className="dark:bg-slate-800">{tSlot}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-label-md text-on-surface-variant dark:text-slate-400 mb-xs uppercase tracking-wider">{t.specialtyDoctorField}</label>
                        <select
                          value={apptForm.doctor}
                          onChange={(e) => setApptForm({ ...apptForm, doctor: e.target.value })}
                          className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:text-white text-body-md transition-all dark:bg-slate-800"
                        >
                          {doctorsList.map(doc => (
                            <option key={doc.id} value={doc.name} className="dark:bg-slate-800">{doc.name} ({doc.clinic.split(' - ')[1]})</option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary text-on-primary py-sm rounded-lg font-label-md text-label-md shadow-md active:scale-95 hover:bg-surface-tint transition-all"
                      >
                        {t.confirmBookingBtn}
                      </button>
                    </form>
                  </section>

                  {/* Doctors List Registry Panel */}
                  <section className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg shadow-sm overflow-hidden flex flex-col">
                    <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/60">
                      <h3 className="font-bold text-primary dark:text-primary-fixed-dim text-body-lg uppercase tracking-wider">{t.doctorsClinicsHeader}</h3>
                    </div>
                    <div className="p-md space-y-sm">
                      {doctorsList.map(doc => {
                        const isAvail = doc.status === 'Trống';
                        return (
                          <div
                            key={doc.id}
                            onClick={() => handleToggleDoctorStatus(doc.id)}
                            className="flex items-center gap-md p-sm hover:bg-surface-container-low dark:hover:bg-slate-700 border border-outline-variant/60 dark:border-slate-700/60 rounded-lg cursor-pointer transition-all hover:border-primary dark:hover:border-primary-fixed-dim hover:shadow-xs group"
                            title={lang === 'vi' ? 'Nhấp để đổi trạng thái bác sĩ' : 'Click to toggle availability'}
                          >
                            {doc.avatar ? (
                              <img className="w-12 h-12 rounded-[9999px] object-cover border-2 border-outline-variant dark:border-slate-700 flex-shrink-0 shadow-sm" alt={doc.name} src={doc.avatar} />
                            ) : (
                              <div className="w-12 h-12 rounded-[9999px] bg-primary-container/20 dark:bg-blue-950/40 border-2 border-outline-variant dark:border-slate-700 flex items-center justify-center flex-shrink-0 text-primary dark:text-primary-fixed-dim shadow-sm">
                                <span className="material-symbols-outlined text-[24px]">medical_services</span>
                              </div>
                            )}
                            <div className="flex-grow min-w-0">
                              <div className="flex justify-between items-center mb-[2px]">
                                <p className="font-bold text-on-surface dark:text-white text-body-md group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors truncate">
                                  {doc.name}
                                </p>
                                <span className={`flex items-center gap-xs text-[10px] font-bold uppercase px-sm py-[2px] rounded border ${isAvail 
                                  ? 'bg-secondary-container/20 border-secondary/20 text-on-secondary-container dark:text-teal-300' 
                                  : 'bg-error-container/20 border-error/20 text-error'
                                  }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${isAvail ? 'bg-secondary dark:bg-teal-500' : 'bg-error'}`}></span>
                                  {lang === 'vi' ? doc.status : doc.statusEn}
                                </span>
                              </div>
                              <p className="text-body-sm text-on-surface-variant dark:text-slate-400 truncate">{doc.clinic}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </div>
              </div>
            </>
          )}

          {/* Tab 4: Billing */}
          {activeTab === 'Billing' && (
            <>
              {/* Header Actions */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-md text-left">
                <div>
                  <h3 className="font-headline-xl text-headline-xl text-on-surface dark:text-white">{t.billingTitle}</h3>
                  <p className="text-on-surface-variant dark:text-slate-400">{t.billingSubtitle}</p>
                </div>
                <div className="flex gap-sm">
                  <button
                    onClick={() => alert(lang === 'vi' ? 'Đang khởi tạo tải báo cáo kết toán tài chính...' : 'Preparing accounting financial billing summary...')}
                    className="flex items-center gap-xs px-md py-sm border border-outline dark:border-slate-700 text-primary dark:text-primary-fixed-dim font-bold rounded hover:bg-surface-container dark:hover:bg-slate-800 transition-colors active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                    {t.exportInvoiceBtn}
                  </button>
                  <button
                    onClick={() => {
                      const name = prompt(lang === 'vi' ? 'Nhập tên bệnh nhân:' : 'Enter patient name:');
                      const amt = prompt(lang === 'vi' ? 'Nhập số tiền hóa đơn mới (VNĐ):' : 'Enter amount ($):');
                      if (!name || !amt) return;
                      const newBill = {
                        id: Date.now(),
                        patientName: name,
                        mrn: `BN-2023-${Math.floor(1000 + Math.random() * 9000)}`,
                        service: lang === 'vi' ? 'Khám lâm sàng nâng cao' : 'Advanced Consultation Workup',
                        total: parseInt(amt) || 500000,
                        status: 'Chưa trả',
                        statusEn: 'Unpaid',
                        insurance: 'N/A',
                        fees: { exam: parseInt(amt) || 500000, lab: 0 }
                      };
                      setInvoices([newBill, ...invoices]);
                      setBillingWaitingCount(w => w + 1);
                      alert(lang === 'vi' ? 'Khởi tạo hóa đơn thu phí mới thành công!' : 'Successfully initialized new pending invoice record!');
                    }}
                    className="flex items-center gap-xs px-md py-sm bg-primary text-white font-bold rounded hover:bg-primary-container transition-colors shadow-xs active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    {t.newPaymentBtn}
                  </button>
                </div>
              </div>

              {/* Dashboard Stats row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg text-left">
                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-xl flex flex-col gap-xs shadow-xs">
                  <span className="text-body-sm text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wider">{t.pendingInvoiceLabel}</span>
                  <div className="flex items-end justify-between">
                    <span className="font-headline-lg text-headline-lg text-on-surface dark:text-white">{billingWaitingCount}</span>
                    <span className="text-tertiary dark:text-amber-500 text-body-sm font-bold">{lang === 'vi' ? '+3 hôm nay' : '+3 today'}</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-xl flex flex-col gap-xs shadow-xs">
                  <span className="text-body-sm text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wider">{t.pendingInsuranceLabel}</span>
                  <div className="flex items-end justify-between">
                    <span className="font-headline-lg text-headline-lg text-on-surface dark:text-white">{billingInsWaitingCount}</span>
                    <span className="text-primary dark:text-primary-fixed-dim text-body-sm font-bold">~15.4M VND</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-xl flex flex-col gap-xs shadow-xs">
                  <span className="text-body-sm text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wider">{t.dailyRevenueLabel}</span>
                  <div className="flex items-end justify-between">
                    <span className="font-headline-lg text-headline-lg text-on-surface dark:text-white">
                      {dailyRevAmount.toLocaleString('vi-VN')}
                    </span>
                    <span className="text-secondary dark:text-teal-400 text-body-sm font-bold">VND</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-xl flex flex-col gap-xs shadow-xs">
                  <span className="text-body-sm text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wider">{t.completionRateLabel}</span>
                  <div className="flex items-end justify-between">
                    <span className="font-headline-lg text-headline-lg text-on-surface dark:text-white">94%</span>
                    <span className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">GOOD</span>
                  </div>
                </div>
              </div>

              {/* Main table grid and checkout sidebar split */}
              <div className="grid grid-cols-12 gap-lg items-start">

                <section className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-xs text-left">
                  <div className="px-md py-sm border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
                    <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.pendingInvoicesSection}</h4>
                    <div className="flex gap-xs bg-surface-container-high dark:bg-slate-700 p-0.5 rounded">
                      {['Tất cả', 'Chưa thanh toán', 'Bảo hiểm'].map((filKey) => {
                        const isAct = billingTabFilter === filKey;
                        const labelMap = lang === 'vi' ? filKey : (
                          filKey === 'Tất cả' ? t.allTab :
                            filKey === 'Chưa thanh toán' ? t.unpaidTab : t.insuranceTab
                        );
                        return (
                          <span
                            key={filKey}
                            onClick={() => setBillingTabFilter(filKey)}
                            className={`px-sm py-1 rounded text-body-sm cursor-pointer transition-all ${isAct
                              ? 'bg-white dark:bg-slate-700 font-bold text-primary dark:text-white shadow-xs'
                              : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface'
                              }`}
                          >
                            {labelMap}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700">
                          <th className="px-md py-4 font-bold text-on-surface-variant dark:text-slate-350 text-body-sm uppercase">{t.patientCol}</th>
                          <th className="px-md py-4 font-bold text-on-surface-variant dark:text-slate-355 text-body-sm uppercase">{t.serviceCol}</th>
                          <th className="px-md py-4 font-bold text-on-surface-variant dark:text-slate-355 text-body-sm uppercase">{t.totalCol}</th>
                          <th className="px-md py-4 font-bold text-on-surface-variant dark:text-slate-355 text-body-sm uppercase">{t.statusCol}</th>
                          <th className="px-md py-4 font-bold text-on-surface-variant dark:text-slate-355 text-body-sm uppercase">{t.insuranceCol}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant dark:divide-slate-700/60 text-body-md text-on-surface dark:text-slate-200">
                        {filteredInvoices.map((inv, idx) => {
                          const isUnpaid = inv.status === 'Chưa trả';
                          const isBh = inv.status === 'Đang chờ BH';
                          const isOver = inv.status === 'Quá hạn';
                          const isComp = inv.status === 'Hoàn tất';
                          const isSel = selectedInvoice && selectedInvoice.id === inv.id;

                          return (
                            <tr
                              key={inv.id}
                              onClick={() => setSelectedInvoice(inv)}
                              className={`${isSel ? 'bg-primary-fixed/20 dark:bg-slate-700/70 ring-2 ring-primary dark:ring-primary-fixed-dim ring-inset' : (idx % 2 === 1 ? 'bg-slate-50/20 dark:bg-slate-900/10' : 'bg-white dark:bg-slate-800')} hover:bg-surface-container-low dark:hover:bg-slate-700/40 transition-colors group cursor-pointer`}
                            >
                              <td className="px-md py-4">
                                <div className="flex flex-col">
                                  <span className="font-bold group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">{inv.patientName}</span>
                                  <span className="text-[11px] text-on-surface-variant dark:text-slate-400">{inv.mrn}</span>
                                </div>
                              </td>
                              <td className="px-md py-4 text-on-surface-variant dark:text-slate-350">{inv.service}</td>
                              <td className="px-md py-4 font-data-mono text-primary dark:text-primary-fixed-dim font-bold">
                                {inv.total.toLocaleString('vi-VN')} ₫
                              </td>
                              <td className="px-md py-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${isComp
                                  ? 'bg-secondary-container/20 text-on-secondary-container dark:text-teal-400'
                                  : isBh
                                    ? 'bg-tertiary-fixed/30 text-tertiary dark:text-amber-500'
                                    : 'bg-error-container text-on-error-container'
                                  }`}>
                                  {lang === 'vi' ? inv.status : (
                                    isComp ? t.completedStatus :
                                      isBh ? t.pendingBhStatus :
                                        isOver ? t.overdueStatus : t.unpaidStatus
                                  )}
                                </span>
                              </td>
                              <td className="px-md py-4 font-medium text-on-surface-variant dark:text-slate-350">
                                {inv.insurance === 'N/A' || inv.insurance === 'Cá nhân' ? (
                                  <span className="italic opacity-60">
                                    {inv.insurance === 'Cá nhân' ? t.individualText : 'N/A'}
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-xs text-body-sm text-secondary dark:text-teal-400">
                                    <span className="material-symbols-outlined text-[16px]">verified</span>
                                    {inv.insurance}
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-md bg-surface-container-low dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 flex justify-between items-center text-body-sm text-on-surface-variant dark:text-slate-400">
                    <span>
                      {t.showingInvoicesText.replace('{count}', filteredInvoices.length.toString()).replace('{total}', invoices.length.toString())}
                    </span>
                    <div className="flex gap-sm">
                      <button className="p-1 hover:bg-surface-container-high dark:hover:bg-slate-800 rounded transition-colors active:scale-95 disabled:opacity-30" disabled>
                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                      </button>
                      <button className="p-1 hover:bg-surface-container-high dark:hover:bg-slate-800 rounded transition-colors active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </section>

                <aside className="col-span-12 lg:col-span-4 space-y-lg text-left">
                  <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs flex flex-col">
                    <div className="flex items-center justify-between mb-lg border-b border-outline-variant/30 dark:border-slate-700/50 pb-3">
                      <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.processPaymentHeader}</h4>
                      <span className="material-symbols-outlined text-outline dark:text-slate-400">credit_card</span>
                    </div>

                    {selectedInvoice ? (
                      <div className="space-y-md">
                        <div className="p-md bg-primary/5 dark:bg-slate-900/60 border border-primary/20 dark:border-slate-700 rounded-lg">
                          <div className="flex justify-between items-start mb-sm">
                            <div>
                              <p className="text-body-sm text-on-surface-variant dark:text-slate-400">{t.selectedInvoiceLabel}</p>
                              <p className="font-bold text-on-surface dark:text-white">{selectedInvoice.mrn} ({selectedInvoice.patientName})</p>
                            </div>
                            <button
                              onClick={() => setSelectedInvoice(null)}
                              className="text-primary dark:text-primary-fixed-dim hover:underline text-body-sm font-bold"
                            >
                              {t.changeBtn}
                            </button>
                          </div>

                          <div className="flex justify-between py-xs border-t border-primary/10 mt-sm text-body-sm">
                            <span className="text-on-surface-variant dark:text-slate-400">{t.examFeeText}</span>
                            <span className="font-data-mono dark:text-white">{(selectedInvoice.fees?.exam || 0).toLocaleString('vi-VN')} ₫</span>
                          </div>
                          <div className="flex justify-between py-xs text-body-sm">
                            <span className="text-on-surface-variant dark:text-slate-400">{t.labFeeText}</span>
                            <span className="font-data-mono dark:text-white">{(selectedInvoice.fees?.lab || 0).toLocaleString('vi-VN')} ₫</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-sm">
                          <div className="flex flex-col gap-xs">
                            <label className="text-label-md text-on-surface-variant dark:text-slate-355 uppercase">{t.discountLabel}</label>
                            <div className="relative">
                              <input
                                type="text"
                                value={discountPercent}
                                onChange={(e) => setDiscountPercent(e.target.value)}
                                className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded px-sm py-xs focus:ring-1 focus:ring-primary outline-none dark:text-white text-body-md"
                              />
                              <span className="material-symbols-outlined absolute right-xs top-1/2 -translate-y-1/2 text-outline dark:text-slate-400 text-[16px]">percent</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-xs">
                            <label className="text-label-md text-on-surface-variant dark:text-slate-355 uppercase">{t.methodLabel}</label>
                            <select
                              value={paymentMethod}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded px-sm py-xs focus:ring-1 focus:ring-primary outline-none dark:text-white text-body-md bg-white"
                            >
                              <option value="Tiền mặt">{t.cashOption}</option>
                              <option value="Chuyển khoản">{t.transferOption}</option>
                              <option value="Thẻ (POS)">{t.cardOption}</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-md border-t border-outline-variant dark:border-slate-700">
                          <div className="flex justify-between items-center mb-md">
                            <span className="font-bold text-body-lg dark:text-white">{t.totalLabel}</span>
                            <span className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim">
                              {calculateBillingTotal().toLocaleString('vi-VN')} ₫
                            </span>
                          </div>

                          <div className="space-y-sm">
                            <button
                              onClick={handleConfirmInvoicePayment}
                              className="w-full py-md bg-primary hover:bg-primary-container text-white font-bold rounded-lg transition-all active:scale-[0.98] shadow-xs flex justify-center items-center gap-sm"
                            >
                              <span className="material-symbols-outlined">check_circle</span>
                              {t.confirmPaymentBtn}
                            </button>
                            <button
                              type="button"
                              onClick={handleApplyDiscount}
                              className="w-full py-sm border border-outline dark:border-slate-700 text-on-surface-variant dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold rounded-lg transition-all active:scale-[0.98] flex justify-center items-center gap-sm"
                            >
                              <span className="material-symbols-outlined text-[20px]">sell</span>
                              {t.applyDiscountBtn}
                            </button>
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="py-8 text-center text-on-surface-variant dark:text-slate-455">
                        <span className="material-symbols-outlined text-[48px] block mb-2 opacity-35">
                          input_indicator
                        </span>
                        {lang === 'vi' ? 'Vui lòng chọn một hóa đơn từ bảng danh sách bên trái để tiến hành kết toán thu phí.' : 'Select an invoice from the table on the left to begin payment processing.'}
                      </div>
                    )}
                  </section>

                  <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md shadow-xs">
                    <h4 className="font-label-md text-on-surface-variant dark:text-slate-350 uppercase mb-md tracking-wider">
                      {t.recentHistoryHeader}
                    </h4>
                    <div className="space-y-md">
                      {recentTransactions.map(log => {
                        return (
                          <div key={log.id} className="flex items-center gap-md">
                            {log.isPrint ? (
                              <div
                                onClick={() => handlePrintVATInvoiceLog(log.id)}
                                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-outline dark:text-slate-300 cursor-pointer hover:bg-slate-200"
                              >
                                <span className="material-symbols-outlined text-[18px]">print</span>
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-secondary-container/20 text-on-secondary-container dark:text-teal-400 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">done</span>
                              </div>
                            )}
                            <div className="flex-1 text-left">
                              <p className="text-body-sm font-bold text-on-surface dark:text-white">{log.title}</p>
                              <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{log.subtitle}</p>
                            </div>
                            {log.isPrint ? (
                              <span className="material-symbols-outlined text-outline dark:text-slate-400 text-[16px] cursor-pointer" onClick={() => handlePrintVATInvoiceLog(log.id)}>print</span>
                            ) : (
                              <span className="font-data-mono text-body-sm text-secondary dark:text-teal-400 font-bold">{log.badge}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </aside>

              </div>
            </>
          )}

          {/* Tab 5: Settings */}
          {activeTab === 'Settings' && (
            <>
              {/* Settings Canvas Split Layout */}
              <div className="grid grid-cols-12 gap-lg items-stretch text-left">

                {/* Left Column: Profile Card & Language (4 Cols) */}
                <div className="col-span-12 lg:col-span-4 space-y-lg flex flex-col justify-between">

                  {/* Operator Profile Card */}
                  <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 overflow-hidden relative shadow-xs flex-grow">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-md">
                        <div className="w-24 h-24 rounded-full border-4 border-surface-container dark:border-slate-700 overflow-hidden shadow-sm">
                          <img
                            className="w-full h-full object-cover"
                            alt="Vietnamese medical staff profile picture"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnerl56n_F9eFnvMNkioc0rRGXaRqhDKxKIwsGfnQEWaeW7G-CkwmS8AEliFrtssc_MJeBS4Fzmqxa48XciqTKBzE0ncgPi-sHdUFPVL2degXxiIr6xZXUWgXZYuOS6fke-EAB72UEGanr-QiEKTLWb-ZbWwIvngAACMxKyhrlEyZ8UYgQPIaPOgFbBfUxB7GI-K-0yVop9pTg9QAxBt4NOYezG5a62ShOVplek5dqKhObvRoSlzer"
                          />
                        </div>
                        <button
                          onClick={handleEditOperatorProfile}
                          className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full border-2 border-white dark:border-slate-800 hover:scale-105 transition-transform"
                          title={lang === 'vi' ? 'Sửa thông tin cá nhân' : 'Edit profile info'}
                        >
                          <span className="material-symbols-outlined text-[16px] block">edit</span>
                        </button>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">{operatorProfile.name}</h2>
                      <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? operatorProfile.role : operatorProfile.roleEn}</p>

                      <div className="mt-lg w-full space-y-sm">
                        <div className="flex justify-between items-center py-sm border-b border-outline-variant dark:border-slate-700">
                          <span className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase">{t.empCodeLabel}</span>
                          <span className="font-data-mono text-data-mono text-primary dark:text-primary-fixed-dim font-bold">{operatorProfile.code}</span>
                        </div>
                        <div className="flex justify-between items-center py-sm border-b border-outline-variant dark:border-slate-700">
                          <span className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase">{t.facilityLabel}</span>
                          <span className="font-body-md text-body-md dark:text-slate-200">{lang === 'vi' ? operatorProfile.clinicBranch : operatorProfile.clinicBranchEn}</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Language Selection card */}
                  <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 shadow-xs">
                    <div className="flex items-center gap-sm mb-md text-primary dark:text-primary-fixed-dim">
                      <span className="material-symbols-outlined">language</span>
                      <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.languageLabel}</h3>
                    </div>
                    <div className="space-y-sm">
                      <label
                        onClick={() => setLang('vi')}
                        className={`flex items-center justify-between p-sm border rounded-lg cursor-pointer transition-all ${lang === 'vi'
                          ? 'border-primary bg-primary/5 dark:bg-slate-700'
                          : 'border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                          }`}
                      >
                        <div className="flex items-center gap-sm">
                          <span className="w-6 h-4 bg-red-600 rounded-sm"></span>
                          <span className={`font-body-md text-body-md dark:text-white ${lang === 'vi' ? 'font-bold' : ''}`}>{t.vietnameseLabel}</span>
                        </div>
                        {lang === 'vi' ? (
                          <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">check_circle</span>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-outline dark:border-slate-500"></div>
                        )}
                      </label>

                      <label
                        onClick={() => setLang('en')}
                        className={`flex items-center justify-between p-sm border rounded-lg cursor-pointer transition-all ${lang === 'en'
                          ? 'border-primary bg-primary/5 dark:bg-slate-700'
                          : 'border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                          }`}
                      >
                        <div className="flex items-center gap-sm">
                          <span className="w-6 h-4 bg-blue-800 rounded-sm"></span>
                          <span className={`font-body-md text-body-md dark:text-white ${lang === 'en' ? 'font-bold' : ''}`}>{t.englishLabel}</span>
                        </div>
                        {lang === 'en' ? (
                          <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">check_circle</span>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-outline dark:border-slate-500"></div>
                        )}
                      </label>
                    </div>
                  </section>

                </div>

                {/* Right Column: Notification settings & Preferences (8 Cols) */}
                <div className="col-span-12 lg:col-span-8 space-y-lg flex flex-col justify-between">

                  {/* Notification config cards */}
                  <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 shadow-xs">
                    <div className="flex items-center gap-sm mb-lg text-primary dark:text-primary-fixed-dim">
                      <span className="material-symbols-outlined">notifications_active</span>
                      <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.notificationConfigHeader}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      {/* Alert 1 */}
                      <div className="p-md border border-outline-variant dark:border-slate-700 rounded-lg hover:border-primary transition-colors flex items-start gap-md bg-white dark:bg-slate-800">
                        <div className="w-10 h-10 rounded-lg bg-secondary-container/20 text-on-secondary-container dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined">person_add</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-xs">
                            <p className="font-bold text-on-surface dark:text-white text-body-md">{t.newRegAlertTitle}</p>
                            <button
                              type="button"
                              onClick={() => setSettingsForm({ ...settingsForm, notifyNewRegistration: !settingsForm.notifyNewRegistration })}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${settingsForm.notifyNewRegistration ? 'bg-primary' : 'bg-surface-dim dark:bg-slate-700'
                                }`}
                            >
                              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${settingsForm.notifyNewRegistration ? 'translate-x-5' : 'translate-x-0'
                                }`}></span>
                            </button>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 leading-tight">{t.newRegAlertDesc}</p>
                        </div>
                      </div>

                      {/* Alert 2 */}
                      <div className="p-md border border-outline-variant dark:border-slate-700 rounded-lg hover:border-primary transition-colors flex items-start gap-md bg-white dark:bg-slate-800">
                        <div className="w-10 h-10 rounded-lg bg-tertiary-container/10 text-tertiary dark:text-amber-500 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined">account_balance_wallet</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-xs">
                            <p className="font-bold text-on-surface dark:text-white text-body-md">{t.paymentAlertTitle}</p>
                            <button
                              type="button"
                              onClick={() => setSettingsForm({ ...settingsForm, notifyPayment: !settingsForm.notifyPayment })}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${settingsForm.notifyPayment ? 'bg-primary' : 'bg-surface-dim dark:bg-slate-700'
                                }`}
                            >
                              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${settingsForm.notifyPayment ? 'translate-x-5' : 'translate-x-0'
                                }`}></span>
                            </button>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 leading-tight">{t.paymentAlertDesc}</p>
                        </div>
                      </div>

                      {/* Alert 3 */}
                      <div className="p-md border border-outline-variant dark:border-slate-700 rounded-lg hover:border-primary transition-colors flex items-start gap-md bg-white dark:bg-slate-800">
                        <div className="w-10 h-10 rounded-lg bg-surface-container dark:bg-slate-900 text-on-surface-variant dark:text-slate-300 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined">event_repeat</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-xs">
                            <p className="font-bold text-on-surface dark:text-white text-body-md">{t.apptAlertTitle}</p>
                            <button
                              type="button"
                              onClick={() => setSettingsForm({ ...settingsForm, notifyApptChange: !settingsForm.notifyApptChange })}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${settingsForm.notifyApptChange ? 'bg-primary' : 'bg-surface-dim dark:bg-slate-700'
                                }`}
                            >
                              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${settingsForm.notifyApptChange ? 'translate-x-5' : 'translate-x-0'
                                }`}></span>
                            </button>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 leading-tight">{t.apptAlertDesc}</p>
                        </div>
                      </div>

                      {/* Alert 4 */}
                      <div className="p-md border border-error-container bg-error-container/5 rounded-lg flex items-start gap-md">
                        <div className="w-10 h-10 rounded-lg bg-error text-white flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-xs">
                            <p className="font-bold text-error text-body-md">{t.emergencyAlertTitle}</p>
                            <span className="material-symbols-outlined text-error text-[18px]">lock</span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-error-container leading-tight">{t.emergencyAlertDesc}</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Workspace Preferences */}
                  <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 shadow-xs flex-grow">
                    <div className="flex items-center gap-sm mb-lg text-primary dark:text-primary-fixed-dim">
                      <span className="material-symbols-outlined">desktop_windows</span>
                      <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.workspacePrefsHeader}</h3>
                    </div>

                    <div className="space-y-xl">
                      {/* View modes */}
                      <div>
                        <h4 className="font-label-md text-label-md text-on-surface-variant dark:text-slate-350 uppercase mb-md tracking-wider">
                          {t.queueDisplayModeLabel}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
                          {/* List view */}
                          <div
                            onClick={() => setSettingsForm({ ...settingsForm, workspaceViewMode: 'list' })}
                            className={`p-md rounded-lg border-2 cursor-pointer transition-all ${settingsForm.workspaceViewMode === 'list'
                              ? 'border-primary bg-primary/5 dark:bg-slate-700'
                              : 'border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                              }`}
                          >
                            <div className="flex flex-col items-center gap-sm">
                              <span className={`material-symbols-outlined text-[32px] ${settingsForm.workspaceViewMode === 'list' ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}>view_list</span>
                              <p className={`font-body-md text-body-md ${settingsForm.workspaceViewMode === 'list' ? 'font-bold dark:text-white' : 'dark:text-slate-300'}`}>{t.listViewOption}</p>
                            </div>
                          </div>

                          {/* Grid view */}
                          <div
                            onClick={() => setSettingsForm({ ...settingsForm, workspaceViewMode: 'grid' })}
                            className={`p-md rounded-lg border-2 cursor-pointer transition-all ${settingsForm.workspaceViewMode === 'grid'
                              ? 'border-primary bg-primary/5 dark:bg-slate-700'
                              : 'border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                              }`}
                          >
                            <div className="flex flex-col items-center gap-sm">
                              <span className={`material-symbols-outlined text-[32px] ${settingsForm.workspaceViewMode === 'grid' ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}>grid_view</span>
                              <p className={`font-body-md text-body-md ${settingsForm.workspaceViewMode === 'grid' ? 'font-bold dark:text-white' : 'dark:text-slate-300'}`}>{t.gridViewOption}</p>
                            </div>
                          </div>

                          {/* Split screen view */}
                          <div
                            onClick={() => setSettingsForm({ ...settingsForm, workspaceViewMode: 'split' })}
                            className={`p-md rounded-lg border-2 cursor-pointer transition-all ${settingsForm.workspaceViewMode === 'split'
                              ? 'border-primary bg-primary/5 dark:bg-slate-700'
                              : 'border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                              }`}
                          >
                            <div className="flex flex-col items-center gap-sm">
                              <span className={`material-symbols-outlined text-[32px] ${settingsForm.workspaceViewMode === 'split' ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}>splitscreen</span>
                              <p className={`font-body-md text-body-md ${settingsForm.workspaceViewMode === 'split' ? 'font-bold dark:text-white' : 'dark:text-slate-300'}`}>{t.splitViewOption}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Detail triggers */}
                      <div className="space-y-md">
                        {/* Auto refresh */}
                        <div className="flex items-center justify-between py-sm border-b border-outline-variant dark:border-slate-700">
                          <div>
                            <p className="font-bold text-on-surface dark:text-white text-body-md">{t.autoRefreshLabel}</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{t.autoRefreshDesc}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSettingsForm({ ...settingsForm, autoRefreshQueue: !settingsForm.autoRefreshQueue })}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${settingsForm.autoRefreshQueue ? 'bg-primary' : 'bg-surface-dim dark:bg-slate-700'
                              }`}
                          >
                            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${settingsForm.autoRefreshQueue ? 'translate-x-5' : 'translate-x-0'
                              }`}></span>
                          </button>
                        </div>

                        {/* Sound notify */}
                        <div className="flex items-center justify-between py-sm border-b border-outline-variant dark:border-slate-700">
                          <div>
                            <p className="font-bold text-on-surface dark:text-white text-body-md">{t.soundNotifyLabel}</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{t.soundNotifyDesc}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSettingsForm({ ...settingsForm, soundChimeNotification: !settingsForm.soundChimeNotification })}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${settingsForm.soundChimeNotification ? 'bg-primary' : 'bg-surface-dim dark:bg-slate-700'
                              }`}
                          >
                            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${settingsForm.soundChimeNotification ? 'translate-x-5' : 'translate-x-0'
                              }`}></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Settings Action Footer */}
                  <div className="flex justify-end gap-md pt-md">
                    <button
                      onClick={handleCancelSettings}
                      className="px-xl py-sm rounded-lg border border-outline dark:border-slate-700 text-on-surface-variant dark:text-slate-300 font-label-md text-label-md hover:bg-surface-container dark:hover:bg-slate-700 hover:text-on-surface transition-colors active:scale-95"
                    >
                      {t.cancelBtn}
                    </button>
                    <button
                      onClick={handleSaveChangesSettings}
                      className="px-xl py-sm rounded-lg bg-primary text-white font-label-md text-label-md shadow-xs active:scale-95 transition-all"
                    >
                      {t.saveChangesBtn}
                    </button>
                  </div>

                </div>

              </div>
            </>
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
              <p className="text-body-md text-on-surface-variant dark:text-slate-405">
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
            <p className="text-body-md text-on-surface-variant dark:text-slate-355 mb-lg">
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
                  className="px-md py-sm border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-350 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-semibold"
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
