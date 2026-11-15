/**
 * Admin Authentication Middleware
 * Protects admin-only endpoints using a simple API key header.
 * Expects: X-Admin-Key: unistyle-admin-2024
 */

const ADMIN_KEY = process.env.ADMIN_KEY || 'unistyle-admin-2024';

function requireAdmin(req, res, next) {
  const providedKey = req.headers['x-admin-key'];

  if (!providedKey) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing X-Admin-Key header. Admin access required.'
    });
  }

  if (providedKey !== ADMIN_KEY) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid admin key.'
    });
  }

  next();
}

module.exports = { requireAdmin, ADMIN_KEY };
