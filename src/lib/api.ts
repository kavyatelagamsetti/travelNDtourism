const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    ALL_USERS: `${API_BASE_URL}/api/auth/all-users`,
  },
  ADMIN: {
    LOGIN: `${API_BASE_URL}/api/admin/login`,
  },
  BOOKING: {
    CREATE: `${API_BASE_URL}/api/booking/create`,
    MY_BOOKINGS: `${API_BASE_URL}/api/booking/my-bookings`,
    ALL: `${API_BASE_URL}/api/booking/all`,
    UPDATE_STATUS: (id: string) => `${API_BASE_URL}/api/booking/${id}/status`,
  },
};

export default API_BASE_URL;