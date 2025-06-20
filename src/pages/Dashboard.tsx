import React from 'react';
import { Users, BookOpen, FileText, CreditCard } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Card from '../components/UI/Card';

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { name: 'Total Courses', value: '156', change: '+8%', icon: BookOpen, color: 'text-green-600' },
    { name: 'Materials', value: '1,234', change: '+24%', icon: FileText, color: 'text-purple-600' },
    { name: 'Active Subscriptions', value: '1,892', change: '+15%', icon: CreditCard, color: 'text-orange-600' },
  ];

  const activityData = [
    { name: 'Jan', users: 400, courses: 240 },
    { name: 'Feb', users: 300, courses: 139 },
    { name: 'Mar', users: 200, courses: 980 },
    { name: 'Apr', users: 278, courses: 390 },
    { name: 'May', users: 189, courses: 480 },
    { name: 'Jun', users: 239, courses: 380 },
    { name: 'Jul', users: 349, courses: 430 },
  ];

  const engagementData = [
    { name: 'Mon', hours: 120 },
    { name: 'Tue', hours: 190 },
    { name: 'Wed', hours: 300 },
    { name: 'Thu', hours: 350 },
    { name: 'Fri', hours: 280 },
    { name: 'Sat', hours: 220 },
    { name: 'Sun', hours: 180 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center">
              <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color} mb-3 lg:mb-0 lg:mr-4 self-start`}>
                <stat.icon className="h-5 w-5 lg:h-6 lg:w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{stat.name}</p>
                <div className="flex items-center mt-1">
                  <p className="text-lg lg:text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                  <span className="ml-2 text-xs lg:text-sm font-medium text-green-600">{stat.change}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User & Course Activity</h3>
          <div className="h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(31 41 55)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="courses" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Learning Hours</h3>
          <div className="h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(31 41 55)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
                <Bar dataKey="hours" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { user: 'John Doe', action: 'enrolled in', course: 'React Fundamentals', time: '2 minutes ago' },
            { user: 'Sarah Wilson', action: 'completed', course: 'JavaScript Advanced', time: '15 minutes ago' },
            { user: 'Mike Johnson', action: 'uploaded material for', course: 'Python Basics', time: '1 hour ago' },
            { user: 'Emily Davis', action: 'started', course: 'UI/UX Design', time: '2 hours ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start lg:items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.course}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;