import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Courses from './pages/Courses';
import Materials from './pages/Materials';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import TestConnection from './pages/TestConnection';
import TestApi from './pages/TestApi';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Define user roles for better type safety
export enum UserRole {
  ADMIN = 'admin',
  INSTRUCTOR = 'instructor',
  STUDENT = 'student',
  GUEST = 'guest',
}

// Define route configuration
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  COURSES: '/courses',
  MATERIALS: '/materials',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
  REPORTS: '/reports',
  TEST_CONNECTION: '/test-connection',
  TEST_API: '/test-api',
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Routes>
              {/* Public Routes */}
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
              <Route path={ROUTES.TEST_CONNECTION} element={<TestConnection />} />
              <Route path={ROUTES.TEST_API} element={<TestApi />} />
              
              {/* Protected Routes */}
              <Route 
                path={ROUTES.HOME} 
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                <Route 
                  path={ROUTES.DASHBOARD.replace(/^\//, '')} 
                  element={
                    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.INSTRUCTOR]}>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.USERS.replace(/^\//, '')} 
                  element={
                    <ProtectedRoute adminOnly>
                      <Users />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.COURSES.replace(/^\//, '')} 
                  element={
                    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.INSTRUCTOR]}>
                      <Courses />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.MATERIALS.replace(/^\//, '')} 
                  element={
                    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.INSTRUCTOR]}>
                      <Materials />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.NOTIFICATIONS.replace(/^\//, '')} 
                  element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.SETTINGS.replace(/^\//, '')} 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.REPORTS.replace(/^\//, '')} 
                  element={
                    <ProtectedRoute requiredRoles={[UserRole.ADMIN]}>
                      <Reports />
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              {/* 404 - Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;