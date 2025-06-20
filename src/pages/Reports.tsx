import React from 'react';
import { TrendingUp, Users, BookOpen, DollarSign, Download } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const Reports: React.FC = () => {
  const enrollmentData = [
    { month: 'Jan', enrollments: 245, revenue: 12250 },
    { month: 'Feb', enrollments: 189, revenue: 9450 },
    { month: 'Mar', enrollments: 312, revenue: 15600 },
    { month: 'Apr', enrollments: 278, revenue: 13900 },
    { month: 'May', enrollments: 356, revenue: 17800 },
    { month: 'Jun', enrollments: 423, revenue: 21150 },
  ];

  const coursePopularityData = [
    { name: 'React Fundamentals', students: 245, completion: 85 },
    { name: 'JavaScript Advanced', students: 189, completion: 92 },
    { name: 'Python Basics', students: 312, completion: 78 },
    { name: 'UI/UX Design', students: 156, completion: 88 },
    { name: 'Node.js Backend', students: 134, completion: 75 },
  ];

  const revenueData = [
    { name: 'Subscriptions', value: 12500, color: '#3B82F6' },
    { name: 'Course Sales', value: 8900, color: '#10B981' },
    { name: 'Certificates', value: 3400, color: '#F59E0B' },
    { name: 'Premium Content', value: 2100, color: '#8B5CF6' },
  ];

  const userActivityData = [
    { day: 'Mon', active: 1234, new: 45 },
    { day: 'Tue', active: 1456, new: 67 },
    { day: 'Wed', active: 1678, new: 89 },
    { day: 'Thu', active: 1567, new: 54 },
    { day: 'Fri', active: 1789, new: 78 },
    { day: 'Sat', active: 1345, new: 43 },
    { day: 'Sun', active: 1123, new: 32 },
  ];

  const kpis = [
    { name: 'Total Revenue', value: '$24,500', change: '+15.3%', icon: DollarSign, trend: 'up' },
    { name: 'Active Users', value: '2,847', change: '+8.7%', icon: Users, trend: 'up' },
    { name: 'Course Completions', value: '1,234', change: '+12.4%', icon: BookOpen, trend: 'up' },
    { name: 'Average Rating', value: '4.8', change: '+0.2', icon: TrendingUp, trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive insights into platform performance and user engagement
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" icon={Download}>
            Export Report
          </Button>
          <Button variant="primary">
            Generate Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.name} className="hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{kpi.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${
                kpi.trend === 'up' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
              }`}>
                <kpi.icon className={`h-6 w-6 ${
                  kpi.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Enrollment & Revenue Trends
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
                <YAxis yAxisId="left" className="text-gray-600 dark:text-gray-400" />
                <YAxis yAxisId="right" orientation="right" className="text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(31 41 55)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="enrollments" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="Enrollments"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Revenue Breakdown */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Sources
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(31 41 55)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Course Popularity */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Most Popular Courses
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePopularityData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" className="text-gray-600 dark:text-gray-400" />
                <YAxis dataKey="name" type="category" width={120} className="text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(31 41 55)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="students" fill="#6366F1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* User Activity */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Daily User Activity
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(31 41 55)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="active" 
                  stackId="1" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.6}
                  name="Active Users"
                />
                <Area 
                  type="monotone" 
                  dataKey="new" 
                  stackId="1" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.6}
                  name="New Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Top Performers Table */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Performing Instructors
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { name: 'Sarah Wilson', courses: 8, students: 567, rating: 4.9, revenue: '$12,450' },
                { name: 'Mike Johnson', courses: 5, students: 423, rating: 4.8, revenue: '$9,870' },
                { name: 'Emily Davis', courses: 6, students: 389, rating: 4.7, revenue: '$8,650' },
                { name: 'John Doe', courses: 4, students: 312, rating: 4.6, revenue: '$7,230' },
              ].map((instructor, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {instructor.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {instructor.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {instructor.courses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {instructor.students}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{instructor.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {instructor.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Reports;