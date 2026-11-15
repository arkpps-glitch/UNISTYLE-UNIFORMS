/**
 * Admin Dashboard Routes
 * Provides summary/dashboard data for the admin panel.
 */

const express = require('express');
const router = express.Router();
const db = require('../database');
const { requireAdmin } = require('../middleware/auth');

// ---- GET /api/admin/dashboard ---- Get dashboard summary (admin)
router.get('/dashboard', requireAdmin, (req, res) => {
  try {
    const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    const quoteCount = db.prepare('SELECT COUNT(*) as count FROM quotes').get().count;
    const pendingQuotes = db.prepare("SELECT COUNT(*) as count FROM quotes WHERE status = 'pending'").get().count;
    const contactCount = db.prepare('SELECT COUNT(*) as count FROM contacts').get().count;
    const subscriberCount = db.prepare('SELECT COUNT(*) as count FROM newsletter WHERE active = 1').get().count;

    // Recent activity
    const recentQuotes = db.prepare('SELECT * FROM quotes ORDER BY created_at DESC LIMIT 5').all();
    const recentContacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5').all();

    res.json({
      success: true,
      data: {
        counts: {
          products: productCount,
          quotes: quoteCount,
          pendingQuotes: pendingQuotes,
          contacts: contactCount,
          subscribers: subscriberCount
        },
        recentQuotes,
        recentContacts
      }
    });
  } catch (err) {
    console.error('[Admin] GET /dashboard error:', err.message);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;
