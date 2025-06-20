import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/apiService';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigateFunction } from 'react-router';
import { User, UserRole, AuthResponse, LocationState } from '../types';
import { ApiError } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setError: (error: string | null) => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

// Create a context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get user from localStorage
const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

// Helper function to store user in localStorage
const storeUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

// Helper function to store auth token
const storeAuthToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate() as NavigateFunction;
  const location = useLocation();

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return !!user?.id;
  }, [user]) as () => boolean;

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Clear all auth data first
      setUser(null);
      storeAuthToken(null);
      storeUser(null);
      
      // Attempt to logout from server
      await authAPI.logout();
      
      // Show success message
      toast.info('تم تسجيل الخروج بنجاح');
      
      // Redirect to login page
      navigate('/login', { replace: true });
      
    } catch (error: any) {
      console.error('Logout error:', error);
      const errorMessage = error.message || 'حدث خطأ أثناء تسجيل الخروج';
      
      // Even if logout fails, we still clear local auth data
      setUser(null);
      storeAuthToken(null);
      storeUser(null);
      
      // Show error message
      toast.error(errorMessage);
      
      // Redirect to login page
      navigate('/login', { replace: true });
    } finally {
      // Ensure we're not loading
      setIsLoading(false);
    }
  }, [navigate]);

  // Check if user has required role(s)
  const hasRole = useCallback((roles: UserRole | UserRole[]): boolean => {
    if (!user?.role) return false;
    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    return requiredRoles.some(role => user.role === role);
  }, [user]);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          // Parse stored user data
          const storedUser = JSON.parse(userData) as User;
          
          // Verify token is still valid
          const response = await authAPI.getCurrentUser();
          
          if (response && response.data) {
            // Create user object with proper typing
            const userData: User = {
              id: response.data._id || response.data.id || '',
              name: response.data.name || storedUser.name || 'غير معروف',
              email: response.data.email || '',
              role: (response.data.role as UserRole) || storedUser.role || UserRole.GUEST,
              avatar: response.data.profileImage || response.data.avatar || '',
              createdAt: response.data.createdAt || storedUser.createdAt || new Date().toISOString(),
              updatedAt: response.data.updatedAt || storedUser.updatedAt || new Date().toISOString(),
            };

            // Store user data
            setUser(userData);
            storeUser(userData);
            
            // Update token if it exists
            if (token) {
              storeAuthToken(token);
            }
          }
        } catch (error: any) {
          console.error('Session validation failed:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, [logout]);

  // Login function
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // Validate input
      if (!email || !password) {
        throw new Error('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      }

      const response = await authAPI.login({ email, password });
      if (!response || !response.data) {
        throw new Error('استجابة غير صالحة من الخادم');
      }

      const { user, token } = response.data as AuthResponse['data'];
      
      if (!user || !token) {
        throw new Error('بيانات المستخدم غير كاملة');
      }

      // Validate user data
      if (!user._id && !user.id) {
        throw new Error('المستخدم غير صالح: معرف المستخدم مفقود');
      }
      if (!user.email) {
        throw new Error('المستخدم غير صالح: البريد الإلكتروني مفقود');
      }
      if (!user.role) {
        throw new Error('المستخدم غير صالح: دور المستخدم مفقود');
      }

      // Create user object
      const userData: User = {
        id: user._id || user.id,
        name: user.name || 'غير معروف',
        email: user.email,
        role: user.role as UserRole,
        avatar: user.profileImage || user.avatar,
        createdAt: user.createdAt || new Date().toISOString(),
        updatedAt: user.updatedAt || new Date().toISOString(),
      } as User;

      // Store auth data
      setUser(userData);
      storeAuthToken(token);
      storeUser(userData);

      // Show welcome message
      toast.success(`مرحباً ${userData.name}! تم تسجيل الدخول بنجاح`);

      // Redirect based on role or from location state
      const from = (location.state as LocationState)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });

      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.message || 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.';
      
      setError(errorMessage);
      toast.error(errorMessage);
      
      // Clear invalid auth data
      storeAuthToken(null);
      storeUser(null);
      
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, location.state]);

  // Start token refresh interval
  useEffect(() => {
    let refreshInterval: NodeJS.Timeout;

    if (isAuthenticated()) {
      // Refresh token every 30 minutes (adjust as needed)
      refreshInterval = setInterval(async () => {
        try {
          const response = await authAPI.refreshToken();
          if (response && response.data?.token) {
            storeAuthToken(response.data.token);
            toast.success('تم تجديد جلسة تسجيل الدخول');
          }
        } catch (error: any) {
          console.error('Token refresh failed:', error);
          // If refresh fails, force logout
          logout();
        }
      }, 30 * 60 * 1000); // 30 minutes
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [logout, isAuthenticated]);

  // Provide the auth context
  const value = {
    user,
    isAuthenticated: isAuthenticated(),
    isLoading,
    error,
    login,
    logout,
    setError,
    hasRole,
  } as const;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};