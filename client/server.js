const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5001';

// Proxy API requests to backend
// NOTE: proxy should be mounted BEFORE body parsers to avoid stream consumption issues
app.use(
  createProxyMiddleware({
    pathFilter: '/api',
    target: BACKEND_URL,
    changeOrigin: true,
    xfwd: true,
    logLevel: 'error',
  })
);

// Body parsing (only applies to non-proxied routes, though not needed for static)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build'), { setHeaders: (res, path) => {
  if (path.endsWith('.html')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}}));

// React Router fallback – serve index.html for non-API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next(); // let proxy handle API routes
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
  console.log(`Proxying /api to ${BACKEND_URL}`);
});