import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'

// ✅ ADD THIS (VERY IMPORTANT)
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// ✅ Keep this
axios.defaults.withCredentials = true;

// ✅ Interceptor (already good)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    if (
      error.response?.status !== 401 ||
      !error.config.url.includes('/api/auth/me')
    ) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)