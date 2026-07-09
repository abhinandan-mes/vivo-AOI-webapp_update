const express = require('express');
const prisma = require('../config/db');
const { authenticateToken, requireRoles } = require('../middleware/auth');

const router = express.Router();

// Get all logs (descending by created_at)
router.get('/activity-logs', authenticateToken, requireRoles(['super_admin', 'admin']), async (req, res) => {
  try {
    const logs = await prisma.appActivityLog.findMany({
      orderBy: { created_at: 'desc' },
      take: 500 // Cap at latest 500 logs for performance and responsiveness
    });
    res.json({ success: true, logs });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    res.status(500).json({ success: false, error: 'An unexpected error occurred' });
  }
});

module.exports = router;
