// API Configuration
export const API_CONFIG = {
  // استخدم العنوان الكامل للسيرفر الخارجي لتجاوز مشاكل البروكسي
  baseURL: 'https://mrvet-production.up.railway.app',
  timeout: parseInt(import.meta.env.VITE_DEFAULT_TIMEOUT || '30000', 10),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  // Add request/response interceptors for better debugging
  debug: import.meta.env.DEV
};

if (import.meta.env.DEV) {
  console.log('API Configuration:', {
    baseURL: API_CONFIG.baseURL,
    target: 'https://mrvet-production.up.railway.app',
    env: import.meta.env.MODE,
    isProduction: import.meta.env.PROD,
  });
}

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    VERIFY_TOKEN: '/auth/verify-token',
  },
  USERS: {
    ALL: '/users',
    PROFILE: '/users/profile',
    UPDATE: '/users/update-profile',
  },
  COURSES: {
    ALL: '/courses',
    CREATE: '/courses',
    UPDATE: (id: string) => `/courses/${id}`,
    DELETE: (id: string) => `/courses/${id}`,
    DETAILS: (id: string) => `/courses/${id}`,
  },
  MATERIALS: {
    ALL: '/materials',
    CREATE: '/materials',
    UPDATE: (id: string) => `/materials/${id}`,
    DELETE: (id: string) => `/materials/${id}`,
  },
  VIDEOS: {
    ALL: '/videos',
    CREATE: '/videos',
    UPDATE: (id: string) => `/videos/${id}`,
    DELETE: (id: string) => `/videos/${id}`,
  },
  NOTIFICATIONS: {
    ALL: '/notifications',
    CREATE: '/notifications',
    READ: (id: string) => `/notifications/${id}/read`,
  },
  SUBSCRIPTIONS: {
    ALL: '/subscriptions',
    CREATE: '/subscriptions',
    UPDATE: (id: string) => `/subscriptions/${id}`,
    DELETE: (id: string) => `/subscriptions/${id}`,
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    COURSES: '/admin/courses',
    MATERIALS: '/admin/materials',
    VIDEOS: '/admin/videos',
    NOTIFICATIONS: '/admin/notifications',
    SUBSCRIPTIONS: '/admin/subscriptions',
  },
  SETTINGS: {
    UPDATE: '/settings/update',
  },
  PLAYER: {
    STATUS: '/player/status',
  },
};
