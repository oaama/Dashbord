import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/UI/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <AlertTriangle className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
          </div>
          
          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            404 - الصفحة غير موجودة
          </h1>
          
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.
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
              <Home className="h-4 w-4" />
              الصفحة الرئيسية
            </Button>
          </div>
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

export default NotFound;
