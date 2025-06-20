import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    open: true,
    cors: true,
    proxy: {
      // Simple and direct proxy configuration
      '/api': {
        target: 'https://mrvet-production.up.railway.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Add these headers to handle CORS
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization'
        },
        // Logging for debugging
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.error('Proxy error:', err);
            res?.writeHead(500, {
              'Content-Type': 'application/json',
            });
            res?.end(JSON.stringify({
              error: 'proxy_error',
              message: 'Proxy error occurred',
              details: err.message,
            }));
          });

          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`[PROXY REQ] ${req.method} ${req.url} -> ${proxyReq.path}`);
          });

          proxy.on('proxyRes', (proxyRes, req) => {
            console.log(`[PROXY RES] ${req.method} ${req.url} -> ${proxyRes.statusCode}`);
          });
        }
      }
    }
  },
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild'
  },
  preview: {
    port: 5173,
    strictPort: true,
    cors: true
  }
});
