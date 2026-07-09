const express = require('express');
const prisma = require('../config/db');
const { authenticateToken, requireRoles } = require('../middleware/auth');

const router = express.Router();

// Get logs (descending by created_at)
router.get('/activity-logs', authenticateToken, async (req, res) => {
  try {
    const isAdmin = req.user.role === 'super_admin' || req.user.role === 'admin';
    const queryOptions = {
      orderBy: { created_at: 'desc' },
      take: 500 // Cap for performance and responsiveness
    };

    if (!isAdmin) {
      // Non-admins can only see their own logs
      queryOptions.where = {
        username: req.user.username
      };
    }

    const logs = await prisma.appActivityLog.findMany(queryOptions);
    res.json({ success: true, logs });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    res.status(500).json({ success: false, error: 'An unexpected error occurred' });
  }
});

module.exports = router;
