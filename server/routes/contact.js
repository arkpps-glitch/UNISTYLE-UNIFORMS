/**
 * Contact Form Routes
 * Handles contact form submissions and admin listing.
 */

const express = require('express');
const router = express.Router();
const db = require('../database');
const { requireAdmin } = require('../middleware/auth');

// ---- POST /api/contact ---- Submit contact form
router.post('/', (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }

    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, phone, company, message)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, email, phone || '', company || '', message);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully. We will respond within 24 hours!',
      data: { id: result.lastInsertRowid }
    });
  } catch (err) {
    console.error('[Contact] POST / error:', err.message);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// ---- GET /api/contact ---- List all contact submissions (admin)
router.get('/', requireAdmin, (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
    res.json({ success: true, data: contacts, count: contacts.length });
  } catch (err) {
    console.error('[Contact] GET / error:', err.message);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

module.exports = router;
