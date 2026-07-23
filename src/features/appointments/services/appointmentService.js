const API_URL = 'http://localhost:5000/api/appointments';

const appointmentService = {
  getBookingData: async (token) => {
    const response = await fetch(`${API_URL}/booking-data`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể tải danh sách bác sĩ và khoa phòng');
    }
    return data;
  },

  createAppointment: async (token, appointmentData) => {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(appointmentData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Đặt lịch hẹn khám thất bại');
    }
    return data;
  },

  getPatientAppointments: async (token) => {
    const response = await fetch(`${API_URL}/patient`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể tải lịch hẹn của bạn');
    }
    return data;
  },

  getDoctorAppointments: async (token) => {
    const response = await fetch(`${API_URL}/doctor`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể tải lịch hẹn của bác sĩ');
    }
    return data;
  },

  getAllAppointments: async (token, filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });

    const response = await fetch(`${API_URL}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể tải toàn bộ danh sách lịch hẹn');
    }
    return data;
  },

  updateAppointmentStatus: async (token, id, status) => {
    const response = await fetch(`${API_URL}/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Cập nhật trạng thái lịch hẹn thất bại');
    }
    return data;
  }
};

export default appointmentService;
