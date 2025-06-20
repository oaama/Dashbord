import { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, CircularProgress } from '@mui/material';
import api from '../services/apiService';

const TestApi = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState<any>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setMessage('');
      
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      setMessage('تم تسجيل الدخول بنجاح!');
      setProfile(response.data.user);
      
      // Test getting user profile
      await testGetProfile();
    } catch (error: any) {
      setMessage(error.message || 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  const testGetProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setProfile(response.data);
      setMessage('تم جلب بيانات الملف الشخصي بنجاح');
    } catch (error: any) {
      setMessage('فشل في جلب الملف الشخصي: ' + (error.message || 'حدث خطأ'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setProfile(null);
    setMessage('تم تسجيل الخروج بنجاح');
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            اختبار الاتصال بالخادم
          </Typography>
          
          {!profile ? (
            <>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                disabled={loading}
              />
              <TextField
                fullWidth
                label="كلمة المرور"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                disabled={loading}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'تسجيل الدخول'}
              </Button>
            </>
          ) : (
            <Box>
              <Typography variant="h6">مرحباً {profile.name}!</Typography>
              <Typography>البريد الإلكتروني: {profile.email}</Typography>
              <Typography>الدور: {profile.role}</Typography>
              
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                تسجيل الخروج
              </Button>
              
              <Button
                variant="outlined"
                onClick={testGetProfile}
                sx={{ mt: 2, ml: 2 }}
                disabled={loading}
              >
                تحديث البيانات
              </Button>
            </Box>
          )}
          
          {message && (
            <Box 
              sx={{
                mt: 2,
                p: 2,
                bgcolor: message.includes('نجاح') ? '#e8f5e9' : '#ffebee',
                borderRadius: 1
              }}
            >
              <Typography color={message.includes('نجاح') ? 'success.main' : 'error'}>
                {message}
              </Typography>
            </Box>
          )}
          
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
            <Typography variant="subtitle2" color="textSecondary">معلومات التصحيح:</Typography>
            <Typography variant="body2" color="textSecondary">
              عنوان API: {import.meta.env.VITE_API_URL || '/api'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              الوضع: {import.meta.env.MODE}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestApi;
