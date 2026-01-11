import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/users";

// Register API
export const registerAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/register`,
    {
      email: userData.email,
      password: userData.password,
      username: userData.username,
    },
    { withCredentials: true }
  );
  return response.data;
};

// Login API
export const loginAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/login`,
    {
      email: userData.email,
      password: userData.password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Logout API
export const logoutAPI = async () => {
  const response = await axios.post(
    `${BASE_URL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Check auth status API
export const checkUserAuthStatusAPI = async () => {
  const response = await axios.get(`${BASE_URL}/auth/check`, {
    withCredentials: true,
  });
  return response.data;
};

// Get user profile API
export const getUserProfileAPI = async () => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    withCredentials: true,
  });
  return response.data;
};
