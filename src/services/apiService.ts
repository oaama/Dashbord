import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ENDPOINTS } from '../config/apiConfig';
import { toast } from 'react-toastify';
import { User, ApiResponse } from '../types';

// Helper function to handle common errors
const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message || 'حدث خطأ في الاتصال بالخادم';
    
    // Show error toast for user feedback
    if (message) {
      toast.error(message);
    }
    
    // If unauthorized, clear auth and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login page
      window.location.href = '/login';
    }
    
    return Promise.reject(new Error(message));
  }
  
  const message = error.message || 'حدث خطأ غير متوقع';
  toast.error(message);
  return Promise.reject(error);
};

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: 'https://mrvet-production.up.railway.app', // استخدم العنوان الكامل للسيرفر الخارجي
  withCredentials: true, // Important for cookies/sessions
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    // Add auth token to all requests if it exists
    if (token) {
      if (!config.headers) {
        config.headers = new axios.AxiosHeaders();
      }
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, {
        headers: config.headers,
        data: config.data
      });
    }
    
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`, {
        status: response.status,
        data: response.data
      });
    }
    
    // Return the successful response
    return response;
  },
  (error: AxiosError) => {
    // Handle errors globally
    return handleApiError(error);
  }
);

// API Services
export const authAPI = {
  // Verify authentication token
  verifyToken: async (): Promise<AxiosResponse<{ user: any }>> => {
    try {
      const response = await api.get(ENDPOINTS.AUTH.VERIFY_TOKEN);
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  },
  refreshToken: async (): Promise<AxiosResponse<{ token: string }>> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.post(ENDPOINTS.AUTH.REFRESH_TOKEN, { token });
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  },
  login: async (credentials: { email: string; password: string }) => {
    try {
      console.log('Attempting login with:', { email: credentials.email });
      
      const response = await api.post(ENDPOINTS.AUTH.LOGIN, {
        email: credentials.email.trim(),
        password: credentials.password
      });
      
      console.log('Login response:', response.data);
      
      // Save token if exists in response
      if (response.data?.token || response.data?.accessToken) {
        const token = response.data.token || response.data.accessToken;
        localStorage.setItem('token', token);
        
        // Also save user data if available
        if (response.data?.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        // Update axios default headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      return response.data;
      
    } catch (error: any) {
      console.error('Login failed:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Rethrow with more specific error message
      if (error.response?.data?.message) {
        const errorMessage = typeof error.response.data.message === 'string' 
          ? error.response.data.message
          : 'بيانات الاعتماد غير صحيحة';
        throw new Error(errorMessage);
      }
      
      if (error.code === 'ECONNABORTED') {
        throw new Error('انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى.');
      }
      
      if (!window.navigator.onLine) {
        throw new Error('لا يوجد اتصال بالإنترنت. يرجى التحقق من اتصالك والمحاولة مرة أخرى.');
      }
      
      throw new Error('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا.');
    }
  },
  
  register: async (userData: any) => {
    try {
      const response = await api.post(ENDPOINTS.AUTH.REGISTER, userData);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if API call fails
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.resolve();
  },
  
  getCurrentUser: async (): Promise<AxiosResponse<ApiResponse<User>>> => {
    try {
      const response = await api.get('/auth/me');
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

export const usersAPI = {
  getAll: () => api.get(ENDPOINTS.USERS.ALL),
  getProfile: () => api.get(ENDPOINTS.USERS.PROFILE),
  updateProfile: (data: any) => api.put(ENDPOINTS.USERS.UPDATE, data),
};

export const coursesAPI = {
  getAll: () => api.get(ENDPOINTS.COURSES.ALL),
  getDetails: (id: string) => api.get(ENDPOINTS.COURSES.DETAILS(id)),
  create: (data: any) => api.post(ENDPOINTS.COURSES.CREATE, data),
  update: (id: string, data: any) => api.put(ENDPOINTS.COURSES.UPDATE(id), data),
  delete: (id: string) => api.delete(ENDPOINTS.COURSES.DELETE(id)),
};

export const materialsAPI = {
  getAll: () => api.get(ENDPOINTS.MATERIALS.ALL),
  create: (data: any) => api.post(ENDPOINTS.MATERIALS.CREATE, data),
  update: (id: string, data: any) => api.put(ENDPOINTS.MATERIALS.UPDATE(id), data),
  delete: (id: string) => api.delete(ENDPOINTS.MATERIALS.DELETE(id)),
};

export const videosAPI = {
  getAll: () => api.get(ENDPOINTS.VIDEOS.ALL),
  create: (data: any) => api.post(ENDPOINTS.VIDEOS.CREATE, data),
  update: (id: string, data: any) => api.put(ENDPOINTS.VIDEOS.UPDATE(id), data),
  delete: (id: string) => api.delete(ENDPOINTS.VIDEOS.DELETE(id)),
};

export const notificationsAPI = {
  getAll: () => api.get(ENDPOINTS.NOTIFICATIONS.ALL),
  create: (data: any) => api.post(ENDPOINTS.NOTIFICATIONS.CREATE, data),
  read: (id: string) => api.post(ENDPOINTS.NOTIFICATIONS.READ(id)),
};

export const subscriptionsAPI = {
  getAll: () => api.get(ENDPOINTS.SUBSCRIPTIONS.ALL),
  create: (data: any) => api.post(ENDPOINTS.SUBSCRIPTIONS.CREATE, data),
  update: (id: string, data: any) => api.put(ENDPOINTS.SUBSCRIPTIONS.UPDATE(id), data),
  delete: (id: string) => api.delete(ENDPOINTS.SUBSCRIPTIONS.DELETE(id)),
};

export const adminAPI = {
  getDashboard: () => api.get(ENDPOINTS.ADMIN.DASHBOARD),
  getUsers: () => api.get(ENDPOINTS.ADMIN.USERS),
  getCourses: () => api.get(ENDPOINTS.ADMIN.COURSES),
  getMaterials: () => api.get(ENDPOINTS.ADMIN.MATERIALS),
  getVideos: () => api.get(ENDPOINTS.ADMIN.VIDEOS),
  getNotifications: () => api.get(ENDPOINTS.ADMIN.NOTIFICATIONS),
  getSubscriptions: () => api.get(ENDPOINTS.ADMIN.SUBSCRIPTIONS),
};

export const settingsAPI = {
  update: (data: any) => api.put(ENDPOINTS.SETTINGS.UPDATE, data),
};

export const playerAPI = {
  getStatus: () => api.get(ENDPOINTS.PLAYER.STATUS),
};

export default api;
