/**
 * Cart Routes (Session-based)
 * Uses in-memory session storage keyed by a cookie.
 * Each visitor gets a unique cart stored server-side.
 */

const express = require('express');
const router = express.Router();
const db = require('../database');
const { v4: uuidv4 } = require('uuid');

// In-memory cart storage keyed by session ID
const carts = new Map();

/**
 * Middleware: ensure a cart session exists.
 * Creates a cart-session cookie if none is present.
 */
function ensureCartSession(req, res, next) {
  let sessionId = req.cookies && req.cookies['cart-session'];

  if (!sessionId || !carts.has(sessionId)) {
    sessionId = uuidv4();
    res.cookie('cart-session', sessionId, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'lax'
    });
    carts.set(sessionId, []);
  }

  req.cartSessionId = sessionId;
  req.cart = carts.get(sessionId);
  next();
}

// Apply session middleware to all cart routes
router.use(ensureCartSession);

// ---- POST /api/cart ---- Add item to cart
router.post('/', (req, res) => {
  try {
    const { product_id, quantity, size, color } = req.body;

    if (!product_id) {
      return res.status(400).json({ error: 'product_id is required' });
    }

    // Verify product exists
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the same product/size/color combination already exists in cart
    const existingIndex = req.cart.findIndex(
      item => item.product_id === product_id && item.size === (size || '') && item.color === (color || '')
    );

    if (existingIndex !== -1) {
      // Update quantity of existing item
      req.cart[existingIndex].quantity += (quantity || 1);
    } else {
      // Add new item
      const cartItem = {
        id: uuidv4(),
        product_id,
        name: product.name,
        category: product.category,
        price_min: product.price_min,
        price_max: product.price_max,
        image_url: product.image_url,
        quantity: quantity || 1,
        size: size || '',
        color: color || ''
      };
      req.cart.push(cartItem);
    }

    carts.set(req.cartSessionId, req.cart);

    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      data: req.cart,
      count: req.cart.length
    });
  } catch (err) {
    console.error('[Cart] POST / error:', err.message);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// ---- GET /api/cart ---- Get cart items
router.get('/', (req, res) => {
  try {
    const total = req.cart.reduce((sum, item) => {
      return sum + (item.price_min * item.quantity);
    }, 0);

    res.json({
      success: true,
      data: req.cart,
      count: req.cart.length,
      total: Math.round(total * 100) / 100
    });
  } catch (err) {
    console.error('[Cart] GET / error:', err.message);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// ---- PUT /api/cart/:itemId ---- Update quantity
router.put('/:itemId', (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'quantity must be at least 1' });
    }

    const itemIndex = req.cart.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    req.cart[itemIndex].quantity = quantity;
    carts.set(req.cartSessionId, req.cart);

    res.json({ success: true, data: req.cart });
  } catch (err) {
    console.error('[Cart] PUT /:itemId error:', err.message);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// ---- DELETE /api/cart/:itemId ---- Remove item
router.delete('/:itemId', (req, res) => {
  try {
    const { itemId } = req.params;
    const itemIndex = req.cart.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    req.cart.splice(itemIndex, 1);
    carts.set(req.cartSessionId, req.cart);

    res.json({ success: true, message: 'Item removed from cart', data: req.cart });
  } catch (err) {
    console.error('[Cart] DELETE /:itemId error:', err.message);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
});

module.exports = router;
