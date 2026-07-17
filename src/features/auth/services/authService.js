const API_URL = 'http://localhost:5000/api/auth';

const authService = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Đăng ký thất bại');
    }
    return data;
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Đăng nhập thất bại');
    }
    return data;
  },

  getMe: async (token) => {
    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Không thể lấy thông tin tài khoản');
    }
    return data;
  },

  updateSettings: async (token, settings) => {
    const response = await fetch('http://localhost:5000/api/auth/update-settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(settings)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Cập nhật cấu hình thất bại');
    }
    return data;
  },

  verifyAccount: async (email, code) => {
    const response = await fetch('http://localhost:5000/api/auth/verify-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Xác thực tài khoản thất bại');
    }
    return data;
  },

  resendOtp: async (email) => {
    const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Gửi lại mã OTP thất bại');
    }
    return data;
  }
};

export default authService;
