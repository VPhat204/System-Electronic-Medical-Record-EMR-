const MEDICINE_API_URL = 'http://localhost:5000/api/medicines';
const PRESCRIPTION_API_URL = 'http://localhost:5000/api/prescriptions';

const prescriptionService = {
  /**
   * Lấy danh mục thuốc (kho dược)
   */
  getAllMedicines: async (token, search = '') => {
    try {
      const url = search ? `${MEDICINE_API_URL}?search=${encodeURIComponent(search)}` : MEDICINE_API_URL;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Không thể tải danh mục thuốc.');
      }
      return data;
    } catch (err) {
      console.error('getAllMedicines error:', err);
      return [];
    }
  },

  /**
   * Bác sĩ tạo đơn thuốc mới
   */
  createPrescription: async (token, prescriptionData) => {
    const response = await fetch(PRESCRIPTION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(prescriptionData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể tạo đơn thuốc.');
    }
    return data;
  },

  /**
   * Dược sĩ lấy danh sách đơn thuốc (chờ phát hoặc đã phát)
   */
  getPendingPrescriptions: async (token, status = 'PENDING_DISPENSE') => {
    const url = status ? `${PRESCRIPTION_API_URL}/pending?status=${status}` : `${PRESCRIPTION_API_URL}/pending`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể tải danh sách đơn thuốc.');
    }
    return data;
  },

  /**
   * Dược sĩ xác nhận phát thuốc & trừ tồn kho
   */
  dispensePrescription: async (token, prescriptionId) => {
    const response = await fetch(`${PRESCRIPTION_API_URL}/${prescriptionId}/dispense`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể duyệt phát thuốc.');
    }
    return data;
  },

  /**
   * Lấy đơn thuốc của bệnh nhân
   */
  getPatientPrescriptions: async (token, patientId) => {
    const response = await fetch(`${PRESCRIPTION_API_URL}/patient/${patientId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể tải đơn thuốc bệnh nhân.');
    }
    return data;
  },

  /**
   * Bác sĩ lấy lịch sử kê đơn
   */
  getDoctorPrescriptions: async (token) => {
    const response = await fetch(`${PRESCRIPTION_API_URL}/doctor/history`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể tải lịch sử kê đơn của bác sĩ.');
    }
    return data;
  },

  /**
   * Bác sĩ chỉnh sửa đơn thuốc
   */
  updatePrescription: async (token, prescriptionId, updateData) => {
    const response = await fetch(`${PRESCRIPTION_API_URL}/${prescriptionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể cập nhật đơn thuốc.');
    }
    return data;
  },

  /**
   * Lấy danh sách bệnh nhân thực tế từ CSDL
   */
  getSystemPatients: async (token) => {
    try {
      const response = await fetch(`${PRESCRIPTION_API_URL}/patients`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Không thể tải danh sách bệnh nhân.');
      }
      return data;
    } catch (err) {
      console.error('getSystemPatients error:', err);
      return [];
    }
  },
};

export default prescriptionService;
