import { useState } from 'react';

export default function useAdminSettings() {
  const [hospitalSettings, setHospitalSettings] = useState({
    name: 'Bệnh viện Đa khoa Quốc tế Central',
    address: 'Số 15, Đường Duy Tân, Quận Cầu Giấy, TP. Hà Nội',
    email: 'contact@centralhospital.vn',
    phone: '+84 24 3456 7890',
    code: 'HOSP-VN-88210-9'
  });
  const [smtpEnabled, setSmtpEnabled] = useState(true);
  const [smtpHost, setSmtpHost] = useState('smtp.office365.com');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('system@centralhospital.vn');
  const [pushPatient, setPushPatient] = useState(true);
  const [pushDoctor, setPushDoctor] = useState(false);
  const [systemLang, setSystemLang] = useState('vi');
  const [systemTimezone, setSystemTimezone] = useState('GMT+07:00');
  const [systemDateFormat, setSystemDateFormat] = useState('DD/MM/YYYY');
  const [modulesState, setModulesState] = useState([
    { id: 1, nameVi: 'Hồ sơ Bệnh án Điện tử (EMR)', nameEn: 'Electronic Medical Record (EMR)', version: 'v4.2.1-stable', descVi: 'Quản lý lịch sử khám chữa bệnh', descEn: 'Manage medical history and visits', active: true, icon: 'clinical_notes', updateDate: '12/05/2024' },
    { id: 2, nameVi: 'Quản lý Kho Dược (LIS/PIS)', nameEn: 'Pharmacy & Lab (LIS/PIS)', version: 'v3.9.0-hotfix', descVi: 'Kiểm soát thuốc và vật tư y tế', descEn: 'Control drugs and medical supplies', active: true, icon: 'inventory_2', updateDate: '08/05/2024' },
    { id: 3, nameVi: 'Thanh toán & Bảo hiểm', nameEn: 'Billing & Insurance', version: 'v1.12.0', descVi: 'Kết nối BHXH và cổng thanh toán', descEn: 'Connect social insurance and payment gateways', active: false, icon: 'finance', updateDate: '25/04/2024' },
  ]);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return {
    maintenanceMode,
    setMaintenanceMode,
    hospitalSettings,
    setHospitalSettings,
    smtpEnabled,
    setSmtpEnabled,
    smtpHost,
    setSmtpHost,
    smtpPort,
    setSmtpPort,
    smtpUser,
    setSmtpUser,
    pushPatient,
    setPushPatient,
    pushDoctor,
    setPushDoctor,
    systemLang,
    setSystemLang,
    systemTimezone,
    setSystemTimezone,
    systemDateFormat,
    setSystemDateFormat,
    modulesState,
    setModulesState
  };
}
