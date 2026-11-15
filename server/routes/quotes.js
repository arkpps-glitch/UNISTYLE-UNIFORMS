/**
 * Quote Request Routes
 * Handles quote submissions from customers and admin management.
 */

const express = require('express');
const router = express.Router();
const db = require('../database');
const { requireAdmin } = require('../middleware/auth');

// ---- POST /api/quotes ---- Submit a quote request
router.post('/', (req, res) => {
  try {
    const { name, email, phone, company, industry, quantity_range, message, product_ids } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' });
    }

    const stmt = db.prepare(`
      INSERT INTO quotes (name, email, phone, company, industry, quantity_range, message, product_ids)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name,
      email,
      phone || '',
      company || '',
      industry || '',
      quantity_range || '',
      message || '',
      JSON.stringify(product_ids || [])
    );

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully. We will get back to you soon!',
      data: { id: result.lastInsertRowid }
    });
  } catch (err) {
    console.error('[Quotes] POST / error:', err.message);
    res.status(500).json({ error: 'Failed to submit quote request' });
  }
});

// ---- GET /api/quotes ---- List all quotes (admin)
router.get('/', requireAdmin, (req, res) => {
  try {
    const quotes = db.prepare('SELECT * FROM quotes ORDER BY created_at DESC').all();

    const parsed = quotes.map(q => ({
      ...q,
      product_ids: JSON.parse(q.product_ids || '[]')
    }));

    res.json({ success: true, data: parsed, count: parsed.length });
  } catch (err) {
    console.error('[Quotes] GET / error:', err.message);
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

// ---- PUT /api/quotes/:id/status ---- Update quote status (admin)
router.put('/:id/status', requireAdmin, (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'reviewed', 'approved', 'completed'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const existing = db.prepare('SELECT * FROM quotes WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    db.prepare('UPDATE quotes SET status = ? WHERE id = ?').run(status, req.params.id);

    const updated = db.prepare('SELECT * FROM quotes WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('[Quotes] PUT /:id/status error:', err.message);
    res.status(500).json({ error: 'Failed to update quote status' });
  }
});

module.exports = router;
