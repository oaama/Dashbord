import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  adminOnly?: boolean;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = [],
  adminOnly = false,
  redirectPath = '/login'
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Store the attempted URL for redirecting after login
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Check for admin only access
  if (adminOnly && user?.role !== 'admin') {
    return (
      <Navigate 
        to="/unauthorized" 
        state={{ 
          from: location,
          message: 'هذه الصفحة مخصصة للمشرفين فقط'
        }} 
        replace 
      />
    );
  }

  // Check if user has any of the required roles
  if (requiredRoles.length > 0 && !requiredRoles.some(role => user?.role === role)) {
    return (
      <Navigate 
        to="/unauthorized" 
        state={{ 
          from: location,
          message: 'ليس لديك صلاحيات كافية للوصول إلى هذه الصفحة'
        }} 
        replace 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;