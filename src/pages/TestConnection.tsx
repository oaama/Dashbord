import { useState } from 'react';
import { authAPI } from '../services/apiService';

const TestConnection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const testLogin = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');
    
    try {
      // Replace with valid test credentials
      const response = await authAPI.login({
        email: 'test@example.com',
        password: 'password'
      });
      
      setMessage('Login successful!');
      setToken(response.token || 'Token received');
      console.log('Login response:', response);
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const testAuth = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await authAPI.getCurrentUser();
      setMessage('Authentication successful!');
      console.log('User data:', response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Connection Test</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Test Login</h2>
          <p className="text-sm text-gray-600 mb-4">
            Test the login functionality with your credentials
          </p>
          <button
            onClick={testLogin}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Login'}
          </button>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Test Authentication</h2>
          <p className="text-sm text-gray-600 mb-4">
            Test if you're properly authenticated
          </p>
          <button
            onClick={testAuth}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Auth'}
          </button>
        </div>

        {message && (
          <div className="p-4 bg-green-100 text-green-800 rounded-lg">
            <p>{message}</p>
            {token && (
              <div className="mt-2 p-2 bg-green-50 rounded overflow-auto text-xs">
                <p className="font-mono break-all">{token}</p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 text-red-800 rounded-lg">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestConnection;
