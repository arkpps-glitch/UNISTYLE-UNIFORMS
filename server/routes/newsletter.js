/**
 * Newsletter Subscription Routes
 * Handles email subscriptions and unsubscriptions.
 */

const express = require('express');
const router = express.Router();
const db = require('../database');
const { requireAdmin } = require('../middleware/auth');

// ---- POST /api/newsletter ---- Subscribe email
router.post('/', (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'email is required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if already subscribed
    const existing = db.prepare('SELECT * FROM newsletter WHERE email = ?').get(email);

    if (existing) {
      if (existing.active) {
        return res.status(409).json({ error: 'Email is already subscribed' });
      }
      // Re-activate a previously unsubscribed email
      db.prepare('UPDATE newsletter SET active = 1, subscribed_at = datetime(\'now\') WHERE email = ?').run(email);
      return res.json({ success: true, message: 'Welcome back! Your subscription has been reactivated.' });
    }

    db.prepare('INSERT INTO newsletter (email) VALUES (?)').run(email);

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!'
    });
  } catch (err) {
    console.error('[Newsletter] POST / error:', err.message);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// ---- GET /api/newsletter ---- List subscribers (admin)
router.get('/', requireAdmin, (req, res) => {
  try {
    const subscribers = db.prepare('SELECT * FROM newsletter ORDER BY subscribed_at DESC').all();
    res.json({ success: true, data: subscribers, count: subscribers.length });
  } catch (err) {
    console.error('[Newsletter] GET / error:', err.message);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

// ---- DELETE /api/newsletter/:email ---- Unsubscribe
router.delete('/:email', (req, res) => {
  try {
    const { email } = req.params;

    const existing = db.prepare('SELECT * FROM newsletter WHERE email = ?').get(email);
    if (!existing) {
      return res.status(404).json({ error: 'Email not found in subscribers list' });
    }

    db.prepare('UPDATE newsletter SET active = 0 WHERE email = ?').run(email);

    res.json({ success: true, message: 'Successfully unsubscribed from newsletter' });
  } catch (err) {
    console.error('[Newsletter] DELETE /:email error:', err.message);
    res.status(500).json({ error: 'Failed to unsubscribe' });
  }
});

module.exports = router;
