import React, { useState } from 'react';
import { Bell, Send, Users, Filter, Archive } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const Notifications: React.FC = () => {
  const [notifications] = useState([
    {
      id: '1',
      title: 'New User Registration',
      message: 'John Doe has registered for the platform',
      type: 'info',
      recipient: 'Admin',
      timestamp: '2024-02-01T10:30:00Z',
      read: false
    },
    {
      id: '2',
      title: 'Course Completion',
      message: 'Sarah Wilson completed React Fundamentals course',
      type: 'success',
      recipient: 'Instructor',
      timestamp: '2024-02-01T09:15:00Z',
      read: true
    },
    {
      id: '3',
      title: 'Payment Failed',
      message: 'Payment failed for user mike@example.com',
      type: 'error',
      recipient: 'Admin',
      timestamp: '2024-02-01T08:45:00Z',
      read: false
    },
    {
      id: '4',
      title: 'Course Material Uploaded',
      message: 'New material uploaded for JavaScript Advanced course',
      type: 'info',
      recipient: 'Students',
      timestamp: '2024-01-31T16:20:00Z',
      read: true
    },
    {
      id: '5',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on February 5th, 2024',
      type: 'warning',
      recipient: 'All Users',
      timestamp: '2024-01-31T14:00:00Z',
      read: false
    }
  ]);

  const getNotificationIcon = (type: string) => {
    const baseClasses = "h-8 w-8 rounded-full flex items-center justify-center";
    switch (type) {
      case 'success':
        return (
          <div className={`${baseClasses} bg-green-100 dark:bg-green-900`}>
            <Bell className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        );
      case 'error':
        return (
          <div className={`${baseClasses} bg-red-100 dark:bg-red-900`}>
            <Bell className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
        );
      case 'warning':
        return (
          <div className={`${baseClasses} bg-yellow-100 dark:bg-yellow-900`}>
            <Bell className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} bg-blue-100 dark:bg-blue-900`}>
            <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        );
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Stay updated with platform activities and alerts
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" icon={Filter}>
            Filter
          </Button>
          <Button variant="secondary" icon={Archive}>
            Archive All
          </Button>
          <Button variant="primary" icon={Send}>
            Send Notification
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Today</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">3</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">156</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">1,234</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Sent</p>
          </div>
        </Card>
      </div>

      {/* Notifications List */}
      <Card padding={false}>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors ${
                !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      !notification.read 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimestamp(notification.timestamp)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {notification.message}
                  </p>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Users className="h-3 w-3 mr-1" />
                      {notification.recipient}
                    </div>
                    {!notification.read && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Send Notification Form */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Send New Notification
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recipient
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Users</option>
              <option>Students</option>
              <option>Instructors</option>
              <option>Admins</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Info</option>
              <option>Success</option>
              <option>Warning</option>
              <option>Error</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Notification title"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message
          </label>
          <textarea
            rows={4}
            placeholder="Type your message here..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button variant="primary" icon={Send}>
          Send Notification
        </Button>
      </Card>
    </div>
  );
};

export default Notifications;