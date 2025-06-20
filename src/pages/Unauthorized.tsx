import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Button from '../components/UI/Button';

const Unauthorized: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { message = 'ليس لديك صلاحيات للوصول إلى هذه الصفحة' } = (location.state as any) || {};
  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    document.title = 'غير مصرح - لوحة التحكم';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            غير مصرح بالوصول
          </h1>
          
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {message}
          </p>
          
          <div className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة للخلف
            </Button>
            
            <Button
              as={Link}
              to="/"
              variant="primary"
              className="inline-flex items-center justify-center gap-2"
            >
              الصفحة الرئيسية
            </Button>
          </div>
          
          {from !== '/' && (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              كنت تحاول الوصول إلى: <span className="font-mono">{from}</span>
            </p>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            إذا كنت تعتقد أن هذا خطأ، يرجى{' '}
            <a 
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              الاتصال بالدعم الفني
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
