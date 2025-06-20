import { Users, BookOpen, Video, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { coursesAPI, usersAPI } from '../services/apiService';

const StatsCard = () => {
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    materials: 0,
    videos: 0,
    loading: true,
    error: '',
    success: false,
    message: ''
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          usersAPI.getAll(),
          coursesAPI.getAll(),
        ]);

        setStats({
          users: usersRes?.data?.length || 0,
          courses: coursesRes?.data?.length || 0,
          materials: 0,
          videos: 0,
          loading: false,
          error: '',
          success: true,
          message: 'تم جلب إحصائيات النظام بنجاح'
        });
        
        // إخفاء رسالة النجاح بعد 3 ثواني
        setTimeout(() => {
          setStats(prev => ({
            ...prev,
            message: ''
          }));
        }, 3000);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'فشل في تحميل الإحصائيات'
        }));
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-24">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="mb-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-700 dark:text-red-300">
            {stats.error}
          </p>
        </div>
      </div>
    );
  }
  
  // عرض رسالة النجاح إذا كانت موجودة
  const showSuccessMessage = stats.success && stats.message && (
    <div className="mb-4">
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <p className="text-sm text-green-700 dark:text-green-300">
          {stats.message}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {showSuccessMessage}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <Users className="w-5 h-5" />
          </div>
          <div className="mr-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">المستخدمين</p>
            <p className="text-lg font-semibold">{stats.users}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="mr-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">الدورات</p>
            <p className="text-lg font-semibold">{stats.courses}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
            <FileText className="w-5 h-5" />
          </div>
          <div className="mr-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">المواد</p>
            <p className="text-lg font-semibold">{stats.materials}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <Video className="w-5 h-5" />
          </div>
          <div className="mr-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">الفيديوهات</p>
            <p className="text-lg font-semibold">{stats.videos}</p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default StatsCard;
