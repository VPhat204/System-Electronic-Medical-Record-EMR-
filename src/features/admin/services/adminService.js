const API_URL = 'http://localhost:5000/api/admin';

const adminService = {
  getUsers: async (token, filters = {}) => {
    const { role, dept, search } = filters;
    let queryParams = [];

    if (role && role !== 'All') {
      queryParams.push(`role=${encodeURIComponent(role)}`);
    }
    if (dept && dept !== 'All') {
      queryParams.push(`dept=${encodeURIComponent(dept)}`);
    }
    if (search && search.trim() !== '') {
      queryParams.push(`search=${encodeURIComponent(search.trim())}`);
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

    const response = await fetch(`${API_URL}/users${queryString}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch users');
    }
    return data;
  },

  createUser: async (token, userData) => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create user');
    }
    return data;
  },

  updateUser: async (token, userId, userData) => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update user');
    }
    return data;
  },

  deleteUser: async (token, userId) => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete user');
    }
    return data;
  }
};

export default adminService;
