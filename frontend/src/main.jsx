import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.withCredentials = true;

// Global Axios Interceptors for Error Handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if it's a network error or a specific API error
    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    
    // Don't show toast for 401 errors if it's just checking auth status (optional)
    // But for general operations, show error
    if (error.response?.status !== 401 || !error.config.url.includes('/api/auth/me')) {
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
