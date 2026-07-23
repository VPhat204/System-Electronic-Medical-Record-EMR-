const API_URL = 'http://localhost:5000/api/medical-records';

const medicalRecordService = {
  /**
   * Tạo bệnh án mới kèm chỉ số sinh tồn (vitals).
   * Tự động chuyển trạng thái Appointment sang COMPLETED.
   * @param {string} token - JWT token
   * @param {Object} recordData - Dữ liệu bệnh án & vitals
   */
  createMedicalRecord: async (token, recordData) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(recordData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Không thể lưu bệnh án.');
      }
      return data;
    } catch (err) {
      if (err.name === 'TypeError' && (err.message.includes('fetch') || err.message.includes('Failed'))) {
        throw new Error('Không thể kết nối đến API Bệnh Án. Vui lòng KHỞI ĐỘNG LẠI Backend Server (npm run dev trong thư mục backend) để nhận Route mới.');
      }
      throw err;
    }
  },

  /**
   * Lấy toàn bộ tiền sử bệnh án của một bệnh nhân.
   * @param {string} token - JWT token
   * @param {number} patientId - ID bệnh nhân
   */
  getPatientHistory: async (token, patientId) => {
    const response = await fetch(`${API_URL}/patient/${patientId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể tải tiền sử bệnh án.');
    }
    return data;
  },

  /**
   * Lấy toàn bộ danh sách bệnh án (hoặc lọc theo patientId).
   * @param {string} token - JWT token
   * @param {number} [patientId] - (Tùy chọn) ID bệnh nhân
   */
  getAllMedicalRecords: async (token, patientId = null) => {
    try {
      const url = patientId ? `${API_URL}?patientId=${patientId}` : `${API_URL}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Không thể tải danh sách bệnh án.');
      }
      return data;
    } catch (err) {
      console.error('getAllMedicalRecords error:', err);
      return [];
    }
  },

  /**
   * Lấy chi tiết bệnh án theo ID.
   * @param {string} token - JWT token
   * @param {number} recordId - ID bệnh án
   */
  getMedicalRecordById: async (token, recordId) => {
    const response = await fetch(`${API_URL}/${recordId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể tải chi tiết bệnh án.');
    }
    return data;
  },
};

export default medicalRecordService;
