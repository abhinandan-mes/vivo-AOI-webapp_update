const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'aoi-checkpoint-local-secret';

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) return res.status(401).json({ success: false, error: 'Authentication required' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Session expired. Please sign in again.' });
  }
}

module.exports = { authenticateToken, JWT_SECRET };
