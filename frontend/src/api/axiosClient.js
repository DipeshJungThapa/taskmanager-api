import axios from "axios";

const axiosClient = axios.create({
  // Use relative path so Vite dev server proxy forwards to Django in dev
  baseURL: "/api",
});

// Attach token to every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("API Request:", config.method.toUpperCase(), config.url, config.headers);
  return config;
});

// Log responses and handle errors
axiosClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.config.url, response.status, response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
