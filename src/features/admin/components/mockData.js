

export const initialStaffList = [
  { id: 1, name: 'Dr. Trần Đức', email: 'tran.duc@medilink.vn', role: 'Doctor', dept: 'Ngoại Thần Kinh', status: 'Đang trực', statusEn: 'On-Duty', load: '10 phút trước', avatar: null },
  { id: 2, name: 'Lê Thị Mai', email: 'mai.le@medilink.vn', role: 'Nurse', dept: 'Cấp Cứu (ER)', status: 'Sẵn sàng', statusEn: 'Ready', load: 'Hôm nay, 08:32', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp8mjIUE4UtW8kLkPahytryPtzFMP3E1ckil_sPWAXfF4Z97FrephsKuQ_WmOr5fbtQgOAmfV9ByZsFy8vb1D5TDtgZ55hXm8D_N_hExKRDNpRLqMIjpmxe9a-82-ey9_TX0r-2w7QrmbY6Bi3ruy72Ca2lTxZHtB_3o6ErTlRa9cjXLc0w7gzVlFxUoe2FkTwCmXM3-74EOHjz-2sr8z0gP940tkskzZqgS6lDGxaLZ76sqHlzKzO' },
  { id: 3, name: 'Nguyễn Văn Bình', email: 'binh.nv@medilink.vn', role: 'Administrator', dept: 'Công Nghệ Thông Tin', status: 'Bận', statusEn: 'Busy', load: '2 giờ trước', avatar: null },
  { id: 4, name: 'Phạm Hoàng', email: 'hoang.p@medilink.vn', role: 'Doctor', dept: 'Nhi Khoa', status: 'Vắng mặt', statusEn: 'Absent', load: 'Hôm qua, 17:45', avatar: null },
  { id: 5, name: 'Trịnh Hồng', email: 'hong.t@medilink.vn', role: 'Technician', dept: 'Xét Nghiệm Máu', status: 'Sẵn sàng', statusEn: 'Ready', load: 'Hôm nay, 10:15', avatar: null }
];

export const initialLogs = [
  { id: 1, time: '14:45:22', date: '24 Tháng 05, 2024', userInitials: 'NT', userName: 'Nguyễn Văn Thuận', userRole: 'Bác sĩ Trưởng', actionIcon: 'edit_document', actionText: 'Cập nhật Hồ sơ Bệnh án', ip: '192.168.1.104', level: 'INFO', detailsIcon: 'visibility' },
  { id: 2, time: '14:42:05', date: '24 Tháng 05, 2024', userInitials: 'LA', userName: 'Lê Thị Lan Anh', userRole: 'Y tá Điều dưỡng', actionIcon: 'logout', actionText: 'Đăng xuất hệ thống', ip: '172.16.254.1', level: 'INFO', detailsIcon: 'visibility' },
  { id: 3, time: '14:38:11', date: '24 Tháng 05, 2024', userInitials: '??', userName: 'Không xác định', userRole: 'Truy cập trái phép', actionIcon: 'lock_reset', actionText: 'Sai mật khẩu nhiều lần', ip: '103.45.122.9', level: 'ERROR', detailsIcon: 'report' },
  { id: 4, time: '14:30:55', date: '24 Tháng 05, 2024', userInitials: 'HM', userName: 'Hoàng Minh', userRole: 'Quản trị viên IT', actionIcon: 'cloud_download', actionText: 'Xuất dữ liệu hóa đơn', ip: '192.168.1.15', level: 'WARNING', detailsIcon: 'visibility' },
  { id: 5, time: '14:15:00', date: '24 Tháng 05, 2024', userInitials: 'PT', userName: 'Phạm Thanh', userRole: 'Kế toán trưởng', actionIcon: 'login', actionText: 'Đăng nhập hệ thống', ip: '192.168.1.55', level: 'INFO', detailsIcon: 'visibility' }
];

export const initialBackups = [
  { id: 1, name: 'medcore_prod_20260714.tar.gz', time: '2026-07-14 12:00:04', size: '1.2 TB', status: 'Success' },
  { id: 2, name: 'medcore_prod_20260713.tar.gz', time: '2026-07-13 12:00:02', size: '1.18 TB', status: 'Success' },
  { id: 3, name: 'medcore_prod_20260712.tar.gz', time: '2026-07-12 12:00:05', size: '1.19 TB', status: 'Success' }
];

export const initialDbInstances = [
  { id: 1, name: 'medilink-db-primary-sea-01', zone: 'SEA-1 (Singapore)', ping: '12ms', load: 45, status: 'ONLINE', statusColor: 'bg-secondary-container text-on-secondary-container' },
  { id: 2, name: 'medilink-db-replica-sea-02', zone: 'SEA-1 (Singapore)', ping: '15ms', load: 20, status: 'ONLINE', statusColor: 'bg-secondary-container text-on-secondary-container' },
  { id: 3, name: 'medilink-auth-cluster-01', zone: 'HAN-1 (Hanoi)', ping: '8ms', load: 88, status: 'OVERLOAD', statusColor: 'bg-tertiary-fixed text-on-tertiary-fixed', isOverload: true },
  { id: 4, name: 'medilink-storage-node-v3', zone: 'Global Edge', ping: '45ms', load: 12, status: 'ONLINE', statusColor: 'bg-secondary-container text-on-secondary-container' }
];

export const loginTrendData = [
  { day: 'T2', success: 60, fail: 10 },
  { day: 'T3', success: 75, fail: 15 },
  { day: 'T4', success: 65, fail: 12 },
  { day: 'T5', success: 85, fail: 50 },
  { day: 'T6', success: 90, fail: 8 },
  { day: 'T7', success: 40, fail: 5 },
  { day: 'CN', success: 30, fail: 2 },
];

export const maintLogs = [
  { date: '15/10/2023 23:45', typeVi: 'Xóa bộ nhớ đệm', typeEn: 'Clear Cache', actor: 'Admin_Hoang', ok: true, noteVi: 'Giải phóng 4.2GB cache hệ thống', noteEn: 'Freed 4.2GB system cache' },
  { date: '10/10/2023 02:00', typeVi: 'Tối ưu hóa DB', typeEn: 'Optimize DB', actor: 'System_Cron', ok: true, noteVi: 'Re-index các bảng PatientRecord', noteEn: 'Re-indexed PatientRecord tables' },
  { date: '01/10/2023 01:15', typeVi: 'Bảo trì Định kỳ', typeEn: 'Routine Maintenance', actor: 'Admin_Nguyen', ok: false, noteVi: 'Lỗi kết nối Socket tạm thời', noteEn: 'Temporary socket connection error' },
  { date: '25/09/2023 04:00', typeVi: 'Cập nhật Patch', typeEn: 'Security Patch', actor: 'Admin_Hoang', ok: true, noteVi: 'Vá lỗ hổng bảo mật XSS', noteEn: 'Patched XSS vulnerability' },
];
