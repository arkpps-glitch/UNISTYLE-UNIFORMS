/**
 * UNISTYLE UNIFORMS — Express Server (Main Entry Point)
 *
 * Serves the frontend website as static files and provides a REST API
 * for products, quotes, contact forms, newsletter, and cart management.
 *
 * Usage:  node server.js
 * Port:   3000 (or set PORT environment variable)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

// Initialize database (creates tables on first run)
const db = require('./database');

// Import route modules
const productRoutes = require('./routes/products');
const quoteRoutes = require('./routes/quotes');
const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletter');
const cartRoutes = require('./routes/cart');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
// MIDDLEWARE
// ============================================================

// Enable CORS for frontend (allow all origins in development)
app.use(cors({
  origin: true,
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Parse cookies (used for cart sessions)
// cookie-parser is bundled as a dependency-free middleware we handle manually
app.use((req, res, next) => {
  // Simple cookie parser
  req.cookies = {};
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      const name = parts[0].trim();
      const value = parts.slice(1).join('=').trim();
      req.cookies[name] = decodeURIComponent(value);
    });
  }
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// ============================================================
// API ROUTES (all under /api/)
// ============================================================

app.use('/api/products', productRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);

// ============================================================
// STATIC FILE SERVING
// ============================================================

// Serve admin dashboard at /admin/
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Serve the main website directory (parent of server/) at /
app.use(express.static(path.join(__dirname, '..')));

// ============================================================
// HEALTH CHECK
// ============================================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ============================================================
// 404 HANDLER — for API routes only
// ============================================================

app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack || err.message}`);
  res.status(err.status || 500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║       UNISTYLE UNIFORMS — Server Running        ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  Website:  http://localhost:${PORT}                 ║`);
  console.log(`║  Admin:    http://localhost:${PORT}/admin            ║`);
  console.log(`║  API:      http://localhost:${PORT}/api             ║`);
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
});

module.exports = app;
