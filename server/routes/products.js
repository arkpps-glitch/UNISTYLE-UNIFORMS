/**
 * Product Routes
 * Handles CRUD operations and category filtering for products.
 */

const express = require('express');
const router = express.Router();
const db = require('../database');
const { requireAdmin } = require('../middleware/auth');

// ---- GET /api/products ---- List all products (with optional ?category= filter)
router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;
    let sql = 'SELECT * FROM products';
    const params = [];
    const conditions = [];

    if (category && category !== 'all') {
      conditions.push('category = ?');
      params.push(category);
    }

    if (search) {
      conditions.push('(name LIKE ? OR description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC';

    const products = db.prepare(sql).all(...params);

    // Parse JSON fields for the response
    const parsed = products.map(p => ({
      ...p,
      features: JSON.parse(p.features || '[]'),
      sizes: JSON.parse(p.sizes || '[]'),
      colors: JSON.parse(p.colors || '[]'),
      in_stock: Boolean(p.in_stock)
    }));

    res.json({ success: true, data: parsed, count: parsed.length });
  } catch (err) {
    console.error('[Products] GET / error:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ---- GET /api/products/:id ---- Get single product
router.get('/:id', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.features = JSON.parse(product.features || '[]');
    product.sizes = JSON.parse(product.sizes || '[]');
    product.colors = JSON.parse(product.colors || '[]');
    product.in_stock = Boolean(product.in_stock);

    res.json({ success: true, data: product });
  } catch (err) {
    console.error('[Products] GET /:id error:', err.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// ---- POST /api/products ---- Create product (admin)
router.post('/', requireAdmin, (req, res) => {
  try {
    const { name, description, category, price_min, price_max, image_url, features, sizes, colors, in_stock } = req.body;

    if (!name || !category || price_min == null || price_max == null) {
      return res.status(400).json({ error: 'name, category, price_min, and price_max are required' });
    }

    const stmt = db.prepare(`
      INSERT INTO products (name, description, category, price_min, price_max, image_url, features, sizes, colors, in_stock)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name,
      description || '',
      category,
      price_min,
      price_max,
      image_url || '',
      JSON.stringify(features || []),
      JSON.stringify(sizes || []),
      JSON.stringify(colors || []),
      in_stock !== undefined ? (in_stock ? 1 : 0) : 1
    );

    const newProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.error('[Products] POST / error:', err.message);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// ---- PUT /api/products/:id ---- Update product (admin)
router.put('/:id', requireAdmin, (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { name, description, category, price_min, price_max, image_url, features, sizes, colors, in_stock } = req.body;

    const stmt = db.prepare(`
      UPDATE products SET
        name = ?,
        description = ?,
        category = ?,
        price_min = ?,
        price_max = ?,
        image_url = ?,
        features = ?,
        sizes = ?,
        colors = ?,
        in_stock = ?
      WHERE id = ?
    `);

    stmt.run(
      name || existing.name,
      description !== undefined ? description : existing.description,
      category || existing.category,
      price_min != null ? price_min : existing.price_min,
      price_max != null ? price_max : existing.price_max,
      image_url !== undefined ? image_url : existing.image_url,
      features ? JSON.stringify(features) : existing.features,
      sizes ? JSON.stringify(sizes) : existing.sizes,
      colors ? JSON.stringify(colors) : existing.colors,
      in_stock !== undefined ? (in_stock ? 1 : 0) : existing.in_stock,
      req.params.id
    );

    const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('[Products] PUT /:id error:', err.message);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// ---- DELETE /api/products/:id ---- Delete product (admin)
router.delete('/:id', requireAdmin, (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    console.error('[Products] DELETE /:id error:', err.message);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
